import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface Setting {
  key: string;
  value: string;
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
  const key = searchParams.get('key');

  const db = getDB();

  if (!db) {
    return NextResponse.json({
      error: 'Database not configured',
      settings: {}
    });
  }

  try {
    if (key) {
      const result = await db.prepare('SELECT * FROM settings WHERE key = ?').get(key);
      return NextResponse.json({ setting: result });
    }

    const result = await db.prepare('SELECT * FROM settings').all();
    const settings: Record<string, string> = {};
    result.forEach((s: any) => {
      settings[s.key] = s.value;
    });
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Settings GET Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch settings',
      settings: {}
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();

  if (!db) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  try {
    const body: Setting = await request.json();

    await db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)
    `).run(body.key, body.value);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Settings POST Error:', error);
    return NextResponse.json({
      error: 'Failed to save setting',
      details: String(error)
    }, { status: 500 });
  }
}
