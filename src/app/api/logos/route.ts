import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Logo {
  id: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
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
      logos: []
    });
  }

  try {
    const result = await db.prepare('SELECT * FROM logos WHERE isActive = 1 ORDER BY sortOrder ASC').all();
    return NextResponse.json({ logos: result });
  } catch (error) {
    console.error('Logos GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch logos',
      logos: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: Logo = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    // Use INSERT OR REPLACE to handle both insert and update
    await db.prepare(`
      INSERT OR REPLACE INTO logos (id, name, imageUrl, imageAlt, link, isActive, sortOrder, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.name,
      body.imageUrl || '',
      body.imageAlt || '',
      body.link || '',
      body.isActive ?? 1,
      body.sortOrder || 0,
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Logos POST Error:', error);
    return NextResponse.json({
      error: 'Failed to save logo',
      details: String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Logo ID required' }, { status: 400 });
    }

    await db.prepare('DELETE FROM logos WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logos DELETE Error:', error);
    return NextResponse.json({
      error: 'Failed to delete logo',
      details: String(error)
    }, { status: 500 });
  }
}
