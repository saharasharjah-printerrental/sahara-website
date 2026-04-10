import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Supply {
  id: string;
  name: string;
  brand: string;
  category: string;
  compatibleModels: string;
  color: string;
  yield: string;
  price: string;
  stock: number;
  image: string;
  isActive: number;
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

  if (!db) {
    return NextResponse.json({
      error: 'Database not configured',
      supplies: []
    });
  }

  try {
    const result = await db.prepare('SELECT * FROM supplies WHERE isActive = 1 ORDER BY name ASC').all();
    return NextResponse.json({ supplies: result });
  } catch (error) {
    console.error('Supplies GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch supplies',
      supplies: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: Supply = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO supplies (id, name, brand, category, compatibleModels, color, yield, price, stock, image, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.name,
      body.brand || '',
      body.category || '',
      body.compatibleModels || '',
      body.color || '',
      body.yield || '',
      body.price || '',
      body.stock || 0,
      body.image || '',
      body.isActive ?? 1,
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Supplies POST Error:', error);
    return NextResponse.json({
      error: 'Failed to create supply',
      details: String(error)
    }, { status: 500 });
  }
}
