# Shredder Click Loss — Root Cause Analysis (2026-09-18)

## Summary

`/services/paper-shredder-rental/` gained impressions and rankings between early August and mid-September 2026, but clicks collapsed to near-zero for three weeks. Root cause: commit `5381646` (2026-08-07, "rebuild paper shredder page with real Fellowes models") rewrote the page's title/description/keywords to lead with the Fellowes brand and drop the price, which pulled in unconvertible brand/product-catalogue impressions and stopped the page's title from showing a price on the SERP for its own rental long-tail. Partial recovery started after `a7d3b06` (Sep 7) split buy-intent onto `/services/paper-shredder-sales/`, but the rental page's own title still carried "Fellowes Shredders" and no price as of 2026-09-18, and a separate regression (`b3bec5e`, Sep 9) changed the advertised price from AED 150/**month** to AED 150/**week**.

## Timeline (GSC data, `sc-domain:saharaprinter.com`, filtered to pages containing "shredder")

No data before 2026-07-09 — that is the effective launch date for the shredder cluster's search visibility.

| Window | Days | Clicks | Impressions (approx) | CTR | Avg position |
|---|---|---|---|---|---|
| Jul 10 – Aug 15 (launch run) | 37 | 30 | ~900 | ~3.3% | ~24 |
| Aug 16 – Sep 2 (collapse) | 18 | 1 | ~780 | 0.13% | ~19 |
| Sep 3 – Sep 16 (partial recovery, post `a7d3b06`) | 14 | 17 | ~578 | ~2.9% | ~14 |

Rankings improved, not worsened, across the collapse — average position went from 27.8 to 21.2 (UAE) and impressions rose from 630 to 900 across the same July→August windows. The page became more visible and stopped being clicked.

## Root cause commit

`5381646` — 2026-08-07 — "rebuild paper shredder page with real Fellowes models, fix schema scoping"

```diff
- title: "Paper Shredder Rental Dubai UAE | AED 150/mo | Sahara Office Equipments"
+ title: "Paper Shredder Rental & Sales Dubai UAE | Fellowes Shredders | Sahara"

- keywords: "...shredder for rent dubai, paper shredder near me, micro cut shredder dubai..."
+ keywords: "...buy paper shredder dubai, paper shredder machine dubai, fellowes shredder dubai..."
```

Three changes compounded:

1. **Price dropped from the title.** `AED 150/mo` was replaced by the brand name "Fellowes Shredders."
2. **Intent was merged.** "Rental & Sales" plus a brand-led title reclassified a rental page as a product/catalogue hybrid in Google's eyes.
3. **The description** led with model numbers instead of the offer.

Google's re-crawl and re-score landed roughly a week later — the collapse begins 2026-08-16, consistent with a title/snippet change of that date.

## Query-level evidence

### New impressions after Aug 7 — all brand/product intent, all zero clicks

| Query | Impressions before → after | Position | Clicks |
|---|---|---|---|
| buy paper shredder | 24 → 63 | 9.1 | 0 |
| paper shredder machine | 46 → 98 | 17.3 | 0 |
| paper shredder | 87 → 123 | 17.2 | 0 |
| paper shredder machine dubai | 61 → 72 | 16.5 | 0 |
| fellowes shredders dubai | 2 → 35 | 18.5 | 0 |
| fellowes supplier dubai | 2 → 28 | 31.6 | 0 |
| fellowes dubai | 1 → 12 | 24.0 | 0 |

### Rental long-tail that disappeared from the top 60 after Aug 16

All were converting at 50–100% CTR at positions 1–4 in the launch window: `hire paper shredder near me` (pos 3), `paper shredder for rent near me` (pos 1), `shredding machine on rent near me` (pos 1), `industrial shredder for hire` (pos 2), `shredder machine on rent` (pos 4), `paper shredder machine heavy duty for rent` (pos 2), `shredding service` (pos 1). `paper shredder machine for rent` slipped from pos 4 to pos 9.

### The clearest signal: top-10 rankings, zero clicks

| Query | Before | After (Aug 16 – Sep 16) | Clicks |
|---|---|---|---|
| paper shredder price in uae | 1 impr, pos 18 | 16 impr, pos 5.9 | 0 |
| paper shredder rental | 4 impr, pos 5.2 | 18 impr, pos 6.2 | 0 |

Position ~6 with zero clicks on a price-intent query is a title/snippet failure — the SERP entry doesn't answer the query it ranks for.

## Status as of 2026-09-18 (before this session's fix)

- Buy-intent split onto `/services/paper-shredder-sales/` (`a7d3b06`, Sep 7) — correct direction, clicks began recovering Sep 3–7.
- Title still read `Paper Shredder Rental Dubai & UAE | Fellowes Shredders | Sahara` — brand still in the title, no price.
- `b3bec5e` (Sep 9) changed the advertised rate from AED 150/**month** to AED 150/**week** in the title, description, FAQs, model cards, comparison table, and AEO block — a ~4x apparent price increase against the figure that was winning clicks at launch, and against the price already quoted in the site's own blog draft (`paper-shredder-rental-uae-when-it-beats-buying.md`).

## Fix applied this session

`src/app/services/paper-shredder-rental/page.tsx`:
- Title restored to price-led, brand-out pattern: `Paper Shredder Rental Dubai & UAE | From AED 150/mo | Sahara`.
- Description, OpenGraph, and Twitter blocks rewritten to lead with the AED 150/month offer and drop Fellowes/model-number-first phrasing.
- Keywords list: dropped `buy paper shredder dubai`, `paper shredder machine dubai`, `fellowes shredder dubai`; restored `paper shredder for rent near me`, `hire paper shredder near me`.
- Service schema `priceSpecification.unitCode` corrected from `WEE` (week) to `MON` (month), matching the confirmed AED 150/month rate.
- All body copy (FAQs, model cards, comparison table, AEO answer block, hero badges) reverted from `/week` to `/month` for consistency with the corrected title/schema.
- Fixed two dead internal links in `relatedServices` (`best-office-paper-shredders-uae-fellowes-compared`, `paper-shredder-repair-or-replace-uae-guide` — neither exists in `content/blogs/`) to point at the four shredder blog posts that are actually live.

## Confirmed with the user

AED 150/**month** is the correct entry-level rate (not /week). This was a Sep 9 regression, applied consistently across metadata, schema, and body copy in this fix.

## Not fixed in this pass — flagged for follow-up

- **No `/brands/fellowes` page exists.** `fellowes shredders dubai` + `fellowes supplier dubai` + `fellowes dubai` = 75 impressions/month, 0 clicks, pos 18–32. The Aug 7 commit tried to capture this demand by pulling brand keywords into the rental page's title, which is what broke the rental long-tail. The correct fix is a dedicated brand page, not the rental page's metadata.
- **No dedicated page fully owns the head terms** `paper shredder machine dubai`, `shredders for offices in dubai`, `paper discard machine` (400+ impressions/month combined, pos 16–24). `/services/paper-shredder-sales/` may already be the intended home; worth a follow-up audit once it has more indexing history.

## Re-check date

~2026-10-16 (28 days post-fix). Success = CTR on `/services/paper-shredder-rental/` back above 3%, and first-ever clicks recorded on `paper shredder rental` and `paper shredder price in uae`, both sitting at position ~6 with zero clicks as of this writing.
