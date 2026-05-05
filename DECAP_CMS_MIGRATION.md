# Decap CMS + R2 Hybrid Migration Plan

## Objective
Migrate Sahara website from localStorage CMS → Decap CMS with R2 storage, migrating ALL 9 content types.

## Architecture
- **Content**: Decap CMS → Markdown files in repo (Git)
- **Images/Assets**: Cloudflare R2 (S3-compatible API)
- **Deployment**: Single Cloudflare Pages

---

## COPY DIRECTION
Source: `C:\Users\SAHARA\Downloads\sahara-website-main\sahara-website-main`
Target: `C:\Users\SAHARA\Downloads\stitch_sahara_printer_website\sahara-website`

---

## COPY COMPLETED CHECKLIST
- [x] Source code copied to target
- [x] Migration plan MD created
- [x] Decap CMS config created (public/admin/config.yml)
- [x] Decap CMS HTML created (public/admin/index.html)
- [x] Content folders created (9 types)
- [x] Products migrated (5 JSON files)
- [x] Brands migrated (7 JSON files)
- [x] FAQs migrated (3 JSON files)
- [x] Banners migrated (2 JSON files)
- [x] Testimonials migrated (2 JSON files)
- [x] Client logos migrated (1 JSON file)
- [x] Blogs migrated (2 Markdown files)
- [x] API integration completed (decapApi.ts)
- [ ] GitHub Desktop push pending

---

## Current State
- CMS: Custom admin panel + localStorage
- Content: 9 types
- R2: Configured but unused

---

## Phase 1: R2 + Decap Environment (2 hrs)

### 1.1 Get R2 Credentials
- Access Cloudflare Dashboard → R2 → API Token
- Required: S3-compatible credentials

### 1.2 Update wrangler.toml
```toml
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "sahara-assets"
```

### 1.3 Environment Variables (.env.local)
```
R2_ACCESS_KEY_ID=your-key
R2_SECRET_ACCESS_KEY=your-secret
R2_BUCKET_NAME=sahara-assets
R2_PUBLIC_URL=https://pub-your-bucket.r2.dev
```

### 1.4 Create Decap CMS Entry
File: `public/admin/index.html` (standard Decap CDN)

---

## Phase 2: Content Collections (9 types)

Create `public/admin/config.yml` with collections for:
- products (JSON)
- brands (JSON)
- supplies (JSON)
- faqs (JSON)
- blogs (Markdown)
- banners (JSON)
- testimonials (JSON)
- logos (JSON)
- inquiries (JSON)

---

## Phase 3: API Integration (2 hrs)

### 3.1 Create R2 Client
File: `src/lib/r2.ts`

### 3.2 Update API Client
File: `src/lib/api.ts`
- Import content from `content/*.json` (built with page build)
- Upload new images to R2 via API route

---

## Phase 4: Content Migration (2 hrs)

Export current data → JSON/MD files:
- `content/products/*.json` (11 products)
- `content/brands/*.json` (7 brands)
- `content/supplies/*.json`
- `content/faqs/*.json`  
- `content/blogs/*.md` (11 posts)
- `content/banners/*.json`
- `content/testimonials/*.json`
- `content/logos/*.json`
- `content/inquiries/*.json`

---

## Phase 5: Cleanup (1 hr)

- Remove `src/app/admin/` (Decap replaces it)
- Remove `src/lib/blogContent.ts` (content moved to `content/blogs/`)
- Keep R2 config in wrangler.toml (active)

---

## File Changes Summary

```
CREATE:
  public/admin/index.html
  public/admin/config.yml
  content/products/*.json
  content/brands/*.json
  content/supplies/*.json
  content/faqs/*.json  
  content/blogs/*.md
  content/banners/*.json
  content/testimonials/*.json
  content/logos/*.json
  content/inquiries/*.json
  src/lib/r2.ts
  
MODIFY:
  src/lib/api.ts
  wrangler.toml
  .env.local

DELETE:
  src/app/admin/
  src/lib/blogContent.ts
```

---

## GitHub Push (After Cleanup)

1. Open GitHub Desktop
2. Select `C:\Users\SAHARA\Downloads\stitch_sahara_printer_website\sahara-website`
3. Commit with message: "Add Decap CMS + R2 migration plan"
4. Push to existing repository

---

## Estimated Timeline
- Copy + Push: 30 min
- Phase 1-2: 4 hrs
- Phase 3: 2 hrs  
- Phase 4: 2 hrs
- Phase 5: 1 hr

**Total: ~9 hrs**