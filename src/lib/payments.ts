// Server-side payment gateway integration (Stripe + PayTabs hosted pages).
// Credentials are read from the D1 `settings` table — never exposed to the client.
// All network calls use fetch() so this runs on the Cloudflare edge runtime.

export type PaymentProvider = 'none' | 'external' | 'stripe' | 'paytabs';

export interface PaymentConfig {
  provider: PaymentProvider;
  externalUrl: string;
  stripeSecretKey: string;
  paytabsProfileId: string;
  paytabsServerKey: string;
  paytabsRegion: string;
}

export interface PaymentOrderItem {
  name: string;
  quantity: number;
  unitPrice: number; // AED
}

export interface PaymentOrder {
  ref: string;
  total: number; // AED
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  emirate: string;
  items: PaymentOrderItem[];
}

// PayTabs regional endpoints
const PAYTABS_ENDPOINTS: Record<string, string> = {
  ARE: 'https://secure.paytabs.com',
  SAU: 'https://secure.paytabs.sa',
  EGY: 'https://secure-egypt.paytabs.com',
  OMN: 'https://secure-oman.paytabs.com',
  JOR: 'https://secure-jordan.paytabs.com',
  GLOBAL: 'https://secure-global.paytabs.com',
};

function paytabsBase(region: string): string {
  return PAYTABS_ENDPOINTS[(region || 'ARE').toUpperCase()] || PAYTABS_ENDPOINTS.ARE;
}

/** Reads the configured payment provider + credentials from D1 `settings`. */
export async function getPaymentConfig(db: any): Promise<PaymentConfig> {
  const cfg: PaymentConfig = {
    provider: 'none', externalUrl: '',
    stripeSecretKey: '', paytabsProfileId: '', paytabsServerKey: '', paytabsRegion: 'ARE',
  };
  if (!db) return cfg;
  try {
    const keys = ['site_settings', 'stripe_secret_key', 'paytabs_profile_id', 'paytabs_server_key', 'paytabs_region'];
    const result = await db
      .prepare(`SELECT key, value FROM settings WHERE key IN (${keys.map(() => '?').join(',')})`)
      .bind(...keys).all();
    const map: Record<string, string> = {};
    for (const r of result?.results ?? []) map[r.key] = r.value;

    cfg.stripeSecretKey = map.stripe_secret_key || '';
    cfg.paytabsProfileId = map.paytabs_profile_id || '';
    cfg.paytabsServerKey = map.paytabs_server_key || '';
    cfg.paytabsRegion = map.paytabs_region || 'ARE';

    try {
      const site = JSON.parse(map.site_settings || '{}');
      cfg.externalUrl = String(site.paymentGatewayUrl || '');
      const provider = String(site.paymentProvider || 'none') as PaymentProvider;
      cfg.provider = ['none', 'external', 'stripe', 'paytabs'].includes(provider) ? provider : 'none';
      // Legacy fallback: the old "Enable Payment Link" toggle implies external mode.
      if (cfg.provider === 'none' && site.paymentGatewayEnabled && cfg.externalUrl) {
        cfg.provider = 'external';
      }
    } catch { /* keep defaults */ }
  } catch (e) {
    console.error('[payments] getPaymentConfig failed:', e);
  }
  return cfg;
}

/** True when the provider needs valid credentials and has them. */
export function isProviderReady(cfg: PaymentConfig): boolean {
  if (cfg.provider === 'stripe') return !!cfg.stripeSecretKey;
  if (cfg.provider === 'paytabs') return !!cfg.paytabsProfileId && !!cfg.paytabsServerKey;
  if (cfg.provider === 'external') return !!cfg.externalUrl;
  return false;
}

// ── Stripe ──────────────────────────────────────────────────────────────────

async function createStripeSession(cfg: PaymentConfig, order: PaymentOrder, origin: string): Promise<PaymentSessionResult> {
  const params = new URLSearchParams();
  params.set('mode', 'payment');
  params.set('client_reference_id', order.ref);
  if (order.customerEmail) params.set('customer_email', order.customerEmail);
  params.set('success_url', `${origin}/api/payments/callback?provider=stripe&ref=${encodeURIComponent(order.ref)}&session_id={CHECKOUT_SESSION_ID}`);
  params.set('cancel_url', `${origin}/checkout/?payment=cancelled`);
  order.items.forEach((it, i) => {
    params.set(`line_items[${i}][quantity]`, String(it.quantity));
    params.set(`line_items[${i}][price_data][currency]`, 'aed');
    params.set(`line_items[${i}][price_data][unit_amount]`, String(Math.round(it.unitPrice * 100)));
    params.set(`line_items[${i}][price_data][product_data][name]`, it.name.slice(0, 250) || 'Item');
  });

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cfg.stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });
  const data = await res.json() as any;
  if (!res.ok || !data.url || !data.id) {
    throw new Error(data?.error?.message || 'Stripe session creation failed');
  }
  return { redirectUrl: data.url, paymentRef: data.id, online: true };
}

async function verifyStripePayment(cfg: PaymentConfig, sessionId: string, order: ExpectedPayment): Promise<boolean> {
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: { Authorization: `Bearer ${cfg.stripeSecretKey}` },
  });
  const data = await res.json() as any;
  return res.ok && data?.id === sessionId && data?.mode === 'payment' &&
    data?.status === 'complete' && data?.payment_status === 'paid' &&
    data?.client_reference_id === order.ref && data?.currency === 'aed' &&
    data?.amount_total === Math.round(order.total * 100);
}

// ── PayTabs ─────────────────────────────────────────────────────────────────

async function createPayTabsSession(cfg: PaymentConfig, order: PaymentOrder, origin: string): Promise<PaymentSessionResult> {
  const base = paytabsBase(cfg.paytabsRegion);
  const callback = `${origin}/api/payments/callback?provider=paytabs&ref=${encodeURIComponent(order.ref)}`;
  const body = {
    profile_id: Number(cfg.paytabsProfileId),
    tran_type: 'sale',
    tran_class: 'ecom',
    cart_id: order.ref,
    cart_currency: 'AED',
    cart_amount: Number(order.total.toFixed(2)),
    cart_description: `Sahara Office Equipments order ${order.ref}`,
    paypage_lang: 'en',
    customer_details: {
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      street1: order.deliveryAddress || 'N/A',
      city: order.emirate || 'Dubai',
      state: order.emirate || 'Dubai',
      country: 'AE',
      zip: '00000',
    },
    return: callback,
    callback,
  };
  const res = await fetch(`${base}/payment/request`, {
    method: 'POST',
    headers: { authorization: cfg.paytabsServerKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json() as any;
  if (!res.ok || !data?.redirect_url || !data?.tran_ref) {
    throw new Error(data?.message || 'PayTabs payment request failed');
  }
  return { redirectUrl: data.redirect_url, paymentRef: data.tran_ref, online: true };
}

async function verifyPayTabsPayment(cfg: PaymentConfig, tranRef: string, order: ExpectedPayment): Promise<boolean> {
  const base = paytabsBase(cfg.paytabsRegion);
  const res = await fetch(`${base}/payment/query`, {
    method: 'POST',
    headers: { authorization: cfg.paytabsServerKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile_id: Number(cfg.paytabsProfileId), tran_ref: tranRef }),
  });
  const data = await res.json() as any;
  // response_status 'A' = Authorised
  return res.ok && data?.tran_ref === tranRef && data?.payment_result?.response_status === 'A' &&
    String(data?.tran_type).toLowerCase() === 'sale' && data?.cart_id === order.ref &&
    data?.cart_currency === 'AED' &&
    Math.round(Number(data?.cart_amount) * 100) === Math.round(order.total * 100);
}

// ── Public API ──────────────────────────────────────────────────────────────

export interface PaymentSessionResult {
  paymentRef?: string;
  /** Where to send the customer next. Empty when the provider is "none". */
  redirectUrl: string;
  /** True when an online gateway will collect payment before the receipt. */
  online: boolean;
}

/**
 * Creates a hosted-payment session for the order.
 * Returns an empty redirectUrl (online:false) when no gateway is configured
 * or the provider is misconfigured — the order is still recorded as pending.
 */
export async function createPaymentSession(
  cfg: PaymentConfig, order: PaymentOrder, origin: string,
): Promise<PaymentSessionResult> {
  if (!isProviderReady(cfg)) return { redirectUrl: '', online: false };
  try {
    if (cfg.provider === 'stripe') {
      return await createStripeSession(cfg, order, origin);
    }
    if (cfg.provider === 'paytabs') {
      return await createPayTabsSession(cfg, order, origin);
    }
    if (cfg.provider === 'external') {
      return { redirectUrl: cfg.externalUrl, online: true };
    }
  } catch (e) {
    console.error('[payments] createPaymentSession failed:', e);
  }
  return { redirectUrl: '', online: false };
}

/** Verifies a completed payment on gateway return. */
export interface ExpectedPayment {
  ref: string;
  total: number;
  provider: string;
  paymentRef: string;
}

export async function verifyPayment(
  cfg: PaymentConfig, provider: string, ref: { sessionId?: string; tranRef?: string },
  order: ExpectedPayment,
): Promise<{ paid: boolean; paymentRef: string }> {
  const suppliedRef = provider === 'stripe' ? ref.sessionId : ref.tranRef;
  if (!order || !Number.isFinite(order.total) || order.total <= 0 ||
      provider !== order.provider || !order.paymentRef || suppliedRef !== order.paymentRef) {
    return { paid: false, paymentRef: '' };
  }
  try {
    if (provider === 'stripe' && ref.sessionId) {
      return { paid: await verifyStripePayment(cfg, ref.sessionId, order), paymentRef: ref.sessionId };
    }
    if (provider === 'paytabs' && ref.tranRef) {
      return { paid: await verifyPayTabsPayment(cfg, ref.tranRef, order), paymentRef: ref.tranRef };
    }
  } catch (e) {
    console.error('[payments] verifyPayment failed:', e);
  }
  return { paid: false, paymentRef: ref.sessionId || ref.tranRef || '' };
}
