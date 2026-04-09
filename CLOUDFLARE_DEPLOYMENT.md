# Cloudflare Deployment Guide - Sahara Printer Website

This guide covers connecting your existing Cloudflare D1 database and R2 storage to deploy the Sahara Printer Website.

## Your Cloudflare Configuration

| Service | Details |
|---------|---------|
| **D1 Database** | `sahara-printer-db` (ID: `2c278d16-64fe-42a6-8ea1-aabdf75c2ce9`) |
| **R2 Bucket** | `sahara-printer-files` |
| **Account ID** | `034ddee1699595a19ee79f688de3b421` |

---

## Choose Your Deployment Method

### Option A: Manual Deployment (Recommended for Simplicity)
- Upload code to GitHub manually
- Upload build files to Cloudflare manually
- No API keys or automation needed

### Option B: Automated CI/CD (GitHub Actions)
- Automatically deploys on every push
- Requires API token configuration
- See Section 4 below

---

## Option A: Manual Step-by-Step Deployment

### Step 1: Upload Code to GitHub

1. **Create GitHub Repository**
   - Go to https://github.com/new
   - Repository name: `sahara-website`
   - Choose "Public" or "Private"
   - Click "Create repository"

2. **Push Your Code**
   ```bash
   # In your project folder
   git init
   git add .
   git commit -m "Initial commit"
   
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sahara-website.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Build the Project Locally

```bash
npm install
npm run build
```

This creates the `.next` (or `.output`) folder with your production files.

### Step 3: Upload to Cloudflare Pages

**Option 1: Via Cloudflare Dashboard**

1. Go to **Cloudflare Dashboard → Workers & Pages**
2. Click **Create application** → **Pages** → **Direct upload**
3. Drag and drop your `.next` folder (or upload the entire build output)
4. Set your project name: `sahara-website`
5. Click **Deploy**

**Option 2: Via Wrangler CLI**

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy your build folder
npx wrangler pages deploy .next --project-name=sahara-website
```

### Step 4: Connect Your Domain (Optional)

1. In Cloudflare Dashboard → Pages → your project → **Custom domains**
2. Add your domain (e.g., `saharaprinter.ae`)

---

## Option B: Automated CI/CD (GitHub Actions)

### Step 1: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | `cfat_YBYoMpnR13z5sJvlbQVxnFdtOWG9lcvz6rlpfllGbb139e6f` |
| `CLOUDFLARE_ACCOUNT_ID` | `034ddee1699595a19ee79f688de3b421` |

### Step 2: Update GitHub Workflow

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
          project-name: sahara-website
          directory: .next
          branch: main
```

### Step 3: Deploy

Push to main to trigger automatic deployment:
```bash
git push origin main
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Manual deploy | `npx wrangler pages deploy .next --project-name=sahara-website` |
| Test locally | `npm run dev` |
| Build locally | `npm run build` |