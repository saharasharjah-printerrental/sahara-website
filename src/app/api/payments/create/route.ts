import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getPaymentConfig, createPaymentSession } from '@/lib/payments';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const HEADERS = { 'Cache-Control': 'no-store, max-age=0' };

function getEnv() {
  try { return getRequestContext().env as any; } catch { return null; }
}

export async function POST(request: NextRequest) {
  const env = getEnv();
  const db = env?.DB;
  if (!db) return NextResponse.json({ online: false, redirectUrl: '' }, { headers: HEADERS });

  try {
    const body = await request.json() as any;
    const ref = String(body.ref || '').trim();
    if (!ref) return NextResponse.json({ error: 'Order reference required' }, { status: 400, headers: HEADERS });

    const row = await db.prepare('SELECT * FROM orders WHERE ref = ?').bind(ref).first();
    if (!row) return NextResponse.json({ error: 'Order not found' }, { status: 404, headers: HEADERS });

    let items: any[] = [];
    try { items = JSON.parse(row.items || '[]'); } catch { items = []; }

    const cfg = await getPaymentConfig(db);
    const origin = String(env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/$/, '');

    const result = await createPaymentSession(cfg, {
      ref: row.ref,
      total: row.total,
      customerName: row.customer_name,
      customerEmail: row.customer_email,
      customerPhone: row.customer_phone,
      deliveryAddress: row.delivery_address,
      emirate: row.emirate,
      items: items.map((it: any) => ({
        name: String(it.name || 'Item'),
        quantity: Number(it.quantity) || 1,
        unitPrice: Number(it.unitPrice) || 0,
      })),
    }, origin);

    if (result.online && result.redirectUrl) {
      await db.prepare('UPDATE orders SET payment_provider = ?, updatedAt = ? WHERE ref = ?')
        .bind(cfg.provider, new Date().toISOString(), ref).run()
        .catch((e: unknown) => console.error('[/api/payments/create] provider update failed:', e));
    }

    return NextResponse.json(result, { headers: HEADERS });
  } catch (e) {
    console.error('[/api/payments/create] Error:', e);
    // Never block the order — fall back to the no-online-payment path.
    return NextResponse.json({ online: false, redirectUrl: '' }, { headers: HEADERS });
  }
}
