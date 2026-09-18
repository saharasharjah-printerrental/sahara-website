import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { isAdminRequest } from '@/lib/adminAuth';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Submissions are dispatched through the "IndexNow submission" GitHub
// Actions workflow (.github/workflows/indexnow.yml) instead of calling
// api.indexnow.org directly from this route. Cloudflare Pages Functions
// share outbound IPs across every Cloudflare tenant, and IndexNow
// rate-limits by source IP — calls made straight from the edge were
// failing with "TooManyRequests" caused by *other* customers' Cloudflare
// traffic, confirmed by the exact same submission succeeding immediately
// when run from a non-Cloudflare IP (a local machine and a GitHub Actions
// runner both got HTTP 200 within the same minute this was failing here).
const GITHUB_REPO = 'saharasharjah-printerrental/sahara-website';
const WORKFLOW_FILE = 'indexnow.yml';
const GITHUB_API = 'https://api.github.com';

const CACHE_CONTROL = {
  'Cache-Control': 'private, no-store',
  'Content-Type': 'application/json',
  'X-Robots-Tag': 'noindex, nofollow',
};

function getGithubToken(): string {
  try {
    return ((getRequestContext().env as any).GITHUB_DISPATCH_TOKEN || '') as string;
  } catch {
    return '';
  }
}

function githubHeaders(token: string) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

// GitHub's own runs list — public for a public repo, no token needed.
// Gives real submission status/history instead of a D1-stored guess, since
// this route only ever dispatches the workflow and never sees its outcome.
export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CACHE_CONTROL });
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/runs?per_page=5`,
      {
        headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
        signal: AbortSignal.timeout(10000),
      }
    );
    if (!res.ok) {
      return NextResponse.json({ runs: [], error: `GitHub API HTTP ${res.status}` }, { status: 200, headers: CACHE_CONTROL });
    }
    const data = await res.json() as { workflow_runs?: any[] };
    const runs = (data.workflow_runs ?? []).map((r) => ({
      id: r.id,
      status: r.status,
      conclusion: r.conclusion,
      event: r.event,
      createdAt: r.created_at,
      htmlUrl: r.html_url,
    }));
    return NextResponse.json({ runs }, { status: 200, headers: CACHE_CONTROL });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch run status';
    return NextResponse.json({ runs: [], error: message }, { status: 200, headers: CACHE_CONTROL });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: CACHE_CONTROL });
  }

  const token = getGithubToken();
  if (!token) {
    return NextResponse.json(
      { ok: false, error: 'GITHUB_DISPATCH_TOKEN is not configured in Cloudflare Pages environment variables.' },
      { status: 200, headers: CACHE_CONTROL }
    );
  }

  let body: { urls?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    // empty body means "submit the whole sitemap"
  }

  const inputs: Record<string, string> = {};
  let hasInvalidUrl = false;
  let invalidUrl = '';

  if (Array.isArray(body.urls) && body.urls.length > 0) {
    const urls = body.urls
      .filter((u): u is string => typeof u === 'string' && u.trim().length > 0)
      .map((u) => u.trim());
    for (const u of urls) {
      try {
        if (!new URL(u).hostname.endsWith('saharaprinter.com')) {
          hasInvalidUrl = true;
          invalidUrl = u;
          break;
        }
      } catch {
        hasInvalidUrl = true;
        invalidUrl = u;
        break;
      }
    }
    if (hasInvalidUrl) {
      return NextResponse.json(
        { ok: false, error: `Only saharaprinter.com URLs allowed — got "${invalidUrl}"` },
        { status: 200, headers: CACHE_CONTROL }
      );
    }
    inputs.urls = urls.join(',');
  } else {
    // "Submit All Sitemap URLs" — force a full resubmission, ignoring the
    // dedupe state, since the admin clicking this expects every URL sent.
    inputs.force = 'true';
  }

  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
      {
        method: 'POST',
        headers: { ...githubHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({ ref: 'main', inputs }),
        signal: AbortSignal.timeout(10000),
      }
    );

    if (res.status === 204) {
      return NextResponse.json(
        { ok: true, dispatched: true, mode: inputs.urls ? 'manual' : 'sitemap' },
        { status: 200, headers: CACHE_CONTROL }
      );
    }

    const text = await res.text();
    return NextResponse.json(
      { ok: false, error: `GitHub dispatch failed — HTTP ${res.status}: ${text.slice(0, 300)}` },
      { status: 200, headers: CACHE_CONTROL }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'GitHub dispatch request failed';
    return NextResponse.json({ ok: false, error: message }, { status: 200, headers: CACHE_CONTROL });
  }
}
