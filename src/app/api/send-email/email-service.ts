import { getRequestContext } from '@cloudflare/next-on-pages';
import { formatAED } from '@/lib/price';

export interface OrderItemLine {
  name: string;
  brand: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderEmailData {
  ref: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  deliveryAddress: string;
  emirate: string;
  preferredDate: string;
  instructions: string;
  items: OrderItemLine[];
  subtotal: number;
  total: number;
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
  // Calculator breakdown (optional — only sent from rental calculator)
  baseRent?: string;
  extraBwCost?: string;
  extraColorCost?: string;
  a3Surcharge?: string;
  durationDiscount?: string;
  totalContractValue?: string;
  printType?: string;
  paperFormat?: string;
  bwVolume?: string;
  colorVolume?: string;
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

    const rows: any[] = result?.results ?? [];
    const map: Record<string, string> = {};
    rows.forEach((r: any) => { map[r.key] = r.value; });

    if (!map.smtp_user || !map.smtp_pass) return null;

    return {
      host: map.smtp_host || 'smtp.gmail.com',
      port: parseInt(map.smtp_port || '465', 10),
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

// ── Send via worker-mailer (cloudflare:sockets, no eval/new Function) ─────────
// Uses lazy require() so the cloudflare:sockets module is only loaded at
// request time in CF Workers, not at build-time during Next.js page collection.
async function sendOne(
  config: SmtpConfig,
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { WorkerMailer } = require('worker-mailer') as typeof import('worker-mailer');

  const mailer = await WorkerMailer.connect({
    credentials: {
      username: config.user,
      password: config.pass,
    },
    authType: 'plain',
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    startTls: config.port === 587,
  });

  await mailer.send({
    from: { name: config.fromName, email: config.fromEmail },
    to,
    subject,
    html,
  });
}

// ── HTML builders ─────────────────────────────────────────────────────────────

function buildAdminHtml(data: QuoteEmailData): string {
  const hasCalcBreakdown = !!(data.baseRent || data.totalContractValue);
  const calcBreakdown = hasCalcBreakdown ? `
  <div style="margin-top:24px">
    <p style="margin:0 0 10px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Calculator Breakdown</p>
    <table style="width:100%;border-collapse:collapse;background:#101c2e;border-radius:8px;overflow:hidden">
      ${data.printType ? `<tr><td style="padding:7px 12px;color:#9ca3af;font-size:13px;width:52%">Print Type</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.printType}</td></tr>` : ''}
      ${data.paperFormat ? `<tr style="background:#0d1827"><td style="padding:7px 12px;color:#9ca3af;font-size:13px">Paper Format</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.paperFormat}</td></tr>` : ''}
      ${data.bwVolume ? `<tr><td style="padding:7px 12px;color:#9ca3af;font-size:13px">B&W Volume</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.bwVolume}</td></tr>` : ''}
      ${data.colorVolume ? `<tr style="background:#0d1827"><td style="padding:7px 12px;color:#9ca3af;font-size:13px">Colour Volume</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.colorVolume}</td></tr>` : ''}
      ${data.baseRent ? `<tr><td style="padding:7px 12px;color:#9ca3af;font-size:13px">Base Rent</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.baseRent}/mo</td></tr>` : ''}
      ${data.extraBwCost ? `<tr style="background:#0d1827"><td style="padding:7px 12px;color:#9ca3af;font-size:13px">Extra B&W Cost</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.extraBwCost}/mo</td></tr>` : ''}
      ${data.extraColorCost ? `<tr><td style="padding:7px 12px;color:#9ca3af;font-size:13px">Extra Colour Cost</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.extraColorCost}/mo</td></tr>` : ''}
      ${data.a3Surcharge ? `<tr style="background:#0d1827"><td style="padding:7px 12px;color:#9ca3af;font-size:13px">A3 Surcharge</td><td style="padding:7px 12px;color:#fff;font-size:13px">${data.a3Surcharge}/mo</td></tr>` : ''}
      ${data.durationDiscount ? `<tr><td style="padding:7px 12px;color:#9ca3af;font-size:13px">Duration Discount</td><td style="padding:7px 12px;color:#d4f8d4;font-size:13px">-${data.durationDiscount}</td></tr>` : ''}
      <tr style="background:#162236;border-top:1px solid #f5be53/30"><td style="padding:9px 12px;color:#f5be53;font-size:13px;font-weight:700">Monthly Total</td><td style="padding:9px 12px;color:#f5be53;font-size:16px;font-weight:700">${data.estimatedRange}/mo</td></tr>
      ${data.totalContractValue ? `<tr><td style="padding:7px 12px;color:#9ca3af;font-size:12px">Total Contract Value</td><td style="padding:7px 12px;color:#d7e3fc;font-size:12px">${data.totalContractValue}</td></tr>` : ''}
    </table>
  </div>` : '';

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:24px auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
  <h2 style="color:#f5be53;margin-top:0;font-size:20px">New Quote Request — Sahara Printers</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:16px">
    <tr><td style="padding:8px 0;color:#9ca3af;width:140px;vertical-align:top">Name</td><td style="padding:8px 0;color:#fff;font-weight:700">${data.customerName}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Company</td><td style="padding:8px 0;color:#fff">${data.customerCompany || '—'}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Email</td><td style="padding:8px 0"><a href="mailto:${data.customerEmail}" style="color:#f5be53">${data.customerEmail}</a></td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Phone</td><td style="padding:8px 0;color:#fff">${data.customerPhone || '—'}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Configuration</td><td style="padding:8px 0;color:#fff">${data.configuration}</td></tr>
    <tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">Estimate</td><td style="padding:8px 0;color:#f5be53;font-weight:700;font-size:18px">${data.estimatedRange}/mo</td></tr>
  </table>
  ${calcBreakdown}
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

// ── Public API ────────────────────────────────────────────────────────────────

export async function sendQuoteNotification(data: QuoteEmailData): Promise<boolean> {
  const config = await getSmtpConfig();

  if (!config) {
    console.error('[email-service] SMTP not configured — set smtp_user and smtp_pass in Admin → Settings.');
    return false;
  }

  console.log('[email-service] Attempting SMTP via worker-mailer:', {
    host: config.host,
    port: config.port,
    user: config.user ? 'set' : 'MISSING',
    pass: config.pass ? 'set' : 'MISSING',
    to: config.toEmail,
  });

  try {
    const toEmail = data.notificationEmail || config.toEmail;

    await Promise.all([
      sendOne(
        config,
        toEmail,
        `New Quote: ${data.customerName}${data.customerCompany ? ' — ' + data.customerCompany : ''}`,
        buildAdminHtml(data),
      ),
      sendOne(
        config,
        data.customerEmail,
        'Your Quote Request — Sahara Printers',
        buildCustomerHtml(data),
      ),
    ]);

    return true;
  } catch (err) {
    console.error('[email-service] sendQuoteNotification error:', err);
    return false;
  }
}

// ── Order emails ──────────────────────────────────────────────────────────────

function buildOrderRows(items: OrderItemLine[]): string {
  return items.map((it, i) => `
    <tr style="${i % 2 ? 'background:#0d1827' : ''}">
      <td style="padding:8px 12px;color:#fff;font-size:13px">${it.name}<br><span style="color:#9ca3af;font-size:11px">${it.brand}</span></td>
      <td style="padding:8px 12px;color:#d7e3fc;font-size:13px;text-align:center">${it.quantity}</td>
      <td style="padding:8px 12px;color:#d7e3fc;font-size:13px;text-align:right">${formatAED(it.unitPrice)}</td>
      <td style="padding:8px 12px;color:#fff;font-size:13px;text-align:right">${formatAED(it.lineTotal)}</td>
    </tr>`).join('');
}

function buildOrderTable(data: OrderEmailData): string {
  return `
  <table style="width:100%;border-collapse:collapse;background:#101c2e;border-radius:8px;overflow:hidden;margin-top:8px">
    <tr style="background:#162236">
      <td style="padding:8px 12px;color:#f5be53;font-size:11px;text-transform:uppercase;letter-spacing:0.08em">Item</td>
      <td style="padding:8px 12px;color:#f5be53;font-size:11px;text-align:center">Qty</td>
      <td style="padding:8px 12px;color:#f5be53;font-size:11px;text-align:right">Unit</td>
      <td style="padding:8px 12px;color:#f5be53;font-size:11px;text-align:right">Total</td>
    </tr>
    ${buildOrderRows(data.items)}
    <tr style="background:#162236;border-top:1px solid rgba(245,190,83,0.3)">
      <td colspan="3" style="padding:10px 12px;color:#f5be53;font-size:14px;font-weight:700;text-align:right">Order Total</td>
      <td style="padding:10px 12px;color:#f5be53;font-size:16px;font-weight:700;text-align:right">${formatAED(data.total)}</td>
    </tr>
  </table>`;
}

function buildOrderAdminHtml(data: OrderEmailData): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:640px;margin:24px auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
  <h2 style="color:#f5be53;margin-top:0;font-size:20px">New Spare-Parts Order — ${data.ref}</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:8px">
    <tr><td style="padding:6px 0;color:#9ca3af;width:150px">Customer</td><td style="padding:6px 0;color:#fff;font-weight:700">${data.customerName}</td></tr>
    <tr><td style="padding:6px 0;color:#9ca3af">Company</td><td style="padding:6px 0;color:#fff">${data.customerCompany || '—'}</td></tr>
    <tr><td style="padding:6px 0;color:#9ca3af">Email</td><td style="padding:6px 0"><a href="mailto:${data.customerEmail}" style="color:#f5be53">${data.customerEmail}</a></td></tr>
    <tr><td style="padding:6px 0;color:#9ca3af">Mobile</td><td style="padding:6px 0;color:#fff">${data.customerPhone}</td></tr>
    <tr><td style="padding:6px 0;color:#9ca3af;vertical-align:top">Delivery Address</td><td style="padding:6px 0;color:#fff">${data.deliveryAddress}${data.emirate ? ', ' + data.emirate : ''}</td></tr>
    <tr><td style="padding:6px 0;color:#9ca3af">Preferred Date</td><td style="padding:6px 0;color:#fff">${data.preferredDate || '—'}</td></tr>
  </table>
  ${data.instructions ? `<div style="margin-top:14px;padding:14px;background:#101c2e;border-radius:8px;border-left:3px solid #f5be53"><p style="margin:0;color:#d3c5b0;font-style:italic">"${data.instructions}"</p></div>` : ''}
  <p style="margin:20px 0 4px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Order Items</p>
  ${buildOrderTable(data)}
  <p style="margin-top:24px;font-size:11px;color:#4b5563;border-top:1px solid #1e2d42;padding-top:16px">Order ${data.ref} • Placed via saharaprinter.com • ${new Date().toUTCString()}</p>
</div></body></html>`;
}

function buildOrderCustomerHtml(data: OrderEmailData): string {
  return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:640px;margin:24px auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
  <h2 style="color:#f5be53;margin-top:0;font-size:20px">✅ Order Confirmed — ${data.ref}</h2>
  <p>Hi ${data.customerName},</p>
  <p>Thank you for your order with <strong>Sahara Office Equipments</strong>. We've received it and our team will be in touch to confirm delivery to <strong>${data.emirate || 'your address'}</strong>.</p>
  <p style="margin:20px 0 4px;color:#9ca3af;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Your Order</p>
  ${buildOrderTable(data)}
  <div style="background:#101c2e;border-radius:8px;padding:16px;margin:20px 0;border:1px solid rgba(245,190,83,0.2)">
    <p style="margin:0 0 4px;color:#9ca3af;font-size:12px">Delivery to</p>
    <p style="margin:0;color:#fff;font-size:14px">${data.deliveryAddress}${data.emirate ? ', ' + data.emirate : ''}</p>
    ${data.preferredDate ? `<p style="margin:8px 0 0;color:#9ca3af;font-size:12px">Preferred date: <span style="color:#fff">${data.preferredDate}</span></p>` : ''}
  </div>
  <p style="font-size:14px">Questions about your order? Call or WhatsApp us:</p>
  <p><a href="tel:+971503823969" style="color:#f5be53;font-size:16px;font-weight:700">+971 50 382 3969</a></p>
  <p style="margin-top:24px;font-size:11px;color:#4b5563;border-top:1px solid #1e2d42;padding-top:16px">— The Sahara Printers Team &nbsp;|&nbsp; saharaprinter.com</p>
</div></body></html>`;
}

/** Sends the sales notification + customer confirmation for a placed order. */
export async function sendOrderNotification(data: OrderEmailData): Promise<boolean> {
  const config = await getSmtpConfig();
  if (!config) {
    console.error('[email-service] SMTP not configured — cannot send order emails.');
    return false;
  }
  try {
    await Promise.all([
      sendOne(config, config.toEmail, `New Order ${data.ref} — ${data.customerName}`, buildOrderAdminHtml(data)),
      sendOne(config, data.customerEmail, `Your Sahara Order ${data.ref}`, buildOrderCustomerHtml(data)),
    ]);
    return true;
  } catch (err) {
    console.error('[email-service] sendOrderNotification error:', err);
    return false;
  }
}

export async function sendSimpleEmail(
  config: SmtpConfig,
  to: string,
  subject: string,
  html: string,
): Promise<boolean> {
  try {
    await sendOne(config, to, subject, html);
    return true;
  } catch (err) {
    console.error('[email-service] sendSimpleEmail error:', err);
    return false;
  }
}
