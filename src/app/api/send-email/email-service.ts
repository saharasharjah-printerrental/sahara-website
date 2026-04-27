import { getRequestContext } from '@cloudflare/next-on-pages';

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

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
  toEmail: string;
}

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

export async function getSmtpConfig(): Promise<SmtpConfig | null> {
  const db = getDB();
  if (!db) return null;

  try {
    const keys = ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'smtp_from_name', 'smtp_from_email', 'smtp_to_email'];
    const placeholders = keys.map(() => '?').join(',');
    const result = await db
      .prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`)
      .bind(...keys)
      .all();

    const rows: any[] = result?.results ?? result ?? [];
    const map: Record<string, string> = {};
    rows.forEach((r: any) => { map[r.key] = r.value; });

    if (!map.smtp_user || !map.smtp_pass) return null;

    return {
      host: map.smtp_host || 'smtp.gmail.com',
      port: parseInt(map.smtp_port || '587', 10),
      user: map.smtp_user,
      pass: map.smtp_pass,
      fromName: map.smtp_from_name || 'Sahara Printers',
      fromEmail: map.smtp_from_email || map.smtp_user,
      toEmail: map.smtp_to_email || map.smtp_user,
    };
  } catch (err) {
    console.error('[email-service] Failed to read SMTP config from DB:', err);
    return null;
  }
}

function buildAdminHtml(data: QuoteEmailData): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:24px auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
  <h2 style="color:#f5be53;margin-top:0;font-size:20px">📋 New Quote Request — Sahara Printers</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr><td style="padding:8px 0;color:#9ca3af;width:140px;vertical-align:top">Name</td><td style="padding:8px 0;color:#fff;font-weight:700">${data.customerName}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Company</td><td style="padding:8px 0;color:#fff">${data.customerCompany || '—'}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Email</td><td style="padding:8px 0"><a href="mailto:${data.customerEmail}" style="color:#f5be53">${data.customerEmail}</a></td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Phone</td><td style="padding:8px 0;color:#fff">${data.customerPhone || '—'}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Configuration</td><td style="padding:8px 0;color:#fff">${data.configuration}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Estimate</td><td style="padding:8px 0;color:#f5be53;font-weight:700;font-size:18px">${data.estimatedRange}/mo</td></tr>
  </table>
  ${data.message ? `<div style="margin-top:20px;padding:16px;background:#101c2e;border-radius:8px;border-left:3px solid #f5be53"><p style="margin:0;color:#d3c5b0;font-style:italic">"${data.message}"</p></div>` : ''}
  <p style="margin-top:24px;font-size:11px;color:#4b5563;border-top:1px solid #1e2d42;padding-top:16px">Submitted via saharaprinter.com • ${new Date().toUTCString()}</p>
</div>
</body>
</html>`;
}

function buildCustomerHtml(data: QuoteEmailData): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:24px auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
  <h2 style="color:#f5be53;margin-top:0;font-size:20px">✅ Quote Request Received</h2>
  <p>Hi ${data.customerName},</p>
  <p>Thank you for reaching out to <strong>Sahara Office Equipments</strong>. We've received your quote request and our team will contact you within <strong>2 working hours</strong>.</p>
  <div style="background:#101c2e;border-radius:8px;padding:20px;margin:24px 0;border:1px solid rgba(245,190,83,0.2)">
    <p style="margin:0 0 8px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Your Configuration</p>
    <p style="margin:0 0 8px;color:#fff;font-size:14px">${data.configuration}</p>
    <p style="margin:0;color:#f5be53;font-weight:700;font-size:20px">${data.estimatedRange}<span style="font-size:13px;color:#9ca3af;font-weight:400">/month</span></p>
  </div>
  <p style="font-size:14px">Need urgent assistance? Call or WhatsApp us directly:</p>
  <p><a href="tel:+971503823969" style="color:#f5be53;font-size:16px;font-weight:700">+971 50 382 3969</a></p>
  <p style="margin-top:24px;font-size:11px;color:#4b5563;border-top:1px solid #1e2d42;padding-top:16px">— The Sahara Printers Team &nbsp;|&nbsp; saharaprinter.com</p>
</div>
</body>
</html>`;
}

export async function sendQuoteNotification(data: QuoteEmailData): Promise<boolean> {
  const config = await getSmtpConfig();

  if (!config) {
    console.log('[email-service] SMTP not configured. Configure Gmail SMTP in Admin → Settings.');
    console.log('[email-service] Would send to:', data.notificationEmail, '| customer:', data.customerEmail);
    return true;
  }

  try {
    const nodemailer = await import('nodemailer').then(m => m.default || m);
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
      tls: { rejectUnauthorized: false },
    });

    const fromField = `"${config.fromName}" <${config.fromEmail}>`;
    const toEmail = data.notificationEmail || config.toEmail;

    await Promise.all([
      transporter.sendMail({
        from: fromField,
        to: toEmail,
        subject: `New Quote: ${data.customerName}${data.customerCompany ? ' — ' + data.customerCompany : ''}`,
        html: buildAdminHtml(data),
      }),
      transporter.sendMail({
        from: fromField,
        to: data.customerEmail,
        subject: 'Your Quote Request — Sahara Printers',
        html: buildCustomerHtml(data),
      }),
    ]);

    console.log('[email-service] Sent admin + customer emails successfully');
    return true;
  } catch (err) {
    console.error('[email-service] SMTP send failed:', err);
    return false;
  }
}
