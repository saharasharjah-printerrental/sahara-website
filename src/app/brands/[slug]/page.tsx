export const runtime = 'edge';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandContentClient from "@/components/BrandContentClient";

const brandMeta: Record<string, { name: string; description: string; keywords: string }> = {
  kyocera: {
    name: "Kyocera",
    description: "Authorized Kyocera printer and photocopier dealer in UAE. ECOSYS technology for low TCO. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "kyocera printer uae, kyocera photocopier dubai, ecosys printer uae, kyocera dealer uae, kyocera copier sharjah",
  },
  brother: {
    name: "Brother",
    description: "Authorized Brother printer dealer in UAE. Wireless, cloud-ready, and enterprise printers. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "brother printer uae, brother printer dubai, brother photocopier uae, brother dealer uae, brother office equipment",
  },
  sharp: {
    name: "Sharp",
    description: "Authorized Sharp printer and photocopier dealer in UAE. Smart MFPs with Sharp OSA integration. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "sharp printer uae, sharp photocopier dubai, sharp mfp uae, sharp dealer uae, sharp copier sharjah",
  },
  epson: {
    name: "Epson",
    description: "Authorized Epson printer dealer in UAE. PrecisionCore inkjet and wide-format solutions. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "epson printer uae, epson printer dubai, wide format printer uae, epson dealer uae, epson plotter uae",
  },
  canon: {
    name: "Canon",
    description: "Authorized Canon printer and photocopier dealer in UAE. imageRUNNER ADVANCE and imageCLASS. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "canon printer uae, canon printer dubai, canon photocopier uae, canon imageRUNNER uae, canon dealer dubai",
  },
  hp: {
    name: "HP",
    description: "Authorized HP printer dealer in UAE. LaserJet Enterprise and PageWide solutions. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "hp printer uae, hp printer dubai, hp photocopier uae, laserjet uae, hp dealer uae",
  },
  ricoh: {
    name: "Ricoh",
    description: "Authorized Ricoh printer and photocopier dealer in UAE. Aficio and IM C series MFPs. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "ricoh printer uae, ricoh photocopier dubai, ricoh aficio uae, ricoh dealer uae, ricoh copier sharjah",
  },
  xerox: {
    name: "Xerox",
    description: "Authorized Xerox printer dealer in UAE. VersaLink and AltaLink enterprise MFPs. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "xerox printer uae, xerox printer dubai, xerox photocopier uae, versalink uae, xerox dealer uae",
  },
  samsung: {
    name: "Samsung",
    description: "Authorized Samsung printer dealer in UAE. ProXpress and MultiXpress enterprise printers. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "samsung printer uae, samsung printer dubai, samsung photocopier uae, samsung proXpress uae, samsung dealer uae",
  },
  lexmark: {
    name: "Lexmark",
    description: "Authorized Lexmark printer dealer in UAE. Managed Print Services and enterprise laser. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "lexmark printer uae, lexmark printer dubai, lexmark photocopier uae, lexmark dealer uae, lexmark copier sharjah",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandMeta[slug];

  if (!brand) {
    return { title: "Printer Brands UAE | Sahara Office Equipments" };
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.saharaprinter.com/products/" },
      { "@type": "ListItem", "position": 3, "name": `${brand.name} Printers`, "item": `https://www.saharaprinter.com/brands/${slug}/` },
    ],
  };

  return {
    title: `${brand.name} Printers UAE | Authorized Dealer | Sahara Office`,
    description: brand.description,
    keywords: brand.keywords,
    openGraph: {
      title: `${brand.name} Printers UAE | Authorized Dealer | Sahara`,
      description: brand.description,
      url: `https://www.saharaprinter.com/brands/${slug}/`,
      siteName: "Sahara Office Equipments",
      locale: "en_AE",
      type: "website",
    },
    alternates: { canonical: `https://www.saharaprinter.com/brands/${slug}/` },
    other: { "script:ld+json": JSON.stringify(schema) },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!brandMeta[slug]) notFound();
  return <BrandContentClient slug={slug} />;
}