import type { Metadata } from "next";

const faqs = [
  { q: "Is Sahara an authorized Xerox dealer in UAE?", a: "Yes. Sahara Office Equipments supplies Xerox VersaLink and AltaLink enterprise MFPs to businesses in Dubai, Sharjah, Abu Dhabi, and across UAE." },
  { q: "Can I rent a Xerox photocopier in Dubai?", a: "Yes. Xerox VersaLink and AltaLink models are available on monthly rental from AED 250/month with zero deposit, free Xerox toner, and full on-site AMC." },
  { q: "What is the difference between Xerox VersaLink and AltaLink?", a: "VersaLink is designed for small-to-mid-size offices (up to 6,500 pages/month), while AltaLink handles enterprise workgroups at 20,000–30,000 pages/month — both available from Sahara UAE." },
];

const description = "Authorized Xerox printer dealer in UAE. VersaLink and AltaLink enterprise MFPs. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.saharaprinter.com/products/" },
    { "@type": "ListItem", position: 3, name: "Xerox Printers UAE", item: "https://www.saharaprinter.com/brands/xerox/" },
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
  name: "Xerox Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Xerox Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Xerox Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "xerox printer uae, xerox printer dubai, xerox photocopier uae, versalink uae, xerox dealer uae",
  alternates: { canonical: "https://www.saharaprinter.com/brands/xerox/" },
  openGraph: {
    title: "Xerox Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/xerox/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Xerox Printers UAE — Sahara Office Equipments",
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
