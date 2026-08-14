export const runtime = 'edge';

// Metadata lives entirely in page.tsx — this file previously duplicated it
// with a stale "Sole Authorized Dealer / exclusive distributor" claim and an
// OG image that doesn't exist in public/, which Next merged with page.tsx
// winning on conflicts (so the stale copy was invisible but not harmless:
// crawlers that read layout-level metadata directly would still see it).
export default function BravoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
