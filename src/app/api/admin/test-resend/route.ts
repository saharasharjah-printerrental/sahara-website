import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { sendViaResend } from '../../send-email/providers/resend';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getDB() {
  try { return getRequestContext().env.DB as any; } catch { return null; }
}

/**
 * Resend accounts start in sandbox mode: until a sending domain is verified,
 * emails can only be delivered to the address the Resend account was signed
 * up with — any other recipient gets a 403 "validation_error". That's an
 * account-level restriction, not a request bug, so surface it as an
 * actionable message instead of raw JSON.
 */
function friendlyResendError(err: unknown): string {
  const raw = String(err);
  if (raw.includes('only send testing emails to your own email address')) {
    return 'Resend account is in sandbox mode — it can only deliver to the email you signed up with until you verify a sending domain. Verify saharaprinter.com at resend.com/domains, then set From Email to an address on that domain.';
  }
  if (raw.includes('domain is not verified')) {
    return 'The "From Email" domain isn\'t verified in Resend. Verify it at resend.com/domains, or clear From Email to use the resend.dev test sender.';
  }
  return raw;
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
        { apiKey: map.resend_api_key, fromName: 'Sahara Printers', fromEmail: (map.resend_from_email || '').trim() || 'onboarding@resend.dev' },
        to,
        'Sahara Printers — Resend Test',
        `<p>Test email from Sahara Printers admin panel via Resend — ${new Date().toUTCString()}</p>`,
      );
      return NextResponse.json({ configured: true, sent: true, to });
    } catch (err) {
      return NextResponse.json({ configured: true, sent: false, error: friendlyResendError(err) });
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
    const apiKey: string = (body?.apiKey || '').trim();
    const fromEmail: string = (body?.fromEmail || '').trim();
    let to: string = (body?.to || '').trim();

    if (!apiKey) {
      return NextResponse.json({ configured: false, message: 'Paste a Resend API key first.' });
    }

    if (!to) {
      const db = getDB();
      if (db) {
        const row = await db.prepare(`SELECT value FROM settings WHERE key = 'smtp_to_email'`).first();
        to = (row?.value || '').trim();
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
      return NextResponse.json({ configured: true, sent: false, error: friendlyResendError(err) });
    }
  } catch (error) {
    console.error('[/api/admin/test-resend] POST Error:', error);
    return NextResponse.json({ configured: false, message: 'Test request failed' });
  }
}
