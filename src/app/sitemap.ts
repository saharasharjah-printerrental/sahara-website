import { MetadataRoute } from 'next';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { SITE_URL } from '@/lib/siteUrl';

export const runtime = 'edge';

const BASE = SITE_URL;

// Sep 2026: these two product slugs still exist as `is_active = 1` rows in
// D1 (so the query below would otherwise emit them), but next.config.mjs
// permanently 308-redirects both to /products/ ("Fix 404 pages found in
// Ubersuggest audit"). The sitemap was advertising them as canonical
// indexable Product pages while every visit immediately redirected away —
// exactly the shape of GSC's "Products" report flagging a redirect/URL
// error, since a Product page that always redirects can never carry a
// valid Product rich result. Excluded here to stop re-submitting them;
// the underlying D1 rows should be set is_active = 0 to fix this at the
// source (out of scope for a Next.js code change).
const DEAD_PRODUCT_SLUGS = new Set(['canon-imageclass-mf644cdw', 'hp-laserjet-pro-m404dn']);

// Parse a D1 timestamp, falling back to the request time when the row has no
// usable date. Never returns an invalid Date — an unparseable value would
// serialise as 1970-01-01 in the sitemap.
function rowDate(value: unknown, fallback: Date): Date {
  if (typeof value !== 'string' || !value) return fallback;
  const d = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z');
  return Number.isNaN(d.getTime()) ? fallback : d;
}

// Sep 2026: lastModified for every static route below used to be computed
// from `new Date()` at request time, so ALL ~50 static URLs reported a
// brand-new lastmod on EVERY sitemap fetch — Google explicitly discounts
// lastmod as a crawl-priority signal once it sees a sitemap where every URL
// "changed" on every fetch, and a genuinely-new page (like
// /services/paper-shredder-sales/ on 2026-09-07) got no usable signal
// because everything else claimed to be equally fresh. These dates are
// pinned to each route's actual last content commit (`git log -1 --format=%cI
// -- <page file>`) so lastmod is trustworthy again. Re-derive a route's date
// with that command when its content actually changes — don't bump it
// automatically on unrelated commits.
const ROUTE_LASTMOD: Record<string, string> = {
  '/': '2026-08-13T13:05:57+04:00',
  '/services/': '2026-09-09T10:22:04+04:00',
  '/services/printer-rental/': '2026-09-15T12:10:55+04:00',
  '/services/repair/': '2026-09-15T11:28:23+04:00',
  '/services/amc/': '2026-09-15T11:28:23+04:00',
  '/printer-amc-dubai/': '2026-09-15T11:28:23+04:00',
  '/services/plotter-maintenance/': '2026-09-15T11:28:23+04:00',
  '/services/printer-spare-parts/': '2026-09-09T10:22:04+04:00',
  '/services/paper-shredder-rental/': '2026-09-15T12:10:55+04:00',
  '/services/paper-shredder-sales/': '2026-09-15T12:10:55+04:00',
  '/services/papercut-print-management/': '2026-09-15T11:28:23+04:00',
  '/printer-rental-dubai/': '2026-09-15T11:28:23+04:00',
  '/printer-rental-abu-dhabi/': '2026-09-15T11:28:23+04:00',
  '/photocopier-rental-sharjah/': '2026-09-15T11:28:23+04:00',
  '/photocopier-rental-dubai/': '2026-09-15T11:28:23+04:00',
  '/photocopier-rental-abu-dhabi/': '2026-09-15T11:28:23+04:00',
  '/printer-rental-sharjah/': '2026-09-15T11:28:23+04:00',
  '/printer-rental-rak/': '2026-09-15T11:28:23+04:00',
  '/printer-rental-fujairah/': '2026-09-15T11:28:23+04:00',
  '/printer-rental-al-ain/': '2026-09-15T11:28:23+04:00',
  '/brands/canon/': '2026-09-09T10:22:04+04:00',
  '/brands/hp/': '2026-09-08T09:34:26+04:00',
  '/brands/kyocera/': '2026-09-08T09:34:26+04:00',
  '/brands/xerox/': '2026-09-08T09:34:26+04:00',
  '/brands/ricoh/': '2026-09-08T09:34:26+04:00',
  '/brands/brother/': '2026-09-08T09:34:26+04:00',
  '/brands/sharp/': '2026-09-15T11:28:23+04:00',
  '/brands/epson/': '2026-09-15T11:28:23+04:00',
  '/brands/lexmark/': '2026-09-08T09:34:26+04:00',
  '/brands/samsung/': '2026-09-08T09:34:26+04:00',
  // Served by the [slug] catch-all, not a dedicated page.tsx.
  '/brands/konica-minolta/': '2026-09-15T11:28:23+04:00',
  '/printer-repair-dubai/': '2026-09-15T11:28:23+04:00',
  '/printer-repair-sharjah/': '2026-09-15T11:28:23+04:00',
  '/kyocera-printer-repair/': '2026-09-15T11:28:23+04:00',
  '/hp-printer-repair/': '2026-09-15T11:28:23+04:00',
  '/canon-printer-repair/': '2026-09-15T11:28:23+04:00',
  '/brother-printer-repair/': '2026-09-15T11:28:23+04:00',
  '/epson-printer-repair/': '2026-09-15T11:28:23+04:00',
  '/xerox-printer-repair/': '2026-09-15T11:28:23+04:00',
  '/ricoh-printer-repair/': '2026-09-15T11:28:23+04:00',
  '/canon-printer-dubai/': '2026-09-15T11:28:23+04:00',
  '/bravo-card-printers-uae/': '2026-09-15T12:10:55+04:00',
  '/services/pvc-card-printer-rental/': '2026-09-15T12:10:55+04:00',
  '/services/pvc-card-printing-services/': '2026-09-15T12:10:55+04:00',
  '/hp-printer-abu-dhabi/': '2026-09-15T11:28:23+04:00',
  '/products/': '2026-09-15T11:28:23+04:00',
  '/blogs/': '2026-09-15T11:28:23+04:00',
  '/about/': '2026-09-15T11:28:23+04:00',
  '/contact/': '2026-09-09T10:22:04+04:00',
  '/our-clients/': '2026-09-15T11:28:23+04:00',
  '/rental-calculator/': '2026-08-14T10:19:22+04:00',
  '/returns-refunds/': '2026-08-14T10:19:22+04:00',
  '/shipping-delivery/': '2026-08-14T10:19:22+04:00',
  '/terms/': '2026-08-14T10:19:22+04:00',
  '/privacy-policy/': '2026-08-14T10:19:22+04:00',
};

// Looks up a route's pinned lastmod; falls back to `fallback` for any route
// not yet in the map above (new routes should get a real entry added at the
// same time they're added to staticRoutes below).
function lm(path: string, fallback: Date): Date {
  const iso = ROUTE_LASTMOD[path];
  return iso ? new Date(iso) : fallback;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fallback only — used for any static route missing from ROUTE_LASTMOD,
  // and as the request-time fallback in rowDate() below. Computed per-request,
  // NOT at module scope: Cloudflare Workers freeze the clock during module
  // initialisation, so a module-scope `new Date()` returns the epoch — which
  // is why every URL previously carried lastmod 1970-01-01 before this file's
  // first fix.
  const requestTime = new Date();
  const thisMonth = new Date();
  thisMonth.setDate(1);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                              lastModified: lm('/', requestTime), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services/`,                     lastModified: lm('/services/', requestTime), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/services/printer-rental/`,      lastModified: lm('/services/printer-rental/', requestTime), changeFrequency: 'weekly',  priority: 0.9 },
    // /services/photocopier-rental/ is intentionally absent — 301'd to
    // /photocopier-rental-dubai/ (Sep 2026 copier consolidation; see
    // next.config.mjs redirects) after decaying to position 66 UAE-wide.
    { url: `${BASE}/services/repair/`,              lastModified: lm('/services/repair/', thisMonth), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/services/amc/`,                 lastModified: lm('/services/amc/', thisMonth), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-amc-dubai/`,             lastModified: lm('/printer-amc-dubai/', requestTime), changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE}/services/plotter-maintenance/`, lastModified: lm('/services/plotter-maintenance/', requestTime), changeFrequency: 'weekly',  priority: 0.75 },
    // /services/toner/ is intentionally absent — it 301s to
    // /services/printer-spare-parts/ and must not be advertised as canonical.
    { url: `${BASE}/services/printer-spare-parts/`, lastModified: lm('/services/printer-spare-parts/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/paper-shredder-rental/`, lastModified: lm('/services/paper-shredder-rental/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/paper-shredder-sales/`,  lastModified: lm('/services/paper-shredder-sales/', requestTime),  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/services/papercut-print-management/`, lastModified: lm('/services/papercut-print-management/', thisMonth), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/printer-rental-dubai/`,         lastModified: lm('/printer-rental-dubai/', requestTime), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/printer-rental-abu-dhabi/`,     lastModified: lm('/printer-rental-abu-dhabi/', requestTime), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/photocopier-rental-sharjah/`,   lastModified: lm('/photocopier-rental-sharjah/', requestTime), changeFrequency: 'weekly',  priority: 0.92 },
    // Priority raised from 0.85: this page absorbed /services/photocopier-rental/'s
    // content and equity in the Sep 2026 consolidation (see redirects above).
    { url: `${BASE}/photocopier-rental-dubai/`,     lastModified: lm('/photocopier-rental-dubai/', requestTime), changeFrequency: 'weekly',  priority: 0.92 },
    { url: `${BASE}/photocopier-rental-abu-dhabi/`, lastModified: lm('/photocopier-rental-abu-dhabi/', requestTime), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/printer-rental-sharjah/`,       lastModified: lm('/printer-rental-sharjah/', requestTime), changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/printer-rental-rak/`,           lastModified: lm('/printer-rental-rak/', thisMonth), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-fujairah/`,      lastModified: lm('/printer-rental-fujairah/', thisMonth), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/printer-rental-al-ain/`,        lastModified: lm('/printer-rental-al-ain/', thisMonth), changeFrequency: 'monthly', priority: 0.8 },
    // /copier-lease-uae/ is intentionally absent — 301'd to
    // /photocopier-rental-dubai/ (Sep 2026 copier consolidation).
    { url: `${BASE}/brands/canon/`,                 lastModified: lm('/brands/canon/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/hp/`,                    lastModified: lm('/brands/hp/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/kyocera/`,               lastModified: lm('/brands/kyocera/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/xerox/`,                 lastModified: lm('/brands/xerox/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/brands/ricoh/`,                 lastModified: lm('/brands/ricoh/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/brother/`,               lastModified: lm('/brands/brother/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/sharp/`,                 lastModified: lm('/brands/sharp/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/epson/`,                 lastModified: lm('/brands/epson/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brands/lexmark/`,               lastModified: lm('/brands/lexmark/', thisMonth), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/brands/samsung/`,               lastModified: lm('/brands/samsung/', thisMonth), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/brands/konica-minolta/`,        lastModified: lm('/brands/konica-minolta/', thisMonth), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/printer-repair-dubai/`,          lastModified: lm('/printer-repair-dubai/', requestTime), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/printer-repair-sharjah/`,       lastModified: lm('/printer-repair-sharjah/', requestTime), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/kyocera-printer-repair/`,       lastModified: lm('/kyocera-printer-repair/', requestTime), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/hp-printer-repair/`,            lastModified: lm('/hp-printer-repair/', requestTime), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/canon-printer-repair/`,         lastModified: lm('/canon-printer-repair/', requestTime), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/brother-printer-repair/`,       lastModified: lm('/brother-printer-repair/', requestTime), changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE}/epson-printer-repair/`,         lastModified: lm('/epson-printer-repair/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/xerox-printer-repair/`,         lastModified: lm('/xerox-printer-repair/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/ricoh-printer-repair/`,         lastModified: lm('/ricoh-printer-repair/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/canon-printer-dubai/`,          lastModified: lm('/canon-printer-dubai/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/bravo-card-printers-uae/`,      lastModified: lm('/bravo-card-printers-uae/', requestTime), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/services/pvc-card-printer-rental/`, lastModified: lm('/services/pvc-card-printer-rental/', requestTime), changeFrequency: 'weekly', priority: 0.8 },
    // /services/pvc-card-printer-sales/ is intentionally absent — Sep 2026,
    // folded into /bravo-card-printers-uae/ via a 301 (same pattern as
    // /services/toner/). The hub already carried the Product+Offer blocks
    // and buy-intent AEO question at 2.8x the sales page's word count; two
    // competing pages for "buy pvc card printer dubai" converts worse than
    // one, per the Sharjah-consolidation lesson.
    { url: `${BASE}/services/pvc-card-printing-services/`, lastModified: lm('/services/pvc-card-printing-services/', requestTime), changeFrequency: 'weekly', priority: 0.8 },
    // /pvc-card-printer-quote/ is intentionally absent — noindexed Sep 2026,
    // see that page's own file comment. A lead-capture form doesn't need to
    // rank; it needs traffic sent to it from /bravo-card-printers-uae/.
    { url: `${BASE}/hp-printer-abu-dhabi/`,         lastModified: lm('/hp-printer-abu-dhabi/', thisMonth), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/products/`,                     lastModified: lm('/products/', requestTime), changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE}/blogs/`,                        lastModified: lm('/blogs/', requestTime), changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about/`,                        lastModified: lm('/about/', thisMonth), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact/`,                      lastModified: lm('/contact/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/our-clients/`,                  lastModified: lm('/our-clients/', thisMonth), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/rental-calculator/`,            lastModified: lm('/rental-calculator/', thisMonth), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/returns-refunds/`,              lastModified: lm('/returns-refunds/', thisMonth), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/shipping-delivery/`,            lastModified: lm('/shipping-delivery/', thisMonth), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/terms/`,                        lastModified: lm('/terms/', thisMonth), changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/privacy-policy/`,               lastModified: lm('/privacy-policy/', thisMonth), changeFrequency: 'yearly',  priority: 0.4 },
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
        lastModified: rowDate(r.publishedAt ?? r.createdAt, requestTime),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

    const pr = await db.prepare('SELECT slug, created_at FROM products WHERE is_active = 1').all();
    productRoutes = ((pr?.results ?? []) as any[])
      .filter((r) => r.slug && !DEAD_PRODUCT_SLUGS.has(r.slug))
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
