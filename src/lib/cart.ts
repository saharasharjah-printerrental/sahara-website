// Single source of truth for the spare-parts/toner cart, stored in
// localStorage under "sahara_cart". All cart-touching components should go
// through this module (or the useCart hook) instead of reading/writing
// localStorage directly — that duplication was the root cause of the cart
// having no cross-page visibility and no feedback on add.
import { parsePriceAED, formatAED, isPriced } from "@/lib/price";

export interface CartSupply {
  id: string;
  name: string;
  brand: string;
  price: string;
  color?: string;
  category?: string;
  slug?: string;
}

export interface CartItem {
  supply: CartSupply;
  quantity: number;
}

const STORAGE_KEY = "sahara_cart";
export const CART_UPDATED_EVENT = "sahara-cart-updated";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupt entry — reset rather than white-screening the page.
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function writeCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addItem(supply: CartSupply, qty = 1): CartItem[] {
  const cart = readCart();
  const existing = cart.find((item) => item.supply.id === supply.id);
  const next = existing
    ? cart.map((item) => item.supply.id === supply.id ? { ...item, quantity: item.quantity + qty } : item)
    : [...cart, { supply, quantity: qty }];
  writeCart(next);
  return next;
}

export function removeItem(supplyId: string): CartItem[] {
  const next = readCart().filter((item) => item.supply.id !== supplyId);
  writeCart(next);
  return next;
}

export function setQuantity(supplyId: string, quantity: number): CartItem[] {
  if (quantity < 1) return removeItem(supplyId);
  const next = readCart().map((item) => item.supply.id === supplyId ? { ...item, quantity } : item);
  writeCart(next);
  return next;
}

export function cartCount(cart: CartItem[]): number {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}

export function cartTotal(cart: CartItem[]): number {
  return cart.reduce((acc, item) => acc + parsePriceAED(item.supply.price) * item.quantity, 0);
}

export function hasUnpricedItems(cart: CartItem[]): boolean {
  return cart.some((item) => !isPriced(item.supply.price));
}

export { formatAED, parsePriceAED, isPriced };
