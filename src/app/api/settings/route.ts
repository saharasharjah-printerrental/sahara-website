import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface Setting {
  key: string;
  value: string;
}

const CACHE_CONTROL = {
  'Cache-Control': 'private, no-store',
  'Content-Type': 'application/json',
  'X-Robots-Tag': 'noindex, nofollow',
};

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

async function getAdminPassword(): Promise<string> {
  try {
    return ((getRequestContext().env as any).ADMIN_PASSWORD || '') as string;
  } catch {
    try { return ((globalThis as any).process?.env?.ADMIN_PASSWORD || '') as string; } catch {}
  }
  return '';
}

async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const password = await getAdminPassword();
  const session = request.cookies.get('admin_session')?.value;
  if (!password || !session) return false;

  const parts = session.split('.');
  if (parts.length !== 3) return false;

  const [issuedAt, email, signature] = parts;
  const issuedAtMs = Number(issuedAt);
  if (!Number.isFinite(issuedAtMs)) return false;
  if (Date.now() - issuedAtMs > 1000 * 60 * 60 * 12) return false;

  const payload = `${issuedAt}.${email}`;
  const data = new TextEncoder().encode(`${payload}.${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const expected = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return signature === expected;
}

function parseJsonObject(value: unknown): Record<string, unknown> {
  if (typeof value !== 'string') return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

// Secret credentials must never appear in unauthenticated settings responses.
function isSecretKey(key: string): boolean {
  return /secret|server_key|api_key|(^|_)pass$|_pass_|smtp_|stripe_|paytabs_|cloudinary_|seo_config/i.test(key);
}

function isPublicKey(key: string): boolean {
  return key === 'site_settings' || key === 'calculator_prices';
}

const PUBLIC_SITE_SETTING_KEYS = [
  'companyName',
  'companyEmail',
  'companyPhone',
  'companyLandline',
  'companyCustomerService',
  'companyAddress',
  'companyPOBox',
  'whatsappNumber',
  'workingHours',
  'emergencySupport',
  'mapEmbedUrl',
  'hasMapUrl',
  'locationDubaiAddress',
  'locationDubaiPhone',
  'locationAbuDhabiAddress',
  'locationAbuDhabiPhone',
  'locationSharjahAddress',
  'locationSharjahPhone',
  'heroTitle',
  'heroSubtitle',
  'ctaText',
  'paymentGatewayEnabled',
  'paymentGatewayUrl',
  'paymentGatewayLabel',
  'paymentProvider',
] as const;

function toSafeSiteSettings(value: unknown): Record<string, unknown> {
  const siteSettings = parseJsonObject(value);
  const safe: Record<string, unknown> = {};
  PUBLIC_SITE_SETTING_KEYS.forEach((key) => {
    if (siteSettings[key] !== undefined) safe[key] = siteSettings[key];
  });
  return safe;
}

function toPublicSettings(rows: any[]): Record<string, unknown> {
  const byKey: Record<string, string> = {};
  rows.forEach((s) => {
    if (typeof s?.key === 'string' && typeof s?.value === 'string') byKey[s.key] = s.value;
  });

  const siteSettings = toSafeSiteSettings(byKey.site_settings);
  return {
    ...siteSettings,
    calculator_prices: byKey.calculator_prices,
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  const db = getDB();

  if (!db) {
    if (key && (!isPublicKey(key) || isSecretKey(key))) {
      return NextResponse.json(
        { setting: null },
        { status: 200, headers: CACHE_CONTROL }
      );
    }
    return NextResponse.json(
      { error: 'Database not configured', settings: {} },
      { status: 200, headers: CACHE_CONTROL }
    );
  }

  try {
    const isAdmin = await isAdminRequest(request);

    if (key) {
      if (!isAdmin && (!isPublicKey(key) || isSecretKey(key))) {
        return NextResponse.json(
          { setting: null },
          { status: 200, headers: CACHE_CONTROL }
        );
      }
      const result = await db.prepare('SELECT * FROM settings WHERE key = ?').bind(key).first();
      if (!isAdmin && result?.key === 'site_settings') {
        return NextResponse.json(
          { setting: { key: 'site_settings', value: JSON.stringify(toSafeSiteSettings(result.value)) } },
          { status: 200, headers: CACHE_CONTROL }
        );
      }
      return NextResponse.json(
        { setting: result || null },
        { status: 200, headers: CACHE_CONTROL }
      );
    }

    const result = await db.prepare('SELECT * FROM settings').all();
    const rows: any[] = result?.results ?? result ?? [];

    if (isAdmin) {
      const settings: Record<string, string> = {};
      rows.forEach((s: any) => {
        settings[s.key] = s.value;
      });
      return NextResponse.json(
        { settings },
        { status: 200, headers: CACHE_CONTROL }
      );
    }

    return NextResponse.json(
      { settings: toPublicSettings(rows) },
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
    if (!(await isAdminRequest(request))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: CACHE_CONTROL }
      );
    }

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
