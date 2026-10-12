import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { quoteServices, quoteHrefForPath } from "../../src/lib/quote-services";
import { quoteInputSchema } from "../../src/lib/quote-input";

const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const artifactDir = "tests/e2e/screenshots/quote-update";
const failures: string[] = [];
const errors: string[] = [];
const network: string[] = [];
const checks: string[] = [];
const report = { base, checks, failures, errors, network };

async function check(name: string, run: () => Promise<void>) {
  try { await run(); checks.push(name); console.log(`PASS ${name}`); }
  catch (error) { failures.push(`${name}: ${String(error)}`); console.error(`FAIL ${name}: ${error}`); }
}

function isExpectedConsoleError(text: string, expectedDeliveryFailure: boolean) {
  if (expectedDeliveryFailure && text.includes("503")) return true;
  return text.includes("hydrated but some attributes") && text.includes('style={{caret-color:"transparent"}}');
}

async function main() {
  await mkdir(artifactDir, { recursive: true });
  assert.equal(quoteHrefForPath("/services/paper-shredder-rental/"), "/quote/paper-shredder-rental/");
  assert.equal(quoteHrefForPath("/quote/pvc-card-printer-rental/"), "/quote/pvc-card-printer-rental/");
  assert.equal(quoteHrefForPath("/services/pvc-card-printing-services/"), "/quote/pvc-card-printing/");
  const parsed = quoteInputSchema.parse({ customerName: "Test", customerEmail: "test@example.com", notificationEmail: "attacker@example.com" });
  assert.equal("notificationEmail" in parsed, false);
  assert.equal(quoteInputSchema.safeParse({ customerName: [], customerEmail: "test@example.com" }).success, false);

  const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  let expectedDeliveryFailure = false;
  page.on("pageerror", (error) => errors.push(`${page.url()}: ${error.message}`));
  page.on("console", (message) => { if (message.type() === "error" && !isExpectedConsoleError(message.text(), expectedDeliveryFailure)) errors.push(`${page.url()}: ${message.text()}`); });
  page.on("response", (response) => { if (response.status() >= 400 && response.url().startsWith(base)) network.push(`${response.status()} ${response.url()}`); });
  try {
    for (const service of quoteServices) await check(`quote page: ${service.slug}`, async () => {
      const response = await page.goto(`${base}/quote/${service.slug}/`, { waitUntil: "networkidle", timeout: 90_000 });
      assert.equal(response?.status(), 200);
      await page.getByRole("heading", { name: `${service.name} Quote`, exact: true }).waitFor();
      assert.equal(await page.locator("select#quote-option option").count(), service.options.length);
      assert.ok((await page.locator('meta[name="robots"]').getAttribute("content"))?.includes("noindex"));
      const link = await page.getByRole("link", { name: "Ask on WhatsApp" }).getAttribute("href");
      assert.ok(decodeURIComponent(link || "").includes(service.name));
    });

    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      for (const route of ["/quote/", "/quote/paper-shredder-rental/", "/quote/label-printer-rental/", "/services/paper-shredder-rental/", "/services/printer-rental/", "/services/pvc-card-printer-rental/", "/services/pvc-card-printing-services/"]) await check(`layout ${width}: ${route}`, async () => {
        await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 90_000 });
        const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: window.innerWidth }));
        assert.ok(dimensions.scroll <= dimensions.viewport + 1, JSON.stringify(dimensions));
        const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image): image is HTMLImageElement => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 0).map((image) => image.src));
        assert.deepEqual(brokenImages, []);
        await page.screenshot({ path: `${artifactDir}/${route.replaceAll("/", "-")}-${width}.png`, fullPage: true });
        if (route === "/services/paper-shredder-rental/") {
          const text = await page.locator("main").innerText();
          assert.ok(text.includes("AED 450/month") && text.includes("AED 900/month"));
          assert.ok(!text.includes("AED 150/month") && !text.includes("AED 300/month"));
          assert.ok(text.includes("Free delivery, installation, transport and maintenance."));
          const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
          const serviceSchema = schemas.map((value) => JSON.parse(value)).find((value) => value.name === "Paper Shredder Rental UAE");
          assert.deepEqual(serviceSchema.offers.map((offer: { price: string }) => offer.price).sort(), ["450", "900"]);
          assert.ok((await page.title()).includes("AED 450/mo"));
        }
        if (route === "/services/printer-rental/") {
          assert.ok((await page.locator("#label-printing").innerText()).includes("AED 549/month"));
          assert.ok((await page.locator("#label-printing").innerText()).includes("300 gsm"));
          await page.locator("#label-printing").screenshot({ path: `${artifactDir}/label-offer-${width}.png` });
        }
      });
    }

    await check("brand context survives service selection", async () => {
      await page.goto(`${base}/quote/?brand=canon`, { waitUntil: "networkidle" });
      await page.locator('main a[href^="/quote/printer-rental/"]').filter({ visible: true }).first().click();
      await page.locator("#quote-details").waitFor();
      assert.equal(await page.locator("#quote-details").inputValue(), "Brand: canon");
    });

    await check("quote validation, error, retry and success (mocked delivery)", async () => {
      await page.goto(`${base}/quote/paper-shredder-rental/`, { waitUntil: "networkidle" });
      let submitted: Record<string, unknown> | undefined;
      let attempt = 0;
      expectedDeliveryFailure = true;
      await page.route("**/api/send-email/", async (route) => {
        attempt++;
        submitted = route.request().postDataJSON();
        await route.fulfill({ status: attempt === 1 ? 503 : 200, contentType: "application/json", body: JSON.stringify(attempt === 1 ? { error: "Delivery unavailable" } : { success: true }) });
      });
      await page.getByRole("button", { name: "Get My Quote" }).click();
      assert.equal(attempt, 0);
      await page.locator("#quote-name").fill("Quote Regression");
      await page.locator("#quote-email").fill("quote@example.com");
      await page.locator("#quote-phone").fill("+971501234567");
      await page.locator("#quote-option").selectOption("325Ci - AED 900/month");
      await page.locator("#quote-details").fill("3 months starting November");
      await page.getByRole("button", { name: "Get My Quote" }).click();
      await page.locator('form [role="alert"]').waitFor();
      assert.equal(submitted?.configuration, "Paper Shredder Rental");
      assert.ok(String(submitted?.message).includes("325Ci - AED 900/month"));
      await page.getByRole("button", { name: "Get My Quote" }).click();
      await page.getByRole("heading", { name: "Quote request received" }).waitFor();
      await page.unroute("**/api/send-email/");
      expectedDeliveryFailure = false;
    });

    await check("legacy calculator and spare-parts form remain reachable", async () => {
      for (const path of ["/rental-calculator/", "/request-quote/", "/pvc-card-printer-quote/"]) {
        const response = await context.request.get(`${base}${path}`);
        assert.equal(response.status(), 200);
      }
    });
    await check("invalid service returns 404", async () => {
      const response = await context.request.get(`${base}/quote/not-a-service/`);
      assert.equal(response.status(), 404);
    });
    await check("quote API rejects malformed input without sending", async () => {
      for (const payload of [null, { customerName: [], customerEmail: "test@example.com" }, { customerName: "Test", customerEmail: "not-email" }, { customerName: "Test", customerEmail: "test@example.com", website: "spam" }]) {
        const response = await context.request.post(`${base}/api/send-email/`, { data: payload, headers: { "Content-Type": "application/json" } });
        assert.equal(response.status(), 400);
      }
      const response = await context.request.post(`${base}/api/send-email/`, { data: "x".repeat(17000), headers: { "Content-Type": "application/json" } });
      assert.equal(response.status(), 413);
    });
  } finally {
    await browser.close();
    await writeFile(`${artifactDir}/report.json`, JSON.stringify(report, null, 2));
  }
  if (failures.length || errors.length) process.exitCode = 1;
  console.log(JSON.stringify({ passed: checks.length, failures, errors, network }, null, 2));
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
