export const runtime = 'edge';
import type { Metadata } from "next";
import { orgRef } from "@/lib/brand";
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

// Sep 2026: re-scoped to RENTAL only. This page previously carried both
// rental and sale intent ("Rental & Sales" title, a bolted-on "Prefer to
// Buy?" section, no Product schema) while /services/paper-shredder-sales/
// 404'd. Buy-intent volume is real and large ("paper shredder" 154
// impressions @ pos 21, "buy paper shredder" 71 @ 9.4) and now has its own
// page with proper Product/AggregateOffer schema — see that file. This page
// keeps the rental terms (already ranking 1-4 on "shredder rental",
// "paper shredder for rent near me" etc.) and stops splitting that intent.
export const metadata: Metadata = {
  title: "Paper Shredder Rental Dubai & UAE | From AED 450/mo | Sahara",
  description: "Paper shredder rental Dubai & UAE: LX65 AED 450/month, 325Ci AED 900/month. Free delivery, installation, transport & maintenance. Get your rental quote.",
  keywords: "paper shredder rental dubai, shredder rental uae, shredder for rent dubai, paper shredder for rent near me, paper shredder machine rental near me, hire paper shredder near me, document shredding services uae, confidential document destruction dubai, din p-4 shredder uae",
  openGraph: {
    title: "Paper Shredder Rental Dubai & UAE | From AED 450/mo | Sahara",
    description: "LX65 AED 450/month or 325Ci AED 900/month. Paper shredder rental with free delivery, installation, transport and maintenance in Dubai & UAE.",
    url: "https://www.saharaprinter.com/services/paper-shredder-rental/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp", width: 1200, height: 630, alt: "Fellowes Powershred 325Ci commercial paper shredder available for rent in Dubai and UAE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Shredder Rental Dubai & UAE | From AED 450/mo | Sahara",
    description: "LX65 AED 450/month or 325Ci AED 900/month. Free delivery, installation, transport and maintenance in Dubai & UAE.",
    images: ["https://www.saharaprinter.com/images/shredder-fellowes-325ci.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/paper-shredder-rental/" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Paper Shredder Rental UAE",
  "description": "DIN P-4 cross-cut paper shredder rental in Dubai, Sharjah and Abu Dhabi. LX65 AED 450/month; 325Ci AED 900/month. Delivery, installation, transport and maintenance included.",
  "provider": orgRef(),
  "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  "offers": [
    { "@type": "Offer", "name": "Fellowes Powershred 325Ci monthly rental", "priceCurrency": "AED", "price": "900", "description": "Delivery, installation, transport and maintenance included.", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "900", "priceCurrency": "AED", "unitCode": "MON", "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" } } },
    {
    "@type": "Offer",
    "name": "Fellowes Powershred LX65 monthly rental",
    "description": "Delivery, installation, transport and maintenance included.",
    "priceCurrency": "AED",
    "price": "450",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "price": "450",
      "priceCurrency": "AED",
      "unitCode": "MON",
      "referenceQuantity": { "@type": "QuantitativeValue", "value": 1, "unitCode": "MON" },
    },
  }],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "Paper Shredder Rental", "item": "https://www.saharaprinter.com/services/paper-shredder-rental/" },
  ],
};

// Keep published rental terms and FAQ schema in sync with this page's offers.
const SHREDDER_FAQS: FaqItem[] = [
  { q: "How much does paper shredder rental cost in Dubai?", a: "The smaller Fellowes Powershred LX65 costs AED 450 per month and the larger Fellowes Powershred 325Ci costs AED 900 per month. Both monthly rentals include delivery, installation, transport and maintenance at no extra charge. Contact Sahara to confirm availability and rental dates." },
  { q: "Can I rent a paper shredder for a single day or event in UAE?", a: "Yes. Sahara Office Equipments offers short-term paper shredder rental in Dubai, Sharjah, and Abu Dhabi with flexible, customised contract lengths — ideal for office clear-outs, events, and compliance audits. Tell us your dates and we'll confirm availability." },
  { q: "What types of shredders are available for rent in UAE?", a: "We supply the Fellowes Powershred LX65 for light-office use and the larger 325Ci for departmental use. Both are DIN P-4 cross-cut models. Contact us about availability of higher-security or heavy-duty options." },
  { q: "Is paper shredder rental better than buying in UAE?", a: "Rental avoids the upfront purchase and includes maintenance, delivery, installation and transport. The LX65 costs AED 450/month and the 325Ci AED 900/month. Compare the total rental cost over your intended duration with the purchase price and servicing costs; buying may suit long-term daily use." },
  { q: "Do you deliver paper shredders to JAFZA, SAIF Zone, and free zones?", a: "Yes. We deliver paper shredders to all UAE free zones including JAFZA (Dubai), SAIF Zone (Sharjah), DAFZA, DIFC, and Abu Dhabi free zones. Same-day delivery available for Dubai and Sharjah." },
  { q: "What security level do the rental shredders offer?", a: "Both the LX65 and 325Ci are DIN P-4 cross-cut shredders. Confirm the security level your organisation requires before selecting a machine. A shredder's DIN rating alone is not a certification of your organisation's data-protection compliance." },
  { q: "What's the difference between the paper shredders Sahara offers for rent in the UAE?", a: "Sahara's rental range covers the Fellowes Powershred LX65 (10 sheets/pass, personal or light-office use, from AED 450/month) and the Fellowes Powershred 325Ci (24 sheets/pass, departmental/commercial use, from AED 900/month), both DIN P-4 cross-cut, plus heavy-duty models for high-volume clear-outs on request. Free delivery across Dubai, Sharjah, and Abu Dhabi." },
  { q: "Does Sahara supply paper shredders across Dubai and the wider UAE?", a: "Yes. Sahara delivers and services paper shredders across Dubai, Sharjah, Abu Dhabi, Ajman, and Ras Al Khaimah, including free zones like JAFZA, SAIF Zone, and DIFC. Rental plans start from AED 450/month." },
  { q: "Can I rent an industrial paper shredder machine in Dubai?", a: "Sahara's rental range is the Fellowes Powershred LX65 (AED 450/month) and the larger 325Ci (AED 900/month), both DIN P-4 cross-cut machines that cover light-office to heavy departmental shredding. If you need an industrial paper shredder machine or a higher DIN security level, tell us your document volume and security requirement and we will check suitable options for your office in Dubai or elsewhere in the UAE." },
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
    price: "AED 450/month",
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
    price: "AED 900/month",
    badge: "High Volume",
  },
];

const complianceFeatures = [
  { icon: ShieldCheckIcon, title: "DIN P-4 Cross-Cut", desc: "Both rental models use cross-cut shredding for confidential office documents." },
  { icon: AwardIcon, title: "Model Selection", desc: "Choose light-office or departmental capacity to match your document volume." },
  { icon: SettingsIcon, title: "Maintenance Included", desc: "Servicing and repairs are covered during your rental." },
  { icon: TruckIcon, title: "Free Zone Delivery", desc: "Delivery, installation and transport included, with access arrangements confirmed before arrival." },
];

const rentVsBuyRows: [string, string, string][] = [
  ["Upfront Cost", "AED 0", "AED 800 – 3,500+"],
  ["Rental Cost", "From AED 450/month, customised to your term", "Depreciation + maintenance"],
  ["Maintenance", "Included — no extra cost", "Your responsibility"],
  ["Repairs", "Included", "AED 200–800 per repair"],
  ["Flexibility", "Contract length customised to your needs", "Committed purchase"],
  ["Upgrade", "Switch models anytime", "Buy again"],
  ["Delivery & Setup", "Free across UAE", "Self-arrange"],
];

const relatedServices = [
  { href: "/services/paper-shredder-sales/", label: "Buy a Paper Shredder" },
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/printer-rental-dubai/", label: "Printer Rental Dubai" },
  { href: "/services/repair/", label: "Printer Repair Dubai" },
  { href: "/services/amc/", label: "Annual Maintenance (AMC)" },
  { href: "/services/papercut-print-management/", label: "PaperCut Print Management" },
  // Sep 2026: the two links this replaced (best-office-paper-shredders-uae-fellowes-compared,
  // paper-shredder-repair-or-replace-uae-guide) pointed at blog slugs that don't exist in
  // content/blogs/ — dead internal links. Swapped for the four shredder posts that are live.
  { href: "/blogs/paper-shredder-rental-uae-when-it-beats-buying/", label: "Rent vs Buy: When Rental Wins" },
  { href: "/blogs/buying-a-paper-shredder-in-dubai-sizing-and-cost-guide/", label: "Shredder Sizing & Cost Guide" },
  { href: "/blogs/din-p4-vs-p5-vs-p6-shredder-security-levels-uae/", label: "DIN P4 vs P5 vs P6 Security Levels" },
  { href: "/blogs/shredder-delivery-jafza-saif-zone-difc-uae-free-zones/", label: "Free Zone Delivery (JAFZA, SAIF, DIFC)" },
  { href: "/brands/fellowes/", label: "Fellowes Shredders UAE" },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Paper Shredder Rental" },
];

export default function PaperShredderRentalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
      {/* FAQPage JSON-LD is emitted by <FaqSection> alongside the accordion it renders,
          so the questions can never drift apart from the schema that declares them. */}
      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Dubai · Sharjah · Abu Dhabi"
          title={
            <>
              {"Paper Shredder Rental "}
              <br />
              <span className="text-primary">Dubai &amp; UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              question="What is paper shredder rental in the UAE?"
              answer="Sahara rents the smaller Fellowes Powershred LX65 for AED 450/month and the larger Fellowes Powershred 325Ci for AED 900/month. Both are DIN P-4 cross-cut paper shredders. Delivery, installation, transport and maintenance are included at no extra charge across Dubai, Sharjah and Abu Dhabi. Contact us to confirm your rental dates and availability."
              supportingPoints={[
                "Fellowes Powershred LX65: 10 sheets per pass, 22.7L bin — from AED 450/month",
                "Fellowes Powershred 325Ci: 24 sheets per pass, 83L bin — from AED 900/month",
                "Both models offer DIN P-4 cross-cut shredding for confidential office documents",
                "Free delivery to JAFZA, SAIF Zone, DAFZA and DIFC; repairs and maintenance included",
              ]}
            />
          }
          badges={["From AED 450/month", "Free Delivery & Transport", "Free Installation", "Maintenance Included"]}
          primaryCta={{ label: "Get Shredder Quote", href: "/quote/paper-shredder-rental/" }}
          secondaryCta={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        {/* Sep 2026: visible buy-intent CTA right under the hero, not buried
            in body text further down the page. Most "paper shredder" /
            "paper shredder machine dubai" impressions land here (this page
            outranks the sales page for now) — this is the highest-visibility
            hand-off point to /services/paper-shredder-sales/ until that page
            is indexed on its own buy-intent queries. */}
        <div className="border-y border-white/[0.08] bg-surface-low">
          <div className="mx-auto max-w-4xl px-4 py-4 text-center text-sm text-white/80">
            Prefer to buy? Paper shredder machines from AED 800 —{" "}
            <a href="/services/paper-shredder-sales/" className="font-semibold text-primary underline">
              see pricing &amp; specs →
            </a>
          </div>
        </div>

        <Section flush title="Fellowes Shredder Models for Rent in UAE" subtitle="Two monthly plans. Delivery, installation, transport and maintenance are free with either model.">
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
                <p className="mb-3 text-[0.9rem] font-semibold text-primary">{m.price}</p>
                <p className="mb-3 text-sm text-muted">Free delivery, installation, transport and maintenance.</p>
                <ul className="mb-4 space-y-1 text-[0.9rem] text-on-surface-variant">
                  <li>Security Level: <span className="font-medium text-white">{m.level}</span></li>
                  <li>Sheet Capacity: <span className="font-medium text-white">{m.capacity}</span></li>
                  <li>Bin: <span className="font-medium text-white">{m.bin}</span></li>
                  <li>Best For: <span className="font-medium text-white">{m.bestFor}</span></li>
                </ul>
                <a href="/quote/paper-shredder-rental/" className="block rounded-pill border border-primary/30 bg-primary/10 py-2 text-center text-[0.9rem] font-semibold text-primary transition-colors hover:bg-primary/20">
                  Enquire Now
                </a>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-caption text-muted">
            Looking for an industrial paper shredder machine or a higher-security model? Tell us your required security level and document volume so we can check suitable options.
          </p>
        </Section>

        <Section title="Confidential Document Shredding for UAE Offices" subtitle="Keep shredding in your own office with a machine matched to your volume and security requirements. Sahara supplies and maintains the rental equipment; your team controls document handling and disposal." tone="raised">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceFeatures.map((item, i) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title} body={item.desc} delay={(i % 4) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Compare" title="Shredder Rental vs Buying — UAE Cost Comparison" subtitle="Compare the monthly rental cost over your intended duration with buying and maintaining your own machine." align="center">
          <ComparisonTable columns={["Factor", "Rental (Sahara)", "Buying"]} highlightColumn={1} rows={rentVsBuyRows} />
        </Section>

        <Section title="Looking to Buy Instead?" tone="raised">
          <p className="mb-4 max-w-3xl leading-relaxed text-muted">
            Prefer to own your shredder outright? See real Fellowes Powershred pricing, specs, and a rent-vs-buy comparison on our <a href="/services/paper-shredder-sales/" className="text-primary underline">paper shredder sales page</a>.
          </p>
        </Section>

        <Section title="Paper Shredder Rental — FAQ" className="max-w-3xl mx-auto">
          <FaqSection
            pageSlug="services/paper-shredder-rental"
            defaultFaqs={SHREDDER_FAQS}
            useDefaultFaqs
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
