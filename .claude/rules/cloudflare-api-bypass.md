# Cloudflare Configuration for API Routes (Free Tier)

This document describes the **Cloudflare Free Tier** configuration required to ensure `/api/*` routes are not blocked and remain accessible to Googlebot.

> **Note:** This guide is for Cloudflare Free Tier. Enterprise/Pro features like custom WAF rules are not available.

## Issue

API routes (`/api/logos`, `/api/settings`, `/api/testimonials`) may be blocked or return empty responses because:
1. Cloudflare Challenge (CAPTCHA) blocks Googlebot from accessing API endpoints
2. Browser Integrity Check rejects non-browser requests
3. Security rules are too strict for public API data routes

## Solution (Free Tier - What Actually Works)

### 1. Firewall Rules for Googlebot Whitelist (PRIMARY)

⚠️ **Note:** Free tier doesn't expose "Security Level" or "Browser Integrity Check" in Page Rules. Use **Firewall Rules** instead.

**Location:** Cloudflare Dashboard → Security → Firewall Rules

**Create Firewall Rule: Whitelist Googlebot**

```
(cf.bot_management.verified_bots contains "Googlebot") and 
(http.request.uri.path contains "/api/")
```
**Action:** Allow

**Why:** Bypasses any security challenges for Googlebot on API routes, ensuring it can fetch data for page rendering.

---

### 2. Optional: Page Rule for API Cache Bypass

**Location:** Cloudflare Dashboard → Rules → Page Rules

If you want to be explicit about cache handling:

**URL matches:** `www.saharaprinter.com/api/*`  
**Setting:**
- Cache Level: Bypass

**Why:** Ensures Page Rules don't cache API responses (though cache headers in code handle this).

---

### 3. Server-Side Cache Headers (ALREADY CONFIGURED)

The following are already set in your app:
- `export const dynamic = 'force-dynamic'` on all API routes
- `Cache-Control: no-store, max-age=0` on `/api/logos` and `/api/testimonials`
- `Cache-Control: public, s-maxage=3600` on `/api/settings`

These headers override any Cloudflare caching rules, so no additional Cloudflare cache configuration is needed.

---

## Verification

### Test 1: Googlebot Access to API

```bash
curl -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  -i https://www.saharaprinter.com/api/logos
```

**Expected response:**
- Status: 200 OK
- Body: Valid JSON (not empty)
- No HTML/CAPTCHA page returned

### Test 2: Regular Browser Access

```bash
curl -i https://www.saharaprinter.com/api/logos
```

**Expected response:**
```
HTTP/2 200
Content-Type: application/json
Cache-Control: no-store, max-age=0
{...JSON data...}
```

### Test 3: Check for Browser Integrity Blocks

Open DevTools on your browser and check Network tab when accessing `/api/logos`:
- Should return 200 OK
- Should NOT see 403 Forbidden or 1007 (Forbidden on Browser Integrity Check)

---

## Troubleshooting

### Problem: Googlebot still getting blocked or challenged

**Fix:**
1. Go to Cloudflare Dashboard → Security → Firewall Rules
2. Verify your Googlebot rule appears **above** any Block/Challenge rules (order matters)
3. Check rule is: `cf.bot_management.verified_bots contains "Googlebot"` and path contains `/api/`
4. Clear Cloudflare cache: Caching → Cache Purge → Purge Everything
5. Wait 2-3 minutes for rules to propagate
6. Test: `curl -A "Googlebot" https://www.saharaprinter.com/api/logos`

### Problem: API returning 200 but empty data

**This is NOT a Cloudflare issue** — check your Next.js API routes:
- Verify `export const dynamic = 'force-dynamic'` is present
- Check server logs for database connection errors
- Test locally with `npm run dev` first

### Problem: Regular users can't access API

**Check:**
1. Firewall Rules don't have overly restrictive rules (should Allow low-threat users)
2. No other Firewall rules Block all traffic to `/api/*`
3. Try accessing without Googlebot User-Agent: `curl https://www.saharaprinter.com/api/logos`

---

## Rollback

If APIs stop working after Cloudflare changes:

1. Go to Rules → Page Rules → Delete all custom rules
2. Go to Security → Firewall Rules → Delete all custom rules
3. Re-enable Browser Integrity Check if disabled
4. Clear Cloudflare cache (Caching → Cache Purge → Purge Everything)
5. Test with curl: `curl -i https://www.saharaprinter.com/api/logos`

---

## Free Tier Limitations & Solutions

| Feature | Free Tier | Solution |
|---------|-----------|----------|
| Custom WAF Rules | ❌ Not available | Use **Firewall Rules** for allow/block (you did this ✅) |
| Cache Rules | ❌ Not available | Use **Cache-Control headers** in code (already done ✅) |
| Security Level in Page Rules | ❌ Not available | Not needed — Firewall Rules handle bot access |
| Browser Integrity Check | ❌ Can't modify | Not configurable on free tier |
| Advanced Bot Rules | ✅ Available | Use `cf.bot_management.verified_bots contains "Googlebot"` |
| Firewall Rules | ✅ Unlimited | Create rules to whitelist Googlebot (you did this ✅) |

---

## Related Files

- `wrangler.toml` — Cloudflare Pages build configuration
- `next.config.mjs` — CSP headers, global security headers
- `public/_headers` — Cloudflare Pages header configuration
- `public/robots.txt` — Allow Googlebot to crawl APIs (✅ done)
- `src/app/api/*/route.ts` — API routes with `dynamic = 'force-dynamic'` (✅ done)

---

## Quick Checklist

Before deploying, verify:

- [x] Firewall Rule created: `cf.bot_management.verified_bots contains "Googlebot"` → Allow (YOU DID THIS ✅)
- [x] All API routes have `export const dynamic = 'force-dynamic'` (DONE ✅)
- [x] `robots.txt` allows `/api/logos`, `/api/settings`, `/api/testimonials` (DONE ✅)
- [ ] Tested with curl (both regular and Googlebot User-Agent)
- [ ] Verified Firewall Rule order (should be above any Block rules)
- [ ] Cleared Cloudflare cache after rule changes
