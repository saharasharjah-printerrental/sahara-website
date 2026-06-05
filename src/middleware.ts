import { NextRequest, NextResponse } from 'next/server';
import type { NextFetchEvent } from 'next/server';

// Per-endpoint rate limit tiers (checked in order, first match wins)
const RATE_LIMITS = [
  // Image upload — expensive Cloudinary API call
  { pattern: /^\/api\/convert-image/, requests: 5,  windowMs: 60_000 },
  { pattern: /^\/api\/upload/,        requests: 5,  windowMs: 60_000 },
  // Inquiry / quote form — prevent spam
  { pattern: /^\/api\/inquiries/,     requests: 10, windowMs: 60_000 },
  // Email sending
  { pattern: /^\/api\/send-email/,    requests: 10, windowMs: 60_000 },
  // Checkout order placement — prevent spam orders
  { pattern: /^\/api\/orders/,        requests: 15, windowMs: 60_000 },
  // Payment session / gateway callbacks
  { pattern: /^\/api\/payments/,      requests: 30, windowMs: 60_000 },
  // Default for all other /api/* routes
  { pattern: /^\/api\//,              requests: 180, windowMs: 60_000 },
] as const;

const MAX_BODY_SIZE = 10 * 1024 * 1024; // 10 MB (covers image uploads)

// In-memory store — per edge worker instance (acceptable on Cloudflare Workers free tier)
const store = new Map<string, { windowStart: number; count: number }>();

function getLimit(pathname: string) {
  for (const l of RATE_LIMITS) {
    if (l.pattern.test(pathname)) return l;
  }
  return null;
}

function getClientIp(req: NextRequest): string {
  // cf-connecting-ip is Cloudflare's authoritative real-IP header (most accurate)
  return (
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

export function middleware(request: NextRequest, _event: NextFetchEvent) {
  // ── Non-WWW → WWW redirect (301) ────────────────────────────────────────
  // Redirect non-www to www at the edge — fires BEFORE any routing
  // Works on Cloudflare Pages (via @cloudflare/next-on-pages) and Vercel
  const hostname = request.headers.get('host') || '';
  if (
    hostname === 'saharaprinter.com' ||
    hostname === 'saharaprinter.com:443'
  ) {
    const url = new URL(request.url);
    url.hostname = 'www.saharaprinter.com';
    return NextResponse.redirect(url.toString(), 301);
  }

  const pathname = request.nextUrl.pathname;
  const isAdmin  = pathname.startsWith('/admin');

  const response = NextResponse.next();

  // ── Security headers ──────────────────────────────────────────────────────
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options',        'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection',       '1; mode=block');
  response.headers.set('Referrer-Policy',        'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy',     'camera=(), microphone=(), geolocation=()');

  // COEP/COOP: relax on admin so Wikimedia logos, GA scripts, etc. load
  if (isAdmin) {
    response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
    response.headers.set('Cross-Origin-Opener-Policy',   'same-origin-allow-popups');
  } else {
    response.headers.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
    response.headers.set('Cross-Origin-Opener-Policy',   'same-origin-allow-popups');
  }

  // CSP — admin gets broader connect-src/img-src for management tools
  const scriptSrc = isAdmin
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com https://unpkg.com"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com";

  const connectSrc = isAdmin
    ? "connect-src 'self' https:"
    : "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.google.com https://stats.g.doubleclick.net https://static.cloudflareinsights.com https://googleads.g.doubleclick.net";

  const imgSrc = isAdmin
    ? "img-src 'self' data: blob: https: http:"
    : "img-src 'self' data: https: blob:";

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    imgSrc,
    connectSrc,
    "frame-src 'self' https://www.google.com https://www.google.com/maps https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // ── Rate limiting ─────────────────────────────────────────────────────────
  const limit = getLimit(pathname);
  if (limit) {
    const ip  = getClientIp(request);
    // Key: ip + route-prefix (e.g. "1.2.3.4:/api/inquiries")
    const key = `${ip}:${pathname.replace(/\/[^/]+$/, '') || pathname}`;
    const now = Date.now();
    const rec = store.get(key);

    if (rec && now - rec.windowStart < limit.windowMs) {
      if (rec.count >= limit.requests) {
        const retryAfter = Math.ceil((rec.windowStart + limit.windowMs - now) / 1000);
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          {
            status: 429,
            headers: {
              'Retry-After':         String(retryAfter),
              'X-RateLimit-Limit':   String(limit.requests),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset':   String(Math.ceil((rec.windowStart + limit.windowMs) / 1000)),
              'X-Robots-Tag':        'noindex, nofollow',
            },
          }
        );
      }
      rec.count++;
      response.headers.set('X-RateLimit-Remaining', String(limit.requests - rec.count));
    } else {
      store.set(key, { windowStart: now, count: 1 });
      response.headers.set('X-RateLimit-Remaining', String(limit.requests - 1));
    }

    response.headers.set('X-RateLimit-Limit', String(limit.requests));
    response.headers.set('X-RateLimit-Reset',
      String(Math.ceil(((store.get(key)?.windowStart ?? now) + limit.windowMs) / 1000))
    );

    // Body size guard for upload routes
    if (request.method === 'POST' || request.method === 'PUT') {
      const contentLength = request.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
        return NextResponse.json(
          { error: 'Request body too large' },
          { status: 413, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
        );
      }
    }
  }

  if (pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'private, no-store');
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)',
  ],
};
