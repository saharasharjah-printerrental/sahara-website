"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderReceipt, { ReceiptOrder } from "@/components/OrderReceipt";
import { parsePriceAED, formatAED, isPriced } from "@/lib/price";
import { validateEmail, validateUAEPhone } from "@/lib/emailValidation";

interface CartSupply {
  id: string;
  name: string;
  brand: string;
  price: string;
  color?: string;
  category?: string;
}
interface CartItem {
  supply: CartSupply;
  quantity: number;
}

const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

const emptyForm = {
  name: "", email: "", phone: "", company: "",
  address: "", emirate: "Dubai", preferredDate: "", instructions: "",
};

export default function CheckoutClient() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [placedOrder, setPlacedOrder] = useState<ReceiptOrder | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sahara_cart");
      if (stored) setCart(JSON.parse(stored));
    } catch { /* ignore corrupt cart */ }
    setLoaded(true);
  }, []);

  const cartTotal = cart.reduce((acc, it) => acc + parsePriceAED(it.supply.price) * it.quantity, 0);
  const hasUnpriced = cart.some((it) => !isPriced(it.supply.price));
  const set = (k: keyof typeof emptyForm, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    const em = validateEmail(form.email);
    if (!em.valid) e.email = em.error || "Invalid email";
    const ph = validateUAEPhone(form.phone);
    if (!ph.valid) e.phone = ph.error || "Invalid UAE mobile number";
    if (!form.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setSubmitError("");
    if (cart.length === 0) { setSubmitError("Your cart is empty."); return; }
    if (hasUnpriced) { setSubmitError("Some items need a price quote and can't be ordered online."); return; }
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name: form.name, email: form.email, phone: form.phone, company: form.company },
          delivery: { address: form.address, emirate: form.emirate, preferredDate: form.preferredDate, instructions: form.instructions },
          items: cart.map((it) => ({ id: it.supply.id, quantity: it.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Could not place your order. Please try again.");
        setSubmitting(false);
        return;
      }
      localStorage.removeItem("sahara_cart");
      window.dispatchEvent(new Event("sahara-cart-updated"));
      setPlacedOrder(data.order as ReceiptOrder);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  const inputCls = "w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:border-[#f5be53]/50 focus:outline-none";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      <section className="pt-32 pb-20 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {placedOrder ? (
            <div className="no-print-reset">
              <div className="no-print text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Order Placed ✓</h1>
                <p className="text-slate-400">
                  A confirmation has been emailed to {placedOrder.customerEmail}. Your order reference is{" "}
                  <span className="text-[#f5be53] font-bold">{placedOrder.ref}</span>.
                </p>
              </div>
              <OrderReceipt order={placedOrder} />
            </div>
          ) : !loaded ? (
            <p className="text-slate-400 text-center py-20">Loading your cart…</p>
          ) : cart.length === 0 ? (
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-white mb-3">Your cart is empty</h1>
              <p className="text-slate-400 mb-8">Add spare parts or toners before checking out.</p>
              <a href="/services/printer-spare-parts/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-3 rounded-xl font-bold inline-block hover:scale-[1.02] transition-transform">
                Browse Spare Parts
              </a>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Checkout</h1>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Delivery form */}
                <div className="lg:col-span-2 glass-card rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-bold text-white mb-6">Delivery Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Company</label>
                      <input className={inputCls} value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Optional" />
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input className={inputCls} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>UAE Mobile *</label>
                      <input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+971 50 123 4567" />
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Delivery Address *</label>
                      <input className={inputCls} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Building, street, office/unit no." />
                      {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Emirate / City *</label>
                      <select className={inputCls} value={form.emirate} onChange={(e) => set("emirate", e.target.value)}>
                        {EMIRATES.map((em) => <option key={em} value={em}>{em}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Preferred Delivery Date</label>
                      <input className={inputCls} type="date" min={new Date().toISOString().split("T")[0]} value={form.preferredDate} onChange={(e) => set("preferredDate", e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Special Instructions</label>
                      <textarea className={inputCls} rows={3} value={form.instructions} onChange={(e) => set("instructions", e.target.value)} placeholder="Access notes, urgency, printer model context…" />
                    </div>
                  </div>
                </div>

                {/* Order summary */}
                <div className="glass-card rounded-2xl p-6 h-fit">
                  <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4">
                    {cart.map((it) => (
                      <div key={it.supply.id} className="flex justify-between gap-3 text-sm">
                        <span className="text-slate-300">{it.supply.name} <span className="text-slate-500">× {it.quantity}</span></span>
                        <span className="text-white whitespace-nowrap">{formatAED(parsePriceAED(it.supply.price) * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold text-lg mb-5">
                    <span>Total</span>
                    <span>{formatAED(cartTotal)}</span>
                  </div>
                  {hasUnpriced && (
                    <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                      Some items need a price quote — please remove them or request a quote.
                    </div>
                  )}
                  {submitError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                      {submitError}
                    </div>
                  )}
                  <button
                    onClick={submit}
                    disabled={submitting || hasUnpriced}
                    className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Placing Order…" : "Place Order"}
                  </button>
                  <p className="text-slate-500 text-xs mt-3 text-center">
                    You&apos;ll receive an email confirmation and our team will arrange delivery &amp; payment.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
