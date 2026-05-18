import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface Setting {
  key: string;
  value: string;
}

const CACHE_CONTROL = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
  'Content-Type': 'application/json',
};

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  const db = getDB();

  if (!db) {
    return NextResponse.json(
      { error: 'Database not configured', settings: {} },
      { status: 200, headers: CACHE_CONTROL }
    );
  }

  try {
    if (key) {
      const result = await db.prepare('SELECT * FROM settings WHERE key = ?').bind(key).first();
      return NextResponse.json(
        { setting: result || null },
        { status: 200, headers: CACHE_CONTROL }
      );
    }

    const result = await db.prepare('SELECT * FROM settings').all();
    const settings: Record<string, string> = {};
    const rows: any[] = result?.results ?? result ?? [];
    rows.forEach((s: any) => {
      settings[s.key] = s.value;
    });
    return NextResponse.json(
      { settings },
      { status: 200, headers: CACHE_CONTROL }
    );
  } catch (error) {
    console.error('[/api/settings] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings', settings: {} },
      { status: 200, headers: CACHE_CONTROL }
    );
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 500, headers: CACHE_CONTROL }
    );
  }

  try {
    const body: Setting = await request.json();

    await db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)
    `).bind(body.key, body.value).run();

    return NextResponse.json(
      { success: true },
      { status: 200, headers: CACHE_CONTROL }
    );
  } catch (error) {
    console.error('[/api/settings] POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to save setting', details: String(error) },
      { status: 500, headers: CACHE_CONTROL }
    );
  }
}
