import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { quoteServices } from "@/lib/quote-services";
import { ArrowForward } from "@mui/icons-material";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Get a Quote | Sahara Office Equipments",
  description: "Request a tailored quote for printer rental, shredders, PVC card printers, card printing, repairs and maintenance in the UAE.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.saharaprinter.com/quote/" },
};

export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const context = typeof query.brand === "string" ? `Brand: ${query.brand.slice(0, 100)}` : typeof query.product === "string" ? `Product: ${query.product.slice(0, 150)}` : "";
  const contextQuery = context ? `?context=${encodeURIComponent(context)}` : "";
  return <><Header /><main className="min-h-screen bg-surface px-5 pb-24 pt-32">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-bold text-white">Get a Quote</h1>
      <p className="mt-3 text-muted">Which service do you need?</p>
      {context && <p className="mt-2 text-sm text-primary">{context}</p>}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quoteServices.map((service) => <Link key={service.slug} href={`/quote/${service.slug}/${contextQuery}`} className="flex min-h-20 items-center justify-between gap-4 rounded-lg border border-white/15 bg-surface-low p-5 font-semibold text-white hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{service.name}<ArrowForward fontSize="small" className="shrink-0 text-primary" /></Link>)}
        <Link href="/request-quote/" className="flex min-h-20 items-center justify-between gap-4 rounded-lg border border-white/15 bg-surface-low p-5 font-semibold text-white hover:border-primary">Toner &amp; Spare Parts<ArrowForward fontSize="small" className="shrink-0 text-primary" /></Link>
      </div>
      <p className="mt-8 text-sm text-muted">Serving around 1,500 customers. <Link href="/our-clients/" className="text-primary underline">Meet our clients</Link></p>
    </div>
  </main><Footer /></>;
}
