# Cloudflare D1 & R2 Data Guide - Sahara Printer Website

This guide explains which data goes where and how to connect everything after GitHub deployment.

---

## Understanding Your Data

### Data That Goes to D1 (Database)
All structured content from admin panel:

| Table | Contains | How to Populate |
|-------|----------|-----------------|
| **products** | Printer products with specs, prices | Add via Admin → Products |
| **supplies** | Toner, ink, parts | Add via Admin → Supplies |
| **brands** | Brand names, logos, descriptions | Add via Admin → Brands |
| **faqs** | FAQ questions & answers | Add via Admin → FAQs |
| **inquiries** | Contact form submissions | Auto-captured |
| **blogs** | Blog posts | Add via Admin → Blog |
| **settings** | Site settings | Add via Admin → Settings |
| **banners** | Homepage banners | Add via Admin → Banners |

### Data That Goes to R2 (Storage)
All uploaded files:

| Type | Examples |
|------|----------|
| **Product images** | Printer photos |
| **Brand logos** | HP, Canon, Xerox logos |
| **Blog cover images** | Featured images |
| **Banner images** | Homepage slider images |
| **Supplies images** | Toner/ink product photos |

---

## Important: Current Setup Status

**Your current website uses localStorage** (browser database), NOT Cloudflare D1. This means:
- Data saves to user's browser only
- No real database connection exists yet
- Works fine for demo, but not for production

**To use D1 + R2**, you need to update the code to make API calls instead of using localStorage.

---

## Option 1: Keep Using localStorage (Easiest)

If you just want the site working without D1/R2:

1. **Deploy via GitHub** (you know this already)
2. **Done!** - localStorage works automatically

**Downside**: Each visitor sees only their own data - no shared database.

---

## Option 2: Connect D1 Database (For Shared Data)

### Step 1: Update Code to Use D1

Create API routes in `src/app/api/` to read/write to D1. Here's an example for products:

**File: src/app/api/products/route.ts**
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Get D1 database binding
  const db = process.env.DB;
  
  if (!db) {
    // Fallback to localStorage if no D1
    return NextResponse.json({ 
      error: 'D1 not configured. Add DB in wrangler.toml' 
    });
  }
  
  // Query D1 database
  const results = await db.prepare('SELECT * FROM products WHERE isActive = 1').all();
  return NextResponse.json(results);
}
```

### Step 2: Configure wrangler.toml

```toml
name = "sahara-printer"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".next"

[[d1_databases]]
binding = "DB"
database_name = "sahara-printer-db"
database_id = "YOUR_D1_ID_HERE"

[vars]
NEXT_PUBLIC_API_URL = "/api"
```

### Step 3: Add Data to D1

```bash
# Example: Add a product
wrangler d1 execute sahara-printer-db --remote --command="
INSERT INTO products (id, name, brand, category, priceSale, priceRental, isActive)
VALUES ('1', 'HP LaserJet Pro', 'HP', 'Laser Printer', '2500', '150', 1);
"
```

---

## Option 3: Connect R2 Storage (For Images)

### Step 1: Update Image Upload Code

Change image upload to save to R2 instead of base64:

```typescript
// Example R2 upload function
async function uploadToR2(file: File, folder: string) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  
  return response.json(); // Returns R2 URL
}
```

### Step 2: Configure R2 in wrangler.toml

```toml
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "sahara-printer-files"
```

### Step 3: Add CORS to R2 Bucket

In Cloudflare Dashboard → R2 → Your Bucket → Settings → CORS Policy:

```json
[
  {
    "AllowedOrigins": ["https://sahara-website.pages.dev"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"]
  }
]
```

---

## Quick Setup: Add Sample Data via SQL

### Insert Brands
```sql
INSERT INTO brands (id, name, slug, logoUrl, description, isActive, sortOrder) VALUES
('1', 'HP', 'hp', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/HP_logo.svg', 'HP printers and MFPs', 1, 1),
('2', 'Canon', 'canon', 'https://upload.wikimedia.org/wikipedia/commons/2/28/Canon_logo.svg', 'Canon imageRUNNER series', 1, 2),
('3', 'Xerox', 'xerox', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Xerox_logo.svg', 'Xerox AltaLink and VersaLink', 1, 3);
```

### Insert Products
```sql
INSERT INTO products (id, name, brand, category, condition, priceSale, priceRental, specs, isActive) VALUES
('1', 'HP LaserJet Pro MFP', 'HP', 'Laser Printer', 'New', '2500', '150', 'Print, Copy, Scan | 40ppm | Duplex', 1),
('2', 'Canon imageRUNNER 2520', 'Canon', 'Multifunction', 'Refurbished', '4500', '350', '20ppm | Copy/Print/Scan | A3', 1);
```

### Insert FAQs
```sql
INSERT INTO faqs (id, pageSlug, question, answer, sortOrder, isActive) VALUES
('1', 'printer-rental', 'Do you offer zero deposit rental?', 'Yes! We offer zero deposit rental options for all UAE clients.', 1, 1),
('2', 'printer-rental', 'What is your response time?', 'We provide 4-6 hour emergency response across UAE.', 2, 1);
```

---

## After Deploying via GitHub

### Step 1: Set Environment Variables in Cloudflare

Go to **Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `/api` |

### Step 2: Add GitHub Secrets (for D1/R2 access)

In **GitHub Repo → Settings → Secrets and Variables → Actions**:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | Your API token |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID |

### Step 3: Verify wrangler.toml is in GitHub

Make sure `wrangler.toml` is pushed to your repo (root folder).

---

## Summary: What You Need

| Component | What to Do |
|-----------|------------|
| **D1 Database** | Run SQL to create tables, then add data manually or via admin |
| **R2 Storage** | Configure CORS, update code to use R2 URLs |
| **Connect** | Add `wrangler.toml` with D1/R2 bindings, set environment variables |

---

## Need the Full API Code?

If you want me to create the actual API routes to connect to D1 (so admin panel saves to database instead of localStorage), let me know and I'll create:
1. `/api/products` - CRUD for products
2. `/api/supplies` - CRUD for supplies  
3. `/api/brands` - CRUD for brands
4. `/api/upload` - File upload to R2