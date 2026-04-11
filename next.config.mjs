/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
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
};

export default nextConfig;