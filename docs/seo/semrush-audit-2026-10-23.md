# Semrush site audit — analysis (2026-10-23)

Source: `C:\Users\DK\Downloads\SEO insight oct-10-26\SemrushExport-100rows.csv` (100 crawled URLs; crawl date not stated in file, ideas export dated Oct 23, 2026), plus the two structured-data issue exports. Read-only analysis. No site changes made.

## Totals (100 URLs)
215 errors, 66 warnings, 15 notices. Status codes: 73 x 200, 3 x 301, 2 x 308, **22 x 503**.

## Findings

### F1. 22/100 URLs returned 503 to the Semrush crawler — RESOLVED: Googlebot unaffected (see gsc-baseline-2026-10-23.md)
Affected: brand pages (Brother, Epson, Fellowes, Konica Minolta, Lexmark, Samsung), 4 blog posts, `/products/?page=1|2`, 8 product pages, `/quote/paper-shredder-sales/`, `/quote/printer-sales/`.
Check on 2026-10-23 (curl, 9 of the 22 + `/services/amc/`): all returned 200, time_total 0.84-1.70 s. Googlebot UA on `/brands/brother/` returned 200.
So: not currently reproducible; cause (Cloudflare rate-limit/bot rule vs Worker/D1 cold errors under crawl concurrency) is unknown. Page times of ~1.3-1.7 s for a cold request are also slow.
Next: check Cloudflare Security Events/Workers logs for the crawl time window; re-run the Semrush crawl at lower concurrency; compare against GSC "Server error (5xx)" (1 URL on Oct 15). Do not change firewall rules until logs show the cause.

### F2. LocalBusiness / Organization structured data invalid — confirmed from export
- `LOCAL_BUSINESS`: 0 valid / 74 invalid. `ORGANIZATION`: 32 valid / 70 invalid.
- Causes (issue exports): `NOT_RECOGNIZED` properties `dateModified`, `dateEstablished`, `speakable` on Organization and LocalBusiness nodes (9 pages each in the 20-row samples); `REQUIRED` property `address` missing on 2 LocalBusiness instances (homepage).
- Valid elsewhere: BreadcrumbList 56/0, FAQ 37/0, Product 7/0, Article 14/0, HowTo 7/0.
- Possible link to the GSC Oct 16 "Merchant listings structured data issues" message: unverified; that alert's details must be opened before any link is claimed.
Proposed fix (needs authorization): in the layout JSON-LD, remove `dateModified`/`dateEstablished`/`speakable` from Organization/LocalBusiness nodes (use `foundingDate` for establishment; `speakable` and `dateModified` belong on WebPage/Article); ensure every LocalBusiness has a full `PostalAddress`. Validation: Rich Results Test + Schema Markup Validator + Semrush re-crawl. Rollback: git revert. Measure: GSC enhancement reports and Semrush on Nov 12.

### F3. Highest-error pages
`/sitemap.xml` 18 (crawled as a page; expected noise), `/products/` 16, `/blogs/` 7, `/services/amc/` 6, `/services/paper-shredder-sales/` 5, `/bravo-card-printers-uae/` 4, `/brands/canon/` 4. Per-issue breakdown is not in this export; need the Semrush issues report for `/products/` and `/services/amc/` (AMC is also a GSC click loser: 2 vs 6).

### F4. Indexable pages not in the sitemap
`/bravo-card-printers-uae/`, `/quote/` and 5 `/quote/*` pages, `/products/?page=1|2`. Semrush also lists `/robots.txt`, `/llms.txt`, `/sitemap.xml` and the non-www homepage (expected).
Decision needed: `/bravo-card-printers-uae/` is a ranking page (keyword "uae brao", pos 24) and should probably be in the sitemap; `/quote/*` are likely intentional noindex (verify robots meta); pagination URLs should canonicalize or be handled deliberately.

### F5. On-page hygiene
30/100 URLs report no canonical; 62 have meta description missing or over 160 chars; 20 titles over 60 chars. Needs URL-level list before fixes (some "no canon" rows are `robots.txt`/`llms.txt`/`sitemap.xml`, which don't need one).

### F6. Not found in this export
Backlink toxicity, Core Web Vitals, and broken internal links lists were not part of these files.

## Semrush "ideas" export (Oct 23, 2026)
Page / keyword cluster / volume: shredder rental ("industrial paper shredder machine" +3, 1.0k), paper-shredder-sales ("paper shredder", 590), `/services/repair/` ("canon printer repair near me" +3, 560), `/printer-repair-dubai/` ("fax machine service near me" +2, 460), `/services/` ("paper shredder rental" +1, 240), `/canon-printer-repair/` ("canon service center dubai", 140), PVC card printing ("pvc card printer", 110), `/brands/sharp/` ("sharp middle east fze", 1.0k), `/bravo-card-printers-uae/` ("heliozid oce emirates", 210). Some entries are brand/company names (Sabazu, Heliozid, Sharp Middle East FZE): treat as navigational and not as targets.
Position tracking: "uae brao" -> `/bravo-card-printers-uae/`, position 24, volume 90, new.

## Update 2026-10-23 (GSC URL Inspection)
All 22 F1 URLs: Google fetch state SUCCESSFUL, last crawl up to 2026-10-22, 19 indexed, 2 pagination URLs canonicalized by design, 2 quote URLs noindex by design. The 503s were seen only by Semrush (likely Cloudflare throttling its crawl rate). No site fix needed; optionally allowlist/slow the Semrush crawler.
