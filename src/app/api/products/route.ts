import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { normalizeR2Url } from '@/lib/r2url';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

const CACHE_CONTROL = { 'Cache-Control': 'no-store, max-age=0' };

function makeSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function parsePrice(str: string): number {
  if (!str) return 0;
  const num = parseFloat(String(str).replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
}

function formatPrice(num: number, suffix = ''): string {
  if (!num) return 'Contact for Pricing';
  return `AED ${num.toLocaleString()}${suffix}`;
}

function dbRowToProduct(p: any) {
  let image = '';
  try {
    const urls = JSON.parse(p.image_urls || '[]');
    image = Array.isArray(urls) ? (urls[0] || '') : (p.image_urls || '');
  } catch {
    image = p.image_urls || '';
  }

  let specs = '';
  try {
    const specObj = JSON.parse(p.specifications || '[]');
    if (Array.isArray(specObj)) {
      specs = specObj.join('|');
    } else if (typeof specObj === 'object') {
      specs = Object.values(specObj).join('|');
    } else {
      specs = String(p.specifications || '');
    }
  } catch {
    specs = String(p.specifications || '');
  }

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    subcategory: p.subcategory,
    condition: p.condition || 'New',
    priceSale: p.price_sale ? formatPrice(p.price_sale) : (p.price_sale === 0 ? 'Contact for Pricing' : 'Contact for Pricing'),
    priceRental: p.price_rental ? formatPrice(p.price_rental, '/mo') : 'Contact for Pricing',
    specs,
    image: normalizeR2Url(image),
    isActive: p.is_active,
    isFeatured: p.is_featured,
    description: p.description,
    metaTitle: p.meta_title,
    metaDescription: p.meta_description,
    sortOrder: p.sort_order,
    createdAt: p.created_at,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const id = searchParams.get('id');
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', products: [] }, { headers: CACHE_CONTROL });
  }

  try {
    if (id) {
      const result = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();
      return NextResponse.json({ products: result ? [dbRowToProduct(result)] : [] }, { headers: CACHE_CONTROL });
    }
    let sql = 'SELECT * FROM products WHERE is_active = 1';
    if (featured === 'true') sql += ' AND is_featured = 1';
    sql += ' ORDER BY created_at DESC';
    const result = await db.prepare(sql).all();
    return NextResponse.json({ products: (result?.results ?? []).map(dbRowToProduct) }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Products GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products', products: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const body = await request.json() as any;
    const id = body.id || Date.now().toString();
    const slug = body.slug || makeSlug(body.name || id);

    const specsRaw = body.specs || '';
    const specsArr = typeof specsRaw === 'string'
      ? specsRaw.split('|').map((s: string) => s.trim()).filter(Boolean)
      : (Array.isArray(specsRaw) ? specsRaw : []);
    const specifications = JSON.stringify(specsArr);

    const imageUrl = body.image || '';
    const imageUrls = JSON.stringify(imageUrl ? [imageUrl] : []);

    await db.prepare(`
      INSERT OR REPLACE INTO products
        (id, slug, name, brand, category, condition, price_sale, price_rental, specifications, image_urls, is_active, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id, slug, body.name, body.brand || '', body.category || '',
      body.condition || 'New',
      parsePrice(body.priceSale), parsePrice(body.priceRental),
      specifications, imageUrls,
      body.isActive ?? 1, body.isFeatured ?? 0
    ).run();

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Products POST Error:', error);
    return NextResponse.json({ error: 'Failed to save product', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product', details: String(error) }, { status: 500 });
  }
}
