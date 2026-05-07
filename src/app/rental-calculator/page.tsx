"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

const BASE_RENT = 350;
const BW_PRICE = 0.06;
const COLOR_PRICE = 0.20;
const FREE_BW_DEFAULT = 3000;
const FREE_COLOR_DEFAULT = 1000;

const TOTAL_FREE_PRINT_VALUE = FREE_BW_DEFAULT * BW_PRICE + FREE_COLOR_DEFAULT * COLOR_PRICE;

function TabGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 p-1 bg-[#0a1929] rounded-xl border border-white/10">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            value === opt.value
              ? "bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#1a0e00] shadow-lg"
              : "text-[#8a9bb0] hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function PremiumSlider({
  label,
  value,
  min,
  max,
  step,
  freeAllowance,
  unit,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  freeAllowance: number;
  unit: string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const freePct = Math.min(100, ((freeAllowance - min) / (max - min)) * 100);
  const extra = Math.max(0, value - freeAllowance);

  return (
    <div className={disabled ? "opacity-40 pointer-events-none" : ""}>
      <div className="flex justify-between items-end mb-3">
        <span className="text-sm font-medium text-[#8a9bb0]">{label}</span>
        <div className="text-right">
          <span className="text-2xl font-bold text-white">{value.toLocaleString()}</span>
          <span className="text-xs text-[#8a9bb0] ml-1">{unit}</span>
        </div>
      </div>

      <div className="relative h-3 bg-[#0a1929] rounded-full mb-2 border border-white/10">
        {/* free allowance zone */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-[#f5be53]/20"
          style={{ width: `${freePct}%` }}
        />
        {/* filled track */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-[#f5be53] shadow-lg shadow-[#f5be53]/30 transition-all pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between text-xs mt-1">
        <span className="text-[#f5be53]">
          {freeAllowance.toLocaleString()} free included
        </span>
        {extra > 0 ? (
          <span className="text-amber-400 font-medium">
            +{extra.toLocaleString()} extra
          </span>
        ) : (
          <span className="text-[#8a9bb0]">{max.toLocaleString()} max</span>
        )}
      </div>
    </div>
  );
}

export default function RentalCalculatorPage() {
  const [printType, setPrintType] = useState<"bw" | "color" | "both">("both");
  const [paperFormat, setPaperFormat] = useState<"a4" | "a3" | "both">("a4");
  const [bwVolume, setBwVolume] = useState(FREE_BW_DEFAULT);
  const [colorVolume, setColorVolume] = useState(FREE_COLOR_DEFAULT);
  const [duration, setDuration] = useState(12);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    contactMethod: "email",
  });

  // ── free-print pool rebalancing ──────────────────────────────────────────
  // Value-based balancing: when user reduces free prints of one type,
  // the other type's free allowance increases to preserve TOTAL_FREE_PRINT_VALUE
  const handleBwChange = (val: number) => {
    if (printType === "color") return;
    setBwVolume(val);
    if (printType === "bw") { setColorVolume(0); return; }

    // Calculate remaining value and rebalance color allowance
    const usedBwValue = val * BW_PRICE;
    const remainingValue = Math.max(0, TOTAL_FREE_PRINT_VALUE - usedBwValue);
    setColorVolume(Math.round(remainingValue / COLOR_PRICE));
  };

  const handleColorChange = (val: number) => {
    if (printType === "bw") return;
    setColorVolume(val);
    if (printType === "color") { setBwVolume(0); return; }

    // Calculate remaining value and rebalance B&W allowance
    const usedColorValue = val * COLOR_PRICE;
    const remainingValue = Math.max(0, TOTAL_FREE_PRINT_VALUE - usedColorValue);
    setBwVolume(Math.round(remainingValue / BW_PRICE));
  };

  const handlePrintTypeChange = (v: string) => {
    const t = v as "bw" | "color" | "both";
    setPrintType(t);
    if (t === "bw") {
      // Full pool value converted to B&W prints
      setBwVolume(Math.round(TOTAL_FREE_PRINT_VALUE / BW_PRICE));
      setColorVolume(0);
    } else if (t === "color") {
      setBwVolume(0);
      setColorVolume(Math.round(TOTAL_FREE_PRINT_VALUE / COLOR_PRICE));
    } else {
      // Reset to default balanced pool
      setBwVolume(FREE_BW_DEFAULT);
      setColorVolume(FREE_COLOR_DEFAULT);
    }
  };

  // ── derived free allowances (from current state or defaults) ────────────
  // These represent the FREE prints included in base rental
  const currentFreeBw = printType === "color" ? 0 : printType === "bw"
    ? Math.round(TOTAL_FREE_PRINT_VALUE / BW_PRICE)
    : bwVolume;

  const currentFreeColor = printType === "bw" ? 0 : printType === "color"
    ? Math.round(TOTAL_FREE_PRINT_VALUE / COLOR_PRICE)
    : colorVolume;

  // ── pricing ──────────────────────────────────────────────────────────────
  const extraBw   = Math.max(0, bwVolume - currentFreeBw);
  const extraColor = Math.max(0, colorVolume - currentFreeColor);
  const extraBwCost    = extraBw * BW_PRICE;
  const extraColorCost = extraColor * COLOR_PRICE;
  const a3Surcharge    = paperFormat === "a3" ? 80 : paperFormat === "both" ? 50 : 0;

  // Apply duration discount, then enforce minimum AED 350
  const durationDiscount = duration === 36 ? 0.90 : duration === 24 ? 0.95 : 1;
  const subtotal = BASE_RENT + extraBwCost + extraColorCost + a3Surcharge;
  const discountedSubtotal = subtotal * durationDiscount;
  const monthlyPrice = Math.max(BASE_RENT, Math.round(discountedSubtotal));
  const totalCost = monthlyPrice * duration;

  // ── form submit ───────────────────────────────────────────────────────────
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const config = [
      `Print: ${printType}`,
      `Paper: ${paperFormat}`,
      `B&W: ${bwVolume.toLocaleString()} pages/mo`,
      `Colour: ${colorVolume.toLocaleString()} pages/mo`,
      `Duration: ${duration} months`,
    ].join(' | ');
    const estimate = `AED ${monthlyPrice}`;
    try {
      await Promise.all([
        fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            service: "Rental Calculator Quote",
            message: `${config} | Est: ${estimate}/mo`,
          }),
        }),
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            customerCompany: formData.company,
            configuration: config,
            estimatedRange: estimate,
            message: "",
          }),
        }),
      ]);
    } catch {
      // non-blocking — still unlock
    }
    setSubmitting(false);
    setUnlocked(true);
  };

  return (
    <main className="min-h-screen bg-[#071325]">
      <link rel="canonical" href="https://www.saharaprinter.com/rental-calculator/" />
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-12 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] to-[#0d1e35]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#f5be53]/8 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block text-[#f5be53] font-bold tracking-[0.25em] uppercase text-xs mb-4 px-4 py-1.5 rounded-full border border-[#f5be53]/30 bg-[#f5be53]/10">
            Instant Pricing Engine
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-4 leading-tight">
            Printer Rental{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be53] to-[#c8962e]">
              Calculator
            </span>
          </h1>
          <p className="text-base text-[#8a9bb0] max-w-xl mx-auto">
            Configure your exact requirements. Your personalised commercial proposal is generated instantly.
          </p>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section className="py-10 px-6 lg:px-20 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">

            {/* ── LEFT: Configurator ── */}
            <div className="space-y-6">

              {/* Print Type */}
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest text-[#f5be53] uppercase mb-4">
                  01 — Print Type
                </p>
                <TabGroup
                  options={[
                    { value: "bw", label: "B&W Only" },
                    { value: "color", label: "Colour Only" },
                    { value: "both", label: "B&W + Colour" },
                  ]}
                  value={printType}
                  onChange={handlePrintTypeChange}
                />
                <p className="text-xs text-[#8a9bb0] mt-3">
                  Base rental includes{" "}
                  <span className="text-[#f5be53] font-semibold">
                    {currentFreeBw.toLocaleString()} B&W
                  </span>{" "}
                  +{" "}
                  <span className="text-[#f5be53] font-semibold">
                    {currentFreeColor.toLocaleString()} colour
                  </span>{" "}
                  free prints · pool auto-balances by value
                </p>
              </div>

              {/* Paper Format */}
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest text-[#f5be53] uppercase mb-4">
                  02 — Paper Format
                </p>
                <TabGroup
                  options={[
                    { value: "a4", label: "A4 Only" },
                    { value: "a3", label: "A3 Only" },
                    { value: "both", label: "A4 + A3" },
                  ]}
                  value={paperFormat}
                  onChange={(v) => setPaperFormat(v as "a4" | "a3" | "both")}
                />
              </div>

              {/* Volume Sliders */}
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6 space-y-8">
                <p className="text-xs font-bold tracking-widest text-[#f5be53] uppercase">
                  03 — Monthly Print Volume
                </p>

                <PremiumSlider
                  label="Black & White Prints"
                  value={bwVolume}
                  min={0}
                  max={30000}
                  step={500}
                  freeAllowance={currentFreeBw}
                  unit="pages/mo"
                  onChange={handleBwChange}
                  disabled={printType === "color"}
                />

                <PremiumSlider
                  label="Colour Prints"
                  value={colorVolume}
                  min={0}
                  max={10000}
                  step={100}
                  freeAllowance={currentFreeColor}
                  unit="pages/mo"
                  onChange={handleColorChange}
                  disabled={printType === "bw"}
                />

                {/* print rate legend */}
                <div className="flex gap-4 pt-2 border-t border-white/8">
                  <div className="flex items-center gap-2 text-xs text-[#8a9bb0]">
                    <span className="w-2 h-2 rounded-full bg-[#f5be53]/40 inline-block" />
                    B&W: 6 fils/page
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#8a9bb0]">
                    <span className="w-2 h-2 rounded-full bg-[#f5be53] inline-block" />
                    Colour: 20 fils/page
                  </div>
                </div>
              </div>

              {/* Lease Duration */}
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest text-[#f5be53] uppercase mb-4">
                  04 — Lease Duration
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { months: 12, label: "12 Months", badge: "" },
                    { months: 24, label: "24 Months", badge: "5% off" },
                    { months: 36, label: "36 Months", badge: "10% off" },
                  ].map((opt) => (
                    <button
                      key={opt.months}
                      onClick={() => setDuration(opt.months)}
                      className={`relative p-4 rounded-xl border text-center transition-all duration-200 ${
                        duration === opt.months
                          ? "bg-gradient-to-b from-[#f5be53]/20 to-[#f5be53]/5 border-[#f5be53]/60 text-white"
                          : "border-white/10 text-[#8a9bb0] hover:border-white/20"
                      }`}
                    >
                      <div className="font-bold text-sm">{opt.label}</div>
                      {opt.badge && (
                        <div className="text-[10px] text-[#f5be53] font-semibold mt-0.5">
                          {opt.badge}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* What's included strip */}
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5">
                <p className="text-xs font-bold tracking-widest text-[#f5be53] uppercase mb-4">
                  Every Rental Includes
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Free Maintenance",
                    "On-site Repairs",
                    "Toner Supply",
                    "Technical Support",
                    "Equipment Replacement",
                    "Staff Training",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#8a9bb0]">
                      <span className="material-symbols-outlined text-[#f5be53] text-base">
                        check_circle
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Quote Panel ── */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl overflow-hidden">

                {/* panel header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/8">
                  <p className="text-xs font-bold tracking-widest text-[#f5be53] uppercase">
                    Your Quote Summary
                  </p>
                  <p className="text-white font-bold text-lg mt-1">
                    {unlocked ? "Your Monthly Rental" : "Custom Proposal Ready"}
                  </p>
                </div>

                {/* ── LOCKED STATE ── */}
                {!unlocked && (
                  <div className="relative">
                    {/* blurred placeholder placeholders - NO numbers at all */}
                    <div className="px-6 py-5 space-y-3 select-none pointer-events-none">
                      <div className="h-6 w-32 bg-white/5 rounded-lg" />
                      <div className="h-6 w-40 bg-white/5 rounded-lg" />
                      <div className="h-6 w-36 bg-white/5 rounded-lg" />
                      <div className="h-6 w-28 bg-white/5 rounded-lg" />
                      <div className="h-8 w-48 bg-white/5 rounded-lg mt-4" />
                    </div>

                    {/* strong frosted overlay with lock messaging */}
                    <div className="absolute inset-0 backdrop-blur-md bg-[#0a1929]/80 flex flex-col items-center justify-center gap-3 px-6 py-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f5be53]/30 to-[#c8962e]/10 border border-[#f5be53]/50 flex items-center justify-center shadow-lg shadow-[#f5be53]/20">
                        <span className="material-symbols-outlined text-[#f5be53] text-3xl">lock</span>
                      </div>
                      <p className="text-white font-bold text-center text-lg leading-snug">
                        Your Custom Quote is Ready
                      </p>
                      <p className="text-[#8a9bb0] text-xs text-center leading-relaxed">
                        Unlock Your Exact Monthly Rental
                      </p>
                      <p className="text-[#8a9bb0] text-xs text-center leading-relaxed">
                        Enter Your Details to Reveal Pricing
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#f5be53]/40" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── UNLOCKED STATE ── */}
                {unlocked && (
                  <div className="px-6 py-5 space-y-3">
                    {/* circular indicator */}
                    <div className="flex justify-center py-4">
                      <div className="relative w-36 h-36">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#0a1929" strokeWidth="8" />
                          <circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke="url(#goldArc)" strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${Math.min(100, ((monthlyPrice - BASE_RENT) / 1000) * 100 + 20) * 2.64} 264`}
                          />
                          <defs>
                            <linearGradient id="goldArc" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#f5be53" />
                              <stop offset="100%" stopColor="#c8962e" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[10px] text-[#8a9bb0] uppercase tracking-widest">Monthly</span>
                          <span className="text-xl font-bold text-[#f5be53] leading-tight">AED {monthlyPrice}</span>
                          <span className="text-[10px] text-[#8a9bb0]">excl. VAT</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#8a9bb0]">Base Rental</span>
                      <span className="text-white font-semibold">AED {BASE_RENT}</span>
                    </div>
                    {extraBwCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8a9bb0]">B&W Extra ({extraBw.toLocaleString()} pages)</span>
                        <span className="text-white font-semibold">AED {extraBwCost.toFixed(0)}</span>
                      </div>
                    )}
                    {extraColorCost > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8a9bb0]">Colour Extra ({extraColor.toLocaleString()} pages)</span>
                        <span className="text-white font-semibold">AED {extraColorCost.toFixed(0)}</span>
                      </div>
                    )}
                    {a3Surcharge > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8a9bb0]">A3 Format Surcharge</span>
                        <span className="text-white font-semibold">AED {a3Surcharge}</span>
                      </div>
                    )}
                    {durationDiscount < 1 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#8a9bb0]">
                          {duration}-Month Saving ({Math.round((1 - durationDiscount) * 100)}%)
                        </span>
                        <span className="text-green-400 font-semibold">
                          −AED {Math.round((BASE_RENT + extraBwCost + extraColorCost + a3Surcharge) * (1 - durationDiscount))}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-white/10 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold">Monthly Total</span>
                        <span className="text-[#f5be53] font-bold text-2xl">AED {monthlyPrice}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[#8a9bb0] text-xs">Total over {duration} months</span>
                        <span className="text-[#8a9bb0] text-xs">AED {totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400 text-sm">info</span>
                      <p className="text-[11px] text-amber-200/80">
                        All prices exclude 5% VAT · Includes maintenance, toner & support
                      </p>
                    </div>
                  </div>
                )}

                {/* ── LEAD CAPTURE FORM ── */}
                {!unlocked && (
                  <form onSubmit={handleUnlock} className="px-6 pb-6 pt-2 space-y-3">
                    <input
                      required
                      type="text"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0a1929] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-[#4a5a6a] focus:outline-none focus:border-[#f5be53]/50 transition-colors"
                    />
                    <input
                      required
                      type="text"
                      placeholder="Company Name *"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#0a1929] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-[#4a5a6a] focus:outline-none focus:border-[#f5be53]/50 transition-colors"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0a1929] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-[#4a5a6a] focus:outline-none focus:border-[#f5be53]/50 transition-colors"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0a1929] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-[#4a5a6a] focus:outline-none focus:border-[#f5be53]/50 transition-colors"
                    />
                    <div>
                      <p className="text-xs text-[#8a9bb0] mb-2">Preferred Contact</p>
                      <div className="flex gap-2">
                        {["email", "phone", "whatsapp"].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setFormData({ ...formData, contactMethod: m })}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                              formData.contactMethod === m
                                ? "bg-[#f5be53]/20 border border-[#f5be53]/50 text-[#f5be53]"
                                : "bg-[#0a1929] border border-white/10 text-[#8a9bb0]"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#1a0e00] py-4 rounded-xl font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">lock_open</span>
                      {submitting ? "Processing…" : "Reveal My Monthly Rental"}
                    </button>
                    <p className="text-[10px] text-[#8a9bb0] text-center">
                      Our consultants will contact you within 2 working hours
                    </p>
                  </form>
                )}

                {/* ── POST-UNLOCK CTA ── */}
                {unlocked && (
                  <div className="px-6 pb-6 space-y-3">
                    <a
                      href="/get-quote"
                      className="w-full bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#1a0e00] py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">send</span>
                      Submit Quote Request
                    </a>
                    <a
                      href="/contact"
                      className="w-full bg-transparent border border-white/15 text-white py-3.5 rounded-xl font-semibold text-sm hover:border-[#f5be53]/40 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">calendar_month</span>
                      Schedule Free Consultation
                    </a>
                    <p className="text-[10px] text-[#8a9bb0] text-center">
                      Our consultants will contact you within 2 working hours
                    </p>
                  </div>
                )}
              </div>

              {/* trust badges */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { icon: "verified", label: "Zero Deposit" },
                  { icon: "support_agent", label: "4hr Response" },
                  { icon: "workspace_premium", label: "Since 2012" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="bg-[#0d1e35] border border-white/8 rounded-xl p-3 flex flex-col items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[#f5be53] text-xl">{b.icon}</span>
                    <span className="text-[10px] text-[#8a9bb0] font-medium text-center">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}
