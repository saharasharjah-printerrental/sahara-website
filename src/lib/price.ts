// Shared AED price helpers. Supply/product prices are stored as free text
// (e.g. "AED 250", "1,200", or "Contact for Pricing"); these normalise them.

/** Parse a price string to a number of AED. Returns 0 when not a real price. */
export function parsePriceAED(value: string | number | null | undefined): number {
  if (typeof value === 'number') return isFinite(value) && value > 0 ? value : 0;
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  const num = parseFloat(cleaned);
  return isFinite(num) && num > 0 ? num : 0;
}

/** True when the value represents a real, payable price (> 0). */
export function isPriced(value: string | number | null | undefined): boolean {
  return parsePriceAED(value) > 0;
}

/** Format a number as an AED price string, e.g. 1200 -> "AED 1,200". */
export function formatAED(amount: number): string {
  if (!isFinite(amount) || amount <= 0) return 'Contact for Pricing';
  const rounded = Math.round(amount * 100) / 100;
  return `AED ${rounded.toLocaleString('en-AE', { maximumFractionDigits: 2 })}`;
}
