# Code review: commits 5c11f12..HEAD (Phase 0 of the hardening prompt)

Date: 2026-10-23. Scope: everything pushed since 5c11f12 (SEO/schema, speed, GSC script, calculator + admin pricing, email toggles, Enterprise, A3 pricing copy). Method: `code-review` skill (level high), each finding re-verified against the code and live evidence, security review done inline (the `security-review` skill received an empty diff because the work is already committed), Laya used for an advisory gate. Read-only: nothing was changed.

## Findings from `code-review`, after verification

### 1. Leftover block and ignored send result in the password-recovery route — CONFIRMED, minor
`src/app/api/admin/auth/forgot/route.ts:26`. My refactor replaced `if (config) {` with a bare `{` block, and `sendEmail()` returns a boolean that is ignored. If both Gmail and Resend are OFF or fail, the route still answers success and nothing is logged. Not a regression: the previous code also ignored the result of `sendSimpleEmail`. Customer impact: none (admin-only flow). Fix: remove the bare block, log a server-side error when `sendEmail` returns false, keep the "always success" response (it hides whether the address matched).

### 2. Calculator slider breaks if an admin sets both free-page allowances to 0 — CONFIRMED, edge case
`src/components/CalculatorClient.tsx` (`PoolRebalancer`): `pct = split / totalValue` and slider `max = 0` give NaN when a tier's included value is 0. `normalizeCalculatorPricing` allows 0 for `freeBw`/`freeColour`. Not triggered in production today (defaults 2,000/750 and 3,000/1,000). Fix: render the rebalancer only when `totalFreeValue > 0`.

### 3. "deferUntilIdle may never fire" — FALSE POSITIVE
`src/app/layout.tsx`. The loader is an inline `<head>` script, which runs during parsing, before the `load` event, so the `load` listener always fires. Evidence: in the post-deploy Lighthouse run GTM and Clarity requests start at about 6.1 s (after load + 2.5 s). No change needed.

### Side observation (not a finding)
A `gtag/js` request (a different GA ID from the one in GTM) starts at about 3.0 s, before the deferred tags. Source not found in `src` or in the page HTML (curl found no `gtag` script tag), so it is probably injected at runtime by another tag. Worth checking in the GTM container, not in code.

## Security review (inline)
No high- or medium-confidence vulnerabilities in the reviewed changes.
- Authorization: all settings writes go through `isAdminRequest` (401 otherwise); `requiresAdmin` covers every `/api/admin/*` route, so `test-smtp` (now using `ignoreEnabled`) stays admin-only.
- Data exposure: the new D1 keys `smtp_enabled`, `smtp_last_error`, `smtp_last_error_at`, `smtp_last_ok_at` match the `smtp_` secret pattern and are blocked from public settings responses. `calculator_prices` is intentionally public (tariff only).
- Injection: calculator reads use parameterised D1 queries; pricing input is validated (`normalizeCalculatorPricing`); the middleware redirect only rewrites the path on the same origin (no open redirect).
- Credentials: `gsc-query.mjs` reads the path from an env var, stores the token outside the repo, and `.gitignore` now blocks `client_secret*.json`, `gsc-token.json`, `*service-account*.json`, `*credentials*.json`. Its OAuth loopback flow has no `state` parameter (login-CSRF on localhost); not reported: it needs local attacker access and the impact is only storing the wrong account's token.

## Laya gate G1 (advisory), verbatim
Model `english`, CPU, 11.9 s (first call loads the checkpoint).
| Finding | Laya choice | answer_confidence | confidence | probabilities (fix_now / fix_later / ignore) |
|---|---|---|---|---|
| 1 | fix_now | 0.5464 | 0.09 | 0.5464 / 0.1988 / 0.2548 |
| 2 | fix_now | 0.5242 | 0.0737 | 0.5242 / 0.2065 / 0.2694 |
| 3 | fix_now | 0.4802 | 0.0437 | 0.4802 / 0.2367 / 0.2831 |
Reading: confidence is very low on all three and Laya chose fix_now for finding 3, which verified evidence shows is a false positive. The gate is therefore inconclusive and is not used as evidence. Decisions below rest on the verification above.

## Proposed fix list (awaiting owner approval)
- Fix now: finding 1 (5 lines), finding 2 (1-line guard).
- Ignore: finding 3.
- Optional: check the unexplained `gtag/js` request in the GTM container.
