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
import { AwardIcon, LeafIcon, ShieldCheckIcon, SettingsIcon, ClockIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Kyocera Printers UAE" }];

export default function KyoceraBrandPage() {
  const products = [
    { name: "TASKalfa 2554ci", specs: ["25 PPM", "Color A3"], img: "/images/printer-kyocera.webp" },
    { name: "TASKalfa 4054ci", specs: ["40 PPM", "Color A3"], img: "/images/printer-kyocera.webp" },
    { name: "TASKalfa 5054ci", specs: ["50 PPM", "Color A3"], img: "/images/printer-kyocera.webp" },
  ];

  const features = [
    { icon: AwardIcon, title: "Lowest TCO", desc: "Industry's lowest cost per page with long-life components and ECOSYS technology." },
    { icon: LeafIcon, title: "Eco-Friendly", desc: "Free from toxic chemicals, using reusable amorphous silicon drums." },
    { icon: ShieldCheckIcon, title: "Japanese Quality", desc: "Decades of precision engineering from Kyocera's Japanese manufacturing." },
    { icon: SettingsIcon, title: "Durable Design", desc: "Built to last 100,000+ pages with minimal maintenance requirements." },
  ];

  const tco = [
    { stat: "70%", label: "Lower Cost Per Page", desc: "Compared to traditional laser printers" },
    { stat: "100K", label: "Page Drum Life", desc: "Long-life amorphous silicon drums" },
    { stat: "0", label: "Waste Toner", desc: "No waste toner container needed" },
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
                <span className="text-caption font-medium uppercase tracking-widest text-primary">ECOSYS Technology</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold tracking-tight text-white">
                Kyocera Authorized <span className="text-primary">Partner</span>
              </h1>

              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Kyocera Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized Kyocera dealer in UAE, supplying TASKalfa ECOSYS models
                  with the industry&apos;s lowest cost per page. Sales, rental from{" "}
                  <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                Experience the lowest total cost of ownership in the industry. Kyocera&apos;s ECOSYS technology
                delivers exceptional reliability and eco-friendly printing solutions.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/?brand=kyocera" className="btn-primary">Enquire for Kyocera Models</a>
                <a href="#products" className="btn-secondary">View Products</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <div className="relative overflow-hidden rounded-panel shadow-2xl">
                <Image
                  src="/images/printer-kyocera.webp"
                  alt="Kyocera TASKalfa Printer"
                  width={540}
                  height={540}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section title="Why Choose Kyocera" subtitle="The smart choice for businesses focused on minimizing operating costs while maximizing reliability." align="center" tone="raised" flush>
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

      <Section id="products" title="TASKalfa Series">
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <Reveal key={p.name} className="h-full">
              <div className="glass-card group h-full rounded-panel p-8 transition-transform duration-500 hover:-translate-y-2">
                <div className="relative mb-8 aspect-square overflow-hidden rounded-card bg-surface-low">
                  <Image src={p.img} alt={p.name} fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                <p className="mb-6 text-sm text-on-surface-variant">Lowest cost per page in its class with legendary Kyocera reliability.</p>
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

      <Section title="Total Cost of Ownership" subtitle="Kyocera saves you money over the lifetime of your printer" align="center" tone="raised">
        <div className="grid gap-8 md:grid-cols-3">
          {tco.map((t) => (
            <Reveal key={t.label}>
              <div className="glass-card rounded-panel p-8 text-center">
                <div className="mb-2 text-5xl font-bold text-primary">{t.stat}</div>
                <p className="font-medium text-white">{t.label}</p>
                <p className="mt-2 text-sm text-on-surface-variant">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Save More with Kyocera"
        body="Get a custom TCO analysis for your office and see how much Kyocera can save you."
        primary={{ label: "Get Kyocera Quote", href: "/rental-calculator/?brand=kyocera" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
