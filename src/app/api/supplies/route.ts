import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function GET() {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured', supplies: [] });

  try {
    const result = await db.prepare('SELECT * FROM supplies WHERE isActive = 1 ORDER BY name ASC').all();
    return NextResponse.json({ supplies: result?.results ?? [] });
  } catch (error) {
    console.error('Supplies GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch supplies', supplies: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const body = await request.json() as any;
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT OR REPLACE INTO supplies (id, name, brand, category, compatibleModels, color, yield, price, stock, image, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, body.name, body.brand || '', body.category || '',
      body.compatibleModels || '', body.color || '',
      body.yield || '', body.price || '',
      body.stock || 0, body.image || '',
      body.isActive ?? 1, now
    );

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
    await db.prepare('DELETE FROM supplies WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete supply', details: String(error) }, { status: 500 });
  }
}
