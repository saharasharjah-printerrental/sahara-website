import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Only block private endpoints — never blanket-block /api/, it stops
        // Googlebot fetching data routes that pages depend on for rendering.
        disallow: ['/admin/', '/api/admin/', '/api/auth/', '/api/analytics/ping'],
      },
    ],
    sitemap: 'https://www.saharaprinter.com/sitemap.xml',
    host: 'https://www.saharaprinter.com',
  };
}
