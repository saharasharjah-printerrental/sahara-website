"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderReceipt, { ReceiptOrder } from "@/components/OrderReceipt";

export default function ReceiptClient() {
  const params = useSearchParams();
  const ref = params.get("ref") || "";
  const [order, setOrder] = useState<ReceiptOrder | null>(null);
  const [state, setState] = useState<"loading" | "found" | "missing">("loading");

  useEffect(() => {
    if (!ref) { setState("missing"); return; }
    fetch(`/api/orders/?ref=${encodeURIComponent(ref)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.order) { setOrder(d.order); setState("found"); }
        else setState("missing");
      })
      .catch(() => setState("missing"));
  }, [ref]);

  return (
    <main className="min-h-screen bg-[#071325]">
      <Header />
      <section className="pt-32 pb-20 px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {state === "loading" && <p className="text-slate-400 text-center py-20">Loading receipt…</p>}
          {state === "missing" && (
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-white mb-3">Receipt not found</h1>
              <p className="text-slate-400 mb-8">We couldn&apos;t find an order for that reference.</p>
              <a href="/services/printer-spare-parts/" className="bg-gradient-to-r from-[#f5be53] to-[#c8962e] text-[#412d00] px-8 py-3 rounded-xl font-bold inline-block hover:scale-[1.02] transition-transform">
                Browse Spare Parts
              </a>
            </div>
          )}
          {state === "found" && order && (
            <>
              <h1 className="no-print text-3xl font-bold text-white mb-8 text-center">Order {order.ref}</h1>
              <OrderReceipt order={order} />
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
