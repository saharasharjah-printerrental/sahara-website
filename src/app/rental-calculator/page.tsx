"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";

interface CalculatorSettingsIcon {
  a4BasePrice: number;
  a3BasePrice: number;
  plotterBasePrice: number;
  colorMultiplier: number;
  volumeThreshold1: number;
  volumeThreshold2: number;
  volumeMultiplier1: number;
  volumeMultiplier2: number;
  volumeMultiplier3: number;
  discount36Months: number;
  discount24Months: number;
  discount12Months: number;
}

const defaultCalcSettingsIcon: CalculatorSettingsIcon = {
  a4BasePrice: 600,
  a3BasePrice: 1200,
  plotterBasePrice: 2500,
  colorMultiplier: 1.4,
  volumeThreshold1: 5000,
  volumeThreshold2: 10000,
  volumeMultiplier1: 1,
  volumeMultiplier2: 1.1,
  volumeMultiplier3: 1.25,
  discount36Months: 0.8,
  discount24Months: 0.85,
  discount12Months: 0.9,
};

export default function RentalCalculatorPage() {
  const [PrinterType, setPrinterType] = useState("a4");
  const [colorOutput, setColorOutput] = useState("mono");
  const [monthlyVolume, setMonthlyVolume] = useState(5000);
  const [duration, setDuration] = useState(12);
  const [calcSettingsIcon, setCalcSettingsIcon] = useState<CalculatorSettingsIcon>(defaultCalcSettingsIcon);

  const loadSettingsIcon = () => {
    try {
      const stored = localStorage.getItem("sahara_SettingsIcon");
      if (stored) {
        const SettingsIcon = JSON.parse(stored);
        if (SettingsIcon && SettingsIcon.calculatorPrices) {
          setCalcSettingsIcon(SettingsIcon.calculatorPrices);
        }
      }
    } catch (e) {
      console.error("Error loading calculator SettingsIcon:", e);
    }
  };

  useEffect(() => {
    loadSettingsIcon();
    const handleSettingsIconUpdate = () => loadSettingsIcon();
    window.addEventListener("sahara-SettingsIcon-updated", handleSettingsIconUpdate);
    return () => window.removeEventListener("sahara-SettingsIcon-updated", handleSettingsIconUpdate);
  }, []);

  const getBasePrice = () => {
    if (PrinterType === "plotter") return calcSettingsIcon.plotterBasePrice;
    if (PrinterType === "a3") return calcSettingsIcon.a3BasePrice;
    return calcSettingsIcon.a4BasePrice;
  };

  const getColorMultiplier = () => colorOutput === "color" ? calcSettingsIcon.colorMultiplier : 1;

  const getVolumeMultiplier = () => {
    if (monthlyVolume > 20000) return calcSettingsIcon.volumeMultiplier3;
    if (monthlyVolume > calcSettingsIcon.volumeThreshold2) return calcSettingsIcon.volumeMultiplier3;
    if (monthlyVolume > calcSettingsIcon.volumeThreshold1) return calcSettingsIcon.volumeMultiplier2;
    return calcSettingsIcon.volumeMultiplier1;
  };

  const getDurationDiscount = () => {
    if (duration >= 36) return calcSettingsIcon.discount36Months;
    if (duration >= 24) return calcSettingsIcon.discount24Months;
    if (duration >= 12) return calcSettingsIcon.discount12Months;
    return 1;
  };

  const monthlyPrice = Math.round(
    getBasePrice() * getColorMultiplier() * getVolumeMultiplier() * getDurationDiscount()
  );

  const totalCost = monthlyPrice * duration;

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f5be53]/10 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Plan Your Budget</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            Rental <span className="text-[#f5be53]">Calculator</span>
          </h1>
          <p className="text-lg text-[#d3c5b0] max-w-2xl mx-auto">
            Calculate your monthly Printer rental cost based on your requirements. Get instant pricing for your business needs.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">Configure Your Rental</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[#d3c5b0] mb-3 text-sm font-medium">Printer Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "a4", label: "A4 Laser" },
                      { value: "a3", label: "A3 MFP" },
                      { value: "plotter", label: "Plotter" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPrinterType(opt.value)}
                        className={`p-4 rounded-xl border transition-all ${
                          PrinterType === opt.value
                            ? "bg-[#f5be53] text-[#412d00] border-[#f5be53]"
                            : "border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#d3c5b0] mb-3 text-sm font-medium">Output Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setColorOutput("mono")}
                      className={`p-4 rounded-xl border transition-all ${
                        colorOutput === "mono"
                          ? "bg-[#f5be53] text-[#412d00] border-[#f5be53]"
                          : "border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53]"
                      }`}
                    >
                      Monochrome
                    </button>
                    <button
                      onClick={() => setColorOutput("color")}
                      className={`p-4 rounded-xl border transition-all ${
                        colorOutput === "color"
                          ? "bg-[#f5be53] text-[#412d00] border-[#f5be53]"
                          : "border-[#4f4536] text-[#d3c5b0] hover:border-[#f5be53]"
                      }`}
                    >
                      Color
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[#d3c5b0] mb-3 text-sm font-medium">
                    Monthly Print Volume: <span className="text-white font-bold">{monthlyVolume.toLocaleString()}</span> pages
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    className="w-full h-2 bg-[#142032] rounded-lg appearance-none cursor-pointer accent-[#f5be53]"
                  />
                  <div className="flex justify-between text-xs text-[#d3c5b0] mt-2">
                    <span>1,000</span>
                    <span>50,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#d3c5b0] mb-3 text-sm font-medium">
                    Rental Duration: <span className="text-white font-bold">{duration} months</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="36"
                    step="3"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-2 bg-[#142032] rounded-lg appearance-none cursor-pointer accent-[#f5be53]"
                  />
                  <div className="flex justify-between text-xs text-[#d3c5b0] mt-2">
                    <span>3 months</span>
                    <span>36 months</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">Estimated Pricing</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center p-4 bg-[#101c2e] rounded-xl">
                  <span className="text-[#d3c5b0]">Base Price</span>
                  <span className="text-white font-bold">AED {getBasePrice()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#101c2e] rounded-xl">
                  <span className="text-[#d3c5b0]">Output Type</span>
                  <span className="text-white font-bold">{colorOutput === "color" ? "Color (x1.4)" : "Mono (x1)"}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#101c2e] rounded-xl">
                  <span className="text-[#d3c5b0]">Volume Adjustment</span>
                  <span className="text-white font-bold">x{getVolumeMultiplier()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#101c2e] rounded-xl">
                  <span className="text-[#d3c5b0]">Duration Discount</span>
                  <span className="text-white font-bold">x{getDurationDiscount()}</span>
                </div>
              </div>

              <div className="border-t border-[#4f4536] pt-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#d3c5b0]">Monthly Rental</span>
                  <span className="text-3xl font-bold text-[#f5be53]">AED {monthlyPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#d3c5b0]">Total Contract Value</span>
                  <span className="text-xl font-bold text-white">AED {totalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-[#d3c5b0] text-sm mb-4">*Includes maintenance and support</p>
                <a 
                  href="/get-quote" 
                  className="inline-block bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Get Official Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-[#101c2e]">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-[2rem] p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">What's Included</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Free Maintenance",
                "On-site Repairs",
                "Toner Supply",
                "Technical Support",
                "Equipment Replacement",
                "Training included",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#f5be53]">check_circle</span>
                  <span className="text-[#d3c5b0]">{item}</span>
                </div>
              ))}
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
