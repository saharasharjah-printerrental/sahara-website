"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { ShieldCheckIcon, LeafIcon, LayerStackIcon, AwardIcon, ClockIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "HP Printers UAE" }];

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
    { icon: ShieldCheckIcon, title: "Wolf Security", desc: "Industry-leading hardware-enforced protection from BIOS to browser." },
    { icon: LeafIcon, title: "Eco Innovation", desc: "Closed-loop manufacturing and sustainable printing for modern ESG goals." },
    { icon: LayerStackIcon, title: "Cloud Manageability", desc: "Seamless fleet management with HP Smart Admin and centralized control." },
    { icon: AwardIcon, title: "Premium Heritage", desc: "Decades of engineering excellence translated into executive tools." },
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface-low" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative mx-auto max-w-content">
          <Breadcrumbs trail={trail} />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-3 rounded-pill border border-primary/20 bg-surface-mid/60 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-caption font-medium uppercase tracking-widest text-primary">Certified HP Technology Partner</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold tracking-tight text-white">
                HP Authorized <span className="text-primary">Partner</span>
              </h1>

              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized HP Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized HP dealer in UAE, supplying LaserJet Enterprise and
                  DesignJet models with HP Wolf Security. Sales, rental from{" "}
                  <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                Experience the pinnacle of corporate printing. As authorized Sahara partners, we deliver HP&apos;s
                Enterprise-grade solutions tailored for the most demanding executive environments.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/?brand=hp" className="btn-primary">Enquire for HP Models</a>
                <a href="#products" className="btn-secondary">View Products</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <div className="relative overflow-hidden rounded-panel shadow-2xl">
                <img src={brandImage} alt="HP Printer" className="h-full w-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section title="Why Choose HP Excellence" subtitle="Standard-setting technology for businesses that demand the absolute best in security, reliability, and innovation." align="center" tone="raised" flush>
        <div className="grid gap-8 md:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="p-2 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-surface-mid/60 text-primary">
                <f.icon size={28} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{f.title}</h3>
              <p className="text-sm text-on-surface-variant">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="products" title="Precision Engineering">
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <Reveal key={p.name} className="h-full">
              <div className="glass-card group h-full rounded-panel p-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="mb-8 aspect-square overflow-hidden rounded-card bg-surface-low">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                <p className="mb-6 text-sm text-on-surface-variant">Unrivaled security and performance for high-volume corporate fleets.</p>
                <div className="flex items-center justify-between border-t border-white/5 py-4">
                  {p.specs.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <ClockIcon size={16} className="text-primary" />
                      <span className="text-xs text-on-surface-variant">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Ready to Upgrade Your Infrastructure?"
        body="Schedule a private consultation with our HP product specialists to tailor the perfect solution for your corporate environment."
        primary={{ label: "Enquire for HP Models", href: "/rental-calculator/?brand=hp" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
