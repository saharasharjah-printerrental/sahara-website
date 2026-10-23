# GSC Page indexing audit — 2026-10-23

Source: Search Console UI, property sc-domain:saharaprinter.com, report "Page indexing" (last update 10/16/26): 142 indexed, 266 not indexed in 8 reasons. URL lists read from each reason's examples table; live status checked with curl on 2026-10-23 (follow redirects).

## Summary: no valuable page is excluded by mistake. GSC is mostly showing stale legacy URLs.
| Reason (pages) | What the URLs are | Live status today | Action |
|---|---|---|---|
| Not found 404 (36), validation Failed 10/17 | Legacy paths: old nav (`/repair-amc`, `/green-initiatives`, `/locations*`, `/printer-photocopier-rental-leasing-*`), capitalised "Printer" slugs, 3 `/blogs/...` | 30 of 36 already 308 to a relevant live page (1-2 hops). 6 are real 404s | See below |
| Soft 404 (12) | Old-site paths (`/aboutus`, `/contact-us`, `/client`, `/service`, `/copier-rental-catalog*`, `/UAE`, `/ProductEnquiry`, `/servicemaintance`) and `/blogs/?search={search_term_string}` | 11 redirect to a relevant page; the `{search_term_string}` URL returned 200 with an empty list | Redirect added (middleware) |
| Server error 5xx (1) | `/products/canon-imageclass-mf644cdw/` (last crawled Sep 11) | Now 308 to `/products/`, 200 | None; re-validate |
| Redirect error (1) | `https://saharaprinter.com/about` (apex, no slash) | 301 to www, 308 to `/about/`, 200 (2 hops) | None; chain is Cloudflare-side (see below) |
| Crawled, not indexed (12) | Assets (`llms.txt`, favicon, webmanifest, `.webm`, two `.woff2`), `/quote/...?context=` (noindex + canonical), non-slash and capitalised duplicates | Assets/duplicates by design | None |
| Excluded by noindex (89) | The 47 listed were all `/quote/*?...`, `/request-quote/`, `/pvc-card-printer-quote/` form URLs (47 of 89 read; list is virtualised) | Intentional | None |
| Page with redirect (86), Alternate page with canonical (29) | Not read URL by URL. Google lists these as not-errors | By design | None |

## Real defects found and fixed in code (uncommitted)
1. `/about-sahara-printer` was a real 404 (crawled by Google on Oct 17): added to `LEGACY_REDIRECTS` in `next.config.mjs` -> `/about/`.
2. `/blogs/?search={search_term_string}` Soft 404 (left over from the removed SearchAction): `src/middleware.ts` now 308-redirects that literal placeholder to `/blogs/`.

## Left alone on purpose
`/7`, `/&`, `/$`, `/mo`, `/month`: no equivalent page; no link on this site points to them (grepped src). They look like truncated or garbled external links. A 404 is correct.

## Not fixable in code
- Apex `saharaprinter.com/x/` -> `www.../x` drops the trailing slash, so every apex URL takes 2 hops (301 then 308). It works; collapsing it needs a Cloudflare Redirect Rule that preserves the path and adds the slash.
- Legacy redirects are 2 hops (trailing slash first, then the mapped destination). Google follows these; collapsing them needs a middleware map keyed on the no-slash path.

## Next steps (user, in Search Console, after deploy)
Click "Validate fix" on: Not found (404), Soft 404, Server error, Redirect error, and Crawled-not-indexed if offered. Expect the counts to fall as Google recrawls (weeks, not days). Do not request indexing for the legacy URLs.
