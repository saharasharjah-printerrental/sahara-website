import type { NextRequest } from 'next/server';

// Public writes are deliberately enumerated; new API mutations default to admin-only.
export function requiresAdmin(request: NextRequest): boolean {
  let path: string;
  try { path = decodeURIComponent(request.nextUrl.pathname).replace(/\/+$/, ''); }
  catch { return true; }
  const method = request.method;
  const read = method === 'GET' || method === 'HEAD';
  if (!path.startsWith('/api/')) return false;
  if (path === '/api/admin/auth') return !['GET', 'HEAD', 'POST', 'DELETE'].includes(method);
  if (path === '/api/admin/auth/forgot') return method !== 'POST';
  if (path.startsWith('/api/admin/') || path === '/api/admin') return true;
  if (path === '/api/cms') return true;
  if (path === '/api/inquiries') return method !== 'POST';
  if (path === '/api/orders') {
    // The route verifies the order-scoped receipt cookie for this public lookup.
    return !(method === 'POST' || (read && !!request.nextUrl.searchParams.get('ref')));
  }
  if (path === '/api/payments/callback') return !['GET', 'POST'].includes(method);
  if (['/api/payments/create', '/api/leads/whatsapp', '/api/send-email'].includes(path)) {
    return method !== 'POST';
  }
  if (['/api/upload', '/api/convert-image', '/api/ai-jobs'].includes(path)) return true;
  if (request.nextUrl.searchParams.get('includeDrafts') === '1' ||
      request.nextUrl.searchParams.get('all') === 'true') return true;
  return !read && method !== 'OPTIONS';
}
