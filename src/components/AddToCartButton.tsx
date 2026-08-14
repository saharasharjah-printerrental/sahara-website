"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast";
import CartBar from "@/components/CartBar";
import type { CartSupply } from "@/lib/cart";

interface AddToCartButtonProps {
  supply: CartSupply;
  payable: boolean;
  inStock: boolean;
}

/**
 * Detail-page equivalent of the grid's "Add to Cart" button. The previous
 * version of this page linked back to the listing instead of adding
 * anything — this actually writes to the shared cart.
 */
export default function AddToCartButton({ supply, payable, inStock }: AddToCartButtonProps) {
  const { cart, add, setQty } = useCart();
  const { showToast, ToastElement } = useToast();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = cart.find((item) => item.supply.id === supply.id);

  if (!payable || !inStock) {
    return (
      <a href="/request-quote/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
        {inStock ? "Check Availability" : "Request When Back in Stock"}
      </a>
    );
  }

  if (inCart) {
    return (
      <div className="flex items-center gap-3 bg-[#101c2e] rounded-full px-4 py-2">
        <button onClick={() => setQty(supply.id, inCart.quantity - 1)} aria-label="Decrease quantity" className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 text-lg">−</button>
        <span className="text-white font-bold w-6 text-center">{inCart.quantity}</span>
        <button onClick={() => setQty(supply.id, inCart.quantity + 1)} aria-label="Increase quantity" className="w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/10 text-lg">+</button>
      </div>
    );
  }

  return (
    <>
      {ToastElement}
      <button
        onClick={() => {
          add(supply);
          showToast("success", `${supply.name} added to cart`);
          setJustAdded(true);
          setTimeout(() => setJustAdded(false), 1500);
        }}
        className={`px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 ${justAdded ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00]"}`}
      >
        {justAdded ? "Added ✓" : "Add to Cart"}
      </button>
      <CartBar onViewCart={() => { window.location.href = "/checkout/"; }} />
    </>
  );
}
