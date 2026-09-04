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
import { ShieldCheckIcon, AwardIcon, SettingsIcon, TruckIcon } from "@/components/icons";
import type { FaqItem } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Paper Shredder Rental & Sales Dubai UAE | Fellowes Shredders | Sahara",
  description: "Rent or buy a paper shredder in Dubai, Sharjah & Abu Dhabi — Fellowes Powershred LX65 & 325Ci cross-cut models. UAE PDPL compliant document destruction. Free delivery, setup & maintenance. ☎ +971503823969",
  keywords: "paper shredder rental dubai, shredder rental uae, buy paper shredder dubai, paper shredder machine dubai, document shredding services uae, confidential document destruction dubai, fellowes shredder dubai, shredder for rent dubai, din p-4 shredder uae, office paper shredder uae",
  openGraph: {
    title: "Paper Shredder Rental & Sales Dubai & UAE | Sahara Office Equipments",
    description: "Fellowes Powershred cross-cut paper shredders for rent or purchase in Dubai, Sharjah & Abu Dhabi. UAE PDPL compliant document destruction. Free delivery & setup. ☎ +971503823969",
    url: "https://www.saharaprinter.com/services/paper-shredder-rental/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp", width: 1200, height: 630, alt: "Fellowes Powershred 325Ci commercial paper shredder available for rent in Dubai and UAE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Shredder Rental & Sales Dubai & UAE | Sahara Office Equipments",
    description: "Fellowes Powershred cross-cut paper shredders for rent or purchase in Dubai, Sharjah & Abu Dhabi. UAE PDPL compliant document destruction.",
    images: ["https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/paper-shredder-rental/" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Paper Shredder Rental & Sales UAE",
  "description": "Paper shredder rental and sales in Dubai, Sharjah, and Abu Dhabi. Fellowes Powershred DIN P-4 cross-cut models. UAE PDPL compliant document destruction for offices, events, and audits.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Sahara Office Equipments",
    "telephone": "+971503823969",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Arabi Building, Industrial Area 11",
      "addressLocality": "Sharjah",
      "addressCountry": "AE",
    },
    "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "price": "150",
    "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "AED" },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/printer-rental/" },
    { "@type": "ListItem", "position": 3, "name": "Paper Shredder Rental", "item": "https://www.saharaprinter.com/services/paper-shredder-rental/" },
  ],
};

// Default FAQ set for /services/paper-shredder-rental/. These are only the
// fallback: FaqSection reads pageSlug 'services/paper-shredder-rental' from D1
// first (migration 018) and emits the FAQPage JSON-LD itself, so the Q&A text
// lives in exactly one place. The old hand-rolled faqSchema literal + the
// schema-less ShredderFaqClient duplicate have both been removed.
const SHREDDER_FAQS: FaqItem[] = [
  { q: "How much does paper shredder rental cost in Dubai?", a: "Paper shredder rental in Dubai starts from AED 150 for the Fellowes Powershred LX65 cross-cut model. Higher-capacity departmental shredders like the Fellowes 325Ci start from AED 400. Rental terms are customised to your document volume and contract length — request a quote for exact pricing. All rentals include free delivery, setup, and maintenance." },
  { q: "Can I rent a paper shredder for a single day or event in UAE?", a: "Yes. Sahara Office Equipments offers short-term paper shredder rental in Dubai, Sharjah, and Abu Dhabi with flexible, customised contract lengths — ideal for office clear-outs, events, and compliance audits. Tell us your dates and we'll confirm availability." },
  { q: "What types of shredders are available for rent in UAE?", a: "We supply Fellowes Powershred cross-cut shredders (DIN P-4 security level) in both personal/light-office and departmental capacities, plus heavy-duty industrial models for bulk destruction on request. All are compliant with UAE data protection and GDPR standards." },
  { q: "Is paper shredder rental better than buying in UAE?", a: "For occasional or seasonal use, rental is significantly cheaper than buying. A good office shredder costs AED 800–3,000 to buy. Renting from AED 150 gives you the same quality with maintenance included and no capital expenditure. For daily, high-volume shredding, buying can be the better long-term option." },
  { q: "Do you deliver paper shredders to JAFZA, SAIF Zone, and free zones?", a: "Yes. We deliver paper shredders to all UAE free zones including JAFZA (Dubai), SAIF Zone (Sharjah), DAFZA, DIFC, and Abu Dhabi free zones. Same-day delivery available for Dubai and Sharjah." },
  { q: "Are your shredders compliant with UAE data protection laws?", a: "Yes. All shredders we supply meet the UAE Personal Data Protection Law (PDPL Federal Decree-Law No. 45 of 2021) requirements for secure document destruction. Our Fellowes cross-cut models meet DIN P-4 — the recommended standard for confidential documents — with higher security levels available on request." },
  { q: "Where can I get a paper shredder machine in Dubai?", a: "Sahara Office Equipments supplies and delivers paper shredder machines throughout Dubai — for rent from AED 150 or as a one-off purchase. Free delivery and on-site setup are included across all Dubai districts, with same-day availability in most areas." },
  { q: "Can I buy a paper shredder instead of renting one?", a: "Yes — Sahara sells paper shredders outright as well as renting them. For offices that shred only occasionally, renting from AED 150 (with maintenance and repairs included) usually works out cheaper than buying outright at AED 800–3,000+. For daily, high-volume shredding, buying can make sense — ask us for a side-by-side quote and we'll recommend whichever is cheaper for your actual usage." },
  { q: "What's the difference between the paper shredders Sahara offers in the UAE?", a: "Sahara's UAE shredder range covers the Fellowes Powershred LX65 (10 sheets/pass, personal or light-office use) and the Fellowes Powershred 325Ci (24 sheets/pass, departmental/commercial use), both DIN P-4 cross-cut, plus heavy-duty models for high-volume clear-outs on request. All are available to rent or buy, with free delivery across Dubai, Sharjah, and Abu Dhabi." },
  { q: "Does Sahara supply paper shredders across Dubai and the wider UAE?", a: "Yes. Sahara delivers and services paper shredders across Dubai, Sharjah, Abu Dhabi, Ajman, and Ras Al Khaimah, including free zones like JAFZA, SAIF Zone, and DIFC. Rental plans start from AED 150; outright purchase is also available on request." },
];

const models = [
  {
    name: "Fellowes Powershred LX65",
    image: "/images/shredder-fellowes-lx65.webp",
    alt: "Fellowes Powershred LX65 cross-cut paper shredder available for rent in Dubai and Sharjah",
    level: "DIN P-4 Cross-Cut",
    capacity: "10 sheets/pass",
    bin: "22.7L bin (300+ sheets)",
    bestFor: "Personal & light office use, general documents, credit cards",
    price: "From AED 150",
    badge: "Most Popular",
  },
  {
    name: "Fellowes Powershred 325Ci",
    image: "/images/shredder-fellowes-325ci.webp",
    alt: "Fellowes Powershred 325Ci commercial cross-cut paper shredder available for rent in Dubai and Sharjah",
    level: "DIN P-4 Cross-Cut",
    capacity: "24 sheets/pass",
    bin: "83L bin, 100% Jam Proof",
    bestFor: "Departmental & commercial use, multi-user offices, high-volume clear-outs",
    price: "From AED 400",
    badge: "High Volume",
  },
];

const complianceFeatures = [
  { icon: ShieldCheckIcon, title: "PDPL Compliant", desc: "All rental shredders meet UAE PDPL requirements for secure physical data destruction." },
  { icon: AwardIcon, title: "GDPR-Ready", desc: "DIN P-4 cross-cut models suit most confidential document destruction needs; higher security levels available on request for multi-national organisations." },
  { icon: SettingsIcon, title: "Audit Trail", desc: "We can provide destruction certificates for compliance audit documentation on request." },
  { icon: TruckIcon, title: "Free Zone Delivery", desc: "Delivery to JAFZA, SAIF Zone, DAFZA, DIFC — free zone compliance included." },
];

const rentVsBuyRows: [string, string, string][] = [
  ["Upfront Cost", "AED 0", "AED 800 – 3,000+"],
  ["Rental Cost", "From AED 150, customised to your term", "Depreciation + maintenance"],
  ["Maintenance", "Included — no extra cost", "Your responsibility"],
  ["Repairs", "Included", "AED 200–800 per repair"],
  ["Flexibility", "Contract length customised to your needs", "Committed purchase"],
  ["Upgrade", "Switch models anytime", "Buy again"],
  ["Delivery & Setup", "Free across UAE", "Self-arrange"],
];

const relatedServices = [
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
  { href: "/services/repair/", label: "Printer Repair Dubai" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/papercut-print-management/", label: "PaperCut Print Management" },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Paper Shredder Rental" },
];

export default function PaperShredderRentalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* FAQPage JSON-LD is emitted by <FaqSection> alongside the accordion it renders,
          so the questions can never drift apart from the schema that declares them. */}
      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Dubai · Sharjah · Abu Dhabi"
          title={
            <>
              Paper Shredder Rental &amp; Sales
              <br />
              <span className="text-primary">Dubai &amp; UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="What is paper shredder rental in the UAE?"
              answer="Paper shredder rental lets UAE offices destroy confidential documents without buying a machine. Sahara supplies Fellowes Powershred DIN P-4 cross-cut shredders from AED 150, with free delivery, on-site setup, and maintenance included across Dubai, Sharjah, and Abu Dhabi. Terms run from a single event to a long-term contract."
              supportingPoints={[
                "Fellowes Powershred LX65: 10 sheets per pass, 22.7L bin — from AED 150",
                "Fellowes Powershred 325Ci: 24 sheets per pass, 83L bin — from AED 400",
                "DIN P-4 cross-cut meets UAE PDPL (Federal Decree-Law No. 45 of 2021) destruction requirements",
                "Free delivery to JAFZA, SAIF Zone, DAFZA and DIFC; outright purchase also available",
              ]}
            />
          }
          badges={["Rent or Buy", "Free Delivery", "Same-Day Available", "Custom Contract Terms", "UAE PDPL Compliant"]}
          primaryCta={{ label: "Get Shredder Quote", href: "/rental-calculator/" }}
          secondaryCta={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush title="Fellowes Shredder Models for Rent or Purchase in UAE" subtitle="DIN P-4 cross-cut Fellowes Powershred shredders, sized for personal, office, and departmental use. Pricing and contract terms are customised to your requirements.">
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl">
            {models.map((m) => (
              <div key={m.name} className="relative rounded-panel border border-white/[0.08] bg-surface-low p-6">
                <span className="absolute top-4 right-4 rounded-pill bg-primary px-2 py-0.5 text-[10px] font-bold text-on-primary">{m.badge}</span>
                <img
                  src={m.image}
                  alt={m.alt}
                  width={280}
                  height={280}
                  loading="lazy"
                  className="mb-4 h-48 w-full rounded-card bg-white/5 object-contain"
                />
                <h3 className="mb-1 text-xl font-bold text-white">{m.name}</h3>
                <p className="mb-3 text-[0.9rem] font-semibold text-primary">{m.price} — custom quote for your requirement</p>
                <ul className="mb-4 space-y-1 text-[0.9rem] text-on-surface-variant">
                  <li>Security Level: <span className="font-medium text-white">{m.level}</span></li>
                  <li>Sheet Capacity: <span className="font-medium text-white">{m.capacity}</span></li>
                  <li>Bin: <span className="font-medium text-white">{m.bin}</span></li>
                  <li>Best For: <span className="font-medium text-white">{m.bestFor}</span></li>
                </ul>
                <a href="/rental-calculator/" className="block rounded-pill border border-primary/30 bg-primary/10 py-2 text-center text-[0.9rem] font-semibold text-primary transition-colors hover:bg-primary/20">
                  Enquire Now
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-caption text-muted">
            Need a higher-security or industrial model? DIN 66399 defines 7 security levels (P-1 to P-7) for paper shredding — for UAE PDPL compliance with personally identifiable information, DIN P-4 or higher is recommended. Ask us about micro-cut and heavy-duty options.
          </p>
        </Section>

        <Section title="UAE Data Protection Compliance — Document Destruction & PDPL" subtitle="The UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021, effective September 2022) requires organisations to securely dispose of personal data in physical form. Failure to comply can result in fines up to AED 5 million. Confidential document destruction via a DIN P-4 cross-cut shredder meets this requirement for most office records." tone="raised">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceFeatures.map((item, i) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title} body={item.desc} delay={(i % 4) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Compare" title="Shredder Rental vs Buying — UAE Cost Comparison" subtitle="For most UAE offices that shred occasionally, rental is significantly cheaper with no maintenance headache." align="center">
          <ComparisonTable columns={["Factor", "Rental (Sahara)", "Buying"]} highlightColumn={1} rows={rentVsBuyRows} />
        </Section>

        <Section title="Prefer to Buy a Paper Shredder in Dubai?" tone="raised">
          <p className="mb-6 max-w-3xl leading-relaxed text-muted">
            Sahara sells Fellowes Powershred paper shredders outright too — not just rental. A good office shredder costs <strong className="text-white">AED 800–3,000+</strong> to buy, versus renting from <strong className="text-white">AED 150</strong> with maintenance included. If you shred daily at high volume, buying can be the cheaper option long-term; if usage is occasional or seasonal, rental usually wins. We&rsquo;ll recommend whichever works out cheaper for your actual usage.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="tel:+971503823969" className="btn-primary">Call for a Rent-vs-Buy Comparison</a>
            <a href="/rental-calculator/" className="btn-secondary">Get a Purchase Quote</a>
          </div>
        </Section>

        <Section title="Paper Shredder Rental & Sales — FAQ" className="max-w-3xl mx-auto">
          <FaqSection
            pageSlug="services/paper-shredder-rental"
            defaultFaqs={SHREDDER_FAQS}
            pageId="https://www.saharaprinter.com/services/paper-shredder-rental/#faq"
          />
        </Section>

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related Services</h2>
          <div className="flex flex-wrap gap-3">
            {relatedServices.map((l) => (
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
