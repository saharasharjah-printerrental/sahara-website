import { NextRequest, NextResponse } from 'next/server';

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
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  
  const db = process.env.DB as any;
  
  if (!db) {
    return NextResponse.json({ 
      error: 'Database not configured',
      blogs: []
    });
  }
  
  try {
    if (slug) {
      const result = await db.prepare('SELECT * FROM blogs WHERE slug = ? AND isActive = 1').get(slug);
      return NextResponse.json({ blog: result });
    }
    
    const result = await db.prepare('SELECT * FROM blogs WHERE isActive = 1 ORDER BY publishedAt DESC').all();
    return NextResponse.json({ blogs: result });
  } catch (error) {
    console.error('Blogs GET Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch blogs',
      blogs: [] 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = process.env.DB as any;
  
  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }
  
  try {
    const body: Blog = await request.json();
    const id = body.id || Date.now().toString();
    const now = new Date().toISOString();
    
    await db.prepare(`
      INSERT INTO blogs (id, title, slug, excerpt, content, image, author, category, isActive, publishedAt, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      now
    );
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Blogs POST Error:', error);
    return NextResponse.json({ 
      error: 'Failed to create blog',
      details: String(error)
    }, { status: 500 });
  }
}