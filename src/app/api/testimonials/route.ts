import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
  avatarAlt: string;
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
      testimonials: []
    });
  }

  try {
    const result = await db.prepare('SELECT * FROM testimonials WHERE isActive = 1 ORDER BY sortOrder ASC').all();
    return NextResponse.json({ testimonials: result });
  } catch (error) {
    console.error('Testimonials GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch testimonials',
      testimonials: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: Testimonial = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO testimonials (id, name, role, text, rating, avatarUrl, avatarAlt, isActive, sortOrder, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.name,
      body.role || '',
      body.text,
      body.rating || 5,
      body.avatarUrl || '',
      body.avatarAlt || '',
      body.isActive ?? 1,
      body.sortOrder || 0,
      now
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Testimonials POST Error:', error);
    return NextResponse.json({
      error: 'Failed to create testimonial',
      details: String(error)
    }, { status: 500 });
  }
}
