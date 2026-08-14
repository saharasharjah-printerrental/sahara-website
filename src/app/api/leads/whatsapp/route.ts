import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getDB() {
  try { return getRequestContext().env.DB as any; } catch { return null; }
}

/**
 * Fire-and-forget lead capture for "Quote on WhatsApp" clicks. A wa.me link
 * only reaches us if the customer presses Send inside WhatsApp, so this
 * records the click itself as an inquiry (source: whatsapp) — the same
 * table the email quote flow writes to — giving admin visibility either way.
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json().catch(() => ({}));
    const db = getDB();
    if (!db) return NextResponse.json({ ok: false }, { status: 200 });

    const id = `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    await db.prepare(`
      INSERT INTO inquiries (id, name, email, phone, company, service, message, status, email_sent, email_sent_at, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'new', 0, '', ?)
    `).bind(
      id,
      data.name || 'WhatsApp Click',
      data.email || '',
      data.phone || '',
      data.company || '',
      'WhatsApp Quote Request',
      data.message || '',
      now,
    ).run();

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[leads/whatsapp] error:', err);
    // Never surface an error to the client — this is a best-effort ping.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
