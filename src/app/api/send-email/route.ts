import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteNotification, QuoteEmailData } from './email-service';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as QuoteEmailData;

    if (!data.customerEmail || !data.customerName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await sendQuoteNotification(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[send-email route] Error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
