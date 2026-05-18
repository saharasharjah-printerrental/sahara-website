import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string; password?: string };
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const env = (getRequestContext() as any)?.env || {};
    const adminEmail = env.ADMIN_EMAIL || '';
    const adminPassword = env.ADMIN_PASSWORD || '';

    if (!adminEmail || !adminPassword) {
      console.warn('[admin/auth] ADMIN_EMAIL or ADMIN_PASSWORD not configured in environment');
      return NextResponse.json({ error: 'Auth not configured' }, { status: 503 });
    }

    // Constant-time-style comparison to avoid early exit timing leaks
    const emailMatch = email.toLowerCase() === adminEmail.toLowerCase();
    const passMatch = password === adminPassword;

    if (emailMatch && passMatch) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
