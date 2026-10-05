# Security remediation, 2026-10-02

## Implemented in this pass

- `src/middleware.ts` and `src/lib/apiAuthorization.ts`: verify the existing admin session for administrative API methods, private lists, drafts, storage and diagnostics. Public catalog reads, order/lead creation, login and payment callbacks remain available. New API write methods default to admin-only unless explicitly listed.
- `src/app/api/inquiries/route.ts`: public creation always generates a UUID and uses INSERT, never caller-selected IDs or replacement of existing leads.
- `src/lib/orderAccess.ts` and `src/app/api/orders/route.ts`: order creation issues a seven-day, HttpOnly, Secure-on-HTTPS, SameSite=Lax cookie with an HMAC bound to that order. Anonymous receipt lookup requires it; administrators retain access to old/new receipts and order lists. References/IDs use cryptographic randomness. Existing checkout/receipt clients need no changes because they already use same-origin fetch.
- `src/lib/payments.ts` and `src/app/api/payments/{create,callback}/route.ts`: payment creation requires order access, records the gateway transaction before returning its redirect, and conditionally updates pending orders. Verification matches the stored provider/transaction, merchant order reference, amount, AED currency and successful payment state. PayTabs also requires Sale. Replays cannot move dispatched/delivered orders back to paid or revive cancelled orders; cancellation races are checked with conditional SQL.
- `src/app/api/products/route.ts`: anonymous lookup by ID excludes inactive products; administrators can still edit them.
- `src/lib/sanitizeHtml.ts`, `src/app/api/blogs/route.ts`, `src/components/BlogPostClient.tsx`, `src/components/admin/RichTextEditor.tsx`: sanitize stored and newly submitted HTML with the `xss` allowlist library. Apply sanitization after blog normalization and before editor insertion; sanitize pasted HTML and reject unsafe link schemes. Preserve article markup, tables, images and allowlisted YouTube embeds.
- Existing raw JSON-LD renderers under `src/app` escape `<` as a JSON Unicode escape. `FaqSection.tsx` was excluded because the parent already fixed it. Service-page quote links were not edited by this pass.
- `package.json` / `package-lock.json`: added `xss@^1.0.15`; install completed, with no subsequent npm installs from this pass.

## Parent-owned changes included in the security handoff

The parent separately updated `src/app/api/send-email/route.ts`, `src/app/api/send-email/email-service.ts`, and new `src/lib/quote-input.ts`. These files were read but not edited by this pass. Changes include Zod parsing and field limits, rejection/stripping of caller-supplied notification recipients, calculator-field HTML escaping, and awaited D1 persistence with a saved-inquiry fallback when email delivery fails. The parent also owns the Next.js security upgrade and remaining dependency audit.

## Verification

- `node --test tests/scripts/security-regressions.cjs`: **18 passing tests** (11 original + 7 added 2026-10-03) after the Next 15.5.27 upgrade and dependency remediation. Runs actual route/middleware modules against in-memory SQLite, with network/mail mocked. Covers anonymous/forged/valid admin sessions, public flow allowlisting, inquiry overwrite, scoped and expired receipts, Stripe/PayTabs mismatches, callback replay/cancellation races, offline/external payment modes, draft product visibility, HTML sanitization and all raw JSON-LD sites.
- The 7 new send-email tests cover: successful delivery; saved-lead fallback when delivery fails; delivery success with failed D1 persistence; HTTP 503 only when both fail; awaited (not fire-and-forget) D1 persistence; malformed/oversized/wrong-content-type/honeypot submissions producing no delivery and no DB writes; and visitor-supplied notification recipients being unable to override the server-configured recipient.
- Includes a real headless Chrome test of the stored HTML and JSON-LD attack payloads. Browser traffic is blocked; no production application or service is contacted.
- Local HTTP checks on the parent's `http://localhost:3000`: anonymous order list, inquiry list and reference-only receipt requests return 401; public product list returns 200.
- Full TypeScript check passed initially. The latest run reported only three parent-owned type errors in `tests/scripts/quote-regression.ts:52` (`complete`, `naturalWidth`, `src` require an HTMLImageElement narrowing). This file was not edited.
- `git diff --check` passed. No remote data, payment or email mutations were performed.

Security test command requires Node 22.13+ for built-in SQLite; validated here on Node 24.19.0. The Chrome test uses `SECURITY_CHROME_PATH` when supplied, otherwise the installed Windows Chrome path, then Playwright's browser path. Working launch options:

```js
await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
```

## Rollout and remaining checks

- No database migration is required. Receipt signing uses the existing `ADMIN_PASSWORD`; it must be configured. Rotating it invalidates both existing admin sessions and receipt cookies.
- Reference-only historical receipt links now require an administrator. New customers retain receipt access in the originating browser for seven days; the public order response still supplies the immediate inline receipt. The payment callback itself does not grant receipt access to someone who only knows a transaction ID.
- Gateway sessions created before this fix did not persist their expected transaction ID. Those in-flight callbacks fail closed and require reconciliation. Test this deployment transition before enabling production payment traffic.
- Production Cloudflare middleware execution, cookie persistence across real hosted-payment returns, credentials and actual gateway responses still need deployment validation. This pass made no live payments and did not run a production build against the parent's active dev-server output directory.
- The parent is upgrading Next and auditing other dependencies. Re-run the security test command after that install and the final integrated type/build checks.
- Remaining audit hardening is separate from these fixes: shared rate limiting, session revocation, upload destination/redirect restrictions and stronger CSP. The middleware now gates uploads to administrators, but the URL-fetch functionality itself was not redesigned.

Payment response fields were checked against [Stripe's Checkout Session reference](https://docs.stripe.com/api/checkout/sessions/object) and [PayTabs' query-transaction reference](https://support.paytabs.com/en/support/solutions/articles/60000806381-7-1-hosted-payment-page-apis-query-transaction). Sanitizer configuration follows the [js-xss documentation](https://github.com/leizongmin/js-xss).

## 2026-10-03 reconciliation

- Re-verified all findings against the final dependency state (Next 15.5.27, postcss 8.5.28 override, sharp 0.35.5, zod a runtime dependency): 18/18 regression tests pass; production dependency audit is clean (0 vulnerabilities). Remaining full-audit findings are dev-toolchain only (wrangler/miniflare/undici `@fastify/busboy`, `braces`, `esbuild` via `@cloudflare/next-on-pages`, `ws`) with no available non-breaking fix; see the release checklist.
- Send-email route review found no functional defects. Two cosmetic fixes applied: corrected misleading try/catch indentation in the D1 insert block, and both catch blocks now log the underlying error instead of a fixed string.
- Recipient pinning re-confirmed: the route pins `notificationEmail` to the server configuration and the zod schema strips unknown visitor-supplied recipient fields; the new regression test proves the mock sender never sees a visitor recipient.
- URL change with no security impact: the quote picker moved from `/get-quote/` to `/quote/` because the pre-existing legacy SEO redirect claims `/get-quote/`. Any hard-coded references to the old picker path should be treated as historical.
- Release-stage checks unchanged and still open: real Cloudflare middleware/cookie behavior, real gateway returns, in-flight pre-fix payment session reconciliation, historical reference-only receipt access.
