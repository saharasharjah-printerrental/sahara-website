"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatAED, isPriced, parsePriceAED } from "@/lib/price";
import { validateEmail, validateUAEPhone } from "@/lib/emailValidation";
import { useCart } from "@/hooks/useCart";
import { resolveWhatsAppNumber, buildWaLink, buildCartQuoteMessage } from "@/lib/whatsapp";

const emptyForm = { name: "", email: "", phone: "", company: "", notes: "" };

export default function RequestQuoteClient() {
  const { cart, loaded, total: cartTotal, clear } = useCart();
  const [form, setForm] = useState({ ...emptyForm });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof emptyForm, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const allPriced = cart.length > 0 && cart.every((it) => isPriced(it.supply.price));

  const sendWhatsApp = async () => {
    const number = await resolveWhatsAppNumber();
    const message = buildCartQuoteMessage(cart, { name: form.name, phone: form.phone, notes: form.notes });
    window.open(buildWaLink(number, message), "_blank", "noopener,noreferrer");
    try {
      navigator.sendBeacon(
        "/api/leads/whatsapp/",
        new Blob([JSON.stringify({ name: form.name, phone: form.phone, message, source: "request_quote_page" })], { type: "application/json" })
      );
    } catch { /* best-effort */ }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    const em = validateEmail(form.email);
    if (!em.valid) e.email = em.error || "Invalid email";
    const ph = validateUAEPhone(form.phone);
    if (!ph.valid) e.phone = ph.error || "Invalid UAE mobile number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    setSubmitError("");
    if (!validate()) return;
    setSubmitting(true);

    const itemLines = cart.length > 0
      ? cart.map((it) => `${it.quantity} × ${it.supply.name}${isPriced(it.supply.price) ? ` (${it.supply.price} each)` : " (price on request)"}`).join("\n")
      : "No items attached — general spare parts / toner enquiry.";
    const totalLine = allPriced ? `\n\nEstimated total: ${formatAED(cartTotal)}` : "";
    const message = `Quotation requested for:\n${itemLines}${totalLine}${form.notes ? `\n\nNotes: ${form.notes}` : ""}`;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          customerCompany: form.company || "",
          configuration: "Spare Parts / Toner Quotation Request",
          message,
          estimatedRange: "",
          notificationEmail: "",
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setSubmitError(data.error || "Could not send your request. Please try again or call us directly.");
        setSubmitting(false);
        return;
      }
      clear();
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again or call +971 50 382 3969.");
    }
    setSubmitting(false);
  };

  const inputCls = "w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:border-[#f5be53]/50 focus:outline-none";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />

      <section className="pt-32 pb-20 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {submitted ? (
            <div className="text-center py-20">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Request Sent ✓</h1>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                Our team will confirm pricing and availability, usually the same working day. You&apos;ll hear from us at{" "}
                <span className="text-[#f5be53]">{form.email}</span> or on <span className="text-[#f5be53]">{form.phone}</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/services/printer-spare-parts/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-3 rounded-xl font-bold inline-block hover:scale-[1.02] transition-transform">
                  Back to Spare Parts
                </a>
                <button onClick={sendWhatsApp} className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all">
                  Also Send on WhatsApp
                </button>
              </div>
            </div>
          ) : !loaded ? (
            <p className="text-slate-400 text-center py-20">Loading…</p>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Request a Quotation</h1>
              <p className="text-slate-400 mb-8">
                Tell us who to send the quote to. We&apos;ll confirm current pricing, stock, and delivery — usually the same working day.
              </p>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card rounded-2xl p-6 md:p-8">
                  <h2 className="text-xl font-bold text-white mb-6">Your Details</h2>
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
                      <label className={labelCls}>Notes</label>
                      <textarea className={inputCls} rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Delivery timing, alternate models, anything else we should know…" />
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 h-fit">
                  <h2 className="text-xl font-bold text-white mb-4">Items</h2>
                  {cart.length === 0 ? (
                    <p className="text-slate-400 text-sm mb-4">
                      No items attached. You can still send a general enquiry, or{" "}
                      <a href="/services/printer-spare-parts/" className="text-[#f5be53] hover:underline">browse spare parts</a> first.
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {cart.map((it) => (
                          <div key={it.supply.id} className="flex justify-between gap-3 text-sm">
                            <span className="text-slate-300">{it.supply.name} <span className="text-slate-500">× {it.quantity}</span></span>
                            <span className="text-white whitespace-nowrap">{isPriced(it.supply.price) ? formatAED(parsePriceAED(it.supply.price) * it.quantity) : "TBC"}</span>
                          </div>
                        ))}
                      </div>
                      {allPriced && (
                        <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold text-lg mb-5">
                          <span>Est. Total</span>
                          <span>{formatAED(cartTotal)}</span>
                        </div>
                      )}
                    </>
                  )}
                  {submitError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
                      {submitError}
                    </div>
                  )}
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Send Quote Request (Email)"}
                  </button>
                  <button
                    type="button"
                    onClick={sendWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-bold mt-3 hover:brightness-110 transition-all"
                  >
                    Quote on WhatsApp
                  </button>
                  <p className="text-slate-500 text-xs mt-3 text-center">
                    Prefer to talk? Call <a href="tel:+971503823969" className="text-[#f5be53] hover:underline">+971 50 382 3969</a>.
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
