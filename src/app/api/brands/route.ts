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
  if (!db) return NextResponse.json({ error: 'Database not configured', brands: [] });

  try {
    const result = await db.prepare('SELECT * FROM brands WHERE is_active = 1 ORDER BY sort_order ASC').all();
    const mapped = (result?.results ?? []).map((b: any) => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      logoUrl: b.logo_url,
      description: b.description,
      isActive: b.is_active,
      sortOrder: b.sort_order,
      createdAt: b.created_at,
    }));
    return NextResponse.json({ brands: mapped });
  } catch (error) {
    console.error('Brands GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch brands', brands: [] }, { status: 200 });
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
      INSERT OR REPLACE INTO brands (id, name, slug, logo_url, description, is_active, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, body.name,
      body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      body.logoUrl || '', body.description || '',
      body.isActive ?? 1, body.sortOrder || 0
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Brands POST Error:', error);
    return NextResponse.json({ error: 'Failed to save brand', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Brand ID required' }, { status: 400 });
    await db.prepare('DELETE FROM brands WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete brand', details: String(error) }, { status: 500 });
  }
}
