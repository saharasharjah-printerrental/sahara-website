import type { Metadata } from "next";

const faqs = [
  { q: "Where to buy Brother printers in Dubai?", a: "Sahara Office Equipments stocks Brother MFC, DCP, and HL series in Dubai and Sharjah. Same-day delivery available with warranty and installation support." },
  { q: "Can I rent a Brother printer in UAE?", a: "Yes — Brother wireless printers are available on monthly rental plans from AED 250/month including free toner and on-site maintenance." },
  { q: "Do Brother printers work with UAE office networks?", a: "Yes. Brother MFC and HL series support Wi-Fi, Ethernet, cloud print (Google Drive, Dropbox), and are compatible with all UAE office network configurations." },
];

const description = "Authorized Brother printer dealer in UAE. Wireless, cloud-ready, and enterprise printers. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Printer Brands", item: "https://www.saharaprinter.com/brands/" },
    { "@type": "ListItem", position: 3, name: "Brother Printers UAE", item: "https://www.saharaprinter.com/brands/brother/" },
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
  name: "Brother Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "Brother Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "Brother Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "brother printer uae, brother printer dubai, brother photocopier uae, brother dealer uae, brother office equipment",
  alternates: { canonical: "https://www.saharaprinter.com/brands/brother/" },
  openGraph: {
    title: "Brother Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/brother/",
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
