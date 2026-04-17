"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import { Shield, Nature, Cloud, WorkspacePremium, Speed } from "@mui/icons-material";

export default function HPBrandPage() {
  const [brandImage, setBrandImage] = useState("/images/printer-hp.svg");

  useEffect(() => {
    const storedBrands = localStorage.getItem("sahara_brands");
    if (storedBrands) {
      const brands = JSON.parse(storedBrands);
      const hp = brands.find((b: any) => b.slug === "hp");
      if (hp?.heroImage) setBrandImage(hp.heroImage);
    }
  }, []);

  const products = [
    { name: "LaserJet Enterprise", specs: ["55 PPM", "1200 DPI"], img: "/images/printer-hp.svg" },
    { name: "DesignJet Z-Series", specs: ["9-Color Ink", "44-Inch Max"], img: "/images/printer-hp.svg" },
    { name: "OfficeJet Pro Wide-Format", specs: ["High-Volume", "Network Ready"], img: "/images/unsplash-office.webp" },
  ];

  const features = [
    { icon: Shield, title: "Wolf Security", desc: "Industry-leading hardware-enforced protection from BIOS to browser." },
    { icon: Nature, title: "Eco Innovation", desc: "Closed-loop manufacturing and sustainable printing for modern ESG goals." },
    { icon: Cloud, title: "Cloud Manageability", desc: "Seamless fleet management with HP Smart Admin and centralized control." },
    { icon: WorkspacePremium, title: "Premium Heritage", desc: "Decades of engineering excellence translated into executive tools." },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
                <span className="text-xs uppercase tracking-widest text-[#f5be53] font-medium">Certified HP Technology Partner</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                HP Authorized <span className="text-[#f5be53]">Partner</span>
              </h1>
              <p className="text-lg text-[#d3c5b0] mb-8 max-w-xl leading-relaxed">
                Experience the pinnacle of corporate printing. As authorized Sahara partners, we deliver HP's Enterprise-grade solutions tailored for the most demanding executive environments.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/get-quote?brand=hp" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform inline-block shadow-xl shadow-[#f5be53]/20">
                  Enquire for HP Models
                </a>
                <a href="#products" className="glass-card text-white px-8 py-4 rounded-full font-bold hover:bg-[#2a3548] transition-all border border-[#f5be53]/20 inline-block">
                  View Products
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[#f5be53]/10 blur-[120px] rounded-full"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#030e20]">
                <img 
                  src={brandImage}
                  alt="HP Printer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why HP */}
      <section className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose HP Excellence</h2>
            <p className="text-[#d3c5b0] max-w-2xl mx-auto">Standard-setting technology for businesses that demand the absolute best in security, reliability, and innovation.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const IconComponent = f.icon;
              return (
                <div key={i} className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#142032]/60 flex items-center justify-center border border-[#f5be53]/20 mb-4">
                    <IconComponent className="text-3xl text-[#f5be53]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-[#d3c5b0]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Precision Engineering</h2>
            <div className="h-1 w-20 bg-[#f5be53] rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <div key={i} className="glass-card rounded-[32px] p-8 group hover:-translate-y-2 transition-transform duration-500">
                <div className="aspect-square mb-8 rounded-2xl overflow-hidden bg-[#101c2e]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                <p className="text-[#d3c5b0] text-sm mb-6">Unrivaled security and performance for high-volume corporate fleets.</p>
                <div className="flex justify-between items-center py-4 border-t border-white/5">
                  {p.specs.map((s, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Speed className="text-[#f5be53] text-sm" />
                      <span className="text-xs text-[#d3c5b0]">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-5xl mx-auto glass-card rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f5be53]/5 -z-10"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Upgrade Your <span className="text-[#f5be53]">Infrastructure?</span></h2>
          <p className="text-[#d3c5b0] mb-10 max-w-2xl mx-auto text-lg">Schedule a private consultation with our HP product specialists to tailor the perfect solution for your corporate environment.</p>
          <a href="/get-quote?brand=hp" className="px-12 py-5 bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-[#f5be53]/30 inline-block">
            Enquire for HP Models
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
      <MobileNav />
    </main>
  );
}
