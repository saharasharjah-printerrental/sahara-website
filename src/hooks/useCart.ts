"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CART_UPDATED_EVENT,
  addItem,
  cartCount,
  cartTotal,
  clearCart as clearCartStorage,
  hasUnpricedItems,
  readCart,
  removeItem,
  setQuantity,
  type CartItem,
  type CartSupply,
} from "@/lib/cart";

/**
 * Reactive view of the shared cart. Subscribes to both the in-tab
 * "sahara-cart-updated" event (dispatched by lib/cart on every write) and the
 * native "storage" event so a second tab / the checkout flow stays in sync.
 */
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCart(readCart());
    setLoaded(true);

    const sync = () => setCart(readCart());
    window.addEventListener(CART_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = useCallback((supply: CartSupply, qty = 1) => setCart(addItem(supply, qty)), []);
  const remove = useCallback((supplyId: string) => setCart(removeItem(supplyId)), []);
  const setQty = useCallback((supplyId: string, quantity: number) => setCart(setQuantity(supplyId, quantity)), []);
  const clear = useCallback(() => { clearCartStorage(); setCart([]); }, []);

  return {
    cart,
    loaded,
    count: cartCount(cart),
    total: cartTotal(cart),
    hasUnpriced: hasUnpricedItems(cart),
    add,
    remove,
    setQty,
    clear,
  };
}
