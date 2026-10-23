# GSC baseline via API — 2026-10-23

Source: Search Console API (read-only), property `sc-domain:saharaprinter.com`, search type **web**, `dataState=final`, no filters except where stated. Extracted 2026-10-23. Raw rows: `docs/seo/gsc-snapshots/api-2026-10-23/*.json`. Script: `scripts/seo/gsc-query.mjs`.

Windows (equal, complete, 28 days each; end = today minus 3 for data lag):
- Current: 2026-09-23 to 2026-10-20
- Previous: 2026-08-26 to 2026-09-22

## Totals
| | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| Current | 201 | 14,760 | 1.36% | 13.4 |
| Previous | 174 | 13,950 | 1.25% | 17.3 |
Confirmed: the property is up (+15.5% clicks, +5.8% impressions, position improved ~3.9). This matches the Oct 15 UI reading (194 vs 161) with exact, now-verified dates. No property-wide decline. Small numbers: one click is ~0.5%, so page-level swings of 1-3 clicks are noise.

## Countries / devices
UAE 155 vs 125 clicks (impressions 12,384 vs 11,323; position 13.9 vs 18.3). India 18 vs 15, Pakistan 7 vs 1. Desktop 137 vs 121, mobile 64 vs 51 (mobile position 8.0).

## Page movers (clicks cur / prev, impressions cur / prev)
Losers: `/services/paper-shredder-rental/` 10/20 (586/1,054), `/brands/kyocera/` 7/17 (223/401), `/printer-rental-abu-dhabi/` 3/7 (1,129/1,383, position 14.1 vs 31.9), `/services/amc/` 2/5, `/printer-repair-dubai/` 1/4.
Gainers: `/services/printer-rental/` 21/12 (position 10.0 vs 12.9), `/printer-repair-sharjah/` 7/1 (impressions 775 vs 110), `/hp-printer-repair/` 4/0 (position 12.0 vs 36.3), `/brands/fellowes/` 4/0 (new), `/services/pvc-card-printing-services/` 4/0.

## The four losing pages (separating effects)
- **Shredder rental** — confirmed demand/impression effect, not ranking or CTR: generic queries lost impressions ("paper shredder" 106 to 32, "paper shredder machine" 82 to 20, "paper shredder machine dubai" 50 to 17) at near-unchanged position (about 12-18). The money query "paper shredder rental" holds position 3.9 (20 to 15 impressions). Query-level rows show 0 clicks for these terms in the current window, so the click loss is concentrated in terms not shown by the per-query rows (anonymized queries). Hypothesis (not tested): seasonality or Google re-matching generic shredder queries to product/shop results.
- **Kyocera** — mixed: impressions 401 to 223; position on the page 9.5 to 11.6 (slightly worse); lost queries "kyocera supplier in dubai" (13 to 3 impressions, position 14.2 to 22.7), "kyocera digital copiers", "kyocera dealer/resellers". Sitemap lastmod fix (5c11f12) was deployed Oct 15; the current window is mostly after the August-September period and ends Oct 20, so the effect of that fix cannot be judged until the Oct 29 / Nov 12 checkpoints.
- **AMC** (5 to 2 clicks) and **spare parts**: tiny volumes; AMC position actually improved (11.7 to 7.9) with more impressions (178 to 201): CTR/click noise, not a ranking loss.

## Indexing spot check (URL Inspection API) — resolves Semrush finding F1
All 22 URLs that returned 503 to the Semrush crawler: Google fetch state SUCCESSFUL on every one (last crawl up to 2026-10-22), no canonical mismatches. 19 are "Submitted and indexed". `/products/?page=1|2` are "Alternate page with proper canonical tag" (intended). `/quote/paper-shredder-sales/` and `/quote/printer-sales/` are "Excluded by noindex" (intended).
Conclusion (confirmed for Googlebot): the 503s were seen only by Semrush's crawler (likely Cloudflare throttling at its crawl rate); no Googlebot impact. Residual risk: Semrush crawl health score is distorted; consider an allowlist or slower crawl in Semrush settings. No site fix needed.

## Open items / blockers
- Not pulled via API: Core Web Vitals, the Merchant listings alert (Oct 16) details, index coverage bucket counts (API does not expose them; UI only). Oct 16 alert still needs opening in the UI.
- Query rows hide anonymized queries, so query sums are lower than page totals.
- Checkpoints: Oct 29 and Nov 12 — rerun `node scripts/seo/gsc-query.mjs baseline --end <date>`.

## Priority proposals (not applied; need authorization)
1. Fix Organization/LocalBusiness JSON-LD invalid properties (see `semrush-audit-2026-10-23.md` F2) — validation: Rich Results Test, Semrush recrawl; measure Nov 12.
2. `/printer-rental-abu-dhabi/`, `/printer-repair-sharjah/` and Sharjah pages are gaining position; reinforce internal links and local citations there (agency target pages).
3. Kyocera: strengthen "supplier/dealer/distributor in Dubai/UAE" intent on `/brands/kyocera/` (queries that dropped); measure on Nov 12.
