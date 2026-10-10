# Security reconciliation — 2026-10-05

Independent review of `docs/security-remediation-2026-10-02.md` against the current
codebase. Every file the report claims to fix was read in full. No application code was
changed; no live systems were exercised. Machine-readable results:
`tests/tmp/security-findings-2026-10-05.json` (schema-validated, 9 findings).

Verification baseline: `node --test tests/scripts/security-regressions.cjs` re-run during
this review on Node v24.19.0 — **18/18 pass** (first invocation flaked once on the
headless-Chrome test; second run clean, 18 pass / 0 fail).

## Verdicts on the three HIGH findings

### 1. Unauthenticated admin APIs / private data — FIXED
`src/lib/apiAuthorization.ts` + `src/middleware.ts` implement default-deny: any
non-GET/HEAD `/api/*` call not on the explicit public allowlist (login, forgot-password,
inquiry/lead/order creation, payment create/callback, send-email POST) requires an admin
session. `/api/admin/*`, `/api/cms`, `/api/upload`, `/api/convert-image`, `/api/ai-jobs`
are always admin; the `includeDrafts=1` / `all=true` params force admin on any route;
middleware matcher covers `/api/:path*`. The settings route additionally filters
secret-pattern keys and reduces `site_settings` to a public key whitelist for anonymous
callers. All claims in the report match the code.

### 2. Stored HTML / JSON-LD XSS — FIXED
One shared `FilterXSS` instance (`src/lib/sanitizeHtml.ts`): js-xss default whitelist +
`class`, iframes restricted to HTTPS YouTube `/embed/` URLs, script/style/svg/math/
object/template bodies stripped. Applied at write time (blogs POST) and at every render
or insertion point (`BlogPostClient.tsx` after normalization, `RichTextEditor` init,
change and paste handlers, link scheme allowlist). Grep confirmed every raw JSON-LD
`dangerouslySetInnerHTML` site under `src/app` escapes `<` as `\u003c` (~30 sites);
`FaqSection.tsx` also escapes. Matches the report.

### 3. Payment transaction replay — FIXED
`/api/payments/create` requires the order-scoped receipt cookie or admin, requires
`status='pending'`, and persists `payment_provider`/`payment_ref` via a conditional
UPDATE (also guarding concurrent session creation) before returning the gateway
redirect. `/api/payments/callback` verifies the stored provider + transaction reference,
merchant order ref, exact amount, AED currency, paid/complete state (PayTabs also Sale),
and moves pending→paid only with a conditional UPDATE keyed on
`status='pending' AND payment_provider AND payment_ref` — a replayed or delayed callback
cannot revert dispatched/delivered orders, and cancelled orders are rejected outright
(cancelled is not in the accepted status set). Anonymous receipt lookup requires the
HMAC-signed HttpOnly SameSite=Lax cookie bound to that specific order ref; UUID-based
refs are not guessable. Matches the report.

## Other claimed fixes

| Claim | Verdict |
|---|---|
| Inquiries: server-generated UUID + INSERT, no overwrite | Fixed (`inquiries/route.ts:49-63`, `send-email/route.ts:59-77`) |
| `/api/send-email`: Zod, honeypot, 16 KiB cap, awaited D1, pinned recipient | Fixed; recipient resolved from D1 settings, visitor field ignored |
| Draft/inactive products hidden from anonymous id/list lookups | Fixed (`products/route.ts:91-98`) |

## New issues found (none critical/high)

1. **SEC-2026-007 (low, accepted-risk)** — `isAdminRequest` compares the session
   signature with plain string equality (`src/lib/adminAuth.ts:49`), not a constant-time
   compare. Theoretical timing side-channel at the edge; impractical to exploit. Fix
   opportunistically.
2. **SEC-2026-008 (low, accepted-risk)** — Public route catch blocks return
   `details: String(error)` to callers (`orders` POST/PATCH, `inquiries`, `blogs`,
   `products`), reflecting raw driver error text. Hygiene issue only; remove `details`
   from public paths.
3. **Residual architecture note (info)** — Authorization for most write/list routes
   lives solely in middleware; the routes themselves don't re-check. Safe on the current
   next-on-pages/Cloudflare stack (middleware provably runs), but any future deployment
   shape that skips middleware would silently unprotect these routes. Consider
   belt-and-braces `isAdminRequest` checks in the routes over time.
4. **Inert-but-raw column (info)** — `blogs.schema_jsonld` is stored unsanitized and no
   current code renders it. Harmless today; any future renderer must escape `<`.
5. **Open deployment validation (info)** — Matches the report's own "remaining checks":
   production middleware/cookie behavior, real gateway returns, pre-fix in-flight
   session reconciliation, and `ADMIN_PASSWORD` presence still need a preview-deployment
   validation pass. Production D1 read-only checks were not possible (OAuth token fails
   D1 API calls, code 10000), so no remote verification was performed.
6. **Silent payment fallback (info)** — `payments/create` catch-all returns
   `{online:false}` on internal errors, masking gateway misconfiguration. Customer can
   still complete the order; ops visibility relies on logs.

## Reproduction guidance

No exploitable issue requiring reproduction was found in current code. The three original
HIGH attack classes (anonymous admin GETs, stored `<script>` in blog content, replaying a
Stripe/PayTabs callback against a different order) are all blocked at two layers and
covered by the 18-test regression suite, which passes.
