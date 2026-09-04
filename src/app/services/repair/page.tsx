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
  ShieldCheckIcon,
  LayersIcon,
  HeadsetIcon,
  AwardIcon,
  LayerStackIcon,
  ClockIcon,
  TruckIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Printer Repair Dubai | Fix Printer Near Me | HP Service Center | Sahara",
  description: "On-site printer repair near you in Dubai, Sharjah & Abu Dhabi. Fix printer fast — 4-hr emergency response, OEM parts. Canon, HP, Kyocera, Xerox, Ricoh. HP Service Center Dubai. ☎ +971503823969",
  keywords: "printer repair dubai, printer services near me, fix printer near me, printer repairing near me, hp service center dubai, hp service center in dubai, printer fixing near me, printer fix services, photocopier repair sharjah, canon printer repair uae, kyocera service uae, printer technician dubai, printer service and repair",
  openGraph: {
    title: "Printer Repair Service Dubai & UAE | Sahara Office Equipments",
    description: "On-site printer repair with 4-hour emergency response across UAE. Certified technicians for Canon, HP, Kyocera, Xerox, Ricoh and all major brands.",
    images: [{ url: "https://www.saharaprinter.com/images/homement.webp", width: 1200, height: 630, alt: "Printer Repair Dubai UAE" }],
    url: "https://www.saharaprinter.com/services/repair/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/repair/" },
};

const repairServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Printer Repair Service UAE",
  "alternateName": "On-Site Photocopier Repair Dubai",
  "description": "Professional on-site printer and photocopier repair service across UAE. Factory-certified technicians service all major brands including Canon, HP, Kyocera, Ricoh, and Xerox. 4-hour emergency response, OEM parts, 98% first-visit fix rate.",
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
  "serviceType": "Printer Repair",
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
  "name": "How to Get Printer Repair Service in Dubai UAE",
  "description": "Steps to book on-site printer repair service from Sahara Office Equipments in UAE",
  "totalTime": "PT4H",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "Contact for quote" },
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Call or WhatsApp Us", "text": "Contact our support line at +971503823969 or WhatsApp. Describe your printer issue and model." },
    { "@type": "HowToStep", "position": 2, "name": "Technician Dispatched Within 1 Hour", "text": "A factory-certified technician is dispatched from the nearest service hub to your location." },
    { "@type": "HowToStep", "position": 3, "name": "On-Site Diagnosis & Repair", "text": "The technician performs a full diagnostic, sources OEM parts from our mobile parts inventory, and completes the repair." },
    { "@type": "HowToStep", "position": 4, "name": "Quality Check & Sign-Off", "text": "A test print run confirms the fix. You receive a service report with parts used and 30-day workmanship warranty." }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@id": "https://www.saharaprinter.com/services/repair/#faq",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-1",
      "name": "How quickly can a printer repair technician reach my office in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For Dubai and Sharjah locations, our average response time is 4 hours for standard service and under 2 hours for emergency callouts. Abu Dhabi locations typically receive same-day service. We dispatch technicians from the nearest service hub to minimize travel time."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-2",
      "name": "Do you use original OEM parts for printer repairs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — exclusively. Sahara only installs genuine OEM (Original Equipment Manufacturer) replacement parts for all brands including Canon, HP, Kyocera, Ricoh, and Xerox. We do not use compatible or third-party parts, which preserves your warranty and ensures long-term performance."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-3",
      "name": "Which printer brands do you repair in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our certified technicians repair all major printer and photocopier brands: Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Konica Minolta, and Toshiba. We carry mobile parts inventory for the most common models."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-4",
      "name": "What is the cost of printer repair service in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Repair costs vary depending on the fault and parts required. We provide a transparent, itemized quote before any work begins — no surprise charges. Clients on our AMC (Annual Maintenance Contract) or printer rental plans receive repairs at no additional cost."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-5",
      "name": "Do you offer emergency printer repair service on weekends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We operate Saturday through Thursday, 8:00 AM – 8:00 PM, with 24/7 emergency support for critical failures. For rental clients and AMC contract holders, emergency response is guaranteed around the clock."
      }
    },
    {
      "@type": "Question",
      "@id": "https://www.saharaprinter.com/services/repair/#faq-6",
      "name": "What warranty do you provide on printer repairs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All repair work carries a 30-day workmanship warranty. If the same fault recurs within 30 days of a completed repair, we return and fix it at no additional charge. OEM parts carry the manufacturer's standard warranty."
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
    { "@type": "ListItem", "position": 3, "name": "Printer Repair UAE", "item": "https://www.saharaprinter.com/services/repair" }
  ]
};

const commonProblems = [
  { code: "Paper Jam", brand: "All Brands", desc: "Roller wear, debris buildup, or incorrect media. We clear jams and replace worn feed rollers on-site.", icon: SettingsIcon },
  { code: "No Print Output", brand: "Canon / HP", desc: "Fuser assembly failure, drum unit end-of-life, or formatter board fault. Diagnosed in under 30 minutes.", icon: ShieldCheckIcon },
  { code: "Streaks / Lines", brand: "Kyocera / Ricoh", desc: "Dirty drum, scratched OPC drum, or developer unit failure. Cleaned or replaced with OEM components.", icon: LayersIcon },
  { code: "Network / Wi-Fi Issues", brand: "All MFPs", desc: "NIC card failure, firmware corruption, or IP conflict. Reconfigured and tested against your network.", icon: HeadsetIcon },
  { code: "Error Codes", brand: "Xerox / Sharp", desc: "E-codes, SC codes, and service codes interpreted and resolved. Our technicians carry manufacturer error-code guides.", icon: AwardIcon },
  { code: "Toner Not Fusing", brand: "All Brands", desc: "Fuser unit failure causes smearing or powdery output. Fuser replaced with OEM unit, calibrated to spec.", icon: LayerStackIcon },
  { code: "Slow Printing", brand: "HP / Brother", desc: "Driver corruption, memory shortage, or clogged print heads. Firmware updated, memory expanded where possible.", icon: ClockIcon },
  { code: "Scan / Copy Failure", brand: "Canon / Kyocera", desc: "ADF feed failure, scanner unit fault, or software error. Full multifunction diagnostic and component repair.", icon: TruckIcon },
];

const brandExpertise = [
  { name: "Canon", models: "imageRUNNER ADVANCE, i-SENSYS, PIXMA Pro", certLevel: "Factory Certified" },
  { name: "HP", models: "LaserJet Enterprise, OfficeJet Pro, DesignJet", certLevel: "Authorized Service" },
  { name: "Kyocera", models: "ECOSYS, TASKalfa, FS series", certLevel: "Factory Certified" },
  { name: "Ricoh", models: "MP series, IM series, SP series", certLevel: "Authorized Service" },
  { name: "Xerox", models: "VersaLink, AltaLink, WorkCentre", certLevel: "Authorized Service" },
  { name: "Brother", models: "MFC, DCP, HL series", certLevel: "Certified Partner" },
];

const processSteps = [
  { step: "01", title: "Call or WhatsApp", desc: "Describe your issue. Our support team triages the fault remotely and dispatches the right technician.", time: "< 5 min" },
  { step: "02", title: "Technician Dispatched", desc: "A certified engineer leaves from the nearest hub. Real-time tracking available on request.", time: "< 60 min" },
  { step: "03", title: "On-Site Diagnosis", desc: "Full diagnostic on your machine. Transparent cost quote before any part is touched.", time: "15–30 min" },
  { step: "04", title: "Repair & Test Run", desc: "OEM parts installed. 50-page test print run confirms the fix before the technician leaves.", time: "30–120 min" },
];

const industryUseCases = [
  { industry: "Real Estate", useCase: "High-volume contract printing for property agreements and brochures. We keep MFPs running during transaction peaks.", icon: AwardIcon },
  { industry: "Healthcare & Clinics", useCase: "Critical patient document workflows must never fail. Priority response contracts for medical facilities.", icon: HeadsetIcon },
  { industry: "Logistics & Shipping", useCase: "24/7 label and manifest printing demands zero downtime. Emergency response SLAs for operations teams.", icon: TruckIcon },
  { industry: "Education", useCase: "Exam season and administrative surges covered. AMC plans for universities and training centres.", icon: ClockIcon },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Printer Repair UAE" },
];

export default function RepairPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(repairServiceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Factory-Certified Technicians"
          title={
            <>
              Printer Repair
              <br />
              <span className="text-primary">Dubai &amp; UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="How much does it cost to repair a printer in the UAE?"
              answer="Printer repair in the UAE starts from AED 150 per callout. That fee covers an on-site visit by a factory-certified technician, full diagnosis, and labour; genuine OEM parts are quoted separately before any work begins. Every repair carries a 30-day workmanship warranty. Machines under a Sahara AMC pay nothing per callout."
              supportingPoints={[
                "Diagnosis and labour are included in the callout fee; parts are quoted before work starts",
                "Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp and Epson printers, copiers and plotters serviced",
                "30-day warranty on workmanship, and genuine OEM parts only — no compatibles",
                "Callouts are covered free under an AMC plan from AED 299/month per machine",
              ]}
            />
          }
          badges={["4-hr Response", "OEM Parts Only", "30-Day Warranty", "98% First-Visit Fix", "24/7 Emergency", "13+ Years · 50,000+ Repairs"]}
          image={{ src: "/images/homement.webp", alt: "Sahara certified printer repair technician servicing Canon photocopier in Dubai UAE", width: 800, height: 480 }}
          primaryCta={{ label: "Book a Technician", href: "/contact/" }}
          secondaryCta={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              { value: "50,000+", label: "Repairs Completed" },
              { value: "4 Hours", label: "Avg. Response Time" },
              { value: "98%", label: "First-Visit Fix Rate" },
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
          title="8 Printer Problems We Fix Daily"
          subtitle="Our mobile parts inventory covers 95% of common faults — most resolved in a single visit without ordering parts from the manufacturer."
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

        <Section eyebrow="Brand Expertise" title="Certified for Every Major Brand" subtitle="Unlike generalist repair shops, our engineers hold brand-specific certifications — meaning faster diagnosis and correct repairs the first time." align="center">
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

        <Section eyebrow="Process" title="How a Repair Call Works" subtitle="From your call to a working printer — typically under 4 hours." align="center" tone="raised">
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

        <Section eyebrow="Who We Serve" title="Repair Service for Every Industry" align="center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industryUseCases.map((u, i) => (
              <FeatureCard key={u.industry} icon={u.icon} title={u.industry} body={u.useCase} delay={(i % 4) * 0.05} />
            ))}
          </div>
        </Section>

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-caption font-semibold uppercase tracking-[0.18em] text-primary mb-4">Questions</p>
            <h2 className="font-sora text-title font-bold text-white">Printer Repair FAQ</h2>
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
          title="Printer Down Right Now?"
          body="Call us immediately. A certified technician will be at your location within 4 hours — or we dispatch a loaner machine."
          primary={{ label: "Call Now — +971 50 382 3969", href: "tel:+971503823969" }}
          secondary={{ label: "Book Online", href: "/contact/" }}
        />

        {/* Related — cross-link to Dubai-specific repair page to signal complementary (not duplicate) intent */}
        <Section flush tone="raised">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 font-sora text-headline font-bold text-white">Based in Dubai?</h2>
            <p className="text-muted">
              This page covers our full UAE-wide repair process, brands serviced, and SLA terms. For Dubai
              district coverage, local response times, and area-specific details, see{" "}
              <a href="/printer-repair-dubai/" className="font-semibold text-primary hover:underline">Printer Repair Dubai</a>.
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
