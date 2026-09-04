export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import FaqSection from "@/components/FaqSection";
import AnswerBlock from "@/components/AnswerBlock";
import ProductHero from "@/components/ui/ProductHero";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import { ClockIcon, TruckIcon, HeadsetIcon, AwardIcon, IdCardIcon, SettingsIcon } from "@/components/icons";
import type { FaqItem } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "PVC Card Printer Rental UAE | Bravo RTAI & DC 3300 | Sahara",
  description: "Rent a PVC / ID card printer in UAE — Bravo RTAI or DC 3300, from Sahara Office Equipments, authorised exclusive UAE reseller. Weekly, monthly & annual terms for events, onboarding drives & exhibitions. Dubai, Sharjah & Abu Dhabi. ☎ +971503823969",
  keywords: "pvc card printer rental dubai, id card printer rental uae, hire id card printer dubai, card printer for event uae, temporary id card printer rental, bravo card printer rental, plastic card printer rental sharjah",
  openGraph: {
    title: "PVC Card Printer Rental UAE | Sahara Office Equipments",
    description: "Rent a Bravo RTAI or DC 3300 PVC/ID card printer in UAE — weekly, monthly, or annual terms with setup, ribbons, and support included.",
    url: "https://www.saharaprinter.com/services/pvc-card-printer-rental/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/brands/bravo/rtai-official.webp", width: 610, height: 610 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PVC Card Printer Rental UAE | Sahara Office Equipments",
    description: "Rent a Bravo RTAI or DC 3300 PVC/ID card printer in UAE — weekly, monthly, or annual terms with setup, ribbons, and support included.",
    images: ["https://www.saharaprinter.com/brands/bravo/rtai-official.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/pvc-card-printer-rental/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Can I rent a PVC card printer for a single event in UAE?",
    a: "Yes. Sahara offers short-term rental of the Bravo RTAI and DC 3300 for exhibitions, conferences, and one-off badge-printing needs — from a few days up to a full week, with on-site setup and same-day collection available across Dubai, Sharjah, and Abu Dhabi.",
  },
  {
    q: "What is included in a PVC card printer rental?",
    a: "Every rental includes the printer, a starter set of genuine ribbons, on-site delivery and setup, driver installation support, and phone/WhatsApp support for the rental period. Extended terms also include scheduled maintenance and a swap-out unit if a fault occurs.",
  },
  {
    q: "What rental terms are available for card printers?",
    a: "Weekly (events and exhibitions), monthly (onboarding drives, project-based ID issuance), and annual (ongoing badge programmes) — all as an authorised exclusive reseller of the Bravo RTAI and DC 3300 in the UAE, so genuine consumables are always in stock.",
  },
  {
    q: "Is it cheaper to rent or buy a PVC card printer?",
    a: "For a single event or a short project, rental avoids the upfront cost of a printer you'll use once. For ongoing, regular card issuance — say, monthly new-hire badges — purchasing typically pays back within a year. See our rent-vs-buy comparison below, or ask for a tailored recommendation.",
  },
  {
    q: "Can a rented card printer encode access-control or RFID cards?",
    a: "Yes — the Bravo DC 3300 rental unit can be configured with magnetic stripe, contact smartcard, or contactless/RFID encoding on request, useful for temporary access-badge programmes at conferences, free-zone facilities, or construction sites.",
  },
  {
    q: "Do you deliver and set up the rental printer on-site?",
    a: "Yes, delivery and setup are included across Dubai, Sharjah, Abu Dhabi, and all UAE emirates. Our technician configures the printer, installs drivers, and runs a test card before handover.",
  },
];

const rentalTiers = [
  { term: "Weekly", best: "Exhibitions, conferences, short events", includes: "Printer, starter ribbon set, setup, support" },
  { term: "Monthly", best: "Onboarding drives, seasonal hiring, project ID issuance", includes: "+ scheduled check-in, priority swap-out" },
  { term: "Annual", best: "Ongoing badge programmes, standing access-control needs", includes: "+ preventive maintenance, guaranteed swap-out unit" },
];

const rentVsBuy = [
  ["Upfront cost", "Low — no capital outlay", "Full purchase price"],
  ["Best for", "One-off or short-term need", "Regular, ongoing card issuance"],
  ["Maintenance", "Included in rental", "Covered by optional AMC"],
  ["Consumables", "Genuine Bravo ribbons available on request", "Genuine Bravo ribbons stocked locally"],
  ["Flexibility", "Swap models or return anytime", "Fixed to the model purchased"],
  ["Typical payback vs buying", "Cheaper under ~3 months' use", "Cheaper beyond ~12 months' use"],
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "PVC Card Printer Rental" },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "PVC / ID Card Printer Rental",
  "name": "PVC Card Printer Rental UAE",
  "description": "Short-term and long-term rental of Bravo RTAI and Bravo DC 3300 PVC/ID card printers in the UAE, including setup, ribbons, and support.",
  "provider": {
    "@type": "Organization",
    "name": "Sahara Office Equipments",
    "url": "https://www.saharaprinter.com",
    "telephone": "+971503823969",
  },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Abu Dhabi" },
  ],
  "url": "https://www.saharaprinter.com/services/pvc-card-printer-rental/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "PVC Card Printer Rental", "item": "https://www.saharaprinter.com/services/pvc-card-printer-rental/" },
  ],
};

export default function PvcCardPrinterRentalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Authorised Exclusive Reseller — RTAI & DC 3300"
          title="PVC Card Printer Rental — UAE"
          answer={
            <AnswerBlock
              id="pvc-card-printer-rental-uae"
              question="Can I rent a PVC card printer in UAE instead of buying one?"
              answer="Yes — Sahara Office Equipments rents the Bravo RTAI and DC 3300 PVC/ID card printers on weekly, monthly, or annual terms, with delivery, setup, starter ribbons, and support included, across Dubai, Sharjah, Abu Dhabi, and all UAE emirates."
              supportingPoints={[
                "Weekly terms for a single event or exhibition; monthly for onboarding drives; annual for ongoing badge programmes.",
                "Both models available: RTAI (600 DPI retransfer, holographic security) and DC 3300 (up to 280 cards/hour).",
                "Genuine ribbons and consumables — we're the authorised exclusive UAE reseller for both models.",
                "On-site setup and phone/WhatsApp support for the full rental period.",
              ]}
            />
          }
          image={{ src: "/brands/bravo/rtai-official.webp", alt: "Bravo RTAI PVC card printer available for rental in UAE", width: 610, height: 610 }}
          primaryCta={{ label: "Get a Rental Quote", href: "/pvc-card-printer-quote/" }}
          secondaryCta={{ label: "Call: +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section
          eyebrow="Rental Terms"
          title="Choose the term that fits your project"
          subtitle="All terms include the printer, a starter ribbon set, on-site setup, and support."
          flush
        >
          <ComparisonTable
            columns={["Term", "Best For", "Includes"]}
            rows={rentalTiers.map((t) => [t.term, t.best, t.includes])}
          />
        </Section>

        <Section eyebrow="What's Included" title="Every rental is fully supported" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={IdCardIcon} title="Printer + Starter Ribbons" body="RTAI or DC 3300, delivered with a starter set of genuine ribbons ready to print on arrival." />
            <FeatureCard icon={TruckIcon} title="Delivery & Setup" body="On-site delivery, driver installation, and a test card run — across Dubai, Sharjah, Abu Dhabi, and all emirates." delay={0.05} />
            <FeatureCard icon={SettingsIcon} title="Encoding on Request" body="Magnetic stripe, contact smartcard, or RFID/contactless encoding configured for the rental unit if your event needs it." delay={0.1} />
            <FeatureCard icon={ClockIcon} title="Flexible Terms" body="Weekly for a single event, monthly for a project, annual for a standing badge programme — swap terms as your need changes." delay={0.15} />
            <FeatureCard icon={HeadsetIcon} title="Support Included" body="Phone and WhatsApp support for the rental period, plus a swap-out unit on longer terms if a fault occurs." delay={0.2} />
            <FeatureCard icon={AwardIcon} title="Genuine Consumables" body="As the authorised exclusive UAE reseller for the RTAI and DC 3300, every ribbon we supply is genuine Bravo stock." delay={0.25} />
          </div>
        </Section>

        <Section eyebrow="Rent vs Buy" title="Which makes sense for your project?">
          <ComparisonTable columns={["", "Rental", "Purchase"]} highlightColumn={1} rows={rentVsBuy} />
          <p className="mt-6 text-caption text-muted">
            Looking to buy instead?{" "}
            <a href="/services/pvc-card-printer-sales/" className="text-primary hover:underline">
              See PVC card printer sales &amp; pricing
            </a>
            .
          </p>
        </Section>

        <Section eyebrow="Use Cases" title="Who rents a PVC card printer in UAE?" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Exhibitions & Conferences", body: "Print visitor and exhibitor badges on-site at Dubai World Trade Centre, ADNEC, and Sharjah Expo Centre events." },
              { title: "Corporate Onboarding Drives", body: "Batch-issue employee ID cards during hiring waves without committing to a permanent printer." },
              { title: "Free Zone & Facility Access", body: "Temporary or project-based access-control badges for JAFZA, SAIF Zone, and construction site personnel." },
              { title: "Education & Training Programmes", body: "Short-course or semester-based student ID issuance without a long-term hardware commitment." },
              { title: "Membership & Loyalty Drives", body: "Time-boxed campaigns issuing membership or loyalty cards at retail and hospitality venues." },
              { title: "Government & Community Events", body: "Community ID or credential drives run by government and semi-government entities across the UAE." },
            ].map((u) => (
              <FeatureCard key={u.title} title={u.title} body={u.body} />
            ))}
          </div>
        </Section>

        <CtaBand
          title="Rent a PVC Card Printer Today"
          body="Tell us your dates, volume, and card type — we'll recommend the RTAI or DC 3300 and have it delivered and set up on-site."
          primary={{ label: "Get a Rental Quote", href: "/pvc-card-printer-quote/" }}
          secondary={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about renting a PVC card printer in the UAE.</p>
          </div>
          <FaqSection
            pageSlug="services/pvc-card-printer-rental"
            defaultFaqs={DEFAULT_FAQS}
            pageId="https://www.saharaprinter.com/services/pvc-card-printer-rental/#faq"
          />
        </Section>

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/bravo-card-printers-uae/", label: "PVC Card Printers — Model Guide" },
              { href: "/services/pvc-card-printer-sales/", label: "PVC Card Printer Sales" },
              { href: "/services/pvc-card-printing-services/", label: "PVC Card Printing Services" },
              { href: "/services/printer-rental/", label: "Printer Rental UAE" },
              { href: "/rental-calculator/", label: "Rental Calculator" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-caption text-primary bg-primary/10 border border-primary/20 px-4 py-2 rounded-pill hover:bg-primary/20 transition-colors">
                {l.label}
              </a>
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
