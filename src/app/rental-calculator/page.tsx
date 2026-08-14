export const runtime = 'edge';
import type { Metadata } from "next";
import CalculatorClient from "@/components/CalculatorClient";

export const metadata: Metadata = {
  title: "Printer Rental Calculator | Instant Quote | Sahara Printer Dubai",
  description: "Configure your exact printer rental requirements and get an instant personalized quote. Free maintenance, toner & support included. Starting at AED 350/month.",
  keywords: ["printer rental calculator", "printer lease calculator", "rental pricing tool", "printer cost calculator UAE", "printer rental quote Dubai"],
  openGraph: {
    title: "Printer Rental Calculator | Instant Quote | Sahara Printer",
    description: "Configure your exact printer rental requirements and get an instant personalized quote. Free maintenance, toner & support included.",
    url: "https://www.saharaprinter.com/rental-calculator/",
    siteName: "Sahara Printer",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Printer Rental Calculator — Sahara Office Equipments",
      },
    ],
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/rental-calculator/",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Rental Calculator", "item": "https://www.saharaprinter.com/rental-calculator/" },
  ],
};

export default function RentalCalculatorPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <CalculatorClient />
    </>
  );
}