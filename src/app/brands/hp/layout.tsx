import type { Metadata } from "next";

const faqs = [
  { q: "Is Sahara an HP Service Center in Dubai?", a: "Sahara Office Equipments is an authorized HP service partner in Dubai, providing HP warranty repairs, genuine HP toner supplies, and enterprise LaserJet support across UAE." },
  { q: "Where is the HP Service Center near me in Dubai?", a: "Sahara serves all Dubai districts — Business Bay, JAFZA, Deira, Al Quoz, DIFC, and more. Call +971503823969 and a certified HP engineer reaches you within 4 hours." },
  { q: "Can I rent an HP LaserJet in UAE?", a: "Yes. HP LaserJet Enterprise printers are available on monthly rental from AED 250/month with free HP toner, on-site service, and zero deposit." },
  { q: "How do I get HP printer repair in Dubai?", a: "Call or WhatsApp Sahara at +971503823969. Our HP-certified technician will visit your office within 4 hours to diagnose and repair your HP printer on-site." },
];

const description = "Authorized HP printer dealer and HP Service Center in UAE. LaserJet Enterprise and PageWide solutions. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Printer Brands", item: "https://www.saharaprinter.com/brands/" },
    { "@type": "ListItem", position: 3, name: "HP Printers UAE", item: "https://www.saharaprinter.com/brands/hp/" },
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
  name: "HP Printer Sales, Rental & AMC UAE",
  description,
  provider: {
    "@type": "LocalBusiness",
    name: "Sahara Office Equipments",
    telephone: "+971503823969",
    url: "https://www.saharaprinter.com/",
    areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  },
  serviceType: "HP Printer Dealer UAE",
};

export const metadata: Metadata = {
  title: "HP Printers UAE | Authorized Dealer | Sahara Office",
  description,
  keywords: "hp printer uae, hp printer dubai, hp service center dubai, hp service center in dubai, hp service center near me, laserjet uae, hp dealer uae",
  alternates: { canonical: "https://www.saharaprinter.com/brands/hp/" },
  openGraph: {
    title: "HP Printers UAE | Authorized Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/hp/",
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
