import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

function getDB() {
  try {
    return getRequestContext().env.DB ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const db = getDB();
    if (!db) return NextResponse.json({ online: 0, available: false });

    const fiveMinAgo = Math.floor(Date.now() / 1000) - 300;
    const result = (await db
      .prepare(`SELECT COUNT(*) as count FROM visitors WHERE last_seen > ?`)
      .bind(fiveMinAgo)
      .first()) as { count: number } | null;

    return NextResponse.json({ online: result?.count ?? 0, available: true });
  } catch (e) {
    return NextResponse.json({ online: 0, available: false, error: String(e) });
  }
}
