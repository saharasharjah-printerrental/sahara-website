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
import { SettingsIcon, LayerStackIcon, ClockIcon, ShieldCheckIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Samsung Printers UAE" }];

export default function SamsungBrandPage() {
  const products = [
    { name: "ProXpress SL-M3820ND", specs: ["38 PPM", "1200 DPI"], img: "/images/printer-samsung.webp" },
    { name: "MultiXpress SL-X7500", specs: ["50 PPM", "Color"], img: "/images/printer-samsung.webp" },
    { name: "Smart UX Panel", specs: ["Android Based", "Cloud Ready"], img: "/images/printer-samsung.webp" },
  ];

  const features = [
    { icon: SettingsIcon, title: "Smart UX", desc: "Android-based smart interface with intuitive touchscreen controls." },
    { icon: LayerStackIcon, title: "Cloud Ready", desc: "Seamless integration with cloud services and mobile printing." },
    { icon: ClockIcon, title: "High Speed", desc: "Industry-leading print speeds up to 60 PPM for busy offices." },
    { icon: ShieldCheckIcon, title: "Samsung Security", desc: "Enterprise-grade security features including chip-level encryption." },
  ];

  const smartFeatures = [
    { stat: "10.1\"", title: "Smart Touchscreen", desc: "Largest-in-class Android-based touchscreen for easy navigation." },
    { stat: "60 PPM", title: "Maximum Speed", desc: "Industry-leading print speeds for high-volume offices." },
    { stat: "AES-256", title: "Chip-Level Security", desc: "Enterprise-grade encryption to protect your sensitive documents." },
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
                <span className="text-caption font-medium uppercase tracking-widest text-primary">Smart Printing Solutions</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold tracking-tight text-white">
                Samsung Authorized <span className="text-primary">Partner</span>
              </h1>

              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Samsung Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized Samsung dealer in UAE, supplying ProXpress and
                  MultiXpress models with Android-based Smart UX panels. Sales, rental from{" "}
                  <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                Experience smart printing with Samsung&apos;s innovative technology. Android-based interfaces and
                enterprise security for modern businesses.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/?brand=samsung" className="btn-primary">Enquire for Samsung Models</a>
                <a href="#products" className="btn-secondary">View Products</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <div className="relative overflow-hidden rounded-panel shadow-2xl">
                <Image
                  src="/images/printer-samsung.webp"
                  alt="Samsung ProXpress Printer"
                  width={800}
                  height={600}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section title="Why Choose Samsung" subtitle="Smart printing solutions for the modern digital workplace." align="center" tone="raised" flush>
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

      <Section id="products" title="Popular Models">
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <Reveal key={p.name} className="h-full">
              <div className="glass-card group h-full rounded-panel p-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="relative mb-8 aspect-square overflow-hidden rounded-card bg-surface-low">
                  <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                <p className="mb-6 text-sm text-on-surface-variant">Smart printing with enterprise features.</p>
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

      <Section title="Smart Printing Features" subtitle="Samsung brings innovation to every aspect of office printing" align="center" tone="raised">
        <div className="grid gap-8 md:grid-cols-3">
          {smartFeatures.map((s) => (
            <Reveal key={s.title}>
              <div className="glass-card rounded-panel p-8">
                <div className="mb-4 text-4xl font-bold text-primary">{s.stat}</div>
                <h3 className="mb-2 text-xl font-bold text-white">{s.title}</h3>
                <p className="text-on-surface-variant">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Experience Samsung Smart Printing"
        body="Upgrade your office with Samsung's innovative printing solutions."
        primary={{ label: "Get Samsung Quote", href: "/rental-calculator/?brand=samsung" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
