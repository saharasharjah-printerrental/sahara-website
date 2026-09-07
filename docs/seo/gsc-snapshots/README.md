# GSC snapshots — how to take one and score it

Track D of the 2026-09-07 plan (`C:\Users\SAHARA\.claude\plans\seo-audit-saharaprinter-com-currently-precious-hollerith.md`). The Aug 2026 scale blueprint's d14/d30/d60/d90 kill-criteria checks were never run against any saved artifact before this — `docs/seo/gsc-export-2026-08/{queries,pages,query_page,overview}.json` are all 0 bytes. This directory exists so that stops happening again.

## Taking a snapshot

**This project has no standalone, authenticated GSC script today.** `claude-seo/scripts/gsc_query.py` exists but `python claude-seo/scripts/gsc_query.py sites --json` returns `Could not build GSC service.` — no service account is configured (see `claude-seo/scripts/google_auth.py --help` for the one-time setup: create a GCP service account, grant it access under Search Console → Settings → Users, then save its key path to `~/.config/claude-seo/google-api.json`). That's a one-time, human setup step this session couldn't do — it needs your Google account to grant access.

**What works today:** the `gscServer` MCP tool, already connected and used throughout this engagement's sessions. To take a new snapshot:

1. Pull the ground-truth totals: `mcp__gscServer__get_performance_overview` for the target 28-day window.
2. Pull the UAE device split: `mcp__gscServer__get_advanced_search_analytics` with `dimensions: "device"`, filtered `country equals are`.
3. Pull the query-level cluster sample: `dimensions: "query,device"`, `row_limit: 1000` — expect **fewer** total clicks/impressions than step 1's ground truth; GSC anonymizes very low-volume individual queries out of query-dimension results, it is not a bug. Classify each query into a cluster (brand / sharjah / dubai / abu_dhabi / kyocera / shredder / plotter_niche / amc / repair_generic / photocopier_generic / printer_generic / ai_surface / other) and aggregate.
4. Check the specific kill-criteria pages against the targets in `scale-blueprint-2026-08.md` §10 (see that doc, or the `kill_criteria_pages` block in any existing snapshot file for the exact target values and page URLs).
5. Save the result as `docs/seo/gsc-snapshots/<YYYY-MM-DD>.json` in the same shape as `2026-09-07.json` — copy that file's structure, don't reinvent it, so `gsc_snapshot_score.py` keeps working across snapshots.

## Scoring a snapshot

```
python tests/scripts/gsc_snapshot_score.py docs/seo/gsc-snapshots/2026-09-07.json
```

Exits non-zero if any kill criterion is currently FAILing — safe to wire into a CI check or a reminder script later if that becomes useful. `--json` for machine-readable output.

## The scorecard change this directory encodes

Per the audit, these metrics are retired because they can "improve" while clicks stay flat (most of this site's impression growth is either AI-surface grounding queries that structurally can't click, or positions 33-80 that never will):

| Retire | Adopt |
|---|---|
| Total impressions | Impressions at position ≤ 20 |
| Site-wide average position | UAE-mobile position and CTR (desktop skews heavily toward unclickable AI-surface impressions on this site) |
| Site-wide CTR | Clicks, segmented: brand / Sharjah / Dubai / niche |
| — | AI-surface impressions, tracked separately and excluded from CTR |

## Snapshot log

| Date | Day (from Aug 13 blueprint) | Notes |
|---|---|---|
| 2026-09-07 | ~25 | First snapshot ever taken. 5 PASS / 1 FAIL / 2 not-yet-due against the blueprint's kill criteria — see the file for detail. The one FAIL (referring domains) is expected; Track C's screening tool exists now but no submissions have been made yet. |
