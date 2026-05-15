export const runtime = 'edge';
import type { Metadata } from "next";
import ProductsClient from "@/components/ProductsClient";

export const metadata: Metadata = {
  title: "Printer Products UAE | Canon, HP, Kyocera, Xerox | Sahara Office",
  description: "Browse industrial-grade printers and photocopiers for rent in Dubai & UAE. Canon imageRUNNER, HP LaserJet, Kyocera TASKalfa, Xerox AltaLink. New & refurbished options from AED 300/month.",
  keywords: "printer products uae, photocopier sale dubai, office printer Canon HP Kyocera Xerox, buy printer uae, multifunction printer rental",
  openGraph: {
    title: "Printer Products UAE | Canon, HP, Kyocera, Xerox",
    description: "Browse industrial-grade printers and photocopiers for rent in Dubai & UAE. Canon imageRUNNER, HP LaserJet, Kyocera TASKalfa from AED 300/month.",
    url: "https://www.saharaprinter.com/products/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/products/",
  },
};

export default function ProductsPage() {
  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Printer Products - Sahara Office Equipments",
    description: "Industrial-grade printers and photocopiers available for rent and sale in UAE.",
    url: "https://www.saharaprinter.com/products/",
    numberOfItems: 12,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Canon imageRUNNER ADVANCE C5500", url: "https://www.saharaprinter.com/products/" },
      { "@type": "ListItem", position: 2, name: "HP LaserJet Managed E82560", url: "https://www.saharaprinter.com/products/" },
      { "@type": "ListItem", position: 3, name: "Kyocera TASKalfa 6003i", url: "https://www.saharaprinter.com/products/" },
      { "@type": "ListItem", position: 4, name: "Xerox AltaLink C8170", url: "https://www.saharaprinter.com/products/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />
      <ProductsClient />
    </>
  );
}