# Build & Development Rules for SEO

## Pre-Build SEO Checklist

Before running `npm run build`, verify:

1. **Meta tags present** in `layout.tsx`:
   - `title` and `description` metadata
   - Open Graph tags (og:title, og:description, og:image)
   - Twitter Card tags
   - JSON-LD schema (Organization, LocalBusiness)

2. **Service pages have**:
   - AEO Answer Block in hero section
   - FAQPage schema
   - BreadcrumbList schema
   - Service schema with price range

3. **Images optimized**:
   - WebP format
   - Proper dimensions (1200x630 for OG)
   - Alt text on all images

4. **Local SEO elements**:
   - UAE-specific content (Dubai, Sharjah, Abu Dhabi)
   - Phone numbers with +971
   - Local address with GeoCoordinates

## Build Commands

```bash
# Dev with SEO debugging
npm run dev

# Production build (always verify before deploy)
npm run build

# Deploy to Cloudflare
npm run deploy

# Lint for accessibility (affects SEO)
npm run lint
```

## Common SEO Issues to Check

- **Missing meta description** - Every page needs unique description
- **Duplicate titles** - Each page must have unique title
- **Missing OG image** - Default to 1200x630
- **No H1** - Every page needs exactly one H1
- **JavaScript-only content** - AI crawlers can't read JS-rendered content
- **Missing canonical URL** - Prevents duplicate content issues

## Post-Build Verification

After build, check:
1. `/` - Homepage loads with FAQ schema
2. `/services/printer-rental` - Has AEO block + schema
3. `/services/repair` - Has HowTo schema
4. `/admin` - SEO dashboard working
