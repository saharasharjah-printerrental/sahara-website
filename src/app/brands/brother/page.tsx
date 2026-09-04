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
import { HeadsetIcon, ShieldCheckIcon, TruckIcon, LayerStackIcon, ClockIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Brother Printers UAE" }];

export default function BrotherBrandPage() {
  const products = [
    { name: "HL-L2350DW", specs: ["32 PPM", "Auto Duplex"], img: "/images/printer-brother.webp" },
    { name: "MFC-L8900CDW", specs: ["32 PPM", "Color"], img: "/images/printer-brother.webp" },
    { name: "HL-L6400DW", specs: ["50 PPM", "Enterprise"], img: "/images/printer-brother.webp" },
  ];

  const features = [
    { icon: HeadsetIcon, title: "Award-Winning Support", desc: "Brother's US-based support team rated #1 in customer satisfaction." },
    { icon: ShieldCheckIcon, title: "Industry-Leading Warranty", desc: "Free lifetime phone support and industry-best limited warranty." },
    { icon: TruckIcon, title: "Fast Delivery", desc: "Same-day shipping on orders placed before 3pm EST." },
    { icon: LayerStackIcon, title: "Extensive Supplies Stock", desc: "Wide range of Brother consumables in stock with same-day shipping." },
  ];

  const advantages = [
    { stat: "#1", title: "Customer Satisfaction", desc: "Rated #1 in customer satisfaction by PCMag for 12 consecutive years." },
    { stat: "Lifetime", title: "Phone Support", desc: "Free lifetime phone support included with every Brother product." },
    { stat: "Same Day", title: "Shipping", desc: "Orders placed before 3pm ship same day from our warehouse." },
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
                <span className="text-caption font-medium uppercase tracking-widest text-primary">#1 in Customer Satisfaction</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold tracking-tight text-white">
                Brother Authorized <span className="text-primary">Partner</span>
              </h1>

              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Brother Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized Brother dealer in UAE, supplying HL and MFC series laser
                  printers rated #1 in customer satisfaction. Sales, rental from{" "}
                  <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                Trusted by millions of businesses worldwide. Brother delivers reliable, award-winning printing
                solutions with industry-leading support.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="/rental-calculator/?brand=brother" className="btn-primary">Enquire for Brother Models</a>
                <a href="#products" className="btn-secondary">View Products</a>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <div className="relative overflow-hidden rounded-panel shadow-2xl">
                <Image
                  src="/images/printer-brother.webp"
                  alt="Brother MFC-L8900CDW"
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

      <Section title="Why Choose Brother" subtitle="Reliable, award-winning printing solutions backed by industry-leading customer support." align="center" tone="raised" flush>
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
                  <Image src={p.img} alt={p.name} fill className="object-contain p-4 transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{p.name}</h3>
                <p className="mb-6 text-sm text-on-surface-variant">Reliable performance for home office and small business.</p>
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

      <Section title="Brother Advantages" subtitle="Why businesses choose Brother for their printing needs" align="center" tone="raised">
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
        title="Choose Brother"
        body="Get the reliability and support your business deserves. Contact us for a Brother solution."
        primary={{ label: "Get Brother Quote", href: "/rental-calculator/?brand=brother" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
