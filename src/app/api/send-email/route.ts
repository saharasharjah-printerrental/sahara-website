import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteNotification, QuoteEmailData } from './email-service';
import { validateEmail, validateUAEPhone } from '@/lib/emailValidation';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { quoteInputSchema } from '@/lib/quote-input';

function getDB() {
  try { return getRequestContext().env.DB as any; } catch { return null; }
}

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json({ error: 'JSON request required' }, { status: 415 });
    }
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > 16_384) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }
    let input: unknown;
    try { input = JSON.parse(raw); } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    const parsed = quoteInputSchema.safeParse(input);
    if (!parsed.success) return NextResponse.json({ error: 'Please check your contact details and message.' }, { status: 400 });
    if (parsed.data.website) return NextResponse.json({ error: 'Request rejected' }, { status: 400 });
    const data: QuoteEmailData = { ...parsed.data, notificationEmail: '' };

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

    let sent = false;
    let provider = '';
    try {
      const delivery = await sendQuoteNotification(data);
      sent = delivery.sent;
      provider = delivery.provider;
    } catch (error) {
      console.error('[send-email] delivery failed:', error);
    }

    // Persist inquiry to D1 regardless of email outcome, so the enquiry is
    // never lost and the admin panel can show delivery status accurately.
    const db = getDB();
    let saved = false;
    if (db) {
      const id = `inq-${crypto.randomUUID()}`;
      const now = new Date().toISOString();
      try {
        await db.prepare(`
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
        ).run();
        saved = true;
      } catch (error) { console.error('[send-email] inquiry insert failed:', error); }
    }

    if (!sent && !saved) {
      return NextResponse.json({ error: 'Unable to receive your request. Please try again or contact us by phone or WhatsApp.' }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[send-email route] Error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
