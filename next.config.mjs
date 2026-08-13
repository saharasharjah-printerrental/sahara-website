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
      { source: '/get-quote', destination: '/rental-calculator', permanent: true },
      { source: '/get-quote/', destination: '/rental-calculator/', permanent: true },
      // Fix 404 pages found in Ubersuggest audit
      { source: '/brands', destination: '/products', permanent: true },
      { source: '/brands/', destination: '/products/', permanent: true },
      { source: '/products/canon-imageclass-mf644cdw', destination: '/products', permanent: true },
      { source: '/products/canon-imageclass-mf644cdw/', destination: '/products/', permanent: true },
      { source: '/products/hp-laserjet-pro-m404dn', destination: '/products', permanent: true },
      { source: '/products/hp-laserjet-pro-m404dn/', destination: '/products/', permanent: true },
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://static.hotjar.com https://connect.facebook.net",
              "worker-src 'self' blob:",
              "img-src 'self' data: blob: https: https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net https://www.facebook.com",
              "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://ad.doubleclick.net https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://in.hotjar.com https://*.hotjar.com https://connect.facebook.net https://www.facebook.com",
              "frame-src 'self' https://www.googletagmanager.com https://www.facebook.com https://www.clarity.ms",
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