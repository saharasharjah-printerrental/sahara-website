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

    const rows: any[] = result?.results ?? result ?? [];
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

// ── Minimal SMTP state machine ────────────────────────────────────────────────

class SmtpSession {
  private buffer = '';
  private dec = new TextDecoder();
  private enc = new TextEncoder();

  constructor(
    private reader: ReadableStreamDefaultReader<Uint8Array>,
    private writer: WritableStreamDefaultWriter<Uint8Array>,
  ) {}

  async readResponse(): Promise<{ code: number; lines: string[] }> {
    const lines: string[] = [];
    while (true) {
      while (!this.buffer.includes('\r\n')) {
        const { value, done } = await this.reader.read();
        if (done) throw new Error('SMTP connection closed unexpectedly');
        this.buffer += this.dec.decode(value, { stream: true });
      }
      const idx = this.buffer.indexOf('\r\n');
      const line = this.buffer.slice(0, idx);
      this.buffer = this.buffer.slice(idx + 2);
      lines.push(line);
      const code = parseInt(line.slice(0, 3), 10);
      const sep = line[3];
      if (sep === ' ' || !sep) return { code, lines };
      if (sep !== '-') throw new Error(`Unexpected SMTP line: ${line}`);
      // sep === '-' means multi-line, keep reading
    }
  }

  async send(data: string) {
    await this.writer.write(this.enc.encode(data + '\r\n'));
  }

  async cmd(command: string, expectedCode: number): Promise<{ code: number; lines: string[] }> {
    await this.send(command);
    const resp = await this.readResponse();
    if (resp.code !== expectedCode) {
      throw new Error(`SMTP ${command.split(' ')[0]} failed ${resp.code}: ${resp.lines.join(' ')}`);
    }
    return resp;
  }
}

// ── Send via cloudflare:sockets (TCP SMTP) ────────────────────────────────────
// Uses new Function() to bypass webpack module resolution — cloudflare:sockets
// is a native Cloudflare Workers module resolved only at runtime, not at build time.
async function sendViaSmtpSocket(
  config: SmtpConfig,
  to: string,
  subject: string,
  html: string,
): Promise<boolean> {
  try {
    // Dynamic import bypassing webpack — cloudflare:sockets is a CF Workers native
    const importCF = new Function('m', 'return import(m)');
    const { connect } = await importCF('cloudflare:sockets');

    const useSSL = config.port === 465;
    const connectOptions = useSSL ? { secureTransport: 'on' as const } : undefined;
    const socket = connect({ hostname: config.host, port: config.port }, connectOptions);

    let reader = socket.readable.getReader() as ReadableStreamDefaultReader<Uint8Array>;
    let writer = socket.writable.getWriter() as WritableStreamDefaultWriter<Uint8Array>;
    let session = new SmtpSession(reader, writer);

    // Greeting
    const greeting = await session.readResponse();
    if (greeting.code !== 220) throw new Error(`Bad greeting: ${greeting.lines[0]}`);

    // EHLO
    const ehlo = await session.cmd('EHLO saharaprinter.com', 250);
    const capabilities = ehlo.lines.join('\n').toUpperCase();

    // STARTTLS for port 587
    if (!useSSL) {
      if (!capabilities.includes('STARTTLS')) throw new Error('Server does not support STARTTLS');
      await session.cmd('STARTTLS', 220);
      // Upgrade to TLS
      const tlsSocket = socket.startTls();
      reader = tlsSocket.readable.getReader() as ReadableStreamDefaultReader<Uint8Array>;
      writer = tlsSocket.writable.getWriter() as WritableStreamDefaultWriter<Uint8Array>;
      session = new SmtpSession(reader, writer);
      // Re-EHLO on TLS channel
      await session.cmd('EHLO saharaprinter.com', 250);
    }

    // AUTH LOGIN
    await session.cmd('AUTH LOGIN', 334);
    await session.cmd(btoa(config.user), 334);
    await session.cmd(btoa(config.pass), 235);

    // Envelope
    await session.cmd(`MAIL FROM:<${config.fromEmail}>`, 250);
    await session.cmd(`RCPT TO:<${to}>`, 250);
    await session.cmd('DATA', 354);

    // Build MIME message — escape lines starting with a dot
    const body = html.replace(/^\./gm, '..');
    const mime = [
      `From: "${config.fromName}" <${config.fromEmail}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      body,
      `.`,
    ].join('\r\n');

    await session.send(mime);
    await session.readResponse(); // 250 OK

    await session.send('QUIT');
    await writer.close().catch(() => {});

    return true;
  } catch (err) {
    console.error('[email-service] cloudflare:sockets SMTP failed:', err);
    return false;
  }
}

// ── Fallback: nodemailer (Node.js dev runtime only) ───────────────────────────
// Also uses new Function() to prevent webpack from bundling it.
// This will succeed in local `npm run dev` (Node.js) and fail gracefully on CF Workers.
async function sendViaNodemailer(
  config: SmtpConfig,
  to: string,
  subject: string,
  html: string,
): Promise<boolean> {
  try {
    const importFn = new Function('m', 'return import(m)');
    const nm = await importFn('nodemailer');
    const nodemailer = nm.default ?? nm;

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.error('[email-service] nodemailer failed:', err);
    return false;
  }
}

// ── Unified send ──────────────────────────────────────────────────────────────
async function sendOne(
  config: SmtpConfig,
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  // Try cloudflare:sockets first (production CF Workers)
  if (await sendViaSmtpSocket(config, to, subject, html)) return;
  // Fall back to nodemailer (local Node.js dev)
  if (await sendViaNodemailer(config, to, subject, html)) return;
  throw new Error(`Email delivery failed to ${to} — both cloudflare:sockets and nodemailer failed`);
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

  console.log('[email-service] Attempting SMTP:', {
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
