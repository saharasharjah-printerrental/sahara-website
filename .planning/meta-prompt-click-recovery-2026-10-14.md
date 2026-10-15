# Meta prompt: Sahara Printer organic click recovery pass (Oct 2026)

Act as the SEO engineer responsible for `saharaprinter.com`. Continue after the 2026-10-12 release of the quote flow. Work from current findings, diagnose with live data before editing, and distinguish measured defects from monitoring drift. Do not restage work that is already verified live.



- Last 28 days: 189 clicks (−29% vs previous 28d), 14.4K impressions (+12%), CTR 1.3%, avg position 13.7. Impressions RISING while clicks FALL — a CTR/collapse signature, not a crawl or GBP problem.
- GBP is healthy (interactions flat-to-up, website clicks recovering); exclude GBP from the root-cause hunt.
- The loss is concentrated on five URLs: `/brands/kyocera/` (−79%, −15 clicks), `/services/paper-shredder-rental/` (−35%), `/services/printer-spare-parts/` (−67%), `/services/amc/` (−60%), and a Canon spare-part detail page at 0 clicks. Together −31 clicks; everywhere else is scatter or gains.
- Kyocera: the user's export `C:/Users/DK/Downloads/saharaprinter.com-Performance-on-Search-2026-10-14.xlsx` (Page filter `+brands/kyocera`) dates the collapse to the week of **2026-09-21**: impressions halved (132 → 56 → 63 → 30/wk) while CTR held ~3% — a ranking drop, starting before the Sep 29 deploy, so no code delivery explains it. Winning queries are dealer/distributor intent (`kyocera dealer near me` pos 1, `kyocera resellers` pos 4.3); ~20 buy-intent terms (`wholesale copier`, `used copiers`, `discount copiers`, `copiers exporter`, pos 24–38) get zero clicks.
- Whole-property index coverage: 169 pages not indexed vs 143 indexed. This is the largest structural drag on new pages.
- Release fidelity verified live on 2026-10-14: `/services/paper-shredder-rental/` shows "From AED 450", `/quote/paper-shredder-rental/` 200, `/get-quote/` 308. Do not redo this work.

## Blockers to clear first (in this order)

1. ~~**Migration 028 still NOT applied to live D1.**~~ **CLEARED 2026-10-14.** Auth works; dry-runs passed; 028 executed remotely (7/7); live `qa-shr-2` bullets now 450/900; published article verified: `AED 150` ×0, `AED 450` ×10, `AED 900` ×10, `/quote/paper-shredder-rental/` CTA ×2. Note canonical live path is `/blogs/<slug>/`, not `/blog/<slug>/`.
2. Never submit the noindex quote forms to GSC/Bing/IndexNow as landing pages. Only changed public URLs.
3. Existing unverified fixes (P5 AEO items: `speakable` selector targeting `.aeo-block`, missing homepage AnswerBlock, FAQPage schema on blogs) stay on the backlog unless they fall out of this investigation.

## Task list for this pass

- **Kyocera (highest single loss):** *(10-14: audit DONE, code edited, gates green, UNCOMMITTED — pending visual check + approval)* audit title/H1/description against its actual winning queries (dealer, distributor, reseller, price intent). The current title "Kyocera Printers UAE | Authorized Dealer" matched the dealer queries during the Aug-Sep peak; decide whether buy-intent compounds belong on this page or a separate kyocera-copiers page. *Decision taken: price-led title `... | From AED 250/mo`, supplier/distributor words added to description/keywords/H1/AnswerBlock, buy-intent cluster (used/wholesale/off-lease) kept OFF this page.* Fix in code, verify with build + browser suite, then submit for re-indexing. Treat rankings, not CTR, as the KPI here.
- **Spare-parts and AMC:** investigate zero-click impressions at intact positions (the Canon laser-unit detail went 0 clicks at 100% −3); snippet or price-led-title work per the 2026-09-18 pattern (price-led title restored clicks on the shredder page after the Aug-7 regression). Only change what data supports.
- **Index coverage:** pull the Page Indexing report, classify the 169 "not indexed" pages (crawl vs quality vs duplicate), and clear the top fixable clusters before any new-page publication.
- **Monitoring:** start the 14/28-day baseline. Snapshot into `docs/seo/gsc-snapshots/` with the same table structure; compare weekly. Avoid claiming causation from single-week moves.

## Constraints

- Prices fluctuate daily: keep fixed prices out of code; the D1-driven paths (FAQs, blog rows) are the only price surfaces to edit.
- Do not emit `aggregateRating`/`review` markup (no real reviews available; manual-action risk).
- Keep the full `npm run build`, `tsc --noEmit`, security regression suite (`node --test tests/scripts/security-regressions.cjs`, 18/18 baseline), and `tests/scripts/quote-regression.ts` (31/31) green for any touched file paths.
- Preserve unrelated/dirty worktree files. Commit scope-clean: diff each file before staging; `git add -f .npmrc` stays mandatory on any new commit touching package.json.
- Browser automation: use `agent-browser --session <name>` with the GSC account projects@saharaedoc.com; do not log into owner accounts. Refreshed pagination workarounds may be needed — the Performance table pagination persists stale refs across clicks (use fresh snapshots per page, and prefer the xlsx export when pagination stalls).
- Stop before any remote write beyond the explicitly authorized D1 migration 028: report findings, wait for user approval before push, deploy, or new content publication.
