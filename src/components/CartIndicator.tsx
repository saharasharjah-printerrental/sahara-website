"use client";

import Link from "next/link";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "@/hooks/useCart";

/**
 * Cart icon + count badge for the header/nav. Hidden when the cart is
 * empty. This is what makes the cart visible outside the spare-parts page
 * itself (checkout, request-quote, and every other page use Header/MobileNav).
 */
export default function CartIndicator({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { count, loaded } = useCart();
  if (!loaded || count === 0) return null;

  if (variant === "mobile") {
    return (
      <Link href="/checkout/" className="relative flex flex-col items-center justify-center p-3 rounded-full text-slate-400 hover:bg-slate-800/50 transition-all">
        <ShoppingCart className="text-xl" />
        <span className="absolute top-1 right-1 bg-[#f5be53] text-[#412d00] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
        <span className="text-[10px] font-medium uppercase tracking-widest mt-0.5">Cart</span>
      </Link>
    );
  }

  return (
    <Link href="/checkout/" className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#1f2a3d]/60 border border-white/10 text-slate-300 hover:text-white transition-colors" aria-label={`Cart, ${count} item${count !== 1 ? "s" : ""}`}>
      <ShoppingCart sx={{ fontSize: 18 }} />
      <span className="absolute -top-1 -right-1 bg-[#f5be53] text-[#412d00] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
    </Link>
  );
}
