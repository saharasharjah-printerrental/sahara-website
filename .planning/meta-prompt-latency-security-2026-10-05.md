# Meta prompt: Sahara Printer local performance and security pass

Act as the engineer responsible for `saharaprinter.com`. Continue from the existing local branch and release plan. Diagnose measured latency before editing. Inspect the middleware, Cloudflare routing, root layout, D1 backed APIs, public navigation, quote and contact submissions, and admin actions. Look for exploitable security defects and functional errors; distinguish confirmed defects from deployment checks.

Implement focused fixes locally, preserving unrelated work and the PVC card quote and FAQ changes. Public caches may contain only explicitly public data. Admin, order, payment, lead, and write responses must stay private. Verify authorization, response headers, build output, and affected user journeys. Record measurements, tests, remaining risks, and rollback considerations. Stop before push, remote database changes, or deployment; the user will test the local result before approving any live change.

## Local execution record

- Previous live samples showed roughly 2.0 seconds time to first byte on the homepage and 0.6–2.0 seconds on selected D1 backed APIs. Host redirects resolved without a loop. These are directional network measurements, not a before and after deployment result.
- Root layout now starts its independent SEO config and Google review reads together. Google review data is kept for five minutes per warm worker isolate.
- An explicit `?public=1` settings response selects only two allowed rows, removes private site fields, and is eligible for a 60 second shared cache. Header, footer, and contact use that response. The admin settings response remains private.
- Public product lists and published blog reads use a 60 second shared cache. Product ID reads and draft blog reads remain private. Middleware no longer forces `no-store` onto those safe responses.
- Contact now reports a failed server submit accurately and supports retry; browser storage is updated only after server acceptance.
- `npm.cmd run build` passed. `node --test tests/scripts/security-regressions.cjs` passed 18/18. `git diff --check` found no whitespace errors. No production measurement can reflect these local changes until a test deployment exists.
- Repository configuration shows Cloudflare Pages/Workers and D1 bindings, with no load balancer configuration. Dashboard routing, cache behavior, and origin health need review at release time. The in-memory rate limit is per worker isolate and should not be treated as a distributed abuse control.
- The prior PVC card migration and FAQ corrections remain on this branch. Verify them in the user's local test pass before release.
