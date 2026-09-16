#!/usr/bin/env node
/**
 * indexnow.mjs — submits changed URLs to IndexNow (Bing, Yandex, Naver,
 * Seznam) so they can fetch new/updated pages within minutes instead of
 * waiting for their own crawl schedule.
 *
 * IndexNow does NOT reach Google — Google does not consume this protocol.
 * Google discovery still requires GSC "Request Indexing" (UI-only) or a
 * healthy sitemap with trustworthy lastmod values (see src/app/sitemap.ts).
 *
 * By default this script fetches the live sitemap.xml, compares each URL's
 * lastmod against the state file, and submits only the ones that are new or
 * changed — so re-running it right after a successful submission submits
 * zero URLs. Pass explicit URLs on the command line to force a submission
 * regardless of the state file (e.g. right after "Request Indexing" in GSC,
 * to also ping the other engines immediately).
 *
 * Usage (Node 20+, no dependencies — uses built-in fetch):
 *
 *   node --env-file=.env scripts/seo/indexnow.mjs
 *   node --env-file=.env scripts/seo/indexnow.mjs --site https://www.saharaprinter.com
 *   node --env-file=.env scripts/seo/indexnow.mjs https://www.saharaprinter.com/services/paper-shredder-sales/
 *   node --env-file=.env scripts/seo/indexnow.mjs --force   (resubmit every sitemap URL, ignoring state)
 *
 * Required:
 *   The IndexNow key file must already be published at
 *   https://<host>/<INDEXNOW_KEY>.txt (see public/<key>.txt and
 *   public/_headers). This script reads the key from that file's name, not
 *   from an environment variable, so the two can never drift apart.
 *
 * API reference: https://www.indexnow.org/documentation
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "..", "public");
const STATE_FILE = path.join(__dirname, "indexnow-state.json");
const API_URL = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_SUBMISSION = 10000;

function findKeyFile() {
  const match = readdirSync(PUBLIC_DIR).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!match) {
    throw new Error(
      `No IndexNow key file found in ${PUBLIC_DIR} (expected a 32-char hex .txt file). ` +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(16).toString('hex'))\" " +
        "and save it as public/<key>.txt, then add a rule in public/_headers."
    );
  }
  return match.replace(/\.txt$/, "");
}

function parseArgs(argv) {
  const args = { site: "https://www.saharaprinter.com", force: false, urls: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--force") {
      args.force = true;
    } else if (arg.startsWith("--site=")) {
      args.site = arg.slice("--site=".length);
    } else if (arg === "--site") {
      args.site = argv[++i] ?? args.site; // consume the next token as the value
    } else if (arg.startsWith("http")) {
      args.urls.push(arg);
    }
  }
  return args;
}

function loadState() {
  if (!existsSync(STATE_FILE)) return { submitted: {} };
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8"));
  } catch {
    console.error(`indexnow: could not parse ${STATE_FILE}, starting fresh`);
    return { submitted: {} };
  }
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
}

async function fetchSitemapUrls(site) {
  const res = await fetch(`${site}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`indexnow: failed to fetch ${site}/sitemap.xml — HTTP ${res.status}`);
  }
  const xml = await res.text();
  // Each <url> block pairs one <loc> with one <lastmod>; a plain global
  // regex over the whole document would silently misalign the two lists if
  // Next.js ever reorders the child tags, so walk block-by-block instead.
  const entries = [];
  for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = block[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null;
    if (loc) entries.push({ url: loc, lastmod });
  }
  return entries;
}

async function submit({ host, key, urlList }) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList,
    }),
  });
  const body = await res.text();
  return { status: res.status, body };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const key = findKeyFile();
  const host = new URL(args.site).host;
  const state = loadState();

  let toSubmit;
  if (args.urls.length > 0) {
    toSubmit = args.urls;
    console.log(`indexnow: submitting ${toSubmit.length} explicit URL(s) (bypassing state file)`);
  } else {
    const entries = await fetchSitemapUrls(args.site);
    console.log(`indexnow: fetched ${entries.length} URLs from ${args.site}/sitemap.xml`);
    const changed = entries.filter((e) => args.force || state.submitted[e.url] !== e.lastmod);
    toSubmit = changed.map((e) => e.url);
    if (toSubmit.length === 0) {
      console.log("indexnow: nothing changed since the last submission — 0 URLs to submit");
      return;
    }
    console.log(`indexnow: ${toSubmit.length} URL(s) new or changed since last run`);
    for (const e of changed) state.submitted[e.url] = e.lastmod;
  }

  for (let i = 0; i < toSubmit.length; i += MAX_URLS_PER_SUBMISSION) {
    const batch = toSubmit.slice(i, i + MAX_URLS_PER_SUBMISSION);
    const { status, body } = await submit({ host, key, urlList: batch });
    if (status === 200 || status === 202) {
      console.log(`indexnow: submitted ${batch.length} URL(s) — HTTP ${status}`);
    } else {
      // 400 Bad request, 403 key not found/valid, 422 URL doesn't belong to host/key mismatch
      console.error(`indexnow: submission failed — HTTP ${status}: ${body}`);
      process.exitCode = 1;
    }
  }

  if (args.urls.length === 0) saveState(state);
}

main().catch((err) => {
  console.error("indexnow:", err.message);
  process.exitCode = 1;
});
