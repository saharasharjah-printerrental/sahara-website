// Shared WhatsApp deep-link helpers. Centralises the wa.me link format and
// the site's WhatsApp number resolution so every CTA (floating button, cart
// drawer, quote forms) agrees on both.
import type { CartItem } from "@/lib/cart";
import { formatAED, isPriced, cartTotal } from "@/lib/cart";

export const DEFAULT_WHATSAPP_NUMBER = "971503823969";
/** Support number for spare-parts / toner quote requests — admin-editable via supportWhatsappNumber. */
export const SUPPORT_WHATSAPP_NUMBER = "971503802095";

/**
 * Resolves the configured WhatsApp number from D1 (Admin -> Settings),
 * falling back to localStorage's cached copy, then the hardcoded default.
 * Real first-time visitors have no localStorage yet, so the D1 fetch is the
 * only path that reflects an admin's number change without a page they've
 * already visited.
 *
 * `kind: 'support'` resolves `supportWhatsappNumber` instead (used by the
 * spare-parts/toner quote flows), falling back to SUPPORT_WHATSAPP_NUMBER.
 */
export async function resolveWhatsAppNumber(kind: "sales" | "support" = "sales"): Promise<string> {
  const settingsKey = kind === "support" ? "supportWhatsappNumber" : "whatsappNumber";
  const fallback = kind === "support" ? SUPPORT_WHATSAPP_NUMBER : DEFAULT_WHATSAPP_NUMBER;

  try {
    const res = await fetch("/api/settings/?key=site_settings", { cache: "no-store" });
    const data = await res.json();
    if (data?.setting?.value) {
      const parsed = JSON.parse(data.setting.value);
      if (parsed?.[settingsKey]) return String(parsed[settingsKey]).replace(/[^0-9]/g, "");
    }
  } catch { /* fall through to localStorage / default */ }

  try {
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.[settingsKey]) return String(parsed[settingsKey]).replace(/[^0-9]/g, "");
    }
  } catch { /* ignore */ }

  return fallback;
}

export function buildWaLink(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Mirrors the plain-text line format used in the email quote flow. */
export function buildCartQuoteMessage(
  cart: CartItem[],
  customer?: { name?: string; phone?: string; notes?: string },
): string {
  const itemLines = cart.length > 0
    ? cart.map((it) => `${it.quantity} × ${it.supply.name}${isPriced(it.supply.price) ? ` (${it.supply.price} each)` : " (price on request)"}`).join("\n")
    : "General spare parts / toner enquiry.";
  const allPriced = cart.length > 0 && cart.every((it) => isPriced(it.supply.price));
  const totalLine = allPriced ? `\n\nEstimated total: ${formatAED(cartTotal(cart))}` : "";
  const customerLine = customer?.name ? `\n\nFrom: ${customer.name}${customer.phone ? ` (${customer.phone})` : ""}` : "";
  const notesLine = customer?.notes ? `\nNotes: ${customer.notes}` : "";

  return `Hi! I'd like a quote for:\n${itemLines}${totalLine}${customerLine}${notesLine}`;
}
