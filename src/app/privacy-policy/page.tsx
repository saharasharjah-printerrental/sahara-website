export const runtime = 'edge';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Sahara Office Equipments",
  description: "How Sahara Office Equipments collects, uses, and protects personal data submitted through saharaprinter.com, in line with UAE PDPL.",
  openGraph: {
    title: "Privacy Policy | Sahara Office Equipments",
    description: "How Sahara Office Equipments collects, uses, and protects personal data.",
    url: "https://www.saharaprinter.com/privacy-policy/",
    siteName: "Sahara Office Equipments",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/heroPrntr1.webp",
        width: 1200,
        height: 630,
        alt: "Privacy Policy — Sahara Office Equipments",
      },
    ],
  },
  alternates: { canonical: "https://www.saharaprinter.com/privacy-policy/" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.saharaprinter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.saharaprinter.com/privacy-policy/" },
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <main className="min-h-screen bg-[#071325]">
        <Header />

        <section className="relative pt-32 pb-16 px-8 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071325] via-[#071325] to-[#101c2e]" />
          <div className="max-w-4xl mx-auto relative z-10">
            <span className="text-[#f5be53] font-bold tracking-[0.2em] uppercase text-sm">Policies</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">Privacy Policy</h1>
            <p className="text-lg text-[#d3c5b0] max-w-2xl">
              This policy explains what personal data we collect through saharaprinter.com, why, and how we protect
              it, in line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021).
            </p>
          </div>
        </section>

        <section className="py-16 px-8 lg:px-24">
          <div className="max-w-3xl mx-auto space-y-10 text-[#d3c5b0] leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data we collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact details you submit via forms: name, email, phone, company, delivery address</li>
                <li>Order and quote history, including items requested and pricing discussed</li>
                <li>Payment confirmation data from our payment processor (we do not store full card numbers)</li>
                <li>Basic site usage analytics (pages viewed, device type) via our analytics tools</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How we use it</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To process orders, quotations, and deliveries</li>
                <li>To respond to enquiries and provide customer support</li>
                <li>To send order confirmations, delivery updates, and service reminders</li>
                <li>To improve our website and service based on aggregate usage patterns</li>
              </ul>
              <p className="mt-3">We do not sell your personal data to third parties.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Who we share it with</h2>
              <p>
                We share order and delivery data only with the parties needed to fulfil it: our payment gateway
                provider (Stripe or PayTabs, depending on the method you choose), and our delivery couriers. These
                providers are contractually required to protect your data and use it only for that purpose.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data retention</h2>
              <p>
                We retain order and enquiry records for as long as needed to fulfil the order, meet accounting and
                tax obligations under UAE law, and resolve any dispute, after which they are deleted or anonymised.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Your rights</h2>
              <p>
                Under the UAE PDPL, you can request access to, correction of, or deletion of your personal data held
                by us. To make a request, email{" "}
                <a href="mailto:info@saharaedoc.com" className="text-[#f5be53] hover:underline">info@saharaedoc.com</a>{" "}
                with your name and order reference where applicable. We respond within a reasonable time as required
                by law.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
              <p>
                We use cookies and similar technologies for essential site functions (such as keeping items in your
                cart) and for analytics to understand how the site is used. You can control cookies through your
                browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
              <p>
                Sahara Office Equipments Trading LLC — Al Arabi Building, Industrial Area 11, Sharjah, UAE. Privacy
                queries: <a href="mailto:info@saharaedoc.com" className="text-[#f5be53] hover:underline">info@saharaedoc.com</a>{" "}
                or <a href="tel:+971503823969" className="text-[#f5be53] hover:underline">+971 50 382 3969</a>.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
