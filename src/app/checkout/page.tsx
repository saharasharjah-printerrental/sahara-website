export const runtime = 'edge';
import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Sahara Office Equipments",
  description: "Complete your spare parts & toner order with delivery across the UAE.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.saharaprinter.com/checkout/" },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
