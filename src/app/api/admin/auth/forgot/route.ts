import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getSmtpConfig, sendSimpleEmail } from '@/app/api/send-email/email-service';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string };
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    let adminEmail = '';
    try {
      adminEmail = (getRequestContext().env as any).ADMIN_EMAIL || '';
    } catch {
      try { adminEmail = (globalThis as any).process?.env?.ADMIN_EMAIL || ''; } catch {}
    }

    // Always return success — do not reveal whether the email matched
    if (adminEmail && email.toLowerCase() === adminEmail.toLowerCase()) {
      const config = await getSmtpConfig();
      if (config) {
        const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<div style="max-width:600px;margin:24px auto;background:#071325;color:#d7e3fc;padding:32px;border-radius:12px">
  <h2 style="color:#f5be53;margin-top:0">🔐 Admin Password Recovery</h2>
  <p>A password recovery request was submitted for the Sahara Printer admin panel.</p>
  <div style="background:#101c2e;border-radius:8px;padding:20px;margin:20px 0;border-left:3px solid #f5be53">
    <p style="margin:0;color:#94a3b8;font-size:13px">Your admin credentials are managed via <strong style="color:#f5be53">Cloudflare environment variables</strong>.</p>
    <p style="margin:12px 0 0;color:#94a3b8;font-size:13px">To reset your password:</p>
    <ol style="color:#d7e3fc;font-size:13px;margin-top:8px;padding-left:20px">
      <li>Log in to your <a href="https://dash.cloudflare.com" style="color:#f5be53">Cloudflare Dashboard</a></li>
      <li>Navigate to <strong>Pages → sahara-website → Settings → Environment Variables</strong></li>
      <li>Update <code style="background:#030d1a;padding:2px 6px;border-radius:4px">ADMIN_PASSWORD</code> with your new password</li>
      <li>Redeploy the site for changes to take effect</li>
    </ol>
  </div>
  <p style="font-size:11px;color:#4b5563;border-top:1px solid #1e2d42;padding-top:16px;margin-top:24px">
    If you did not request this, ignore this email. Sahara Printers Admin System.
  </p>
</div>
</body>
</html>`;
        await sendSimpleEmail(config, adminEmail, 'Admin Password Recovery — Sahara Printers', html);
      }
    }

    // Always respond with success regardless of match
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
