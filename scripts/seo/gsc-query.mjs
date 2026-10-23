#!/usr/bin/env node
// Read-only Search Console client (OAuth loopback, scope webmasters.readonly).
// Credentials: file path from env GSC_CREDENTIALS_PATH (falls back to the Windows user env).
// Refresh token is stored beside the credentials file, outside the repo. Nothing secret is printed.
//
//   node scripts/seo/gsc-query.mjs auth
//   node scripts/seo/gsc-query.mjs baseline [--end YYYY-MM-DD]
//   node scripts/seo/gsc-query.mjs inspect <url> [<url> ...]

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { execSync } from 'node:child_process';

const SITE = 'sc-domain:saharaprinter.com';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const OUT_ROOT = path.resolve('docs/seo/gsc-snapshots');

function credPath() {
  let p = process.env.GSC_CREDENTIALS_PATH;
  if (!p && process.platform === 'win32') {
    try {
      const o = execSync('reg query "HKCU\\Environment" /v GSC_CREDENTIALS_PATH', { encoding: 'utf8' });
      p = (o.match(/REG_SZ\s+(.+)/) || [])[1]?.trim();
    } catch { /* not set */ }
  }
  if (!p || !fs.existsSync(p)) throw new Error('GSC_CREDENTIALS_PATH is not set or the file is missing');
  return p;
}
const tokenPath = () => path.join(path.dirname(credPath()), 'gsc-token.json');
const client = () => {
  const j = JSON.parse(fs.readFileSync(credPath(), 'utf8'));
  const c = j.installed || j.web;
  if (!c?.client_id || !c?.client_secret) throw new Error('Unsupported credentials file shape');
  return c;
};

async function tokenRequest(params) {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`token endpoint ${r.status}: ${j.error || ''} ${j.error_description || ''}`);
  return j;
}

async function auth() {
  const c = client();
  const server = http.createServer();
  await new Promise((res) => server.listen(0, '127.0.0.1', res));
  const redirect = `http://127.0.0.1:${server.address().port}`;
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
    client_id: c.client_id, redirect_uri: redirect, response_type: 'code',
    scope: SCOPE, access_type: 'offline', prompt: 'consent',
  });
  if (process.argv.includes('--print-url')) {
    console.log('CONSENT_URL=' + url);
  } else {
    console.log('Opening the Google consent page in your browser. Sign in with the Search Console owner account.');
    execSync(`start "" "${url}"`, { shell: 'cmd.exe', stdio: 'ignore' });
  }
  const code = await new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('Timed out waiting for consent (3 min)')), 180000);
    server.on('request', (req, res) => {
      const q = new URL(req.url, redirect).searchParams;
      res.end(q.get('code') ? 'Done. You can close this tab.' : 'Consent failed.');
      clearTimeout(t);
      q.get('code') ? resolve(q.get('code')) : reject(new Error('Consent error: ' + q.get('error')));
    });
  });
  server.close();
  const tok = await tokenRequest({
    code, client_id: c.client_id, client_secret: c.client_secret,
    redirect_uri: redirect, grant_type: 'authorization_code',
  });
  if (!tok.refresh_token) throw new Error('No refresh token returned');
  fs.writeFileSync(tokenPath(), JSON.stringify({ refresh_token: tok.refresh_token }));
  console.log('Authorized. Refresh token saved outside the repo.');
}

async function accessToken() {
  const c = client();
  if (!fs.existsSync(tokenPath())) throw new Error('Not authorized yet. Run: node scripts/seo/gsc-query.mjs auth');
  const { refresh_token } = JSON.parse(fs.readFileSync(tokenPath(), 'utf8'));
  return (await tokenRequest({
    refresh_token, client_id: c.client_id, client_secret: c.client_secret, grant_type: 'refresh_token',
  })).access_token;
}

async function api(url, body) {
  const r = await fetch(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${await accessToken()}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`API ${r.status}: ${j.error?.message || 'error'}`);
  return j;
}

const fmt = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);

function windows(endArg) {
  // GSC data lags ~2-3 days; default end = today - 3. Two equal 28-day windows.
  const end = endArg ? new Date(endArg + 'T00:00:00Z') : addDays(new Date(fmt(new Date()) + 'T00:00:00Z'), -3);
  const curStart = addDays(end, -27);
  const prevEnd = addDays(curStart, -1);
  return {
    current: { start: fmt(curStart), end: fmt(end) },
    previous: { start: fmt(addDays(prevEnd, -27)), end: fmt(prevEnd) },
  };
}

async function sa(win, dimensions, extra = {}) {
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const j = await api(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`, {
      startDate: win.start, endDate: win.end, dimensions, type: 'web', dataState: 'final',
      rowLimit: Math.min(25000, extra.limit || 25000), startRow, ...(extra.filters ? { dimensionFilterGroups: [{ filters: extra.filters }] } : {}),
    });
    rows.push(...(j.rows || []));
    if (!j.rows || j.rows.length < 25000 || (extra.limit && rows.length >= extra.limit)) break;
  }
  return rows;
}

async function baseline(endArg) {
  const w = windows(endArg);
  const stamp = fmt(new Date());
  const dir = path.join(OUT_ROOT, `api-${stamp}`);
  fs.mkdirSync(dir, { recursive: true });
  const meta = { site: SITE, searchType: 'web', dataState: 'final', windows: w, extractedAt: new Date().toISOString() };
  const save = (name, data) => fs.writeFileSync(path.join(dir, name + '.json'), JSON.stringify({ ...meta, rows: data }, null, 1));

  const pairs = {};
  for (const [label, win] of Object.entries(w)) {
    pairs[label] = {
      totals: await sa(win, []),
      pages: await sa(win, ['page']),
      queries: await sa(win, ['query']),
      countries: await sa(win, ['country']),
      devices: await sa(win, ['device']),
    };
    for (const k of Object.keys(pairs[label])) save(`${label}-${k}`, pairs[label][k]);
    console.log(label, win.start, '->', win.end, 'pages:', pairs[label].pages.length, 'queries:', pairs[label].queries.length);
  }
  const losers = ['/brands/kyocera/', '/services/paper-shredder-rental/', '/services/amc/', '/services/printer-spare-parts/'];
  for (const p of losers) {
    for (const [label, win] of Object.entries(w)) {
      const rows = await sa(win, ['query'], { filters: [{ dimension: 'page', operator: 'contains', expression: p }] });
      save(`${label}-page-queries-${p.replace(/\W+/g, '_')}`, rows);
    }
  }
  console.log('Saved to', path.relative(process.cwd(), dir));
}

async function inspect(urls) {
  const out = [];
  for (const u of urls) {
    try {
      const j = await api('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', { inspectionUrl: u, siteUrl: SITE });
      const r = j.inspectionResult?.indexStatusResult || {};
      out.push({ url: u, verdict: r.verdict, coverageState: r.coverageState, pageFetchState: r.pageFetchState, lastCrawlTime: r.lastCrawlTime, googleCanonical: r.googleCanonical, userCanonical: r.userCanonical, robotsTxtState: r.robotsTxtState, indexingState: r.indexingState });
    } catch (e) { out.push({ url: u, error: e.message }); }
  }
  const dir = path.join(OUT_ROOT, `api-${fmt(new Date())}`);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'url-inspection.json'), JSON.stringify({ site: SITE, extractedAt: new Date().toISOString(), results: out }, null, 1));
  console.table(out.map((o) => ({ url: o.url.replace('https://www.saharaprinter.com', ''), verdict: o.verdict, coverage: o.coverageState || o.error })));
}

const [cmd, ...args] = process.argv.slice(2);
try {
  if (cmd === 'auth') await auth();
  else if (cmd === 'baseline') await baseline(args[0] === '--end' ? args[1] : undefined);
  else if (cmd === 'inspect') await inspect(args);
  else console.log('Usage: auth | baseline [--end YYYY-MM-DD] | inspect <url...>');
} catch (e) { console.error('ERROR:', e.message); process.exit(1); }
