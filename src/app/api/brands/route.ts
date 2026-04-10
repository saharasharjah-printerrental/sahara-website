import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  description: string;
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
      brands: []
    });
  }

  try {
    const result = await db.prepare('SELECT * FROM brands WHERE isActive = 1 ORDER BY sortOrder ASC').all();
    return NextResponse.json({ brands: result });
  } catch (error) {
    console.error('Brands GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch brands',
      brands: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: Brand = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO brands (id, name, slug, logoUrl, description, isActive, sortOrder, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.name,
      body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      body.logoUrl || '',
      body.description || '',
      body.isActive ?? 1,
      body.sortOrder || 0,
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Brands POST Error:', error);
    return NextResponse.json({
      error: 'Failed to create brand',
      details: String(error)
    }, { status: 500 });
  }
}
