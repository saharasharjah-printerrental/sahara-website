import type { Metadata } from "next";

const faqs = [
  { q: "Where can I buy Kyocera printers in UAE?", a: "Sahara Office Equipments is an authorized Kyocera dealer in UAE. We supply Kyocera ECOSYS and TASKalfa models across Dubai, Sharjah, and Abu Dhabi with next-day delivery." },
  { q: "Does Sahara offer Kyocera printer rental in Dubai?", a: "Yes. Kyocera ECOSYS and TASKalfa printers are available on monthly rental from AED 250/month — zero deposit, free toner, and full AMC included." },
  { q: "Is Kyocera ECOSYS good for high-volume printing in UAE?", a: "Absolutely. Kyocera ECOSYS printers deliver the lowest cost-per-page of any brand in UAE — ideal for offices printing 5,000+ pages/month in Dubai and Sharjah." },
];

const description = "Authorized Kyocera printer and photocopier dealer in UAE. ECOSYS technology for low TCO. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.saharaprinter.com/products/" },
    { "@type": "ListItem", position: 3, name: "Kyocera Printers UAE", item: "https://www.saharaprinter.com/brands/kyocera/" },
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
  name: "Kyocera Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Kyocera Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Kyocera Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "kyocera printer uae, kyocera photocopier dubai, ecosys printer uae, kyocera dealer uae, kyocera copier sharjah",
  alternates: { canonical: "https://www.saharaprinter.com/brands/kyocera/" },
  openGraph: {
    title: "Kyocera Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/kyocera/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Kyocera Printers UAE — Sahara Office Equipments",
      },
    ],
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
