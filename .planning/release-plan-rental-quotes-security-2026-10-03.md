# Release Plan — rental quotes + security, 2026-10-03

Branch: `feat/rental-quotes-security-2026-10` (created from previous `main` checkout, all uncommitted work carried over).
Starting diff recorded at `.planning/starting-diff-2026-10-03.patch`.
Scope: latest HANDOFF.md "START HERE - 2026-10-02" section only. Excluded: historical backlink campaigns, redesign work, new content campaigns (`docs/seo/BACKLINK-TRACKER-30.md` was dirty before this task and is preserved untouched).

## 1. Dependency remediation
- Keep Next 15.5.27.
- Verify sharp 0.35.5 and postcss 8.5.28 against current npm metadata/advisories, then apply.
- Scoped override for Next's vulnerable postcss 8.4.31 pin where compatible.
- Ensure zod is a declared runtime dependency (quote endpoint imports it).
- Check Cloudflare adapter deps + reproducible install. No blanket `--force` fixes, no framework migration.

## 2. Quote/security verification
- Extend `tests/scripts/security-regressions.cjs` fixture loader: mock email delivery, allow zod import.
- Tests: delivery success; saved-lead fallback on delivery failure; delivery success with failed persistence; HTTP 503 when neither succeeds; D1 persistence awaited; malformed/oversized/wrong-content-type/honeypot => no delivery, no DB writes; visitor-supplied recipients cannot override server config.
- Reconcile `docs/security-remediation-2026-10-02.md` with current results; review authorization, receipt access, payment replay, HTML sanitization, JSON-LD escaping.
- Fix defects in changed flows; record unrelated hardening separately.

## 3. Content & lead journeys
- Preserve rental URLs and price-led metadata.
- Verify LX65 AED 450/mo, 325Ci AED 900/mo (delivery, installation, transport, maintenance included).
- Verify AED 549/mo label offer: sheets up to A3, paper up to 300 gsm, compatibility check before setup.
- Check 12 quote services, contextual nav, brand/product prefill, legacy calculator / spare-parts / PVC quote routes.
- Analytics: service/channel events only, no PII; document external config still required.
- Validate `database/migrations/028_rental_pricing_october_2026.sql` against isolated copy of the affected article: intended replacements, repeat-run safety, unrelated content preserved, corrected rent-vs-buy claims. Prepare targeted rollback; do not apply remotely.

## Acceptance gates
- Security regression suite, quote regression suite, TypeScript checks, diff whitespace checks.
- Desktop/mobile layouts, images, keyboard nav, focus, form labels, validation, failed-submit/retry, success states; screenshots; console/network.
- SSR prices, canonicals, FAQ/Service schema consistency, crawler exclusions, quote-page noindex; quote pages excluded from sitemap.
- Production build then Cloudflare adapter build, sequentially.
- Adapter output run locally with isolated D1 fixtures + test creds: private-route denial, authenticated admin, quote persistence, receipt cookies, simulated payment transitions.
- Re-run production + full audits; record unresolved findings explicitly.
- Mocked email/payment only; no customer messages, no production orders.

## Boundary
No commits, pushes, hosted previews, production changes, indexing submissions, or analytics publication. Hosted Cloudflare behavior, real gateway returns, production secrets, historical receipt access, and in-flight payment session reconciliation remain release-stage checks — never described as production readiness.

## Results log
- 2026-10-05: Dependency remediation completed locally. `next` remains `15.5.27`; `sharp` is `^0.35.5`; `postcss` is `^8.5.28` with an override; `zod` is a runtime dependency. `npm audit --omit=dev` reports 0 vulnerabilities.
- 2026-10-05: Production Next build passed with integrated type checks via `npm.cmd run build`.
- 2026-10-05: Security regression suite passed: `node --test tests/scripts/security-regressions.cjs` => 18/18. Coverage includes admin API authorization, receipt cookies, payment replay checks, sanitizer behavior, JSON-LD escaping, and send-email fixture cases.
- 2026-10-05: Quote browser regression passed: `TEST_BASE_URL=http://localhost:3001 npx.cmd tsx tests/scripts/quote-regression.ts` => 31/31. Expected mocked network entry: one 503 from the retry test. Screenshots were written under `tests/e2e/screenshots/quote-update/`.
- 2026-10-05: Quote accessibility checks passed: `TEST_BASE_URL=http://localhost:3001 npx.cmd tsx tests/scripts/quote-a11y-checks.ts` => 7/7.
- 2026-10-05: Cloudflare adapter build passed after stopping the dev server: `npm.cmd run build:cf`. Sandboxed run hit Windows access denial resolving `@cloudflare/next-on-pages` templates; rerun with filesystem approval passed. Output includes `/quote` and `/quote/[service]` edge routes.
- 2026-10-05: Worker preview passed against local test D1 and test admin credentials at `http://127.0.0.1:3202`. Checks covered quote routes, invalid service 404, legacy `/get-quote/` 308, shredder AED 450/900 SSR and schema, label AED 549/300 gsm SSR, anonymous `/api/inquiries` and `/api/orders` 401, admin login and order list, malformed quote 400, valid quote persistence, offline order creation, HttpOnly receipt cookie, receipt-gated order lookup, payment create 401 without receipt, and local offline payment fallback with receipt.
- 2026-10-05: Local worker preview used one synthetic local D1 supply row (`preview-priced-supply`) so receipt and payment checks could exercise `/api/orders/`. This was local-only (`wrangler d1 execute sahara-printer-test-db --local`), with no `--remote`.
- Still release-stage only: live D1 read/migration 028, stale live `qa_answers` price cleanup, production Cloudflare middleware/cookie behavior, real gateway return behavior, historical reference-only receipt handling, in-flight pre-fix payment session reconciliation, Bing/GSC/IndexNow baselines/submissions, push/merge/deploy. These require `npx wrangler login` re-auth and explicit approval to go live.
