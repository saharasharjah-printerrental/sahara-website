export const runtime = 'edge';
import type { Metadata } from "next";
import RequestQuoteClient from "./RequestQuoteClient";

export const metadata: Metadata = {
  title: "Request a Quote | Spare Parts & Toner | Sahara Office Equipments",
  description: "Request a priced quotation for toner, drums, and printer spare parts in UAE. Our team confirms pricing and availability the same working day.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.saharaprinter.com/request-quote/" },
};

export default function RequestQuotePage() {
  return <RequestQuoteClient />;
}
