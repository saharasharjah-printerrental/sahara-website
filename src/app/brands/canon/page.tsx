"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import MobileNav from "@/components/MobileNav";
import Image from "next/image";
import { Hub, DeveloperBoard, Nature, Palette, Print, Security } from "@mui/icons-material";

export default function CanonBrandPage() {
  const [brandImage, setBrandImage] = useState("/images/unsplash-office.webp");

  useEffect(() => {
    const storedBrands = localStorage.getItem("sahara_brands");
    if (storedBrands) {
      const brands = JSON.parse(storedBrands);
      const canon = brands.find((b: any) => b.slug === "canon");
      if (canon?.heroImage) setBrandImage(canon.heroImage);
    }
  }, []);

  const products = [
    { name: "imageRUNNER ADVANCE DX", type: "Cloud-connected A3 Color MFP", speed: "High-speed scanning", img: "/images/printer-canon-1.webp" },
    { name: "C3800 Series", type: "Compact powerhouses", speed: "Medium workgroups", img: "" },
    { name: "C5800 Series", type: "Enterprise security", speed: "360° document protection", img: "" },
  ];

  const features = [
    { icon: Hub, title: "uniFLOW Online", desc: "Single cloud solution to manage all printing and scanning workflows. Increase security by requiring user authentication." },
    { icon: DeveloperBoard, title: "MEAP Integration", desc: "Custom-built software to run directly on the device, bridging physical documents and digital systems." },
    { icon: Nature, title: "Sustainable Precision", desc: "Low-energy consumption modes and long-life components reduce waste without sacrificing performance." },
    { icon: Palette, title: "V² Color Technology", desc: "Exceptional color accuracy and consistency for professional results." },
  ];

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      
      {/* Hero */}
      <section className="relative min-h-[600px] flex items-center px-8 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={brandImage}
            alt="Canon Office"
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071325] via-[#071325]/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#142032]/60 border border-[#f5be53]/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#f5be53] animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5be53]">Official Canon Partner</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
            Canon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be53] to-[#c8962e]">Elite</span> <br/>Business Imaging
          </h1>
          <p className="text-xl text-[#d3c5b0] max-w-2xl mb-10 leading-relaxed">
            Sahara is a premier Canon partner in the UAE, delivering unparalleled document workflows and precision engineering for the modern executive landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/get-quote?brand=canon" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-[#f5be53]/30 hover:scale-105 transition-transform inline-block">
              Enquire about Canon Solutions
            </a>
            <a href="#products" className="glass-card text-white px-10 py-5 rounded-full font-semibold border border-[#9c8f7c]/20 hover:bg-[#2a3548] transition-all inline-block">
              View Product Guide
            </a>
          </div>
        </div>
      </section>

      {/* Featured Hardware */}
      <section id="products" className="py-24 px-8 bg-[#101c2e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">imageRUNNER Series</h2>
              <p className="text-[#d3c5b0] text-lg">Engineered for high-volume productivity and uncompromising security, the imageRUNNER ADVANCE series sets the gold standard for office efficiency.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 group relative h-[500px] rounded-lg overflow-hidden glass-card">
              <Image
                src="/images/printer-canon-1.webp"
                alt="Canon imageRUNNER"
                fill
                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-700 opacity-80"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-[#071325] to-transparent">
                <h3 className="text-3xl font-bold text-white mb-2">imageRUNNER ADVANCE DX</h3>
                <p className="text-[#d3c5b0] max-w-md">Cloud-connected A3 color multifunction devices with high-speed scanning and integrated uniFLOW software.</p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-8">
              <div className="glass-card rounded-lg p-8 flex flex-col justify-between border-l-4 border-l-[#f5be53] group">
                <div>
                  <Print className="text-[#f5be53] text-4xl mb-4 group-hover:rotate-12 transition-transform" />
                  <h4 className="text-xl font-bold text-white mb-2">C3800 Series</h4>
                  <p className="text-[#d3c5b0] text-sm">Compact powerhouses for medium workgroups with intelligent scanning.</p>
                </div>
              </div>
              <div className="glass-card rounded-lg p-8 flex flex-col justify-between border-l-4 border-l-[#f5be53] group">
                <div>
                  <Security className="text-[#f5be53] text-4xl mb-4 group-hover:rotate-12 transition-transform" />
                  <h4 className="text-xl font-bold text-white mb-2">C5800 Series</h4>
                  <p className="text-[#d3c5b0] text-sm">Enterprise-grade security with 360-degree document protection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f5be53]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Technological Superiority</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#f5be53] to-[#c8962e] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            {features.map((f, i) => {
              const IconComponent = f.icon;
              return (
                <div key={i} className="flex gap-8 group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#142032]/60 border border-[#f5be53]/30 flex items-center justify-center text-[#f5be53] group-hover:bg-[#f5be53] group-hover:text-[#071325] transition-all duration-500">
                    <IconComponent className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#f5be53] mb-3">{f.title}</h3>
                    <p className="text-[#d3c5b0] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/images/printer-canon-2.webp"
              alt="Canon Technology"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#f5be53]/10 mix-blend-overlay"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center bg-[#071325] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[600px] h-[600px] border border-[#f5be53] rounded-full animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Ready for the <span className="text-[#f5be53] italic">next</span> standard?</h2>
          <p className="text-xl text-[#d3c5b0] mb-12">Consult with our executive imaging specialists to design a Canon solution tailored to your operational demands.</p>
          <a href="/get-quote?brand=canon" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-12 py-5 rounded-full font-bold text-lg shadow-2xl shadow-[#f5be53]/30 hover:scale-105 transition-transform inline-block">
            Send Inquiry
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