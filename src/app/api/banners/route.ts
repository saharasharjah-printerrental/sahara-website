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
  if (!db) return NextResponse.json({ error: 'Database not configured', banners: [] });

  try {
    const result = await db.prepare('SELECT * FROM banners ORDER BY sortOrder ASC').all();
    return NextResponse.json({ banners: result?.results ?? [] });
  } catch (error) {
    console.error('Banners GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch banners', banners: [] }, { status: 500 });
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
      INSERT OR REPLACE INTO banners (id, title, subtitle, ctaText, ctaLink, imageUrl, isActive, sortOrder, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, body.title || '', body.subtitle || '',
      body.ctaText || 'Learn More', body.ctaLink || '#',
      body.imageUrl || '', body.isActive ?? 1, body.sortOrder || 0, now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Banners POST Error:', error);
    return NextResponse.json({ error: 'Failed to save banner', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Banner ID required' }, { status: 400 });
    await db.prepare('DELETE FROM banners WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner', details: String(error) }, { status: 500 });
  }
}
