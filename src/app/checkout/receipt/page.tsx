export const runtime = 'edge';
import type { Metadata } from "next";
import { Suspense } from "react";
import ReceiptClient from "./ReceiptClient";

export const metadata: Metadata = {
  title: "Order Receipt | Sahara Office Equipments",
  description: "View and print your Sahara Office Equipments order receipt.",
  robots: { index: false, follow: false },
};

export default function ReceiptPage() {
  return (
    <Suspense fallback={null}>
      <ReceiptClient />
    </Suspense>
  );
}
