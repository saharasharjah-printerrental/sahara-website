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
import {
  IdCardIcon,
  ShieldCheckIcon,
  LayersIcon,
  LayerStackIcon,
  LeafIcon,
  SettingsIcon,
  ClockIcon,
  AwardIcon,
} from "@/components/icons";
import type { FaqItem } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "PVC Card Printing Services UAE | ID, Security & Custom Cards | Sahara",
  description: "PVC card printing services in UAE — employee ID, student ID, security cards, custom hologram cards, wooden & transparent cards, printed and delivered by Sahara Office Equipments. Dubai, Sharjah & Abu Dhabi. ☎ +971503823969",
  keywords: "pvc card printing services uae, id card printing dubai, security card printing uae, hologram card printing dubai, custom id card printing uae, wooden card printing dubai, transparent card printing uae, employee id card printing service",
  openGraph: {
    title: "PVC Card Printing Services UAE | Sahara Office Equipments",
    description: "Employee ID, security, custom hologram, wooden and transparent card printing services in UAE — printed and delivered, no printer purchase needed.",
    url: "https://www.saharaprinter.com/services/pvc-card-printing-services/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/brands/bravo/rtai-official.webp", width: 610, height: 610 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PVC Card Printing Services UAE | Sahara Office Equipments",
    description: "Employee ID, security, custom hologram, wooden and transparent card printing services in UAE — printed and delivered, no printer purchase needed.",
    images: ["https://www.saharaprinter.com/brands/bravo/rtai-official.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/pvc-card-printing-services/" },
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Can Sahara print my PVC cards without me buying a printer?",
    a: "Yes. Our PVC card printing service handles the full job — artwork, printing, encoding, and lamination — on our own Bravo RTAI and DC 3300 printers, so you receive finished cards without buying or maintaining hardware.",
  },
  {
    q: "What card types can you print — beyond standard ID cards?",
    a: "We print employee and student ID, visitor and contractor badges, access-control and RFID cards, membership and loyalty cards, gift cards, custom hologram cards, security cards (UV, microtext, tamper-evident), wooden cards, transparent/frosted cards, and rewritable cards.",
  },
  {
    q: "Can you print a custom hologram on our cards?",
    a: "Yes — the Bravo RTAI applies both standard and fully custom holograms in-printer via retransfer film, without a separate laminator. Send your logo or security design and we'll produce a proof before the full run.",
  },
  {
    q: "Do you print wooden or transparent PVC cards?",
    a: "Yes. Specially treated wooden cards and transparent/frosted cards are supported on the Bravo RTAI — a distinctive option for premium membership cards, eco-conscious brands, or hospitality use.",
  },
  {
    q: "What is the minimum order quantity and turnaround time?",
    a: "There is no strict minimum for standard ID cards; custom hologram and specialty-media orders (wooden, transparent) typically require a small minimum run. Standard turnaround is 2-3 business days after artwork approval; rush service is available.",
  },
  {
    q: "Can you encode access-control or RFID data during printing?",
    a: "Yes — magnetic stripe (ISO 7811), contact smartcard, and contactless/RFID encoding are all available as part of the printing service, so your cards arrive ready to activate in your access-control system.",
  },
];

const cardCatalogue = [
  { icon: IdCardIcon, title: "Employee & Visitor ID", body: "Photo ID for staff, contractors, and visitors — with barcode or QR for access control." },
  { icon: IdCardIcon, title: "Student ID Cards", body: "Batch-printed student and staff cards for schools, universities, and training institutes." },
  { icon: SettingsIcon, title: "Access-Control & RFID", body: "Magnetic stripe, contact smartcard, or RFID-encoded cards for door and system access." },
  { icon: AwardIcon, title: "Membership & Loyalty Cards", body: "Branded membership, loyalty, and gift cards for retail, gyms, and hospitality." },
  { icon: LayerStackIcon, title: "Custom Hologram Cards", body: "Standard or fully custom holograms applied in-printer for overt visual security." },
  { icon: ShieldCheckIcon, title: "Security Cards", body: "UV features, microtext, guilloche patterns, and tamper-evident overlaminate for high-security IDs." },
  { icon: LeafIcon, title: "Wooden Cards", body: "Specially treated wooden card stock — sustainable and distinctive for premium or eco-conscious brands." },
  { icon: LayersIcon, title: "Transparent & Frosted Cards", body: "Translucent PVC for a premium, modern card finish." },
  { icon: IdCardIcon, title: "Metallic & Matte Finishes", body: "HOLO-MET™ metallic gold/silver effects or matte overlaminate finishes." },
  { icon: SettingsIcon, title: "Smart & Contact Chip Cards", body: "Contact smartcard encoding for secure identity and payment-adjacent applications." },
  { icon: IdCardIcon, title: "Magnetic Stripe Cards", body: "ISO 7811 magnetic stripe encoding for legacy access and membership systems." },
  { icon: ClockIcon, title: "Rewritable Cards", body: "Reprintable card stock for temporary badges — visitor passes, day tickets, loaner IDs." },
];

const orderingSteps = [
  { step: "1. Artwork", body: "Send your design, logo and cardholder data — or we design the layout for you." },
  { step: "2. Proof", body: "We produce a digital or printed proof for approval before the full run." },
  { step: "3. Encode", body: "Magnetic stripe, smartcard, or RFID data encoded per card if required." },
  { step: "4. Print", body: "Cards printed on the Bravo RTAI or DC 3300 to your specified finish." },
  { step: "5. Laminate", body: "Varnish, patch, or holographic overlaminate applied where extra durability or security is needed." },
  { step: "6. Deliver", body: "Quality-checked and delivered across Dubai, Sharjah, Abu Dhabi, and all UAE emirates." },
];

const moqTable = [
  ["Standard ID / employee cards", "No strict minimum", "2–3 business days"],
  ["Access-control / RFID encoded", "10 cards", "2–3 business days"],
  ["Custom hologram cards", "50 cards", "5–7 business days"],
  ["Wooden / transparent cards", "25 cards", "5–7 business days"],
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "PVC Card Printing Services" },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "PVC / ID Card Printing Bureau Service",
  "name": "PVC Card Printing Services UAE",
  "description": "Bureau card printing service in the UAE — employee ID, security cards, custom hologram cards, wooden and transparent cards, printed and delivered by Sahara Office Equipments.",
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
  "url": "https://www.saharaprinter.com/services/pvc-card-printing-services/",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "PVC Card Types",
    "itemListElement": cardCatalogue.map((c, i) => ({
      "@type": "Offer",
      "position": i + 1,
      "itemOffered": { "@type": "Service", "name": c.title, "description": c.body },
    })),
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to order printed PVC cards from Sahara Office Equipments",
  "description": "The ordering workflow for the PVC card printing service, from artwork to delivery.",
  "totalTime": "P5D",
  "step": orderingSteps.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.step,
    "text": s.body,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.saharaprinter.com/services/" },
    { "@type": "ListItem", "position": 3, "name": "PVC Card Printing Services", "item": "https://www.saharaprinter.com/services/pvc-card-printing-services/" },
  ],
};

export default function PvcCardPrintingServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Bureau Printing Service"
          title="PVC Card Printing Services — UAE"
          answer={
            <AnswerBlock
              id="pvc-card-printing-services-uae"
              question="Can I get PVC cards printed in UAE without buying a printer?"
              answer="Yes — Sahara Office Equipments prints and delivers finished PVC cards as a bureau service: employee ID, security cards, custom hologram cards, wooden and transparent cards, and more, on our own Bravo RTAI and DC 3300 printers, with no hardware purchase required."
              supportingPoints={[
                "Full card catalogue: ID, access-control/RFID, membership, custom hologram, security, wooden, and transparent cards.",
                "Encoding included where needed — magnetic stripe, contact smartcard, and RFID.",
                "Standard turnaround 2–3 business days after artwork approval; rush service available.",
                "Delivered across Dubai, Sharjah, Abu Dhabi, and all UAE emirates.",
              ]}
            />
          }
          image={{ src: "/brands/bravo/rtai-official.webp", alt: "PVC cards printed by Sahara Office Equipments in UAE", width: 610, height: 610 }}
          primaryCta={{ label: "Request a Printing Quote", href: "/pvc-card-printer-quote/" }}
          secondaryCta={{ label: "Call: +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section eyebrow="Card Catalogue" title="Every card type, printed to order" subtitle="Standard IDs through to specialty security and eco-friendly media." flush>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cardCatalogue.map((c, i) => (
              <FeatureCard key={c.title} icon={c.icon} title={c.title} body={c.body} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="How It Works" title="From artwork to delivery" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orderingSteps.map((s) => (
              <div key={s.step} className="rounded-card border border-white/[0.08] bg-surface-mid p-6">
                <p className="font-sora text-headline font-bold text-primary mb-2">{s.step}</p>
                <p className="text-[0.9rem] text-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="Order Details" title="Minimum order & turnaround">
          <ComparisonTable columns={["Card Type", "Minimum Order", "Standard Turnaround"]} rows={moqTable} />
        </Section>

        <CtaBand
          title="Get Your PVC Cards Printed"
          body="Send your artwork and card requirements — we'll quote turnaround and pricing for your exact order."
          primary={{ label: "Request a Printing Quote", href: "/pvc-card-printer-quote/" }}
          secondary={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about PVC card printing services in the UAE.</p>
          </div>
          <FaqSection
            pageSlug="services/pvc-card-printing-services"
            defaultFaqs={DEFAULT_FAQS}
            pageId="https://www.saharaprinter.com/services/pvc-card-printing-services/#faq"
          />
        </Section>

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/bravo-card-printers-uae/", label: "PVC Card Printers — Model Guide" },
              { href: "/services/pvc-card-printer-rental/", label: "PVC Card Printer Rental" },
              { href: "/services/pvc-card-printer-sales/", label: "PVC Card Printer Sales" },
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
