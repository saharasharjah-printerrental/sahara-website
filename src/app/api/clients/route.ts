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

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', clients: [] });
  }

  try {
    const result = await db.prepare('SELECT * FROM clients ORDER BY sortOrder ASC').all();
    return NextResponse.json({ clients: result?.results ?? [] });
  } catch (error) {
    console.error('Clients GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch clients', clients: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', clients: [] }, { status: 200 });
  }

  try {
    const body = await request.json() as any;
    const id = body.id || Date.now().toString();

    await db.prepare(`
      INSERT OR REPLACE INTO clients (id, name, logoUrl, website, isActive, sortOrder)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.name,
      body.logoUrl || '',
      body.website || '',
      body.isActive ?? 1,
      body.sortOrder || 0
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Clients POST Error:', error);
    return NextResponse.json({ error: 'Failed to save client', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', clients: [] }, { status: 200 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids');
    const id = searchParams.get('id');

    if (ids) {
      // Bulk delete: ?ids=a,b,c
      const idList = ids.split(',').map(s => s.trim()).filter(Boolean);
      if (idList.length === 0) return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
      await db.batch(idList.map(i => db.prepare('DELETE FROM clients WHERE id = ?').bind(i)));
      return NextResponse.json({ success: true, deleted: idList.length });
    }

    if (!id) return NextResponse.json({ error: 'Client ID required' }, { status: 400 });
    await db.prepare('DELETE FROM clients WHERE id = ?').bind(id).run();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Clients DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete client', details: String(error) }, { status: 500 });
  }
}
