"use client";

import { useState, type FormEvent } from "react";
import { Email, WhatsApp, Phone } from "@mui/icons-material";
import { type QuoteService } from "@/lib/quote-services";
import { validateEmail, validateUAEPhone } from "@/lib/emailValidation";
import { buildWaLink } from "@/lib/whatsapp";

function trackQuote(event: string, service: string, channel?: string) {
  const target = window as Window & { dataLayer?: Record<string, unknown>[] };
  target.dataLayer?.push({ event, service, ...(channel ? { channel } : {}) });
}

export default function ServiceQuoteForm({ service, initialDetails = "" }: { service: QuoteService; initialDetails?: string }) {
  const [option, setOption] = useState(service.options[0]);
  const [details, setDetails] = useState(initialDetails);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [started, setStarted] = useState(false);
  const message = `${service.name} quote request\nRequirement: ${option}\nDetails: ${details || "Please advise"}\nLocation: ${location || "To confirm"}\nName: ${name || "Not provided"}`;
  const inputClass = "mt-2 w-full min-w-0 rounded-lg border border-white/20 bg-surface-low px-3 py-3 text-white focus:outline focus:outline-2 focus:outline-primary";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    if (!name.trim()) { setError("Please enter your name."); return; }
    const emailResult = validateEmail(email);
    if (!emailResult.valid) { setError(emailResult.error || "Please check your email."); return; }
    const phoneResult = validateUAEPhone(phone);
    if (!phoneResult.valid) { setError(phoneResult.error || "Please check your UAE phone number."); return; }
    setBusy(true);
    try {
      const response = await fetch("/api/send-email/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: name.trim(), customerEmail: email.trim(), customerPhone: phone.trim(), customerCompany: "", configuration: service.name, message, estimatedRange: "", website, source: `/quote/${service.slug}/` }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Your request could not be sent. Please retry, use WhatsApp or call us.");
      setSent(true);
      trackQuote("generate_lead", service.slug, "email");
    } catch { setError("Your request could not be sent. Please retry, use WhatsApp or call us."); }
    finally { setBusy(false); }
  }

  if (sent) return <div role="status" className="py-12 text-white"><h2 className="text-2xl font-bold">Quote request received</h2><p className="mt-3 text-muted">Our team will contact you about your {service.name.toLowerCase()} requirements.</p><a href={service.page} className="mt-6 inline-block text-primary underline">Back to {service.name}</a></div>;

  return <form onSubmit={submit} onFocus={() => { if (!started) { setStarted(true); trackQuote("quote_start", service.slug); } }} className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
    <div className="min-w-0 space-y-5">
      <label className="block text-sm font-medium text-white" htmlFor="quote-option">{service.question}<select id="quote-option" className={inputClass} value={option} onChange={(event) => setOption(event.target.value)}>{service.options.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="block text-sm font-medium text-white" htmlFor="quote-details">{service.detailLabel}<textarea id="quote-details" className={inputClass} rows={3} maxLength={2000} placeholder={service.detailPlaceholder} value={details} onChange={(event) => setDetails(event.target.value)} /></label>
      <label className="block text-sm font-medium text-white" htmlFor="quote-location">Delivery / service location<select id="quote-location" className={inputClass} value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Select emirate (optional)</option>{["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain", "Al Ain"].map((city) => <option key={city}>{city}</option>)}</select></label>
      <a href={service.page} className="inline-block text-sm text-primary underline">View service details</a>
      {service.slug === "printer-rental" && <p className="text-sm"><a href="/rental-calculator/" className="text-primary underline">Compare printer plans in the rental calculator</a></p>}
    </div>
    <div className="min-w-0 space-y-5">
      <label className="block text-sm font-medium text-white" htmlFor="quote-name">Name *<input id="quote-name" className={inputClass} required autoComplete="name" maxLength={100} value={name} onChange={(event) => setName(event.target.value)} /></label>
      <label className="block text-sm font-medium text-white" htmlFor="quote-email">Email *<input id="quote-email" className={inputClass} type="email" required autoComplete="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} /></label>
      <label className="block text-sm font-medium text-white" htmlFor="quote-phone">UAE phone *<input id="quote-phone" className={inputClass} type="tel" required autoComplete="tel" maxLength={24} placeholder="+971 50 123 4567" value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
      <div hidden aria-hidden="true"><label htmlFor="quote-website">Website</label><input id="quote-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-bold text-on-primary disabled:opacity-60"><Email fontSize="small" />{busy ? "Sending..." : "Get My Quote"}</button>
      <a href={buildWaLink("971503823969", message)} target="_blank" rel="noopener noreferrer" onClick={() => trackQuote("quote_whatsapp_click", service.slug, "whatsapp")} className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-500 px-4 py-3 font-semibold text-emerald-300"><WhatsApp fontSize="small" />Ask on WhatsApp</a>
      <p className="text-xs leading-relaxed text-muted">No obligation. We use your details to respond to this enquiry. <a href="/privacy-policy/" className="underline">Privacy policy</a></p>
      <a href="tel:+971503823969" className="flex items-center gap-2 text-sm text-primary"><Phone fontSize="small" />+971 50 382 3969</a>
    </div>
  </form>;
}
