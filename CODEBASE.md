# Sahara Office Equipments — Codebase Reference

> Next.js 14 App Router · Cloudflare D1 (SQLite) · Cloudflare R2 (static assets) · Edge Runtime

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom CSS variables |
| Fonts | Sora (headings), Manrope (body), Material Symbols (icons) |
| Database | Cloudflare D1 (SQLite) — accessed via `getRequestContext().env.DB` |
| Static Assets | Cloudflare R2 — images deployed via `public/images/` → GitHub push |
| Runtime | `export const runtime = 'edge'` on all API routes |
| Client fallback | `localStorage("sahara_products")` when D1 unavailable |

---

## Directory Structure

```
sahara-website/
├── public/
│   ├── images/              ← All local images (WebP) — served via Cloudflare R2
│   │   ├── heroPrntr1.webp  ← HP/generic hero printer
│   │   ├── heroBnr1.webp    ← HP Color LaserJet / banner
│   │   ├── printer-canon-1.webp
│   │   ├── printer-brother.webp
│   │   ├── printer-kyocera.webp
│   │   ├── printer-samsung.webp
│   │   ├── printer-xerox.webp
│   │   ├── printer-ricoh.webp
│   │   ├── printer-lexmark.webp
│   │   ├── homement.webp
│   │   └── unsplash-office.webp
│   ├── sitemap.xml          ← 50+ URLs, lastmod 2026-04-15
│   └── robots.txt
├── src/
│   ├── app/                 ← App Router pages
│   └── components/          ← Shared UI components
├── next.config.mjs
└── CODEBASE.md              ← This file
```

---

## Public Pages (Routes)

### Core
| Route | File | Type | Notes |
|-------|------|------|-------|
| `/` | `app/page.tsx` | Client | Homepage: hero, featured products, services carousel, reviews |
| `/about` | `app/about/page.tsx` | Server | AboutPage schema, AEO block, stats, story |
| `/contact` | `app/contact/page.tsx` | — | Contact form |
| `/get-quote` | `app/get-quote/page.tsx` | — | Quote form → saves to inquiries API |
| `/products` | `app/products/page.tsx` | Client | Product listing with filters + pagination (9/page); loads from API → localStorage → defaults |
| `/blogs` | `app/blogs/page.tsx` | — | Blog listing |
| `/blogs/[slug]` | `app/blogs/[slug]/page.tsx` | Dynamic | Blog detail |
| `/our-clients` | `app/our-clients/page.tsx` | — | Client logos |
| `/rental-calculator` | `app/rental-calculator/page.tsx` | — | Interactive price estimator |

### Services
| Route | File |
|-------|------|
| `/services` | `app/services/page.tsx` |
| `/services/photocopier-rental` | `app/services/photocopier-rental/page.tsx` |
| `/services/printer-rental` | `app/services/printer-rental/page.tsx` |
| `/services/repair` | `app/services/repair/page.tsx` |
| `/services/amc` | `app/services/amc/page.tsx` |
| `/services/sales` | `app/services/sales/page.tsx` |
| `/services/toner` | `app/services/toner/page.tsx` |
| `/services/printer-spare-parts` | `app/services/printer-spare-parts/page.tsx` |

### Location Landing Pages (SEO)
| Route | File |
|-------|------|
| `/printer-rental-dubai` | `app/printer-rental-dubai/page.tsx` |
| `/printer-rental-abu-dhabi` | `app/printer-rental-abu-dhabi/page.tsx` |
| `/printer-rental-al-ain` | `app/printer-rental-al-ain/page.tsx` |
| `/printer-rental-rak` | `app/printer-rental-rak/page.tsx` |
| `/printer-rental-fujairah` | `app/printer-rental-fujairah/page.tsx` |
| `/photocopier-rental-sharjah` | `app/photocopier-rental-sharjah/page.tsx` |
| `/copier-lease-uae` | `app/copier-lease-uae/page.tsx` |
| `/printer-repair-dubai` | `app/printer-repair-dubai/page.tsx` |
| `/canon-printer-dubai` | `app/canon-printer-dubai/page.tsx` |
| `/hp-printer-abu-dhabi` | `app/hp-printer-abu-dhabi/page.tsx` |

### Brand Pages
| Route | File | Notes |
|-------|------|-------|
| `/brands/[slug]` | `app/brands/[slug]/page.tsx` | Dynamic: sharp, epson, + fallback |
| `/brands/canon` | `app/brands/canon/page.tsx` | Static brand page |
| `/brands/hp` | `app/brands/hp/page.tsx` | |
| `/brands/kyocera` | `app/brands/kyocera/page.tsx` | |
| `/brands/brother` | `app/brands/brother/page.tsx` | |
| `/brands/xerox` | `app/brands/xerox/page.tsx` | |
| `/brands/lexmark` | `app/brands/lexmark/page.tsx` | |
| `/brands/samsung` | `app/brands/samsung/page.tsx` | |
| `/brands/ricoh` | `app/brands/ricoh/page.tsx` | |

---

## Admin Pages (Routes under `/admin`)

| Route | File | Purpose |
|-------|------|---------|
| `/admin` | `app/admin/page.tsx` | Dashboard overview |
| `/admin/login` | `app/admin/login/page.tsx` | Auth |
| `/admin/products` | `app/admin/products/page.tsx` | CRUD products → syncs to D1 + localStorage |
| `/admin/brands` | `app/admin/brands/page.tsx` | Manage brand list |
| `/admin/blog` | `app/admin/blog/page.tsx` | Blog post list |
| `/admin/blog/editor` | `app/admin/blog/editor/page.tsx` | Rich text editor |
| `/admin/inquiries` | `app/admin/inquiries/page.tsx` | View quote/contact form submissions |
| `/admin/clients` | `app/admin/clients/page.tsx` | Client logos |
| `/admin/supplies` | `app/admin/supplies/page.tsx` | Toner/parts inventory |
| `/admin/banners` | `app/admin/banners/page.tsx` | Homepage banner management |
| `/admin/faqs` | `app/admin/faqs/page.tsx` | FAQ management |
| `/admin/settings` | `app/admin/settings/page.tsx` | Site-wide settings |
| `/admin/seo` | `app/admin/seo/page.tsx` | SEO metadata manager |

---

## API Routes (`/api/*`)

All routes use `export const runtime = 'edge'` and `getRequestContext().env.DB` for Cloudflare D1.

| Endpoint | Methods | Purpose | D1 Table |
|----------|---------|---------|----------|
| `/api/products` | GET, POST, DELETE | Product CRUD | `products` |
| `/api/brands` | GET, POST, DELETE | Brand list | `brands` |
| `/api/blogs` | GET, POST, DELETE | Blog posts | `blogs` |
| `/api/inquiries` | GET, POST | Quote/contact submissions | `inquiries` |
| `/api/faqs` | GET, POST, DELETE | FAQ entries | `faqs` |
| `/api/supplies` | GET, POST, DELETE | Toner/parts | `supplies` |
| `/api/banners` | GET, POST, DELETE | Hero banners | `banners` |
| `/api/settings` | GET, POST | Site settings key-value | `settings` |
| `/api/upload` | POST | File upload to R2 | — |
| `/api/convert-image` | POST | Fetch URL or upload → convert to WebP | — |
| `/api/analytics/ping` | POST | Record visitor heartbeat (sessionId, page) | `visitors` |
| `/api/analytics/stats` | GET | Return count of visitors active in last 5 min | `visitors` |

### Products API Schema

D1 table `products` columns:
```sql
id          TEXT PRIMARY KEY
name        TEXT
brand       TEXT
category    TEXT
condition   TEXT
priceSale   TEXT
priceRental TEXT
specs       TEXT  -- pipe-delimited: "55 PPM|Full Color|A3 Support"
image       TEXT  -- local path: /images/printer-canon-1.webp
isActive    INTEGER  -- 0 or 1
isFeatured  INTEGER  -- 0 or 1
createdAt   TEXT
```

GET returns `{ products: [] }` when DB not configured → triggers client fallback.

### Visitors Table (Live Tracking)

```sql
CREATE TABLE IF NOT EXISTS visitors (
  session_id TEXT PRIMARY KEY,
  last_seen  INTEGER NOT NULL,  -- Unix timestamp (seconds)
  page       TEXT
);
CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen);
```

**Run this migration in Cloudflare D1 before deploying live tracking.**
Stats endpoint returns visitors with `last_seen > now() - 300` (5-minute window).
Stale rows are auto-purged on every ping (older than 10 min).

---

## Components

| Component | File | Purpose |
|-----------|------|---------|
| `Header` | `components/Header.tsx` | Navigation bar |
| `Footer` | `components/Footer.tsx` | Site footer with links |
| `MobileNav` | `components/MobileNav.tsx` | Bottom nav for mobile |
| `WhatsAppCTA` | `components/WhatsAppCTA.tsx` | Floating WhatsApp button |
| `JumpToTop` | `components/JumpToTop.tsx` | Scroll-to-top button |
| `SafeImage` | `components/SafeImage.tsx` | `<img>` with `onError` fallback to `/images/heroPrntr1.webp` |
| `VisitorTracker` | `components/VisitorTracker.tsx` | Invisible client component — pings `/api/analytics/ping` every 30s; included in `layout.tsx` |
| `CountUp` | `components/CountUp.tsx` | Animated number counter (Intersection Observer) |
| `StatsClay` | `components/StatsClay.tsx` | Stats display block |
| `SEOInjector` | `components/SEOInjector.tsx` | Dynamic SEO meta injection |
| `CipherText` | `components/CipherText.tsx` | Scramble text animation |
| `MagneticHover` | `components/MagneticHover.tsx` | Mouse-tracking hover effect |

---

## Data Flow

```
Admin Dashboard (/admin/products)
  ├── fetchProducts() → GET /api/products
  │     ├── D1 available → returns rows → setProducts(mapped)
  │     └── D1 empty/unavailable → setProducts(initialProducts) + localStorage.setItem()
  └── handleSave() → POST /api/products + localStorage.setItem()

Public Products Page (/products)
  └── useEffect → GET /api/products
        ├── D1 has data → setProducts(mapped) + localStorage.setItem()
        ├── API fails → localStorage.getItem("sahara_products")
        └── localStorage empty → setProducts(defaultProducts)  ← 12 local-image products
```

---

## localStorage Keys

| Key | Content | Set By |
|-----|---------|--------|
| `sahara_products` | `Product[]` JSON | admin/products, products page |

### Stale Data Warning

Old localStorage may contain external image URLs (`lh3.googleusercontent.com`, etc.) that are broken.
**All three read sites apply `localImg()` sanitizer at read-time** — no version bump needed:

```ts
const BRAND_IMAGES: Record<string, string> = {
  Canon: "/images/printer-canon-1.webp",   HP: "/images/heroPrntr1.webp",
  Kyocera: "/images/printer-kyocera.webp", Xerox: "/images/printer-xerox.webp",
  Brother: "/images/printer-brother.webp", Ricoh: "/images/printer-ricoh.webp",
  Samsung: "/images/printer-samsung.webp", Lexmark: "/images/printer-lexmark.webp",
};
function localImg(image: string, brand: string): string {
  if (image && image.startsWith("/")) return image;        // local path → pass through
  return BRAND_IMAGES[brand] || "/images/heroPrntr1.webp"; // external → brand default
}
```

Applied in: `app/page.tsx` (FeaturedProducts), `app/products/page.tsx`, `app/admin/products/page.tsx`.

---

## CSS Variables (`globals.css`)

```css
--surface: #071325           /* page background */
--surface-container-low: #101c2e
--surface-container: #142032
--surface-container-high: #1f2a3d
--surface-container-highest: #2a3548
--primary: #f5be53           /* gold accent */
--primary-container: #c8962e
--on-primary: #412d00        /* dark text on gold */
--on-surface: #d7e3fc        /* light body text */
--on-surface-variant: #d3c5b0
--outline: #9c8f7c
```

### Utility Classes
- `.glass-card` — frosted glass card (blur + border + bg)
- `.gold-gradient` — `#f5be53` → `#c8962e` diagonal gradient
- `.btn-primary` — gold gradient pill button
- `.btn-secondary` — glass pill button
- `.aeo-block` — AEO quick-answer box (dark bg, gold border, used for GEO/AI citations)
- `.animate-infinite-scroll` — horizontal logo scroll (30s linear infinite)
- `.animate-carousel` — product carousel (25s linear infinite)

---

## SEO / GEO Implementation

### Schema.org (structured data)
- Homepage: `Organization`, `LocalBusiness`, `WebSite` + `speakable`
- About: `AboutPage` + nested `Organization`
- Service pages: `Service`, `HowTo`, `FAQPage`
- Location pages: `LocalBusiness` with address per emirate

### GEO (Generative Engine Optimization)
- `.aeo-block` quick-answer divs on all key pages for AI citation extraction
- `speakable` schema pointing to `["h1","h2",".aeo-block"]`
- `FAQPage` schema on service and location pages

### Canonical / Alternates
- Pattern: `https://www.saharaprinter.com/<slug>`
- Location pages (older): may use `https://saharaprinter.com/` (no www) — do not change

### Sitemap
- `public/sitemap.xml` — 50+ URLs, lastmod `2026-04-15`

### AI Crawler Access
- `robots.txt` — allows GPTBot, Claude-Web, PerplexityBot

---

## Image Convention

All product/brand images use local paths served via Cloudflare Pages CDN (same infrastructure as R2).

| Brand | Image Path | Actual Content |
|-------|-----------|----------------|
| HP | `/images/printer-hp.svg` | HP LaserJet Enterprise illustration (SVG, exists in public/images — push to deploy) |
| Canon | `/images/printer-canon-1.webp` | Canon imageRUNNER fleet |
| Kyocera | `/images/printer-kyocera.webp` | Kyocera TASKalfa |
| Brother | `/images/printer-brother.webp` | Brother HL series |
| Xerox | `/images/printer-xerox.webp` | Xerox AltaLink |
| Ricoh | `/images/printer-ricoh.webp` | Ricoh MP series |
| Samsung | `/images/printer-samsung.webp` | Samsung ProXpress |
| Lexmark | `/images/printer-lexmark.webp` | Lexmark MS series |
| Generic fallback | `/images/printer-canon-1.webp` | Used by SafeImage.tsx onError |

### What other images contain (do NOT use as printer images)
| File | Actual content |
|------|---------------|
| `heroPrntr1.webp` | Canon-branded printers — use only for Canon pages |
| `heroBnr1.webp` | Sahara gold banner background — not a printer |
| `homement.webp` | Sahara staff member photo |
| `unsplash-office.webp` | Dubai skyline aerial |
| `printer-canon-2.webp` | Flatbed printer at trade expo |
| `hero-bg.webp` | Page hero background texture |

### R2 vs Pages CDN
- `public/images/` → served by **Cloudflare Pages CDN** (automatic, no R2 config needed)
- Admin-uploaded images → saved to **R2 bucket** `SAHARA_ASSETS` via `/api/convert-image` (requires R2 configured in wrangler.toml)
- Both deliver from Cloudflare's edge — equivalent speed for PageSpeed Insights

### `localImg()` sanitizer (applied at every localStorage read)
```ts
// In: app/page.tsx, app/products/page.tsx, app/admin/products/page.tsx
const CANON_ONLY = new Set(["/images/heroPrntr1.webp", "/images/printer-canon-2.webp"]);
function localImg(image: string, brand: string): string {
  // Reject: external URLs OR Canon-only images assigned to non-Canon brands
  if (!image || !image.startsWith("/") || (CANON_ONLY.has(image) && brand !== "Canon")) {
    return BRAND_IMAGES[brand] || "/images/printer-canon-1.webp";
  }
  return image;
}
```
- Fixes stale localStorage with `lh3.googleusercontent.com` URLs
- Fixes `heroPrntr1.webp` (Canon-branded) being shown on HP/other brand products
- `heroPrntr1.webp` is Canon-branded — only safe to use for Canon brand cards

**Rule:** Never use external image URLs. Always `/images/*.webp`. GitHub push → Cloudflare deploys to CDN automatically.

---

## Key Business Info

| Field | Value |
|-------|-------|
| Company | Sahara Office Equipment Trading LLC |
| Founded | 2012 |
| HQ | Al Arabi Building, Industrial Area 11, Sharjah, UAE |
| Phone | +971503823969 |
| Email | info@saharaedoc.com |
| Website | https://www.saharaprinter.com |
| Google Rating | 4.9 / 5 (66 reviews) |
| Starting Price | AED 250/month |
| Response Time | 4-hour emergency response |
| Service Area | Dubai, Sharjah, Abu Dhabi, Ajman, RAK, Fujairah, Al Ain, UAQ |
| Brands | Canon, HP, Xerox, Kyocera, Ricoh, Brother, Samsung, Lexmark |
