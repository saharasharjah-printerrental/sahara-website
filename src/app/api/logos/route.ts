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

export async function GET() {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', logos: [] }, { status: 200, headers: CACHE_CONTROL });
  }

  try {
    const result = await db.prepare(
      'SELECT id, name, imageUrl, imageAlt, link, COALESCE(isActive,1) AS isActive, COALESCE(sortOrder,0) AS sortOrder FROM logos ORDER BY sortOrder ASC'
    ).all();
    const logos = (result?.results ?? []).map((l: any) => ({ ...l, imageUrl: normalizeR2Url(l.imageUrl) }));
    return NextResponse.json({ logos }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Logos GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch logos', logos: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', logos: [] }, { status: 200, headers: CACHE_CONTROL });
  }

  try {
    const body = await request.json() as any;
    if (!body.name) {
      return NextResponse.json({ error: 'Logo name is required' }, { status: 400 });
    }
    const id = body.id || Date.now().toString();

    await db.prepare(`
      INSERT OR REPLACE INTO logos (id, name, imageUrl, imageAlt, link, isActive, sortOrder)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      body.name,
      body.imageUrl || '',
      body.imageAlt || '',
      body.link || '',
      body.isActive ?? 1,
      body.sortOrder || 0
    ).run();

    return NextResponse.json({ success: true, id }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Logos POST Error:', error);
    return NextResponse.json({ error: 'Failed to save logo', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 200, headers: CACHE_CONTROL });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Logo ID required' }, { status: 400 });
    await db.prepare('DELETE FROM logos WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Logos DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete logo', details: String(error) }, { status: 500 });
  }
}
