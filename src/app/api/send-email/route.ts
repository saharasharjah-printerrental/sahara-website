import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

function getEnv(key: string): string | undefined {
  try {
    return (getRequestContext().env as any)[key];
  } catch {
    return undefined;
  }
}

export interface QuoteEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  configuration: string;
  message: string;
  estimatedRange: string;
  notificationEmail: string;
}

export async function sendQuoteNotification(data: QuoteEmailData): Promise<boolean> {
  const apiKey = getEnv('RESEND_API_KEY');

  const adminHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
      <h2 style="color:#f5be53;margin-top:0">New Quote Request — Sahara Printers</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#9ca3af;width:140px">Name</td><td style="padding:8px 0;color:#fff;font-weight:600">${data.customerName}</td></tr>
        <tr><td style="padding:8px 0;color:#9ca3af">Company</td><td style="padding:8px 0;color:#fff">${data.customerCompany || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#9ca3af">Email</td><td style="padding:8px 0;color:#f5be53">${data.customerEmail}</td></tr>
        <tr><td style="padding:8px 0;color:#9ca3af">Phone</td><td style="padding:8px 0;color:#fff">${data.customerPhone || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#9ca3af">Configuration</td><td style="padding:8px 0;color:#fff">${data.configuration}</td></tr>
        <tr><td style="padding:8px 0;color:#9ca3af">Estimate</td><td style="padding:8px 0;color:#f5be53;font-weight:700">${data.estimatedRange}</td></tr>
      </table>
      ${data.message ? `<div style="margin-top:16px;padding:16px;background:#101c2e;border-radius:8px;border-left:3px solid #f5be53"><p style="margin:0;color:#d3c5b0;font-style:italic">"${data.message}"</p></div>` : ''}
      <p style="margin-top:24px;font-size:12px;color:#4b5563">Submitted via saharaprinter.com</p>
    </div>`;

  const customerHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
      <h2 style="color:#f5be53;margin-top:0">Your Quote Request Has Been Received</h2>
      <p>Hi ${data.customerName},</p>
      <p>Thank you for reaching out to <strong>Sahara Office Equipments</strong>. Our team will review your requirements and contact you within <strong>2 working hours</strong>.</p>
      <div style="background:#101c2e;border-radius:8px;padding:16px;margin:24px 0">
        <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.1em">Your Configuration</p>
        <p style="margin:0;color:#fff">${data.configuration}</p>
        <p style="margin:8px 0 0;color:#f5be53;font-weight:700">${data.estimatedRange}/month</p>
      </div>
      <p>If you need immediate assistance, call us or WhatsApp: <a href="tel:+97150382396" style="color:#f5be53">+971 50 382 3969</a></p>
      <p style="margin-top:24px;font-size:12px;color:#4b5563">— The Sahara Printers Team</p>
    </div>`;

  if (!apiKey) {
    console.log('[send-email] No RESEND_API_KEY — logging email payload:', {
      to: data.notificationEmail,
      subject: `New Quote: ${data.customerName}`,
    });
    return true;
  }

  try {
    const [adminRes, customerRes] = await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Sahara Printers <noreply@saharaprinter.com>',
          to: [data.notificationEmail],
          subject: `New Quote Request: ${data.customerName}${data.customerCompany ? ' — ' + data.customerCompany : ''}`,
          html: adminHtml,
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Sahara Printers <noreply@saharaprinter.com>',
          to: [data.customerEmail],
          subject: 'Quote Request Received — Sahara Printers',
          html: customerHtml,
        }),
      }),
    ]);

    if (!adminRes.ok) {
      console.error('[send-email] Admin notification failed:', await adminRes.text());
    }
    if (!customerRes.ok) {
      console.error('[send-email] Customer confirmation failed:', await customerRes.text());
    }

    return adminRes.ok;
  } catch (err) {
    console.error('[send-email] Fetch error:', err);
    return false;
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Use sendQuoteNotification directly from inquiries route' }, { status: 405 });
}
