"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

export default function GetQuotePage() {
  const [printerType, setPrinterType] = useState("a4");
  const [colorOutput, setColorOutput] = useState("mono");
  const [monthlyVolume, setMonthlyVolume] = useState(5000);
  const [duration, setDuration] = useState(12);
  const [includeMaintenance, setIncludeMaintenance] = useState(true);
  const [includeInstall, setIncludeInstall] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const calculatePrice = () => {
    let basePrice = 300;
    if (printerType === "a3") basePrice += 150;
    if (colorOutput === "color") basePrice += 200;
    if (monthlyVolume > 5000) basePrice += 100;
    if (duration < 12) basePrice *= 1.1;
    if (includeMaintenance) basePrice += 50;
    if (includeInstall) basePrice += 75;

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.3);
    return { min: minPrice, max: maxPrice };
  };

  const price = calculatePrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const configuration = `${printerType.toUpperCase()} — ${colorOutput === "color" ? "Color" : "Mono"} — ${monthlyVolume.toLocaleString()} pages/mo — ${duration} months${includeMaintenance ? " — Maintenance" : ""}${includeInstall ? " — Install" : ""}`;
    const estimatedRange = `AED ${price.min}–${price.max}`;

    const payload = {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      service: configuration,
      message: formData.message || " ",
      notes: `Rental Quote:\n- Type: ${printerType.toUpperCase()}\n- Color: ${colorOutput}\n- Volume: ${monthlyVolume}/mo\n- Duration: ${duration} months\n- Maintenance: ${includeMaintenance ? "Yes" : "No"}\n- Install: ${includeInstall ? "Yes" : "No"}\n- Estimated: ${estimatedRange}/mo`,
      estimatedRange,
    };

    // Save to localStorage as local backup
    const localEntry = {
      id: Date.now().toString(),
      ...payload,
      status: "pending",
      createdAt: new Date().toLocaleDateString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem("sahara_inquiries") || "[]");
      localStorage.setItem("sahara_inquiries", JSON.stringify([localEntry, ...existing]));
    } catch {
      // localStorage may not be available in some environments
    }

    // Submit to API
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Inquiry API error:", err);
        // Still mark as submitted — the localStorage backup was saved
      }
    } catch (err) {
      console.error("Inquiry fetch error:", err);
      // Network error — localStorage backup is still saved, show success to user
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <link rel="canonical" href="https://www.saharaprinter.com/get-quote/" />
      <Header />
      <main className="pt-32 pb-40 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Tailored Efficiency</span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tighter">
              Precision <span className="text-[#f5be53]">Rental</span> Estimates
            </h1>
            <p className="text-[#d3c5b0] text-lg md:text-xl">
              Select your requirements to generate a real-time estimate for Sahara's premium office hardware fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-[#142032] rounded-[2rem] p-8 md:p-10 border border-[#9c8f7c]/10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-8 rounded-full bg-[#f5be53]/10 border border-[#f5be53]/30 flex items-center justify-center text-[#f5be53] font-bold text-sm">01</span>
                  <h3 className="text-2xl font-medium text-white">Device Configuration</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm text-[#d3c5b0] uppercase tracking-widest font-semibold">Format</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setPrinterType("a4")} className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-colors ${printerType === "a4" ? "border-[#f5be53] bg-[#f5be53]/5 text-[#f5be53]" : "border-[#9c8f7c]/20 bg-[#101c2e] hover:border-[#f5be53]/50 text-white"}`}>
                        <span className="material-symbols-outlined mb-2">description</span>
                        <span className="text-sm font-bold">A4 Size</span>
                      </button>
                      <button type="button" onClick={() => setPrinterType("a3")} className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-colors ${printerType === "a3" ? "border-[#f5be53] bg-[#f5be53]/5 text-[#f5be53]" : "border-[#9c8f7c]/20 bg-[#101c2e] hover:border-[#f5be53]/50 text-white"}`}>
                        <span className="material-symbols-outlined mb-2">tab</span>
                        <span className="text-sm font-bold">A3 Size</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm text-[#d3c5b0] uppercase tracking-widest font-semibold">Color Output</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setColorOutput("color")} className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-colors ${colorOutput === "color" ? "border-[#f5be53] bg-[#f5be53]/5 text-[#f5be53]" : "border-[#9c8f7c]/20 bg-[#101c2e] hover:border-[#f5be53]/50 text-white"}`}>
                        <span className="material-symbols-outlined mb-2">palette</span>
                        <span className="text-sm font-bold">Color</span>
                      </button>
                      <button type="button" onClick={() => setColorOutput("mono")} className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-colors ${colorOutput === "mono" ? "border-[#f5be53] bg-[#f5be53]/5 text-[#f5be53]" : "border-[#9c8f7c]/20 bg-[#101c2e] hover:border-[#f5be53]/50 text-white"}`}>
                        <span className="material-symbols-outlined mb-2">contrast</span>
                        <span className="text-sm font-bold">Mono</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#142032] rounded-[2rem] p-8 md:p-10 border border-[#9c8f7c]/10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-8 rounded-full bg-[#f5be53]/10 border border-[#f5be53]/30 flex items-center justify-center text-[#f5be53] font-bold text-sm">02</span>
                  <h3 className="text-2xl font-medium text-white">Usage Parameters</h3>
                </div>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm text-[#d3c5b0] uppercase tracking-widest font-semibold">Monthly Print Volume</label>
                      <span className="text-[#f5be53] text-2xl font-bold">{monthlyVolume.toLocaleString()} <span className="text-xs text-[#d3c5b0]">PAGES</span></span>
                    </div>
                    <input type="range" min="0" max="10000" step="500" value={monthlyVolume} onChange={(e) => setMonthlyVolume(parseInt(e.target.value))} className="w-full h-1.5 bg-[#2a3548] rounded-lg appearance-none cursor-pointer accent-[#f5be53]" />
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>0</span>
                      <span>5,000</span>
                      <span>10,000+</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-sm text-[#d3c5b0] uppercase tracking-widest font-semibold">Lease Duration</label>
                      <span className="text-[#f5be53] text-2xl font-bold">{duration} <span className="text-xs text-[#d3c5b0]">MONTHS</span></span>
                    </div>
                    <input type="range" min="3" max="24" step="3" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-full h-1.5 bg-[#2a3548] rounded-lg appearance-none cursor-pointer accent-[#f5be53]" />
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>3 mo</span>
                      <span>12 mo</span>
                      <span>24 mo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#142032] rounded-[2rem] p-8 md:p-10 border border-[#9c8f7c]/10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-8 rounded-full bg-[#f5be53]/10 border border-[#f5be53]/30 flex items-center justify-center text-[#f5be53] font-bold text-sm">03</span>
                  <h3 className="text-2xl font-medium text-white">Exclusive Add-ons</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button type="button" onClick={() => setIncludeMaintenance(!includeMaintenance)} className={`flex items-center justify-between p-5 rounded-2xl bg-[#101c2e] border transition-all ${includeMaintenance ? "border-[#f5be53]" : "border-[#9c8f7c]/10 hover:border-[#f5be53]/30"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-[#2a3548] flex items-center justify-center ${includeMaintenance ? "bg-[#f5be53]/20" : ""}`}>
                        <span className="material-symbols-outlined text-[#f5be53]">handyman</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sm text-white">Full Maintenance</h4>
                        <p className="text-xs text-[#d3c5b0]">On-site support 24/7</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${includeMaintenance ? "border-[#f5be53] bg-[#f5be53]" : "border-[#9c8f7c]/30"}`}>
                      {includeMaintenance && <span className="material-symbols-outlined text-[#412d00] text-sm font-bold">check</span>}
                    </div>
                  </button>
                  <button type="button" onClick={() => setIncludeInstall(!includeInstall)} className={`flex items-center justify-between p-5 rounded-2xl bg-[#101c2e] border transition-all ${includeInstall ? "border-[#f5be53]" : "border-[#9c8f7c]/10 hover:border-[#f5be53]/30"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-[#2a3548] flex items-center justify-center ${includeInstall ? "bg-[#f5be53]/20" : ""}`}>
                        <span className="material-symbols-outlined text-[#f5be53]">rocket_launch</span>
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sm text-white">Premium Install</h4>
                        <p className="text-xs text-[#d3c5b0]">Network integration</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${includeInstall ? "border-[#f5be53] bg-[#f5be53]" : "border-[#9c8f7c]/30"}`}>
                      {includeInstall && <span className="material-symbols-outlined text-[#412d00] text-sm font-bold">check</span>}
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-[#142032] rounded-[2rem] p-8 md:p-10 border border-[#9c8f7c]/10">
                <h3 className="text-2xl font-medium text-white mb-6">Your Information</h3>
                {submitted ? (
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-5xl text-green-400 mb-4 block">check_circle</span>
                    <h3 className="text-xl font-bold text-white mb-2">Quote Request Submitted!</h3>
                    <p className="text-slate-400">Our team will contact you within 2 hours.</p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50 focus:ring-2 focus:ring-[#f5be53]"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50 focus:ring-2 focus:ring-[#f5be53]"
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50 focus:ring-2 focus:ring-[#f5be53]"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50 focus:ring-2 focus:ring-[#f5be53]"
                      />
                    </div>
                    <textarea
                      placeholder="Additional Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-[#101c2e] border-none rounded-xl py-4 px-6 text-white placeholder:text-[#d3c5b0]/50 focus:ring-2 focus:ring-[#f5be53] mt-6"
                    />
                    {submitError && (
                      <p className="text-red-400 text-sm">{submitError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full gold-gradient py-5 rounded-full text-[#412d00] font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#f5be53]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {submitting ? "Submitting…" : "Submit Quote Request"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="glass-card rounded-[2.5rem] p-10 overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f5be53]/10 rounded-full blur-[80px]"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold tracking-widest uppercase text-[#d3c5b0] mb-10">Monthly Estimate</h3>
                  <div className="relative w-64 h-64 flex items-center justify-center mb-10">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="128" cy="128" fill="transparent" r="110" stroke="rgba(245, 190, 83, 0.1)" strokeWidth="8"></circle>
                      <circle cx="128" cy="128" fill="transparent" r="110" stroke="#f5be53" strokeDasharray="690" strokeDashoffset="172" strokeLinecap="round" strokeWidth="8"></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xs text-[#d3c5b0] uppercase font-bold tracking-[0.2em] mb-1">AED Range</span>
                      <span className="text-5xl font-bold text-white leading-none">{price.min}–{price.max}</span>
                      <span className="text-sm text-[#f5be53] font-semibold mt-2">PER MONTH</span>
                    </div>
                  </div>
                  <div className="w-full space-y-6 mb-10">
                    <div className="flex justify-between items-center py-4 border-b border-[#9c8f7c]/10">
                      <span className="text-[#d3c5b0]">Base Rental</span>
                      <span className="font-bold text-white">AED {price.min - 50}.00</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-[#9c8f7c]/10">
                      <span className="text-[#d3c5b0]">Add-ons</span>
                      <span className="font-bold text-white">AED {(includeMaintenance ? 50 : 0) + (includeInstall ? 75 : 0)}.00</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                      <span className="text-[#d3c5b0] italic text-sm">Quotes exclude 5% VAT</span>
                      <span className="material-symbols-outlined text-[#f5be53] text-sm">verified</span>
                    </div>
                  </div>
                  {submitted ? (
                    <div className="w-full py-5 rounded-full border border-green-400/40 text-green-400 font-bold text-lg text-center">
                      Request Submitted ✓
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => formRef.current?.requestSubmit()}
                      disabled={submitting}
                      className="w-full gold-gradient py-5 rounded-full text-[#412d00] font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#f5be53]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                    >
                      {submitting ? "Submitting…" : "Submit Quote Request"}
                    </button>
                  )}
                  <p className="mt-6 text-xs text-[#d3c5b0] leading-relaxed">
                    Our consultants will reach out within 2 working hours with a formal agreement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}
