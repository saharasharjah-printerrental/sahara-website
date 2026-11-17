# Remediation meta prompt for review

Work in C:\Users\DK\Documents\GitHub\sahara-website on https://www.saharaprinter.com.

Read AGENTS.md, .claude/rules/seo-operating-law.md, current HANDOFF.md, the full audit docs/seo/shredder-search-visibility-2026-11-17.md, its browser GSC snapshots, and docs/seo/jev-2026-11-17/digest.md. Inspect worktree and commit history. Preserve user changes. Do not repeat completed October fixes.

## Required skills and tools

Invoke and read applicable skills before use:

- jev-seo for crawl and technical findings. Existing 97/A score is partial: page cap reached, semantic key absent, PSI throttled.
- seo-google for Search Console, URL Inspection and CWV.
- seo-technical, seo-sitemap, seo-page, seo-schema and seo-content for scoped code reviews.
- seo-bing for Bing indexing, sitemap and citations.
- seo-local for GBP evidence.
- seo-images only if verified image evidence leads to a change.
- investigate-first before unresolved diagnosis; surgical-patch for minimal edits.
- systematic-debugging if implementation reveals a failure.
- Use Agent Desktop/browser for signed-in GSC, GBP, Clarity and Bing. Wait for views to load; record source, extraction time, dates and filters.
- Skip unrelated skills.

## Authorization and scope

Implement contained local website changes described below, based on audit evidence. Do not commit, push, deploy, alter production data, change GBP, submit indexing requests or change account settings; those need separate authorization. Preserve secrets. Use existing read-only GSC authorization only; never broaden scopes. If OAuth fails, record the exact error and continue independent work.

## Baseline

GSC property sc-domain:saharaprinter.com, Web search, equal windows Oct 19-Nov 15 vs Sep 21-Oct 18, all countries/devices:

- Property clicks: 223/199.
- Rental /services/paper-shredder-rental/: 9/10 clicks, 941/584 impressions, position 12.1/13.9.
- Sales /services/paper-shredder-sales/: 5/1 clicks, 739/172 impressions, position 22.4/30.3.
- Rental had impressions all 28 days and is indexed. Bing confirms rental and sales indexed with no SEO/GEO issues.
- Generic machine queries gained impressions without clicks. Purchase-intent mismatch remains a hypothesis; rental-intent position improved.
- Exact user-reported zero view remains unknown. Do not call this a site-wide or shredder-wide zero until URL, dates, search type and filters are known.
- Desktop CrUX: LCP >2.5s, 53 URLs, example /services/printer-rental/ group LCP 2.9s; validation started Oct 12, data updated Nov 9. Mobile lacks 90-day usage.
- Manual actions/security issues: none. Clarity sample is only three days and low volume. Bing AI citations 49/71 while Bing clicks/impressions rose 8/5 and 238/180.

## Phase 1: resolve material unknowns

1. Inspect GSC Page indexing. Identify exact zero-impression URL/date/filter if present. Check rental, sales and product URLs, query/page filters, search type, country and device. If dashboard inspection cannot identify the user's view, ask for the precise URL/date/filter.
2. Verify production deployment time from deployment records. Compare equal, complete windows wholly before/after verified deployment. Local commit date is not deployment evidence.
3. Refresh GSC using existing read-only credentials only. Never print secrets. If OAuth returns invalid_grant, record it and use available UI evidence.
4. Identify CWV affected URL examples. Profile route and shared template LCP before coding.
5. Check current UAE SERPs and query overlap between shredder rental and sales. Separate demand, ranking, CTR and page effects. Do not invent keyword volumes.
6. Finish matched GBP performance comparison and Clarity organic/shredder segment if dashboards remain responsive. Record blockers honestly. Partial months and small samples cannot establish causality.

## Phase 2: confirmed, bounded fixes

1. Sitemap omission: add /bravo-card-printers-uae/ to existing static routes in src/app/sitemap.ts. Set lastmod from actual content history; leave other dates unchanged. Acceptance: one canonical sitemap URL, HTTP 200, indexable, self-canonical, no redirect. Rollback: remove only its route/date entries. This does not explain shredder visibility.
2. Open Graph images: add an existing suitable image to homepage and services metadata using current conventions. Acceptance: absolute image URL in raw HTML and resolving preview; title, description and canonical unchanged. Rollback: revert only these metadata changes. This is a social preview fix, not a proven Google ranking fix.
3. Desktop LCP: if route evidence confirms a shared bottleneck, make the smallest change at the responsible component/resource. Preserve dynamic content, authentication, admin and quote behavior. Acceptance: repeatable desktop lab improvement on affected template, no mobile/layout/functional regression; monitor later CrUX. Do not make broad caching changes from a single TTFB sample.

## Phase 3: conditional shredder and analytics work

1. If matched query data confirms purchase queries land on rental, improve routing and relevant internal links between existing rental and sales pages. Change titles/content only where intent and accurate offerings support it. Preserve rental query coverage, pricing and service claims. Avoid duplicate thin pages and blanket rewrites.
2. If Clarity shows reproducible shredder-page friction, fix only that evidenced UX issue. Tag delay, /admin/ visits or few Clarity sessions alone do not establish missing Google impressions.
3. Bing AI citations fell while Bing search visibility rose. Inspect cited queries/pages before content changes. No speculative schema, crawler or GBP changes.

## Validation and handoff

For each change, state target file/URL, audit finding, expected benefit, acceptance criteria, risk, rollback and measurement date. Validate sitemap output, raw metadata/canonical/robots, HTTP status, touched schema and affected mobile/desktop rendering. Run relevant build/type checks for code changes. Test quote/contact behavior if shared code changes. Preserve intentional noindex on /quote/. Do not chase Jev scores or title-length heuristics.

Save implementation results under docs/seo/ and append a dated HANDOFF.md point without removing earlier notes. Include exact diff and validation. Measure from actual deployment D, D+14 and D+28 using equal, complete GSC windows; report clicks, impressions, CTR, position and qualified leads separately. Traffic gains are not guaranteed. Stop before commit/push/deploy and present reviewed local changes for approval.
