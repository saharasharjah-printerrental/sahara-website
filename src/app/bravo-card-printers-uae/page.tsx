export const runtime = 'edge';
import type { Metadata } from "next";
import Image from "next/image";
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
import {
  AwardIcon,
  ShieldCheckIcon,
  LayersIcon,
  LayerStackIcon,
  LeafIcon,
  IdCardIcon,
  ClockIcon,
  SettingsIcon,
  TruckIcon,
  HeadsetIcon,
} from "@/components/icons";
import type { FaqItem } from "@/lib/faqs";

// Static, generous validity window for the indicative price ranges below —
// this page is statically rendered, so this is fixed at build time, not
// per-request; redeploying refreshes it.
const PRICE_VALID_UNTIL = new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10);

export const metadata: Metadata = {
  title: "PVC Card Printers UAE | Bravo RTAI & DC 3300 ID Card Printers | Sahara",
  description: "PVC & ID card printers in UAE — Bravo RTAI retransfer and Bravo DC 3300 direct-to-card, from Sahara Office Equipments, authorised exclusive UAE reseller for these two models. 600 DPI, holographic security, 3-year warranty. Dubai, Sharjah & Abu Dhabi. ☎ +971503823969",
  keywords: "pvc card printer dubai, id card printer uae, plastic card printer dubai, pvc card printing machine price in dubai, employee id card printer uae, student id card printer dubai, access control card printer uae, double sided id card printer dubai, retransfer card printer uae, bravo card printer uae, bravo rtai uae, bravo dc 3300 uae, card printer ribbon dubai",
  openGraph: {
    title: "PVC Card Printers UAE | Bravo RTAI & DC 3300 | Sahara",
    description: "PVC & ID card printers in UAE — authorised exclusive UAE reseller for the Bravo RTAI retransfer printer and Bravo DC 3300. 600 DPI, holographic security, 3-year warranty. Dubai, Sharjah & Abu Dhabi.",
    url: "https://www.saharaprinter.com/bravo-card-printers-uae/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [{ url: "https://www.saharaprinter.com/brands/bravo/rtai-official.webp", width: 610, height: 610 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PVC Card Printers UAE | Bravo RTAI & DC 3300 | Sahara Office Equipments",
    description: "PVC & ID card printers in UAE — authorised exclusive UAE reseller for the Bravo RTAI retransfer printer and Bravo DC 3300. 600 DPI, holographic security, 3-year warranty. Dubai, Sharjah & Abu Dhabi.",
    images: ["https://www.saharaprinter.com/brands/bravo/rtai-official.webp"],
  },
  alternates: { canonical: "https://www.saharaprinter.com/bravo-card-printers-uae/" },
};

/**
 * FAQ fallbacks — mirror of database/migrations/005 + 008 + 021 seed rows for
 * pageSlug 'bravo-card-printers-uae'. FaqSection prefers D1; this array is the
 * offline/empty-DB fallback and the source of the FAQPage JSON-LD either way.
 */
const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Who is the authorised exclusive Bravo card printer reseller in the UAE?",
    a: "Sahara Office Equipments is the authorised exclusive reseller in the UAE for the Bravo RTAI retransfer printer and the Bravo DC 3300 direct-to-card printer — the two Bravo Global models we stock, sell, and support. We provide sales, genuine consumables, and on-site service across Dubai, Sharjah, Abu Dhabi, and all UAE emirates.",
  },
  {
    q: "What is the print resolution of the Bravo RTAI?",
    a: "The Bravo RTAI prints at 600 DPI (dots per inch) using colour dye sublimation retransfer technology. It supports over-the-edge printing for borderless card output and features the exclusive HOLO-MET™ technology for metallic lustre effects on ID cards.",
  },
  {
    q: "Does the Bravo DC 3300 support dual-sided printing?",
    a: "Yes. The Bravo DC 3300 is available in both Simplex (DC 3300 S) and Duplex (DC 3300 D) models. Duplex printing speed is 170 cards/hour. A dual-side activation key is also available to upgrade a simplex unit on-site.",
  },
  {
    q: "Which Bravo printer supports holographic retransfer?",
    a: "The Bravo RTAI supports holographic retransfer film — both standard and customised holograms — directly in the printer without a separate laminator. This makes it ideal for government IDs, banking cards, and access credentials requiring overt security features.",
  },
  {
    q: "Can I print on wooden or transparent cards with Bravo printers?",
    a: "Yes — the Bravo RTAI supports PVC, ABSS, PET, PET-G, PC, wooden (specially treated), and translucent cards. This breadth of media support makes it unique in the UAE market for eco-friendly and specialist card applications.",
  },
  {
    q: "How much do Bravo card printers cost in Dubai / UAE?",
    a: "Pricing depends on configuration (simplex/duplex, encoding modules, lamination). Contact Sahara Office Equipments for a tailored quote for the UAE market. As the authorised exclusive UAE reseller for the RTAI and DC 3300, we offer competitive pricing, warranty, and after-sales support.",
  },
  {
    q: "Is technical support and service available in UAE for Bravo printers?",
    a: "Yes. As the authorised exclusive UAE reseller for these two Bravo models, Sahara provides on-site technical support, genuine Bravo consumables (ribbons, retransfer film, cleaning kits), and warranty service for both the RTAI and DC 3300 across all emirates.",
  },
  {
    q: "What warranty do Bravo card printers carry?",
    a: "Both the Bravo RTAI and DC 3300 carry a 3-year printer warranty. The RTAI additionally provides a lifetime warranty on the print head. Optional extended warranty is available through Sahara Office Equipments as the authorised UAE service partner.",
  },
  {
    q: "What is the difference between a PVC card printer and an ID card printer?",
    a: "None — they are the same machine. \"PVC card printer,\" \"ID card printer,\" and \"plastic card printer\" all describe a desktop printer that prints (and optionally encodes) plastic CR-80 cards. The Bravo RTAI and DC 3300 sold by Sahara Office Equipments cover both terms.",
  },
  {
    q: "Can a PVC card printer encode access control or smart cards in UAE?",
    a: "Yes. The Bravo DC 3300 supports magnetic stripe (ISO 7811), contact smartcard, and contactless/RFID encoding — combinable and available factory-fitted or as an on-site upgrade. This makes it suitable for access-control and employee badge systems across UAE offices and free zones.",
  },
  {
    q: "What is a double-sided (duplex) ID card printer and do I need one?",
    a: "A duplex printer prints both sides of the card in one pass — useful when you need information (terms, barcodes, a second logo) on the back as well as the front. The Bravo DC 3300 D prints duplex at 170 cards/hour; the RTAI has duplex built in. Single-sided (simplex) is sufficient for most basic employee or visitor badges.",
  },
  {
    q: "Where can I buy PVC card printer ribbons and blank cards in Dubai?",
    a: "Sahara Office Equipments stocks genuine YMCKO ribbons, retransfer film, HOLO-MET metallic ribbons, and blank PVC/composite cards locally for same-day availability — see our Toner & Spare Parts page. Third-party ribbons can void your printer warranty.",
  },
];

// Reconciled against https://bravoglobal.com/product/bravo-rtai/ (fetched
// 2026-09-04). Entries marked `note` are not stated on that page and come from
// the Bravo brochure/datasheet instead — kept on your confirmation, with the
// distinction surfaced as a footnote rather than presented as equally sourced.
const rtaiSpecs = [
  { label: "Printing Method", value: "Colour dye sublimation retransfer" },
  { label: "Resolution", value: "600 DPI — over-the-edge printing" },
  { label: "Print Speed", value: "Single side: 25 sec | Double side: 55 sec" },
  { label: "Input Hopper", value: "250 cards — add cards while printing" },
  { label: "Card Thickness", value: "0.5 – 1.0 mm" },
  { label: "Card Formats", value: "PVC, ABS, PET, PET-G, PC (ISO ID-1/CR-80)" },
  {
    label: "Card Formats (brochure)",
    value: "Also Wooden (specially treated) and Translucent cards",
    note: "Bravo Global brochure — not listed on the bravoglobal.com RTAI product page",
  },
  { label: "Security Features", value: "SOC technology, RFID ribbon, Card Feeder Lock, reject tray" },
  {
    label: "HOLO-MET™ metallic ribbons",
    value: "Metallic silver/gold ribbon effects",
    note: "Bravo Global brochure — not listed on the bravoglobal.com RTAI product page",
  },
  { label: "Interface", value: "USB 2.0, Ethernet 10/100 Duplex" },
  { label: "Certifications", value: "UL, FCC, CE, KCC, CCC" },
  { label: "Operating Environment", value: "15–30°C operating | 5–45°C storage" },
  { label: "Power Supply", value: "Auto 100–240 V, 50/60 Hz" },
  { label: "Dimensions", value: "12.25″ (L) × 13.25″ (W) × 17″ (H) — 22 kg" },
  { label: "Warranty", value: "3 years | Lifetime print head" },
];

// Reconciled against
// https://bravoglobal.com/product/bravo-dc3300-direct-to-card-printer/
// (fetched 2026-09-04).
const dc3300Specs = [
  { label: "Printing Method", value: "Colour dye sublimation + resin thermal transfer — direct to card" },
  { label: "Resolution", value: "300×300 & 300×600 dpi (colour); 300×1200 dpi (mono)" },
  {
    label: "Print Speed",
    value: "Up to 280 cards/hr (YMCKO single) | 215 cards/hr (single + lamination) | 170 cards/hr (YMCKOK duplex)",
  },
  { label: "Card Capacity", value: "Feeder 100 | Hopper 100 | Rear hopper 50 — 0.76 mm (30 mil)" },
  { label: "Card Types", value: "PVC, composite PVC, PET, ABS, rewritable" },
  { label: "Models", value: "Simplex (DC 3300 S) or Duplex (DC 3300 D)" },
  { label: "Interface", value: "USB (included) + Ethernet" },
  { label: "Security", value: "Kensington® lock, print-head protection, memory wipe" },
  { label: "Lamination", value: "Optional module — varnish, patch, generic or custom holograms" },
  { label: "Encoding", value: "Magnetic stripe ISO 7811, contact & contactless smartcard" },
  { label: "Software", value: "Bravo Premium Suite (Windows, Mac, Linux) + Designer XXS bundled" },
  {
    label: "Origin",
    value: "Made in France",
    note: "Bravo Global brochure — not stated on the bravoglobal.com DC 3300 product page",
  },
  { label: "Warranty", value: "3 years | Extended warranty available" },
];

const comparison = [
  { feature: "Technology", rtai: "Retransfer (reverse transfer)", dc3300: "Direct to card" },
  { feature: "Resolution", rtai: "600 DPI", dc3300: "Up to 300×1200 DPI (mono)" },
  { feature: "Over-the-edge print", rtai: "Yes — borderless", dc3300: "Standard border" },
  { feature: "Holographic film", rtai: "Yes — standard & custom", dc3300: "Via lamination module" },
  { feature: "Card media", rtai: "PVC, PET, PET-G, PC, Wood, Translucent", dc3300: "PVC, PET, ABS, Rewritable" },
  { feature: "Input hopper", rtai: "250 cards", dc3300: "100 cards" },
  { feature: "Duplex", rtai: "Built-in", dc3300: "Simplex or Duplex model / upgrade key" },
  { feature: "Lamination (built-in)", rtai: "Yes — retransfer film acts as lam", dc3300: "Optional add-on module" },
  { feature: "Origin", rtai: "Bravo Global", dc3300: "Made in France" },
  { feature: "Best for", rtai: "High-security & specialty cards", dc3300: "High-volume standard ID printing" },
];

const rtaiFeatures = [
  { icon: LayerStackIcon, title: "HOLO-MET™ Ribbons", body: "Print metallic silver and gold on card — overt visual security, no hot-stamp module needed." },
  { icon: LeafIcon, title: "Wooden & Transparent Cards", body: "Specially treated wooden cards supported — sustainable, distinctive, and eco-friendly ID." },
  { icon: LayersIcon, title: "Holographic Retransfer Film", body: "Standard or custom holograms applied in-printer without a separate lamination module." },
  { icon: IdCardIcon, title: "250-Card Hopper", body: "Continuous high-volume operation — add cards mid-run without stopping the printer." },
  { icon: ShieldCheckIcon, title: "SOC Security Technology", body: "Proprietary Secure On-Card technology with RFID ribbon and card-feeder lock." },
  { icon: AwardIcon, title: "Lifetime Print Head Warranty", body: "Industry-leading protection — the print head is covered for the life of the printer." },
];

const dc3300Features = [
  { icon: ClockIcon, title: "280 Cards / Hour", body: "Industry-leading throughput for YMCKO single-sided printing — handles high-volume corporate ID batches." },
  { icon: AwardIcon, title: "Made in France†", body: "Per the Bravo Global brochure — European engineering and quality control, trusted by government, banking, and enterprise clients worldwide." },
  { icon: SettingsIcon, title: "Multi-Encoding", body: "Magnetic stripe (ISO 7811), contact and contactless smartcard encoders — combinable, factory or on-site." },
  { icon: LayersIcon, title: "Lamination Module", body: "Optional add-on for varnish, patch, or custom hologram overlaminates — 600 or 1,200 sides per roll." },
  { icon: SettingsIcon, title: "Cross-Platform Software", body: "Bravo Premium Suite for Windows, Mac, and Linux. Bravo SDK available for system integration." },
  { icon: ClockIcon, title: "Simplex → Duplex Upgrade", body: "Activate dual-side printing via software key — no hardware replacement needed." },
];

const useCases = [
  { title: "Government & Public Sector", body: "National IDs, employee access cards, resident identity documents with overt security features. Common in Dubai and Abu Dhabi government entities." },
  { title: "Banking & Finance", body: "Staff ID cards, VIP client cards, access credentials with RFID/smartcard encoding. Used by UAE banks and DIFC financial institutions." },
  { title: "Corporate Enterprises", body: "Employee ID badges with photo, department, and barcode/QR for access control systems across free zones and business parks." },
  { title: "Healthcare", body: "Patient ID bands, staff credentials, pharmacy dispensing cards with encoded data. Common in Dubai Health Authority-affiliated facilities." },
  { title: "Education", body: "Student and staff cards for UAE universities, schools, and training institutes — including KHDA-registered institutions." },
  { title: "Hospitality & Events", body: "Membership cards, loyalty cards, event credentials, RFID room keys — for hotels, exhibition centres, and large events in Dubai and Sharjah." },
];

const consumables = [
  { name: "YMCKO Colour Ribbons", models: "RTAI & DC 3300", desc: "Full-colour plus overlay for protection and shine." },
  { name: "Retransfer Film", models: "RTAI only", desc: "Genuine Bravo retransfer film including holographic variants." },
  { name: "HOLO-MET™ Ribbons", models: "RTAI only", desc: "Metallic gold and silver ribbon for premium card effects." },
  { name: "Cleaning Kits", models: "RTAI & DC 3300", desc: "Roller and hopper cleaning cards to maintain print quality." },
];

const pathCards = [
  { icon: ClockIcon, title: "Rent a Card Printer", body: "Short-term hire for events, exhibitions, and onboarding drives — weekly, monthly, or annual terms.", href: "/services/pvc-card-printer-rental/" },
  { icon: AwardIcon, title: "Buy a Card Printer", body: "Outright purchase of the RTAI or DC 3300, with warranty, consumables, and AMC options.", href: "/services/pvc-card-printer-sales/" },
  { icon: IdCardIcon, title: "Have Cards Printed For You", body: "Bureau service — employee ID, security, hologram, wooden and transparent cards, printed and delivered.", href: "/services/pvc-card-printing-services/" },
];

const pricingRows: [string, string, string][] = [
  ["Bravo DC 3300 S — simplex, no encoding", "AED 5,000 – 7,500", "Standard single-sided employee ID batches"],
  ["Bravo DC 3300 D — duplex + smartcard encoding", "AED 8,500 – 14,000", "Corporate/campus ID with access-control encoding"],
  ["Bravo RTAI — 600 DPI retransfer, standard config", "AED 9,000 – 15,000", "High-quality photo ID, over-the-edge printing"],
  ["Bravo RTAI — with holographic security film", "AED 15,000 – 22,000", "Government ID, banking, access credentials"],
];

const deliveryAreas = [
  "Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain",
  "JAFZA", "DAFZA", "SAIF Zone", "DMCC",
];

const relatedLinks = [
  { href: "/products/", label: "Office Printers UAE" },
  { href: "/services/printer-rental/", label: "Printer Rental UAE" },
  { href: "/services/amc/", label: "Printer AMC Dubai" },
  { href: "/services/repair/", label: "Printer Repair Dubai" },
  { href: "/services/printer-spare-parts/", label: "Toner & Spare Parts" },
  { href: "/pvc-card-printer-quote/", label: "Get a Quote" },
];

const trail = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/" },
  { label: "PVC Card Printers" },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Sahara Office Equipments — Bravo UAE Exclusive Reseller",
  "description": "Authorised exclusive reseller in the UAE for the Bravo RTAI retransfer printer and Bravo DC 3300 direct-to-card printer. Sales, genuine consumables, and on-site service across all UAE emirates.",
  "url": "https://www.saharaprinter.com/bravo-card-printers-uae/",
  "telephone": "+971503823969",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sahara Centre, Al Nahda",
    "addressLocality": "Sharjah",
    "addressRegion": "Sharjah",
    "addressCountry": "AE"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 25.2942534, "longitude": 55.4260483 },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Abu Dhabi" }
  ],
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": ["https://www.bravoglobal.com"]
};

const rtaiProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Bravo RTAI Colour Reverse Transfer Card Printer",
  "description": "600 DPI retransfer card printer with holographic film capability and a 250-card hopper. Available in UAE through Sahara Office Equipments, the authorised exclusive UAE reseller for this model.",
  "brand": { "@type": "Brand", "name": "Bravo Global" },
  "manufacturer": { "@type": "Organization", "name": "Bravo Global", "url": "https://www.bravoglobal.com" },
  "category": "ID Card Printer",
  "image": "https://www.saharaprinter.com/brands/bravo/rtai-official.webp",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    // Indicative UAE range for a 600 dpi retransfer card printer; final price
    // depends on encoding/lamination configuration. Range, not exact price,
    // to avoid publishing false precision.
    "priceCurrency": "AED",
    "priceValidUntil": PRICE_VALID_UNTIL,
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "AED",
      "minPrice": 9000,
      "maxPrice": 22000,
      "valueAddedTaxIncluded": false
    },
    "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
    "seller": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://www.saharaprinter.com" }
  }
};

const dc3300ProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Bravo DC 3300 Direct to Card Printer",
  "description": "Direct-to-card ID printer, up to 280 cards/hr, simplex and duplex models. Available in UAE through Sahara Office Equipments, the authorised exclusive UAE reseller for this model.",
  "brand": { "@type": "Brand", "name": "Bravo Global" },
  "manufacturer": { "@type": "Organization", "name": "Bravo Global", "url": "https://www.bravoglobal.com" },
  "category": "ID Card Printer",
  "image": "https://www.saharaprinter.com/brands/bravo/dc3300-official.webp",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    // Indicative UAE range for a direct-to-card printer; simplex vs duplex,
    // encoders and the lamination module drive the final figure.
    "priceCurrency": "AED",
    "priceValidUntil": PRICE_VALID_UNTIL,
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "AED",
      "minPrice": 5000,
      "maxPrice": 14000,
      "valueAddedTaxIncluded": false
    },
    "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
    "seller": { "@type": "Organization", "name": "Sahara Office Equipments", "url": "https://www.saharaprinter.com" }
  }
};

// ItemList mirroring the on-page RTAI vs DC 3300 comparison table so the
// feature-by-feature rows are machine-readable, not just visual.
const comparisonItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Bravo RTAI vs Bravo DC 3300 — Feature Comparison",
  "description": "Feature-by-feature comparison of the Bravo RTAI retransfer card printer and the Bravo DC 3300 direct-to-card printer, both available in the UAE from Sahara Office Equipments.",
  "url": "https://www.saharaprinter.com/bravo-card-printers-uae/#comparison",
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "numberOfItems": comparison.length,
  "itemListElement": comparison.map((row, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": row.feature,
    "description": `Bravo RTAI: ${row.rtai}. Bravo DC 3300: ${row.dc3300}.`,
  })),
};

// Generic PVC card printing workflow — deliberately model-agnostic; no
// Bravo-specific claims beyond what the specs on this page already state.
const howToPrintCardSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to print a PVC ID card on a card printer",
  "description": "The standard workflow for producing a printed PVC ID card, from artwork design through to encoding and quality check.",
  "totalTime": "PT10M",
  "supply": [
    { "@type": "HowToSupply", "name": "Blank PVC or composite cards (ISO ID-1 / CR-80)" },
    { "@type": "HowToSupply", "name": "Colour print ribbon (e.g. YMCKO)" },
    { "@type": "HowToSupply", "name": "Retransfer film or overlaminate (if applicable)" },
  ],
  "tool": [
    { "@type": "HowToTool", "name": "ID card printer" },
    { "@type": "HowToTool", "name": "Card design software" },
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Design the card layout",
      "text": "Lay out the card artwork — photo, name, logo, barcode or QR code — in card design software at the correct CR-80 dimensions, and link any variable data to your cardholder database.",
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Load blank cards and ribbon",
      "text": "Fill the input hopper with blank cards of the supported thickness and card type, and fit a genuine print ribbon (and retransfer film, on a retransfer printer).",
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Print the card",
      "text": "Send the job from the printer driver, choosing single-sided or dual-sided output. Direct-to-card printers print onto the card surface; retransfer printers print to film first and then fuse the image onto the card.",
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Encode the magnetic stripe or chip",
      "text": "If the card carries data, encode it in the same pass using the printer's magnetic stripe (ISO 7811), contact smartcard or contactless encoder module.",
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Laminate and quality-check",
      "text": "Apply a varnish, patch or holographic overlaminate where extra durability or overt security is required, then check colour, alignment and encoded data before issuing the card.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.saharaprinter.com/products/" },
    { "@type": "ListItem", "position": 3, "name": "Bravo Card Printers UAE", "item": "https://www.saharaprinter.com/bravo-card-printers-uae/" }
  ]
};

export default function BravoCardPrintersUAE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rtaiProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dc3300ProductSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonItemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToPrintCardSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-surface">
        <Header />

        <ProductHero
          trail={trail}
          eyebrow="Authorised Exclusive Reseller in the UAE — RTAI & DC 3300"
          title={
            <>
              PVC Card Printers
              <br />
              <span className="text-primary">— UAE</span>
            </>
          }
          answer={
            <AnswerBlock
              id="pvc-card-printer-uae"
              question="What is a PVC card printer and where can I buy one in UAE?"
              answer="A PVC card printer prints and encodes plastic ID, access, and membership cards in-house instead of ordering pre-printed batches. Sahara Office Equipments supplies two models in the UAE — the Bravo RTAI (600 DPI retransfer, holographic security) and the Bravo DC 3300 (direct-to-card, up to 280 cards/hour) — with sales, genuine consumables, and on-site support in Dubai, Sharjah, Abu Dhabi and all emirates."
              supportingPoints={[
                "Same machine, two names: \"PVC card printer\" and \"ID card printer\" both describe this hardware — pricing and specs below apply to either search.",
                "600 DPI over-the-edge retransfer (RTAI) or up to 280 cards/hour direct-to-card (DC 3300) — pick by security level and volume.",
                "Holographic retransfer film and HOLO-MET™ metallic ribbons applied without a separate laminator on the RTAI.",
                "3-year warranty with lifetime print-head cover on the RTAI; genuine ribbons, film and blank PVC cards stocked locally.",
              ]}
            />
          }
          image={{ src: "/brands/bravo/rtai-official.webp", alt: "Bravo RTAI PVC card printer — Sahara UAE", width: 610, height: 610 }}
          primaryCta={{ label: "Get a Quote", href: "/pvc-card-printer-quote/" }}
          secondaryCta={{ label: "Call: +971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section flush eyebrow="Why Sahara" title="Authorised, stocked, and supported in-country">
          <div className="grid gap-6 sm:grid-cols-3">
            <FeatureCard
              icon={AwardIcon}
              title="Authorised Exclusive Reseller"
              body="Sahara is the authorised exclusive reseller in the UAE for two specific Bravo Global models — the RTAI and the DC 3300. We stock both, handle all sales, warranty, and service in-country."
            />
            <FeatureCard
              icon={TruckIcon}
              title="Genuine Consumables"
              body="We stock original Bravo ribbons, retransfer films, and cleaning kits in-country for fast replenishment with no import delays or counterfeit risk."
              delay={0.05}
            />
            <FeatureCard
              icon={HeadsetIcon}
              title="Manufacturer-Backed Support"
              body="Full 3-year warranty service, preventive maintenance, and trained technicians for the Bravo RTAI and DC 3300 across all UAE emirates."
              delay={0.1}
            />
          </div>
          <div className="mt-10 flex items-center justify-center">
            <a
              href="https://www.bravoglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-pill border border-primary/30 bg-primary/5 px-6 py-3 text-caption font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              <AwardIcon size={16} />
              Authorised Exclusive Reseller in the UAE — Bravo RTAI &amp; DC 3300
              <span className="text-caption text-muted">(bravoglobal.com)</span>
            </a>
          </div>
        </Section>

        <Section eyebrow="Compare Models" title="Which PVC card printer is right for you?" tone="raised">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-panel border border-primary/20 bg-surface-mid p-8">
              <span className="mb-4 block text-caption font-bold uppercase tracking-widest text-primary">
                Choose the Bravo RTAI if you need…
              </span>
              <ul className="space-y-2.5 text-[0.9rem] text-on-surface-variant">
                {[
                  "Maximum print quality — 600 DPI over-the-edge borderless cards",
                  "Built-in holographic security without a separate laminator",
                  "Specialty media: wooden, translucent, or PET-G cards",
                  "HOLO-MET™ metallic gold/silver ribbon effects",
                  "Government IDs, banking VIP cards, high-security credentials",
                  "Lifetime print head warranty for long-term ROI",
                ].map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-0.5 text-primary">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-panel border border-emerald-500/20 bg-surface-mid p-8">
              <span className="mb-4 block text-caption font-bold uppercase tracking-widest text-emerald-400">
                Choose the Bravo DC 3300 if you need…
              </span>
              <ul className="space-y-2.5 text-[0.9rem] text-on-surface-variant">
                {[
                  "High-volume throughput — up to 280 cards/hour",
                  "Lower cost per card for standard employee ID batches",
                  "Cross-platform software (Windows, Mac, Linux)",
                  "Flexible encoding: magnetic stripe, contact & contactless smartcard",
                  "Corporate ID, membership cards, campus credentials",
                  "Simplex-to-Duplex upgrade via software key (no hardware swap)",
                ].map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section eyebrow="Colour Reverse Transfer" title="Bravo RTAI" id="bravo-rtai">
          <p className="max-w-2xl text-body text-muted">
            600 DPI over-the-edge retransfer printing. The only card printer in its class with built-in
            holographic retransfer, wooden card support, and HOLO-MET™ metallic lustre ribbons — no
            separate laminator required.
          </p>
          <p className="mt-3 text-[0.9rem] font-semibold italic text-primary">
            &ldquo;When exclusivity matters&rdquo; — Bravo Global
          </p>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-card border border-white/[0.08] bg-surface-low">
              <Image src="/brands/bravo/rtai-official.webp" alt="Bravo RTAI retransfer card printer — official product photo, bravoglobal.com" width={610} height={610} className="h-auto w-full object-cover" priority />
            </div>
            <div className="overflow-hidden rounded-card border border-white/[0.08] bg-surface-low">
              <Image src="/brands/bravo/bravo-rtai-page2.webp" alt="Bravo RTAI features and specifications" width={600} height={848} className="h-auto w-full object-cover" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rtaiFeatures.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} delay={(i % 3) * 0.05} />
            ))}
          </div>

          <h3 className="mb-4 mt-12 font-sora text-headline font-bold text-white">Bravo RTAI Technical Specifications</h3>
          <div className="rounded-card border border-white/[0.08] bg-surface-low px-5">
            <SpecTable
              rows={rtaiSpecs}
              caption={
                <>
                  Specifications marked <sup className="text-primary">†</sup> come from the Bravo Global
                  brochure rather than the{" "}
                  <a href="https://bravoglobal.com/product/bravo-rtai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    bravoglobal.com RTAI product page
                  </a>
                  .
                </>
              }
            />
          </div>
        </Section>

        <Section eyebrow="Direct to Card" title="Bravo DC 3300" id="bravo-dc3300" tone="raised">
          <p className="max-w-2xl text-body text-muted">
            High-throughput direct-to-card printer with lamination module, multi-encoding options, and
            cross-platform software. Available in Simplex (DC 3300 S) and Duplex (DC 3300 D).
          </p>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-card border border-white/[0.08] bg-surface-mid">
              <Image src="/brands/bravo/dc3300-official.webp" alt="Bravo DC 3300 direct-to-card printer — official product photo, bravoglobal.com" width={610} height={610} className="h-auto w-full object-cover" priority />
            </div>
            <div className="overflow-hidden rounded-card border border-white/[0.08] bg-surface-mid">
              <Image src="/brands/bravo/bravo-dc3300-page2.webp" alt="Bravo DC 3300 specifications and features" width={600} height={848} className="h-auto w-full object-cover" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dc3300Features.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} delay={(i % 3) * 0.05} />
            ))}
          </div>

          <h3 className="mb-4 mt-12 font-sora text-headline font-bold text-white">Bravo DC 3300 Technical Specifications</h3>
          <div className="rounded-card border border-white/[0.08] bg-surface-mid px-5">
            <SpecTable
              rows={dc3300Specs}
              caption={
                <>
                  Specifications marked <sup className="text-primary">†</sup> come from the Bravo Global
                  brochure rather than the{" "}
                  <a href="https://bravoglobal.com/product/bravo-dc3300-direct-to-card-printer/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    bravoglobal.com DC 3300 product page
                  </a>
                  .
                </>
              }
            />
          </div>
        </Section>

        <Section eyebrow="Full Comparison" title="RTAI vs DC 3300" id="comparison" align="center">
          <ComparisonTable
            columns={["Feature", "Bravo RTAI", "Bravo DC 3300"]}
            highlightColumn={1}
            rows={comparison.map((row) => [row.feature, row.rtai, row.dc3300])}
          />
        </Section>

        <Section eyebrow="Use Cases" title="Who uses Bravo card printers in UAE?" align="center" tone="raised">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <FeatureCard key={u.title} title={u.title} body={u.body} delay={(i % 3) * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Consumables" title="Genuine Bravo consumables — in stock UAE" align="center">
          <p className="mx-auto -mt-8 mb-10 max-w-2xl text-center text-[0.9rem] text-muted">
            As the authorised exclusive reseller for these two Bravo models, Sahara stocks genuine
            consumables locally — no waiting on international shipments. Avoid uncertified third-party
            ribbons that can void your warranty.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {consumables.map((c, i) => (
              <FeatureCard
                key={c.name}
                title={c.name}
                body={
                  <>
                    <span className="mb-1 block text-caption font-bold text-primary">{c.models}</span>
                    {c.desc}
                  </>
                }
                delay={(i % 4) * 0.05}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="/services/printer-spare-parts/" className="inline-block rounded-pill border border-primary/30 bg-primary/10 px-6 py-3 text-caption font-semibold text-primary transition-colors hover:bg-primary/20">
              Order Consumables →
            </a>
          </div>
        </Section>

        <CtaBand
          title="Get a Bravo Printer Demo"
          body="As the authorised exclusive reseller in the UAE for the Bravo RTAI and DC 3300, we offer on-site demonstrations, live card printing samples, and tailored pricing for your organisation."
          primary={{ label: "Request a Demo", href: "/pvc-card-printer-quote/" }}
          secondary={{ label: "+971 50 382 3969", href: "tel:+971503823969" }}
        />

        <Section eyebrow="Next Step" title="Rent, buy, or have us print your cards" align="center" tone="raised">
          <p className="mx-auto -mt-8 mb-10 max-w-2xl text-center text-[0.9rem] text-muted">
            This page covers the RTAI and DC 3300 hardware. For your specific need, go straight to:
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {pathCards.map((p, i) => (
              <FeatureCard key={p.href} icon={p.icon} title={p.title} body={p.body} href={p.href} delay={i * 0.05} />
            ))}
          </div>
        </Section>

        <Section eyebrow="Pricing" title="How much does a PVC card printer cost in Dubai?" id="pricing" align="center">
          <p className="mx-auto -mt-8 mb-10 max-w-2xl text-center text-[0.9rem] text-muted">
            Indicative UAE pricing by configuration. Final price depends on encoding modules, lamination,
            and simplex vs duplex — request a tailored quote for your exact requirement.
          </p>
          <ComparisonTable columns={["Configuration", "Indicative AED Price", "Best For"]} highlightColumn={1} rows={pricingRows} />

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-sora text-headline font-bold text-white">PVC Card Printer vs ID Card Printer — Same Machine</h3>
              <p className="text-[0.9rem] leading-relaxed text-muted">
                &ldquo;PVC card printer,&rdquo; &ldquo;ID card printer,&rdquo; and &ldquo;plastic card printer&rdquo; all describe the same
                category of hardware — a desktop printer that prints and, optionally, encodes plastic
                CR-80 cards. The Bravo RTAI and DC 3300 on this page cover both search terms: they print
                on PVC card stock and produce finished ID cards in one pass, whether you&rsquo;re issuing
                employee badges, student IDs, or access control credentials.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-sora text-headline font-bold text-white">Genuine Consumables — Ribbons &amp; Blank Cards</h3>
              <p className="mb-3 text-[0.9rem] leading-relaxed text-muted">
                We stock genuine YMCKO colour ribbons, retransfer film, blank PVC/composite cards (ISO
                CR-80), and cleaning kits locally — no waiting on international shipments, and no
                counterfeit-ribbon warranty risk. Browse current stock and pricing on our{" "}
                <a href="/services/printer-spare-parts/" className="text-primary hover:underline">
                  Toner &amp; Spare Parts
                </a>{" "}
                page.
              </p>
              <a href="/services/printer-spare-parts/" className="inline-block text-[0.9rem] font-semibold text-primary hover:underline">
                Shop card printer ribbons &amp; consumables →
              </a>
            </div>
          </div>

          <h3 className="mb-6 mt-14 text-center font-sora text-headline font-bold text-white">
            PVC Card Printer Delivery &amp; Support Across the UAE
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {deliveryAreas.map((area) => (
              <span key={area} className="rounded-pill border border-white/[0.08] bg-surface-low px-4 py-2 text-caption text-on-surface-variant">
                {area}
              </span>
            ))}
          </div>
        </Section>

        <Section flush className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-title font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-muted">Common questions about Bravo card printers in the UAE.</p>
          </div>
          <FaqSection
            pageSlug="bravo-card-printers-uae"
            defaultFaqs={DEFAULT_FAQS}
            pageId="https://www.saharaprinter.com/bravo-card-printers-uae/#faq"
          />
        </Section>

        <Section flush tone="ink">
          <h2 className="text-headline font-bold text-white mb-6">Related Products &amp; Services</h2>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((l) => (
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
