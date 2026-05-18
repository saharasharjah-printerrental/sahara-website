import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteNotification, QuoteEmailData } from './email-service';
import { validateEmail, validateUAEPhone } from '@/lib/emailValidation';

export const runtime = 'edge';

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

    const sent = await sendQuoteNotification(data);
    if (!sent) {
      return NextResponse.json({ error: 'Email delivery failed — check SMTP settings in Admin' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[send-email route] Error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
