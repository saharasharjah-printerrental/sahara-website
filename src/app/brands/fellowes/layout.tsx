import type { Metadata } from "next";
import { orgRef } from "@/lib/brand";

const faqs = [
  { q: "Where can I buy Fellowes shredders in Dubai?", a: "Sahara Office Equipments is an authorized Fellowes supplier in Dubai and UAE, stocking Fellowes Powershred cross-cut shredders for personal, office, and departmental use — with free delivery and setup across Dubai, Sharjah, and Abu Dhabi." },
  { q: "Can I rent a Fellowes shredder in UAE?", a: "Yes. Fellowes Powershred shredders are available on monthly rental from AED 150/month for the LX65 light-office model and from AED 300/month for the 325Ci departmental model — free delivery, setup, and maintenance included." },
  { q: "Are Fellowes shredders compliant with UAE data protection law?", a: "Yes. Sahara's Fellowes Powershred cross-cut shredders are DIN P-4 rated — the security level recommended for confidential documents under the UAE Personal Data Protection Law (PDPL Federal Decree-Law No. 45 of 2021)." },
];

const description = "Authorized Fellowes supplier in Dubai & UAE. Fellowes Powershred DIN P-4 cross-cut shredders — buy from AED 800 or rent from AED 150/month. Dubai, Sharjah, Abu Dhabi. ☎ +971503823969";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.saharaprinter.com/" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.saharaprinter.com/products/" },
    { "@type": "ListItem", position: 3, name: "Fellowes Shredders UAE", item: "https://www.saharaprinter.com/brands/fellowes/" },
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
  name: "Fellowes Shredder Sales & Rental UAE",
  description,
  provider: orgRef(),
  areaServed: ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
  serviceType: "Fellowes Shredder Supplier UAE",
};

export const metadata: Metadata = {
  title: "Fellowes Shredders Dubai & UAE | Supplier & Dealer | Sahara",
  description,
  keywords: "fellowes shredders dubai, fellowes supplier dubai, fellowes dubai, fellowes powershred uae, paper shredder brand dubai, buy fellowes shredder uae, fellowes shredder dealer",
  alternates: { canonical: "https://www.saharaprinter.com/brands/fellowes/" },
  openGraph: {
    title: "Fellowes Shredders Dubai & UAE | Supplier & Dealer | Sahara",
    description,
    url: "https://www.saharaprinter.com/brands/fellowes/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/shredder-fellowes-325ci.webp",
        width: 1200,
        height: 630,
        alt: "Fellowes Powershred shredders Dubai & UAE — Sahara Office Equipments",
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
