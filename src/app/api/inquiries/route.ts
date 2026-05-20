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

const HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET(request: NextRequest) {
  const db = getDB();
  if (!db) {
    return NextResponse.json({ error: 'Database not configured', inquiries: [] }, { headers: HEADERS });
  }
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const status = searchParams.get('status');
    let sql = 'SELECT * FROM inquiries';
    const binds: any[] = [];
    if (status) {
      sql += ' WHERE status = ?';
      binds.push(status);
    }
    sql += ' ORDER BY createdAt DESC LIMIT ?';
    binds.push(limit);
    const result = await db.prepare(sql).bind(...binds).all();
    return NextResponse.json({ inquiries: result?.results ?? [] }, { headers: HEADERS });
  } catch (error) {
    console.error('[/api/inquiries] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries', inquiries: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: HEADERS });
  }
  try {
    const body = await request.json() as any;
    const id = body.id || `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    await db.prepare(`
      INSERT OR REPLACE INTO inquiries (id, name, email, phone, company, service, message, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?)
    `).bind(
      id,
      body.name || '',
      body.email || '',
      body.phone || '',
      body.company || '',
      body.service || '',
      body.message || '',
      now,
    ).run();
    return NextResponse.json({ success: true, id }, { headers: HEADERS });
  } catch (error) {
    console.error('[/api/inquiries] POST Error:', error);
    return NextResponse.json({ error: 'Failed to save inquiry', details: String(error) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const db = getDB();
  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: HEADERS });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Inquiry ID required' }, { status: 400 });
    const body = await request.json() as any;
    const status = body.status;
    if (!status) return NextResponse.json({ error: 'Status required' }, { status: 400 });
    await db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').bind(status, id).run();
    return NextResponse.json({ success: true }, { headers: HEADERS });
  } catch (error) {
    console.error('[/api/inquiries] PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update inquiry', details: String(error) }, { status: 500 });
  }
}
