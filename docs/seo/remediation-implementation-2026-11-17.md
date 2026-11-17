# SEO remediation implementation — 2026-11-17

Source: `docs/seo/meta-prompt-remediation-2026-11-17.md`.

## Implemented

| Finding | Change | Validation | Rollback |
|---|---|---|---|
| `/bravo-card-printers-uae/` was indexable but absent from the XML sitemap. | Added its static sitemap entry and pinned `lastModified` to its page's actual last content commit: `2026-10-05T16:46:27+04:00`. | Type/build checks pending below; production sitemap must show the canonical URL after deployment. | Remove the route and `ROUTE_LASTMOD` entry. |
| `/services/` overrides Open Graph metadata and had no route-level social image in the audit. | Added the existing, WebP `heroPrntr1.webp` with width, height, and descriptive alt text. | Type/build checks pending below; inspect rendered `<meta property="og:image">` after deployment. | Remove the `images` array from `src/app/services/page.tsx`. |

## Investigated, not changed

Desktop CrUX’s 53-URL LCP group uses `/services/printer-rental/` as its representative URL and reports 2.9 s LCP. Its shared `ProductHero` already renders the hero with explicit dimensions, `priority`, `fetchPriority="high"`, responsive `sizes`, and no lazy loading. No concrete regression was identified; avoid speculative performance changes. Re-measure production CWV after the next deploy, then use a field/lab trace to isolate network, render, or third-party work.

The shredder pages were not changed. GSC evidence showed impressions across every day in the analysed rental window, so the reported zero-impression condition remains unverified for an exact URL/date/filter.

## Measurement

After deployment, verify the Bravo URL appears in `/sitemap.xml`, inspect it in GSC, and compare its impressions/clicks with the preceding 28 days after sufficient data accrues. Confirm `/services/` returns an absolute `og:image` URL and has a valid social preview.
