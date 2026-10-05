import type { NextRequest, NextResponse } from 'next/server';
import { getAdminPassword } from '@/lib/adminAuth';

const MAX_AGE = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

async function key() {
  const secret = await getAdminPassword();
  if (!secret) throw new Error('Order access signing is not configured');
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

function cookieName(ref: string) {
  return `order_access_${ref}`;
}

export async function createOrderAccess(ref: string): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const signature = await crypto.subtle.sign('HMAC', await key(), encoder.encode(`receipt:${ref}:${expires}`));
  return `${expires}.${Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, '0')).join('')}`;
}

export function setOrderAccess(response: NextResponse, request: NextRequest, ref: string, token: string) {
  response.cookies.set(cookieName(ref), token, {
    httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'lax', path: '/api/', maxAge: MAX_AGE,
  });
}

export async function hasOrderAccess(request: NextRequest, ref: string): Promise<boolean> {
  if (!/^ORD-[A-Za-z0-9-]+$/.test(ref)) return false;
  const token = request.cookies.get(cookieName(ref))?.value || '';
  const match = /^(\d+)\.([a-f0-9]{64})$/.exec(token);
  if (!match) return false;
  const expires = Number(match[1]);
  const now = Math.floor(Date.now() / 1000);
  if (expires <= now || expires > now + MAX_AGE) return false;
  try {
    const bytes = Uint8Array.from(match[2].match(/../g)!, hex => parseInt(hex, 16));
    return await crypto.subtle.verify('HMAC', await key(), bytes, encoder.encode(`receipt:${ref}:${expires}`));
  } catch { return false; }
}
