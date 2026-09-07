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

// Sep 2026: depth pass. This page previously covered ~505 words against
// /services/repair/'s ~1150 while carrying the exact-match "Printer Repair
// Dubai" query — the reverse of what should rank. Added the district
// response-time table and process-steps section below, an H1 that now says
// "Dubai" (it didn't before), and Service/HowTo schema matching the UAE
// hub's richness so this page can actually compete for its own head term.
const dubaiDistricts = [
  { area: "Business Bay, DIFC, Downtown Dubai", response: "2-hour priority dispatch" },
  { area: "JLT, Dubai Marina, Al Sufouh", response: "4-hour standard response" },
  { area: "Deira, Bur Dubai, Al Karama", response: "4-hour standard response" },
  { area: "Sheikh Zayed Road corridor", response: "4-hour standard response" },
  { area: "Al Quoz, Al Barsha", response: "4-hour standard response" },
  { area: "Jebel Ali, Dubai South, DIP", response: "Same-day, scheduled dispatch" },
];

const repairProcessSteps = [
  { step: "01", title: "Call or WhatsApp", desc: "Describe the fault and printer model. Dispatch triages by district and machine to send the right technician first time.", time: "< 5 min" },
  { step: "02", title: "Technician En Route", desc: "A certified engineer is dispatched from our nearest Dubai coverage point. Priority queue for Business Bay, DIFC and Downtown.", time: "< 2 hrs (priority) / < 4 hrs" },
  { step: "03", title: "On-Site Diagnosis", desc: "Full fault diagnosis on your machine with a transparent, itemised quote before any part is touched — no surprise charges.", time: "15–30 min" },
  { step: "04", title: "Repair & Sign-Off", desc: "Genuine OEM parts installed, a test print run confirms the fix, and you receive a service report with a 30-day workmanship warranty.", time: "30–120 min" },
];

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

  const repairServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Printer Repair Service Dubai",
    "description": "On-site printer and photocopier repair in Dubai with 2-hour priority response for Business Bay, DIFC and Downtown, and 4-hour standard response citywide. Genuine OEM parts, certified technicians, 30-day workmanship warranty.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sahara Office Equipments",
      "legalName": "Sahara Office Equipment Trading LLC",
      "telephone": "+971503823969"
    },
    "areaServed": { "@type": "City", "name": "Dubai" },
    "serviceType": "Printer Repair",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": "150",
      "availability": "https://schema.org/InStock"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Book Printer Repair in Dubai",
    "description": "Steps to get an on-site printer or photocopier repair technician dispatched in Dubai from Sahara Office Equipments.",
    "totalTime": "PT2H",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "150" },
    "step": repairProcessSteps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title,
      "text": s.desc
    }))
  };

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
      <script type="application/ld+json">{JSON.stringify(repairServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
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
                  Printer &amp; Photocopier Repair <span className="text-primary">Dubai</span>
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

        <Section flush>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "2 Hrs", label: "Priority Response (DIFC/Business Bay)" },
              { value: "4 Hrs", label: "Standard Response, Citywide" },
              { value: "AED 150", label: "Callout From" },
              { value: "30 Days", label: "Workmanship Warranty" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Our Printer Repair Services in Dubai" align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {repairServices.map((s) => (
              <FeatureCard key={s.title} icon={s.icon} title={s.title} body={s.body} />
            ))}
          </div>
        </Section>

        <Section title="Response Time by Dubai District" subtitle="Dispatch is scheduled by district and technician location, not a single citywide queue." align="center" tone="raised">
          <div className="mx-auto max-w-3xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-caption uppercase tracking-widest text-muted">
                  <th className="py-3 pr-4">District</th>
                  <th className="py-3">Response Target</th>
                </tr>
              </thead>
              <tbody>
                {dubaiDistricts.map((d) => (
                  <tr key={d.area} className="border-b border-white/5">
                    <td className="py-3 pr-4 font-semibold text-white">{d.area}</td>
                    <td className="py-3 text-on-surface-variant">{d.response}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="How a Dubai Repair Call Works" subtitle="From your call to a working printer — typically under 4 hours, faster in priority districts." align="center">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {repairProcessSteps.map((s) => (
              <div key={s.step} className="rounded-card border border-white/[0.08] bg-surface-low p-6">
                <p className="mb-2 text-3xl font-bold text-primary/40">{s.step}</p>
                <h3 className="mb-2 text-lg font-bold text-white">{s.title}</h3>
                <p className="mb-3 text-sm text-on-surface-variant">{s.desc}</p>
                <p className="text-caption font-semibold uppercase tracking-widest text-primary">{s.time}</p>
              </div>
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
          body="Get a technician dispatched within 4 hours — 2 hours for Business Bay, DIFC and Downtown. Free diagnosis for AMC clients."
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
