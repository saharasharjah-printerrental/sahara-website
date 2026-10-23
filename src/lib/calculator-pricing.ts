// Single source of truth for the rental calculator tariff.
//
// Stored in D1 `settings.calculator_prices` as JSON (edited in Admin → Settings →
// "Rental Calculator Pricing"), read server-side by the calculator pages and passed
// to <CalculatorClient pricing={...} />. Before Oct 2026 the calculator used
// hard-coded constants and the admin form edited an unrelated legacy shape
// (a4BasePrice, colorMultiplier, ...), so admin changes never reached customers.
//
// Two tiers, selected by paper format:
//   a4        — compact A4 printers: base AED 250, 2,000 B&W + 750 colour pages included
//   standard  — A3 and A4+A3: base AED 350, 3,000 B&W + 1,000 colour pages included
// Pages above the allowance are billed at bwPrice / colourPrice per page.

export type PaperFormat = "a4" | "a3" | "both";
export type PrintType = "bw" | "color" | "both";

export interface RentalTier {
  baseRent: number;   // AED per month, also the minimum monthly price
  freeBw: number;     // B&W pages included per month
  freeColour: number; // colour pages included per month
}

export interface CalculatorPricing {
  version: 2;
  a4: RentalTier;
  standard: RentalTier;
  bwPrice: number;       // AED per extra B&W page
  colourPrice: number;   // AED per extra colour page
  a3Surcharge: number;   // AED per month, A3 only
  bothSurcharge: number; // AED per month, A4 + A3
  discount24: number;    // percent off for a 24-month contract
  discount36: number;    // percent off for a 36-month contract
  /** AED per month for the separate Custom A3 Label Printer Rental service (not part of the calculator). */
  a3LabelRent: number;
  /** Enterprise is quoted directly by phone or visit, not through the calculator, from these monthly volumes. */
  enterpriseBw: number;
  enterpriseColour: number;
}

export const DEFAULT_CALCULATOR_PRICING: CalculatorPricing = {
  version: 2,
  a4: { baseRent: 250, freeBw: 2000, freeColour: 750 },
  standard: { baseRent: 350, freeBw: 3000, freeColour: 1000 },
  bwPrice: 0.06,
  colourPrice: 0.2,
  a3Surcharge: 80,
  bothSurcharge: 50,
  discount24: 5,
  discount36: 10,
  a3LabelRent: 549,
  enterpriseBw: 10000,
  enterpriseColour: 5000,
};

function num(value: unknown, fallback: number, min = 0, max = Number.POSITIVE_INFINITY): number {
  const n = typeof value === "string" ? Number(value) : (value as number);
  if (typeof n !== "number" || !Number.isFinite(n) || n < min || n > max) return fallback;
  return n;
}

function tier(raw: any, fallback: RentalTier): RentalTier {
  return {
    baseRent: num(raw?.baseRent, fallback.baseRent, 0, 100000),
    freeBw: Math.round(num(raw?.freeBw, fallback.freeBw, 0, 1000000)),
    freeColour: Math.round(num(raw?.freeColour, fallback.freeColour, 0, 1000000)),
  };
}

/**
 * Validates untrusted JSON (from D1 or the admin form) into a safe tariff.
 * Anything missing or invalid falls back to the default for that field. The legacy
 * pre-v2 shape is ignored on purpose: the calculator never read it, and its field
 * names were reused for different meanings, so mapping it would guess wrong.
 */
export function normalizeCalculatorPricing(raw: unknown): CalculatorPricing {
  const d = DEFAULT_CALCULATOR_PRICING;
  const r: any = raw && typeof raw === "object" ? raw : null;
  if (!r || r.version !== 2) return d;
  return {
    version: 2,
    a4: tier(r.a4, d.a4),
    standard: tier(r.standard, d.standard),
    bwPrice: num(r.bwPrice, d.bwPrice, 0.001, 100),
    colourPrice: num(r.colourPrice, d.colourPrice, 0.001, 100),
    a3Surcharge: num(r.a3Surcharge, d.a3Surcharge, 0, 100000),
    bothSurcharge: num(r.bothSurcharge, d.bothSurcharge, 0, 100000),
    discount24: num(r.discount24, d.discount24, 0, 90),
    discount36: num(r.discount36, d.discount36, 0, 90),
    a3LabelRent: num(r.a3LabelRent, d.a3LabelRent, 1, 100000),
    enterpriseBw: Math.round(num(r.enterpriseBw, d.enterpriseBw, 1000, 10000000)),
    enterpriseColour: Math.round(num(r.enterpriseColour, d.enterpriseColour, 500, 10000000)),
  };
}

export function tierFor(p: CalculatorPricing, paperFormat: PaperFormat): RentalTier {
  return paperFormat === "a4" ? p.a4 : p.standard;
}

/** AED value of a tier's included pages (the pool that the B&W/colour slider rebalances). */
export function freeValue(p: CalculatorPricing, t: RentalTier): number {
  return Math.round((t.freeBw * p.bwPrice + t.freeColour * p.colourPrice) * 100) / 100;
}

export interface QuoteInput {
  printType: PrintType;
  paperFormat: PaperFormat;
  /** B&W share (AED) of the free pool; defaults to the tier's own split. */
  freePoolSplit?: number;
  bwVolume: number;
  colourVolume: number;
  duration: number; // months
}

export interface QuoteResult {
  baseRent: number;
  freeBw: number;
  freeColour: number;
  extraBw: number;
  extraColour: number;
  extraBwCost: number;
  extraColourCost: number;
  surcharge: number;
  discountPercent: number;
  subtotal: number;
  monthlyPrice: number;
  totalCost: number;
  saving: number;
  /** True from the enterprise volume: no online price, deal by phone or visit. */
  enterprise: boolean;
}

export function computeQuote(p: CalculatorPricing, q: QuoteInput): QuoteResult {
  const t = tierFor(p, q.paperFormat);
  const pool = freeValue(p, t);
  const split = q.freePoolSplit ?? t.freeBw * p.bwPrice;

  const freeBw =
    q.printType === "color" ? 0 : q.printType === "bw" ? Math.round(pool / p.bwPrice) : Math.round(split / p.bwPrice);
  const freeColour =
    q.printType === "bw" ? 0 : q.printType === "color" ? Math.round(pool / p.colourPrice) : Math.round((pool - split) / p.colourPrice);

  const extraBw = Math.max(0, q.bwVolume - freeBw);
  const extraColour = Math.max(0, q.colourVolume - freeColour);
  const extraBwCost = extraBw * p.bwPrice;
  const extraColourCost = extraColour * p.colourPrice;
  const surcharge = q.paperFormat === "a3" ? p.a3Surcharge : q.paperFormat === "both" ? p.bothSurcharge : 0;
  const discountPercent = q.duration === 36 ? p.discount36 : q.duration === 24 ? p.discount24 : 0;
  const factor = 1 - discountPercent / 100;
  const subtotal = t.baseRent + extraBwCost + extraColourCost + surcharge;
  const monthlyPrice = Math.max(t.baseRent, Math.round(subtotal * factor));
  return {
    baseRent: t.baseRent,
    freeBw,
    freeColour,
    extraBw,
    extraColour,
    extraBwCost,
    extraColourCost,
    surcharge,
    discountPercent,
    subtotal,
    monthlyPrice,
    totalCost: monthlyPrice * q.duration,
    saving: Math.round(subtotal * (1 - factor)),
    enterprise: q.bwVolume >= p.enterpriseBw || q.colourVolume >= p.enterpriseColour,
  };
}
