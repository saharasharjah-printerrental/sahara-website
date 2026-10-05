import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getPaymentConfig, verifyPayment } from '@/lib/payments';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getEnv() {
  try { return getRequestContext().env as any; } catch { return null; }
}

// Stripe returns via GET (success_url); PayTabs returns via POST (form data).
export async function GET(request: NextRequest) { return handleCallback(request); }
export async function POST(request: NextRequest) { return handleCallback(request); }

async function handleCallback(request: NextRequest): Promise<Response> {
  const env = getEnv();
  const db = env?.DB;
  const url = new URL(request.url);
  const origin = String(env?.NEXT_PUBLIC_SITE_URL || url.origin).replace(/\/$/, '');
  const provider = url.searchParams.get('provider') || '';
  const ref = url.searchParams.get('ref') || '';

  const redirect = (path: string) => NextResponse.redirect(`${origin}${path}`, 303);
  const failed = () => redirect('/checkout/?payment=failed');

  if (!db || !ref) return failed();

  // Gateway transaction reference
  let sessionId = url.searchParams.get('session_id') || undefined;
  let tranRef = url.searchParams.get('tranRef') || url.searchParams.get('tran_ref') || undefined;

  if (provider === 'paytabs' && !tranRef) {
    try {
      const ct = request.headers.get('content-type') || '';
      if (ct.includes('form')) {
        const fd = await request.formData();
        tranRef = String(fd.get('tranRef') || fd.get('tran_ref') || '') || undefined;
      } else if (ct.includes('json')) {
        const j = await request.json() as any;
        tranRef = j.tranRef || j.tran_ref || undefined;
      }
    } catch { /* no body */ }
  }

  try {
    const row = await db.prepare('SELECT * FROM orders WHERE ref = ?').bind(ref).first();
    if (!row || !['pending', 'paid', 'processing', 'dispatched', 'delivered'].includes(row.status)) return failed();
    const cfg = await getPaymentConfig(db);
    const { paid, paymentRef } = await verifyPayment(cfg, provider, { sessionId, tranRef }, {
      ref: row.ref, total: row.total, provider: row.payment_provider, paymentRef: row.payment_ref,
    });

    if (paid) {
      // Conditional update prevents a delayed/replayed callback reverting fulfilment or cancellation.
      if (row.status === 'pending') {
        const updated = await db.prepare(`UPDATE orders SET status = 'paid', updatedAt = ?
          WHERE id = ? AND status = 'pending' AND payment_provider = ? AND payment_ref = ?`)
          .bind(new Date().toISOString(), row.id, provider, paymentRef).run();
        if (updated.meta?.changes !== 1) {
          const current = await db.prepare('SELECT * FROM orders WHERE id = ?').bind(row.id).first();
          if (!current || current.payment_ref !== paymentRef || current.payment_provider !== provider ||
              !['paid', 'processing', 'dispatched', 'delivered'].includes(current.status)) return failed();
        }
      }
      return redirect(`/checkout/receipt/?ref=${encodeURIComponent(ref)}`);
    }
  } catch (e) {
    console.error('[/api/payments/callback] Error:', e);
  }
  return failed();
}
