import { MetadataRoute } from 'next';

const BASE = 'https://www.saharaprinter.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services/`,                     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/printer-rental/`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/photocopier-rental/`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/repair/`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/services/amc/`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/sales/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/toner/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/printer-spare-parts/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/printer-rental-dubai/`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/printer-rental-abu-dhabi/`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/photocopier-rental-sharjah/`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/printer-rental-rak/`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-fujairah/`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-al-ain/`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/copier-lease-uae/`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/printer-repair-dubai/`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/canon-printer-dubai/`,          lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/hp-printer-abu-dhabi/`,         lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/brands/`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/canon/`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/hp/`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/kyocera/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/xerox/`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/ricoh/`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/brother/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/sharp/`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/lexmark/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/brands/samsung/`,               lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/products/`,                     lastModified: now, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE}/blogs/`,                        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about/`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact/`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/get-quote/`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/our-clients/`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/rental-calculator/`,            lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
  ];

  // Dynamic: blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${BASE}/api/blogs/`, { next: { revalidate: 3600 } });
    const data = await res.json();
    blogRoutes = (data.blogs || []).map((b: any) => ({
      url: `${BASE}/blogs/${b.slug}`,
      lastModified: now,
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
      url: `${BASE}/products/${p.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));
  } catch { /* ignore */ }

  return [...staticRoutes, ...blogRoutes, ...productRoutes];
}
