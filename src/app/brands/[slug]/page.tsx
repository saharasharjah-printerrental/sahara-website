export const runtime = 'edge';
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandContentClient from "@/components/BrandContentClient";

const brandMeta: Record<string, { name: string; description: string; keywords: string; faqs: { q: string; a: string }[] }> = {
  kyocera: {
    name: "Kyocera",
    description: "Authorized Kyocera printer and photocopier dealer in UAE. ECOSYS technology for low TCO. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "kyocera printer uae, kyocera photocopier dubai, ecosys printer uae, kyocera dealer uae, kyocera copier sharjah",
    faqs: [
      { q: "Where can I buy Kyocera printers in UAE?", a: "Sahara Office Equipments is an authorized Kyocera dealer in UAE. We supply Kyocera ECOSYS and TASKalfa models across Dubai, Sharjah, and Abu Dhabi with next-day delivery." },
      { q: "Does Sahara offer Kyocera printer rental in Dubai?", a: "Yes. Kyocera ECOSYS and TASKalfa printers are available on monthly rental from AED 250/month — zero deposit, free toner, and full AMC included." },
      { q: "Is Kyocera ECOSYS good for high-volume printing in UAE?", a: "Absolutely. Kyocera ECOSYS printers deliver the lowest cost-per-page of any brand in UAE — ideal for offices printing 5,000+ pages/month in Dubai and Sharjah." },
    ],
  },
  brother: {
    name: "Brother",
    description: "Authorized Brother printer dealer in UAE. Wireless, cloud-ready, and enterprise printers. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "brother printer uae, brother printer dubai, brother photocopier uae, brother dealer uae, brother office equipment",
    faqs: [
      { q: "Where to buy Brother printers in Dubai?", a: "Sahara Office Equipments stocks Brother MFC, DCP, and HL series in Dubai and Sharjah. Same-day delivery available with warranty and installation support." },
      { q: "Can I rent a Brother printer in UAE?", a: "Yes — Brother wireless printers are available on monthly rental plans from AED 250/month including free toner and on-site maintenance." },
      { q: "Do Brother printers work with UAE office networks?", a: "Yes. Brother MFC and HL series support Wi-Fi, Ethernet, cloud print (Google Drive, Dropbox), and are compatible with all UAE office network configurations." },
    ],
  },
  sharp: {
    name: "Sharp",
    description: "Authorized Sharp printer and photocopier dealer in UAE. Smart MFPs with Sharp OSA integration. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "sharp printer uae, sharp photocopier dubai, sharp mfp uae, sharp dealer uae, sharp copier sharjah",
    faqs: [
      { q: "Is Sahara an authorized Sharp dealer in UAE?", a: "Yes. Sahara Office Equipments is an authorized Sharp dealer in UAE, supplying Sharp MFPs with OSA integration for Dubai, Sharjah, and Abu Dhabi businesses." },
      { q: "What Sharp MFP models are available for rental in Dubai?", a: "Sharp A3 color and mono MFPs are available on monthly rental plans from AED 250/month with full AMC, free consumables, and on-site support." },
      { q: "What is Sharp OSA integration?", a: "Sharp Open Systems Architecture (OSA) allows Sharp MFPs to connect directly with business applications — ERP, DMS, and cloud systems — for seamless document workflow." },
    ],
  },
  epson: {
    name: "Epson",
    description: "Authorized Epson printer dealer in UAE. PrecisionCore inkjet and wide-format solutions. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "epson printer uae, epson printer dubai, wide format printer uae, epson dealer uae, epson ecotank uae",
    faqs: [
      { q: "Where can I buy Epson printers in UAE?", a: "Sahara Office Equipments stocks Epson EcoTank, WorkForce, and wide-format printers in Dubai and Sharjah with same-day delivery and installation." },
      { q: "Does Sahara supply Epson EcoTank printers in Dubai?", a: "Yes. Epson EcoTank models offer ultra-low cost-per-page with refillable tanks — ideal for high-volume colour printing in UAE offices and studios." },
      { q: "Are Epson wide-format printers available for rent in UAE?", a: "Yes. Epson wide-format and EcoTank printers are available for short-term and long-term rental in UAE, with maintenance included." },
    ],
  },
  canon: {
    name: "Canon",
    description: "Authorized Canon printer and photocopier dealer in UAE. imageRUNNER ADVANCE and imageCLASS. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "canon printer uae, canon printer dubai, canon photocopier uae, canon imageRUNNER uae, canon dealer dubai",
    faqs: [
      { q: "Is Sahara an authorized Canon dealer in UAE?", a: "Yes. Sahara Office Equipments is an authorized Canon dealer in UAE, supplying Canon imageRUNNER ADVANCE and imageCLASS printers to businesses in Dubai, Sharjah, and Abu Dhabi." },
      { q: "Can I rent a Canon photocopier in Dubai?", a: "Yes. Canon imageRUNNER A3 and A4 models are available on monthly rental from AED 250/month — zero deposit, free Canon toner, and full on-site maintenance included." },
      { q: "What Canon printers are best for large offices in UAE?", a: "For high-volume offices (10,000+ pages/month), the Canon imageRUNNER ADVANCE DX series offers 50–105 ppm output with full colour scanning, finishing, and network security." },
    ],
  },
  hp: {
    name: "HP",
    description: "Authorized HP printer dealer and HP Service Center in UAE. LaserJet Enterprise and PageWide solutions. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "hp printer uae, hp printer dubai, hp service center dubai, hp service center in dubai, hp service center near me, laserjet uae, hp dealer uae",
    faqs: [
      { q: "Is Sahara an HP Service Center in Dubai?", a: "Sahara Office Equipments is an authorized HP service partner in Dubai, providing HP warranty repairs, genuine HP toner supplies, and enterprise LaserJet support across UAE." },
      { q: "Where is the HP Service Center near me in Dubai?", a: "Sahara serves all Dubai districts — Business Bay, JAFZA, Deira, Al Quoz, DIFC, and more. Call +971503823969 and a certified HP engineer reaches you within 4 hours." },
      { q: "Can I rent an HP LaserJet in UAE?", a: "Yes. HP LaserJet Enterprise printers are available on monthly rental from AED 250/month with free HP toner, on-site service, and zero deposit." },
      { q: "How do I get HP printer repair in Dubai?", a: "Call or WhatsApp Sahara at +971503823969. Our HP-certified technician will visit your office within 4 hours to diagnose and repair your HP printer on-site." },
    ],
  },
  ricoh: {
    name: "Ricoh",
    description: "Authorized Ricoh printer and photocopier dealer in UAE. Aficio and IM C series MFPs. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "ricoh printer uae, ricoh photocopier dubai, ricoh aficio uae, ricoh dealer uae, ricoh copier sharjah",
    faqs: [
      { q: "Where can I buy Ricoh printers in UAE?", a: "Sahara Office Equipments is an authorized Ricoh dealer in UAE, supplying Ricoh IM C series and MP series MFPs across Dubai, Sharjah, and Abu Dhabi." },
      { q: "Is Ricoh good for high-volume printing in Dubai offices?", a: "Yes. Ricoh IM C series color MFPs are built for 20,000–50,000 pages/month and are ideal for large corporate offices and government entities in UAE." },
      { q: "Does Sahara provide Ricoh AMC in Dubai?", a: "Yes. Ricoh Annual Maintenance Contracts from Sahara include unlimited service visits, OEM parts, and toner supply — with 4-hour emergency response across UAE." },
    ],
  },
  xerox: {
    name: "Xerox",
    description: "Authorized Xerox printer dealer in UAE. VersaLink and AltaLink enterprise MFPs. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "xerox printer uae, xerox printer dubai, xerox photocopier uae, versalink uae, xerox dealer uae",
    faqs: [
      { q: "Is Sahara an authorized Xerox dealer in UAE?", a: "Yes. Sahara Office Equipments supplies Xerox VersaLink and AltaLink enterprise MFPs to businesses in Dubai, Sharjah, Abu Dhabi, and across UAE." },
      { q: "Can I rent a Xerox photocopier in Dubai?", a: "Yes. Xerox VersaLink and AltaLink models are available on monthly rental from AED 250/month with zero deposit, free Xerox toner, and full on-site AMC." },
      { q: "What is the difference between Xerox VersaLink and AltaLink?", a: "VersaLink is designed for small-to-mid-size offices (up to 6,500 pages/month), while AltaLink handles enterprise workgroups at 20,000–30,000 pages/month — both available from Sahara UAE." },
    ],
  },
  samsung: {
    name: "Samsung",
    description: "Authorized Samsung printer dealer in UAE. ProXpress and MultiXpress enterprise printers. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "samsung printer uae, samsung printer dubai, samsung photocopier uae, samsung proXpress uae, samsung dealer uae",
    faqs: [
      { q: "Where to buy Samsung printers in Dubai?", a: "Sahara Office Equipments stocks Samsung ProXpress and MultiXpress printers in UAE with same-day delivery, installation, and warranty support in Dubai and Sharjah." },
      { q: "Are Samsung printers available for rental in UAE?", a: "Yes. Samsung ProXpress models are available on monthly rental plans from AED 250/month with free toner and on-site maintenance." },
      { q: "Can Sahara repair Samsung printers in Dubai?", a: "Yes. Our certified technicians service all Samsung ProXpress and MultiXpress models with OEM parts and a 30-day workmanship warranty." },
    ],
  },
  lexmark: {
    name: "Lexmark",
    description: "Authorized Lexmark printer dealer in UAE. Managed Print Services and enterprise laser. Sales, rental, and support. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "lexmark printer uae, lexmark printer dubai, lexmark photocopier uae, lexmark dealer uae, lexmark copier sharjah",
    faqs: [
      { q: "Is Sahara an authorized Lexmark dealer in UAE?", a: "Yes. Sahara Office Equipments supplies Lexmark enterprise laser printers and MPS solutions to businesses across Dubai, Sharjah, and Abu Dhabi." },
      { q: "Does Sahara provide Lexmark Managed Print Services in UAE?", a: "Yes. Sahara's Lexmark MPS program covers fleet assessment, device consolidation, automated toner replenishment, and on-site technician support across UAE." },
      { q: "Can I rent a Lexmark printer in Dubai?", a: "Yes. Lexmark enterprise laser printers are available on monthly rental from AED 250/month with zero deposit, OEM supplies, and full maintenance." },
    ],
  },
  "konica-minolta": {
    name: "Konica Minolta",
    description: "Authorized Konica Minolta printer and photocopier dealer in UAE. bizhub A3/A4 MFPs for high-volume offices. Sales, rental, and AMC. Dubai, Abu Dhabi, Sharjah. ☎ +971503823969",
    keywords: "konica minolta uae, konica minolta printer dubai, bizhub uae, konica minolta photocopier uae, konica minolta dealer uae, konica minolta copier sharjah",
    faqs: [
      { q: "Is Sahara an authorized Konica Minolta dealer in UAE?", a: "Yes. Sahara Office Equipments supplies Konica Minolta bizhub MFPs to businesses across Dubai, Sharjah, and Abu Dhabi, with sales, rental, and AMC support." },
      { q: "Can I rent a Konica Minolta photocopier in Dubai?", a: "Yes. Konica Minolta bizhub A3 colour and mono MFPs are available on monthly rental from AED 250/month — zero deposit, free toner, and full on-site maintenance included." },
      { q: "Is Konica Minolta bizhub good for high-volume printing in UAE?", a: "Yes. Konica Minolta bizhub series MFPs are built for 20,000–50,000 pages/month, making them ideal for large corporate offices and print rooms across UAE." },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandMeta[slug];

  if (!brand) {
    return { title: "Printer Brands UAE | Sahara Office Equipments" };
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://www.saharaprinter.com/products/" },
      { "@type": "ListItem", "position": 3, "name": `${brand.name} Printers UAE`, "item": `https://www.saharaprinter.com/brands/${slug}/` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": brand.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${brand.name} Printer Sales, Rental & AMC UAE`,
    "description": brand.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sahara Office Equipments",
      "telephone": "+971503823969",
      "url": "https://www.saharaprinter.com/",
      "areaServed": ["Dubai", "Sharjah", "Abu Dhabi", "Ajman", "Ras Al Khaimah"],
    },
    "serviceType": `${brand.name} Printer Dealer UAE`,
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
    other: {
      "script:ld+json": [
        JSON.stringify(breadcrumbSchema),
        JSON.stringify(faqSchema),
        JSON.stringify(serviceSchema),
      ] as string[],
    },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = brandMeta[slug];
  if (!brand) notFound();
  return <BrandContentClient slug={slug} brandFaqs={brand.faqs} />;
}