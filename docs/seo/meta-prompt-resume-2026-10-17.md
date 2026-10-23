# Archived: Resume Sahara SEO audit (prompt dated 2026-10-17)

Archived verbatim-in-substance when `META_PROMPT.md` became the reusable template. Historical baseline, not current measurements.

Scope: read-only diagnosis and a concrete recovery proposal; no code, production data, GBP, crawler settings, indexing requests, commit, push, or deploy without explicit authorization.

Established evidence from October 15, 2026:
- GSC last 28 days vs previous 28 days: 194 vs 161 clicks (+20.5%), 14.4K vs 13.2K impressions, position 13.2 vs 18.9. Exact date boundaries not verified. No property-wide decline.
- Largest page click losses: Kyocera 5/19, shredder rental 10/18, AMC 2/6, spare parts 2/6. UAE clicks 149/116.
- Indexing: 143 indexed; 11 crawled-not-indexed with failed validation, 35 404s, 12 soft 404s, one redirect error, one server error. Needs refresh and URL-level diagnosis.
- No manual actions or security issues. Desktop CWV: 49 URLs needing improvement; mobile lacked data.
- Commit 5c11f12 corrected Kyocera sitemap lastmod (deployed); IndexNow returned HTTP 200. Do not repeat. Checkpoints: Oct 29 and Nov 12.
- Bing's earlier 107 citations and post-Sept-24 decline unverified with equal windows. GBP headline metrics healthy; comparable windows not extracted.

October 17 evidence:
- Sahara Chrome profile had GSC open for sc-domain:saharaprinter.com.
- GSC Messages showed "New Merchant listings structured data issues detected for saharaprinter.com" (Oct 16, 2026). Details and affected URLs not inspected.
- Browser tab selection took 13+ minutes; avoid repeated stalled calls.

Next work, in order:
1. Open the Oct 16 Merchant listings alert: issue names, severity, example URLs, counts, update dates; compare with source templates.
2. Refresh GSC with equal, complete windows (dates, search type, filters, extraction time); separate demand, ranking, CTR and page-mix effects for the four losing pages.
3. Inspect indexing-bucket URLs; separate intentional exclusions/retired URLs from real defects. No blanket redirects or noindex; no zero-exclusion target.
4. Recheck Bing AI Performance and GBP interactions with matching windows.
5. Review internal links, content, canonicals, SSR, robots and sitemap membership for implicated URLs; verify platform claims against current docs.
6. Produce `docs/seo/audit-resume-2026-10-17.md` with dated evidence, findings, hypotheses, blockers, and fixes (files/URLs, benefit, validation, rollback, measurement date).
7. Update `HANDOFF.md` with a short resume point; present proposal for review before implementation.
