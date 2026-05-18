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

export async function GET() {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured', banners: [] }, { headers: CACHE_CONTROL });

  try {
    const result = await db.prepare('SELECT * FROM banners WHERE is_active = 1 ORDER BY sort_order ASC').all();
    const mapped = (result?.results ?? []).map((b: any) => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle,
      ctaText: b.cta_text,
      ctaLink: b.cta_link,
      imageUrl: b.image_url,
      position: b.position || 'hero',
      isActive: b.is_active,
      sortOrder: b.sort_order,
    }));
    return NextResponse.json({ banners: mapped }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Banners GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch banners', banners: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: CACHE_CONTROL });

  try {
    const body = await request.json() as any;
    const id = body.id || Date.now().toString();

    await db.prepare(`
      INSERT OR REPLACE INTO banners (id, title, subtitle, cta_text, cta_link, image_url, position, is_active, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, body.title || '', body.subtitle || '',
      body.ctaText || 'Learn More', body.ctaLink || '#',
      body.imageUrl || '', body.position || 'hero',
      body.isActive ?? 1, body.sortOrder || 0
    );

    return NextResponse.json({ success: true, id }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Banners POST Error:', error);
    return NextResponse.json({ error: 'Failed to save banner', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: CACHE_CONTROL });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Banner ID required' }, { status: 400 });
    await db.prepare('DELETE FROM banners WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true }, { headers: CACHE_CONTROL });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete banner', details: String(error) }, { status: 500 });
  }
}
