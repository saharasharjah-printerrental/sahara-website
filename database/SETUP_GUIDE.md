# Sahara Printer Website - Cloudflare Setup Complete Guide

Follow these steps in order to set up your website with D1 database and R2 storage.

---

## Prerequisites

- GitHub repository connected to Cloudflare Pages
- Cloudflare account with D1 database created
- Cloudflare account with R2 bucket created

---

## Step 1: Deploy Code to GitHub

```bash
git add .
git commit -m "Add D1/R2 API support and database schema"
git push origin main
```

This will trigger deployment to Cloudflare Pages.

---

## Step 2: Set Up D1 Database

### Option A: Via Cloudflare Dashboard

1. Go to **Cloudflare Dashboard → D1**
2. Click on your database: **`sahara-printer-db`**
3. Go to **SQL Editor**
4. Copy contents of `database/schema.sql`
5. Paste and run in the SQL editor

### Option B: Via Wrangler CLI

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Run the schema
wrangler d1 execute sahara-printer-db --remote --file=./database/schema.sql
```

---

## Step 3: Set Up R2 CORS

Follow the instructions in `database/R2_CORS_SETUP.md`:

1. Go to **Cloudflare Dashboard → R2 → sahara-printer-files → Settings**
2. Find **CORS Policy** section
3. Add your domains:

```json
[
  {
    "AllowedOrigins": [
      "https://your-project.pages.dev",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
]
```

4. Click **Save**

---

## Step 4: Configure GitHub Secrets

In **GitHub Repo → Settings → Secrets and Variables → Actions**:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Your API token |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID |

---

## Step 5: Verify Environment Variables

In **Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `/api` |

---

## Step 6: Test the Setup

1. **Visit your deployed site**
2. **Go to admin panel**: `/admin`
3. **Check if data loads** from database instead of localStorage
4. **Try adding a product** - it should save to D1

---

## Troubleshooting

### "Database not configured" error

- Verify D1 database is created and schema is applied
- Check that `wrangler.toml` has correct database_id

### "R2 storage not configured" error

- Verify R2 bucket exists
- Check CORS settings are applied

### Images not loading

- Check R2 CORS policy includes your domain
- Verify bucket name matches in wrangler.toml

---

## File Summary

| File | Purpose |
|------|---------|
| `database/schema.sql` | All D1 table definitions + seed data |
| `database/R2_CORS_SETUP.md` | Step-by-step R2 CORS configuration |
| `wrangler.toml` | D1 & R2 bindings configuration |
| `src/app/api/*` | API routes for database operations |

---

## Quick Commands Reference

```bash
# Apply database schema
wrangler d1 execute sahara-printer-db --remote --file=./database/schema.sql

# View database contents
wrangler d1 execute sahara-printer-db --remote --command="SELECT * FROM products"

# Manual deploy (if needed)
npx wrangler pages deploy .next --project-name=sahara-website
```