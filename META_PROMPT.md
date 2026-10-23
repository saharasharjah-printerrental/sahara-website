# Sahara SEO task — meta prompt template

Standing rules: `.claude/rules/seo-operating-law.md` (mandatory; read first).

## Prompt

Work on https://www.saharaprinter.com in C:\Users\DK\Documents\GitHub\sahara-website.

1. Read `AGENTS.md`, `.claude/rules/seo-operating-law.md`, and the current resume point at the top of `HANDOFF.md`. Check `git log` so deployed work is not repeated. Preserve uncommitted changes.
2. Task: <state the task: audit / fix batch / keyword research / GSC refresh>.
3. Inputs: <Semrush exports in Downloads\SEO insight oct-10-26, GSC via GSC_CREDENTIALS_PATH, browser dashboards, etc.>.
4. Mode: read-only diagnosis and proposal unless the specific action is authorized in this message.
5. Deliver: findings in `docs/seo/<topic>-<date>.md` (confirmed / hypothesis / blocker, prioritized fixes with files, benefit, validation, rollback, measurement date) and a short dated resume point in `HANDOFF.md`.
6. Never expose credentials; never infer cause from alert titles; use equal, complete date windows.

## Current open items (as of 2026-10-23)
- Semrush crawl (Oct 2026): 22/100 URLs returned 503 (verify real vs crawler throttling); LocalBusiness/Organization JSON-LD invalid (unrecognized `dateModified`, `dateEstablished`, `speakable`; missing `address`); canonical/meta/sitemap gaps.
- Open the Oct 16 GSC Merchant listings alert; refresh GSC with equal windows; inspect indexing buckets.
- Checkpoints from Oct 15 baseline: Oct 29 and Nov 12.
- Agency keyword list for citations/backlinks: `docs/seo/agency-keywords-2026-10.md`.
