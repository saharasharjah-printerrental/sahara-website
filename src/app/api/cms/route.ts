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

export async function GET() {
  const db = getDB();

  if (!db) {
    return NextResponse.json({
      error: 'Database not configured',
      data: []
    });
  }

  try {
    const tables = ['blogs', 'products', 'testimonials', 'faqs', 'banners'];
    const data: Record<string, any> = {};

    for (const table of tables) {
      const result = await db.prepare(`SELECT * FROM ${table}`).all();
      data[table] = result?.results ?? [];
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('CMS GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch CMS data',
      data: []
    }, { status: 200 });
  }
}
