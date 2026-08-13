import type { Metadata } from "next";

const faqs = [
  { q: "Is Sahara an authorized Canon dealer in UAE?", a: "Yes. Sahara Office Equipments is an authorized Canon dealer in UAE, supplying Canon imageRUNNER ADVANCE and imageCLASS printers to businesses in Dubai, Sharjah, and Abu Dhabi." },
  { q: "Can I rent a Canon photocopier in Dubai?", a: "Yes. Canon imageRUNNER A3 and A4 models are available on monthly rental from AED 250/month — zero deposit, free Canon toner, and full on-site maintenance included." },
  { q: "What Canon printers are best for large offices in UAE?", a: "For high-volume offices (10,000+ pages/month), the Canon imageRUNNER ADVANCE DX series offers 50–105 ppm output with full colour scanning, finishing, and network security." },
];

const description = "Authorized Canon printer and photocopier dealer in UAE. imageRUNNER ADVANCE and imageCLASS. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.saharaprinter.com/products/" },
    { "@type": "ListItem", position: 3, name: "Canon Printers UAE", item: "https://www.saharaprinter.com/brands/canon/" },
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
  name: "Canon Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Canon Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Canon Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "canon printer uae, canon printer dubai, canon photocopier uae, canon imageRUNNER uae, canon dealer dubai",
  alternates: { canonical: "https://www.saharaprinter.com/brands/canon/" },
  openGraph: {
    title: "Canon Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/canon/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  other: {
    "script:ld+json": [
      JSON.stringify(breadcrumbSchema),
      JSON.stringify(faqSchema),
      JSON.stringify(serviceSchema),
    ] as string[],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
