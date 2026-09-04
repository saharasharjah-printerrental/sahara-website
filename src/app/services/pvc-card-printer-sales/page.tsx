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
import SpecTable from "@/components/ui/SpecTable";
import ComparisonTable from "@/components/ui/ComparisonTable";
import CtaBand from "@/components/ui/CtaBand";
import { AwardIcon, ShieldCheckIcon, SettingsIcon, HeadsetIcon } from "@/components/icons";
import type { FaqItem } from "@/lib/faqs";

// Static, generous validity window for the indicative price ranges below —
// this page is statically rendered, so this is fixed at build time; redeploying
// refreshes it. Mirrors the pattern in bravo-card-printers-uae/page.tsx.
const PRICE_VALID_UNTIL = new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10);

export const metadata: Metadata = {
  title: "PVC Card Printer Sales UAE | Buy Bravo RTAI & DC 3300 | Sahara",
  description: "Buy a PVC / ID card printer in UAE — Bravo RTAI or DC 3300, from Sahara Office Equipments, authorised exclusive UAE reseller. 3-year warranty, genuine consumables, AMC available. Dubai, Sharjah & Abu Dhabi. ☎ +971503823969",
  keywords: "buy pvc card printer dubai, id card printer price uae, pvc card printer for sale dubai, bravo rtai price uae, bravo dc 3300 price uae, plastic card printer supplier uae, id card printer dealer dubai",
  openGraph: {
    title: "PVC Card Printer Sales UAE | Sahara Office Equipments",
    description: "Buy a Bravo RTAI or DC 3300 PVC/ID card printer in UAE — 3-year warranty, genuine consumables, and authorised exclusive UAE reseller support.",
    url: "https://www.saharaprinter.com/services/pvc-card-printer-sales/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/brands/bravo/dc3300-official.webp", width: 610, height: 610 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PVC Card Printer Sales UAE | Sahara Office Equipments",
    description: "Buy a Bravo RTAI or DC 3300 PVC/ID card printer in UAE — 3-year warranty, genuine consumables, and authorised exclusive UAE reseller support.",
    images: ["https://www.saharaprinter.com/brands/bravo/dc3300-official.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/pvc-card-printer-sales/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Where can I buy a genuine Bravo PVC card printer in UAE?",
    a: "Sahara Office Equipments is the authorised exclusive reseller in the UAE for the Bravo RTAI and Bravo DC 3300 — the only UAE partner appointed by Bravo Global to sell, install, and warranty these two models. Buying through us guarantees a genuine unit, full 3-year warranty, and locally stocked consumables.",
  },
  {
    q: "How much does a PVC card printer cost in UAE?",
    a: "Indicative pricing starts around AED 5,000 for a Bravo DC 3300 S (simplex, no encoding) and ranges up to AED 22,000 for a Bravo RTAI with holographic security film. Final price depends on encoding modules, lamination, and simplex vs duplex — request a tailored quote for your exact configuration.",
  },
  {
    q: "What warranty comes with a purchased Bravo card printer?",
    a: "Both the RTAI and DC 3300 carry a 3-year printer warranty, with the RTAI additionally covering the print head for life. Optional extended warranty and an Annual Maintenance Contract (AMC) are available through Sahara as the authorised exclusive UAE reseller.",
  },
  {
    q: "Can I upgrade a simplex DC 3300 to duplex after purchase?",
    a: "Yes. The Bravo DC 3300 S (simplex) can be upgraded to duplex printing via a software activation key on-site — no hardware replacement needed. Ask your Sahara account manager when you order.",
  },
  {
    q: "Do you supply genuine ribbons and blank cards after purchase?",
    a: "Yes. As the authorised exclusive UAE reseller, Sahara stocks genuine YMCKO ribbons, retransfer film, and blank PVC/composite cards locally for same-day availability — see our Toner & Spare Parts page.",
  },
  {
    q: "Is financing or leasing available for a card printer purchase?",
    a: "We can structure a lease-to-own or staged-payment arrangement for larger orders, and pair a purchase with an AMC for predictable running costs. Contact us with your requirement for a tailored proposal.",
  },
];

const rtaiOfferSpecs = [
  { label: "Technology", value: "600 DPI colour dye-sublimation retransfer" },
  { label: "Best for", value: "Government ID, banking, high-security credentials" },
  { label: "Warranty", value: "3 years | Lifetime print head" },
  { label: "Indicative price", value: "AED 9,000 – 22,000 (config-dependent)" },
];

const dc3300OfferSpecs = [
  { label: "Technology", value: "Direct-to-card, up to 280 cards/hour" },
  { label: "Best for", value: "Corporate ID, campus & membership cards" },
  { label: "Warranty", value: "3 years | Extended warranty available" },
  { label: "Indicative price", value: "AED 5,000 – 14,000 (config-dependent)" },
];

const pricingTable = [
  ["Bravo DC 3300 S — simplex, no encoding", "AED 5,000 – 7,500", "Standard single-sided employee ID batches"],
  ["Bravo DC 3300 D — duplex + smartcard encoding", "AED 8,500 – 14,000", "Corporate/campus ID with access-control encoding"],
  ["Bravo RTAI — 600 DPI retransfer, standard config", "AED 9,000 – 15,000", "High-quality photo ID, over-the-edge printing"],
  ["Bravo RTAI — with holographic security film", "AED 15,000 – 22,000", "Government ID, banking, access credentials"],
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "PVC Card Printer Sales" },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "PVC / ID Card Printer Sales",
  "name": "PVC Card Printer Sales UAE",
  "description": "Sale of Bravo RTAI and Bravo DC 3300 PVC/ID card printers in the UAE by Sahara Office Equipments, the authorised exclusive UAE reseller for these two models.",
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
  "url": "https://www.saharaprinter.com/services/pvc-card-printer-sales/",
  "offers": [
    {
      "@type": "Offer",
      "itemOffered": { "@type": "Product", "name": "Bravo RTAI Colour Reverse Transfer Card Printer" },
      "priceCurrency": "AED",
      "priceValidUntil": PRICE_VALID_UNTIL,
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "AED", "minPrice": 9000, "maxPrice": 22000, "valueAddedTaxIncluded": false },
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://www.saharaprinter.com" },
    },
    {
      "@type": "Offer",
      "itemOffered": { "@type": "Product", "name": "Bravo DC 3300 Direct to Card Printer" },
      "priceCurrency": "AED",
      "priceValidUntil": PRICE_VALID_UNTIL,
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "AED", "minPrice": 5000, "maxPrice": 14000, "valueAddedTaxIncluded": false },
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://www.saharaprinter.com" },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "PVC Card Printer Sales", "item": "https://www.saharaprinter.com/services/pvc-card-printer-sales/" },
  ],
};

export default function PvcCardPrinterSalesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Authorised Exclusive Reseller — RTAI & DC 3300"
          title="PVC Card Printer Sales — UAE"
          answer={
            <AnswerBlock
              id="pvc-card-printer-sales-uae"
              question="Where can I buy a PVC card printer in UAE, and how much does it cost?"
              answer="Sahara Office Equipments sells the Bravo RTAI and DC 3300 PVC/ID card printers as the authorised exclusive UAE reseller, from around AED 5,000 for a basic DC 3300 up to AED 22,000 for an RTAI with holographic security — both with a 3-year warranty and locally stocked genuine consumables."
              supportingPoints={[
                "Two models: RTAI (600 DPI retransfer, holographic security, lifetime print-head warranty) and DC 3300 (up to 280 cards/hour, simplex or duplex).",
                "3-year printer warranty on both models; RTAI print head covered for life.",
                "Genuine YMCKO ribbons, retransfer film, and blank PVC cards stocked in-country.",
                "Optional AMC and extended warranty for predictable running costs.",
              ]}
            />
          }
          image={{ src: "/brands/bravo/dc3300-official.webp", alt: "Bravo DC 3300 PVC card printer for sale in UAE", width: 610, height: 610 }}
          primaryCta={{ label: "Get a Price Quote", href: "/pvc-card-printer-quote/" }}
          secondaryCta={{ label: "Call: +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section eyebrow="Two Models" title="Choose your PVC card printer" flush>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-panel border border-white/[0.08] bg-surface-low p-8">
              <h3 className="font-sora text-headline font-bold text-white mb-4">Bravo RTAI</h3>
              <SpecTable rows={rtaiOfferSpecs} />
            </div>
            <div className="rounded-panel border border-white/[0.08] bg-surface-low p-8">
              <h3 className="font-sora text-headline font-bold text-white mb-4">Bravo DC 3300</h3>
              <SpecTable rows={dc3300OfferSpecs} />
            </div>
          </div>
          <p className="mt-6 text-caption text-muted">
            Full technical specifications for both models are on the{" "}
            <a href="/bravo-card-printers-uae/" className="text-primary hover:underline">
              PVC Card Printers model guide
            </a>
            .
          </p>
        </Section>

        <Section eyebrow="Indicative Pricing" title="How much does a PVC card printer cost?" tone="raised">
          <ComparisonTable columns={["Configuration", "Indicative AED Price", "Best For"]} highlightColumn={1} rows={pricingTable} />
          <p className="mt-6 text-caption text-muted">
            Prices are indicative UAE ranges; final price depends on encoding modules, lamination, and
            simplex vs duplex configuration. Request a tailored quote for your exact requirement.
          </p>
        </Section>

        <Section eyebrow="Why Buy From Sahara" title="Backed by the authorised exclusive UAE reseller">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={AwardIcon} title="Exclusive Reseller" body="The only UAE partner appointed by Bravo Global to sell, install and warranty the RTAI and DC 3300." />
            <FeatureCard icon={ShieldCheckIcon} title="3-Year Warranty" body="Full manufacturer warranty on both models, lifetime print-head cover on the RTAI." delay={0.05} />
            <FeatureCard icon={SettingsIcon} title="Configured to Order" body="Encoding modules, lamination, and simplex-to-duplex upgrades fitted before delivery or on-site." delay={0.1} />
            <FeatureCard icon={HeadsetIcon} title="After-Sales Support" body="Genuine consumables stocked locally, plus AMC and extended warranty options." delay={0.15} />
          </div>
        </Section>

        <CtaBand
          title="Ready to Buy a Bravo Card Printer?"
          body="Tell us your card volume, security requirement, and encoding needs — we'll recommend the right model and configuration."
          primary={{ label: "Get a Price Quote", href: "/pvc-card-printer-quote/" }}
          secondary={{ label: "See AMC Plans", href: "/services/amc/" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about buying a PVC card printer in the UAE.</p>
          </div>
          <FaqSection
            pageSlug="services/pvc-card-printer-sales"
            defaultFaqs={DEFAULT_FAQS}
            pageId="https://www.saharaprinter.com/services/pvc-card-printer-sales/#faq"
          />
        </Section>

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/bravo-card-printers-uae/", label: "PVC Card Printers — Model Guide" },
              { href: "/services/pvc-card-printer-rental/", label: "PVC Card Printer Rental" },
              { href: "/services/pvc-card-printing-services/", label: "PVC Card Printing Services" },
              { href: "/services/amc/", label: "Printer AMC UAE" },
              { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
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
