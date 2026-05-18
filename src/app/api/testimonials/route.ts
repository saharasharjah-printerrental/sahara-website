import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

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

// Prevent edge caching - always fetch fresh data
export async function GET() {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured', testimonials: [] }, {
    headers: CACHE_CONTROL
  });

  try {
    const result = await db.prepare(
      'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC'
    ).all();
    return NextResponse.json({ testimonials: result?.results ?? [] }, {
      headers: CACHE_CONTROL
    });
  } catch (error) {
    console.error('Testimonials GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials', testimonials: [] }, { status: 200 });
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
      INSERT OR REPLACE INTO testimonials (id, name, role, company, text, rating, image_url, is_active, sort_order, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      body.name,
      body.role || '',
      body.company || '',
      body.text,
      body.rating || 5,
      body.image_url || body.avatarUrl || '',
      body.is_active ?? body.isActive ?? 1,
      body.sort_order ?? body.sortOrder ?? 0,
      now, now
    ).run();

    return NextResponse.json({ success: true, id }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Testimonials POST Error:', error);
    return NextResponse.json({ error: 'Failed to save testimonial', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });
    await db.prepare('DELETE FROM testimonials WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true }, { headers: CACHE_CONTROL });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial', details: String(error) }, { status: 500 });
  }
}
