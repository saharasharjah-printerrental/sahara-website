export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Sahara Office Equipments",
  description: "Delivery areas, timeframes, and fees for toner and spare parts orders placed with Sahara Office Equipments across the UAE.",
  openGraph: {
    title: "Shipping & Delivery Policy | Sahara Office Equipments",
    description: "Delivery areas, timeframes, and fees for online orders in the UAE.",
    url: "https://www.saharaprinter.com/shipping-delivery/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
  },
  alternates: { canonical: "https://www.saharaprinter.com/shipping-delivery/" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Shipping & Delivery", "item": "https://www.saharaprinter.com/shipping-delivery/" },
  ],
};

export default function ShippingDeliveryPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Policies</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Shipping &amp; Delivery</h1>
            <p className="text-lg text-[#d3c5b0] max-w-2xl">
              We deliver toner, drums, maintenance kits, and spare parts across all seven emirates from our Sharjah
              warehouse.
            </p>
          </div>
        </section>

        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto space-y-10 text-[#d3c5b0] leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Delivery areas &amp; timeframes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-slate-400">
                      <th className="py-2 pr-4">Emirate</th>
                      <th className="py-2">Typical delivery time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Dubai", "Same working day for orders placed before 1pm"],
                      ["Sharjah", "Same working day for orders placed before 1pm"],
                      ["Abu Dhabi", "Same working day for orders placed before 1pm"],
                      ["Ajman", "Next working day"],
                      ["Umm Al Quwain", "Next working day"],
                      ["Ras Al Khaimah", "Next working day"],
                      ["Fujairah / Al Ain", "1–2 working days"],
                    ].map(([em, t]) => (
                      <tr key={em} className="border-b border-white/5">
                        <td className="py-2 pr-4 text-white">{em}</td>
                        <td className="py-2">{t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Deliveries run Saturday–Thursday during business hours. Orders placed after 1pm, or on Fridays and
                public holidays, are processed the next working day.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Delivery fees</h2>
              <p>
                Standard delivery is <strong className="text-white">free of charge</strong> on all toner and spare
                parts orders across the UAE. There is no minimum order value.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Order tracking</h2>
              <p>
                You&apos;ll receive an email confirmation with your order reference as soon as your order is placed.
                For an update on an order in transit, contact our team with your order reference — we despatch by
                courier and can share tracking details on request.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Delivery issues</h2>
              <p>
                If a delivery is delayed, missing, or arrives damaged, contact us within 48 hours of the expected
                delivery date. See our{" "}
                <a href="/returns-refunds/" className="text-[#f5be53] hover:underline">Return &amp; Refund Policy</a>{" "}
                for how damaged or incorrect items are handled.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                Sahara Office Equipments Trading LLC — Al Arabi Building, Industrial Area 11, Sharjah, UAE. Phone{" "}
                <a href="tel:+971503823969" className="text-[#f5be53] hover:underline">+971 50 382 3969</a>, email{" "}
                <a href="mailto:info@saharaedoc.com" className="text-[#f5be53] hover:underline">info@saharaedoc.com</a>.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
