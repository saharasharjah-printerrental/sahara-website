# Setup Reference

All real credentials must be set in Cloudflare Dashboard only — never in code files.

## Cloudflare Pages → Settings → Environment Variables

| Variable | Where to get it |
|----------|----------------|
| `R2_PUBLIC_URL` | R2 bucket → Settings → Public Access → copy the pub URL |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard → right sidebar |

## wrangler.toml bindings (no secrets needed here)

- D1 binding `DB` → database name + ID (IDs are not secret, just not worth exposing)
- R2 binding `SAHARA_ASSETS` → bucket name

## GitHub Secrets (for CI/CD only)

Go to GitHub repo → Settings → Secrets and variables → Actions:

| Secret | Where to get it |
|--------|----------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard → right sidebar |

**Never paste real token values into any file in this repo.**
