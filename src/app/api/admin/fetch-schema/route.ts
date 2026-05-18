export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url') || 'https://www.saharaprinter.com/';

  // SSRF protection: only allow saharaprinter.com URLs
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith('saharaprinter.com')) {
      return Response.json({ error: 'Only saharaprinter.com URLs allowed' }, { status: 400 });
    }
  } catch {
    return Response.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'SaharaAdmin/1.0 SchemaInspector' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();

    const schemas: object[] = [];
    const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      try { schemas.push(JSON.parse(m[1].trim())); } catch { /* skip malformed */ }
    }

    return Response.json({ schemas, url, fetchedAt: new Date().toISOString() });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Fetch failed';
    return Response.json({ schemas: [], error: msg, url, fetchedAt: new Date().toISOString() });
  }
}
