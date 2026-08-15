import { NextRequest, NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { validateEmail, validateUAEPhone } from '@/lib/emailValidation';
import { parsePriceAED } from '@/lib/price';
import { sendOrderNotification, OrderItemLine } from '../send-email/email-service';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const HEADERS = { 'Cache-Control': 'no-store, max-age=0' };
const ORDER_STATUSES = ['pending', 'paid', 'processing', 'dispatched', 'delivered', 'cancelled'];

function getDB() {
  try {
    return getRequestContext().env.DB as any;
  } catch {
    return null;
  }
}

function makeRef(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Array.from({ length: 4 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 32)]).join('');
  return `ORD-${ymd}-${rand}`;
}

function rowToOrder(r: any) {
  let items: OrderItemLine[] = [];
  try { items = JSON.parse(r.items || '[]'); } catch { items = []; }
  return {
    id: r.id,
    ref: r.ref,
    customerName: r.customer_name,
    customerEmail: r.customer_email,
    customerPhone: r.customer_phone,
    customerCompany: r.customer_company,
    deliveryAddress: r.delivery_address,
    emirate: r.emirate,
    preferredDate: r.preferred_date,
    instructions: r.instructions,
    items,
    subtotal: r.subtotal,
    total: r.total,
    status: r.status,
    emailSent: r.email_sent === 1,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}

export async function GET(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured', orders: [] }, { headers: HEADERS });
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');
    if (ref) {
      const row = await db.prepare('SELECT * FROM orders WHERE ref = ?').bind(ref).first();
      return NextResponse.json({ order: row ? rowToOrder(row) : null }, { headers: HEADERS });
    }
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const result = await db.prepare('SELECT * FROM orders ORDER BY createdAt DESC LIMIT ?').bind(limit).all();
    return NextResponse.json({ orders: (result?.results ?? []).map(rowToOrder) }, { headers: HEADERS });
  } catch (error) {
    console.error('[/api/orders] GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders', orders: [] }, { status: 200, headers: HEADERS });
  }
}

export async function POST(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: HEADERS });

  try {
    const body = await request.json() as any;
    const customer = body.customer || {};
    const delivery = body.delivery || {};
    const rawItems: { id: string; quantity: number }[] = Array.isArray(body.items) ? body.items : [];

    // ── Validate ──────────────────────────────────────────────────────────
    if (!customer.name || !String(customer.name).trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400, headers: HEADERS });
    }
    const emailCheck = validateEmail(String(customer.email || ''));
    if (!emailCheck.valid) return NextResponse.json({ error: emailCheck.error }, { status: 400, headers: HEADERS });

    const phoneCheck = validateUAEPhone(String(customer.phone || ''));
    if (!phoneCheck.valid) return NextResponse.json({ error: phoneCheck.error }, { status: 400, headers: HEADERS });

    if (!delivery.address || !String(delivery.address).trim()) {
      return NextResponse.json({ error: 'Delivery address is required' }, { status: 400, headers: HEADERS });
    }
    if (rawItems.length === 0) {
      return NextResponse.json({ error: 'Your cart is empty' }, { status: 400, headers: HEADERS });
    }

    // ── Build line items from authoritative D1 supply prices ──────────────
    const items: OrderItemLine[] = [];
    for (const raw of rawItems) {
      const qty = Math.max(1, Math.floor(Number(raw.quantity) || 0));
      const supply = await db.prepare('SELECT id, name, brand, price FROM supplies WHERE id = ?').bind(String(raw.id)).first();
      if (!supply) {
        return NextResponse.json({ error: `An item in your cart is no longer available` }, { status: 400, headers: HEADERS });
      }
      const unitPrice = parsePriceAED(supply.price);
      if (unitPrice <= 0) {
        return NextResponse.json({ error: `"${supply.name}" needs a price quote and cannot be ordered online` }, { status: 400, headers: HEADERS });
      }
      items.push({
        name: supply.name,
        brand: supply.brand || '',
        quantity: qty,
        unitPrice,
        lineTotal: unitPrice * qty,
      });
    }

    const subtotal = items.reduce((acc, it) => acc + it.lineTotal, 0);
    const total = subtotal;
    const ref = makeRef();
    const id = `ord-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();

    await db.prepare(`
      INSERT INTO orders
        (id, ref, customer_name, customer_email, customer_phone, customer_company,
         delivery_address, emirate, preferred_date, instructions,
         items, subtotal, total, status, payment_provider, payment_ref, email_sent, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', '', '', 0, ?, ?)
    `).bind(
      id, ref,
      String(customer.name).trim(),
      String(customer.email).trim(),
      String(customer.phone).trim(),
      String(customer.company || '').trim(),
      String(delivery.address).trim(),
      String(delivery.emirate || '').trim(),
      String(delivery.preferredDate || '').trim(),
      String(delivery.instructions || '').trim(),
      JSON.stringify(items), subtotal, total,
      now, now,
    ).run();

    // Emails — don't fail the order if delivery fails, but always record what
    // happened so /admin/orders can show which orders were never announced
    // instead of silently leaving email_provider blank.
    let emailSent = false;
    let emailProvider = 'failed';
    try {
      const result = await sendOrderNotification({
        ref,
        customerName: String(customer.name).trim(),
        customerEmail: String(customer.email).trim(),
        customerPhone: String(customer.phone).trim(),
        customerCompany: String(customer.company || '').trim(),
        deliveryAddress: String(delivery.address).trim(),
        emirate: String(delivery.emirate || '').trim(),
        preferredDate: String(delivery.preferredDate || '').trim(),
        instructions: String(delivery.instructions || '').trim(),
        items, subtotal, total,
      });
      emailSent = result.sent;
      emailProvider = result.sent ? result.provider : 'failed';
    } catch (e) {
      console.error('[/api/orders] order email failed:', e);
    }
    await db.prepare('UPDATE orders SET email_sent = ?, email_provider = ? WHERE id = ?')
      .bind(emailSent ? 1 : 0, emailProvider, id).run()
      .catch((e: unknown) => console.error('[/api/orders] email_sent update failed:', e));

    return NextResponse.json({
      success: true,
      order: { id, ref, customerName: String(customer.name).trim(), customerEmail: String(customer.email).trim(),
        customerPhone: String(customer.phone).trim(), customerCompany: String(customer.company || '').trim(),
        deliveryAddress: String(delivery.address).trim(), emirate: String(delivery.emirate || '').trim(),
        preferredDate: String(delivery.preferredDate || '').trim(), instructions: String(delivery.instructions || '').trim(),
        items, subtotal, total, status: 'pending', emailSent, createdAt: now },
    }, { headers: HEADERS });
  } catch (error) {
    console.error('[/api/orders] POST Error:', error);
    return NextResponse.json({ error: 'Failed to place order', details: String(error) }, { status: 500, headers: HEADERS });
  }
}

export async function PATCH(request: NextRequest) {
  const db = getDB();
  if (!db) return NextResponse.json({ error: 'Database not configured' }, { status: 500, headers: HEADERS });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Order ID required' }, { status: 400, headers: HEADERS });
    const body = await request.json() as any;
    const status = String(body.status || '');
    if (!ORDER_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400, headers: HEADERS });
    }
    await db.prepare('UPDATE orders SET status = ?, updatedAt = ? WHERE id = ?')
      .bind(status, new Date().toISOString(), id).run();
    return NextResponse.json({ success: true }, { headers: HEADERS });
  } catch (error) {
    console.error('[/api/orders] PATCH Error:', error);
    return NextResponse.json({ error: 'Failed to update order', details: String(error) }, { status: 500, headers: HEADERS });
  }
}
