import type { Metadata } from "next";

const faqs = [
  { q: "Where can I buy Ricoh printers in UAE?", a: "Sahara Office Equipments is an authorized Ricoh dealer in UAE, supplying Ricoh IM C series and MP series MFPs across Dubai, Sharjah, and Abu Dhabi." },
  { q: "Is Ricoh good for high-volume printing in Dubai offices?", a: "Yes. Ricoh IM C series color MFPs are built for 20,000–50,000 pages/month and are ideal for large corporate offices and government entities in UAE." },
  { q: "Does Sahara provide Ricoh AMC in Dubai?", a: "Yes. Ricoh Annual Maintenance Contracts from Sahara include unlimited service visits, OEM parts, and toner supply — with 4-hour emergency response across UAE." },
];

const description = "Authorized Ricoh printer and photocopier dealer in UAE. Aficio and IM C series MFPs. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Printer Brands", item: "https://www.saharaprinter.com/brands/" },
    { "@type": "ListItem", position: 3, name: "Ricoh Printers UAE", item: "https://www.saharaprinter.com/brands/ricoh/" },
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
  name: "Ricoh Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Ricoh Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Ricoh Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "ricoh printer uae, ricoh photocopier dubai, ricoh aficio uae, ricoh dealer uae, ricoh copier sharjah",
  alternates: { canonical: "https://www.saharaprinter.com/brands/ricoh/" },
  openGraph: {
    title: "Ricoh Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/ricoh/",
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
