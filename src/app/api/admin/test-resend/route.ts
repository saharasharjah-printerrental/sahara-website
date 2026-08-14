import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { sendViaResend } from '../../send-email/providers/resend';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getDB() {
  try { return getRequestContext().env.DB as any; } catch { return null; }
}

export async function GET(_request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ configured: false, message: 'Database not configured' });

  try {
    const keys = ['resend_api_key', 'resend_from_email', 'smtp_to_email'];
    const result = await db.prepare(`SELECT key, value FROM settings WHERE key IN (${keys.map(() => '?').join(',')})`).bind(...keys).all();
    const rows: any[] = result?.results ?? [];
    const map: Record<string, string> = {};
    rows.forEach((r: any) => { map[r.key] = r.value; });

    if (!map.resend_api_key) {
      return NextResponse.json({
        configured: false,
        message: 'Resend not configured. Go to Admin → Settings and paste an API key from resend.com.',
      });
    }

    const to = map.smtp_to_email || map.resend_from_email;
    if (!to) {
      return NextResponse.json({ configured: true, sent: false, error: 'No destination email — set a Sales Notification Email or From Email first.' });
    }

    try {
      await sendViaResend(
        { apiKey: map.resend_api_key, fromName: 'Sahara Printers', fromEmail: map.resend_from_email || 'onboarding@resend.dev' },
        to,
        'Sahara Printers — Resend Test',
        `<p>Test email from Sahara Printers admin panel via Resend — ${new Date().toUTCString()}</p>`,
      );
      return NextResponse.json({ configured: true, sent: true, to });
    } catch (err) {
      return NextResponse.json({ configured: true, sent: false, error: String(err) });
    }
  } catch (error) {
    console.error('[/api/admin/test-resend] Error:', error);
    return NextResponse.json({ configured: false, message: 'Failed to read settings' });
  }
}

/**
 * Tests the API key currently typed into the admin form, not what's saved in
 * D1. The GET handler above (unchanged, still used as a fallback) reads only
 * from the database — so pasting a key and testing before pressing "Save
 * Settings" always reported "not configured", which read as a bug even
 * though it was really just save-then-test ordering.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const apiKey: string = body?.apiKey || '';
    const fromEmail: string = body?.fromEmail || '';
    let to: string = body?.to || '';

    if (!apiKey) {
      return NextResponse.json({ configured: false, message: 'Paste a Resend API key first.' });
    }

    if (!to) {
      const db = getDB();
      if (db) {
        const row = await db.prepare(`SELECT value FROM settings WHERE key = 'smtp_to_email'`).first();
        to = row?.value || '';
      }
    }
    to = to || fromEmail;
    if (!to) {
      return NextResponse.json({ configured: true, sent: false, error: 'No destination email — set a Sales Notification Email or From Email first.' });
    }

    try {
      await sendViaResend(
        { apiKey, fromName: 'Sahara Printers', fromEmail: fromEmail || 'onboarding@resend.dev' },
        to,
        'Sahara Printers — Resend Test',
        `<p>Test email from Sahara Printers admin panel via Resend — ${new Date().toUTCString()}</p>`,
      );
      return NextResponse.json({ configured: true, sent: true, to });
    } catch (err) {
      return NextResponse.json({ configured: true, sent: false, error: String(err) });
    }
  } catch (error) {
    console.error('[/api/admin/test-resend] POST Error:', error);
    return NextResponse.json({ configured: false, message: 'Test request failed' });
  }
}
