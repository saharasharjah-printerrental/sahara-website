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

const CACHE_CONTROL = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageSlug = searchParams.get('pageSlug');
  const all = searchParams.get('all') === 'true';
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', faqs: [] }, { headers: CACHE_CONTROL });
  }

  try {
    const activeFilter = all ? '' : ' AND isActive = 1';
    const sql = pageSlug
      ? `SELECT * FROM faqs WHERE pageSlug = ?${activeFilter} ORDER BY sortOrder ASC`
      : `SELECT * FROM faqs WHERE 1=1${activeFilter} ORDER BY sortOrder ASC`;
    const result = pageSlug
      ? await db.prepare(sql).bind(pageSlug).all()
      : await db.prepare(sql).all();
    return NextResponse.json({ faqs: result?.results ?? [] }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('FAQs GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs', faqs: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured', faqs: [] }, { status: 500, headers: CACHE_CONTROL });

  try {
    const body = await request.json() as any;
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT OR REPLACE INTO faqs (id, pageSlug, question, answer, sortOrder, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(id, body.pageSlug, body.question, body.answer, body.sortOrder || 0, body.isActive ?? 1, now).run();

    return NextResponse.json({ success: true, id }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('FAQs POST Error:', error);
    return NextResponse.json({ error: 'Failed to save FAQ', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured', faqs: [] }, { status: 500, headers: CACHE_CONTROL });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'FAQ ID required' }, { status: 400 });
    await db.prepare('DELETE FROM faqs WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true }, { headers: CACHE_CONTROL });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ', details: String(error) }, { status: 500 });
  }
}
