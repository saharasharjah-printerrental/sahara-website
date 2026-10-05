import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getQuoteService } from "@/lib/quote-services";
import ServiceQuoteForm from "@/components/ServiceQuoteForm";

export const runtime = "edge";
type Props = { params: Promise<{ service: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getQuoteService((await params).service);
  if (!service) return {};
  return { title: `${service.name} Quote | Sahara`, description: service.summary, robots: { index: false, follow: true }, alternates: { canonical: `https://www.saharaprinter.com/quote/${service.slug}/` } };
}

export default async function ServiceQuotePage({ params, searchParams }: Props) {
  const service = getQuoteService((await params).service);
  if (!service) notFound();
  const query = await searchParams;
  const context = typeof query.context === "string" ? query.context.slice(0, 200) : "";
  return <><Header /><main className="min-h-screen bg-surface px-5 pb-24 pt-32"><div className="mx-auto max-w-4xl">
    <a href="/quote/" className="text-sm text-primary underline">All services</a>
    <h1 className="mt-4 text-3xl font-bold text-white">{service.name} Quote</h1>
    <p className="mt-3 max-w-2xl leading-relaxed text-muted">{service.summary}</p>
    <ServiceQuoteForm key={service.slug} service={service} initialDetails={context} />
  </div></main><Footer /></>;
}
