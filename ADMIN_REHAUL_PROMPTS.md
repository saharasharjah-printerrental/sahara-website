# Sahara Admin Rehaul — Prompt Library

A copy-paste prompt library for the six outstanding admin & home-page improvements on `saharaprinter.com`. Each section is **self-contained**: the slash command at the top loads the right skill, the body carries every file path, line number, constraint, and verification step the agent needs.

## How to use this file

1. Open Claude Code in `C:\Users\SAHARA\Downloads\stitch_sahara_printer_website\sahara-website`.
2. Run `/clear` to start a fresh context.
3. Copy one full **Prompt** block (from the slash command down to the end of the **Verification** section) and paste it as the first message.
4. Approve the resulting plan, then let the agent execute.
5. Tackle objectives one at a time — do not bundle them.

> Source of truth for the auth findings (Objective 1) is the Cloudflare Security Insights CSV at `C:\Users\SAHARA\Downloads\Cloudflare_Saharasharjah@gmail.com's Account_SecurityInsights_20260428_1210.csv`. Verbatim contents are reproduced in the Appendix at the end of this file.

---

## Objective 1 — Harden admin authentication

**Skills:** `/security-review` (audit), `/fullstack-guardian` (implement)

### Prompt

```
/fullstack-guardian

Goal: Replace the current insecure admin authentication on saharaprinter.com with a server-validated, hashed-credential, session-cookie flow, and address every "Active" finding in the Cloudflare Security Insights report dated 2026-04-28.

Current state (insecure — verified):
- src/app/admin/login/page.tsx lines 19-20 hardcode `email === "admin@sahara.ae" && password === "sahara2026"` in CLIENT-side JavaScript. The credentials ship to every browser that loads the page.
- src/app/admin/(dashboard)/layout.tsx lines 30-35 gate the dashboard purely on `localStorage.getItem("sahara_admin_auth")`. Setting that key in DevTools bypasses auth.
- All admin API routes (e.g. src/app/api/testimonials/route.ts, src/app/api/brands/route.ts) trust a request header `X-Sahara-Admin: 1` that any client can spoof.
- Logout (layout.tsx line 39) just removes the localStorage flag.
- No password hashing, no rate limiting, no MFA, no CSRF protection.

Cloudflare Security Insights (2026-04-28) flags four Active issues for saharaprinter.com / the saharasharjah@gmail.com Cloudflare account:
1. Security.txt not configured (Low)
2. AI Labyrinth not enabled (Low)
3. No Turnstile widget on the account (Low)
4. saharasharjah@gmail.com has no MFA on the Cloudflare account (Moderate)

Required outcome:
1. Server-side credential check via a Next.js Route Handler at src/app/api/auth/login/route.ts. Compare submitted password against a bcrypt or argon2 hash stored in the D1 `admin_users` table — never in source. Add a migration to database/schema.sql for the new table.
2. On success, issue an HTTP-only, Secure, SameSite=Strict signed session cookie (use `iron-session` or `jose`-signed JWT). Cookie name: `sahara_admin_session`. TTL: 8 hours sliding.
3. Add src/middleware.ts (Edge runtime) that protects every `/admin/(dashboard)/*` path and every `/api/admin/*` and admin-mutating route by verifying the cookie. Replace ALL `X-Sahara-Admin` header checks in API routes with the same cookie verification helper (export it from src/lib/admin-auth.ts).
4. Rate-limit the login endpoint to 5 attempts per IP per 15 minutes using Cloudflare KV or D1.
5. Add Cloudflare Turnstile to the login form (env vars: NEXT_PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY) — verify the token server-side before checking the password.
6. Create public/.well-known/security.txt with `Contact: mailto:security@saharaprinter.com`, `Expires:` 1 year out, and `Preferred-Languages: en`. Wire it via src/app/.well-known/security.txt/route.ts if needed for Cloudflare Pages.
7. In the README or a new SECURITY-OPS.md, document two manual operator actions that this code change cannot perform: (a) enable AI Labyrinth in the Cloudflare dashboard, (b) require MFA on saharasharjah@gmail.com.

Constraints:
- Do NOT break existing admin pages — the cookie-based check must succeed for any user who logs in via the new flow before they reach a protected page.
- Do NOT commit any password, hash, or secret to git. The seed admin password must be set via an env var on first deploy and rotated.
- The site runs on Cloudflare Pages with the Edge runtime — use Web Crypto / jose, not Node `crypto`. Do not introduce nodemailer or any non-edge dependency (commit ce6ac17 already removed nodemailer for this reason).
- Preserve the existing redirect from `/admin` → `/admin/login` when unauthenticated.

Reuse pointers:
- D1 binding pattern: see how src/app/api/testimonials/route.ts accesses `process.env.DB` / Cloudflare bindings.
- Form pattern: copy the input styling from src/app/admin/login/page.tsx so visual parity is preserved.

Verification:
1. `pnpm dev`, navigate to `/admin/login`, submit wrong password 6 times → 6th attempt is blocked with HTTP 429.
2. Submit correct password → redirected to `/admin`, cookie set HttpOnly + Secure (verify in DevTools → Application → Cookies).
3. In DevTools console, `document.cookie` must NOT show the session value (HttpOnly).
4. Manually delete the cookie → next admin page request redirects to `/admin/login`.
5. Curl an admin POST endpoint without the cookie → returns 401, even if `X-Sahara-Admin: 1` header is present.
6. Curl `https://saharaprinter.com/.well-known/security.txt` → returns the file with HTTP 200.
7. Run `/security-review` after implementation to confirm no regressions.
```

---

## Objective 2 — Rebuild admin sidebar + dashboard UI

**Skills:** `/frontend-design` (visual system), `/dev:frontend-developer` (implementation)

### Prompt

```
/frontend-design then /dev:frontend-developer

Goal: Redesign the admin sidebar and dashboard at src/app/admin/(dashboard)/* into a modern, grouped, icon-led layout, AND clarify the mysterious "user online status" indicator.

Current state:
- src/app/admin/(dashboard)/layout.tsx lines 8-20 list 11 flat nav items: Dashboard, Products, Supplies, Inquiries, Blog, Clients, FAQs, Testimonials, Brands, SEO & Analytics, Settings. No icons, no grouping, no collapsed/expanded state.
- The sidebar is `w-64 h-full fixed` (line 53) with a hard-coded gold gradient logo at the top.
- The dashboard page src/app/admin/(dashboard)/page.tsx surfaces a `liveUsers` stat fetched from /api/analytics/stats — this is the "user online status bar" the operator does not understand. It is currently a count of LIVE PUBLIC VISITORS on the marketing site, NOT an admin presence indicator.

Required outcome:
1. Sidebar redesign:
   - Group the 11 items into three sections with small caps headings: **Catalog** (Products, Supplies, Brands), **Content** (Blog, Testimonials, FAQs, Clients), **Operations** (Dashboard, Inquiries, SEO & Analytics, Settings).
   - Add lucide-react icons next to each item (already a peer dep — check package.json).
   - Active route highlighted with the brand gold (`#C9A14A` or whatever is in tailwind.config.js).
   - Sidebar collapsible to a 64px icon rail on screens < 1280px; full 256px above.
   - Fix the scroll/logout issue (see Objective 3 — coordinate, do not duplicate).
2. Dashboard redesign:
   - Card grid: 3 columns desktop, 2 tablet, 1 mobile.
   - Replace the cryptic "live users" number with a clearly-labeled **"Live site visitors"** card with a small `(?)` tooltip: *"Real-time visitors on the public website (from Cloudflare Web Analytics). Updates every 30s."*
   - Add a separate **"Admin session"** card showing: logged-in admin email, login timestamp, and a "Sign out" button. This is the real "admin online status."
   - KPIs above the fold: Open inquiries (last 7d), Quote requests, Top-viewed product, Active testimonials count.
3. Visual system:
   - Document the chosen palette/spacing/typography in src/app/admin/_design-tokens.md (no separate package needed) so future admin pages stay consistent.

Constraints:
- Do NOT introduce a new component library if shadcn/ui is already partly used — extend it. Verify by reading package.json first.
- Keep the page bundle under +30 KB gzipped vs current; lucide-react must be tree-shaken (named imports only).
- Preserve every existing route — this is a visual + IA change, not a feature rename. The URL slugs stay identical.
- Mobile (< 768px): sidebar becomes a slide-over drawer triggered by a hamburger; do not show the full sidebar on phones.

Reuse pointers:
- Existing nav array at src/app/admin/(dashboard)/layout.tsx lines 8-20 — extend in place.
- Tailwind tokens at tailwind.config.js (colors.surface, colors.primary).
- Live-visitors data already comes from /api/analytics/stats — do not add a new endpoint.

Verification:
1. `pnpm dev` → /admin → visually compare against current. Take before/after screenshots at 1920×1080 and 390×844 (iPhone).
2. Resize from 1920 down to 320; sidebar collapses cleanly at 1280 and becomes a drawer below 768.
3. Hover the (?) on "Live site visitors" → tooltip appears within 200 ms.
4. Lighthouse on /admin (logged in) → Performance ≥ 90, Accessibility ≥ 95.
5. Run `/dev:requesting-code-review` to confirm no regressions.
```

---

## Objective 3 — Make sidebar scrollable so Logout is reachable

**Skill:** `/react-expert`

### Prompt

```
/react-expert

Goal: Fix the admin sidebar so the Logout button at src/app/admin/(dashboard)/layout.tsx lines 85-91 is always reachable, on every viewport height.

Current state:
- src/app/admin/(dashboard)/layout.tsx line 53 declares the sidebar as `<aside className="w-64 h-full fixed ...">` with no overflow handling on the inner nav list.
- Result: on viewports shorter than ~720 px, the bottom nav items and the Logout button get clipped with no scrollbar.

Required outcome:
A pure CSS / Tailwind-class change to layout.tsx:
1. Convert the sidebar to a vertical flex column: `flex flex-col h-screen`.
2. Make the nav list area scrollable: wrap `<nav>` in a div with `flex-1 overflow-y-auto` and apply the existing `.no-scrollbar` utility from src/app/globals.css lines 43-49 if a clean look is preferred — otherwise let the scrollbar show.
3. Pin the Logout block to the bottom by giving its container `mt-auto shrink-0 border-t pt-4`.
4. Verify the brand/logo header at the top stays pinned with `shrink-0`.

Constraints:
- DO NOT refactor the sidebar to a new component file. This is a 5-line change inside the existing layout.tsx.
- DO NOT add any new dependency or icon.
- DO NOT change the visual styling beyond what is required to make scroll work.

Verification:
1. `pnpm dev`, log in to /admin, set browser height to 500px → Logout is visible without scrolling the page (only the nav itself scrolls).
2. Set height to 1080px → Logout sits flush at the bottom; layout looks identical to before.
3. Tab-key keyboard navigation reaches Logout in both heights.
```

---

## Objective 4 — Add unified save-feedback toasts across admin

**Skills:** `/react-expert`, `/dev:frontend-developer`

### Prompt

```
/react-expert

Goal: Every Save / Update / Delete action in the admin panel must show an immediate, accessible success-or-error toast. Today most pages save silently and the operator cannot tell whether the request worked.

Current state:
- No toast library is installed (verified: package.json has no `sonner`, `react-hot-toast`, or shadcn `Toaster`).
- src/app/admin/(dashboard)/testimonials/page.tsx lines 27 + 199-203 use a boolean `saved` state with a `setTimeout(..., 3000)` — a tiny green badge. Most other admin pages do not even have that.
- Pattern in src/app/admin/(dashboard)/products/page.tsx lines 142-165 (`handleSave`) does an optimistic state update, fires the API call, and discards both the response and any error. There is no error UI anywhere in the admin.

Required outcome:
1. Install `sonner` (≈ 5 KB gzipped, edge-compatible). Add `<Toaster richColors position="top-right" />` once in src/app/admin/(dashboard)/layout.tsx.
2. Create a tiny helper at src/lib/admin-feedback.ts:
   ```ts
   import { toast } from "sonner";
   export async function withFeedback<T>(promise: Promise<T>, msgs: { loading?: string; success: string; error: string }): Promise<T> { ... }
   ```
   It should call `toast.promise(promise, msgs)` and rethrow on error so callers can still branch.
3. Wrap EVERY admin mutation. At minimum:
   - testimonials/page.tsx — handleSave, handleDelete, handleToggleActive, handleReorder
   - products/page.tsx — handleSave, handleDelete, image upload
   - supplies/page.tsx, inquiries/page.tsx, blog/page.tsx, blog/editor/page.tsx, clients/page.tsx, faqs/page.tsx, brands/page.tsx, seo/page.tsx, settings/page.tsx — every save / delete / publish handler.
4. Error toast must surface the actual server error message when present (read response JSON `error` field), not a generic "Something went wrong."
5. Remove the now-redundant `saved` boolean + setTimeout in testimonials/page.tsx and any other page that used the old pattern.

Constraints:
- Toast library must be edge-runtime-safe (sonner is).
- Do NOT alter the underlying API call signatures.
- Loading toast should appear instantly, success/error toasts within 100 ms of the API resolving.
- Preserve `prefers-reduced-motion`: sonner respects it, but verify on a `prefers-reduced-motion: reduce` browser session.

Reuse pointers:
- Optimistic update pattern at products/page.tsx lines 142-165 — keep the optimistic UI but layer the toast on top.
- API error shape: most routes return `{ error: string }` with non-2xx status; e.g. src/app/api/testimonials/route.ts.

Verification:
1. `pnpm dev` → /admin/testimonials → click Save on a row → success toast within 1s.
2. Stop the dev server mid-save (or block /api/testimonials in DevTools Network) → error toast with the real failure message.
3. Toggle active state of a testimonial → toast confirms.
4. Delete a row → toast confirms; row disappears.
5. Repeat for at least one other page (e.g. products) to confirm consistency.
```

---

## Objective 5 — Redesign testimonials tab with WebP image upload

**Skills:** `/fullstack-guardian` (file upload + storage), `/frontend-design` (declutter)

### Prompt

```
/fullstack-guardian

Goal: Declutter the testimonials admin tab and replace the URL-only image field with a proper file upload that converts to WebP via the existing /api/convert-image endpoint.

Current state:
- src/app/admin/(dashboard)/testimonials/page.tsx (462 lines) renders a dense table: Order arrows + Customer + Review text + Rating stars + Active toggle + Edit + Delete, all in one row → visually noisy.
- The Add/Edit modal (lines 315-461) accepts an image only as an external URL string at lines 427-438 (regex-validated `/^https?:\/\/.+\.(webp|png|svg|jpg|jpeg)$/i`). There is no file picker.
- HOWEVER, the upload + conversion pipeline already exists:
  - src/app/api/upload/route.ts accepts FormData and stores on Cloudflare R2 (binding: SAHARA_ASSETS).
  - src/app/api/convert-image/route.ts accepts FormData / URL / base64, converts to WebP, returns the public R2 URL.
  - Working reference wiring: src/app/admin/(dashboard)/products/page.tsx lines 348-379 already uses /api/convert-image for product images. Mirror that pattern.
- DB schema: testimonials.image_url stores the URL as TEXT (database/schema.sql, table `testimonials`).

Required outcome:
1. Replace the URL `<input>` in the testimonials modal with a dual-mode field:
   - Default: `<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml">`. On change, POST as FormData to /api/convert-image, receive the WebP R2 URL, store in form state.
   - Secondary "Use external URL" toggle that reveals the old text input, for cases where R2 is undesirable.
2. Show an instant local preview while the upload is in flight, with a spinner overlay; replace with the final R2-served preview on success.
3. Validate file size client-side (max 2 MB) and reject before upload with a toast (use the helper from Objective 4 if it exists; otherwise inline alert).
4. Declutter the table (frontend-design pass):
   - Collapse the Order ▲▼ buttons into a single drag handle (use `@dnd-kit/core` if not already a dep, otherwise pure HTML5 drag).
   - Move Edit + Delete + (new) Duplicate into a kebab `⋯` dropdown menu.
   - Replace the Active text toggle with a Switch component (visual, not text).
   - Truncate the Review column to 2 lines with `line-clamp-2` and a tooltip on hover for the full text.
   - Add a thumbnail column (40×40 rounded) showing the testimonial avatar, with a fallback initials chip if missing.
5. Database remains unchanged (image_url already accepts any URL).

Constraints:
- The /api/convert-image endpoint already returns WebP; do NOT add a parallel conversion path.
- Do NOT bloat the modal — it must fit in a single column on a 1280×800 monitor without scrolling for the common case.
- Preserve every existing field and validation rule (rating 1-5, text 500 char max, etc).
- This change touches ONLY testimonials; do not modify products or other pages.

Reuse pointers:
- Upload wiring template: products/page.tsx lines 348-379.
- Modal styling: keep the same gold submit button and surface tokens already used in the file.
- Toast helper: src/lib/admin-feedback.ts (from Objective 4) if available.

Verification:
1. `pnpm dev` → /admin/testimonials → "Add Testimonial" → choose a JPG → preview shows immediately; after upload the URL field populates with a `*.webp` R2 URL.
2. Save → row appears with the WebP thumbnail.
3. Reload the public marketing page → testimonial avatar loads from R2 as WebP (verify in DevTools → Network → Type column).
4. Try uploading a 3 MB PNG → blocked with a toast "File too large".
5. Toggle "Use external URL" → can paste a remote https URL as before.
6. Drag a row to reorder → sort_order persists after reload.
7. Open kebab menu → Edit / Duplicate / Delete all work.
```

---

## Objective 6 — Fix carousel auto-loop without hurting PageSpeed

**Skill:** `/dev:web-performance-optimization`

### Prompt

```
/dev:web-performance-optimization

Goal: Stabilize the auto-looping "Trusted Brands" and "Wall of Trust" (testimonials) carousels on the home page so the loop is visually seamless on every viewport, without regressing Lighthouse Performance, LCP, or CLS.

Current state:
- src/app/page.tsx lines 678-769 — `BrandCarousel`. Uses CSS animation `animate-carousel` (25 s linear infinite). Array is doubled for seamless wrap (line 714). Logos served as WebP from /public/brands/*.webp.
- src/app/page.tsx around line 596 — `ReviewsSection` "Wall of Trust." Uses `animate-infinite-scroll` (30 s). Array also doubled.
- Keyframes defined in src/app/globals.css lines 62-88 (`@keyframes carousel`, `@keyframes scroll`).
- `prefers-reduced-motion` already disables the animations (globals.css lines 102-108) — preserve this.

Known PageSpeed risks (verified by exploration):
1. Brand `<img>` tags have no explicit `width` / `height` attributes → CLS on first paint.
2. No `loading="lazy"` or `decoding="async"` on logos → competes with hero LCP for bandwidth.
3. The track uses `width: max-content` with no upper bound → on narrow phones the carousel can cause horizontal scroll.
4. No `will-change: transform` or `transform: translateZ(0)` on the animated track → animation may run on the main thread instead of the compositor on lower-end devices, causing jank.
5. No `animation-delay` and the doubled-array boundary is not pixel-perfect at every viewport → occasional visible "jump" on loop restart.
6. Reviews carousel does not have the `gap` compensation that the brands carousel has (`-50% - 2rem` keyframe), so its loop seam is more visible.

Required outcome:
1. Add explicit `width` and `height` (intrinsic logo dimensions) to every brand `<img>` and to testimonial avatars. Use Next.js `<Image>` only if it does not break the CSS-driven track sizing — otherwise plain `<img>` with width/height attributes is acceptable.
2. Add `loading="lazy"` and `decoding="async"` to all carousel images.
3. Wrap each track in a parent with `overflow-hidden max-w-full` so it cannot cause horizontal page scroll on mobile.
4. Add `will-change: transform; transform: translateZ(0); backface-visibility: hidden;` to the animated track classes in globals.css to keep the animation on the GPU.
5. Fix the reviews-carousel seam so its keyframe matches the brands pattern — translate to `-50% - {gap}` instead of `-50%`. Read the actual gap from the existing class (likely `gap-6` = 1.5rem).
6. Run Lighthouse on `https://saharaprinter.com/` (or local prod build) BEFORE the change; record LCP, CLS, TBT. Run AFTER. Required: LCP must not increase by more than 50 ms, CLS must not increase at all (target ≤ 0.05), Performance score must not drop more than 1 point.

Constraints:
- DO NOT replace the CSS animation with a JS carousel library (embla, swiper). The current pure-CSS approach is the right one for performance.
- DO NOT remove `prefers-reduced-motion` handling.
- DO NOT change the visual cadence (25 s brands, 30 s reviews) without operator approval.
- Keep all changes inside src/app/page.tsx and src/app/globals.css; no new files.

Reuse pointers:
- Existing keyframes: globals.css lines 62-88.
- Existing brand fallback logic: src/app/page.tsx lines 656-665 + 741.

Verification:
1. `pnpm build && pnpm start`, run Lighthouse desktop + mobile on the home page → record numbers.
2. DevTools → Performance → record 5 s of carousel animation. Confirm the green "Animation Frame" track shows compositor-only work (no purple "Layout" or "Paint" hits inside the loop).
3. Resize from 1920 to 320 px → no horizontal page scroll appears on the home page.
4. With `prefers-reduced-motion: reduce` enabled in DevTools → animations stop, content remains readable.
5. Visually verify that the loop seam is not perceptible at 25 s for brands and 30 s for reviews.
```

---

## Appendix — Cloudflare Security Insights (verbatim)

Source file (operator's machine):
`C:\Users\SAHARA\Downloads\Cloudflare_Saharasharjah@gmail.com's Account_SecurityInsights_20260428_1210.csv`

Captured 2026-04-28. All four findings are **Active**.

| # | Severity | Issue | Subject | Recommendation |
|---|----------|-------|---------|----------------|
| 1 | Low | Security.txt not configured | saharaprinter.com | Configure a `Security.txt` file. The absence creates a lack of a clear, accessible method for researchers to report vulnerabilities, increasing the risk of unreported exploitation. |
| 2 | Low | Review unwanted AI crawlers | saharaprinter.com | Enable AI Labyrinth in the Cloudflare dashboard. |
| 3 | Low | No Turnstile enabled | This account | Create a Turnstile widget and apply it to public-facing forms (login, contact, quote). |
| 4 | **Moderate** | Users without MFA | saharasharjah@gmail.com | Require two-factor authentication for the Cloudflare account. All members of the account will be required to set up 2FA. |

Findings 1, 3 are addressed by code in **Objective 1**. Findings 2, 4 are operator actions that must be performed in the Cloudflare dashboard and are listed in `SECURITY-OPS.md` (created as part of Objective 1).
