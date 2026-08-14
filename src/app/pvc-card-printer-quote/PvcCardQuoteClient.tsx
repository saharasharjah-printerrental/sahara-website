"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { validateEmail, validateUAEPhone } from "@/lib/emailValidation";
import { resolveWhatsAppNumber, buildWaLink } from "@/lib/whatsapp";

const MODELS = [
  { value: "rtai", label: "Bravo RTAI — retransfer, 600 DPI, holographic" },
  { value: "dc3300", label: "Bravo DC 3300 — direct-to-card" },
  { value: "not-sure", label: "Not sure — recommend one for me" },
];
const APPLICATIONS = ["Employee ID", "Government ID", "Access control", "Student ID", "Membership card", "Visitor badge", "Other"];
const ENCODING = ["None (plain print)", "Magnetic stripe", "Contact smart card", "Contactless / RFID"];
const EMIRATES = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"];

const emptyForm = {
  name: "", email: "", phone: "", company: "",
  model: "not-sure", application: "Employee ID", volume: "",
  encoding: "None (plain print)", security: "no", emirate: "Dubai", notes: "",
};

function QuoteForm() {
  const params = useSearchParams();
  const prefillModel = params.get("model");
  const [form, setForm] = useState({ ...emptyForm, model: prefillModel && MODELS.some(m => m.value === prefillModel) ? prefillModel : emptyForm.model });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof emptyForm, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const modelLabel = MODELS.find((m) => m.value === form.model)?.label || "Not sure";

  const buildMessage = () =>
    `PVC card printer enquiry:\nModel: ${modelLabel}\nApplication: ${form.application}\nMonthly card volume: ${form.volume || "not specified"}\nEncoding: ${form.encoding}\nLamination / holographic security needed: ${form.security === "yes" ? "Yes" : "No"}\nEmirate: ${form.emirate}${form.notes ? `\n\nNotes: ${form.notes}` : ""}`;

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
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          customerCompany: form.company || "",
          configuration: `PVC Card Printer Enquiry — ${modelLabel}`,
          message: buildMessage(),
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
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again or call +971 50 382 3969.");
    }
    setSubmitting(false);
  };

  const sendWhatsApp = async () => {
    const number = await resolveWhatsAppNumber();
    window.open(buildWaLink(number, `Hi! ${buildMessage()}`), "_blank", "noopener,noreferrer");
    try {
      navigator.sendBeacon(
        "/api/leads/whatsapp/",
        new Blob([JSON.stringify({ name: form.name, phone: form.phone, message: buildMessage(), source: "pvc_quote_page" })], { type: "application/json" })
      );
    } catch { /* best-effort */ }
  };

  const inputCls = "w-full bg-[#101c2e] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:border-[#f5be53]/50 focus:outline-none";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  if (submitted) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Quote Request Sent ✓</h1>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Our team will confirm pricing for the {modelLabel.split(" — ")[0]}, usually the same working day. You&apos;ll hear from us at{" "}
          <span className="text-[#f5be53]">{form.email}</span> or on <span className="text-[#f5be53]">{form.phone}</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/bravo-card-printers-uae/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-3 rounded-xl font-bold inline-block hover:scale-[1.02] transition-transform">
            Back to Bravo Card Printers
          </a>
          <button onClick={sendWhatsApp} className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all">
            Also Send on WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Get a PVC Card Printer Quote</h1>
      <p className="text-slate-400 mb-8 max-w-2xl">
        Tell us your card volume and requirements. Sahara Office Equipments, authorised UAE retail partner for the
        Bravo RTAI and DC 3300, will confirm a tailored price — usually the same working day.
      </p>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Printer Requirements</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelCls}>Model</label>
                <select className={inputCls} value={form.model} onChange={(e) => set("model", e.target.value)}>
                  {MODELS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Application</label>
                <select className={inputCls} value={form.application} onChange={(e) => set("application", e.target.value)}>
                  {APPLICATIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Monthly Card Volume</label>
                <input className={inputCls} value={form.volume} onChange={(e) => set("volume", e.target.value)} placeholder="e.g. 200 cards/month" />
              </div>
              <div>
                <label className={labelCls}>Encoding</label>
                <select className={inputCls} value={form.encoding} onChange={(e) => set("encoding", e.target.value)}>
                  {ENCODING.map((enc) => <option key={enc} value={enc}>{enc}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Lamination / Holographic Security</label>
                <select className={inputCls} value={form.security} onChange={(e) => set("security", e.target.value)}>
                  <option value="no">Not needed</option>
                  <option value="yes">Yes, required</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Emirate</label>
                <select className={inputCls} value={form.emirate} onChange={(e) => set("emirate", e.target.value)}>
                  {EMIRATES.map((em) => <option key={em} value={em}>{em}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-xl font-bold text-white mb-4">Your Details</h2>
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
                <textarea className={inputCls} rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Card design, delivery timing, anything else we should know…" />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-bold text-white mb-3">Why buy from Sahara</h2>
          <ul className="text-[#d3c5b0] text-sm leading-relaxed space-y-2 mb-6 list-disc list-inside">
            <li>Authorised UAE retail partner for Bravo RTAI &amp; DC 3300</li>
            <li>Genuine consumables — ribbons, retransfer film, blank cards</li>
            <li>On-site support across Dubai, Sharjah &amp; Abu Dhabi</li>
            <li>3-year printer warranty, lifetime print head on RTAI</li>
          </ul>
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
            {submitting ? "Sending…" : "Get My Quote (Email)"}
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
  );
}

export default function PvcCardQuoteClient() {
  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      <section className="pt-32 pb-20 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <nav className="flex mb-8 text-sm font-medium text-[#d3c5b0] gap-2 items-center flex-wrap">
            <a href="/" className="hover:text-[#f5be53] transition-colors">Home</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <a href="/bravo-card-printers-uae/" className="hover:text-[#f5be53] transition-colors">Bravo Card Printers UAE</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#f5be53]">Get a Quote</span>
          </nav>
          <Suspense fallback={<p className="text-slate-400 text-center py-20">Loading…</p>}>
            <QuoteForm />
          </Suspense>
        </div>
      </section>
      <Footer />
      <WhatsAppCTA />
    </main>
  );
}
