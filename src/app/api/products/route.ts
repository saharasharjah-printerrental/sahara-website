import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { z } from 'zod';

export const runtime = 'edge';

const productSchema = z.object({
  id: z.string().max(100).optional(),
  name: z.string().min(1).max(255),
  brand: z.string().max(100).optional(),
  category: z.string().max(100).optional(),
  condition: z.string().max(50).optional(),
  priceSale: z.string().max(50).optional(),
  priceRental: z.string().max(50).optional(),
  specs: z.string().max(5000).optional(),
  image: z.string().url().max(500).optional().or(z.literal('')),
  isActive: z.number().int().min(0).max(1).optional(),
  isFeatured: z.number().int().min(0).max(1).optional(),
});

type Product = z.infer<typeof productSchema>;

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
  const id = searchParams.get('id');

  const db = getDB();

  if (!db) {
    return NextResponse.json({
      error: 'Database not configured. Set D1 database in wrangler.toml',
      products: []
    });
  }

  try {
    if (id) {
      const result = await db.prepare('SELECT * FROM products WHERE id = ? AND isActive = 1').get(id);
      return NextResponse.json({ products: result ? [result] : [] });
    }

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
    const body = await request.json();
    const parsed = productSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors
      }, { status: 400 });
    }
    
    const data = parsed.data;
    const id = data.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO products (id, name, brand, category, condition, priceSale, priceRental, specs, image, isActive, isFeatured, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      data.name,
      data.brand || '',
      data.category || '',
      data.condition || 'New',
      data.priceSale || '',
      data.priceRental || '',
      data.specs || '',
      data.image || '',
      data.isActive ?? 1,
      data.isFeatured ?? 0,
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
