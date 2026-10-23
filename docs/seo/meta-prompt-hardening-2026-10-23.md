# Meta prompt: post-deploy hardening (review, FAQ fix, render-blocking fonts)

Standing rules: `.claude/rules/seo-operating-law.md`. Template: `META_PROMPT.md`.
Skills/tools to use: `code-review` skill (and `security-review` for the email/admin diff), `laya` MCP (structured gates only).

## Context (verified 2026-10-23)
- Commit dc03ae5 is live (calculator tiers wired to admin, Enterprise direct-sale, Gmail/Resend toggles, A3 from AED 350, label rent editable). It has had only typecheck, build, unit tests and a local render. No independent code review. The admin form and the email toggles were never exercised in a browser.
- 8 saved FAQ rows in D1 still carry the old wording ("no metered", "AED 500", "no per-page metering") and feed the FAQ JSON-LD. Prepared, not applied: `database/migrations/029_rental_page_charges_alignment.sql` (+ rollback), verified on an in-memory copy of live data.
- Speed: mobile FCP is ~2.4 s on every page and the homepage LCP element is plain hero text, so the render-blocking Material Symbols stylesheet (Google Fonts, `src/app/layout.tsx` head) is the prime suspect. Homepage score is flat (57 vs 49/60/54/61 over four runs); Kyocera 43 -> 64, printer-rental 45 -> 54. HTML is `cf-cache-status: DYNAMIC`.

## Prompt

Work in C:\Users\DK\Documents\GitHub\sahara-website on https://www.saharaprinter.com. Read the standing rules, the top of `HANDOFF.md` and this file first. Preserve uncommitted changes. Do not commit, push, deploy, write to the production database, or send indexing requests unless the owner authorizes that specific action in this conversation.

### Phase 0 - Independent code review of what is already live (read-only)
1. Invoke the `code-review` skill on the range `5c11f12..HEAD` at level `high`. Focus on: `src/app/api/send-email/email-service.ts` (provider selection, Gmail/Resend toggles, status recording, no alert emails), `src/app/admin/(dashboard)/settings/page.tsx` (save guards, new calculator form, toggles, load of `smtp_*` keys), `src/lib/calculator-pricing*.ts` and `CalculatorClient.tsx` (tier switching, enterprise cut-off, rounding, hydration), `src/middleware.ts` redirects, `ProductHero.tsx` (server component conversion), the `deferUntilIdle` analytics loader in `layout.tsx`.
2. Invoke `security-review` on the email, admin and settings changes only.
3. Report findings ranked by severity with file, line, failure scenario. Do not fix anything yet.
4. Laya gate G1 (see below) classifies each finding. The owner approves the fix list before any edit.

### Phase 1 - FAQ migration (owner-gated)
1. Re-fetch `GET /api/faqs/` and confirm the 8 target rows still match the "before" text in migration 029 (the replacements are exact, so a mismatch means someone already edited them; skip those rows).
2. Present the SQL and the exact rows. Apply only after the owner gives the real D1 database name (or applies it in the Cloudflare D1 console) and says "apply".
3. After applying: re-curl `/services/printer-rental/`, `/`, `/services/photocopier-rental/`, `/printer-rental-rak/`, `/printer-rental-abu-dhabi/`, `/printer-rental-dubai/`; confirm the HTML and the FAQ JSON-LD no longer contain "no metered", "per-page metering" or "AED 500". Keep the rollback ready.

### Phase 2 - Remove the render-blocking icon font
Preferred option (A): self-host a subset of Material Symbols Outlined.
- Collect the icon names actually used (search for `material-symbols-outlined` usages and their ligature text across `src`).
- Download a subset from Google Fonts (`&icon_names=<sorted list>` on the css2 URL), host the woff2 under `public/fonts/`, add an `@font-face` with `font-display: block`, preload it, and delete the external stylesheet, the `fonts.googleapis.com` and `fonts.gstatic.com` preconnects.
- Verify every icon still renders (no ligature text visible, no missing glyph) on `/`, a service page, a brand page, `/quote/`, `/rental-calculator/`, and mobile width.
Fallback option (B), only if A is impractical: keep the Google stylesheet but load it non-blocking, and hide `.material-symbols-outlined` until the font is ready (with a timeout fallback). Describe the visible trade-off before doing it.
Laya gate G2 decides between A and B from the facts gathered (icon count, subset size, browser verification result).

### Phase 3 - HTML caching (decision only)
Do not change Cloudflare. Produce a short options note: Cache Rule (edge TTL + stale-while-revalidate) vs ISR-style caching in code, with the risk that admin edits (FAQs, pricing) appear after the TTL, and a recommended TTL. Owner decides.

### Phase 4 - Measure and verify
- Typecheck, `npm run build`, `npx tsx tests/scripts/calculator-pricing.test.ts`.
- After the owner deploys: Lighthouse mobile, three runs each, on `/`, `/services/printer-rental/`, `/brands/kyocera/`; report median score, LCP, FCP, TBT, TTFB next to the baselines in `HANDOFF.md`. State plainly if a change did not move the numbers.
- Laya gate G3 on the measured result (see below). Record it, but report the numbers themselves as the evidence.

## How to use Laya (structured gates only)
- Laya is a small structured-decision model (choice / score / noul). It does not write or review code, and it does not replace measurement or the owner's decisions. Use it only for the gates below; if the `laya` tools are unavailable, say so and continue without it. Never claim it ran if it did not.
- First call `laya_status`. The first prediction on CPU will load a checkpoint and be slow; that is expected.
- Send only the minimum state: short factual fields (files touched, blast radius, reversibility, whether tested, measured numbers). No secrets, no credentials, no personal data, no raw code.
- Preserve and report the returned label, numeric confidence and routing metadata exactly. If confidence is low or the answer is inconclusive, treat the gate as "needs owner decision", not as a pass.
- G1 (per review finding): `choice` of `fix_now` / `fix_later` / `ignore`, criteria = severity and blast radius. Advisory second opinion; the owner approves.
- G2 (icon font approach): `choice` of `self_host_subset` / `non_blocking_with_hide`, state = icon count, subset size, whether all icons verified.
- G3 (speed result): `noul` "did median LCP improve by at least 0.5 s on the three pages?" with the measured medians in the state, plus `choice` of `keep` / `revert` / `iterate`.

## Boundaries
- Read-only until the owner approves the Phase 0 fix list. No production data writes, commits, pushes, deploys or indexing requests without explicit authorization for that action.
- Do not use Laya or any skill output as a substitute for evidence; every claim in the report cites a command, a measurement or a file and line.
- Do not touch pricing values, tariff wording or Enterprise thresholds; those were decided by the owner.

## Deliverables
- `docs/seo/code-review-2026-10-23.md` (findings, severity, Laya gate outputs verbatim with confidence).
- Phase 1/2 changes as uncommitted code and SQL, each with validation and rollback.
- `docs/seo/speed-audit-2026-10-23.md` updated with the before/after table.
- A short dated resume point in `HANDOFF.md`.
