const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3202";
const checks = [];

function add(name, ok, detail) {
  checks.push({ name, ok, detail });
}

async function get(path) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  return {
    status: response.status,
    body: await response.text(),
    location: response.headers.get("location") || "",
  };
}

(async () => {
  let response = await get("/quote/");
  add("quote index 200", response.status === 200 && response.body.includes("Printer Rental"), `status=${response.status}`);

  response = await get("/quote/paper-shredder-rental/");
  add("shredder quote 200", response.status === 200 && response.body.includes("325Ci - AED 900/month"), `status=${response.status}`);

  response = await get("/quote/label-printer-rental/");
  add("label quote 200", response.status === 200 && response.body.includes("AED 549/month"), `status=${response.status}`);

  response = await get("/quote/not-a-service/");
  add("invalid service 404", response.status === 404, `status=${response.status}`);

  response = await get("/get-quote/");
  add("legacy get-quote redirects", [301, 302, 307, 308].includes(response.status), `status=${response.status}; location=${response.location}`);

  response = await get("/services/paper-shredder-rental/");
  add(
    "shredder service SSR prices",
    response.status === 200 &&
      response.body.includes("AED 450/month") &&
      response.body.includes("AED 900/month") &&
      !response.body.includes("AED 150/month"),
    `status=${response.status}`,
  );
  add(
    "shredder service schema prices",
    response.body.includes('"price":"450"') && response.body.includes('"price":"900"'),
    "schema price strings checked",
  );

  response = await get("/services/printer-rental/");
  add(
    "label offer service SSR",
    response.status === 200 && response.body.includes("AED 549/month") && response.body.includes("300 gsm"),
    `status=${response.status}`,
  );

  response = await get("/api/inquiries/");
  add("anonymous inquiries denied", response.status === 401, `status=${response.status}`);

  response = await get("/api/orders/");
  add("anonymous orders denied", response.status === 401, `status=${response.status}`);

  let adminResponse = await fetch(`${base}/api/admin/auth/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: "admin@test.local", password: "test-admin-password" }),
  });
  const adminCookie = adminResponse.headers.get("set-cookie") || "";
  add(
    "admin login sets HttpOnly session",
    adminResponse.status === 200 && adminCookie.includes("admin_session=") && /httponly/i.test(adminCookie),
    `status=${adminResponse.status}`,
  );

  adminResponse = await fetch(`${base}/api/orders/`, { headers: { cookie: adminCookie } });
  add("authenticated admin can list orders", adminResponse.status === 200, `status=${adminResponse.status}`);

  let apiResponse = await fetch(`${base}/api/send-email/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ customerName: [], customerEmail: "bad" }),
  });
  add("malformed quote rejected", apiResponse.status === 400, `status=${apiResponse.status}`);

  apiResponse = await fetch(`${base}/api/send-email/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      customerName: "Worker Preview",
      customerEmail: "preview@example.com",
      customerPhone: "+971501234567",
      configuration: "Paper Shredder Rental",
      message: "Please quote LX65 AED 450/month",
      source: "/quote/paper-shredder-rental/",
    }),
  });
  const body = await apiResponse.text();
  add("valid quote accepted locally", apiResponse.status === 200 && body.includes("success"), `status=${apiResponse.status}; body=${body}`);

  apiResponse = await fetch(`${base}/api/orders/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      customer: {
        name: "Worker Preview",
        email: "preview-order@example.com",
        phone: "+971501234567",
      },
      delivery: {
        address: "Preview office",
        emirate: "Dubai",
      },
      items: [{ id: "preview-priced-supply", quantity: 2 }],
    }),
  });
  const orderCookie = apiResponse.headers.get("set-cookie") || "";
  const orderBody = await apiResponse.json();
  add(
    "offline order accepted locally",
    apiResponse.status === 200 && orderBody.success === true && orderBody.order?.ref && orderBody.order?.total === 50,
    `status=${apiResponse.status}; ref=${orderBody.order?.ref || ""}`,
  );
  add(
    "order receipt cookie is HttpOnly",
    orderCookie.includes("order_access_") && /httponly/i.test(orderCookie),
    orderCookie,
  );

  response = await get(`/api/orders/?ref=${encodeURIComponent(orderBody.order?.ref || "")}`);
  add("order ref denied without cookie", response.status === 401, `status=${response.status}`);

  apiResponse = await fetch(`${base}/api/orders/?ref=${encodeURIComponent(orderBody.order.ref)}`, {
    headers: { cookie: orderCookie },
  });
  const receiptBody = await apiResponse.json();
  add(
    "order ref readable with receipt cookie",
    apiResponse.status === 200 && receiptBody.order?.ref === orderBody.order.ref,
    `status=${apiResponse.status}`,
  );

  apiResponse = await fetch(`${base}/api/payments/create/`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ref: orderBody.order.ref }),
  });
  add("payment create denied without receipt cookie", apiResponse.status === 401, `status=${apiResponse.status}`);

  apiResponse = await fetch(`${base}/api/payments/create/`, {
    method: "POST",
    headers: { "content-type": "application/json", cookie: orderCookie },
    body: JSON.stringify({ ref: orderBody.order.ref }),
  });
  const paymentBody = await apiResponse.json();
  add(
    "payment create falls back offline locally",
    apiResponse.status === 200 && paymentBody.online === false && paymentBody.redirectUrl === "",
    `status=${apiResponse.status}; body=${JSON.stringify(paymentBody)}`,
  );

  console.table(checks);
  if (checks.some((check) => !check.ok)) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
