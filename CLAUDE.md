# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Sahara Printer Website

## Development Commands

### Core Commands
```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production (Next.js static export)
npm run start            # Start production server locally
npm run deploy           # Deploy static build to Cloudflare Pages
```

### Testing Commands
```bash
npm run test:e2e         # Run all test suites (smoke, visual, a11y, screenshots)
npm run test:smoke       # Smoke tests (basic flow validation)
npm run test:visual      # Visual regression tests (vs baselines)
npm run test:a11y        # Accessibility tests (WCAG compliance)
npm run test:screenshots # Capture SEO screenshots (1200x630 OG, 1080x1350 social)
npm run browser:install  # Install/update browser automation dependencies
npm run browser:doctor   # Diagnose browser automation issues
```

## Technology Stack

- **Framework:** Next.js 15 (App Router, Edge runtime, trailing slashes)
- **UI:** React 19, MUI v9.0.0 (@mui/material + @mui/icons-material)
- **Styling:** Tailwind CSS 3.4.1, MUI Emotion
- **Language:** TypeScript 5+ (strict: false by default)
- **State/Forms:** Redux Toolkit (minimal usage), Zod validation
- **Animation:** Framer Motion
- **Image Optimization:** Next.js Image + Sharp (WebP/AVIF formats)
- **Email:** Nodemailer (send-email API route, requires RESEND_API_KEY)
- **Testing:** Playwright + agent-browser MCP
- **Deployment:** Cloudflare Pages (Wrangler CLI) + next-on-pages
- **Node.js:** 20+ required

## Project Architecture

### App Router Structure
```
src/app/
├── (public routes) — pages, services, brands, rentals, blogs, etc.
├── admin/
│   ├── login/page.tsx — unauthenticated login page
│   └── (dashboard)/ — protected admin routes
│       ├── dashboard, settings, logos, products, banners
│       ├── brands, clients, testimonials
│       ├── faqs, inquiries, seo, blog, blog/editor
├── api/
│   ├── send-email/ — email-service.ts (Nodemailer, get-quote emails)
│   ├── cms/ — fetch blog, testimonials, brands, products from DB
│   ├── upload/ — file uploads for admin (images, logos)
│   ├── convert-image/ — image format conversion (WebP, AVIF)
│   ├── analytics/ — visitor tracking & stats (ping, stats routes)
│   ├── admin/* — admin-only endpoints (protected by referrer)
├── layout.tsx — root layout with SEO schema, GTM, analytics, custom scripts
└── globals.css — global Tailwind + custom theme CSS
```

### Public Pages
- **Homepage:** `/` — hero, AEO answer block, services, FAQs, testimonials
- **Services:** `/services/*` (rental, photocopier-rental, repair, amc, toner, sales, spare-parts)
- **Geographic pages:** `/printer-rental-dubai/`, `/printer-rental-abu-dhabi/`, etc.
- **Brand pages:** `/brands/[slug]` (Canon, HP, Kyocera, Xerox, Ricoh, Brother, Samsung, Lexmark)
- **Blog:** `/blogs`, `/blogs/[slug]`
- **Product catalog:** `/products`
- **Customer pages:** `/our-clients`, `/get-quote`, `/contact`, `/about`, `/rental-calculator`

### Admin Dashboard
- **Login:** `/admin/login` — referrer-based auth (no session DB yet)
- **Protected:** `/admin/(dashboard)/*` — manage FAQs, products, brands, blogs, logos, banners, clients, testimonials, inquiries, SEO settings
- **Blog editor:** Rich text editor for creating/editing blog posts with image upload

### API Routes (All use App Router handler syntax)
- **Email:** `POST /api/send-email` — send get-quote emails via Nodemailer
- **CMS:** `GET /api/cms` — fetch brands, testimonials, products, blogs (cached)
- **File handling:** `POST /api/upload` (logo/banner uploads), `POST /api/convert-image`
- **Analytics:** `POST /api/analytics/ping`, `GET /api/analytics/stats`
- **Admin:** `GET|POST /api/*` — update settings, FAQs, products, blogs, etc. (referrer-protected)
- **Streaming:** `GET /api/brands/stream`, `GET /api/testimonials/stream` (for real-time UI updates)

## Critical Implementation Rules

### MUI Icon Imports (ENFORCED)
Always import as **PascalCase without "Icon" suffix**:
- ❌ `import DeleteIcon from '@mui/icons-material/Delete'`
- ✅ `import Delete from '@mui/icons-material/Delete'`

This is critical because the next.config uses transpilePackages to compile MUI at build time. Incorrect casing breaks Icon name resolution.

### Build & SEO Verification
Before committing, verify:

1. **Pre-build checks:**
   - All service pages have AEO (Answer Engine Optimization) answer blocks in hero
   - Meta tags present in `layout.tsx` (title, description, OG, Twitter, canonical)
   - JSON-LD schema markup is valid (run through schema.org validator)
   - No dynamic/JS-rendered critical content (crawlers can't read it)

2. **Build commands:**
   ```bash
   npm run build               # Verify no errors (static export mode)
   npm run start               # Test production locally
   ```

3. **Post-build verification:**
   - Check `.next/` folder exists (full static export)
   - Verify homepage meta tags in browser DevTools
   - Run smoke test: `npm run test:smoke`

4. **Deployment:**
   ```bash
   npm run deploy              # Cloudflare Pages via Wrangler
   ```

### Caching & Stale Builds
If seeing stale React errors or HydrationMismatch:
```bash
rm -rf .next node_modules/.cache
npm run dev                    # Restart dev server
```

## Components & Client/Server Split

### Server Components (Default)
Layout, page routes, and data fetching happen server-side:
- Fetch from `/api/*` routes within server components
- Metadata exported in page/layout files
- Schema markup injected in `layout.tsx`

### Client Components (Marked with 'use client')
```
src/components/
├── *Client.tsx — interactive pages (HomepageClient, CalculatorClient, etc.)
├── MobileNav.tsx — mobile navigation state
├── FAQAccordionClient.tsx — expandable FAQs
├── ProductsClient.tsx, BlogsClient.tsx — filterable lists
├── Admin utilities — RichTextEditor, Toast notifications
└── SEOInjector.tsx — inject analytics/GTM scripts dynamically
```

Pattern: Server page imports client component
```tsx
// page.tsx (server)
import HomepageClient from '@/components/HomepageClient';
export default async function Home() {
  const data = await fetch('/api/...');
  return <HomepageClient initialData={data} />;
}
```

## Email Service Setup

**Location:** `src/app/api/send-email/email-service.ts`

Requires environment variable:
```
RESEND_API_KEY=your_resend_api_key
```

Used by:
- `POST /api/send-email` route
- Get-quote form (contact page)
- Admin inquiry notifications

## Testing Architecture

### Test Scripts
- **Smoke tests** (`tests/scripts/smoke-tests.ts`) — basic flow checks (homepage loads, get-quote works)
- **Visual tests** (`tests/scripts/run-visual-tests.sh`) — compare against baselines
- **A11y tests** (`tests/scripts/run-a11y-tests.sh`) — WCAG 2.1 AA compliance
- **Screenshots** (`tests/scripts/run-screenshot-tests.sh`) — capture OG images, social cards

### Browser Automation (agent-browser MCP)
All tests use agent-browser for:
- Session isolation (`--session <name>`)
- Element references (`@e1`, `@e2` from snapshot)
- Accessibility tree capture (better than CSS selectors)

**Key commands used in tests:**
```bash
agent-browser --session smoke open http://localhost:3000
agent-browser --session smoke wait --load networkidle
agent-browser --session smoke snapshot -i              # Interactive elements
agent-browser --session smoke click @e1                # Click by ref
agent-browser --session smoke screenshot               # Capture
agent-browser --session smoke close
```

## Node.js & Environment

- **Required:** Node.js 20+
- **Path alias:** `@/*` → `./src/*` (tsconfig.json)
- **Strict TypeScript:** Disabled (strict: false in tsconfig)
- **Edge Runtime:** Root layout uses `export const runtime = 'edge'` for Cloudflare

## Common Errors & Solutions

| Error | Cause | Fix |
|-------|-------|-----|
| HydrationMismatch | Stale build cache | `rm -rf .next && npm run dev` |
| Icon not found | Wrong icon name casing | Use PascalCase without "Icon" suffix |
| CORS on `/api/*` | Admin routes checking referrer | Ensure request has Referer header |
| Image format issue | Sharp build failure | Check Node.js version (20+) and rebuild |
| SEO schema missing | Not injected in layout.tsx | Add `<script type="application/ld+json">` in root layout |

## Database & CMS

- **Current:** Static JSON responses from `/api/cms` routes (can be extended to D1/Postgres)
- **Admin edits:** Updates stored in database (DB schema visible in layout.tsx getSEOConfig pattern)
- **Caching:** Consider ISR (Incremental Static Regeneration) for `/api/*` routes if using dynamic DB

## Deployment to Cloudflare Pages

```bash
npm run build                           # Creates .vercel/output/static
npm run deploy                          # Runs: npx wrangler pages deploy .vercel/output/static --project-name=sahara-website
```

**Note:** Uses next-on-pages adapter. Edge runtime in root layout is compatible.
