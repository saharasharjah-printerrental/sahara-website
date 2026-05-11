import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Printer & Copier Sales UAE | Authorized Dealer | Sahara",
  description: "Buy enterprise printers and photocopiers from authorized UAE distributors. HP, Canon, Ricoh, Xerox. Full warranty, installation support, and trade-in available. ☎ +971503823969",
  keywords: "buy printer uae, photocopier sales dubai, enterprise printer purchase, canon printer uae, hp printer uae, ricoh copier uae",
  openGraph: {
    title: "Buy Printers & Copiers UAE | Sahara Office Equipments",
    description: "Purchase enterprise-grade printers and photocopiers from authorized UAE distributors. Full warranty, installation, and trade-in programs.",
    url: "https://www.saharaprinter.com/services/sales/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/services/sales/" },
};

export default function SalesPage() {
  redirect("/products");
}