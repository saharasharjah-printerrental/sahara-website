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

## Update 2026-10-23 (evening): icon font and post-deploy measurements
Post-deploy Lighthouse (mobile, simulated): Kyocera 43 -> 64 (LCP 11.0 -> 6.8 s), printer-rental 45 -> 54 (LCP 9.3 -> 5.9 s), homepage 57 -> 49 / 60 / 54 / 61 over four runs (TBT 930 -> 370-690 ms; LCP 4.5 -> 5.1-6.7 s). First paint stayed ~2.4 s on every page; the homepage LCP element is plain hero text, so the blocking Google Fonts stylesheet (Material Symbols) was the likely cause.
Fix (uncommitted, not yet deployed): the stylesheet and its two preconnects are gone from `layout.tsx`. A 39-icon static subset (5.7 KB woff2) is self-hosted at `public/fonts/material-symbols-outlined-subset.woff2`, preloaded, with `@font-face` (`font-display: block`) and the icon class rule in `globals.css`, and a 30-day cache header in `public/_headers`. Only one icon style (FILL 0, wght 400, opsz 24) is used in `src`, so a static subset is enough. Verified locally on /products/ (grid/list/search icons) and /canon-printer-repair/ (FAQ chevrons); 0 Google Font references on /, /canon-printer-repair/, /rental-calculator/, /products/. Adding a new icon requires regenerating the subset (instructions in the globals.css comment); a missing icon renders blank.
Next: after deploy, three Lighthouse runs per page and compare medians with the table above.

## Phase 4 result, 2026-10-23 ~13:50 (after the icon-font deploy; mobile Lighthouse, simulated throttling, 3 runs per page)
| Page | Score runs | Median score (before -> after) | Median LCP (before -> after) | Median FCP | Median TBT (before -> after) |
|---|---|---|---|---|---|
| `/services/printer-rental/` | 61 / 65 / 79 | 45 -> 65 | 9.3 s -> 3.3 s | 2.3 s | 850 -> 442 ms |
| `/brands/kyocera/` | 51 / 43 / 47 | 43 -> 47 | 11.0 s -> 8.7 s | 2.4 s | 1,400 -> 1,048 ms |
| `/` | 51 / 73 / 46 | 57 -> 51 | 4.5 s -> 4.9 s | 2.4 s | 930 -> 1,522 ms |
"Before" is the original single run from the morning. Run-to-run noise is large on this machine (homepage 46 to 73; an earlier Kyocera run scored 64), so only the printer-rental improvement is clearly beyond noise. Homepage: no improvement within noise; TBT varied from 370 to 1,522 ms across runs and is not a reliable signal here.
First contentful paint did NOT change (about 2.4 s before and after), so removing the blocking Google stylesheet was not the cause of the slow first paint. Network is no longer the limit: HTML first byte ~0.2-0.4 s, CSS and fonts finished by ~0.9 s, no Google font requests, icon font 7 KB. What remains is browser main-thread work (JavaScript parse/execute and hydration) before the first paint. Next investigation: a main-thread trace to see what runs before first paint.
Laya G3 (advisory, verbatim): homepage "LCP improved by 0.5 s" P(true)=0.7988 (measured: LCP got 0.4 s worse, so Laya was wrong); printer-rental 0.6332 (measured: improved 6.0 s); Kyocera 0.7613 (measured: improved 2.3 s); decision `keep` with probabilities keep 0.4718 / revert 0.3781 / iterate 0.1501, confidence 0.0836 (low). Treated as inconclusive; the decision rests on the measurements: keep the change (low risk, no visual regression, no worse than noise on the homepage) and continue investigating first paint.

## Trace of the remaining first-paint / blocking time (2026-10-23, from the nine post-font Lighthouse runs)
- Simulated vs observed: Lighthouse's mobile profile simulates slow 4G (each request costs ~0.56 s, CPU 4x slower). Its simulated FCP (~2.4 s) is largely that model. Observed in the same runs: FCP 0.9-1.6 s (one 2.7 s outlier), LCP 0.9-2.7 s, page load 1.7-3.1 s. After the font and CSS fixes the network side is fast (HTML first byte 0.2-0.4 s, CSS and fonts done by ~0.9 s). So real first paint is mostly fine; the lab's 2.4 s floor is the simulation's round trips.
- What does cost real time is main-thread JavaScript: total blocking time varies 400-1,700 ms between runs. Long tasks (50 ms+) by source: (1) the Google Tag Manager container served at `/rf2d/` (first-party tag gateway): 100-460 ms tasks, ~400-700 ms scripting per page; (2) a second Google tag, `/gtag/js` (~450 ms in two runs); (3) shared Next.js/React chunks `1255-*`, `7855-*` (framer-motion, next/image), `4bd1b696-*` (react-dom): 250-560 ms tasks, ~0.8-1.0 s scripting; (4) the page's own style/layout work (280-440 ms at ~1.2-1.6 s); (5) Clarity (~150 ms). Third-party tags are already deferred to after load + 2.5 s.
- Candidate actions (none applied): audit the tags inside the GTM container (two Google tags are visible; remove unused ones and check Clarity/Meta are not loaded twice); reduce framer-motion usage (LazyMotion or CSS animations) to shrink the shared chunk; leave TBT as a lab proxy: real-user responsiveness is INP, which has no field data yet. Pushing the tags later improves lab TBT but loses analytics for visitors who leave quickly, so it is a trade-off, not applied.
