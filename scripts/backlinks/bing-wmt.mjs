#!/usr/bin/env node
/**
 * bing-wmt.mjs — free-tier backlink snapshot for saharaprinter.com.
 *
 * Pulls inbound-link data from the Bing Webmaster Tools REST API and prints a
 * summary: total inbound links, pages with the most inbound links, and the top
 * linking domains.
 *
 * Usage (Node 20+, no dependencies — uses built-in fetch and --env-file):
 *
 *   node --env-file=.env scripts/backlinks/bing-wmt.mjs
 *   node --env-file=.env scripts/backlinks/bing-wmt.mjs --site https://www.saharaprinter.com --json
 *
 * Required environment variable:
 *   BING_WMT_API_KEY   Bing Webmaster Tools API key (Settings -> API Access).
 *                      Never printed by this script; keep it out of git.
 *
 * API reference: https://ssl.bing.com/webmaster/api.svc/json/<Method>?apikey=...&siteUrl=...
 * Methods used:
 *   GetLinkCounts  — pages on your site that have inbound links, with counts
 *   GetUrlLinks    — the individual referring URLs for one of your pages
 */

const API_BASE = "https://ssl.bing.com/webmaster/api.svc/json";
const DEFAULT_SITE = "https://www.saharaprinter.com";

/* ------------------------------------------------------------------ *
 * OPTIONAL FUTURE UPGRADE PATH — DataForSEO (paid), NOT implemented.
 *
 * DataForSEO's Backlinks API returns full referring-domain exports that the
 * free Bing/Common Crawl stack cannot produce. If the project ever buys
 * credentials, set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in .env and add a
 * fetchDataForSeoBacklinks() call alongside fetchLinkCounts() below — the
 * report renderer already takes a normalised { url, count } shape, so no
 * rework of the output layer is needed.
 *
 * Deliberately left as a config slot only: no DataForSEO request is made and
 * no credentials are required for this script to run today.
 * ------------------------------------------------------------------ */
const DATAFORSEO_LOGIN = process.env.DATAFORSEO_LOGIN ?? null;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD ?? null;
const DATAFORSEO_CONFIGURED = Boolean(DATAFORSEO_LOGIN && DATAFORSEO_PASSWORD);

function parseArgs(argv) {
  const args = { site: DEFAULT_SITE, json: false, top: 25 };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--site" && argv[i + 1]) args.site = argv[++i];
    else if (argv[i] === "--top" && argv[i + 1]) args.top = Number(argv[++i]) || 25;
    else if (argv[i] === "--json") args.json = true;
  }
  return args;
}

function getApiKey() {
  const key = process.env.BING_WMT_API_KEY;
  if (!key) {
    console.error(
      "ERROR: BING_WMT_API_KEY is not set.\n" +
        "Run with: node --env-file=.env scripts/backlinks/bing-wmt.mjs"
    );
    process.exit(1);
  }
  return key;
}

/** Build an API URL. The key is only ever placed in the query string here. */
function apiUrl(method, apiKey, params = {}) {
  const url = new URL(`${API_BASE}/${method}`);
  url.searchParams.set("apikey", apiKey);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url;
}

/** Redact the key from anything we might surface in an error message. */
function safe(text, apiKey) {
  return String(text).split(apiKey).join("<redacted>");
}

async function callApi(method, apiKey, params) {
  const res = await fetch(apiUrl(method, apiKey, params), {
    headers: { Accept: "application/json" },
  });
  const body = await res.text();
  if (!res.ok) {
    throw new Error(
      `${method} failed: HTTP ${res.status} ${res.statusText} — ${safe(body, apiKey).slice(0, 400)}`
    );
  }
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    throw new Error(`${method}: response was not JSON — ${safe(body, apiKey).slice(0, 200)}`);
  }
  // Bing wraps successful payloads in a "d" envelope.
  return json?.d ?? json;
}

/** Pages on our own site that have inbound links, plus the count for each. */
async function fetchLinkCounts(apiKey, siteUrl) {
  const data = await callApi("GetLinkCounts", apiKey, { siteUrl });
  const rows = data?.Links ?? data ?? [];
  return (Array.isArray(rows) ? rows : []).map((r) => ({
    url: r.Url ?? r.url ?? "",
    count: Number(r.Count ?? r.count ?? 0),
  }));
}

/** Referring URLs pointing at one specific page of ours. */
async function fetchUrlLinks(apiKey, siteUrl, page) {
  const data = await callApi("GetUrlLinks", apiKey, { siteUrl, link: page, page: 0 });
  const rows = data?.Details ?? data?.Links ?? data ?? [];
  return (Array.isArray(rows) ? rows : []).map((r) => r.Url ?? r.url ?? "").filter(Boolean);
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

async function main() {
  const { site, json, top } = parseArgs(process.argv.slice(2));
  const apiKey = getApiKey();

  console.log(`Bing Webmaster Tools — inbound link snapshot`);
  console.log(`Site: ${site}`);
  console.log(`DataForSEO upgrade slot: ${DATAFORSEO_CONFIGURED ? "credentials present (unused)" : "not configured (optional)"}`);
  console.log("");

  const linkCounts = await fetchLinkCounts(apiKey, site);
  const totalInbound = linkCounts.reduce((sum, r) => sum + r.count, 0);

  console.log(`Pages with inbound links : ${linkCounts.length}`);
  console.log(`Total inbound links      : ${totalInbound}`);
  console.log("");

  if (linkCounts.length === 0) {
    console.log(
      "No inbound-link rows returned. Bing commonly reports zero here for small or\n" +
        "recently-verified sites, and the endpoint is known to return empty sets even\n" +
        "for verified properties. Treat as 'no data', not as 'no backlinks'."
    );
  }

  const byCount = [...linkCounts].sort((a, b) => b.count - a.count).slice(0, top);
  if (byCount.length) {
    console.log(`Top ${byCount.length} linked pages on this site:`);
    for (const row of byCount) console.log(`  ${String(row.count).padStart(6)}  ${row.url}`);
    console.log("");
  }

  // Referring domains: sample the most-linked pages and aggregate their sources.
  const domains = new Map();
  for (const row of byCount.slice(0, 10)) {
    try {
      const refs = await fetchUrlLinks(apiKey, site, row.url);
      for (const ref of refs) {
        const d = domainOf(ref);
        domains.set(d, (domains.get(d) ?? 0) + 1);
      }
    } catch (err) {
      console.error(`  (skipped ${row.url}: ${safe(err.message, apiKey)})`);
    }
  }

  const topDomains = [...domains.entries()].sort((a, b) => b[1] - a[1]).slice(0, top);
  if (topDomains.length) {
    console.log(`Top linking domains (sampled from the ${Math.min(10, byCount.length)} most-linked pages):`);
    for (const [d, n] of topDomains) console.log(`  ${String(n).padStart(6)}  ${d}`);
  } else {
    console.log("Top linking domains: none returned by GetUrlLinks.");
  }

  if (json) {
    console.log("\n--- JSON ---");
    console.log(
      JSON.stringify(
        { site, totalInbound, pagesWithLinks: linkCounts.length, pages: byCount, referringDomains: topDomains },
        null,
        2
      )
    );
  }
}

main().catch((err) => {
  console.error(`FAILED: ${err.message}`);
  process.exit(1);
});
