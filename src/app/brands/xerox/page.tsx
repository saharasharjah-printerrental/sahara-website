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
import { LayerStackIcon, ShieldCheckIcon, LayersIcon, AwardIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Xerox Printers UAE" }];

export default function XeroxBrandPage() {
  const products = [
    { name: "VersaLink C235", type: "Color Multifunction", speed: "33 ppm", img: "/images/printer-xerox.webp" },
    { name: "VersaLink C405", type: "Color Multifunction", speed: "45 ppm", img: "/images/printer-xerox.webp" },
  ];

  const features = [
    { icon: LayerStackIcon, title: "ConnectKey Technology", desc: "Embedded apps and cloud connectivity for modern workflows" },
    { icon: ShieldCheckIcon, title: "Security Excellence", desc: "Comprehensive protection and compliance features" },
    { icon: LayersIcon, title: "Easy Integration", desc: "Seamless connection to business workflows" },
    { icon: AwardIcon, title: "Premium Print Quality", desc: "Industry-leading color accuracy and finishing options" },
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface-low" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />

        <div className="relative mx-auto max-w-content">
          <Breadcrumbs trail={trail} />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-3 rounded-pill border border-primary/20 bg-surface-mid/60 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-caption font-bold uppercase tracking-widest text-primary">Authorized Partner</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold leading-none tracking-tight text-white">
                Smart Workplace <span className="text-primary">Solutions</span>
              </h1>

              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Xerox Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized Xerox dealer in UAE, supplying VersaLink and AltaLink
                  models with ConnectKey technology. Sales, rental from{" "}
                  <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                Xerox authorized partner offering VersaLink and Altalink series with revolutionary ConnectKey
                technology. Transform your workplace with intelligent document solutions.
              </p>
              <a href="/rental-calculator/?brand=xerox" className="btn-primary mt-9 inline-block">Enquire Now</a>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <Image
                src="/images/printer-xerox.webp"
                alt="Xerox VersaLink Printer"
                width={600}
                height={600}
                className="h-auto w-full rounded-panel shadow-2xl"
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Section title="Why Choose Xerox?" subtitle="Pioneering innovation in workplace technology for over a century. Experience the future of printing." align="center" tone="raised" flush>
        <div className="grid gap-8 md:grid-cols-4">
          {features.map((f) => (
            <Reveal key={f.title}>
              <div className="glass-card rounded-panel p-8 text-center">
                <f.icon size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="mb-2 text-xl font-bold text-white">{f.title}</h3>
                <p className="text-sm text-on-surface-variant">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Featured Solutions">
        <div className="grid gap-8 md:grid-cols-2">
          {products.map((p) => (
            <Reveal key={p.name} className="h-full">
              <div className="glass-card group h-full overflow-hidden rounded-panel transition-transform duration-500 hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden bg-surface-low">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-white">{p.name}</h3>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>{p.type}</span>
                    <span className="text-primary">{p.speed}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Transform Your Workplace"
        body="Get a customized quote for Xerox printers tailored to your business needs."
        primary={{ label: "Enquire for Xerox Models", href: "/rental-calculator/?brand=xerox" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
