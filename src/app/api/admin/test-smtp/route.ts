import { NextRequest, NextResponse } from 'next/server';
import { getSmtpConfig } from '../../send-email/email-service';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest) {
  const config = await getSmtpConfig();

  if (!config) {
    return NextResponse.json({
      configured: false,
      message: 'SMTP not configured. Go to Admin → Settings and fill in the Gmail SMTP fields.',
      steps: [
        '1. Enable 2-Step Verification on your Gmail account',
        '2. Go to myaccount.google.com → Security → App passwords',
        '3. Create an app password for Mail — copy the 16-char code',
        '4. In Admin → Settings, set: Host=smtp.gmail.com, Port=587 (or 465), User=your@gmail.com, Pass=<app-password>',
      ],
    });
  }

  const diagnosis: Record<string, unknown> = {
    configured: true,
    host: config.host,
    port: config.port,
    userSet: !!config.user,
    passSet: !!config.pass,
    fromEmail: config.fromEmail,
    toEmail: config.toEmail,
    portMode: config.port === 465 ? 'SMTPS (implicit TLS)' : config.port === 587 ? 'STARTTLS' : 'unknown',
  };

  // Attempt a live SMTP connection test via worker-mailer (cloudflare:sockets under the hood).
  // Uses lazy require() so the cloudflare:sockets module is not loaded at build time.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { WorkerMailer } = require('worker-mailer') as typeof import('worker-mailer');

    const testHtml = `<p>SMTP test from Sahara Printers admin panel — ${new Date().toUTCString()}</p>`;
    await WorkerMailer.send(
      {
        credentials: { username: config.user, password: config.pass },
        authType: 'plain',
        host: config.host,
        port: config.port,
        secure: config.port === 465,
        startTls: config.port === 587,
      },
      {
        from: { name: config.fromName, email: config.fromEmail },
        to: config.toEmail,
        subject: 'Sahara Printers — SMTP Test',
        html: testHtml,
      },
    );
    diagnosis.connectionTest = 'ok';
    diagnosis.testEmailSent = `Sent to ${config.toEmail}`;
  } catch (err) {
    diagnosis.connectionTest = `failed: ${String(err)}`;
    diagnosis.hint = config.port === 465
      ? 'Try switching to port 587 (STARTTLS) in Admin → Settings'
      : 'Check if smtp.gmail.com is reachable from Cloudflare Workers and that your app password is correct';
  }

  return NextResponse.json(diagnosis);
}
