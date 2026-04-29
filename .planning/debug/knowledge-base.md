# GSD Debug Knowledge Base

Resolved debug sessions. Used by `gsd-debugger` to surface known-pattern hypotheses at the start of new investigations.

---

## nextjs-webpack-call-error — TypeError: Cannot read properties of undefined (reading 'call') in webpack.js
- **Date:** 2024-04-29T00:00:00.000Z
- **Error patterns:** TypeError: Cannot read properties of undefined (reading 'call'), webpack.js, options.factory, react-server-dom-webpack-client.browser.development.js, readChunk, initializeModuleChunk
- **Root cause:** Runtime mismatch between layout (nodejs default) and API routes (edge) causing webpack client module loading issues in Next.js 15 development
- **Fix:** Added export const runtime = 'edge' to layout.tsx to match API routes
- **Files changed:** src/app/layout.tsx
---