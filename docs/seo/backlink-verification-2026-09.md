# Backlink Verification & Acquisition Tooling — 2026-09-07

## Why this file exists

The client asked to use `github.com/backlink-generator-tool/backlink-generator-tool` to "generate backlinks with good DA." That repository was cloned and read before any use. It is a client-side URL blaster — four modes (`iframe`, `popup`, `tab`, `ping`) that open or ping a target URL through hidden frames or CORS proxies. It creates **no editorial links at all**, so it cannot produce a link of any DA, and its own README promotes referral links to AddMeFast, Hit4Hit, RankBoostUp, and Everve — click-exchange and traffic-bot networks, the same class of asset already documented as harmful below.

Built instead: `tests/scripts/backlink_guard.py`, a DA-gated, spam-filtered screener on top of the existing `claude-seo/scripts/` backlink infrastructure (Moz API wrapper, Common Crawl graph, and a live verification crawler — all already in this repo, just not wired into a screening/acquisition workflow before now).

## Part 1 — Verified status of the known spam links

`C:\Users\SAHARA\Downloads\backlinks.json` (25 links, 16 domains, documented in `HANDOFF.md` §6 and `dissection-report-2026-08.md`) was re-checked live on 2026-09-07 using `claude-seo/scripts/verify_backlinks.py` — a real crawl of each source URL, not a re-read of the same static export.

**Result: 14 of 25 links are now dead (DNS failure — the domain itself no longer resolves), 4 have had the link to saharaprinter.com removed, and 7 are still live.**

| Domain | Live status (2026-09-07) | rel attribute |
|---|---|---|
| homesforsaleoldgreenwichct.com | DNS failure (dead) | — |
| ggmap.us.com | DNS failure (dead) | — |
| bye.fyi | DNS failure (dead) | — |
| drjack.world | DNS failure (dead) | — |
| anchorurl.cloud | DNS failure (dead) | — |
| sites.jake.eu | DNS failure (dead) | — |
| urls-shortener.eu | DNS failure (dead) | — |
| buzzshrink.website | DNS failure (dead) | — |
| newlyregddomains.com | HTTP 521 (dead/origin down) | — |
| screenshots.wiki | link removed | — |
| shortenurls.eu | 1 of 2 pages: link removed | — |
| quero.party | 1 of 2 pages: link removed | — |
| ready.pro | 1 of 2 pages: link removed | — |
| ready.pro | **verified live** | nofollow |
| screenshots.wiki | **verified live** | nofollow |
| shortenurls.eu | **verified live** | nofollow |
| quero.party | **verified live** | nofollow |
| robuta.com | **verified live** | **dofollow** |
| computers1000.com | **verified live** | **dofollow** |
| dubaijobzone.com | **verified live** | noreferrer |

**Conclusion, replacing the "watch for a recurring charge" open item in `HANDOFF.md` §6:** this junk is dying off on its own — the majority of the original drip is already gone. The position from the Aug 2026 audit stands and is now better-evidenced: **do not disavow.** Google discounts this class of link automatically, most of it has already stopped existing, and disavowing would spend effort changing nothing about position 23 on contested Dubai terms. The only two links worth even occasionally re-checking are `robuta.com` and `computers1000.com` (still dofollow) — not worth chasing, just worth knowing about if either starts showing up in a manual review.

Re-run this check anytime with:
```
python tests/scripts/backlink_guard.py verify --target https://www.saharaprinter.com/ --links <links.json>
```

## Part 2 — Candidate acquisition queue, screened

`tests/scripts/backlink-candidates.json` holds the 30 directory candidates from `docs/seo/BACKLINKS-FREE.md` Tiers 1–4 (Tier 5, manufacturer/partner relationship-gated listings, is separate — see `bravo-dealer-link-request.md`), extracted programmatically so the queue stays in sync with that doc rather than drifting.

Screened with:
```
python tests/scripts/backlink_guard.py screen tests/scripts/backlink-candidates.json
```

**Result: 0 rejected, 0 auto-approved, 30 UNSCORED.**

Zero rejections is expected and correct — these are the curated legitimate list, not the spam set above. Zero auto-approvals is also correct, not a failure: **no Moz or Bing API key is configured** (`claude-seo/scripts/backlinks_auth.py --check` confirms Tier 0 only — Common Crawl + verify crawler, both free/no-config). The screener's governing rule is the same as the rest of this engagement's methodology: **never invent a DA score.** The "DA: XX" figures already written in `BACKLINKS-FREE.md` are the site's own claims about itself, not Moz-verified numbers, so the screener correctly declines to gate on them.

**To unlock real DA gating:** get a free Moz API key (2,500 rows/month) at https://moz.com/products/api, add it via `MOZ_API_KEY` env var or `backlinks-api.json` (see `backlinks_auth.py --check` output for the exact path), then re-run the screen command above. Every candidate will then get a real `domain_authority` and `spam_score` instead of `UNSCORED`.

## What was and wasn't done autonomously

**Done this session (safe, code-only, reversible):**
- Built and bug-fixed `backlink_guard.py` (fixed a `str.lstrip("www.")` bug that was corrupting domains like `waze.com` → `aze.com` — `lstrip` strips from a character set, not a prefix).
- Verified live status of all 25 known spam links.
- Extracted and screened all 30 legitimate candidate directories.

**Not done autonomously, and should not be without you present:** creating new accounts on any of the 30 directories. That means giving a real business email and NAP to a third-party site, sometimes with a password — outward-facing and not easily reversible, and `docs/seo/BACKLINKS-AUTO.md`'s own security note documents a past incident where a directory account password was briefly committed to this repo in plaintext. The two directories already mid-registration (zumvu.com, hotfrog.com) are still sitting at "awaiting email confirmation" per `BACKLINKS-AUTO.md` — that needs someone to open `saharasharjah@gmail.com` and click the confirmation links, which only you can do.

## Outstanding

1. **Rotate the zumvu.com password.** Documented in `BACKLINKS-AUTO.md`'s Security Note and repeated in `HANDOFF.md` — a password for that account was committed to this repo's git history and must be rotated before any further backlink work touches that account.
2. **Get a Moz API key** if real DA gating matters going forward — otherwise every future candidate stays UNSCORED by design.
3. **Confirm the zumvu.com / hotfrog.com email verifications** — still pending since 2026-05-19.
