# SEO Operating Law (applies to every SEO/AEO/GEO/SXO task, every session, every agent)

Read this before any SEO work. It overrides convenience. Current-state facts live in `HANDOFF.md`; this file holds only standing rules.

## 1. Scope and authorization
- Default mode is read-only diagnosis plus a concrete, reviewable proposal.
- Do NOT change website code, production data, GBP fields, crawler settings, submit indexing requests (IndexNow, GSC), commit, push, or deploy without explicit authorization for that specific action. Approval for one action does not extend to the next.
- Preserve existing uncommitted changes. Never repeat work already deployed (check `git log` and `HANDOFF.md` first).

## 2. Evidence standards
- Every metric states: source, exact date window (equal, complete windows only), search type, filters, and extraction time.
- Separate query demand, ranking, CTR and page-mix effects before attributing a change.
- Do not claim a property-wide decline or gain without equal comparison windows.
- Do not infer severity or cause from a notification/alert title. Open the details and affected URLs.
- Historical numbers in `HANDOFF.md` are baselines, not current measurements. Reconcile by date; newer evidence supersedes older.
- Label every finding: confirmed (with evidence) / hypothesis / blocker. Never present unfinished work as complete.
- Platform-specific claims (Google, Bing, Cloudflare, schema.org) require a check against current official docs.

## 3. Fix proposals
Each proposed fix lists: target files/URLs, expected benefit, validation method, rollback, and measurement date. No blanket redirects, blanket noindex, or "zero exclusions" targets. Redirect only when a genuine equivalent page exists.

## 4. Keywords and backlinks
- Keyword recommendations must come from data (Semrush exports, GSC, competitor exports), with the source file named. Unverified volumes are labelled "to validate".
- Anchor policy for external agencies: branded and naked-URL anchors form the majority; exact-match under 15%; UAE-relevant sources only; NAP and GeoCoordinates identical to the site schema.
- Only target services Sahara actually provides (rental, AMC, repair, toner/spare parts, sales, shredders, PVC card printers).

## 5. Secrets
- Never print, paste, log, commit, or read the contents of credential files (OAuth client secrets, service-account keys, tokens, API keys).
- Reference credentials only by environment variable name (e.g. `GSC_CREDENTIALS_PATH`). Keep files outside the repo (`C:\Users\DK\secrets\`). Scripts read them and output only aggregated data.
- Never write credential paths' contents, refresh tokens, or keys into `HANDOFF.md`, `docs/`, or commit messages.

## 6. Outputs
- Save audit findings to `docs/seo/<topic>-<YYYY-MM-DD>.md`; add a short dated resume point to `HANDOFF.md` without deleting prior notes.
- Keep progress updates concise. Avoid repeated stalled browser calls; record the access blocker and continue independent local analysis.
- Use `META_PROMPT.md` as the task-start template.
