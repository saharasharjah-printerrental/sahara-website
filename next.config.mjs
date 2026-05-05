/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/material", "@mui/icons-material", "@mui/system", "@mui/utils"],
  reactStrictMode: true,
  devIndicators: false,
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
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
  async headers() {
    return [
      {
        // Immutable cache for static assets (hashed filenames)
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
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
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
        ],
      },
    ];
  },
};

export default nextConfig;