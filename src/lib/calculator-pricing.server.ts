// Server-only: reads the tariff from D1. Kept separate from calculator-pricing.ts because that
// module is also imported by client components (the admin form and the calculator).
import { getRequestContext } from "@cloudflare/next-on-pages";
import { DEFAULT_CALCULATOR_PRICING, normalizeCalculatorPricing, type CalculatorPricing } from "./calculator-pricing";

/** Any failure returns the defaults so the calculator always renders. */
export async function getCalculatorPricing(): Promise<CalculatorPricing> {
  try {
    const db = (getRequestContext().env as any).DB;
    if (!db) return DEFAULT_CALCULATOR_PRICING;
    const row: any = await db.prepare("SELECT value FROM settings WHERE key = ?").bind("calculator_prices").first();
    if (!row?.value) return DEFAULT_CALCULATOR_PRICING;
    return normalizeCalculatorPricing(JSON.parse(row.value));
  } catch {
    return DEFAULT_CALCULATOR_PRICING;
  }
}
