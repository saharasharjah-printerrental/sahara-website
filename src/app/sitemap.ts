import { MetadataRoute } from 'next';
import { getRequestContext } from '@cloudflare/next-on-pages';

const BASE = 'https://www.saharaprinter.com';

// Stagger dates: this week vs this month for SEO variety
const thisWeek = new Date();
const thisMonth = new Date();
thisMonth.setDate(1); // First of month

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                              lastModified: thisWeek, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services/`,                     lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/printer-rental/`,      lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/photocopier-rental/`,  lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/repair/`,              lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/services/amc/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/sales/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/toner/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/printer-spare-parts/`, lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/printer-rental-dubai/`,         lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/printer-rental-abu-dhabi/`,     lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/photocopier-rental-sharjah/`,   lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/printer-rental-rak/`,           lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-fujairah/`,      lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-al-ain/`,        lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/copier-lease-uae/`,             lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/brands/`,                       lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/canon/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/hp/`,                    lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/kyocera/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/xerox/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/ricoh/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/brother/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/lexmark/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/brands/samsung/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/printer-repair-dubai/`,          lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/canon-printer-dubai/`,          lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/bravo-card-printers-uae/`,      lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/hp-printer-abu-dhabi/`,         lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/products/`,                     lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE}/blogs/`,                        lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about/`,                        lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact/`,                      lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/our-clients/`,                  lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/rental-calculator/`,            lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
  ];

  // Dynamic: blog posts + products — query D1 directly (no HTTP fetch, no redirect issues)
  let blogRoutes: MetadataRoute.Sitemap = [];
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const db = (getRequestContext().env as any).DB;
    if (db) {
      const [br, pr] = await Promise.all([
        db.prepare("SELECT slug FROM blog_posts WHERE status = 'published'").all(),
        db.prepare("SELECT id, slug FROM products WHERE isActive = 1").all(),
      ]);
      blogRoutes = ((br?.results ?? []) as any[])
        .map((r) => r.slug)
        .filter(Boolean)
        .map((slug: string) => ({
          url: `${BASE}/blogs/${slug}/`,
          lastModified: thisWeek,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
      productRoutes = ((pr?.results ?? []) as any[])
        .map((r) => r.slug || String(r.id))
        .filter(Boolean)
        .map((id: string) => ({
          url: `${BASE}/products/${id}/`,
          lastModified: thisWeek,
          changeFrequency: 'weekly' as const,
          priority: 0.75,
        }));
    }
  } catch { /* D1 unavailable — sitemap generates without dynamic entries */ }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
