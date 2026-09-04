"use client";

export const runtime = 'edge';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import { SettingsIcon, HeadsetIcon, LayerStackIcon, ClockIcon } from "@/components/icons";

const defaultFaqs = [
  { q: "Do you offer printer repair services in Dubai?", a: "Yes! We provide professional printer and photocopier repair services across Dubai. Our certified technicians can fix all major brands." },
  { q: "What is your printer repair response time in Dubai?", a: "We offer 4-hour emergency response for critical printer failures in Dubai. Standard repairs scheduled within 24 hours." },
  { q: "Do you repair all printer brands in Dubai?", a: "Yes! We repair Canon, HP, Kyocera, Xerox, Ricoh, Sharp, Brother, Samsung, and Lexmark printers in Dubai." },
  { q: "How much does printer repair cost in Dubai?", a: "Our printer repair services in Dubai start from AED 150 for minor issues. Complex repairs quoted after diagnosis. Free assessment for rental clients." },
  { q: "Do you provide on-site printer repair in Dubai?", a: "Yes! Our technicians provide on-site repair services at your office in Dubai. No need to transport the equipment." },
  { q: "What printer issues can you repair in Dubai?", a: "We repair paper jams, printing quality issues, network connectivity, software errors, mechanical failures, and more." },
  { q: "Do you offer printer repair contracts in Dubai?", a: "Yes! Our AMC (Annual Maintenance Contract) includes unlimited repairs, preventive maintenance, and priority response." },
  { q: "Do you offer printer repair in other areas of Dubai?", a: "We serve all Dubai areas including Business Bay, JLT, Deira, Marina, DIFC, Sheikh Zayed Road, and all other districts." },
];

const trail = [{ label: "Home", href: "/" }, { label: "Repair Services", href: "/services/repair/" }, { label: "Printer Repair Dubai" }];

export default function PrinterRepairDubai() {
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
      const pageFaqs = allFaqs.filter((f: any) => f.pageSlug === "printer-repair-dubai" && f.isActive)
        .sort((a: any, b: any) => a.sortOrder - b.sortOrder)
        .map((f: any) => ({ q: f.question, a: f.answer }));
      setFaqs(pageFaqs.length > 0 ? pageFaqs : defaultFaqs);
    } else {
      setFaqs(defaultFaqs);
    }
  }, []);

  const repairServices = [
    { icon: SettingsIcon, title: "Hardware Repair", body: "Mechanical repairs, component replacement, roller changes, fuser unit repairs" },
    { icon: HeadsetIcon, title: "Software & Network", body: "Driver installation, network configuration, firmware updates, troubleshooting" },
    { icon: LayerStackIcon, title: "Deep Cleaning", body: "Interior cleaning, roller cleaning, belt replacement, printhead maintenance" },
    { icon: ClockIcon, title: "Emergency Repairs", body: "4-hour response for critical issues, same-day service for urgent requests" },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments - Printer Repair Dubai",
    "description": "Professional printer repair services in Dubai. On-site repairs, 4-hour response, all brands serviced.",
    "url": "https://www.saharaprinter.com/printer-repair-dubai",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "areaServed": {
      "@type": "State",
      "name": "Dubai"
    },
    "priceRange": "AED 150-1000",
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
      { "@type": "ListItem", "position": 2, "name": "Repair Services", "item": "https://www.saharaprinter.com/services/repair/" },
      { "@type": "ListItem", "position": 3, "name": "Printer Repair Dubai", "item": "https://www.saharaprinter.com/printer-repair-dubai/" }
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
              src="/images/unsplash-office.webp"
              alt="Printer Repair Dubai"
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface-low" />
          </div>

          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />
            <div className="grid items-center gap-14 md:grid-cols-2">
              <Reveal>
                <p className="mb-4 text-caption font-semibold uppercase tracking-[0.18em] text-primary">Printer Repair Dubai</p>
                <h1 className="font-sora text-display-xl font-extrabold text-white">
                  Printer &amp; Photocopier <span className="text-primary">Repair</span>
                </h1>
                <p className="mt-6 max-w-xl text-body text-muted">
                  Professional printer repair services in Dubai with 4-hour emergency response. All brands serviced
                  including Canon, HP, Kyocera, Xerox.
                </p>
                <div className="mt-6">
                  <AnswerBlock
                    question="How fast can a printer technician reach my Dubai office?"
                    answer="Sahara targets a 4-hour emergency response anywhere in Dubai. Business Bay, DIFC, and Downtown Dubai sit in a priority dispatch queue with a 2-hour target. If a repair cannot be completed within 24 hours, a loaner machine is delivered free so printing continues."
                    supportingPoints={[
                      "4-hour target across Dubai; 2-hour priority for Business Bay, DIFC and Downtown",
                      "Free loaner machine if a repair runs past 24 hours",
                      "Covers JLT, Marina, Deira, Sheikh Zayed Road, Al Quoz, Jebel Ali and every other district",
                      "Repairs from AED 150, genuine OEM parts only, 30-day workmanship warranty",
                    ]}
                  />
                </div>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="/rental-calculator/" className="btn-primary">Request Repair</a>
                  <a href="tel:+971503823969" className="btn-secondary">Call: +971503823969</a>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-[120px]" />
                <div className="glass-card relative z-10 overflow-hidden rounded-panel p-8">
                  <img
                    src="/images/service-maintanence.webp"
                    alt="Printer Repair Service Dubai"
                    className="h-full w-full rounded-card object-cover mix-blend-screen opacity-90"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Section title="Our Printer Repair Services in Dubai" align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {repairServices.map((s) => (
              <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.body} />
            ))}
          </div>
        </Section>

        <Section title="Printer Brands We Repair in Dubai" align="center" tone="raised">
          <div className="flex flex-wrap justify-center gap-4">
            {["Canon", "HP", "Kyocera", "Xerox", "Ricoh", "Sharp", "Brother", "Samsung", "Lexmark", "Konica Minolta", "Toshiba", "Epson"].map((brand) => (
              <span key={brand} className="rounded-pill bg-surface-max px-6 py-3 text-lg font-semibold text-on-surface-variant">
                {brand}
              </span>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need Printer Repair in Dubai?"
          body="Get a technician dispatched within 4 hours. Free diagnosis for AMC clients."
          primary={{ label: "Request Repair", href: "/rental-calculator/" }}
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

        {/* Related — cross-link to the UAE-wide service hub to signal complementary (not duplicate) intent */}
        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">Outside Dubai?</h2>
            <p className="text-muted">
              We repair printers and copiers across all seven emirates. See our{" "}
              <a href="/services/repair/" className="font-semibold text-primary hover:underline">full repair service page</a>{" "}
              for brands serviced, AMC options, and UAE-wide coverage.
            </p>
          </div>
        </Section>

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
