# Click Recovery — Investigation & Actions (2026-09-26)

Live GSC + GBP audit via browser MCP. Raw data: `gsc-snapshots/2026-09-26.md`.

## 1. Is GSC traffic actually dropping?

No — not below baseline. The perceived drop is the tail after an early-September spike.

| Window | Clicks | Run rate |
|---|---|---|
| Aug 10 – Sep 6 (2026-09-07 snapshot) | 110 | 3.9/day |
| Aug 30 – Sep 26 (28d, today) | 178 | 6.4/day |
| Sep 20 – Sep 26 (7d, today) | 39 | 5.6/day |

Clicks are up ~60% vs a month ago; the chart spike (~12–18/day around Aug 30–Sep 8) was the shredder-rental fix (`e511bce`) recovering plus normal fluctuation. Position improved 19.8 → 16.4, impressions 10.8K → 14.3K.

## 2. The real, ongoing leak: commercial-query CTR

Brand/navigational queries convert fine (28–100% CTR). Every commercial rental/repair query at position 8–25 converts at 0.3–1.7%:

| Query | Impr/28d | Clicks | Pos |
|---|---|---|---|
| printer rental in dubai | 416 | 3 | 18.8 |
| printer rental | 292 | 2 | 14.8 |
| photocopier rental in dubai | 121 | 2 | 17.0 |
| printer rental abu dhabi | 119 | 1 | 12.2 |

Page-level: `/services/printer-rental/` burned **3,433 impressions at pos 12.2 for 12 clicks (0.3% CTR)** — the single biggest recoverable pool (~70–130 clicks/mo at healthy 2–4% CTR).

**Root cause found (same pattern as the shredder RCA):** the hub owns the "printer rental dubai" head term in Google's eyes, but its title said only "Printer Rental UAE" — no Dubai, so SERP users scanning for a Dubai result skipped it.

## 3. Indexing audit (GSC Page Indexing: 137 indexed / 177 not indexed)

All large "Not indexed" buckets (redirect 80, canonical 26, 404 35, soft-404 12, crawled-not-indexed 16) are **legacy old-site URLs** — no current-site page is blocked. Validations already started on 404/soft-404/5xx/crawled.

Actionable: **"Discovered – currently not indexed" (6)** = `/services/paper-shredder-sales/` (still never crawled despite Sep Request Indexing) + 4 toner product pages. Cause: weak internal discovery. Mitigation done: cross-links + sitemap entries verified/added by the Fellowes-page work; Google-side fix = re-request indexing after deploy.

## 4. Fixes applied this session (uncommitted)

1. `/services/printer-rental/` — title now "Printer Rental Dubai & UAE | A4 & A3 from AED 250/mo"; description leads with Dubai. The district long-tail stays on `/printer-rental-dubai/` (no re-cannibalization — 65a9085 narrowing untouched).
2. Homepage — title now leads with brand: "Sahara Office Equipments | Printer Rental Dubai & UAE | AED 250/mo" (old title had no brand at all).
3. **New `/brands/fellowes/` page** (closes open RCA follow-up): title "Fellowes Shredders Dubai & UAE | Supplier & Dealer | Sahara" (59 chars). Captures `fellowes shredders dubai` + `fellowes supplier dubai` + `fellowes dubai` (~75 impr/mo, 0 clicks, pos 18–32) instead of polluting the shredder-rental title. Reciprocal links with both shredder service pages; added to sitemap + internalLinks map. Reuses only facts already in the codebase (no invented specs).
4. Toner-page fallback links hardened (3 of the 4 stuck toner slugs added to the no-DB fallback grid; the 4th has a live D1 link in production).
5. `npm run build` — passes (exit 0).

## 5. GBP audit (read-only, per HANDOFF.md "no GBP automation" rule)

From the live knowledge panel (business.google.com redirects there):
- 5.0★, **71 reviews**, category shown "Office equipment rental service in Sharjah", NAP consistent with site.
- Last GBP post: **Sep 5 (PVC)** — 3 weeks stale. Queue item "Post 1 — Kyocera repair" from `gbp-content-queue-2026-09.md` is due now.
- `printer repair near me` improved pos 17.0 (Aug) → 8.5 (28d) — the Sep GBP work is paying off; keep the cadence.

**Manual actions for the user** (paste-ready copy already in `docs/seo/gbp-content-queue-2026-09.md` and `gbp-optimization-2026-09.md`):
1. Post queue Post 1 (Kyocera repair) this week.
2. Confirm primary/secondary categories per `gbp-optimization-2026-09.md` §1–2.
3. Confirm the Sep 5 business-description resubmission cleared review.
4. In GSC, after deploy: URL Inspection → Request Indexing for: `/brands/fellowes/`, `/services/paper-shredder-sales/`, `/services/printer-rental/`, `/`, and the 4 toner pages listed in §3.

## 6. Off-page

Backlink queue triaged against `BACKLINK-TRACKER-30.md`: the high-priority targets (Bing Places,
Apple Business Connect, Brownbook, Storeboard, ReachUAE, ATN, YellowPages-UAE, UAEInquiry, HAI,
UAEThrive, Listy) are already submitted/live or pending moderation — the tracker now lists the
remaining open items in priority order (Bravo partner email first). An automated submission run
this session was blocked by the account's 5-hour usage quota before completing new submissions;
no new listings were added 2026-09-26.

## 7. Post-deploy checklist (order matters)

1. Deploy (commit + push; triggers IndexNow GitHub Action for changed sitemap URLs).
2. Manually: `node --env-file=.env scripts/seo/indexnow.mjs --force` to ping Bing/Yandex for everything, including `/brands/fellowes/`.
3. GSC Request Indexing list from §5.4.
4. GBP post (§5.1).

## 8. Re-check date

~2026-10-24 (28 days post-deploy). Success criteria:
- `/services/printer-rental/` CTR ≥ 2% on ≥1K impressions.
- First clicks on `printer rental in dubai` above the 3-per-28d baseline.
- `/brands/fellowes/` indexed and first impressions/clicks on fellowes queries.
- `paper-shredder-sales` crawled + indexed (out of Discovered).
- 28d clicks > 178 (today's baseline).
