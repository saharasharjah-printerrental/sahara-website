import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/BlogPostClient";

const blogPostMeta: Record<string, { title: string; description: string; keywords: string }> = {
  "how-to-choose-the-best-printer-rental-dubai-service": {
    title: "How to Choose the Best Printer Rental Dubai Service? | Sahara",
    description: "Start your search for printer rental Dubai with a quick audit you can finish this afternoon. Expert tips on evaluating rental providers, equipment quality, and service SLAs.",
    keywords: "printer rental dubai, best printer rental service, office printer rental uae, photocopier rental dubai",
  },
  "the-problem-we-solve": {
    title: "The Problem We Solve | Printer Rental UAE",
    description: "In any office, the sudden breakdown of a document printer or copier creates a cascade of problems. Learn how Sahara Office Equipments solves these pain points.",
    keywords: "printer breakdown office, copier problems uae, printer downtime business, office printing issues",
  },
  "what-a-copier-rental-service-must-deliver-to-a-client": {
    title: "What a Copier Rental Service Must Deliver to a Client | Sahara",
    description: "A successful copier rental service is defined not just by the equipment it provides, but by the quality of service it delivers. Know what to look for.",
    keywords: "copier rental service uae, photocopier rental quality, copier service delivery, office equipment rental",
  },
  "why-a-company-chooses-copier-rental-service-over-buying-a-copier": {
    title: "Why a Company Chooses Copier Rental Over Buying | Sahara",
    description: "A company's decision to rent a copier instead of buying one is about far more than just the initial investment. Discover the financial and operational benefits.",
    keywords: "copier rental vs buying, rent photocopier uae, copier lease benefits, office equipment finance",
  },
  "total-cost-of-printer-ownership": {
    title: "Total Cost of Printer Ownership vs Rental | Sahara UAE",
    description: "While the initial purchase price of a copier may seem affordable, the true cost of ownership is often much higher than a rental agreement. Read the analysis.",
    keywords: "total cost printer ownership, printer tco uae, printer rental cost benefit, office printing expenses",
  },
  "video-walkthrough-solving-canon-printer-problems": {
    title: "Video Walkthrough: Solving Canon Printer Problems | Sahara",
    description: "This video tutorial guides you through practical steps to troubleshoot common Canon printer issues such as paper jams, connection errors, and ink problems.",
    keywords: "canon printer troubleshooting, canon printer problems, canon printer fix, canon error solutions",
  },
  "the-hidden-cost-of-your-office-copier": {
    title: "The Hidden Cost of Your Office Copier | Sahara UAE",
    description: "Our competitors may offer a cheaper initial price, but this often comes at the expense of hidden costs. Learn what to watch out for when choosing a provider.",
    keywords: "hidden copier costs, copier pricing trap, office copier expense, photocopier total cost",
  },
  "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental": {
    title: "How Dubai Companies Save Budget with Printer Rental | Sahara",
    description: "Dubai's dynamic business environment demands efficiency and cost-effectiveness. Companies are optimizing operations by choosing value-driven printer rental.",
    keywords: "dubai printer rental budget, save money printer dubai, office printing cost uae, printer rental value",
  },
  "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025": {
    title: "Why Every UAE Business is Renting Printers in 2025 | Sahara",
    description: "Even the most glamorous Dubai real estate offices and high-tech clinics have one thing in common—no one actually owns their printers anymore. Here's why.",
    keywords: "printer rental uae 2025, business printing trends uae, flexible office printing, printers as a service uae",
  },
  "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business": {
    title: "Rent or Buy Your Office Printer? Smart Choices | Sahara UAE",
    description: "Every business owner knows that big decisions, and even the seemingly small ones, can really impact your wallet. Here's how to decide between rental and purchase.",
    keywords: "rent or buy printer, office printer decision, printer purchase vs rental, business printer choice",
  },
  "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits": {
    title: "Stop Wasting Money on Printing | Smarter Office Habits | Sahara",
    description: "Does your business constantly track every penny, yet somehow printing costs just fly under the radar? You're not alone. Learn how to reduce printing waste.",
    keywords: "reduce printing costs, office printing waste, save money printing, printing efficiency office",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = blogPostMeta[slug]?.title ?? "Blog | Sahara Office Equipments";
  const description = blogPostMeta[slug]?.description ?? "Expert insights on printer rental, office equipment, and printing solutions in the UAE from Sahara Office Equipments.";
  const keywords = blogPostMeta[slug]?.keywords ?? "printer rental uae, office equipment dubai, photocopier uae, business printing";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.saharaprinter.com/blogs/${slug}/`,
      siteName: "Sahara Office Equipments",
      locale: "en_AE",
      type: "article",
    },
    alternates: { canonical: `https://www.saharaprinter.com/blogs/${slug}/` },
  };
}

const VALID_SLUGS = [
  "how-to-choose-the-best-printer-rental-dubai-service",
  "the-problem-we-solve",
  "what-a-copier-rental-service-must-deliver-to-a-client",
  "why-a-company-chooses-copier-rental-service-over-buying-a-copier",
  "total-cost-of-printer-ownership",
  "video-walkthrough-solving-canon-printer-problems",
  "the-hidden-cost-of-your-office-copier",
  "how-dubai-companies-save-budget-by-choosing-value-driven-printer-rental",
  "real-estate-to-clinics-why-every-uae-business-is-renting-printers-in-2025",
  "rent-or-buy-your-office-printer-lets-talk-smart-choices-for-your-business",
  "stop-wasting-money-on-printing-your-guide-to-smarter-office-habits",
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();
  return <BlogPostClient slug={slug} />;
}