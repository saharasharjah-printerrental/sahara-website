/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/material", "@mui/icons-material", "@mui/system", "@mui/utils"],
  serverExternalPackages: ['cloudflare:sockets'],
  webpack(config) {
    config.externals = config.externals || [];
    config.externals.push({ 'cloudflare:sockets': 'commonjs cloudflare:sockets' });
    return config;
  },
  reactStrictMode: true,
  devIndicators: false,
  logging: {
    fetches: { fullUrl: false },
    level: 'error',
  },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "pub-b6b36705ad184591a1c89e16ce91b8b3.r2.dev" },
      { protocol: "https", hostname: "assets.saharaprinter.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.saharaprinter.com" },
      { protocol: "https", hostname: "saharaprinter.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.kyoceradocumentsolutions.us" },
      { protocol: "https", hostname: "www.xerox.com" },
      { protocol: "https", hostname: "www.brother-usa.com" },
      { protocol: "https", hostname: "d2g44tvvp35wo2.cloudfront.net" },
      { protocol: "https", hostname: "media.lexmark.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      // Destinations always carry the trailing slash, on BOTH the slash and
      // no-slash source variants below. With trailingSlash: true, whichever
      // rule matches first (Next.js redirects() ignores which source has the
      // slash when both are present — the earlier array entry wins) would
      // otherwise hand back a no-slash destination, forcing a second redirect
      // hop through Next's own trailing-slash normalization.
      //
      // Sep 2026: repointed from /rental-calculator/ to /printer-rental-sharjah/.
      // GSC showed /get-quote still indexed and ranking (pos 14-15, ~100
      // impressions/mo) for "printer rental sharjah" queries while the real
      // page, /printer-rental-sharjah/, had zero impressions despite being
      // indexed and healthy. Sending this stale URL's equity at the actual
      // target page instead of the calculator.
      { source: '/get-quote', destination: '/printer-rental-sharjah/', permanent: true },
      { source: '/get-quote/', destination: '/printer-rental-sharjah/', permanent: true },
      // Fix 404 pages found in Ubersuggest audit
      { source: '/products/canon-imageclass-mf644cdw', destination: '/products/', permanent: true },
      { source: '/products/canon-imageclass-mf644cdw/', destination: '/products/', permanent: true },
      { source: '/products/hp-laserjet-pro-m404dn', destination: '/products/', permanent: true },
      { source: '/products/hp-laserjet-pro-m404dn/', destination: '/products/', permanent: true },
      // Sep 2026: folded into /bravo-card-printers-uae/ — that hub page
      // already carried the Product+Offer blocks and buy-intent AEO
      // question at 2.8x the word count of this dedicated sales page, so
      // the two were cannibalising each other for "buy pvc card printer
      // dubai" / "id card printer price uae". One consolidated page.
      { source: '/services/pvc-card-printer-sales', destination: '/bravo-card-printers-uae/', permanent: true },
      { source: '/services/pvc-card-printer-sales/', destination: '/bravo-card-printers-uae/', permanent: true },
      // Sep 2026: copier consolidation. /services/photocopier-rental/ (UAE
      // hub) had decayed to position 66 with 759 UAE impressions and 1
      // click, beaten on its own terms by /photocopier-rental-dubai/ (10.5
      // vs 32.6 on "photocopier rental dubai"). Its comparison table, device
      // fleet, and FAQs were migrated into the Dubai page before this
      // redirect — see the note at the top of that file. /copier-lease-uae/
      // consolidated for the same reason: 289 UAE impressions, position
      // 64.7, 0 clicks, losing "copier lease dubai" to the homepage.
      { source: '/services/photocopier-rental', destination: '/photocopier-rental-dubai/', permanent: true },
      { source: '/services/photocopier-rental/', destination: '/photocopier-rental-dubai/', permanent: true },
      { source: '/copier-lease-uae', destination: '/photocopier-rental-dubai/', permanent: true },
      { source: '/copier-lease-uae/', destination: '/photocopier-rental-dubai/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Long cache for public images
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      {
        // Long cache for brand images
        source: '/brands/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
      {
        // Admin panel — relax COEP so external scripts/images load
        source: '/admin/:path*',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          {
            // NOTE: src/middleware.ts sets its own Content-Security-Policy on
            // every response and is what's actually served in production —
            // this block is not observed to take effect under
            // @cloudflare/next-on-pages + middleware. Kept in sync with
            // middleware.ts anyway so it isn't misleading if that ever
            // changes. Edit both together.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms https://static.hotjar.com https://connect.facebook.net",
              "worker-src 'self' blob:",
              "img-src 'self' data: blob: https: https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://www.facebook.com",
              "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://ad.doubleclick.net https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://in.hotjar.com https://*.hotjar.com https://connect.facebook.net https://www.facebook.com",
              "frame-src 'self' https://www.googletagmanager.com https://www.facebook.com https://www.clarity.ms https://www.google.com https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "media-src 'self'",
            ].join('; ')
          },
        ],
      },
    ];
  },
};

export default nextConfig;