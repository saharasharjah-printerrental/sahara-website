# Cloudflare R2 CORS Setup Guide

This guide walks you through setting up CORS (Cross-Origin Resource Sharing) for your R2 bucket so that your website can upload and display images.

---

## What is CORS?

CORS is a security feature that controls which websites can access your R2 bucket to:
- **Upload files** (like product images, brand logos)
- **Display images** on your website

Without proper CORS settings, your website won't be able to load images from R2.

---

## Step 1: Go to R2 Bucket Settings

1. **Log in** to Cloudflare Dashboard
2. Go to **R2** (from the left sidebar)
3. Click on your bucket: **`sahara-printer-files`**
4. Click on the **Settings** tab

---

## Step 2: Add CORS Policy

In the CORS policy section, click **Add Rule** and enter:

### Option A: For All Origins (Development/Demo)

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
]
```

**Note:** This allows any website to access your files. Okay for testing, but not recommended for production.

---

### Option B: For Specific Domains (Recommended for Production)

Replace `your-domain.pages.dev` with your actual Cloudflare Pages domain:

```json
[
  {
    "AllowedOrigins": [
      "https://sahara-website.pages.dev",
      "https://saharaprinter.ae"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
]
```

**For local development:**
```json
[
  {
    "AllowedOrigins": [
      "http://localhost:3000",
      "https://sahara-website.pages.dev"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
]
```

---

## Step 3: Save CORS Policy

1. Click **Save**
2. Your CORS policy is now active

---

## How to Test CORS

### Test via cURL (Command Line)

```bash
# Test GET request (should return CORS headers)
curl -I -s https://sahara-printer-files.YOUR_ACCOUNT_ID.r2.cloudflarestorage.com/test-image.jpg \
  -H "Origin: https://sahara-website.pages.dev"

# Check for these headers in response:
# Access-Control-Allow-Origin: https://sahara-website.pages.dev
# Access-Control-Allow-Methods: GET, PUT, POST, DELETE
```

### Test via Browser

1. Open your website in browser
2. Right-click → Inspect → Console tab
3. Look for any CORS errors

---

## Troubleshooting CORS Issues

### Error: "Access to image has been blocked by CORS policy"

**Cause:** Your domain is not in the AllowedOrigins list.

**Fix:** Add your domain to the CORS policy:
```json
{
  "AllowedOrigins": ["https://your-actual-domain.pages.dev"]
}
```

### Error: "No 'Access-Control-Allow-Origin' header"

**Cause:** CORS policy not saved or not applied.

**Fix:** 
1. Go back to R2 bucket settings
2. Verify CORS policy is saved
3. Wait 30 seconds for changes to propagate

### Images not displaying after deployment

**Cause:** Using `localhost` in development, but production domain not configured.

**Fix:** Update CORS to include both:
```json
{
  "AllowedOrigins": [
    "http://localhost:3000",
    "https://sahara-website.pages.dev"
  ]
}
```

---

## Quick Reference

| Your Domain | Add to AllowedOrigins |
|-------------|------------------------|
| Production | `https://sahara-website.pages.dev` |
| Custom Domain | `https://saharaprinter.ae` |
| Local Dev | `http://localhost:3000` |

---

## Important Notes

1. **R2 is S3-compatible** - you can also manage CORS via AWS CLI if preferred
2. **Changes take ~30 seconds** to propagate after saving
3. **Keep origins updated** when you change your domain or add new environments

---

## Need Help?

If you're still having issues:
1. Check the Cloudflare R2 documentation
2. Verify your bucket name matches in `wrangler.toml`
3. Make sure your domain in CORS matches exactly (including https://)