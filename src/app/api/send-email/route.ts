import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteNotification, QuoteEmailData } from './email-service';
import { validateEmail, validateUAEPhone } from '@/lib/emailValidation';
import { getRequestContext } from '@cloudflare/next-on-pages';

function getDB() {
  try { return getRequestContext().env.DB as any; } catch { return null; }
}

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as QuoteEmailData;

    if (!data.customerEmail || !data.customerName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailCheck = validateEmail(data.customerEmail);
    if (!emailCheck.valid) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }

    if (data.customerPhone) {
      const phoneCheck = validateUAEPhone(data.customerPhone);
      if (!phoneCheck.valid) {
        return NextResponse.json({ error: phoneCheck.error }, { status: 400 });
      }
    }

    const { sent, provider } = await sendQuoteNotification(data);

    // Persist inquiry to D1 regardless of email outcome, so the enquiry is
    // never lost and the admin panel can show delivery status accurately.
    const db = getDB();
    if (db) {
      const id = `inq-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const now = new Date().toISOString();
      db.prepare(`
        INSERT INTO inquiries (id, name, email, phone, company, service, message, status, email_sent, email_sent_at, email_provider, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, ?)
      `).bind(
        id,
        data.customerName || '',
        data.customerEmail || '',
        data.customerPhone || '',
        data.customerCompany || '',
        data.configuration || '',
        data.message || '',
        sent ? 1 : 0,
        sent ? now : '',
        sent ? provider : '',
        now,
      ).run().catch((e: unknown) => console.error('[send-email] inquiry insert failed:', e));
    }

    if (!sent) {
      return NextResponse.json({ error: 'Email delivery failed — check SMTP settings in Admin' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[send-email route] Error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
