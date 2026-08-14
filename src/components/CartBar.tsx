"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "@/hooks/useCart";
import { formatAED } from "@/lib/price";

interface CartBarProps {
  onViewCart: () => void;
}

/**
 * Sticky bottom bar shown whenever the cart is non-empty, so adding an item
 * while scrolled deep into a long product grid is never invisible. Replaces
 * the old mobile FAB (which collided with WhatsAppCTA at the same fixed
 * position).
 */
export default function CartBar({ onViewCart }: CartBarProps) {
  const { count, total, loaded } = useCart();
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count !== prevCount.current && count > prevCount.current) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 400);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  useEffect(() => {
    document.body.classList.toggle("has-cart-bar", loaded && count > 0);
    return () => document.body.classList.remove("has-cart-bar");
  }, [loaded, count]);

  if (!loaded || count === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 px-4 pb-4 pointer-events-none">
      <button
        onClick={onViewCart}
        className="pointer-events-auto mx-auto flex items-center justify-between gap-4 w-full max-w-xl bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-2xl shadow-2xl px-5 py-4 font-bold hover:scale-[1.01] transition-transform"
      >
        <span className="flex items-center gap-2">
          <ShoppingCart />
          <span className={`transition-transform ${pulse ? "scale-125" : "scale-100"} motion-reduce:scale-100`}>
            {count} item{count !== 1 ? "s" : ""}
          </span>
        </span>
        <span>{formatAED(total)}</span>
        <span className="underline decoration-2 underline-offset-2">View Cart</span>
      </button>
    </div>
  );
}
