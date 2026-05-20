export const runtime = 'edge';
import type { Metadata } from "next";
import BrandContentClient from "@/components/BrandContentClient";

const faqs = [
  { q: "Is Sahara an authorized Sharp dealer in UAE?", a: "Yes. Sahara Office Equipments is an authorized Sharp dealer in UAE, supplying Sharp MFPs with OSA integration for Dubai, Sharjah, and Abu Dhabi businesses." },
  { q: "What Sharp MFP models are available for rental in Dubai?", a: "Sharp A3 color and mono MFPs are available on monthly rental plans from AED 250/month with full AMC, free consumables, and on-site support." },
  { q: "What is Sharp OSA integration?", a: "Sharp Open Systems Architecture (OSA) allows Sharp MFPs to connect directly with business applications — ERP, DMS, and cloud systems — for seamless document workflow." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Printer Brands", item: "https://www.saharaprinter.com/brands/" },
    { "@type": "ListItem", position: 3, name: "Sharp Printers UAE", item: "https://www.saharaprinter.com/brands/sharp/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sharp Printer Sales, Rental & AMC UAE",
  description: "Authorized Sharp printer and photocopier dealer in UAE. Smart MFPs with Sharp OSA integration. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Sharp Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Sharp Printers UAE | Authorized Dealer | Sahara Office",
  description: "Authorized Sharp printer and photocopier dealer in UAE. Smart MFPs with Sharp OSA integration. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
  keywords: "sharp printer uae, sharp photocopier dubai, sharp mfp uae, sharp dealer uae, sharp copier sharjah",
  openGraph: {
    title: "Sharp Printers UAE | Authorized Dealer | Sahara",
    description: "Authorized Sharp printer and photocopier dealer in UAE. Smart MFPs with Sharp OSA integration. Sales, rental, and AMC.",
    url: "https://www.saharaprinter.com/brands/sharp/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/brands/sharp/" },
  other: {
    "script:ld+json": [
      JSON.stringify(breadcrumbSchema),
      JSON.stringify(faqSchema),
      JSON.stringify(serviceSchema),
    ] as string[],
  },
};

export default function SharpBrandPage() {
  return <BrandContentClient slug="sharp" brandFaqs={faqs} />;
}
