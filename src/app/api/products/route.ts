import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  condition: string;
  priceSale: string;
  priceRental: string;
  specs: string;
  image: string;
  isActive: number;
  isFeatured: number;
  createdAt: string;
}

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');

  const db = getDB();

  if (!db) {
    return NextResponse.json({
      error: 'Database not configured. Set D1 database in wrangler.toml',
      products: []
    });
  }

  try {
    let sql = 'SELECT * FROM products WHERE isActive = 1';
    if (featured === 'true') {
      sql += ' AND isFeatured = 1';
    }
    sql += ' ORDER BY createdAt DESC';

    const result = await db.prepare(sql).all();
    return NextResponse.json({ products: result });
  } catch (error) {
    console.error('Products GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch products',
      products: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: Product = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO products (id, name, brand, category, condition, priceSale, priceRental, specs, image, isActive, isFeatured, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.name,
      body.brand || '',
      body.category || '',
      body.condition || 'New',
      body.priceSale || '',
      body.priceRental || '',
      body.specs || '',
      body.image || '',
      body.isActive ?? 1,
      body.isFeatured ?? 0,
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Products POST Error:', error);
    return NextResponse.json({
      error: 'Failed to create product',
      details: String(error)
    }, { status: 500 });
  }
}
