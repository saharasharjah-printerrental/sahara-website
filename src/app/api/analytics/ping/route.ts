import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function getDB() {
  try {
    const { getRequestContext } = require("@cloudflare/next-on-pages");
    return getRequestContext().env.DB ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, page } = await request.json();
    if (!sessionId) return NextResponse.json({ ok: false }, { status: 400 });

    const db = getDB();
    if (!db) return NextResponse.json({ ok: false, reason: "db_unavailable" });

    const now = Math.floor(Date.now() / 1000);
    await db
      .prepare(
        `INSERT INTO visitors (session_id, last_seen, page)
         VALUES (?, ?, ?)
         ON CONFLICT(session_id) DO UPDATE SET last_seen = excluded.last_seen, page = excluded.page`
      )
      .bind(sessionId, now, page || "/")
      .run();

    // Purge stale sessions older than 10 minutes to keep table lean
    await db
      .prepare(`DELETE FROM visitors WHERE last_seen < ?`)
      .bind(now - 600)
      .run();

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) });
  }
}
