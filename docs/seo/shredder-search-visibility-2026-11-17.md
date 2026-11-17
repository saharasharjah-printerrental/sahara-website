# Search visibility audit, 17 November 2026

## Outcome and scope

Confirmed: the measured 28-day Google period does not show a site-wide click decline or zero shredder visibility. Rental received impressions every day. Individual zero-click days exist. The user's exact zero-impression filter/date combination remains unidentified. No causal link to the October changes is established.

Read-only investigation; no website, database, profile, indexing, or deployment changes. Audit artifacts are the only writes. Browser evidence was extracted on 2026-11-17, approximately 06:24-07:10 UTC. GSC rows carry exact extraction times in `gsc-snapshots/browser-2026-11-17/`. Browser sessions required waiting for SPA updates; URL changes alone were not accepted as evidence.

## Google evidence

Source: GSC domain property `sc-domain:saharaprinter.com`, Search type `Web (text)` as labelled in the UI, all countries/devices, no query filter. Equal completed calendar windows: **2026-10-19 through 2026-11-15** versus **2026-09-21 through 2026-10-18**. Dates verified from date-dialog inputs and single-period chart. UI last update: 3 hours ago; final API data could not be verified because OAuth refresh returned `invalid_grant`. Most recent UI data may still be revised.

| Surface | Clicks current / prior | Impressions current / prior | Position current / prior |
|---|---:|---:|---:|
| Property | 223 / 199 | 16.1K / 14.6K (rounded UI) | 14.1 / 13.2 |
| Shredder rental | 9 / 10 | 941 / 584 | 12.1 / 13.9 |
| Shredder sales | 5 / 1 | 739 / 172 | 22.4 / 30.3 |
| Fellowes | 6 / 2 | 333 / 177 | 24.8 / 19.5 |
| Kyocera | 9 / 7 | 327 / 223 | 9.7 / 11.1 |
| Printer rental | 24 / 18 | 2,224 / 3,175 | 9.0 / 9.9 |
| Printer rental Abu Dhabi | 6 / 4 | 666 / 1,173 | 18.6 / 13.8 |
| Printer rental Sharjah | 7 / 9 | 863 / 407 | 15.4 / 18.1 |
| Lexmark | 5 / 9 | 110 / 139 | 9.5 / 10.7 |
| Bravo hub | 2 / 5 | 329 / 268 | 13.8 / 14.0 |

Property clicks increased 12.1%. Rental impressions increased 61.1%, while clicks fell by one. Calculated rental CTR fell from 1.71% to 0.96%. Sales impressions increased 329.7%; clicks increased by four. These small click counts do not justify attributing a regression to deployment.

Rental daily rows: 28 days, **zero days with zero impressions**, 20 days with zero clicks. November 13/14/15 respectively had 35/33/15 impressions and zero clicks. Daily impressions ranged from 15 to 61. URL Inspection explicitly returned **URL is on Google / Page is indexed**, HTTPS valid and two valid Breadcrumb items.

Rental query comparison (same windows, exact page filter):

| Query | Impressions current / prior | Position current / prior | Clicks |
|---|---:|---:|---|
| paper shredder machine | 99 / 21 | 10.5 / 15.3 | 0 both |
| shredder machine | 72 / 2 | 10.2 / 21.0 | 0 both |
| paper shredder | 29 / 32 | 19.4 / 18.1 | 0 both |
| paper shredder dubai | 24 / 19 | 21.9 / 15.2 | 0 both |
| paper shredder rental | 15 / 16 | 3.0 / 3.9 | 0 both |

Confirmed: generic machine-query exposure grew without clicks, contributing to lower aggregate CTR. Hypothesis: purchase-oriented searches are reaching the rental page. Verify current UAE search results and the sales-page query overlap before changing targeting. Rental-intent position improved; a blanket rental ranking collapse is unsupported. Query rows omit anonymized queries, so zero query clicks do not mean zero page clicks.

## Cross-platform checks

Bing signed-in property `https://www.saharaprinter.com/`: daily dashboard series summed over the same October 19-November 15 and September 21-October 18 windows. Search clicks **8 / 5**, impressions **238 / 180**. AI citations **49 / 71**. AI decline is a separate measured surface, not evidence of Google indexing failure. AI report covers Microsoft Copilots and Partners; sampled grounding-query table includes `paper shredder price`, 12 citations over its displayed August 17-November 15 range. Citation metrics are not clicks or conversions. Bing URL Inspection separately reports both `/services/paper-shredder-rental/` and `/services/paper-shredder-sales/` as **Indexed successfully**, URL can appear on Bing, no SEO/GEO issues. Rental inspection found two markup types; sales found one. Bing sitemap reports one known sitemap, zero errors, zero warnings, and 141 URLs discovered; its URL detail table rendered no rows.

GBP: verified business, 5.0 rating, 73 reviews, primary category Office equipment rental service, public phone 050 382 3969, Sharjah Industrial Area 11 address. Recent post November 6. Performance June-November report showed September 103, October 122, November 82 interactions; November is partial and months differ in duration, so no equal-window growth claim. Summary card and report totals differed (577 vs 477), and report monthly rows did not reconcile to 477; do not use those totals as a causal signal. Exact daily comparison and Google-update details remain open.

Clarity project `rwtan9eo0w`, UI preset Last 3 days, unsegmented: 30 sessions, 32 bot sessions excluded, four rental pageviews, two dead-click sessions, two quick-back sessions, zero recorded JavaScript errors. Performance sample only four pageviews: LCP 0.89s, INP 130ms, CLS 0.018. These are not representative site-wide Google CWV. Exact date boundaries were not exposed in the collected view; do not compare this snapshot with GSC periods. `/admin/` appears among tracked pages. Source `src/app/layout.tsx` delays Clarity and other tags until interaction or 2.5 seconds after load, so very short passive visits may be missed. Neither tracking delay nor Clarity session counts explains GSC impressions.

## Technical audit and verified actions

Jev audit artifact: `jev-2026-11-17/audit.json`, digest alongside it. Fetched 60 pages; **page cap reached**, despite digest text saying `Caps: none`. Sitemap parser found 142 entries, 141 normalized unique URLs. Rules-only score 97/A is partial and is not a ranking prediction. TypeSafe key absent, zero semantic requests/spend. PSI returned HTTP 429 for all six requests. PDF dependency lacks Windows `libgobject-2.0-0`. UTF-8 rescore recovered digest after Windows encoding failure; no installed tool edits.

Both shredder services: HTTP 200, index/follow, no X-Robots exclusion, self-canonical in normalized crawl, sitemap inclusion, 59 sampled inlinks each, server-readable title/H1/content and parseable JSON-LD. Jev normalizes trailing slashes; its URL strings are not evidence of a slash-canonical regression. Schema parse success is not full rich-result eligibility validation.

| Finding | Status / priority | Target | Benefit, validation, rollback, measurement |
|---|---|---|---|
| Bravo hub absent from sitemap | Confirmed, P2 | `src/app/sitemap.ts`, `/bravo-card-printers-uae/` | Add canonical hub and actual content lastmod. Validate one entry, 200, indexable, self-canonical; revert only added entry. Check deployment day, then day 14/28. Not a shredder cause. |
| Missing OG image | Confirmed, P3 | Homepage/services metadata | Supply existing relevant image; check raw HTML and social preview; revert metadata diff. Validate deployment day. Not a demonstrated Google click cause. |
| Desktop CWV needs improvement | Confirmed report status, cause unresolved | Shared templates, affected URL group | GSC overview: 53 desktop URLs need improvement, zero poor/good; mobile no data. Inspect metric/group, then profile representative pages. Validate same-device lab and subsequent field window; revert isolated performance change. Recheck day 28. |
| Images lacking intrinsic dimensions | Heuristic candidate, P3 | 182 images across 33 sampled pages | Check CSS aspect-ratio/reserved space and actual layout shifts before editing. Do not change all images blindly. Validate mobile layout/CLS, revert affected component only. |
| Slow sampled TTFB | Hypothesis requiring repeat measurement, P2 | Nine sampled URLs, shared server/data fetches | Single crawler observations exceed 0.8s; cold cache/network are uncontrolled. Compare repeated cold/warm measurements before changing caching. Preserve dynamic/admin behavior. |
| Rental generic-query CTR dilution | Confirmed pattern; targeting remedy conditional | Rental/sales metadata, content and contextual links | Inspect query overlap and UAE intent first. Preserve truthful prices/services. Evaluate clicks, impressions, CTR and position separately after 14/28 days. |

JEV-001 `noindex` on `/quote/` is intentional: `src/app/quote/page.tsx` explicitly sets index false/follow true. **Do not remove it.** Heading skips/title lengths are heuristics, not proven traffic causes. No missing alt attributes, broken internal links, HTTP errors or malformed JSON-LD detected within the sample. Sample does not establish whole-site absence.

## Change timeline and causality

October 15: Kyocera changes and lastmod refresh. October 23 `025ed1e`: small shredder FAQ/industrial wording additions, sitemap updates, legacy redirect handling. `dc03ae5`: rental pricing alignment/shared metadata; `af9fbba`: local icon font and shared performance changes. Latest `ad5779b` is documentation. Local commit dates are not verified production deployment times. Worktree started clean. Live presence of current titles does not establish exact deploy time.

The current comparison window includes October 19-22 before the October 23 commits. A strict causal pre/post analysis requires deployment logs and equal weekday-aligned windows wholly before/after the verified deployment. Existing evidence supports page/query mix differences and small-count volatility, not a site-wide regression. Demand contraction cannot be inferred from site impressions alone.

## User report reconciliation

The user says “the shredder is getting 0 impression and 0 clicks.” No exact URL, date window, GSC search type or filters were supplied. For the rental URL in unfiltered Web search, GSC shows 941 impressions and nine clicks over Oct 19-Nov 15, with zero impressions on none of its 28 days. For the sales URL, it shows 739 impressions and five clicks in that period. Bing URL Inspection confirms both URLs indexed. Therefore the zero may describe a different URL, a narrower selected period, search type or filter; ask for the exact view before treating it as a property fact. This is the only unresolved factual input that changes interpretation.

## Remaining limitations

GSC API reauthorization needed for reproducible final-data export. Google Page indexing detail navigation timed out repeatedly. Manual actions and security issues both explicitly showed “No issues detected.” GSC sales URL inspection deep links return Google 404; do not treat those as page errors. Bing fills the sales URL indexation check. Whole-property daily anomaly detection, country/device segmentation, complete Google indexing buckets, GBP daily comparison, Clarity organic/shredder segmentation and mobile visual verification remain incomplete. GSC mobile CrUX has insufficient usage in the last 90 days. Desktop CrUX last updated November 9: LCP over 2.5s, 53 URLs in one group, example `/services/printer-rental/` with group LCP 2.9s; validation started October 12. The audit remains partial.

## Official references

- https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops
- https://support.google.com/webmasters/answer/17010575 (anonymized queries and discrepancies)
- https://support.google.com/webmasters/answer/17011165 (filtering/comparison)

These support separating page/query effects and investigating filters; they do not establish a cause for this site's fluctuations.
