// Run with Node 22.13+: node --test tests/scripts/security-regressions.cjs
// Real route/middleware code and SQLite, with all external effects isolated.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const ts = require('typescript');
const { NextRequest, NextResponse } = require('next/server');
const root = path.resolve(__dirname, '../..');

function fixture() {
  const sql = new DatabaseSync(':memory:');
  sql.exec(fs.readFileSync(path.join(root, 'database/schema.sql'), 'utf8'));
  sql.exec(fs.readFileSync(path.join(root, 'database/migrations/019_email_provider.sql'), 'utf8'));
  const state = { fetches: [], mails: 0, now: Date.now(), beforeRun: null, mailCalls: [], quoteMail: null, dbDelay: null };
  const db = {
    prepare(query) {
      let args = [];
      return {
        bind(...values) { args = values; return this; },
        async first() { return sql.prepare(query).get(...args) || null; },
        async all() { return { results: sql.prepare(query).all(...args) }; },
        async run() {
          state.beforeRun?.(query);
          const result = { meta: { changes: Number(sql.prepare(query).run(...args).changes) } };
          if (state.dbDelay) await state.dbDelay;
          return result;
        },
      };
    },
  };
  const env = { DB: db, ADMIN_EMAIL: 'operator@example.invalid', ADMIN_PASSWORD: 'synthetic-test-secret', NEXT_PUBLIC_SITE_URL: 'https://audit.invalid' };
  const cache = new Map();
  const TestDate = class extends Date { static now() { return state.now; } };
  function load(relative) {
    const filename = path.resolve(root, relative);
    if (cache.has(filename)) return cache.get(filename);
    const module = { exports: {} };
    const localRequire = (id) => {
      if (id === 'next/server') return { NextRequest, NextResponse };
      if (id === '@cloudflare/next-on-pages') return { getRequestContext: () => ({ env }) };
      if (id.includes('email-service')) return {
        sendOrderNotification: async () => { state.mails++; return { sent: false, provider: 'none' }; },
        sendQuoteNotification: async (data) => {
          state.mails++;
          state.mailCalls.push(data);
          if (state.quoteMail) return state.quoteMail(data);
          return { sent: false, provider: 'none' };
        },
      };
      if (id === 'zod') return require('zod');
      if (id === 'xss') return require('xss');
      if (id.startsWith('@/')) return load(`src/${id.slice(2)}.ts`);
      throw new Error(`Unexpected import: ${id}`);
    };
    vm.runInNewContext(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText, {
      exports: module.exports, module, require: localRequire, console, URL, URLSearchParams, Headers,
      Request, Response, TextEncoder, Uint8Array, crypto: webcrypto, Date: TestDate,
      fetch: async (url, options) => {
        state.fetches.push({ url, options });
        if (!state.fetch) throw new Error('External network disabled');
        return state.fetch(url, options);
      },
    }, { filename });
    cache.set(filename, module.exports);
    return module.exports;
  }
  let ip = 0;
  function request(url, method = 'GET', body, cookie = '') {
    return new NextRequest(`https://audit.invalid${url}`, {
      method, headers: { cookie, 'cf-connecting-ip': `audit-${++ip}`, 'content-type': 'application/json' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  }
  async function dispatch(route, req) {
    const gate = await load('src/middleware.ts').middleware(req, {});
    if (gate.headers.get('x-middleware-next') !== '1') return gate;
    return load(`src/app/api/${route}/route.ts`)[req.method](req);
  }
  const setting = (key, value) => sql.prepare('INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)').run(key, value);
  async function adminCookie() {
    return `admin_session=${await load('src/lib/adminAuth.ts').createAdminSession(env.ADMIN_EMAIL, env.ADMIN_PASSWORD)}`;
  }
  async function order() {
    sql.prepare("INSERT OR IGNORE INTO supplies (id,name,price) VALUES ('supply','Toner','AED 25')").run();
    const res = await dispatch('orders', request('/api/orders/', 'POST', {
      customer: { name: 'Customer', email: 'customer@example.org', phone: '+971501234567' },
      delivery: { address: 'Synthetic address' }, items: [{ id: 'supply', quantity: 2 }],
    }));
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    return { ...data.order, cookie: res.headers.get('set-cookie').split(';')[0], response: res };
  }
  return { sql, state, env, load, request, dispatch, setting, adminCookie, order };
}

test('middleware denies anonymous/forged admin operations; valid sessions and public flows work', async () => {
  const f = fixture();
  const paths = ['/api/products/', '/api/supplies/', '/api/blogs/', '/api/brands/', '/api/clients/',
    '/api/banners/', '/api/faqs/', '/api/logos/', '/api/testimonials/', '/api/upload/', '/api/convert-image/'];
  const privateRequests = paths.flatMap(p => [['POST', p], ['DELETE', `${p}?id=1`]]).concat([
    ['GET', '/api/orders/'], ['HEAD', '/api/orders/'], ['PATCH', '/api/orders/?id=1'],
    ['GET', '/api/inquiries/'], ['PATCH', '/api/inquiries/?id=1'], ['GET', '/api/cms/'],
    ['GET', '/api/admin/test-smtp/'], ['GET', '/api/admin/test-resend/'],
    ['GET', '/api/admin/storage/list/'], ['GET', '/api/admin/fetch-schema/'],
    ['GET', '/api/blogs/?includeDrafts=1'], ['GET', '/api/supplies/?all=true'],
    ['POST', '/api/settings/'], ['DELETE', '/api/%70roducts/?id=1'],
  ]);
  const middleware = f.load('src/middleware.ts').middleware;
  const admin = await f.adminCookie();
  for (const [method, url] of privateRequests) {
    for (const cookie of ['', 'admin_session=forged']) {
      assert.equal((await middleware(f.request(url, method, undefined, cookie), {})).status, 401, `${method} ${url}`);
    }
    assert.equal((await middleware(f.request(url, method, undefined, admin), {})).headers.get('x-middleware-next'), '1', url);
  }
  for (const [method, url] of [
    ['POST', '/api/orders/'], ['POST', '/api/inquiries/'], ['POST', '/api/leads/whatsapp/'],
    ['POST', '/api/send-email/'], ['POST', '/api/admin/auth/'], ['POST', '/api/admin/auth/forgot/'],
    ['GET', '/api/payments/callback/?ref=x'], ['POST', '/api/payments/callback/'],
    ['POST', '/api/payments/create/'], ['GET', '/api/products/'], ['GET', '/api/settings/'],
  ]) assert.equal((await middleware(f.request(url, method), {})).headers.get('x-middleware-next'), '1', url);
  f.sql.close();
});

test('public inquiry creation cannot overwrite an existing lead or choose its status', async () => {
  const f = fixture();
  f.sql.prepare("INSERT INTO inquiries (id,name,status) VALUES ('victim','Original','closed')").run();
  const res = await f.dispatch('inquiries', f.request('/api/inquiries/', 'POST', { id: 'victim', name: 'Attacker', status: 'closed' }));
  const { id } = await res.json();
  assert.equal(res.status, 200);
  assert.notEqual(id, 'victim');
  assert.equal(f.sql.prepare('SELECT name FROM inquiries WHERE id=?').get('victim').name, 'Original');
  assert.equal(f.sql.prepare('SELECT status FROM inquiries WHERE id=?').get(id).status, 'new');
  f.sql.close();
});

test('receipt cookie is HttpOnly, scoped, expiring, tamper resistant; admin receipts still work', async () => {
  const f = fixture();
  const first = await f.order();
  const second = await f.order();
  assert.equal(first.total, 50);
  assert.match(first.response.headers.get('set-cookie'), /HttpOnly/i);
  assert.match(first.response.headers.get('set-cookie'), /Secure/i);
  const url = `/api/orders/?ref=${first.ref}`;
  for (const cookie of ['', first.cookie + '0', second.cookie]) {
    assert.equal((await f.dispatch('orders', f.request(url, 'GET', undefined, cookie))).status, 401);
  }
  for (const cookie of [first.cookie, await f.adminCookie()]) {
    const result = await f.dispatch('orders', f.request(url, 'GET', undefined, cookie));
    assert.equal((await result.json()).order.ref, first.ref);
  }
  assert.equal((await f.dispatch('orders', f.request('/api/orders/', 'GET', undefined, first.cookie))).status, 401);
  assert.equal((await f.dispatch('orders', f.request('/api/orders/', 'GET', undefined, await f.adminCookie()))).status, 200);
  f.state.now += 8 * 86400 * 1000;
  assert.equal((await f.dispatch('orders', f.request(url, 'GET', undefined, first.cookie))).status, 401);
  f.sql.close();
});

async function startPayment(f, provider = 'stripe') {
  const order = await f.order();
  f.setting('site_settings', JSON.stringify({ paymentProvider: provider }));
  f.setting('stripe_secret_key', 'synthetic');
  f.setting('paytabs_server_key', 'synthetic');
  f.setting('paytabs_profile_id', '123');
  f.state.fetch = async () => Response.json(provider === 'stripe'
    ? { id: 'cs_expected', url: 'https://checkout.stripe.com/synthetic' }
    : { tran_ref: 'pt_expected', redirect_url: 'https://secure.paytabs.com/synthetic' });
  assert.equal((await f.dispatch('payments/create', f.request('/api/payments/create/', 'POST', { ref: order.ref }))).status, 401);
  assert.equal(f.state.fetches.length, 0);
  const result = await f.dispatch('payments/create', f.request('/api/payments/create/', 'POST', { ref: order.ref }, order.cookie));
  assert.equal(result.status, 200);
  assert.equal((await result.json()).online, true);
  const stored = f.sql.prepare('SELECT * FROM orders WHERE id=?').get(order.id);
  assert.equal(stored.payment_provider, provider);
  assert.equal(stored.payment_ref, provider === 'stripe' ? 'cs_expected' : 'pt_expected');
  return order;
}

test('Stripe callback matches transaction, order, amount, currency and completion; replay preserves fulfilment', async () => {
  const f = fixture();
  const order = await startPayment(f);
  const callback = `/api/payments/callback/?provider=stripe&ref=${order.ref}&session_id=cs_expected`;
  const valid = { id: 'cs_expected', mode: 'payment', status: 'complete', payment_status: 'paid', client_reference_id: order.ref, currency: 'aed', amount_total: 5000 };
  for (const overrides of [{ client_reference_id: 'OTHER' }, { amount_total: 1 }, { currency: 'usd' },
    { payment_status: 'unpaid' }, { mode: 'subscription' }, { status: 'open' }, { id: 'cs_other' }]) {
    f.state.fetch = async () => Response.json({ ...valid, ...overrides });
    const res = await f.dispatch('payments/callback', f.request(callback));
    assert.match(res.headers.get('location'), /payment=failed/);
    assert.equal(f.sql.prepare('SELECT status FROM orders WHERE id=?').get(order.id).status, 'pending');
  }
  f.state.fetch = async () => Response.json(valid);
  const other = await f.order();
  const crossOrder = await f.dispatch('payments/callback', f.request(callback.replace(order.ref, other.ref)));
  assert.match(crossOrder.headers.get('location'), /payment=failed/);
  const success = await f.dispatch('payments/callback', f.request(callback));
  assert.match(success.headers.get('location'), /checkout\/receipt/);
  assert.equal(f.sql.prepare('SELECT status FROM orders WHERE id=?').get(order.id).status, 'paid');
  f.sql.prepare("UPDATE orders SET status='dispatched' WHERE id=?").run(order.id);
  await f.dispatch('payments/callback', f.request(callback));
  assert.equal(f.sql.prepare('SELECT status FROM orders WHERE id=?').get(order.id).status, 'dispatched');
  f.sql.prepare("UPDATE orders SET status='cancelled' WHERE id=?").run(order.id);
  assert.match((await f.dispatch('payments/callback', f.request(callback))).headers.get('location'), /payment=failed/);
  f.sql.close();
});

test('PayTabs validates sale type, amount, currency and order and accepts JSON callbacks without a customer cookie', async () => {
  const f = fixture();
  const order = await startPayment(f, 'paytabs');
  const url = `/api/payments/callback/?provider=paytabs&ref=${order.ref}`;
  const valid = { tran_ref: 'pt_expected', tran_type: 'Sale', cart_id: order.ref, cart_currency: 'AED', cart_amount: '50.00', payment_result: { response_status: 'A' } };
  for (const changes of [{ cart_id: 'OTHER' }, { cart_currency: 'USD' }, { cart_amount: '0.01' }, { tran_type: 'Refund' }, { payment_result: { response_status: 'D' } }]) {
    f.state.fetch = async () => Response.json({ ...valid, ...changes });
    assert.match((await f.dispatch('payments/callback', f.request(url, 'POST', { tran_ref: 'pt_expected' }))).headers.get('location'), /payment=failed/);
  }
  f.state.fetch = async () => Response.json(valid);
  assert.match((await f.dispatch('payments/callback', f.request(url, 'POST', { tran_ref: 'pt_expected' }))).headers.get('location'), /checkout\/receipt/);
  assert.equal(f.sql.prepare('SELECT status FROM orders WHERE id=?').get(order.id).status, 'paid');
  f.sql.close();
});

test('callback conditional update does not race cancellation', async () => {
  const f = fixture();
  const order = await startPayment(f);
  f.state.fetch = async () => Response.json({ id: 'cs_expected', mode: 'payment', status: 'complete', payment_status: 'paid', client_reference_id: order.ref, currency: 'aed', amount_total: 5000 });
  f.state.beforeRun = query => {
    if (query.includes("SET status = 'paid'")) f.sql.prepare("UPDATE orders SET status='cancelled' WHERE id=?").run(order.id);
  };
  const res = await f.dispatch('payments/callback', f.request(`/api/payments/callback/?provider=stripe&ref=${order.ref}&session_id=cs_expected`));
  assert.match(res.headers.get('location'), /payment=failed/);
  assert.equal(f.sql.prepare('SELECT status FROM orders WHERE id=?').get(order.id).status, 'cancelled');
  f.sql.close();
});

test('offline and external payment modes preserve legitimate order/receipt flows', async () => {
  const f = fixture();
  const order = await f.order();
  for (const provider of ['none', 'external']) {
    f.setting('site_settings', JSON.stringify({ paymentProvider: provider, paymentGatewayUrl: 'https://payments.example.org/checkout' }));
    const response = await f.dispatch('payments/create', f.request('/api/payments/create/', 'POST', { ref: order.ref }, order.cookie));
    const data = await response.json();
    assert.equal(response.status, 200);
    assert.equal(data.online, provider === 'external');
    assert.equal(f.sql.prepare('SELECT status FROM orders WHERE id=?').get(order.id).status, 'pending');
    assert.equal((await f.dispatch('orders', f.request(`/api/orders/?ref=${order.ref}`, 'GET', undefined, order.cookie))).status, 200);
  }
  assert.equal(f.state.fetches.length, 0);
  f.sql.close();
});

test('public product-by-ID lookup hides inactive products; admin can still edit them', async () => {
  const f = fixture();
  f.sql.prepare("INSERT INTO products (id,name,is_active) VALUES ('draft','Draft',0)").run();
  const url = '/api/products/?id=draft';
  assert.equal((await (await f.dispatch('products', f.request(url))).json()).products.length, 0);
  assert.equal((await (await f.dispatch('products', f.request(url, 'GET', undefined, await f.adminCookie()))).json()).products.length, 1);
  f.sql.close();
});

test('HTML sanitizer removes executable markup while preserving article formatting and trusted video', () => {
  const f = fixture();
  const { sanitizeHtml } = f.load('src/lib/sanitizeHtml.ts');
  const html = sanitizeHtml('<h2>Title</h2><p><strong>Text</strong> <a href="/services/">link</a></p><table><tr><td>1</td></tr></table><img src="https://example.org/a.webp" onerror="alert(1)"><script>alert(1)</script><svg onload="alert(1)"></svg><a href="java&#x73;cript:alert(1)">bad</a><iframe src="https://evil.invalid/"></iframe>');
  assert.match(html, /<strong>Text<\/strong>/);
  assert.match(html, /href="\/services\/"/);
  assert.match(html, /<table>/);
  assert.doesNotMatch(html, /onerror|<script|<svg|javascript:|evil.invalid/i);
  assert.match(sanitizeHtml('<iframe src="https://www.youtube.com/embed/example" allowfullscreen></iframe>'), /src="https:\/\/www.youtube.com\/embed\/example"/);
  f.sql.close();
});

test('every raw JSON-LD expression escapes script-closing markup, including nested expressions', () => {
  let checked = 0;
  function walk(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) { walk(file); continue; }
      if (!file.endsWith('.tsx')) continue;
      const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      function visit(node) {
        if (ts.isJsxAttribute(node) && node.name.getText(source) === 'dangerouslySetInnerHTML') {
          const text = node.getText(source);
          if (text.includes('JSON.stringify(')) {
            assert.ok(text.includes('.replace(/</g, "\\\\u003c")'), file);
            checked++;
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(source);
    }
  }
  walk(path.join(root, 'src'));
  assert.ok(checked > 20);
});

test('Chrome cannot execute stored HTML or JSON-LD payloads after sanitization', async () => {
  const { chromium } = require('playwright');
  const installedChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const executablePath = process.env.SECURITY_CHROME_PATH || (fs.existsSync(installedChrome) ? installedChrome : chromium.executablePath());
  const browser = await chromium.launch({ headless: true, executablePath });
  const f = fixture();
  try {
    const page = await browser.newPage();
    await page.route('**/*', route => route.abort());
    const { sanitizeHtml } = f.load('src/lib/sanitizeHtml.ts');
    const payload = '<img src=x onerror=window.__auditXss=1><svg onload=window.__auditXss=1></svg><a href="java&#x73;cript:window.__auditXss=1">click</a><script>window.__auditXss=1</script>';
    const source = ts.createSourceFile('page.tsx', fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    let expression;
    function visit(node) {
      if (ts.isPropertyAssignment(node) && node.name.getText(source) === '__html') expression = node.initializer.getText(source);
      ts.forEachChild(node, visit);
    }
    visit(source);
    assert.ok(expression);
    const faqSchema = { answer: '</script><script>window.__auditXss=1</script>' };
    const serialized = vm.runInNewContext(expression, { faqSchema });
    await page.setContent('<meta http-equiv="Content-Security-Policy" content="script-src &apos;self&apos; &apos;unsafe-inline&apos;; img-src data: https:"><script type="application/ld+json">' + serialized + '</script><main></main>');
    await page.locator('main').evaluate((element, html) => { element.innerHTML = html; }, sanitizeHtml(payload));
    assert.deepEqual(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent()), faqSchema);
    assert.equal(await page.evaluate(() => window.__auditXss), undefined);
    assert.equal(await page.locator('main [onerror], main [onload], main script, main svg').count(), 0);
    await page.locator('main a').click();
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await page.evaluate(() => window.__auditXss), undefined);
  } finally {
    f.sql.close();
    await browser.close();
  }
});

const quotePayload = {
  customerName: 'Quote Customer',
  customerEmail: 'customer@example.org',
  customerPhone: '+971501234567',
  customerCompany: 'Example LLC',
  configuration: 'MPS rental',
  message: 'Please quote a rental package.',
  estimatedRange: 'AED 900–1200',
};

function inquiryCount(f) {
  return f.sql.prepare('SELECT COUNT(*) AS n FROM inquiries').get().n;
}

test('send-email quote: successful delivery returns success and records the inquiry as emailed', async () => {
  const f = fixture();
  f.state.quoteMail = async () => ({ sent: true, customerNotified: true, provider: 'resend' });
  const res = await f.dispatch('send-email', f.request('/api/send-email/', 'POST', quotePayload));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).success, true);
  assert.equal(f.state.mailCalls.length, 1);
  const row = f.sql.prepare('SELECT * FROM inquiries').get();
  assert.equal(row.email_sent, 1);
  assert.equal(row.email_provider, 'resend');
  assert.equal(row.email, 'customer@example.org');
  f.sql.close();
});

test('send-email quote: delivery failure falls back to saved lead and still reports received', async () => {
  const f = fixture();
  f.state.quoteMail = async () => ({ sent: false, customerNotified: false, provider: 'none' });
  const res = await f.dispatch('send-email', f.request('/api/send-email/', 'POST', quotePayload));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).success, true);
  const row = f.sql.prepare('SELECT * FROM inquiries').get();
  assert.equal(row.email_sent, 0);
  assert.equal(row.email_provider, '');
  f.sql.close();
});

test('send-email quote: delivery succeeds even when D1 persistence fails', async () => {
  const f = fixture();
  f.state.quoteMail = async () => ({ sent: true, customerNotified: true, provider: 'smtp' });
  f.state.beforeRun = () => { throw new Error('D1 unavailable'); };
  const res = await f.dispatch('send-email', f.request('/api/send-email/', 'POST', quotePayload));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).success, true);
  assert.equal(inquiryCount(f), 0);
  f.sql.close();
});

test('send-email quote: returns 503 only when both delivery and persistence fail', async () => {
  const f = fixture();
  f.state.quoteMail = async () => { throw new Error('mail transport down'); };
  f.state.beforeRun = () => { throw new Error('D1 unavailable'); };
  const res = await f.dispatch('send-email', f.request('/api/send-email/', 'POST', quotePayload));
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, 'Unable to receive your request. Please try again or contact us by phone or WhatsApp.');
  assert.equal(inquiryCount(f), 0);
  f.sql.close();
});

test('send-email quote: D1 write is awaited before responding, not fire-and-forget', async () => {
  const f = fixture();
  f.state.quoteMail = async () => ({ sent: true, customerNotified: true, provider: 'resend' });
  let release;
  f.state.dbDelay = new Promise(resolve => { release = resolve; });
  const pending = f.dispatch('send-email', f.request('/api/send-email/', 'POST', quotePayload));
  const settled = await Promise.race([pending.then(() => 'settled'), new Promise(r => setTimeout(() => r('pending'), 100))]);
  assert.equal(settled, 'pending', 'response returned before the D1 write resolved');
  release();
  const res = await pending;
  assert.equal(res.status, 200);
  assert.equal(inquiryCount(f), 1);
  f.sql.close();
});

test('send-email quote: malformed JSON, oversized body, wrong content type and honeypot send nothing and write nothing', async () => {
  const f = fixture();
  f.state.quoteMail = async () => ({ sent: true, customerNotified: true, provider: 'resend' });

  const malformed = await f.dispatch('send-email', new NextRequest('https://audit.invalid/api/send-email/', {
    method: 'POST', headers: { 'content-type': 'application/json', 'cf-connecting-ip': 'audit-m1' }, body: '{"customerName":',
  }));
  assert.equal(malformed.status, 400);

  const oversized = await f.dispatch('send-email', f.request('/api/send-email/', 'POST', { ...quotePayload, message: 'x'.repeat(17_000) }));
  assert.equal(oversized.status, 413);

  const wrongType = await f.dispatch('send-email', new NextRequest('https://audit.invalid/api/send-email/', {
    method: 'POST', headers: { 'content-type': 'text/plain', 'cf-connecting-ip': 'audit-m2' }, body: JSON.stringify(quotePayload),
  }));
  assert.equal(wrongType.status, 415);

  const honeypot = await f.dispatch('send-email', f.request('/api/send-email/', 'POST', { ...quotePayload, website: 'https://spam.invalid' }));
  assert.equal(honeypot.status, 400);

  assert.equal(f.state.mailCalls.length, 0);
  assert.equal(f.state.mails, 0);
  assert.equal(inquiryCount(f), 0);
  f.sql.close();
});

test('send-email quote: visitor-supplied notification recipient cannot override the server-configured one', async () => {
  const f = fixture();
  f.state.quoteMail = async () => ({ sent: true, customerNotified: true, provider: 'resend' });
  const res = await f.dispatch('send-email', f.request('/api/send-email/', 'POST', { ...quotePayload, notificationEmail: 'attacker@evil.invalid', to: 'attacker@evil.invalid', adminEmail: 'attacker@evil.invalid' }));
  assert.equal(res.status, 200);
  assert.equal(f.state.mailCalls.length, 1);
  assert.equal(f.state.mailCalls[0].notificationEmail, '', 'mock sender must see only the server-controlled (empty) recipient slot');
  f.sql.close();
});
