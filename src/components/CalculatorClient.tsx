"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { validateEmail, validateUAEPhone } from "@/lib/emailValidation";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { ShieldCheckIcon, HeadsetIcon, AwardIcon } from "@/components/icons";

// ── Pricing constants ──────────────────────────────────────────────────────────
const BASE_RENT = 350;
const BW_PRICE = 0.06;   // AED per page
const COLOR_PRICE = 0.20; // AED per page
const FREE_BW_DEFAULT = 3000;
const FREE_COLOR_DEFAULT = 1000;
// Total included free print value in AED: 3000×0.06 + 1000×0.20 = 180 + 200 = 380
const TOTAL_FREE_VALUE = FREE_BW_DEFAULT * BW_PRICE + FREE_COLOR_DEFAULT * COLOR_PRICE;
// freePoolSplit: BW's share of TOTAL_FREE_VALUE in AED (slider 0‒TOTAL_FREE_VALUE)
const FREE_POOL_SPLIT_DEFAULT = FREE_BW_DEFAULT * BW_PRICE; // 180

// ── TabGroup ───────────────────────────────────────────────────────────────────
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
    <div className="flex gap-1.5 p-1 bg-ink rounded-xl border border-primary/[0.12]">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            value === opt.value
              ? "bg-primary text-ink shadow-[0_2px_12px_rgba(245,190,83,0.35)]"
              : "text-muted hover:text-white hover:bg-white/5"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── PremiumSlider ──────────────────────────────────────────────────────────────
function PremiumSlider({
  label,
  value,
  min,
  max,
  step,
  freeAllowance,
  pricePerPage,
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
  pricePerPage: number;
  unit: string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const freePct = Math.min(100, ((freeAllowance - min) / (max - min)) * 100);
  const extra = Math.max(0, value - freeAllowance);
  const extraCost = extra * pricePerPage;

  return (
    <div className={`transition-opacity duration-200 ${disabled ? "opacity-30 pointer-events-none" : ""}`}>
      <div className="flex justify-between items-end mb-3">
        <span className="text-sm font-medium text-muted">{label}</span>
        <div className="text-right">
          <span className="text-2xl font-bold text-white tabular-nums">{value.toLocaleString()}</span>
          <span className="text-xs text-muted ml-1.5">{unit}</span>
        </div>
      </div>

      <div className="relative h-2.5 bg-ink rounded-full mb-3 border border-white/5">
        {/* Free allowance zone */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-primary/15 transition-all duration-200"
          style={{ width: `${freePct}%` }}
        />
        {/* Volume fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-deep transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
        {/* Free threshold marker */}
        {freePct > 2 && freePct < 98 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary/70 rounded-full"
            style={{ left: `${freePct}%` }}
          />
        )}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-[0_0_12px_rgba(245,190,83,0.5)] transition-all duration-100 pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between text-xs">
        <span className="flex items-center gap-1.5 text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" />
          {freeAllowance.toLocaleString()} included free
        </span>
        {extra > 0 ? (
          <span className="text-amber-300 font-medium">
            +{extra.toLocaleString()} extra · AED {extraCost.toFixed(0)}
          </span>
        ) : (
          <span className="text-muted">within free tier</span>
        )}
      </div>
    </div>
  );
}

// ── Pool Rebalancer ────────────────────────────────────────────────────────────
// A single slider that redistributes the AED 380 free print value between BW and Color
function PoolRebalancer({
  split,
  onChange,
}: {
  split: number; // BW's share in AED (0 – TOTAL_FREE_VALUE)
  onChange: (v: number) => void;
}) {
  const freeBw = Math.round(split / BW_PRICE);
  const freeColor = Math.round((TOTAL_FREE_VALUE - split) / COLOR_PRICE);
  const pct = (split / TOTAL_FREE_VALUE) * 100;

  return (
    <div className="bg-ink/60 border border-primary/[0.08] rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[11px] font-bold tracking-[0.15em] text-primary uppercase">
          Redistribute Free Print Pool
        </span>
        <span className="text-[10px] text-muted">AED {TOTAL_FREE_VALUE} included value</span>
      </div>

      {/* Balance indicators */}
      <div className="flex justify-between mb-2">
        <div className="text-left">
          <p className="text-[10px] text-muted">B&W Free</p>
          <p className="text-sm font-bold text-white tabular-nums">{freeBw.toLocaleString()}</p>
          <p className="text-[10px] text-muted">pages</p>
        </div>
        <div className="text-center self-end pb-0.5">
          <span className="text-[11px] text-primary/60">◄ balance ►</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted">Colour Free</p>
          <p className="text-sm font-bold text-white tabular-nums">{freeColor.toLocaleString()}</p>
          <p className="text-[10px] text-muted">pages</p>
        </div>
      </div>

      {/* Balance slider */}
      <div className="relative h-2 bg-surface rounded-full border border-white/5 my-3">
        {/* BW side fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-l-full bg-gradient-to-r from-[#4a90d9] to-[#3a72b0]"
          style={{ width: `${pct}%` }}
        />
        {/* Color side fill */}
        <div
          className="absolute top-0 right-0 h-full rounded-r-full bg-gradient-to-l from-primary to-primary-deep"
          style={{ width: `${100 - pct}%` }}
        />
        <input
          type="range"
          min={0}
          max={Math.round(TOTAL_FREE_VALUE * 100)}
          step={1}
          value={Math.round(split * 100)}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-[0_0_12px_rgba(245,190,83,0.5)] pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-muted">
        <span>← More B&W (6 fils/pg)</span>
        <span>More Colour (20 fils/pg) →</span>
      </div>
    </div>
  );
}

// ── DurationSlider ─────────────────────────────────────────────────────────────
function DurationSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const stops = [12, 24, 36];
  const idx = stops.indexOf(value);
  const pct = (idx / (stops.length - 1)) * 100;

  const discountLabel = value === 24 ? "5% loyalty discount" : value === 36 ? "10% loyalty discount" : "";

  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <span className="text-sm font-medium text-muted">Lease Duration</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white tabular-nums">{value}</span>
          <span className="text-xs text-muted">months</span>
          {discountLabel && (
            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-full">
              {discountLabel}
            </span>
          )}
        </div>
      </div>

      <div className="relative h-2.5 bg-ink rounded-full mb-4 border border-white/5">
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary to-primary-deep transition-all duration-200"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={idx}
          onChange={(e) => onChange(stops[Number(e.target.value)])}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 border-primary shadow-[0_0_12px_rgba(245,190,83,0.5)] transition-all duration-200 pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between">
        {stops.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`text-xs font-semibold transition-colors ${
              value === s ? "text-primary" : "text-muted hover:text-white"
            }`}
          >
            {s} mo
            {i > 0 && (
              <span className="block text-[9px] font-normal mt-0.5">
                {i === 1 ? "−5%" : "−10%"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

const trail = [{ label: "Home", href: "/" }, { label: "Rental Calculator" }];

// ── Main component ─────────────────────────────────────────────────────────────
export default function CalculatorClient() {
  const [printType, setPrintType] = useState<"bw" | "color" | "both">("both");
  const [paperFormat, setPaperFormat] = useState<"a4" | "a3" | "both">("a4");

  // Free print pool: split is BW's AED share of TOTAL_FREE_VALUE (0–380).
  // Default: 180 AED → 3000 BW free; remaining 200 AED → 1000 Color free.
  const [freePoolSplit, setFreePoolSplit] = useState(FREE_POOL_SPLIT_DEFAULT);

  // Monthly volume sliders — INDEPENDENT from free allowances (the key fix)
  const [bwVolume, setBwVolume] = useState(FREE_BW_DEFAULT);
  const [colorVolume, setColorVolume] = useState(FREE_COLOR_DEFAULT);

  const [duration, setDuration] = useState(12);
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  // ── Derived free allowances (value-balanced) ──────────────────────────────
  const freeBwAllowance: number = (() => {
    if (printType === "color") return 0;
    if (printType === "bw") return Math.round(TOTAL_FREE_VALUE / BW_PRICE);  // 6333
    return Math.round(freePoolSplit / BW_PRICE);
  })();

  const freeColorAllowance: number = (() => {
    if (printType === "bw") return 0;
    if (printType === "color") return Math.round(TOTAL_FREE_VALUE / COLOR_PRICE); // 1900
    return Math.round((TOTAL_FREE_VALUE - freePoolSplit) / COLOR_PRICE);
  })();

  // ── Print type change resets volumes and pool to sensible defaults ─────────
  const handlePrintTypeChange = (v: string) => {
    const t = v as "bw" | "color" | "both";
    setPrintType(t);
    if (t === "bw") {
      setBwVolume(Math.round(TOTAL_FREE_VALUE / BW_PRICE));
      setColorVolume(0);
    } else if (t === "color") {
      setBwVolume(0);
      setColorVolume(Math.round(TOTAL_FREE_VALUE / COLOR_PRICE));
    } else {
      setFreePoolSplit(FREE_POOL_SPLIT_DEFAULT);
      setBwVolume(FREE_BW_DEFAULT);
      setColorVolume(FREE_COLOR_DEFAULT);
    }
  };

  // ── Pricing calculation (volumes and allowances are now separate) ──────────
  const extraBw = Math.max(0, bwVolume - freeBwAllowance);
  const extraColor = Math.max(0, colorVolume - freeColorAllowance);
  const extraBwCost = extraBw * BW_PRICE;
  const extraColorCost = extraColor * COLOR_PRICE;
  const a3Surcharge = paperFormat === "a3" ? 80 : paperFormat === "both" ? 50 : 0;
  const durationDiscount = duration === 36 ? 0.90 : duration === 24 ? 0.95 : 1.0;
  const subtotal = BASE_RENT + extraBwCost + extraColorCost + a3Surcharge;
  const monthlyPrice = Math.max(BASE_RENT, Math.round(subtotal * durationDiscount));
  const totalCost = monthlyPrice * duration;
  const savingAmount = Math.round(subtotal * (1 - durationDiscount));

  // ── Form submission ────────────────────────────────────────────────────────
  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const emailCheck = validateEmail(formData.email);
    if (!emailCheck.valid) {
      setFormError(emailCheck.error ?? "Invalid email address");
      return;
    }
    const phoneCheck = validateUAEPhone(formData.phone || '');
    if (!phoneCheck.valid) {
      setFormError(phoneCheck.error ?? "Enter a valid UAE mobile number");
      return;
    }
    setSubmitting(true);
    const config = [
      `Print: ${printType.toUpperCase()}`,
      `Paper: ${paperFormat.toUpperCase()}`,
      `B&W: ${bwVolume.toLocaleString()} pages/mo (${freeBwAllowance.toLocaleString()} free)`,
      `Colour: ${colorVolume.toLocaleString()} pages/mo (${freeColorAllowance.toLocaleString()} free)`,
      `Duration: ${duration} months`,
    ].join(" | ");
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: `+971 ${formData.phone}`,
          customerCompany: formData.company,
          configuration: config,
          message: "",
          estimatedRange: `AED ${monthlyPrice.toLocaleString()}`,
          notificationEmail: "",
          baseRent: `AED ${BASE_RENT.toLocaleString()}`,
          extraBwCost: extraBwCost > 0 ? `AED ${extraBwCost.toLocaleString()}` : undefined,
          extraColorCost: extraColorCost > 0 ? `AED ${extraColorCost.toLocaleString()}` : undefined,
          a3Surcharge: a3Surcharge > 0 ? `AED ${a3Surcharge}` : undefined,
          durationDiscount: duration === 36 ? '10%' : duration === 24 ? '5%' : undefined,
          totalContractValue: `AED ${totalCost.toLocaleString()}`,
          printType: printType.toUpperCase(),
          paperFormat: paperFormat.toUpperCase(),
          bwVolume: `${bwVolume.toLocaleString()} pages/mo`,
          colorVolume: colorVolume > 0 ? `${colorVolume.toLocaleString()} pages/mo` : undefined,
        }),
      });
    } catch {
      setFormError("Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    setUnlocked(true);
  };

  // ── Circular arc (pricing panel) ───────────────────────────────────────────
  const arcRadius = 44;
  const arcCircumference = 2 * Math.PI * arcRadius;
  const arcFill = Math.min(0.85, 0.15 + ((monthlyPrice - BASE_RENT) / 1500) * 0.7);
  const arcDash = arcFill * arcCircumference;

  return (
    <main className="min-h-screen bg-ink">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-10 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-surface to-ink" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.06] rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-content mx-auto relative z-10">
          <Breadcrumbs trail={trail} />
          <Reveal className="text-center">
            <span className="inline-block text-primary font-bold tracking-[0.25em] uppercase text-[11px] mb-5 px-5 py-1.5 rounded-full border border-primary/25 bg-primary/[0.08]">
              Instant Pricing Engine
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-4 leading-tight">
              Printer Rental{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-deep">
                Calculator
              </span>
            </h1>
            <p className="text-base text-muted max-w-xl mx-auto leading-relaxed">
              Configure your exact requirements. Enter your details to unlock your personalised commercial proposal.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-8 px-6 lg:px-20 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_440px] gap-8 items-start">

            {/* LEFT PANEL — Configuration */}
            <div className="space-y-5">

              {/* 01 — Print Type */}
              <div className="bg-surface border border-primary/[0.10] rounded-2xl p-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
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
                <p className="text-[11px] text-muted mt-3.5 leading-relaxed">
                  Base rental includes{" "}
                  <span className="text-primary font-semibold">{freeBwAllowance.toLocaleString()} B&W</span>
                  {printType === "both" && (
                    <>
                      {" "}+{" "}
                      <span className="text-primary font-semibold">{freeColorAllowance.toLocaleString()} colour</span>
                    </>
                  )}{" "}
                  free prints · AED {TOTAL_FREE_VALUE} value included
                </p>
              </div>

              {/* 02 — Paper Format */}
              <div className="bg-surface border border-primary/[0.10] rounded-2xl p-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
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
                {paperFormat !== "a4" && (
                  <p className="text-[11px] text-amber-300/70 mt-3">
                    {paperFormat === "a3"
                      ? "+AED 80/mo surcharge for A3 format"
                      : "+AED 50/mo surcharge for A4 + A3 combined"}
                  </p>
                )}
              </div>

              {/* 03 — Monthly Print Volume */}
              <div className="bg-surface border border-primary/[0.10] rounded-2xl p-6 space-y-7">
                <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
                  03 — Monthly Print Volume
                </p>

                {/* Free pool redistribution — only shown in "both" mode */}
                {printType === "both" && (
                  <PoolRebalancer
                    split={freePoolSplit}
                    onChange={setFreePoolSplit}
                  />
                )}

                <PremiumSlider
                  label="Black & White Prints"
                  value={bwVolume}
                  min={0}
                  max={30000}
                  step={500}
                  freeAllowance={freeBwAllowance}
                  pricePerPage={BW_PRICE}
                  unit="pages/mo"
                  onChange={setBwVolume}
                  disabled={printType === "color"}
                />

                <PremiumSlider
                  label="Colour Prints"
                  value={colorVolume}
                  min={0}
                  max={10000}
                  step={100}
                  freeAllowance={freeColorAllowance}
                  pricePerPage={COLOR_PRICE}
                  unit="pages/mo"
                  onChange={setColorVolume}
                  disabled={printType === "bw"}
                />

                <div className="flex gap-5 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[11px] text-muted">
                    <span className="w-2 h-2 rounded-full bg-[#4a90d9]/60 inline-block" />
                    B&W: 6 fils/page
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                    Colour: 20 fils/page
                  </div>
                </div>
              </div>

              {/* 04 — Lease Duration */}
              <div className="bg-surface border border-primary/[0.10] rounded-2xl p-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-5">
                  04 — Lease Duration
                </p>
                <DurationSlider value={duration} onChange={setDuration} />
              </div>

              {/* Inclusions */}
              <div className="bg-surface border border-primary/[0.10] rounded-2xl p-5">
                <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
                  Every Rental Includes
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {[
                    "Free Maintenance",
                    "On-site Repairs",
                    "Toner Supply",
                    "Technical Support",
                    "Equipment Replacement",
                    "Staff Training",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted">
                      <span className="material-symbols-outlined text-primary text-base flex-shrink-0">
                        check_circle
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — Quote Summary */}
            <div className="lg:sticky lg:top-28 space-y-4">

              <div className="bg-surface border border-primary/[0.12] rounded-2xl overflow-hidden">

                {/* Card header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/6">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase">
                    Your Quote Summary
                  </p>
                  <p className="text-white font-bold text-lg mt-1">
                    {unlocked ? "Your Monthly Rental" : "Custom Proposal Ready"}
                  </p>
                </div>

                <div className="relative">

                  {/* REVEALED — shown after form submission */}
                  <div
                    className={`transition-all duration-700 ease-out ${
                      unlocked ? "block opacity-100 translate-y-0" : "hidden"
                    }`}
                  >
                    {/* Circular indicator */}
                    <div className="flex justify-center pt-8 pb-2">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r={arcRadius} fill="none" stroke="#050d1a" strokeWidth="7" />
                          <circle
                            cx="50" cy="50" r={arcRadius}
                            fill="none"
                            stroke="url(#goldGrad)"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeDasharray={`${arcDash} ${arcCircumference}`}
                          />
                          <defs>
                            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#f5be53" />
                              <stop offset="100%" stopColor="#c8962e" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-[10px] text-muted uppercase tracking-[0.15em]">Monthly</span>
                          <span className="text-[22px] font-bold text-primary leading-tight tabular-nums">
                            AED {monthlyPrice}
                          </span>
                          <span className="text-[10px] text-muted">excl. VAT</span>
                        </div>
                      </div>
                    </div>

                    {/* Line-item breakdown */}
                    <div className="px-6 pb-2 space-y-2.5 mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Base Rental</span>
                        <span className="text-white font-semibold">AED {BASE_RENT}</span>
                      </div>
                      {extraBwCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">B&W Extra ({extraBw.toLocaleString()} pages)</span>
                          <span className="text-white font-semibold">AED {extraBwCost.toFixed(0)}</span>
                        </div>
                      )}
                      {extraColorCost > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">Colour Extra ({extraColor.toLocaleString()} pages)</span>
                          <span className="text-white font-semibold">AED {extraColorCost.toFixed(0)}</span>
                        </div>
                      )}
                      {a3Surcharge > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">A3 Format Surcharge</span>
                          <span className="text-white font-semibold">AED {a3Surcharge}</span>
                        </div>
                      )}
                      {durationDiscount < 1 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted">
                            {duration}-Month Saving ({Math.round((1 - durationDiscount) * 100)}%)
                          </span>
                          <span className="text-emerald-400 font-semibold">−AED {savingAmount}</span>
                        </div>
                      )}

                      <div className="border-t border-white/8 pt-3 pb-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold">Monthly Total</span>
                          <span className="text-primary font-bold text-2xl tabular-nums">AED {monthlyPrice}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-muted text-xs">Total over {duration} months</span>
                          <span className="text-muted text-xs tabular-nums">AED {totalCost.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="bg-amber-500/8 border border-amber-500/15 rounded-xl px-4 py-2.5 flex items-start gap-2">
                        <span className="material-symbols-outlined text-amber-400 text-sm flex-shrink-0 mt-0.5">info</span>
                        <p className="text-[11px] text-amber-200/70 leading-relaxed">
                          All prices exclude 5% VAT · Includes maintenance, toner & on-site support
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 space-y-3">
                      <a
                        href="/contact/"
                        className="w-full bg-gradient-to-r from-primary to-primary-deep text-ink py-4 rounded-xl font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,190,83,0.3)]"
                      >
                        <span className="material-symbols-outlined text-base">send</span>
                        Talk to an Expert
                      </a>
                      <a
                        href="/contact/"
                        className="w-full bg-transparent border border-white/12 text-white py-3.5 rounded-xl font-semibold text-sm hover:border-primary/30 hover:bg-white/3 transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base">calendar_month</span>
                        Schedule Free Consultation
                      </a>
                      <p className="text-[10px] text-muted text-center">
                        Our consultants will contact you within 2 working hours
                      </p>
                    </div>
                  </div>

                  {/* LOCKED — contact form overlay */}
                  <div
                    className={`transition-all duration-700 ease-out ${
                      unlocked ? "hidden" : "block"
                    }`}
                  >
                    {/* Frosted glass overlay */}
                    <div className="relative w-full bg-ink/60 flex flex-col items-center justify-start pt-6 pb-6 px-5 gap-4">

                      <div className="w-16 h-16 rounded-full bg-primary/[0.08] border border-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,190,83,0.15)]">
                        <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                      </div>

                      <div className="text-center">
                        <p className="text-white font-bold text-base leading-snug">
                          Your Custom Quote is Ready
                        </p>
                        <p className="text-muted text-xs mt-1.5 leading-relaxed">
                          Enter your details to unlock your exact monthly rental
                        </p>
                      </div>

                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-primary/30"
                            style={{ opacity: 0.3 + i * 0.25 }}
                          />
                        ))}
                      </div>

                      {/* Lead capture form */}
                      <form onSubmit={handleUnlock} className="w-full space-y-2.5">
                        <input
                          required
                          type="text"
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-ink/80 border border-white/10 focus:border-primary/40 rounded-xl py-3 px-4 text-white text-sm placeholder-[#4a5a6a] outline-none transition-colors"
                        />
                        <input
                          required
                          type="text"
                          placeholder="Company Name *"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-ink/80 border border-white/10 focus:border-primary/40 rounded-xl py-3 px-4 text-white text-sm placeholder-[#4a5a6a] outline-none transition-colors"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-ink/80 border border-white/10 focus:border-primary/40 rounded-xl py-3 px-4 text-white text-sm placeholder-[#4a5a6a] outline-none transition-colors"
                        />
                        <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-primary/40 transition-colors bg-ink/80">
                          <span className="flex items-center px-3 text-primary text-sm font-bold bg-surface/60 border-r border-white/10 select-none whitespace-nowrap">+971</span>
                          <input
                            required
                            type="tel"
                            placeholder="5X XXX XXXX *"
                            value={formData.phone}
                            maxLength={9}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 9) })}
                            className="flex-1 bg-transparent py-3 px-3 text-white text-sm placeholder-[#4a5a6a] outline-none"
                          />
                        </div>

                        {formError && (
                          <p className="text-red-400 text-xs px-1">{formError}</p>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-gradient-to-r from-primary to-primary-deep text-ink py-4 rounded-xl font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,190,83,0.4)]"
                        >
                          <span className="material-symbols-outlined text-base">
                            {submitting ? "hourglass_empty" : "lock_open"}
                          </span>
                          {submitting ? "Processing…" : "Unlock My Exact Quote"}
                        </button>
                      </form>

                      <p className="text-[10px] text-muted text-center">
                        Our consultants will contact you within 2 working hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheckIcon, label: "Zero Deposit" },
                  { icon: HeadsetIcon, label: "4hr Response" },
                  { icon: AwardIcon, label: "Since 2012" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="bg-surface border border-primary/[0.08] rounded-xl p-3 flex flex-col items-center gap-1.5"
                  >
                    <b.icon size={20} className="text-primary" />
                    <span className="text-[10px] text-muted font-medium text-center">{b.label}</span>
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
    </main>
  );
}
