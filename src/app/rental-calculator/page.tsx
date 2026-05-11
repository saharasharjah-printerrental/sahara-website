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
  },
  alternates: {
    canonical: "https://www.saharaprinter.com/rental-calculator/",
  },
};

export default function RentalCalculatorPage() {
  return <CalculatorClient />;
}