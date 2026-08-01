import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Canon Printer Dubai | Rental, Sales & Service | Sahara",
  description: "Canon imageRUNNER & imageCLASS printers in Dubai. Rent from AED 250/mo — includes free toner, maintenance & 4-hr emergency response. Serving Business Bay, JLT, Deira & all Dubai. ☎ +971503823969",
  alternates: { canonical: "https://www.saharaprinter.com/canon-printer-dubai/" },
  openGraph: {
    title: "Canon Printer Dubai | Rental & Service | Sahara Office",
    description: "Canon imageRUNNER & imageCLASS printers in Dubai from AED 250/mo. Zero deposit, free toner, 4-hr response. Canon Authorized Service.",
    url: "https://www.saharaprinter.com/canon-printer-dubai/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
