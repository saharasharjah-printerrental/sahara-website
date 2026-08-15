import { NextRequest } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

// Single source of truth for the admin_session cookie lifetime — used both as
// the cookie's maxAge (auth route) and the server-side expiry check (every
// route that calls isAdminRequest). Keeping these in one place means they can
// never drift out of sync with each other.
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function getAdminPassword(): Promise<string> {
  try {
    return ((getRequestContext().env as any).ADMIN_PASSWORD || '') as string;
  } catch {
    try { return ((globalThis as any).process?.env?.ADMIN_PASSWORD || '') as string; } catch {}
  }
  return '';
}

export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  const password = await getAdminPassword();
  const session = request.cookies.get('admin_session')?.value;
  if (!password || !session) return false;

  const parts = session.split('.');
  if (parts.length !== 3) return false;

  const [issuedAt, email, signature] = parts;
  const issuedAtMs = Number(issuedAt);
  if (!Number.isFinite(issuedAtMs)) return false;
  if (Date.now() - issuedAtMs > ADMIN_SESSION_MAX_AGE_SECONDS * 1000) return false;

  const payload = `${issuedAt}.${email}`;
  const data = new TextEncoder().encode(`${payload}.${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const expected = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return signature === expected;
}

export async function createAdminSession(email: string, password: string): Promise<string> {
  const issuedAt = Date.now().toString();
  const payload = `${issuedAt}.${email.toLowerCase()}`;
  const data = new TextEncoder().encode(`${payload}.${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const signature = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `${payload}.${signature}`;
}
