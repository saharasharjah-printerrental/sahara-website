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

const defaultFaqs = [
  { q: "Do you rent HP printers in Abu Dhabi?", a: "Yes! We offer a wide range of HP printers and photocopiers for rent in Abu Dhabi, including LaserJet Enterprise, PageWide, and OfficeJet series." },
  { q: "What HP models are available for rental in Abu Dhabi?", a: "We rent HP LaserJet Enterprise, PageWide Pro, OfficeJet Pro, and Neverstop series. From desktop printers to heavy-duty enterprise copiers." },
  { q: "How much does HP printer rental cost in Abu Dhabi?", a: "HP printer rental in Abu Dhabi starts from AED 250/month for A4 models, with enterprise copiers from AED 500-2000/month. All include free toner." },
  { q: "Do you provide HP printer repair in Abu Dhabi?", a: "Yes, our certified technicians provide on-site HP printer repair in Abu Dhabi with fast response time." },
  { q: "Is HP toner included in the rental price?", a: "Yes! All our HP printer rentals in Abu Dhabi include unlimited genuine HP toner at no extra cost." },
  { q: "Can I upgrade my HP printer during the rental period?", a: "Absolutely! Our 'Growth Guard' policy allows you to upgrade your HP printer anytime during the contract." },
  { q: "Do you offer HP printer AMC in Abu Dhabi?", a: "Yes, we offer Annual Maintenance Contracts for HP printers covering all repairs, toner, and preventive maintenance." },
  { q: "What areas in Abu Dhabi do you serve for HP rentals?", a: "We serve all Abu Dhabi areas including Mussafah, Al Reem Island, Khalifa City, Yas Island, Corniche, and all other districts." },
];

const trail = [{ label: "Home", href: "/" }, { label: "Brands", href: "/products/" }, { label: "HP Printer Abu Dhabi" }];

export default function HPPrinterAbuDhabi() {
  const [, setSettings] = useState<any>(null);
  // Initialized with defaultFaqs (not []) so the server-rendered HTML — what
  // Googlebot's first pass actually sees — already carries real FAQPage
  // content instead of an empty mainEntity array.
  const [faqs, setFaqs] = useState<{q: string; a: string}[]>(defaultFaqs);

  useEffect(() => {
    const stored = localStorage.getItem("sahara_settings");
    if (stored) {
      setSettings(JSON.parse(stored));
    }

    const faqStored = localStorage.getItem("sahara_faqs");
    if (faqStored) {
      const allFaqs = JSON.parse(faqStored);
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "hp-abu-dhabi" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const hpModels = [
    { name: "HP LaserJet Enterprise M608", type: "B&W Enterprise", speed: "61 ppm", features: "High-volume, Security" },
    { name: "HP PageWide Pro 750dw", type: "Color Enterprise", speed: "50 ppm", features: "Low cost per page" },
    { name: "HP OfficeJet Pro 9022e", type: "A4 Color", speed: "24 ppm", features: "All-in-One, Smart" },
    { name: "HP Neverstop Laser MFP", type: "A4 B&W", speed: "21 ppm", features: "Low running cost" },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments - HP Abu Dhabi",
    "description": "HP printer rental in Abu Dhabi. LaserJet, PageWide, OfficeJet series with zero deposit and free toner.",
    "url": "https://www.saharaprinter.com/hp-printer-abu-dhabi",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mussafah",
      "addressLocality": "Abu Dhabi",
      "addressCountry": "AE"
    },
    "areaServed": {
      "@type": "State",
      "name": "Abu Dhabi"
    },
    "priceRange": "AED 250-2000",
    "openingHours": "24/7"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
      { "@type": "ListItem", "position": 2, "name": "Brands", "item": "https://www.saharaprinter.com/products/" },
      { "@type": "ListItem", "position": 3, "name": "HP Printer Abu Dhabi", "item": "https://www.saharaprinter.com/hp-printer-abu-dhabi/" }
    ]
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="absolute inset-0">
            <img
              src="/images/hp-hero.webp"
              alt="HP Printer Abu Dhabi"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">HP Printer Rental Abu Dhabi</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  HP Photocopiers <span className="text-primary">Abu Dhabi</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Premium HP printer and photocopier rental in Abu Dhabi. LaserJet, PageWide, and OfficeJet series
                  with zero deposit and free toner.
                </p>

                <div className="mt-6 rounded-panel border border-primary/20 bg-surface-low p-5">
                  <p className="mb-2 text-caption font-bold uppercase tracking-widest text-primary">HP Printer Rental Abu Dhabi — Quick Answer</p>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    Sahara Office Equipments rents HP LaserJet Enterprise, PageWide Pro, and OfficeJet Pro printers
                    and photocopiers in Abu Dhabi from <strong className="text-white">AED 250/month</strong> with
                    zero deposit and unlimited genuine HP toner included. Our technicians serve Mussafah, Al Reem
                    Island, Khalifa City, Yas Island, and all Abu Dhabi districts with certified HP repair and AMC
                    support.
                  </p>
                </div>

                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="/rental-calculator/" className="btn-primary">Get Free Quote</a>
                  <a href="tel:+971503823969" className="btn-secondary">Call: +971503823969</a>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-[120px]" />
                <div className="glass-card relative z-10 overflow-hidden rounded-panel p-8">
                  <img
                    src="/images/printer-hp.svg"
                    alt="HP Photocopier Rental Abu Dhabi"
                    className="h-full w-full rounded-card object-cover mix-blend-screen opacity-90"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Section title="HP Printer Models Available in Abu Dhabi" align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hpModels.map((model) => (
              <Reveal key={model.name} className="h-full">
                <div className="h-full rounded-card border border-white/[0.08] bg-surface-low p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">{model.name}</h3>
                  <p className="mb-4 text-sm text-primary">{model.type}</p>
                  <div className="space-y-2 text-sm text-on-surface-variant">
                    <p><span className="font-semibold text-white">Speed:</span> {model.speed}</p>
                    <p><span className="font-semibold text-white">Features:</span> {model.features}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section title="Why Choose HP Printers in Abu Dhabi" align="center" tone="raised">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "High Performance", desc: "HP Enterprise printers handle high-volume workloads with exceptional speed and reliability." },
              { title: "Low Cost per Page", desc: "HP PageWide technology delivers the lowest cost per page in the industry." },
              { title: "Security Features", desc: "HP printers include advanced security features to protect sensitive business data." },
            ].map((feature) => (
              <Reveal key={feature.title} className="h-full">
                <div className="h-full rounded-card border border-white/[0.08] bg-surface-low p-8 text-center">
                  <h3 className="mb-4 text-xl font-bold text-primary">{feature.title}</h3>
                  <p className="text-on-surface-variant">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need HP Printer in Abu Dhabi?"
          body="Get a customized quote within 2 hours. Free consultation and site visit."
          primary={{ label: "Get Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Call Now", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={f.q} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex list-none items-center justify-between gap-4 font-bold text-[1.05rem] text-white">
                  {f.q}
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 leading-relaxed text-on-surface-variant">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
