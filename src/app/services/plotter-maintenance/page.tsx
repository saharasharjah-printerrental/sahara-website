export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import AnswerBlock from "@/components/AnswerBlock";
import ProductHero from "@/components/ui/ProductHero";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import {
  SettingsIcon,
  TruckIcon,
  ShieldCheckIcon,
  LayersIcon,
  AwardIcon,
  LayerStackIcon,
  ClockIcon,
  HeadsetIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Plotter Repair & Maintenance Dubai | Wide-Format Printer AMC | Sahara",
  description: "Plotter repair and AMC for wide-format printers across Dubai, Sharjah & Abu Dhabi. Canon imagePROGRAF, HP DesignJet, Epson SureColor. Printhead, media-feed & colour calibration. ☎ +971503823969",
  keywords: "plotter repair dubai, wide format printer maintenance uae, hp designjet service dubai, canon imageprograf amc, plotter amc sharjah, plotter maintenance uae, wide format plotter repair, plotter printhead cleaning dubai",
  openGraph: {
    title: "Plotter Maintenance & Repair UAE | Sahara Office Equipments",
    description: "Wide-format plotter repair and AMC across UAE — Canon imagePROGRAF, HP DesignJet, Epson SureColor. Printhead servicing, media-feed repair, colour calibration.",
    images: [{ url: "https://www.saharaprinter.com/images/service-maintanence.webp", width: 1200, height: 630, alt: "Plotter Maintenance and Repair UAE" }],
    url: "https://www.saharaprinter.com/services/plotter-maintenance/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/plotter-maintenance/" },
};

const plotterServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Plotter Maintenance & Repair Service UAE",
  "alternateName": "Wide-Format Printer AMC Dubai",
  "description": "Professional maintenance and repair for wide-format plotters across UAE — Canon imagePROGRAF, HP DesignJet, and Epson SureColor. Printhead servicing, media-feed and cutter repair, colour calibration, and encoder-strip cleaning by factory-trained technicians.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "legalName": "Sahara Office Equipment Trading LLC",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Arabi Building, Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 }
  },
  "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah", "Fujairah", "Al Ain"],
  "serviceType": "Plotter Maintenance and Repair",
  "availableChannel": {
    "@type": "ServiceChannel",
    "servicePhone": { "@type": "ContactPoint", "telephone": "+971503823969" },
    "availableLanguage": ["English", "Arabic"]
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "availableAtOrFrom": { "@type": "Place", "name": "UAE — On-Site" }
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Book Plotter Maintenance Service in Dubai UAE",
  "description": "Steps to book wide-format plotter repair or AMC service from Sahara Office Equipments in UAE",
  "totalTime": "PT4H",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "Contact for quote" },
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Call or WhatsApp Us", "text": "Contact our support line at +971503823969. Describe the fault — banding, feed jam, printhead clog — and your plotter model." },
    { "@type": "HowToStep", "position": 2, "name": "Technician Dispatched", "text": "A technician trained on Canon imagePROGRAF, HP DesignJet, and Epson SureColor is dispatched from the nearest service hub." },
    { "@type": "HowToStep", "position": 3, "name": "On-Site Diagnosis & Repair", "text": "Full diagnostic covering printhead, ink lines, media feed, cutter, and encoder strip. OEM parts sourced from our mobile inventory." },
    { "@type": "HowToStep", "position": 4, "name": "Calibration & Test Plot", "text": "A colour calibration and full-size test plot confirms the fix. You receive a service report and 30-day workmanship warranty." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-1",
      "name": "What is plotter maintenance and why does my wide-format printer need it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plotter maintenance is scheduled cleaning and calibration of a wide-format printer's printhead, ink lines, media-feed rollers, cutter, and encoder strip. Unlike standard office printers, plotters run large-format ink systems that clog or drift out of calibration if left unserviced — leading to banding, misaligned lines, and wasted media. Regular AMC servicing catches this before it affects output."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-2",
      "name": "Which plotter brands do you service in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We service Canon imagePROGRAF, HP DesignJet, and Epson SureColor wide-format plotters across Dubai, Sharjah, and Abu Dhabi — covering CAD, engineering, and large-format graphics models."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-3",
      "name": "How much does plotter AMC cost in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plotter AMC pricing depends on model, print volume, and service frequency. We provide a transparent quote after a short site assessment — contact us for a plan tailored to your roll-width and monthly output."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-4",
      "name": "What causes banding or misaligned lines on my plotter prints?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Banding is most often a clogged printhead nozzle or a contaminated encoder strip — the thin sensor strip that tracks carriage position. Misaligned lines usually point to a printhead alignment drift or a bowed media-feed roller. Both are corrected during a standard maintenance visit."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-5",
      "name": "How often should a wide-format plotter be serviced?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For daily-use plotters in architecture, engineering, or print-shop environments, we recommend quarterly servicing. Lower-volume machines can run on a bi-annual schedule. AMC contract holders get their frequency set during onboarding based on actual print volume."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/plotter-maintenance/#faq-6",
      "name": "Do you offer emergency plotter repair for architecture and printing firms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We understand a plotter going down mid-deadline stops a project. AMC and rental clients receive priority dispatch, and we offer 24/7 emergency support for critical failures ahead of submission deadlines."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Plotter Maintenance", "item": "https://www.saharaprinter.com/services/plotter-maintenance" }
  ]
};

const commonProblems = [
  { code: "Printhead Clogging", brand: "Canon / HP / Epson", desc: "Dried ink blocks nozzles, causing banding or missing lines. We run nozzle checks and deep-clean cycles on-site.", icon: SettingsIcon },
  { code: "Media Feed Jams", brand: "All Wide-Format", desc: "Roll media skews or jams on worn feed rollers. Rollers cleaned or replaced and roll-tension recalibrated.", icon: TruckIcon },
  { code: "Cutter Misalignment", brand: "Canon / HP", desc: "Auto-cutter drifts off-line or fails to cut cleanly. Blade realigned or replaced with an OEM unit.", icon: ShieldCheckIcon },
  { code: "Colour Calibration Drift", brand: "All Brands", desc: "Output colour shifts from proof. Full ICC colour calibration restores print-to-screen accuracy.", icon: LayersIcon },
  { code: "Encoder Strip Contamination", brand: "Canon / Epson", desc: "Dust on the carriage encoder strip causes banding and stepping errors. Cleaned and inspected for scratches.", icon: AwardIcon },
  { code: "Ink Line Leaks", brand: "HP DesignJet", desc: "Ink supply tube wear causes leaks or air bubbles in the line. Lines purged, resealed, or replaced.", icon: LayerStackIcon },
  { code: "RIP / Driver Errors", brand: "All Brands", desc: "Print jobs fail to reach the plotter from CAD or RIP software. Driver and network path reconfigured.", icon: ClockIcon },
  { code: "Roll-Feed Motor Faults", brand: "Epson / HP", desc: "Motor strain from oversized rolls or heavy media. Motor and gear train inspected and serviced.", icon: HeadsetIcon },
];

const brandExpertise = [
  { name: "Canon imagePROGRAF", models: "PRO series, TX series, iPF series", certLevel: "Authorized Service" },
  { name: "HP DesignJet", models: "Z series, T series, PostScript models", certLevel: "Authorized Service" },
  { name: "Epson SureColor", models: "P series, T series, wide-format range", certLevel: "Authorized Service" },
];

const processSteps = [
  { step: "01", title: "Call or WhatsApp", desc: "Describe the fault and your plotter model. We triage remotely and dispatch the right technician.", time: "< 5 min" },
  { step: "02", title: "Technician Dispatched", desc: "An engineer trained on wide-format hardware leaves from the nearest hub.", time: "< 60 min" },
  { step: "03", title: "On-Site Diagnosis", desc: "Printhead, ink lines, feed rollers, cutter, and encoder strip checked. Transparent quote before work starts.", time: "20–40 min" },
  { step: "04", title: "Repair, Calibrate & Test Plot", desc: "OEM parts installed, colour calibrated, and a full-size test plot confirms the fix.", time: "45–150 min" },
];

const industryUseCases = [
  { industry: "Architecture & Engineering", useCase: "CAD drawing sets and blueprints demand crisp lines at full scale. We keep plotters calibrated for submission deadlines.", icon: AwardIcon },
  { industry: "Construction & Contracting", useCase: "Site drawings and revision sets print daily on-site or in the project office. Priority AMC response minimizes downtime.", icon: SettingsIcon },
  { industry: "Advertising & Signage", useCase: "Large-format proofs and banners need accurate, repeatable colour. Calibration service keeps client-facing output consistent.", icon: LayersIcon },
  { industry: "Retail & Interior Design", useCase: "POS graphics and mood boards run on tight production windows. Fast turnaround servicing keeps campaigns on schedule.", icon: ClockIcon },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Plotter Maintenance" },
];

export default function PlotterMaintenancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(plotterServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Wide-Format Specialists"
          title={
            <>
              Plotter Maintenance
              <br />
              <span className="text-primary">Dubai &amp; UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="How often should a wide-format plotter be serviced?"
              answer="Most wide-format plotters need a full service every three to six months. High-volume production units in Dubai print shops benefit from quarterly visits, while occasional-use office plotters can run six-monthly. A Sahara service covers printhead cleaning, ink-line checks, media-feed calibration, and colour accuracy testing on Canon imagePROGRAF, HP DesignJet, and Epson SureColor."
              supportingPoints={[
                "Quarterly for production and reprographics use; six-monthly for low-volume office plotters",
                "Each visit: printhead clean, ink-line check, media-feed calibration, colour accuracy test",
                "Canon imagePROGRAF, HP DesignJet and Epson SureColor serviced with OEM parts only",
                "Available on callout or under an AMC plan — current rates confirmed same working day by phone",
              ]}
            />
          }
          badges={["Canon · HP · Epson", "OEM Parts Only", "30-Day Warranty", "Colour Calibration", "AMC Plans Available"]}
          image={{ src: "/images/service-maintanence.webp", alt: "Sahara technician servicing a wide-format plotter printer in Dubai UAE", width: 800, height: 480 }}
          primaryCta={{ label: "Book a Technician", href: "/contact/" }}
          secondaryCta={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "3 Brands", label: "Canon · HP · Epson" },
              { value: "OEM Only", label: "Genuine Replacement Parts" },
              { value: "30-Day", label: "Workmanship Warranty" },
              { value: "24/7", label: "Emergency Support" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-caption uppercase tracking-widest text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Fault Diagnosis"
          title="8 Plotter Problems We Fix"
          subtitle="Wide-format faults differ from standard office printers. Our mobile parts inventory covers printhead, ink-line, and media-feed components for the most common plotter models."
          align="center"
          tone="ink"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commonProblems.map((p, i) => (
              <FeatureCard
                key={p.code}
                icon={p.icon}
                title={p.code}
                delay={(i % 4) * 0.05}
                body={
                  <>
                    <p className="mb-1 text-caption font-semibold text-primary/80">{p.brand}</p>
                    {p.desc}
                  </>
                }
              />
            ))}
          </div>
        </Section>

        <Section eyebrow="Brand Expertise" title="Serviced for Every Major Plotter Line" subtitle="Wide-format hardware needs technicians who work on it daily — not a generalist printer repair shop." align="center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brandExpertise.map((b) => (
              <div key={b.name} className="flex items-start gap-4 rounded-card border border-white/[0.08] bg-surface-low p-6 transition-all hover:border-primary/30">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-primary/20 bg-primary/10 text-xs font-black text-primary">
                  {b.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-bold text-white">{b.name}</h3>
                    <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{b.certLevel}</span>
                  </div>
                  <p className="text-caption text-muted">{b.models}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Process" title="How a Plotter Service Call Works" subtitle="From your call to a calibrated test plot." align="center" tone="raised">
          <div className="relative">
            <div className="absolute left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
            <div className="grid gap-8 lg:grid-cols-4">
              {processSteps.map((p) => (
                <div key={p.step} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-deep text-base font-black text-on-primary">
                    {p.step}
                  </div>
                  <span className="rounded-pill bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">{p.time}</span>
                  <h3 className="mb-2 mt-3 text-[0.9rem] font-bold text-white">{p.title}</h3>
                  <p className="text-[0.8rem] leading-relaxed text-muted">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section eyebrow="Who We Serve" title="Plotter Service for Every Industry" align="center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industryUseCases.map((u, i) => (
              <FeatureCard key={u.industry} icon={u.icon} title={u.industry} body={u.useCase} delay={(i % 4) * 0.05} />
            ))}
          </div>
        </Section>

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Questions</p>
            <h2 className="font-sora text-title font-bold text-white">Plotter Maintenance FAQ</h2>
          </div>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={faq["@id"]} className="glass-card rounded-card p-6 group cursor-pointer" open={i === 0}>
                <summary className="flex items-center justify-between gap-4 pr-2 list-none font-bold text-[1rem] text-white">
                  {faq.name}
                  <span className="shrink-0 text-xl text-primary transition-transform duration-200 group-open:rotate-180">›</span>
                </summary>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-on-surface-variant">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Plotter Down Mid-Deadline?"
          body="Call us immediately. A wide-format certified technician will diagnose printhead, feed, and calibration faults on-site."
          primary={{ label: "Call Now — +971 50 382 3969", href: "tel:+971503823969" }}
          secondary={{ label: "Book Online", href: "/contact/" }}
        />

        {/* Related — cross-link to neighbouring service pages to signal complementary (not duplicate) intent */}
        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-sora text-headline font-bold text-white">Looking for Standard Printer Service?</h2>
            <p className="text-muted">
              This page covers wide-format plotter servicing specifically. For desktop and office MFP repairs, see{" "}
              <a href="/services/repair/" className="font-semibold text-primary hover:underline">Printer Repair UAE</a>.
              For fleet-wide contract coverage across both plotters and office printers, see{" "}
              <a href="/services/amc/" className="font-semibold text-primary hover:underline">Annual Maintenance Contracts</a>.
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
