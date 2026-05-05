# Project Memory - Sahara Website

## Build & Dev Commands
- **Dev server**: `npm run dev` (Next.js 15, runs on localhost:3000)
- **Build**: `npm run build` (production build)
- **Node.js**: v20+ required
- **Clean build cache**: Delete `.next` folder if seeing stale React errors

## Technology Stack
- **Framework**: Next.js 15.4.11 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4.1
- **UI Library**: MUI (@mui/material v9.0.0, @mui/icons-material v9.0.0)
- **Animation**: Framer Motion 11.18.2
- **State Management**: Redux Toolkit 2.11.2 + React Redux 9.2.0
- **Email**: Nodemailer 8.0.7
- **Deployment**: Cloudflare Pages (wrangler 4.85.0)
- **React**: v19.2.5 (REQUIRED for Next.js 15)

## Critical Issue Fixes (Learned Patterns)

### Issue: React 19 + Next.js 15 Compatibility
**Error**: `Cannot read properties of undefined (reading 'call')` in Webpack runtime
**Root Cause**: Next.js 15 requires React 19, but package.json had `"react": "^18"`
**Fix**: Update to React 19 in package.json:
```json
{
  "dependencies": {
    "react": "^19",
    "react-dom": "^19"
  },
  "devDependencies": {
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```
Then clean install:
```bash
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Issue: JSX.Element TypeScript Error with React 19
**Error**: `Cannot find namespace 'JSX'` in TypeScript
**Root Cause**: React 19 types don't export `JSX` namespace
**Fix**: Replace `JSX.Element` with `React.ReactElement` in source files:
```typescript
// WRONG (React 18 style)
const icons: Record<string, JSX.Element> = { ... }

// CORRECT (React 19 style)
const icons: Record<string, React.ReactElement> = { ... }
```
**Files fixed**: `src/app/contact/page.tsx`, `src/components/Footer.tsx`

### Issue: tsconfig.json for React 19
**Error**: `<LayersIcon /> is using incorrect casing`
**Root Cause**: Stale `.next` build cache after dependency changes
**Fix**: Delete `.next` folder and rebuild
```bash
Remove-Item -Recurse -Force .next
npm run dev  # or npm run build
```
**MUI v9 Icons**: Imports use PascalCase without "Icon" suffix
```typescript
// Correct
import { Layers, People, Favorite, Computer } from "@mui/icons-material";

// Wrong (causes errors)
import { LayersIcon, PeopleIcon } from "@mui/icons-material";
```

### Issue: Dynamic Icon Rendering in StatsClay
**File**: `src/components/StatsClay.tsx`
**Pattern**: Icons passed as props, rendered dynamically
```typescript
const Icon = stat.icon;
<Icon sx={{ fontSize: 24 }} style={{ color: accentColor }} />
```
This pattern works correctly with MUI v9 icons.

## Project Structure
- **Source**: `/src` directory
- **Components**: `/src/components/*.tsx`
- **Pages**: `/src/app/**/page.tsx` (Next.js App Router)
- **Config**: `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`
- **Path Alias**: `@/*` maps to `/src/*`

## Common Errors & Solutions
1. **Stale React errors**: Delete `.next` folder
2. **MUI icon errors**: Verify v9 export names (no "Icon" suffix)
3. **Build fails**: Run `npm install` first, check Node.js version

## Environment Notes
- No `.env` file visible in config
- Uses Cloudflare Pages for deployment
- Static export compatible (wrangler)
