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

// Sep 2026: new page. GSC showed real buy-intent volume with no destination
// — "paper shredder" 154 impressions @ pos 21, "paper shredder machine
// dubai" 104 @ 15.2, "buy paper shredder" 71 @ 9.4, "paper shredders" 71 @
// 23.1, "paper shredder dubai" 69 @ 22.7, "fellowes shredders dubai" 27 @
// 19.4, "paper shredder price in uae" 14 @ 6.8 — all zero clicks, and
// /services/paper-shredder-sales/ previously 404'd. The rental page
// (/services/paper-shredder-rental/) already had a "Prefer to Buy?" section
// bolted on with no Product schema and no dedicated URL — this page gives
// that intent its own destination and real Product/AggregateOffer markup.
//
// Quote-led per the business decision recorded in the plan (sell, but
// quote-only — no fixed public prices). Price bands below are the same
// numbers already vetted and published in
// docs/seo/blog-drafts/buying-a-paper-shredder-in-dubai-sizing-and-cost-guide.md
// ("Dubai Pricing Snapshot 2026" table), not invented for this page.
export const metadata: Metadata = {
  title: "Buy Paper Shredders Dubai & UAE | Fellowes Cross-Cut | Sahara",
  description: "Buy a paper shredder in Dubai, Sharjah & Abu Dhabi — Fellowes Powershred DIN P-4 cross-cut models from AED 800. Free delivery, setup & PDPL-compliant destruction. Request a quote. ☎ +971503823969",
  keywords: "buy paper shredder dubai, paper shredder machine dubai, paper shredder price in uae, paper shredders, paper shredder dubai, fellowes shredders dubai, office paper shredder uae, paper shredder machine, document shredder uae, industrial paper shredder dubai",
  openGraph: {
    title: "Buy Paper Shredders Dubai & UAE | Sahara Office Equipments",
    description: "Fellowes Powershred cross-cut paper shredders for sale in Dubai, Sharjah & Abu Dhabi. DIN P-4, PDPL compliant, free delivery & setup.",
    url: "https://www.saharaprinter.com/services/paper-shredder-sales/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp", width: 1200, height: 630, alt: "Fellowes Powershred paper shredders for sale in Dubai UAE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Paper Shredders Dubai & UAE | Sahara Office Equipments",
    description: "Fellowes Powershred cross-cut paper shredders for sale in Dubai, Sharjah & Abu Dhabi. DIN P-4, PDPL compliant, free delivery & setup.",
    images: ["https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/paper-shredder-sales/" },
};

const priceBands: [string, string, string][] = [
  ["Personal / light office", "AED 800 – 1,500", "8–12 sheets/pass"],
  ["Mid-range office", "AED 1,500 – 2,200", "12–20 sheets/pass"],
  ["Departmental / commercial", "AED 2,200 – 3,500+", "20+ sheets/pass"],
];

const models = [
  {
    name: "Fellowes Powershred LX65",
    image: "/images/shredder-fellowes-lx65.webp",
    alt: "Fellowes Powershred LX65 cross-cut paper shredder for sale in Dubai and UAE",
    level: "DIN P-4 Cross-Cut",
    capacity: "10 sheets/pass",
    bin: "22.7L bin (300+ sheets)",
    bestFor: "Personal & light office use, general documents, credit cards",
    priceLow: 800,
    priceHigh: 1500,
    priceLabel: "AED 800 – 1,500",
    badge: "Most Popular",
  },
  {
    name: "Fellowes Powershred 325Ci",
    image: "/images/shredder-fellowes-325ci.webp",
    alt: "Fellowes Powershred 325Ci commercial cross-cut paper shredder for sale in Dubai and UAE",
    level: "DIN P-4 Cross-Cut",
    capacity: "24 sheets/pass",
    bin: "83L bin, 100% Jam Proof",
    bestFor: "Departmental & commercial use, multi-user offices, high-volume clear-outs",
    priceLow: 2200,
    priceHigh: 3500,
    priceLabel: "AED 2,200 – 3,500+",
    badge: "High Volume",
  },
];

const complianceFeatures = [
  { icon: ShieldCheckIcon, title: "PDPL Compliant", desc: "DIN P-4 cross-cut meets UAE PDPL (Federal Decree-Law No. 45 of 2021) requirements for secure physical data destruction." },
  { icon: AwardIcon, title: "Free Delivery & Setup", desc: "Delivered and set up across Dubai, Sharjah and Abu Dhabi at no extra cost, including free zones." },
  { icon: SettingsIcon, title: "Manufacturer Warranty", desc: "Genuine Fellowes units with full manufacturer warranty — ask about extended cover and an AMC for high-volume machines." },
  { icon: TruckIcon, title: "Free Zone Delivery", desc: "Delivery to JAFZA, SAIF Zone, DAFZA, DIFC — free zone documentation support included." },
];

const rentVsBuyRows: [string, string, string][] = [
  ["Best for", "Occasional or seasonal shredding", "Daily, high-volume shredding"],
  ["Upfront cost", "AED 0", "AED 800 – 3,500+"],
  ["Ongoing cost", "Monthly rental fee", "None after purchase"],
  ["Maintenance", "Included in rental", "Own responsibility (or add an AMC)"],
  ["Ownership", "Never own the machine", "Own it outright"],
];

const DEFAULT_FAQS: FaqItem[] = [
  { q: "How much does a paper shredder cost in Dubai?", a: "A personal or light-office cross-cut shredder in Dubai typically costs AED 800–1,500. A mid-range office model runs AED 1,500–2,200, and a departmental machine handling 20+ sheets per pass costs AED 2,200–3,500 or more. Prices vary by brand, capacity, and current promotions — request a quote for exact current pricing on your preferred model." },
  { q: "What paper shredder brand does Sahara sell in the UAE?", a: "Sahara sells Fellowes Powershred cross-cut shredders — the Powershred LX65 for personal and light-office use, and the Powershred 325Ci for departmental and commercial use. Both are DIN P-4 rated, the level recommended for UAE PDPL compliance." },
  { q: "What DIN security level should I buy for UAE compliance?", a: "DIN P-4 cross-cut is the accepted minimum for UAE Personal Data Protection Law (PDPL) compliance for most office documents. Legal, HR, and financial records handling especially sensitive data should step up to micro-cut, DIN P-5 or higher — see our DIN P-4 vs P-5 vs P-6 guide for the full comparison." },
  { q: "Do you deliver and set up the shredder after purchase?", a: "Yes — free delivery and on-site setup is included across Dubai, Sharjah, Abu Dhabi, and UAE free zones including JAFZA, SAIF Zone, DAFZA, and DIFC." },
  { q: "Is it cheaper to buy or rent a paper shredder in the UAE?", a: "For occasional or seasonal use, renting from AED 150/month is usually cheaper than buying outright. For daily, high-volume shredding, buying is typically the better long-term option since there's no ongoing rental fee. See our Paper Shredder Rental page for rental pricing, or ask us for a side-by-side comparison based on your actual usage." },
  { q: "Do you also repair paper shredders in the UAE?", a: "Yes — Sahara services and repairs paper shredders across Dubai, Sharjah, and Abu Dhabi, regardless of where the machine was purchased. Call us for a diagnosis and repair quote." },
  { q: "Can I get a warranty or maintenance contract on a purchased shredder?", a: "Yes. Purchased shredders carry the manufacturer's standard warranty, and we offer an optional Annual Maintenance Contract (AMC) for departmental and high-volume machines to cover servicing and blade wear." },
];

const relatedServices = [
  { href: "/services/paper-shredder-rental/", label: "Paper Shredder Rental" },
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/blogs/din-p4-vs-p5-vs-p6-shredder-security-levels-uae/", label: "DIN Security Levels Explained" },
  { href: "/blogs/uae-pdpl-document-destruction-compliance-guide/", label: "UAE PDPL Compliance Guide" },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Buy a Paper Shredder" },
];

function productSchemaFor(m: typeof models[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": m.name,
    "brand": { "@type": "Brand", "name": "Fellowes" },
    "category": "Paper Shredder",
    "description": `${m.name} — ${m.level}, ${m.capacity}, ${m.bin}. Best for ${m.bestFor.toLowerCase()}.`,
    "image": `https://www.saharaprinter.com${m.image}`,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "AED",
      "lowPrice": m.priceLow,
      "highPrice": m.priceHigh,
      // Single seller, one listing spanning this price range (config/
      // promotion-dependent, per the business's quote-only pricing decision)
      // — not multiple named sub-configs, so offerCount is honestly 1.
      "offerCount": 1,
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://www.saharaprinter.com" },
    },
  };
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Paper Shredder Sales",
  "name": "Paper Shredder Sales UAE",
  "description": "Sale of Fellowes Powershred cross-cut paper shredders in Dubai, Sharjah, and Abu Dhabi. DIN P-4 compliant, free delivery and setup.",
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
  },
  "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  "url": "https://www.saharaprinter.com/services/paper-shredder-sales/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "Buy a Paper Shredder", "item": "https://www.saharaprinter.com/services/paper-shredder-sales/" },
  ],
};

export default function PaperShredderSalesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {models.map((m) => (
        <script key={m.name} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemaFor(m)) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* FAQPage JSON-LD is emitted by <FaqSection> alongside the accordion it renders. */}
      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Dubai · Sharjah · Abu Dhabi"
          title={
            <>
              {"Buy a Paper Shredder "}
              <br />
              <span className="text-primary">Dubai &amp; UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="How much does a paper shredder cost in Dubai?"
              answer="A personal or light-office cross-cut shredder in Dubai typically costs AED 800–1,500, a mid-range office model runs AED 1,500–2,200, and a departmental machine handling 20+ sheets per pass costs AED 2,200–3,500 or more. Sahara sells Fellowes Powershred DIN P-4 cross-cut shredders across Dubai, Sharjah, and Abu Dhabi with free delivery and setup — request a quote for exact current pricing."
              supportingPoints={[
                "Fellowes Powershred LX65: 10 sheets per pass, personal/light-office — AED 800–1,500",
                "Fellowes Powershred 325Ci: 24 sheets per pass, departmental/commercial — AED 2,200–3,500+",
                "DIN P-4 cross-cut meets UAE PDPL (Federal Decree-Law No. 45 of 2021) destruction requirements",
                "Free delivery and setup across Dubai, Sharjah, Abu Dhabi and free zones; rental also available",
              ]}
            />
          }
          badges={["Buy Outright", "Free Delivery", "PDPL Compliant", "Manufacturer Warranty", "Rental Also Available"]}
          primaryCta={{ label: "Request a Quote", href: "/rental-calculator/" }}
          secondaryCta={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section title="Dubai Paper Shredder Pricing by Category" subtitle="Indicative pricing for the UAE market. Final price depends on brand, capacity, and current promotions — request a quote for your exact configuration." align="center">
          <ComparisonTable columns={["Category", "Price Range", "Sheet Capacity"]} rows={priceBands} />
        </Section>

        <Section flush title="Fellowes Shredders Available to Buy" subtitle="DIN P-4 cross-cut Fellowes Powershred shredders, sized for personal, office, and departmental use.">
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
                <p className="mb-3 text-[0.9rem] font-semibold text-primary">{m.priceLabel} — request exact quote</p>
                <ul className="mb-4 space-y-1 text-[0.9rem] text-on-surface-variant">
                  <li>Security Level: <span className="font-medium text-white">{m.level}</span></li>
                  <li>Sheet Capacity: <span className="font-medium text-white">{m.capacity}</span></li>
                  <li>Bin: <span className="font-medium text-white">{m.bin}</span></li>
                  <li>Best For: <span className="font-medium text-white">{m.bestFor}</span></li>
                </ul>
                <a href="/rental-calculator/" className="block rounded-pill border border-primary/30 bg-primary/10 py-2 text-center text-[0.9rem] font-semibold text-primary transition-colors hover:bg-primary/20">
                  Request a Quote
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-caption text-muted">
            Need higher security or an industrial model? DIN 66399 defines 7 security levels (P-1 to P-7) — for PDPL compliance with personally identifiable information, DIN P-4 or higher is recommended. Ask us about micro-cut and heavy-duty industrial options.
          </p>
        </Section>

        <Section title="UAE Data Protection Compliance" subtitle="The UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) requires organisations to securely dispose of personal data in physical form. A DIN P-4 cross-cut shredder meets this requirement for most office records." tone="raised">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceFeatures.map((item, i) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title} body={item.desc} delay={(i % 4) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Compare" title="Buying vs Renting — Which Is Cheaper?" subtitle="Buying wins for daily, high-volume shredding. Renting wins for occasional or seasonal use." align="center">
          <ComparisonTable columns={["Factor", "Buying", "Renting"]} rows={rentVsBuyRows} />
          <p className="mt-6 text-center">
            <a href="/services/paper-shredder-rental/" className="font-semibold text-primary hover:underline">See paper shredder rental pricing →</a>
          </p>
        </Section>

        <Section title="Buy a Paper Shredder — FAQ" className="max-w-3xl mx-auto">
          <FaqSection
            pageSlug="services/paper-shredder-sales"
            defaultFaqs={DEFAULT_FAQS}
            pageId="https://www.saharaprinter.com/services/paper-shredder-sales/#faq"
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
