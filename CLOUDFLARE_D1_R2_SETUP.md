# Cloudflare D1 & R2 Setup Guide

This guide walks you through setting up your D1 database and R2 storage for the Sahara Printer Website.

---

## Step 1: Create D1 Database

### Option A: Via Cloudflare Dashboard

1. Go to **Cloudflare Dashboard → Workers & Pages**
2. Click **Create** → **Database** → **D1**
3. Configure:
   - **Name**: `sahara-printer-db`
   - **Region**: **EU** (or closest to your audience)
4. Click **Create**

### Option B: Via Wrangler CLI

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create database
wrangler d1 create sahara-printer-db --location=EU
```

**Copy the Database ID** shown after creation (e.g., `2c278d16-64fe-42a6-8ea1-aabdf75c2ce9`)

---

## Step 2: Create R2 Bucket

### Option A: Via Cloudflare Dashboard

1. Go to **Cloudflare Dashboard → R2**
2. Click **Create Bucket**
3. Configure:
   - **Name**: `sahara-printer-files`
   - **Location**: **EU**
4. Click **Create Bucket**

### Option B: Via Wrangler CLI

```bash
wrangler r2 bucket create sahara-printer-files
```

---

## Step 3: Get Your Account ID

1. Go to **Cloudflare Dashboard → Overview**
2. Copy the **Account ID** from the right sidebar (e.g., `034ddee1699595a19ee79f688de3b421`)

---

## Step 4: Create API Token

1. Go to **Cloudflare Dashboard → Profile → API Tokens**
2. Click **Create Custom Token**
3. Configure:
   - **Name**: `sahara-deploy`
   - **Permissions**:
     - Account: Workers R2 Storage Edit (for R2)
     - Account: D1 Edit (for D1)
     - Zone: Page Rules (if needed)
     - Zone: Workers Routes (if needed)
     - User: None
     - Resource: Account: `034ddee1699595a19ee79f688de3b421`
4. Click **Continue** → **Create Token**
5. **Copy the token** (shown once - save it!)

---

## Step 5: Create Database Tables

Run this command to create all needed tables:

```bash
wrangler d1 execute sahara-printer-db --remote --command="
-- Products table
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

-- Supplies (toner, etc.) table
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

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  logoUrl TEXT,
  description TEXT,
  isActive INTEGER DEFAULT 1,
  sortOrder INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  pageSlug TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sortOrder INTEGER DEFAULT 0,
  isActive INTEGER DEFAULT 1,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries table
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

-- Blog posts table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  author TEXT,
  category TEXT,
  isActive INTEGER DEFAULT 1,
  publishedAt TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Banners table
CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  ctaText TEXT,
  ctaLink TEXT,
  imageUrl TEXT,
  isActive INTEGER DEFAULT 1,
  sortOrder INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
"
```

---

## Step 6: Add GitHub Secrets

1. Go to **GitHub → Your Repo → Settings → Secrets and variables → Actions**
2. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `CLOUDFLARE_API_TOKEN` | Your API token from Step 4 |
| `CLOUDFLARE_ACCOUNT_ID` | Your Account ID from Step 3 |

---

## Step 7: Update wrangler.toml

Create `wrangler.toml` in project root:

```toml
name = "sahara-printer"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".next"

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "sahara-printer-db"
database_id = "YOUR_D1_DATABASE_ID"  # From Step 1

# R2 Storage
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "sahara-printer-files"

[vars]
NEXT_PUBLIC_API_URL = "/api"
```

Replace `YOUR_D1_DATABASE_ID` with your actual D1 ID.

---

## Step 8: Test Your Setup

```bash
# Test D1 connection
wrangler d1 execute sahara-printer-db --remote --command="SELECT * FROM products LIMIT 1"

# Deploy manually (optional)
npx wrangler pages deploy .next --project-name=sahara-website
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Create D1 | `wrangler d1 create sahara-printer-db` |
| Create R2 | `wrangler r2 bucket create sahara-printer-files` |
| Run SQL | `wrangler d1 execute sahara-printer-db --remote --command="SQL"` |
| List tables | `wrangler d1 execute sahara-printer-db --remote --command=".tables"` |
| Manual deploy | `npx wrangler pages deploy .next --project-name=sahara-website` |

---

## Your Configuration Summary

Fill this in for reference:

| Item | Value |
|------|-------|
| Account ID | _________________ |
| D1 Database ID | _________________ |
| D1 Database Name | sahara-printer-db |
| R2 Bucket Name | sahara-printer-files |
| API Token | _________________ |