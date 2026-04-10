import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: number;
  sortOrder: number;
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
      banners: []
    });
  }

  try {
    const result = await db.prepare('SELECT * FROM banners WHERE isActive = 1 ORDER BY sortOrder ASC').all();
    return NextResponse.json({ banners: result });
  } catch (error) {
    console.error('Banners GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch banners',
      banners: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: Banner = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO banners (id, title, subtitle, ctaText, ctaLink, imageUrl, isActive, sortOrder, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.title || '',
      body.subtitle || '',
      body.ctaText || 'Learn More',
      body.ctaLink || '#',
      body.imageUrl || '',
      body.isActive ?? 1,
      body.sortOrder || 0,
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Banners POST Error:', error);
    return NextResponse.json({
      error: 'Failed to create banner',
      details: String(error)
    }, { status: 500 });
  }
}
