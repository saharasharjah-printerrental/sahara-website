"use client";

export const runtime = 'edge';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import CtaBand from "@/components/ui/CtaBand";
import AnswerBlock from "@/components/AnswerBlock";
import { ShieldCheckIcon, TruckIcon, AwardIcon, SettingsIcon } from "@/components/icons";

const trail = [{ label: "Home", href: "/" }, { label: "Products", href: "/products/" }, { label: "Fellowes Shredders UAE" }];

const models = [
  {
    name: "Fellowes Powershred LX65",
    image: "/images/shredder-fellowes-lx65.webp",
    alt: "Fellowes Powershred LX65 cross-cut paper shredder supplied by Sahara in Dubai and UAE",
    desc: "10 sheets per pass, 22.7L bin — personal and light-office use. Buy AED 800–1,500, or rent from AED 150/month.",
    href: "/services/paper-shredder-sales/",
    cta: "Buy — pricing & specs",
  },
  {
    name: "Fellowes Powershred 325Ci",
    image: "/images/shredder-fellowes-325ci.webp",
    alt: "Fellowes Powershred 325Ci commercial cross-cut paper shredder supplied by Sahara in Dubai and UAE",
    desc: "24 sheets per pass, 83L bin — departmental and commercial use. Buy AED 2,200–3,500+, or rent from AED 300/month.",
    href: "/services/paper-shredder-sales/",
    cta: "Buy — pricing & specs",
  },
];

const features = [
  { icon: ShieldCheckIcon, title: "DIN P-4 Cross-Cut", desc: "Powershred cross-cut models meet DIN P-4 — the security level recommended for confidential documents under UAE PDPL." },
  { icon: TruckIcon, title: "Free UAE Delivery", desc: "Free delivery and on-site setup across Dubai, Sharjah, and Abu Dhabi on every shredder sale or rental." },
  { icon: AwardIcon, title: "Genuine Units & Warranty", desc: "Genuine Fellowes units with full manufacturer warranty — extended cover and AMC available for high-volume machines." },
  { icon: SettingsIcon, title: "Rent or Buy", desc: "Own outright from AED 800, or rent from AED 150/month with maintenance included — whichever fits your document volume." },
];

export default function FellowesBrandPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Header />

      <section className="relative flex min-h-[600px] items-center overflow-hidden px-6 pt-32">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/shredder-fellowes-325ci.webp"
            alt="Fellowes shredders Dubai"
            className="h-full w-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-content w-full">
          <Breadcrumbs trail={trail} />
          <Reveal className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-surface-mid/60 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-caption font-bold uppercase tracking-widest text-primary">Authorized Fellowes Supplier</span>
            </div>
            <h1 className="font-sora text-display-xl font-extrabold leading-none tracking-tight text-white">
              Fellowes <span className="bg-gradient-to-r from-primary to-primary-deep bg-clip-text text-transparent">Shredders</span> <br />Dubai &amp; UAE
            </h1>

            <div className="mt-6 max-w-2xl rounded-panel border border-primary/20 bg-surface-low p-5">
              <p className="mb-1 text-caption font-bold uppercase tracking-widest text-primary">Authorized Fellowes Supplier in Dubai</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Sahara Office Equipments is an authorized Fellowes supplier in Dubai and UAE, stocking
                Fellowes Powershred DIN P-4 cross-cut shredders for personal, office, and departmental use.
                Buy from <strong className="text-white">AED 800</strong> or rent from{" "}
                <strong className="text-white">AED 150/month</strong> — free delivery and setup across
                Dubai, Sharjah, and Abu Dhabi. Call +971503823969.
              </p>
            </div>

            <div className="mt-6 max-w-2xl">
              <AnswerBlock
                question="Where can I buy Fellowes shredders in Dubai?"
                answer="Sahara Office Equipments is an authorized Fellowes supplier in Dubai, stocking Fellowes Powershred cross-cut shredders for personal, office, and departmental use. Models are available to buy from AED 800 or rent from AED 150/month, with free delivery and setup across Dubai, Sharjah, and Abu Dhabi."
                supportingPoints={[
                  "Authorized Fellowes supplier — genuine Powershred units with manufacturer warranty",
                  "DIN P-4 cross-cut, the level recommended for UAE PDPL-compliant destruction",
                  "Buy from AED 800 or rent from AED 150/month, free UAE delivery",
                ]}
              />
            </div>

            <p className="mt-6 max-w-2xl text-body leading-relaxed text-muted">
              From desk-side personal shredders to departmental machines for bulk document
              destruction, Sahara supplies and maintains the Fellowes Powershred range for UAE
              offices, events, and audits.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="/services/paper-shredder-rental/" className="btn-primary">Rent a Fellowes Shredder</a>
              <a href="/services/paper-shredder-sales/" className="btn-secondary">Buy a Fellowes Shredder</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="models" title="Fellowes Powershred Models in Stock — UAE" subtitle="DIN P-4 cross-cut Fellowes Powershred shredders, sized for personal, office, and departmental use." tone="raised" flush>
        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {models.map((m) => (
            <Reveal key={m.name}>
              <div className="group rounded-card border border-white/[0.08] bg-surface-low overflow-hidden transition-colors hover:border-primary/40">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-bold text-white">{m.name}</h3>
                  <p className="text-sm text-on-surface-variant">{m.desc}</p>
                  <a href={m.href} className="mt-4 inline-block font-semibold text-primary hover:underline">
                    {m.cta} →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Why Fellowes from Sahara" align="center">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-10 sm:grid-cols-2">
          {features.map((f) => (
            <Reveal key={f.title}>
              <div className="group flex gap-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-surface-mid/60 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-on-primary">
                  <f.icon size={26} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-primary">{f.title}</h3>
                  <p className="leading-relaxed text-on-surface-variant">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section flush tone="raised">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Rent or buy a Fellowes shredder in Dubai?</h2>
          <p className="text-muted">
            For monthly rental terms, events, and audits — including heavy-duty machines for bulk
            clear-outs — see our{" "}
            <a href="/services/paper-shredder-rental/" className="font-semibold text-primary hover:underline">paper shredder rental page</a>.
            To own a machine outright with a rent-vs-buy comparison, see{" "}
            <a href="/services/paper-shredder-sales/" className="font-semibold text-primary hover:underline">paper shredder sales</a> — or{" "}
            <a href="/blogs/best-office-paper-shredders-uae-fellowes-compared/" className="font-semibold text-primary hover:underline">compare Fellowes models</a> in our UAE buying guide.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Need a Fellowes Shredder?"
        body="Free delivery and setup across Dubai, Sharjah & Abu Dhabi"
        primary={{ label: "Request a Quote", href: "/rental-calculator/" }}
        secondary={{ label: "Contact Us", href: "/contact/" }}
      />

      <Footer />
      <WhatsAppCTA />
      <JumpToTop />
    </main>
  );
}
