import type { Metadata } from "next";

const faqs = [
  { q: "Is Sahara an authorized Lexmark dealer in UAE?", a: "Yes. Sahara Office Equipments supplies Lexmark enterprise laser printers and MPS solutions to businesses across Dubai, Sharjah, and Abu Dhabi." },
  { q: "Does Sahara provide Lexmark Managed Print Services in UAE?", a: "Yes. Sahara's Lexmark MPS program covers fleet assessment, device consolidation, automated toner replenishment, and on-site technician support across UAE." },
  { q: "Can I rent a Lexmark printer in Dubai?", a: "Yes. Lexmark enterprise laser printers are available on monthly rental from AED 250/month with zero deposit, OEM supplies, and full maintenance." },
];

const description = "Authorized Lexmark printer dealer in UAE. Managed Print Services and enterprise laser. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Printer Brands", item: "https://www.saharaprinter.com/brands/" },
    { "@type": "ListItem", position: 3, name: "Lexmark Printers UAE", item: "https://www.saharaprinter.com/brands/lexmark/" },
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
  name: "Lexmark Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Lexmark Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Lexmark Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "lexmark printer uae, lexmark printer dubai, lexmark photocopier uae, lexmark dealer uae, lexmark copier sharjah",
  alternates: { canonical: "https://www.saharaprinter.com/brands/lexmark/" },
  openGraph: {
    title: "Lexmark Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/lexmark/",
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
