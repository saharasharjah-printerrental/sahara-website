import { MetadataRoute } from 'next';

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
    { url: `${BASE}/products/`,                     lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE}/blogs/`,                        lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about/`,                        lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact/`,                      lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/get-quote/`,                    lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/our-clients/`,                  lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/rental-calculator/`,            lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
  ];

  // Dynamic: blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${BASE}/api/blogs/`, { next: { revalidate: 3600 } });
    const data = await res.json();
    blogRoutes = (data.blogs || []).map((b: any) => ({
      url: `${BASE}/blogs/${b.slug}`,
      lastModified: thisWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch { /* ignore */ }

  // Dynamic: products
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${BASE}/api/products/`, { next: { revalidate: 3600 } });
    const data = await res.json();
    productRoutes = (data.products || []).map((p: any) => ({
      url: `${BASE}/products/${p.slug || p.id}`,
      lastModified: thisWeek,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));
  } catch { /* ignore */ }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
