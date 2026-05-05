import type { MetadataRoute } from 'next';

export const runtime = 'edge';

const SITE = 'https://www.saharaprinter.com';

export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
    'GPTBot',
    'ChatGPT-User',
    'PerplexityBot',
    'ClaudeBot',
    'anthropic-ai',
    'Google-Extended',
    'Applebot-Extended',
    'cohere-ai',
    'Bytespider',
    'meta-externalagent',
  ];

  return {
    rules: [
      ...aiAgents.map((ua) => ({ userAgent: ua, allow: '/' })),
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/*?*utm_'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}