import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { normalizeR2Url } from '@/lib/r2url';
import { resolveSupplyPrice, formatAED } from '@/lib/price';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured', supplies: [] });

  try {
    const sql = all
      ? 'SELECT * FROM supplies ORDER BY name ASC'
      : 'SELECT * FROM supplies WHERE isActive = 1 ORDER BY name ASC';
    const result = await db.prepare(sql).all();
    const supplies = (result?.results ?? []).map((s: any) => {
      const resolved = resolveSupplyPrice(s);
      return {
        ...s,
        image: normalizeR2Url(s.image),
        price: resolved.display,
        price_aed: resolved.aed,
        payable: resolved.payable,
      };
    });
    return NextResponse.json({ supplies }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    console.error('Supplies GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch supplies', supplies: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const body = await request.json() as any;
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    const priceOnRequest = body.priceOnRequest ?? true;
    const priceAed = priceOnRequest ? 0 : Number(body.priceAed) || 0;
    // Legacy free-text `price` column stays in sync so every existing
    // consumer (cart, checkout, order price re-validation) keeps working.
    const price = priceAed > 0 ? formatAED(priceAed) : 'Contact for Pricing';
    const slug = (body.slug || body.name || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Preserve an existing createdAt on update; only set it fresh for inserts.
    let createdAt = now;
    if (body.id) {
      const existing = await db.prepare('SELECT createdAt FROM supplies WHERE id = ?').bind(body.id).first();
      if (existing?.createdAt) createdAt = existing.createdAt as string;
    }

    await db.prepare(`
      INSERT OR REPLACE INTO supplies
        (id, name, brand, category, compatibleModels, color, yield, price, stock, image, alt_text, image_width, image_height, isActive, createdAt,
         price_aed, price_on_request, updatedAt, sku, mpn, gtin, condition, slug)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, body.name, body.brand || '', body.category || '',
      body.compatibleModels || '', body.color || '',
      body.yield || '', price,
      body.stock || 0, body.image || '',
      body.altText || '', body.imageWidth || 800, body.imageHeight || 800,
      body.isActive ?? 1, createdAt,
      priceAed, priceOnRequest ? 1 : 0, now,
      body.sku || id, body.mpn || '', body.gtin || '', body.condition || 'new', slug
    ).run();

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Supplies POST Error:', error);
    return NextResponse.json({ error: 'Failed to save supply', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Supply ID required' }, { status: 400 });
    await db.prepare('DELETE FROM supplies WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete supply', details: String(error) }, { status: 500 });
  }
}
