import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { isAdminRequest } from '@/lib/adminAuth';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Must match the filename of the key file published at public/<key>.txt
// (see scripts/seo/indexnow.mjs and public/_headers). IndexNow keys aren't
// secrets — the whole protocol depends on the key being readable at the
// site root — so hardcoding it here (edge runtime has no filesystem to read
// public/ from at request time) carries no security cost.
const INDEXNOW_KEY = '886e0bddd875df4696e26c07fbd50a98';
const SITE = 'https://www.saharaprinter.com';
const API_URL = 'https://api.indexnow.org/indexnow';
const LAST_RUN_KEY = 'indexnow_last_run';

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

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE}/sitemap.xml`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Failed to fetch sitemap.xml — HTTP ${res.status}`);
  const xml = await res.text();
  const urls: string[] = [];
  for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (loc) urls.push(loc);
  }
  return urls;
}

async function saveLastRun(db: any, entry: Record<string, unknown>) {
  if (!db) return;
  try {
    await db
      .prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)')
      .bind(LAST_RUN_KEY, JSON.stringify(entry))
      .run();
  } catch {
    // Non-fatal — the submission itself already happened.
  }
}

export async function GET(request: NextRequest) {
  const db = getDB();
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CACHE_CONTROL });
  }
  if (!db) {
    return NextResponse.json({ lastRun: null }, { status: 200, headers: CACHE_CONTROL });
  }
  try {
    const row = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(LAST_RUN_KEY).first();
    const lastRun = row?.value ? JSON.parse(row.value) : null;
    return NextResponse.json({ lastRun }, { status: 200, headers: CACHE_CONTROL });
  } catch {
    return NextResponse.json({ lastRun: null }, { status: 200, headers: CACHE_CONTROL });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CACHE_CONTROL });
  }

  let body: { urls?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    // empty body is fine — means "submit the whole sitemap"
  }

  let urlList: string[];
  let source: 'sitemap' | 'manual';
  try {
    if (Array.isArray(body.urls) && body.urls.length > 0) {
      urlList = body.urls
        .filter((u): u is string => typeof u === 'string' && u.trim().length > 0)
        .map((u) => u.trim());
      source = 'manual';
      for (const u of urlList) {
        const parsed = new URL(u);
        if (!parsed.hostname.endsWith('saharaprinter.com')) {
          return NextResponse.json(
            { error: `Only saharaprinter.com URLs allowed — got "${u}"` },
            { status: 400, headers: CACHE_CONTROL }
          );
        }
      }
    } else {
      urlList = await fetchSitemapUrls();
      source = 'sitemap';
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to resolve URL list';
    return NextResponse.json({ error: message }, { status: 400, headers: CACHE_CONTROL });
  }

  if (urlList.length === 0) {
    return NextResponse.json({ error: 'No URLs to submit' }, { status: 400, headers: CACHE_CONTROL });
  }

  const host = new URL(SITE).host;
  let indexNowStatus: number;
  let indexNowBody: string;
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(15000),
    });
    indexNowStatus = res.status;
    indexNowBody = await res.text();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'IndexNow request failed';
    await saveLastRun(db, {
      timestamp: new Date().toISOString(),
      source,
      count: urlList.length,
      ok: false,
      status: null,
      message,
    });
    // Always 200 here — Cloudflare's edge intercepts 502/504/etc. from
    // Workers/Pages Functions and replaces the body with its own HTML error
    // interstitial, which broke res.json() on the client ("Unexpected token
    // '<'") even though this route's own JSON body was correct. IndexNow
    // being unreachable is an application-level failure, not an infra one,
    // so it's encoded in the body instead of the status.
    return NextResponse.json({ ok: false, error: message }, { status: 200, headers: CACHE_CONTROL });
  }

  const ok = indexNowStatus === 200 || indexNowStatus === 202;
  const entry = {
    timestamp: new Date().toISOString(),
    source,
    count: urlList.length,
    ok,
    status: indexNowStatus,
    message: ok ? undefined : indexNowBody.slice(0, 500),
  };
  await saveLastRun(db, entry);

  // Always 200 — see the comment on the earlier catch block above.
  return NextResponse.json(
    { ok, status: indexNowStatus, count: urlList.length, source, body: ok ? undefined : indexNowBody },
    { status: 200, headers: CACHE_CONTROL }
  );
}
