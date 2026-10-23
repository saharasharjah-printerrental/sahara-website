# HTML caching options (Phase 3, decision only: no Cloudflare or code change made)

Date: 2026-10-23. Goal: cut server response time (TTFB) on public pages, which stays high after the font and script fixes.

## Evidence

Measured on 2026-10-23 with curl, 10 requests per URL, time to first byte (seconds). This machine is served by Cloudflare's Paris data centre (`CF-RAY ...-CDG`), probably because of a VPN/WARP on the machine, so absolute numbers are higher than for a UAE visitor. The comparison between rows is what matters.

| URL | min | median | max |
|---|---|---|---|
| `/robots.txt` (static, edge) | 0.36 | 0.41 | 1.07 |
| a `/_next/static/css/...` asset | 0.39 | 0.43 | 0.68 |
| HTML `/` | 1.12 | 1.53 | 2.13 |
| HTML `/services/printer-rental/` | 0.91 | 1.56 | 1.85 |
| HTML `/brands/kyocera/` | 0.50 | 0.75 | 1.66 |
| `/api/faqs/?pageSlug=homepage` | 0.47 | 0.65 | 1.22 |

So about 0.35 s to 1.1 s of the median HTML response is server work (rendering plus D1 reads) on top of the network. Lighthouse showed the same spread (TTFB 160 ms to 1.6 s on the homepage across runs).

Facts about the pages (verified by header inspection and code search):
- HTML responses carry no `Cache-Control`, and Cloudflare reports `cf-cache-status: DYNAMIC` on every page.
- No `Set-Cookie` on public pages.
- The `Content-Security-Policy` is static: no per-request nonce, so a cached copy stays valid.
- Responses have `Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch` (Next.js).
- Per request the app reads D1: site settings (already cached 5 minutes per worker instance), FAQs, reviews, and for the calculator pages the tariff.

What Cloudflare's documentation says (fetched 2026-10-23):
- Cloudflare does not cache HTML by default; it needs an explicit cache rule ([default cache behavior](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/)).
- Responses with `Set-Cookie`, or `Cache-Control: private/no-store/no-cache/max-age=0`, are not cached (same page).
- The Free plan allows 10 Cache Rules ([Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)). Rules offer Edge TTL, Browser TTL and "serve stale content while revalidating" ([settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/)); the page does not say which of these are limited by plan.
- Purge by URL, tag, prefix, hostname or everything is available on Free, limited to 5 API requests a minute ([purge](https://developers.cloudflare.com/cache/how-to/purge-cache/)).
- Vary: by default Cloudflare did not consider Vary values; newer Cache Rules have a Vary setting, and Cloudflare recommends defaulting unexpected Vary headers to bypass ([Vary](https://developers.cloudflare.com/cache/concepts/vary/)). I could not confirm from the docs which plans get the new Vary setting, so test before relying on it.
- Next.js on Pages (`@cloudflare/next-on-pages`) does not support ISR: prerendered pages are served as static fallbacks and never regenerated, and the docs advise SSR for those pages. `fetch` data caching and `revalidate` are supported ([supported features](https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/supported.md)). This site reads D1 directly, not via `fetch`, so that data cache does not apply. Conclusion: whole-page caching cannot be done in code on this stack; it has to happen at the Cloudflare edge.

## Options

### Option A (recommended): Cloudflare Cache Rule for public HTML, short TTL
Rule (Rules → Cache Rules → Create), "Eligible for cache":
```
(http.host eq "www.saharaprinter.com")
and (http.request.method eq "GET")
and not starts_with(http.request.uri.path, "/admin")
and not starts_with(http.request.uri.path, "/api")
and not starts_with(http.request.uri.path, "/quote")
and not starts_with(http.request.uri.path, "/_next")
and not http.cookie contains "admin_session"
and not http.request.uri.query contains "_rsc="
```
Settings: Edge TTL = override, 5 minutes; Browser TTL = bypass (visitors always revalidate with the edge); serve stale while revalidating = on if the plan allows it. Cache key: default (includes the query string, so `?context=` and `?search=` URLs are separate entries).
- Expected effect: HTML first byte close to the static-file row (about 0.4 s here) on a cache hit, instead of 0.75 to 1.6 s. Googlebot also gets the faster response.
- Cost: an admin edit (FAQ, product, pricing, settings) can take up to the TTL to show to visitors; the first request after expiry, and the first in each data centre, is still slow. Admin users with the `admin_session` cookie bypass the cache, so you see your own edits at once.
- Risks and tests before wide use: (1) confirm a second request returns `cf-cache-status: HIT`; (2) confirm client-side navigation still works (RSC requests use `?_rsc=` and are excluded); (3) because the origin sends `Vary: rsc, ...`, check that the Vary handling in your plan does not make every response bypass the cache; (4) check a page that you just edited in admin shows the old copy for at most 5 minutes, then the new one.
- Rollout: first scope the rule to marketing paths (`/`, `/services/`, `/brands/`, location and service pages), watch for a day, then widen. Rollback: disable the rule (instant); purge everything once.
- Optional later: purge changed URLs automatically when an admin saves (needs a Cloudflare API token stored as a secret, and a small code change; 5 purge requests a minute on Free, so batch). Not needed to start.

### Option B (low risk, smaller gain): cut the per-request work in code
Cache the D1 reads that run on every request (FAQs, reviews, calculator tariff) in memory for 1 to 5 minutes inside the worker, the same pattern `getSEOConfig` already uses. No Cloudflare change, and admin edits still appear within the same few minutes. Gain: removes the D1 round trips only (not rendering), and each worker instance warms its own copy, so the effect is partial. Good as a first step or alongside Option A.

### Option C: leave as is and re-measure after the font fix is deployed
Reasonable if you want to see the fonts change alone first. TTFB variance (0.5 s to 2.5 s) will remain.

## Recommendation
Do Option A scoped to marketing pages with a 5-minute edge TTL, after the font change has been deployed and measured. Keep Option B as a code follow-up. Decision belongs to the owner; I made no Cloudflare change.

## What I need from the owner
1. Option A, B, both, or neither.
2. If A: confirm 5 minutes is acceptable for admin edits to reach visitors (or choose 2 or 10 minutes), and who will create the rule in the dashboard (the expression above is ready to paste). I can also verify it with curl once it is on.
3. Whether you want automatic purge on admin save later (needs a Cloudflare API token; I would not receive the token in chat).

## APPLIED 2026-10-23 (owner approved Option A; rule created in the Cloudflare dashboard)
Rule: Caching > Cache Rules > "HTML edge cache - marketing pages (5 min)", Active, order 1 (zone saharaprinter.com, Free plan). Only rule on the zone.
- Expression (938 characters): host `www.saharaprinter.com`, method GET, NOT cookie contains `admin_session`, NOT query contains `_rsc=`, and path is `/`, or starts with `/services/`, `/brands/`, `/printer-rental-`, `/photocopier-rental-`, `/canon-printer-`, `/hp-printer-`, `/printer-repair-`, `/printer-amc-`, `/blogs/`, or ends with `-printer-repair/`, or equals `/about/`, `/our-clients/`, `/rental-calculator/`, `/bravo-card-printers-uae/`.
- Settings: Eligible for cache; Edge TTL = ignore origin cache-control, 5 minutes; Browser TTL = Respect origin TTL. No Vary, cache-key, or serve-stale setting (serve-stale could not be added through the automated browser; add it in the dashboard if wanted).
- Not cached (stay DYNAMIC): `/quote/`, `/admin/`, `/api/`, `/checkout/`, `/contact/`, `/products/`, `/request-quote/`, anything with the admin cookie or an `_rsc=` query.
- Browser TTL history: first deployed with "Bypass cache", which made Cloudflare send `Cache-Control: no-store` on cached pages (blocks back/forward reuse). Changed to "Respect origin TTL"; verified `no-store` is gone.
- Verified with curl on 2026-10-23: first requests MISS, later requests HIT with an `Age` header; time to first byte on a HIT 0.35-0.45 s versus 0.7-1.6 s on a MISS (from a machine routed through Paris). Some MISSes between HITs are expected while each edge node warms up. Excluded paths, the admin-cookie request and the `_rsc` request all returned `cf-cache-status: DYNAMIC`.
- Effect on editing: public pages in the rule can show an old copy for up to 5 minutes after an admin edit. To refresh immediately: Cloudflare dashboard > Caching > Configuration > Purge Cache (Custom purge by URL, or Purge Everything). Logged-in admins bypass the cache.
- Disable / roll back: Cache Rules > the rule > toggle off (or delete). Effect is immediate; the cached copies expire within 5 minutes.
- Widening later: add `/products/`, `/contact/` etc. to the path list once you are happy; keep `/quote`, `/checkout`, `/request-quote`, `/api`, `/admin` excluded.
