import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { SITE_URL } from '@/lib/siteUrl';
import { normalizeR2Url } from '@/lib/r2url';
import { resolveSupplyPrice } from '@/lib/price';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Google Merchant Center product feed (RSS 2.0 + g: namespace) for the
// toner/spare-parts catalog. Only rows that are actually payable online are
// eligible — an unpriced "Contact for Pricing" row or an out-of-stock item
// cannot be a valid merchant offer, so both are excluded rather than emitted
// with a placeholder price.
// Register this URL at https://merchants.google.com and link it to the GSC
// property once populated; see returns-refunds/page.tsx for the return
// policy every offer here points back to.

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function GET() {
  const db = getDB();
  const items: string[] = [];

  if (db) {
    try {
      const result = await db
        .prepare(
          "SELECT * FROM supplies WHERE isActive = 1 AND price_on_request = 0 AND price_aed > 0 AND stock > 0 ORDER BY name ASC"
        )
        .all();
      const rows = result?.results ?? [];

      for (const s of rows as any[]) {
        const resolved = resolveSupplyPrice(s);
        if (!resolved.payable || !s.slug) continue; // no landing page, no valid offer

        const link = `${SITE_URL}/services/printer-spare-parts/${s.slug}/`;
        const image = normalizeR2Url(s.image || '');
        const title = xmlEscape(s.name);
        const description = xmlEscape(
          `${s.name} — genuine ${s.brand} ${String(s.category).toLowerCase()}. Fits ${s.compatibleModels}. Rated yield: ${s.yield}.`
        );

        items.push(`
    <item>
      <g:id>${xmlEscape(s.sku || s.id)}</g:id>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      ${image ? `<g:image_link>${xmlEscape(image)}</g:image_link>` : ''}
      <g:availability>in stock</g:availability>
      <g:price>${resolved.aed.toFixed(2)} AED</g:price>
      <g:brand>${xmlEscape(s.brand || 'Sahara Office Equipments')}</g:brand>
      <g:condition>${xmlEscape(s.condition || 'new')}</g:condition>
      <g:google_product_category>Office Supplies &gt; Office Instruments &gt; Printer, Copier &amp; Fax Machine Accessories</g:google_product_category>
      <g:product_type>${xmlEscape(s.category || '')}</g:product_type>
      ${s.mpn ? `<g:mpn>${xmlEscape(s.mpn)}</g:mpn>` : `<g:identifier_exists>no</g:identifier_exists>`}
      ${s.gtin ? `<g:gtin>${xmlEscape(s.gtin)}</g:gtin>` : ''}
      <g:shipping>
        <g:country>AE</g:country>
        <g:price>0.00 AED</g:price>
      </g:shipping>
    </item>`);
      }
    } catch (error) {
      console.error('supplies.xml feed error:', error);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Sahara Office Equipments — Toner &amp; Spare Parts</title>
    <link>${SITE_URL}/services/printer-spare-parts/</link>
    <description>Genuine OEM toner, drums, maintenance kits, and spare parts for UAE offices.</description>${items.join('')}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
