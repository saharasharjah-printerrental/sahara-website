import { NextRequest, NextResponse } from 'next/server';
import { getSmtpConfig } from '../../send-email/email-service';

export const runtime = 'edge';

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

  // Attempt TCP connection test via cloudflare:sockets
  try {
    const importCF = new Function('m', 'return import(m)');
    const { connect } = await importCF('cloudflare:sockets');
    const useSSL = config.port === 465;
    const socket = connect(
      { hostname: config.host, port: config.port },
      useSSL ? { secureTransport: 'on' as const } : undefined,
    );
    const reader = socket.readable.getReader() as ReadableStreamDefaultReader<Uint8Array>;
    const dec = new TextDecoder();

    // Try to read the SMTP greeting (220 ...) within 5 seconds
    const timeout = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out after 5s')), 5000),
    );
    const read = reader.read();
    const result = await Promise.race([read, timeout]) as ReadableStreamReadResult<Uint8Array> | null;

    if (result && !result.done && result.value) {
      const greeting = dec.decode(result.value);
      diagnosis.connectionTest = 'ok';
      diagnosis.greeting = greeting.trim().slice(0, 100);
    } else {
      diagnosis.connectionTest = 'failed: empty response';
    }

    reader.releaseLock();
    await socket.close().catch(() => {});
  } catch (err) {
    diagnosis.connectionTest = `failed: ${String(err)}`;
    diagnosis.hint = config.port === 465
      ? 'Try switching to port 587 (STARTTLS) in Admin → Settings'
      : 'Check if smtp.gmail.com is reachable from Cloudflare Workers';
  }

  return NextResponse.json(diagnosis);
}
