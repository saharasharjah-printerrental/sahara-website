import { chromium } from "playwright";
import assert from "node:assert";

async function main() {
  const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3100";
  const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(String(e)));

  let pass = 0, fail = 0;
  const check = async (name, fn) => {
    try { await fn(); pass++; console.log("PASS", name); }
    catch (e) { fail++; console.log("FAIL", name, "-", e.message.split("\n")[0]); }
  };

  await check("quote form: every input has a programmatic label", async () => {
    await page.goto(`${base}/quote/paper-shredder-rental/`, { waitUntil: "networkidle" });
    const unlabeled = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("main input, main textarea, main select")) {
        const id = el.id;
        const labelled = id && document.querySelector(`label[for="${id}"]`) || el.closest("label");
        const aria = el.getAttribute("aria-label") || el.getAttribute("aria-labelledby");
        if (!labelled && !aria) bad.push(el.outerHTML.slice(0, 80));
      }
      return bad;
    });
    assert.deepEqual(unlabeled, []);
  });

  await check("keyboard: Tab from first field reaches the submit button", async () => {
    await page.goto(`${base}/quote/paper-shredder-rental/`, { waitUntil: "networkidle" });
    await page.locator("#quote-name").focus();
    let reached = false;
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const isSubmit = await page.evaluate(() => document.activeElement?.getAttribute("type") === "submit" || /get my quote/i.test(document.activeElement?.textContent || ""));
      if (isSubmit) { reached = true; break; }
    }
    assert.ok(reached, "submit not reached by tabbing within form");
  });

  await check("focus is visibly indicated", async () => {
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
    assert.notEqual(outline, "none");
  });

  await check("validation: empty submit blocked with first invalid field focused", async () => {
    await page.goto(`${base}/quote/paper-shredder-rental/`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Get My Quote" }).click();
    const invalidFocused = await page.evaluate(() => {
      const el = document.activeElement as HTMLInputElement | null;
      return !!el && (el.validity?.valid === false || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));
    });
    assert.ok(invalidFocused, "focus did not move to an invalid field");
  });

  await check("picker keyboard: service links are tab-navigable anchors", async () => {
    await page.goto(`${base}/quote/`, { waitUntil: "networkidle" });
    const anchors = await page.evaluate(() =>
      [...document.querySelectorAll('main a[href^="/quote/"]')].every((a) => a.tagName === "A" && a.getAttribute("href")));
    assert.ok(anchors);
  });

  await check("mobile nav opens and contains quote link", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "More" }).click();
    const links = await page.locator('a[href^="/quote"]').count();
    assert.ok(links >= 1, "no /quote link in mobile nav");
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  await check("no unexpected console errors on quote flow", async () => {
    await page.goto(`${base}/quote/label-printer-rental/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const unexpected = consoleErrors.filter((e) => !/503|send-email|favicon/i.test(e));
    assert.deepEqual(unexpected, []);
  });

  await browser.close();
  console.log(JSON.stringify({ passed: pass, failed: fail }));
  process.exit(fail ? 1 : 0);

}
main().catch((e)=>{console.error(e);process.exit(1);})
