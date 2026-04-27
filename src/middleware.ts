import { NextRequest, NextResponse } from 'next/server';
import type { NextFetchEvent } from 'next/server';

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 
             request.headers.get('x-real-ip') ?? 
             'unknown';
  
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://www.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob: https://www.google.com https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://www.google.com https://stats.g.doubleclick.net",
    "frame-src 'self' https://www.google.com https://www.youtube.com",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  const url = request.nextUrl.pathname;
  
  if (url.startsWith('/api/')) {
    const rateLimit = rateLimitStore.get(ip);
    const now = Date.now();
    
    if (rateLimit) {
      if (now - rateLimit.windowStart < WINDOW_MS) {
        if (rateLimit.requests >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': '60' } }
          );
        }
        rateLimit.requests++;
      } else {
        rateLimitStore.set(ip, { windowStart: now, requests: 1 });
      }
    } else {
      rateLimitStore.set(ip, { windowStart: now, requests: 1 });
    }
    
    if (request.method === 'POST' || request.method === 'PUT') {
      const contentLength = request.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
        return NextResponse.json(
          { error: 'Request body too large' },
          { status: 413 }
        );
      }
    }
  }
  
  return response;
}

const MAX_REQUESTS = 60;
const WINDOW_MS = 60 * 1000;
const MAX_BODY_SIZE = 1024 * 1024;

const rateLimitStore = new Map<string, { windowStart: number; requests: number }>();

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)',
  ],
};
