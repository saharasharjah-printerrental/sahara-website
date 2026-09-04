export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import JumpToTop from "@/components/JumpToTop";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import CtaBand from "@/components/ui/CtaBand";
import { LayersIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Printer Brands UAE | Canon, HP, Kyocera, Ricoh, Xerox | Sahara",
  description: "Authorized dealer for all major printer & photocopier brands in UAE: Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Samsung, Lexmark. Sales, rental & AMC. ☎ +971503823969",
  keywords: "printer brands uae, canon printer dealer uae, hp printer uae, kyocera printer uae, ricoh photocopier uae, xerox dealer uae, brother printer uae, konica minolta uae, photocopier brands dubai",
  openGraph: {
    title: "Printer Brands UAE | Authorized Dealer | Sahara Office Equipments",
    description: "Authorized dealer for Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp & more in UAE. Sales, rental, repair & AMC.",
    url: "https://www.saharaprinter.com/brands/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/images/heroPrntr1.webp", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.saharaprinter.com/brands/" },
};

const brands = [
  { slug: "canon", name: "Canon", tagline: "imageRUNNER ADVANCE & imageCLASS", desc: "Authorized Canon dealer in UAE. Reliable A3/A4 MFPs for enterprise offices." },
  { slug: "hp", name: "HP", tagline: "LaserJet Enterprise & PageWide", desc: "HP Service Center in Dubai. LaserJet and PageWide solutions for all business sizes." },
  { slug: "kyocera", name: "Kyocera", tagline: "ECOSYS & TASKalfa", desc: "ECOSYS technology for lowest total cost of ownership in UAE." },
  { slug: "ricoh", name: "Ricoh", tagline: "IM C Series & MP Series", desc: "Authorized Ricoh dealer. Aficio and IM C series color MFPs for UAE businesses." },
  { slug: "xerox", name: "Xerox", tagline: "VersaLink & AltaLink", desc: "Enterprise-grade Xerox MFPs for high-volume printing in Dubai offices." },
  { slug: "brother", name: "Brother", tagline: "MFC & DCP Series", desc: "Wireless, cloud-ready Brother printers for SMEs across UAE." },
  { slug: "sharp", name: "Sharp", tagline: "Sharp MFPs & Display Systems", desc: "Smart Sharp MFPs with OSA integration for connected offices." },
  { slug: "epson", name: "Epson", tagline: "PrecisionCore & Wide-Format", desc: "Epson EcoTank and wide-format solutions for print-intensive environments." },
  { slug: "samsung", name: "Samsung", tagline: "ProXpress & MultiXpress", desc: "Samsung enterprise printers with smart printing apps for UAE businesses." },
  { slug: "lexmark", name: "Lexmark", tagline: "Managed Print Services", desc: "Lexmark enterprise laser solutions and MPS programs for UAE offices." },
  { slug: "konica-minolta", name: "Konica Minolta", tagline: "bizhub A3 & A4 Series", desc: "Authorized Konica Minolta dealer in UAE. bizhub MFPs for high-volume corporate offices." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.saharaprinter.com/products/" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Printer Brands Available at Sahara UAE",
  "description": "Authorized printer and photocopier brands for sales, rental, and AMC in UAE",
  "numberOfItems": brands.length,
  "itemListElement": brands.map((b, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": `${b.name} Printers UAE`,
    "url": `https://www.saharaprinter.com/brands/${b.slug}/`,
    "description": b.desc,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which printer brands does Sahara Office Equipments deal in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sahara is an authorized dealer for Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Samsung, Lexmark, and Konica Minolta in UAE. We provide sales, rental, AMC, and repair services for all these brands across Dubai, Sharjah, Abu Dhabi, and other emirates.",
      },
    },
    {
      "@type": "Question",
      "name": "Does Sahara offer rental for all printer brands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We offer monthly printer rental from AED 250/month for Canon, HP, Kyocera, Ricoh, Xerox, and Brother models. Zero deposit, free toner, and full maintenance included.",
      },
    },
    {
      "@type": "Question",
      "name": "Is Sahara an HP Service Center in Dubai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sahara Office Equipments is an authorized HP service partner in Dubai and UAE, providing warranty repairs, HP toner supplies, and enterprise LaserJet support.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I get AMC for Kyocera and Ricoh printers in UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We provide comprehensive AMC (Annual Maintenance Contract) plans for Kyocera ECOSYS, TASKalfa, Ricoh IM C series, and MP series printers across UAE at competitive rates.",
      },
    },
  ],
};

const trail = [{ label: "Home", href: "/" }, { label: "Printer Brands" }];

export default function BrandsPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <main className="min-h-screen bg-surface">
        <Header />

        <section className="relative overflow-hidden px-6 pb-20 pt-32">
          <div className="pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/[0.06] blur-[160px]" />
          <div className="relative mx-auto max-w-content">
            <Breadcrumbs trail={trail} />

            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-caption font-bold uppercase tracking-[0.2em] text-primary">Authorized Dealer · UAE</p>
              <h1 className="mt-4 font-sora text-display-xl font-extrabold leading-tight text-white">
                Printer Brands<br /><span className="text-primary">We Deal In UAE</span>
              </h1>

              <div className="mb-8 mt-6 rounded-panel border border-primary/20 bg-surface-low p-5 text-left">
                <p className="mb-2 text-caption font-bold uppercase tracking-widest text-primary">Which Printer Brands Are Available in UAE?</p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Sahara Office Equipments is an authorized dealer for 11 major printer and photocopier brands in
                  UAE — Canon, HP, Kyocera, Ricoh, Xerox, Brother, Sharp, Epson, Samsung, Lexmark, and Konica
                  Minolta. We offer sales, rental from AED 250/month, AMC contracts, and on-site repair across
                  Dubai, Sharjah, and Abu Dhabi.
                </p>
              </div>

              <div className="mb-4 flex flex-wrap justify-center gap-3">
                {["11 Brands", "Sales & Rental", "AMC & Repair", "Free Toner", "Since 2012"].map((t) => (
                  <span key={t} className="rounded-pill border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-bold text-white">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Section title="All Printer Brands — UAE Authorized Dealer" align="center" tone="ink" flush>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {brands.map((brand) => (
              <FeatureCard
                key={brand.slug}
                icon={LayersIcon}
                title={brand.name}
                href={`/brands/${brand.slug}`}
                body={
                  <>
                    <p className="mb-2 text-xs font-semibold text-primary">{brand.tagline}</p>
                    <p>{brand.desc}</p>
                  </>
                }
              />
            ))}
          </div>
        </Section>

        <Section title="Frequently Asked Questions" align="center" className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq) => (
              <Reveal key={faq.name}>
                <div className="glass-card rounded-card p-6">
                  <h3 className="mb-2 font-semibold text-white">{faq.name}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{faq.acceptedAnswer.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <CtaBand
          title="Need Help Choosing a Printer Brand?"
          body="Our experts will recommend the right brand and model for your office volume, budget, and workflow."
          primary={{ label: "Get a Free Quote", href: "/rental-calculator/" }}
          secondary={{ label: "Talk to an Expert", href: "/contact/" }}
        />

        <Footer />
        <WhatsAppCTA />
        <JumpToTop />
      </main>
    </>
  );
}
