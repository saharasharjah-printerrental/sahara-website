import { getGoogleReviewsData } from "@/lib/google-reviews";

/**
 * Emits the live Google aggregateRating as a separate JSON-LD node that
 * references the Organization by @id, so Google merges it into the global
 * Organization block emitted by the root layout.
 *
 * Why it lives here rather than in the layout: Google treats a site-wide
 * business rating as self-serving and structured-data-policy-ineligible, so
 * the rating belongs only on pages where the business itself is the subject
 * (the homepage and /about).
 *
 * Detecting the current path in the root layout would need headers(), which
 * forces Next to render the internal /_not-found route under the nodejs
 * runtime — @cloudflare/next-on-pages rejects that, and it broke every
 * Cloudflare Pages build between 2026-08-07 and 2026-08-13. Opting in per
 * page avoids the problem entirely.
 */
export default async function OrganizationRating() {
  const { rating, reviewCount } = await getGoogleReviewsData();
  if (!rating || !reviewCount) return null;

  const node = {
    "@context": "https://schema.org",
    "@id": "https://www.saharaprinter.com/#organization",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return <script type="application/ld+json">{JSON.stringify(node)}</script>;
}
