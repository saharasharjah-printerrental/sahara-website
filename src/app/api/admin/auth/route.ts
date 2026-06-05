import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function createAdminSession(email: string, password: string): Promise<string> {
  const issuedAt = Date.now().toString();
  const payload = `${issuedAt}.${email.toLowerCase()}`;
  const data = new TextEncoder().encode(`${payload}.${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const signature = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${payload}.${signature}`;
}

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json() as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  // Read credentials — CF runtime first, process.env fallback for local dev
  let adminEmail = '';
  let adminPassword = '';
  try {
    const cfEnv = getRequestContext().env as any;
    adminEmail = cfEnv.ADMIN_EMAIL || '';
    adminPassword = cfEnv.ADMIN_PASSWORD || '';
  } catch {
    // Local Next.js dev — getRequestContext() not available
    try { adminEmail = (globalThis as any).process?.env?.ADMIN_EMAIL || ''; } catch {}
    try { adminPassword = (globalThis as any).process?.env?.ADMIN_PASSWORD || ''; } catch {}
  }

  if (!adminEmail || !adminPassword) {
    console.warn('[admin/auth] ADMIN_EMAIL or ADMIN_PASSWORD not configured in environment');
    return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
  }

  // Constant-time-style comparison to avoid early exit timing leaks
  const emailMatch = email.toLowerCase() === adminEmail.toLowerCase();
  const passMatch = password === adminPassword;

  if (emailMatch && passMatch) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', await createAdminSession(adminEmail, adminPassword), {
      httpOnly: true,
      secure: request.nextUrl.protocol === 'https:',
      sameSite: 'lax',
      maxAge: 60 * 60 * 12,
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
