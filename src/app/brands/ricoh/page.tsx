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
import { ClockIcon, SettingsIcon, LeafIcon, AwardIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Ricoh Printers UAE" }];

export default function RicohBrandPage() {
  const products = [
    { name: "MP 4055", type: "B&W Multifunction", speed: "55 ppm", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ricoh_5055_MFP.jpg/500px-Ricoh_5055_MFP.jpg" },
    { name: "IM C2000", type: "Color Smart MFP", speed: "20 ppm", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/RICOH_Aficio_MP_C3002_Color_Laser_Multifunction_Printer.jpg/500px-RICOH_Aficio_MP_C3002_Color_Laser_Multifunction_Printer.jpg" },
  ];

  const features = [
    { icon: ClockIcon, title: "High Speed", desc: "Industry-leading print speeds up to 135 ppm for production environments" },
    { icon: SettingsIcon, title: "Smart Operation", desc: "10.1\" tablet-like interface with intuitive controls and customization" },
    { icon: LeafIcon, title: "Eco-Friendly", desc: "Lowest power consumption in its class with sustainable design" },
    { icon: AwardIcon, title: "Precision Engineering", desc: "Japanese quality built for demanding high-volume workflows" },
  ];

  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="relative overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface to-surface-low" />
        <div className="absolute right-0 top-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]" />

        <div className="relative mx-auto max-w-content">
          <Breadcrumbs trail={trail} />
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-3 rounded-pill border border-primary/20 bg-surface-mid/60 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-caption font-bold uppercase tracking-widest text-primary">Authorized Partner</span>
              </div>
              <h1 className="font-sora text-display-xl font-extrabold leading-none tracking-tight text-white">
                High-Performance <span className="text-primary">Printing</span>
              </h1>

              <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Ricoh Dealer in UAE</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized Ricoh dealer in UAE, supplying MP series and IM
                  production-ready MFPs for high-volume offices. Sales, rental from{" "}
                  <strong className="text-white">AED 250/month</strong>, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
                </p>
              </div>

              <p className="mt-6 max-w-xl text-body leading-relaxed text-muted">
                Ricoh&apos;s authorized partner delivering production-ready printers and smart MFPs for
                high-volume UAE enterprises. Experience Japanese precision engineered for demanding workflows.
              </p>
              <a href="/rental-calculator/?brand=ricoh" className="btn-primary mt-9 inline-block">Enquire Now</a>
            </Reveal>
            <Reveal delay={0.1} className="relative">
              <div className="absolute -inset-10 rounded-full bg-primary/10 blur-[120px]" />
              <Image
                src="/images/printer-ricoh.webp"
                alt="Ricoh Printer"
                width={700}
                height={525}
                className="h-auto w-full rounded-panel shadow-2xl"
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Section title="Why Choose Ricoh?" subtitle="Built for high-volume environments where reliability and speed are critical to your business operations." align="center" tone="raised" flush>
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

      <Section title="Production Solutions">
        <div className="grid gap-8 md:grid-cols-2">
          {products.map((p) => (
            <Reveal key={p.name} className="h-full">
              <div className="glass-card group h-full overflow-hidden rounded-panel transition-transform duration-500 hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden bg-surface-low">
                  <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
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
        title="Ready to Boost Productivity?"
        body="Get a customized quote for Ricoh printers tailored to your business needs."
        primary={{ label: "Enquire for Ricoh Models", href: "/rental-calculator/?brand=ricoh" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
