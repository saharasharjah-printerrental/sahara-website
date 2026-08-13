export const runtime = 'edge';
import type { Metadata } from "next";
import BrandContentClient from "@/components/BrandContentClient";

const faqs = [
  { q: "Where can I buy Epson printers in UAE?", a: "Sahara Office Equipments stocks Epson EcoTank, WorkForce, and wide-format printers in Dubai and Sharjah with same-day delivery and installation." },
  { q: "Does Sahara supply Epson EcoTank printers in Dubai?", a: "Yes. Epson EcoTank models offer ultra-low cost-per-page with refillable tanks — ideal for high-volume colour printing in UAE offices and studios." },
  { q: "Are Epson wide-format printers available for rent in UAE?", a: "Yes. Epson wide-format and EcoTank printers are available for short-term and long-term rental in UAE, with maintenance included." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.saharaprinter.com/products/" },
    { "@type": "ListItem", position: 3, name: "Epson Printers UAE", item: "https://www.saharaprinter.com/brands/epson/" },
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
  name: "Epson Printer Sales, Rental & Support UAE",
  description: "Authorized Epson printer dealer in UAE. PrecisionCore inkjet and wide-format solutions. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Epson Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Epson Printers UAE | Authorized Dealer | Sahara Office",
  description: "Authorized Epson printer dealer in UAE. PrecisionCore inkjet and wide-format solutions. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
  keywords: "epson printer uae, epson printer dubai, wide format printer uae, epson dealer uae, epson ecotank uae",
  openGraph: {
    title: "Epson Printers UAE | Authorized Dealer | Sahara",
    description: "Authorized Epson printer dealer in UAE. PrecisionCore inkjet and wide-format solutions. Sales, rental, and support.",
    url: "https://www.saharaprinter.com/brands/epson/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/brands/epson/" },
  other: {
    "script:ld+json": [
      JSON.stringify(breadcrumbSchema),
      JSON.stringify(faqSchema),
      JSON.stringify(serviceSchema),
    ] as string[],
  },
};

export default function EpsonBrandPage() {
  return <BrandContentClient slug="epson" brandFaqs={faqs} />;
}
