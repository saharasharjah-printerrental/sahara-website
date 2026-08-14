import { MetadataRoute } from 'next';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { SITE_URL } from '@/lib/siteUrl';

export const runtime = 'edge';

const BASE = SITE_URL;

// Parse a D1 timestamp, falling back to the request time when the row has no
// usable date. Never returns an invalid Date — an unparseable value would
// serialise as 1970-01-01 in the sitemap.
function rowDate(value: unknown, fallback: Date): Date {
  if (typeof value !== 'string' || !value) return fallback;
  const d = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z');
  return Number.isNaN(d.getTime()) ? fallback : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Computed per-request, NOT at module scope. Cloudflare Workers freeze the
  // clock during module initialisation, so a module-scope `new Date()` returns
  // the epoch — which is why every URL previously carried lastmod 1970-01-01.
  const thisWeek = new Date();
  const thisMonth = new Date();
  thisMonth.setDate(1);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                              lastModified: thisWeek, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services/printer-rental/`,      lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/photocopier-rental/`,  lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/repair/`,              lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/services/amc/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/plotter-maintenance/`, lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.75 },
    // /services/toner/ is intentionally absent — it 301s to
    // /services/printer-spare-parts/ and must not be advertised as canonical.
    { url: `${BASE}/services/printer-spare-parts/`, lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/paper-shredder-rental/`, lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/papercut-print-management/`, lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/printer-rental-dubai/`,         lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/printer-rental-abu-dhabi/`,     lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/photocopier-rental-sharjah/`,   lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/printer-rental-rak/`,           lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-fujairah/`,      lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-al-ain/`,        lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/copier-lease-uae/`,             lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/brands/canon/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/hp/`,                    lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/kyocera/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/xerox/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/ricoh/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/brother/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/sharp/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/epson/`,                 lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/lexmark/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/brands/samsung/`,               lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/brands/konica-minolta/`,        lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/printer-repair-dubai/`,          lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/canon-printer-dubai/`,          lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/bravo-card-printers-uae/`,      lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/pvc-card-printer-quote/`,       lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/hp-printer-abu-dhabi/`,         lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/products/`,                     lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE}/blogs/`,                        lastModified: thisWeek, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about/`,                        lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact/`,                      lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/our-clients/`,                  lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/rental-calculator/`,            lastModified: thisMonth, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/returns-refunds/`,              lastModified: thisMonth, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/shipping-delivery/`,            lastModified: thisMonth, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/terms/`,                        lastModified: thisMonth, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/privacy-policy/`,               lastModified: thisMonth, changeFrequency: 'yearly',  priority: 0.4 },
  ];

  // Dynamic routes come from D1. If that read fails we throw rather than
  // silently shipping a sitemap that omits every blog post and product —
  // a 500 makes Google retry and keep the last good sitemap, whereas a
  // quietly truncated sitemap looks authoritative and is not.
  const db = (getRequestContext().env as any).DB;
  if (!db) {
    throw new Error('sitemap: D1 binding unavailable — refusing to emit a partial sitemap');
  }

  let blogRoutes: MetadataRoute.Sitemap = [];
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const br = await db.prepare('SELECT slug, publishedAt, createdAt FROM blogs WHERE isActive = 1').all();
    blogRoutes = ((br?.results ?? []) as any[])
      .filter((r) => r.slug)
      .map((r) => ({
        url: `${BASE}/blogs/${r.slug}/`,
        lastModified: rowDate(r.publishedAt ?? r.createdAt, thisWeek),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

    const pr = await db.prepare('SELECT slug, created_at FROM products WHERE is_active = 1').all();
    productRoutes = ((pr?.results ?? []) as any[])
      .filter((r) => r.slug)
      .map((r) => ({
        url: `${BASE}/products/${r.slug}/`,
        lastModified: rowDate(r.created_at, thisMonth),
        changeFrequency: 'monthly' as const,
        priority: 0.65,
      }));
  } catch (err) {
    console.error('sitemap: D1 query failed', err);
    throw err;
  }

  let supplyRoutes: MetadataRoute.Sitemap = [];
  try {
    const sr = await db.prepare("SELECT slug, updatedAt, createdAt FROM supplies WHERE isActive = 1 AND slug != ''").all();
    supplyRoutes = ((sr?.results ?? []) as any[])
      .filter((r) => r.slug)
      .map((r) => ({
        url: `${BASE}/services/printer-spare-parts/${r.slug}/`,
        lastModified: rowDate(r.updatedAt ?? r.createdAt, thisMonth),
        changeFrequency: 'weekly' as const,
        priority: 0.55,
      }));
  } catch (err) {
    // supplies.slug is new (migration 016) — don't fail the whole sitemap if
    // the migration hasn't been applied to this environment yet.
    console.error('sitemap: supplies query failed (migration 016 applied?)', err);
  }

  return [...staticRoutes, ...blogRoutes, ...productRoutes, ...supplyRoutes];
}
