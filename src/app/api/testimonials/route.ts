import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { z } from 'zod';

export const runtime = 'edge';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image_url: string;
  is_active: number;
  sort_order: number;
}

const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  role: z.string().default(''),
  company: z.string().default(''),
  text: z.string().min(1, 'Review text is required').max(500, 'Review text must be 500 characters or less'),
  rating: z.number().min(1).max(5).default(5),
  image_url: z.string().default(''),
  is_active: z.number().default(1),
  sort_order: z.number().default(0),
});

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

async function ensureTableExists(db: any) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id          TEXT    PRIMARY KEY,
      name        TEXT    NOT NULL,
      role        TEXT,
      company     TEXT,
      text        TEXT    NOT NULL,
      rating      INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
      image_url   TEXT,
      is_active   INTEGER NOT NULL DEFAULT 1,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `).run();
}

export async function GET() {
  const db = getDB();

  if (!db) {
    return NextResponse.json({
      ok: false,
      fallback: true,
      testimonials: []
    });
  }

  try {
    await ensureTableExists(db);
    const result = await db.prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC').all();
    return NextResponse.json(
      { testimonials: result },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=60'
        }
      }
    );
  } catch (error) {
    console.error('Testimonials GET Error:', error);
    return NextResponse.json({
      ok: false,
      fallback: true,
      error: 'Failed to fetch testimonials',
      testimonials: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const adminAuth = request.headers.get('X-Sahara-Admin');
  if (adminAuth !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDB();

  if (!db) {
    return NextResponse.json({ ok: false, fallback: true, error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const validated = testimonialSchema.parse(body);
    const now = new Date().toISOString();
    const id = validated.id || Date.now().toString();

    await ensureTableExists(db);

    if (validated.id) {
      await db.prepare(`
        UPDATE testimonials 
        SET name = ?, role = ?, company = ?, text = ?, rating = ?, image_url = ?, is_active = ?, sort_order = ?, updated_at = ?
        WHERE id = ?
      `).run(
        validated.name,
        validated.role,
        validated.company,
        validated.text,
        validated.rating,
        validated.image_url,
        validated.is_active,
        validated.sort_order,
        now,
        validated.id
      );
    } else {
      await db.prepare(`
        INSERT INTO testimonials (id, name, role, company, text, rating, image_url, is_active, sort_order, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        validated.name,
        validated.role,
        validated.company,
        validated.text,
        validated.rating,
        validated.image_url,
        validated.is_active,
        validated.sort_order,
        now,
        now
      );
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Testimonials POST Error:', error);
    return NextResponse.json({
      error: 'Failed to save testimonial',
      details: String(error)
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const adminAuth = request.headers.get('X-Sahara-Admin');
  if (adminAuth !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  const db = getDB();

  if (!db) {
    return NextResponse.json({ ok: false, fallback: true, error: 'Database not configured' }, { status: 500 });
  }

  try {
    await db.prepare('UPDATE testimonials SET is_active = 0 WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonials DELETE Error:', error);
    return NextResponse.json({
      error: 'Failed to delete testimonial',
      details: String(error)
    }, { status: 500 });
  }
}