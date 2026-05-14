import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  isActive: number;
  publishedAt: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  internal_links?: string;
  schema_jsonld?: string;
}

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

const CACHE_CONTROL = { 'Cache-Control': 'no-store, max-age=0' };

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured', blogs: [] }, { headers: CACHE_CONTROL });
  }

  try {
    const includeDrafts = searchParams.get('includeDrafts') === '1';
    const id = searchParams.get('id');
    if (id) {
      const filter = includeDrafts ? '' : ' AND isActive = 1';
      const result = await db.prepare(`SELECT * FROM blogs WHERE id = ?${filter}`).first(id);
      return NextResponse.json({ blog: result }, { headers: CACHE_CONTROL });
    }
    if (slug) {
      const result = await db.prepare('SELECT * FROM blogs WHERE slug = ? AND isActive = 1').first(slug);
      return NextResponse.json({ blog: result }, { headers: CACHE_CONTROL });
    }
    if (includeDrafts) {
      const result = await db.prepare('SELECT * FROM blogs ORDER BY createdAt DESC').all();
      return NextResponse.json({ blogs: result?.results ?? [] }, { headers: CACHE_CONTROL });
    }
    const result = await db.prepare('SELECT * FROM blogs WHERE isActive = 1 ORDER BY publishedAt DESC').all();
    return NextResponse.json({ blogs: result?.results ?? [] }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Blogs GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs', blogs: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: CACHE_CONTROL });
  }

  try {
    const body: Blog = await request.json();
    // Guard: never use route segment names as IDs
    const reservedIds = ['editor', 'new', 'create', ''];
    const id = (body.id && !reservedIds.includes(body.id)) ? body.id : Date.now().toString();
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT OR REPLACE INTO blogs (id, title, slug, excerpt, content, image, author, category, isActive, publishedAt, createdAt, meta_title, meta_description, meta_keywords, internal_links, schema_jsonld)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.title,
      body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      body.excerpt || '',
      body.content || '',
      body.image || '',
      body.author || 'Sahara Printer',
      body.category || '',
      body.isActive ?? 1,
      body.publishedAt || now,
      now,
      body.meta_title || '',
      body.meta_description || '',
      body.meta_keywords || '',
      body.internal_links || '',
      body.schema_jsonld || ''
    );

    return NextResponse.json({ success: true, id }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Blogs POST Error:', error);
    return NextResponse.json({ error: 'Failed to save blog', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: CACHE_CONTROL });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Blog ID required' }, { status: 400 });
    }

    await db.prepare('DELETE FROM blogs WHERE id = ?').run(id);
    return NextResponse.json({ success: true }, { headers: CACHE_CONTROL });
  } catch (error) {
    console.error('Blogs DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete blog', details: String(error) }, { status: 500 });
  }
}
