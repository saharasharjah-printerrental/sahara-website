import type { Metadata } from "next";

const faqs = [
  { q: "Where to buy Samsung printers in Dubai?", a: "Sahara Office Equipments stocks Samsung ProXpress and MultiXpress printers in UAE with same-day delivery, installation, and warranty support in Dubai and Sharjah." },
  { q: "Are Samsung printers available for rental in UAE?", a: "Yes. Samsung ProXpress models are available on monthly rental plans from AED 250/month with free toner and on-site maintenance." },
  { q: "Can Sahara repair Samsung printers in Dubai?", a: "Yes. Our certified technicians service all Samsung ProXpress and MultiXpress models with OEM parts and a 30-day workmanship warranty." },
];

const description = "Authorized Samsung printer dealer in UAE. ProXpress and MultiXpress enterprise printers. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Printer Brands", item: "https://www.saharaprinter.com/brands/" },
    { "@type": "ListItem", position: 3, name: "Samsung Printers UAE", item: "https://www.saharaprinter.com/brands/samsung/" },
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
  name: "Samsung Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Samsung Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Samsung Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "samsung printer uae, samsung printer dubai, samsung photocopier uae, samsung proXpress uae, samsung dealer uae",
  alternates: { canonical: "https://www.saharaprinter.com/brands/samsung/" },
  openGraph: {
    title: "Samsung Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/samsung/",
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
