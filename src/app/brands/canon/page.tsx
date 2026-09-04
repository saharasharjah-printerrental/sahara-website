"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { LayersIcon, SettingsIcon, LeafIcon, AwardIcon, ShieldCheckIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Canon Printers UAE" }];

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

  const features = [
    { icon: LayersIcon, title: "uniFLOW Online", desc: "Single cloud solution to manage all printing and scanning workflows. Increase security by requiring user authentication." },
    { icon: SettingsIcon, title: "MEAP Integration", desc: "Custom-built software to run directly on the device, bridging physical documents and digital systems." },
    { icon: LeafIcon, title: "Sustainable Precision", desc: "Low-energy consumption modes and long-life components reduce waste without sacrificing performance." },
    { icon: AwardIcon, title: "V² Color Technology", desc: "Exceptional color accuracy and consistency for professional results." },
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="relative flex min-h-[600px] items-center overflow-hidden px-6 pt-32">
        <div className="absolute inset-0 z-0">
          <img
            src={brandImage}
            alt="Canon Office"
            className="h-full w-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-content w-full">
          <Breadcrumbs trail={trail} />
          <Reveal className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-surface-mid/60 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-caption font-bold uppercase tracking-widest text-primary">Official Canon Partner</span>
            </div>
            <h1 className="font-sora text-display-xl font-extrabold leading-none tracking-tight text-white">
              Canon <span className="bg-gradient-to-r from-primary to-primary-deep bg-clip-text text-transparent">Elite</span> <br />Business Imaging
            </h1>

            <div className="mt-6 max-w-2xl rounded-panel border border-primary/20 bg-surface-low p-5">
              <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Canon Dealer in UAE</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Sahara Office Equipments is an authorized Canon dealer in UAE, supplying imageRUNNER ADVANCE and
                imageCLASS models with uniFLOW workflow software. Sales, rental from{" "}
                <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
              </p>
            </div>

            <p className="mt-6 max-w-2xl text-body leading-relaxed text-muted">
              Sahara is a premier Canon partner in the UAE, delivering unparalleled document workflows and
              precision engineering for the modern executive landscape.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="/rental-calculator/?brand=canon" className="btn-primary">Enquire about Canon Solutions</a>
              <a href="#products" className="btn-secondary">View Product Guide</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="products" title="imageRUNNER Series" subtitle="Engineered for high-volume productivity and uncompromising security, the imageRUNNER ADVANCE series sets the gold standard for office efficiency." tone="raised" flush>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="glass-card group relative h-[500px] overflow-hidden rounded-panel">
              <Image
                src="/images/printer-canon-1.webp"
                alt="Canon imageRUNNER"
                fill
                className="rounded-panel object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-surface to-transparent p-10">
                <h3 className="mb-2 text-3xl font-bold text-white">imageRUNNER ADVANCE DX</h3>
                <p className="max-w-md text-on-surface-variant">Cloud-connected A3 color multifunction devices with high-speed scanning and integrated uniFLOW software.</p>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-rows-2 gap-8">
            <Reveal delay={0.05}>
              <div className="group flex h-full flex-col justify-between rounded-card border-l-4 border-l-primary bg-surface-low p-8">
                <div>
                  <SettingsIcon size={32} className="mb-4 text-primary transition-transform group-hover:rotate-12" />
                  <h4 className="mb-2 text-xl font-bold text-white">C3800 Series</h4>
                  <p className="text-sm text-on-surface-variant">Compact powerhouses for medium workgroups with intelligent scanning.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="group flex h-full flex-col justify-between rounded-card border-l-4 border-l-primary bg-surface-low p-8">
                <div>
                  <ShieldCheckIcon size={32} className="mb-4 text-primary transition-transform group-hover:rotate-12" />
                  <h4 className="mb-2 text-xl font-bold text-white">C5800 Series</h4>
                  <p className="text-sm text-on-surface-variant">Enterprise-grade security with 360-degree document protection.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section title="Technological Superiority" align="center">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-12">
            {features.map((f) => (
              <Reveal key={f.title}>
                <div className="group flex gap-8">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-surface-mid/60 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary">
                    <f.icon size={28} />
                  </div>
                  <div>
                    <h3 className="mb-3 text-2xl font-bold text-primary">{f.title}</h3>
                    <p className="leading-relaxed text-on-surface-variant">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="relative h-[500px] w-full overflow-hidden rounded-card shadow-2xl">
            <Image
              src="/images/printer-canon-2.webp"
              alt="Canon Technology"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </Reveal>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-surface px-6 py-section text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="h-[600px] w-[600px] animate-pulse rounded-full border border-primary" />
        </div>
        <Reveal className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-sora text-display font-bold text-white">Ready for the <span className="italic text-primary">next</span> standard?</h2>
          <p className="mt-6 text-body text-on-surface-variant">Consult with our executive imaging specialists to design a Canon solution tailored to your operational demands.</p>
          <a href="/rental-calculator/?brand=canon" className="btn-primary mt-9 inline-block">Send Inquiry</a>
        </Reveal>
      </section>

      {/* Related — cross-link to Dubai rental page to signal complementary (not duplicate) intent */}
      <Section flush tone="raised">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Need Canon printer rental in Dubai specifically?</h2>
          <p className="text-muted">
            This page covers the full Canon imageRUNNER ADVANCE lineup and technology. For Dubai-specific
            pricing, delivery timelines, and local service coverage, see{" "}
            <a href="/canon-printer-dubai/" className="font-semibold text-primary hover:underline">Canon Printer Dubai</a>.
          </p>
        </div>
      </Section>

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
