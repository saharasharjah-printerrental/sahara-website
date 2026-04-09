# Cloudflare Deployment Guide - Sahara Printer Website

This guide covers connecting your existing Cloudflare D1 database and R2 storage to deploy the Sahara Printer Website.

## Your Cloudflare Configuration

| Service | Details |
|---------|---------|
| **D1 Database** | `sahara-printer-db` (ID: `2c278d16-64fe-42a6-8ea1-aabdf75c2ce9`) |
| **R2 Bucket** | `sahara-printer-files` |
| **Account ID** | `034ddee1699595a19ee79f688de3b421` |

---

## Step 1: Update wrangler.toml

Create/update `wrangler.toml` in project root:

```toml
name = "sahara-printer"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".output"

# D1 Database - Your existing database
[[d1_databases]]
binding = "DB"
database_name = "sahara-printer-db"
database_id = "2c278d16-64fe-42a6-8ea1-aabdf75c2ce9"

# R2 Storage - Your existing bucket
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "sahara-printer-files"

[vars]
NEXT_PUBLIC_API_URL = "/api"
```

---

## Step 2: Set Up GitHub Repository

### Push Code to GitHub
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sahara-website.git
git push -u origin main
```

---

## Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | `cfat_YBYoMpnR13z5sJvlbQVxnFdtOWG9lcvz6rlpfllGbb139e6f` |
| `CLOUDFLARE_ACCOUNT_ID` | `034ddee1699595a19ee79f688de3b421` |

---

## Step 4: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  deployments: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          api-token: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          account-id: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          project-name: sahara-printer
          directory: .output
          branch: main
```

---

## Step 5: Update Next.js Config for Cloudflare

Update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

---

## Step 6: Create Cloudflare Pages Project

### Option A: Via Dashboard
1. Go to **Cloudflare Dashboard → Workers & Pages**
2. Click **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub repo
4. Configure:
   - **Project name**: `sahara-printer`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `.output`
5. Click **Save and Deploy**

### Option B: Via CLI
```bash
npx wrangler pages project create sahara-printer
npx wrangler pages deploy .output --project-name=sahara-printer
```

---

## Step 7: Environment Variables in Cloudflare

In Cloudflare Pages dashboard (Settings → Environment variables):

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `/api` |

---

## Step 8: Database Schema Setup

Apply the schema to your D1 database:

```bash
# Install wrangler if not already
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Execute schema on your D1 database
wrangler d1 execute sahara-printer-db --remote --command="
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  condition TEXT,
  priceSale TEXT,
  priceRental TEXT,
  specs TEXT,
  image TEXT,
  isActive INTEGER DEFAULT 1,
  isFeatured INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS supplies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  compatibleModels TEXT,
  color TEXT,
  yield TEXT,
  price TEXT,
  stock INTEGER DEFAULT 0,
  image TEXT,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logoUrl TEXT,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  pageSlug TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sortOrder INTEGER DEFAULT 0,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
"
```

---

## Step 9: Connect Your Domain (Optional)

1. In Cloudflare Dashboard → Pages → your project → **Custom domains**
2. Add your domain (e.g., `saharaprinter.ae`)
3. Cloudflare will automatically set up SSL

---

## Step 10: Deploy

### Trigger Deploy
Push to main branch OR manually trigger from GitHub:
```bash
git push origin main
```

### Check Deployment
- Go to **Cloudflare Dashboard → Workers & Pages**
- Find `sahara-printer` project
- Check deployment status

---

## Your Live URL

After deployment, your site will be available at:
- **Primary**: `https://sahara-printer.pages.dev`
- **Custom**: `https://your-domain.com` (if configured)

---

## Troubleshooting

### Build Fails
- Verify Node.js version is 20 in GitHub workflow
- Ensure `output: 'export'` in next.config.mjs

### 404 Errors on Pages
- Add `_redirects` file in `public/` folder:
  ```
  /*    /index.html   200
  ```

### Database Connection Issues
- Verify D1 database ID in wrangler.toml
- Run `wrangler d1 execute sahara-printer-db --remote --command="SELECT 1"` to test

### Images Not Loading
- Verify R2 bucket binding in wrangler.toml
- Check CORS settings on R2 bucket

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `wrangler d1 execute sahara-printer-db --remote --command="SQL"` | Run SQL on D1 |
| `wrangler pages deploy .output --project-name=sahara-printer` | Manual deploy |
| `wrangler logout && wrangler login` | Re-authenticate |