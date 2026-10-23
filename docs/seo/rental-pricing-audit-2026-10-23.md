# Rental pricing consistency audit — 2026-10-23

Trigger: Growthaiq (agency) email of 2026-10-18 — rental page says "no metered page charge", calculator adds AED 30 from 3,000 to 3,500 B&W pages. Meta prompt: `meta-prompt-rental-pricing-consistency-2026-10-23.md`.

## Confirmed (code)
Calculator (`src/components/CalculatorClient.tsx`): BASE_RENT 350; free pool 3,000 B&W + 1,000 colour (AED 380 value); excess B&W AED 0.06, colour AED 0.20; A3 surcharge +80 (both formats +50); 24-month 5% and 36-month 10% discount; price never below 350. 500 extra B&W pages = AED 30.

## Owner decision (2026-10-23, verbatim in substance)
Basic package AED 350/month; excess B&W 0.06 and colour 0.20 per page; compact A4 desktop printers start at AED 250. The calculator is correct; the "no metered charges" wording is the problem. Keep "unlimited toner" but explain page limits.

## Fixed in code (uncommitted)
- `services/printer-rental`: AEO answer, FAQ ("what's included"), FAQ ("what is leasing") now state the allowance and excess rates; "no metered page charge" removed.
- `photocopier-rental-dubai`: "no monthly copy caps" removed; allowance and excess rates stated.
- `printer-rental-dubai`: "Unlimited pages" on the A3 Enterprise plan -> "High volume — custom allowance"; excess-rate note added beside "no hidden fees".
- `CalculatorClient`: a visible bullet states the standard package, included pages and excess rates.
- Sitemap lastmod updated for the four pages.

## Open items (need owner input, not changed)
1. A3 entry price: pages say A3 from AED 500 (and 500–900); calculator A3 minimum is 350 + 80 = AED 430.
2. A4 compact (AED 250): the calculator has no A4-at-250 option (everything starts at 350); the pages say from AED 250. Unknown whether the 3,000/1,000 allowance and the same excess rates apply to the 250 plan.
3. Dubai plan table volumes ("Up to 2,000 pages", "Up to 15,000 pages") differ from the calculator's 3,000 + 1,000 pool.
4. Other local pages (Sharjah, Abu Dhabi, Fujairah, RAK, Al Ain) and blog copy use "all-inclusive", "unlimited toner" and "fixed monthly fee" without stating page allowances. Left as is: not a direct denial of page charges. Add the allowance sentence to them if wanted.
5. Admin-stored FAQ rows (D1 `faqs`) override code defaults. Check Admin → FAQs for slugs `services/printer-rental` and `photocopier-rental-dubai`; rows there may still carry "no metered per-page charges".
6. Blog posts quote "AED 900/month all-inclusive" for A3 colour; verify against the rate card.
7. Off-site: GBP description, directory citations and the agency's listings should use the same wording.

## Update 2026-10-23 (later): A4 tier and admin wiring
Owner confirmed: A4 = minimum AED 250 with 2,000 B&W + 750 colour pages; standard (A3, A4+A3) AED 350 with 3,000 + 1,000; excess AED 0.06 / 0.20. Implemented:
- `src/lib/calculator-pricing.ts` (types, defaults, validation, `computeQuote`), `calculator-pricing.server.ts` (D1 reader), `tests/scripts/calculator-pricing.test.ts` (npx tsx; passes).
- Calculator now reads the tariff from D1 `calculator_prices` (v2 JSON); the A4 tier applies to "A4 Only", the standard tier to A3 and A4+A3.
- Admin → Settings → Rental Calculator Pricing now edits the real fields. Before this, the form wrote into legacy field names and the calculator ignored it. Legacy stored values are ignored (defaults apply) until the admin saves once.
Open item 2 (A4 at 250 / allowance) is resolved. Items 1 (A3 AED 500 on pages vs 430 in the calculator) and 3 (Dubai plan volumes) remain.

## Update 2026-10-23 (night): A3 starting price and Dubai plan volumes
Owner decisions: the quote-page "old style" report was a mistake (dropped); A3 starting price is AED 350; Dubai plan volumes match the calculator pool.
- A3 starting price changed from AED 500 to AED 350 in titles, descriptions, FAQs, price tables, JSON-LD offer prices (`price`, `minPrice`) and comments on 14 pages plus 2 blog sources (60 lines). Ranges now read 350–900 / 350–1,000 / 350–2,000.
- `printer-rental-dubai` plan table: A4 "2,000 B&W + 750 colour pages included"; A3 Mid-Range and A3 Enterprise "3,000 B&W + 1,000 colour pages included".
- Not changed (model-specific): imageRUNNER ADVANCE 4551i "From AED 500/mo" (photocopier-rental-dubai) and MP 2555SP "AED 500/mo" (products). Unrelated figures (downtime cost, purchase price) untouched.
- Open: the calculator's A3-only minimum is AED 430 (350 + AED 80 surcharge) while pages now say "from AED 350". Set A3-Only Surcharge in Admin → Rental Calculator Pricing to 0 if A3-only should start at 350.

## Update 2026-10-23 (late night): Enterprise is direct-sale
Owner decision: Enterprise starts at 10,000 B&W and 5,000 colour pages a month and is dealt with by phone or visit, not through the calculator.
- Admin → Rental Calculator Pricing has an "Enterprise — quoted directly" card (defaults 10,000 / 5,000). Rule: enterprise when B&W >= 10,000 OR colour >= 5,000.
- Calculator: slider ends at the thresholds, an amber note explains Enterprise, and at those volumes the quote panel is replaced by a call (+971 50 382 3969) / visit panel with no price.
- `printer-rental-dubai` Enterprise card: "From 10,000 B&W + 5,000 colour pages", button "Call for an Enterprise Quote" (tel link) with a phone-or-visit note. `services/printer-rental` tier list updated.
- Not yet changed: Enterprise tier cards on the Sharjah, Abu Dhabi, Fujairah, RAK, Al Ain and photocopier pages still show "AED 1,000–2,000" with the standard quote button. Slider-to-max panel not browser-tested (static render and logic tests only).

## Update 2026-10-23 (late night, 2): Enterprise treatment on location pages
Same call-or-visit treatment applied to the A3 Enterprise tier cards on printer-rental-{abu-dhabi, al-ain, fujairah, rak} and photocopier-rental-{dubai, abu-dhabi, sharjah}: first feature "From 10,000 B&W + 5,000 colour pages a month", and the quote button replaced by "Call for an Enterprise Quote" (tel link) with a phone-or-visit note. `printer-rental-sharjah` has no tier cards (structured data and FAQ only) so it is unchanged. These cards use a fixed 10,000 / 5,000 (the admin thresholds only drive the calculator).
