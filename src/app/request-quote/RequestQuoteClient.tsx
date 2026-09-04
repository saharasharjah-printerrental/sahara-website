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
    const number = await resolveWhatsAppNumber("support");
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

  const inputCls = "w-full bg-surface-low border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:border-primary/50 focus:outline-none";
  const labelCls = "block text-sm font-medium text-on-surface-variant mb-1.5";

  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="px-6 pb-20 pt-32 lg:px-24">
        <div className="mx-auto max-w-4xl">
          {submitted ? (
            <div className="py-20 text-center">
              <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">Request Sent ✓</h1>
              <p className="mx-auto mb-8 max-w-md text-muted">
                Our team will confirm pricing and availability, usually the same working day. You&apos;ll hear from
                us at <span className="text-primary">{form.email}</span> or on{" "}
                <span className="text-primary">{form.phone}</span>.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <a href="/services/printer-spare-parts/" className="btn-primary">Back to Spare Parts</a>
                <button onClick={sendWhatsApp} className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-3 font-bold text-white transition-all hover:brightness-110">
                  Also Send on WhatsApp
                </button>
              </div>
            </div>
          ) : !loaded ? (
            <p className="py-20 text-center text-muted">Loading…</p>
          ) : (
            <>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Request a Quotation</h1>
              <p className="mb-8 text-muted">
                Tell us who to send the quote to. We&apos;ll confirm current pricing, stock, and delivery — usually
                the same working day.
              </p>
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="glass-card rounded-panel p-6 md:p-8 lg:col-span-2">
                  <h2 className="mb-6 text-xl font-bold text-white">Your Details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>Company</label>
                      <input className={inputCls} value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Optional" />
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input className={inputCls} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>UAE Mobile *</label>
                      <input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+971 50 123 4567" />
                      {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Notes</label>
                      <textarea className={inputCls} rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Delivery timing, alternate models, anything else we should know…" />
                    </div>
                  </div>
                </div>

                <div className="glass-card h-fit rounded-panel p-6">
                  <h2 className="mb-4 text-xl font-bold text-white">Items</h2>
                  {cart.length === 0 ? (
                    <p className="mb-4 text-sm text-muted">
                      No items attached. You can still send a general enquiry, or{" "}
                      <a href="/services/printer-spare-parts/" className="text-primary hover:underline">browse spare parts</a> first.
                    </p>
                  ) : (
                    <>
                      <div className="mb-4 space-y-3">
                        {cart.map((it) => (
                          <div key={it.supply.id} className="flex justify-between gap-3 text-sm">
                            <span className="text-on-surface-variant">{it.supply.name} <span className="text-slate-500">× {it.quantity}</span></span>
                            <span className="whitespace-nowrap text-white">{isPriced(it.supply.price) ? formatAED(parsePriceAED(it.supply.price) * it.quantity) : "TBC"}</span>
                          </div>
                        ))}
                      </div>
                      {allPriced && (
                        <div className="mb-5 flex justify-between border-t border-white/10 pt-4 text-lg font-bold text-white">
                          <span>Est. Total</span>
                          <span>{formatAED(cartTotal)}</span>
                        </div>
                      )}
                    </>
                  )}
                  {submitError && (
                    <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                      {submitError}
                    </div>
                  )}
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-deep py-4 font-bold text-on-primary transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? "Sending…" : "Send Quote Request (Email)"}
                  </button>
                  <button
                    type="button"
                    onClick={sendWhatsApp}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-bold text-white transition-all hover:brightness-110"
                  >
                    Quote on WhatsApp
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Prefer to talk? Call <a href="tel:+971503823969" className="text-primary hover:underline">+971 50 382 3969</a>.
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
