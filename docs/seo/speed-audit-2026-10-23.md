# Page speed audit and fixes — 2026-10-23

Measured with Lighthouse (mobile, simulated throttling) against production on 2026-10-23, plus the user-supplied PageSpeed Insights report for `/services/printer-rental/` (desktop, 67). Keyless PSI API was over quota. No field (CrUX) data exists for these URLs.

## Baseline (lab, mobile)
| Page | Score | LCP | TBT | TTFB / render delay |
|---|---|---|---|---|
| `/` | 57 | 4.5 s | 930 ms | 570 ms / 686 ms |
| `/services/printer-rental/` | 45 | 9.3 s | 850 ms | 1,856 ms / 1,728 ms |
| `/brands/kyocera/` | 43 | 11.0 s | 1,400 ms | 1,259 ms / 1,844 ms |
Desktop `/services/printer-rental/` (PSI): 67, LCP 2.3 s, TBT 440 ms, CLS 0. Insights: image delivery 296 KiB, unused JS 361 KiB, 9 long tasks.

## Causes (confirmed from the audits) and fixes applied
1. **Hero invisible until hydration** — `ProductHero` (11 pages) rendered h1, answer block and image with framer-motion `initial="hidden"` (opacity 0), so LCP waited for JS (render delay ~1.7 s). Fixed: server component with a transform-only CSS animation (`.hero-rise` in `globals.css`); also `fetchPriority="high"` and `sizes` on the hero image (was serving a 283 KB variant).
2. **Third-party tags in `<head>`** — GTM container (207 KB, served at `/rf2d/`), Clarity, Meta Pixel, Hotjar competed with first paint. Fixed: `deferUntilIdle()` in `layout.tsx` loads them after `load` + 2.5 s or on first interaction. Trade-off: visits that bounce in under ~2.5 s without interacting are not counted by these tools.
3. **Homepage hero** — CSS background image found late and `contentVisibility:auto` on the above-the-fold section. Fixed: `preload()` with high priority; property removed.

## Not fixed (needs your decision or dashboard access)
- **Server response time 1.1-1.9 s on interior pages** (`cf-cache-status: DYNAMIC`). HTML is rendered on demand at the edge with D1 lookups. Largest remaining win; needs a Cloudflare Cache Rule with short TTL + stale-while-revalidate for HTML, or ISR-style caching. Risk: admin edits appear after the TTL.
- ~360 KiB unused JS: framer-motion, next/image and MUI icons share a 136 KB chunk used site-wide; reducing it means moving components to LazyMotion/CSS animations across many files.
- Render-blocking Google Fonts stylesheet for Material Symbols (kept blocking deliberately to avoid ligature text flash).
- GTM container contents (tags inside Tag Manager) — audit in the GTM UI.

## Verify after deploy
Re-run Lighthouse on the same three URLs (mobile and desktop) and compare with the table; GSC Core Web Vitals needs 28 days of field data (checkpoint Nov 12).
