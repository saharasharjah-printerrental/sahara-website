"use client";

export const runtime = 'edge';

import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import { SettingsIcon, LeafIcon, LayersIcon, ShieldCheckIcon, ClockIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Lexmark Printers UAE" }];

export default function LexmarkBrandPage() {
  const products = [
    { name: "Lexmark MS821dn", specs: ["55 PPM", "1200 DPI"], img: "/images/printer-lexmark.webp" },
    { name: "Lexmark CX825dte", specs: ["55 PPM", "Color"], img: "/images/printer-lexmark.webp" },
    { name: "Lexmark B3442dw", specs: ["42 PPM", "Wireless"], img: "/images/printer-lexmark.webp" },
  ];

  const features = [
    { icon: SettingsIcon, title: "American Heritage", desc: "Proudly designed and manufactured in the USA with 30+ years of innovation." },
    { icon: LeafIcon, title: "Lexmark Circle", desc: "Free recycling program for used toner cartridges and imaging units." },
    { icon: LayersIcon, title: "Precision Printing", desc: "Lexmark's exclusive Unison toner delivers consistent, high-quality output." },
    { icon: ShieldCheckIcon, title: "Enterprise Ready", desc: "Robust security features and enterprise integration capabilities." },
  ];

  const advantages = [
    { stat: "30+", title: "Years of Innovation", desc: "American-designed printing solutions with decades of expertise." },
    { stat: "Free", title: "Cartridge Recycling", desc: "Lexmark Circle program recycles your cartridges at no cost." },
    { stat: "Unison", title: "Toner Technology", desc: "Exclusive formula for consistent, high-quality prints every time." },
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
                <span className="text-caption font-medium uppercase tracking-widest text-primary">American Innovation</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold tracking-tight text-white">
                Lexmark Authorized <span className="text-primary">Partner</span>
              </h1>

              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Lexmark Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized Lexmark dealer in UAE, supplying MS and CX series
                  enterprise-grade laser printers. Sales, rental from{" "}
                  <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                Precision printing solutions designed in the USA. Lexmark combines American craftsmanship with
                cutting-edge technology for enterprise-grade performance.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/?brand=lexmark" className="btn-primary">Enquire for Lexmark Models</a>
                <a href="#products" className="btn-secondary">View Products</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <div className="relative overflow-hidden rounded-panel shadow-2xl">
                <Image
                  src="/images/printer-lexmark.webp"
                  alt="Lexmark CX825dte Printer"
                  width={600}
                  height={600}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section title="Why Choose Lexmark" subtitle="American innovation meeting enterprise needs since 1991." align="center" tone="raised" flush>
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

      <Section id="products" title="Enterprise Solutions">
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <Reveal key={p.name} className="h-full">
              <div className="glass-card group h-full rounded-panel p-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="relative mb-8 aspect-square overflow-hidden rounded-card bg-surface-low">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                <p className="mb-6 text-sm text-on-surface-variant">Enterprise-grade performance for demanding workloads.</p>
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

      <Section title="Lexmark Advantages" subtitle="Why enterprises trust Lexmark for their printing infrastructure" align="center" tone="raised">
        <div className="grid gap-8 md:grid-cols-3">
          {advantages.map((a) => (
            <Reveal key={a.title}>
              <div className="glass-card rounded-panel p-8">
                <div className="mb-4 text-4xl font-bold text-primary">{a.stat}</div>
                <h3 className="mb-2 text-xl font-bold text-white">{a.title}</h3>
                <p className="text-on-surface-variant">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Choose Lexmark Quality"
        body="Get enterprise-grade printing with American innovation. Contact us for a Lexmark solution."
        primary={{ label: "Get Lexmark Quote", href: "/rental-calculator/?brand=lexmark" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
