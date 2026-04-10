import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface FAQ {
  id: string;
  pageSlug: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: number;
}

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageSlug = searchParams.get('pageSlug');

  const db = getDB();

  if (!db) {
    return NextResponse.json({
      error: 'Database not configured',
      faqs: []
    });
  }

  try {
    let sql = 'SELECT * FROM faqs WHERE isActive = 1';
    const params: string[] = [];

    if (pageSlug) {
      sql += ' AND pageSlug = ?';
      params.push(pageSlug);
    }

    sql += ' ORDER BY sortOrder ASC';

    const result = await db.prepare(sql).all(...params);
    return NextResponse.json({ faqs: result });
  } catch (error) {
    console.error('FAQs GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch FAQs',
      faqs: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: FAQ = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO faqs (id, pageSlug, question, answer, sortOrder, isActive, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.pageSlug,
      body.question,
      body.answer,
      body.sortOrder || 0,
      body.isActive ?? 1,
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('FAQs POST Error:', error);
    return NextResponse.json({
      error: 'Failed to create FAQ',
      details: String(error)
    }, { status: 500 });
  }
}
