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
 *
 * @type must match the layout's organizationSchema even though this node
 * only carries aggregateRating — Search Console's Review-snippets validator
 * flags a JSON-LD node with no declared @type as "Invalid object type for
 * field '<parent_node>'" even when it merges into a typed Organization node
 * elsewhere via @id (GSC issue reported 2026-08-27).
 *
 * `name` is required too — a rating fragment with @type/@id but no name is
 * not a valid reviewed item on its own, and it's what GSC was actually
 * flagging (the parent node it couldn't identify). See src/app/layout.tsx
 * for the matching fix that strips any aggregateRating out of the
 * admin-stored organizationSchema override, which was emitting a second,
 * conflicting, un-@id'd rating node on every page.
 */
export default async function OrganizationRating() {
  const { rating, reviewCount } = await getGoogleReviewsData();
  if (!rating || !reviewCount) return null;

  const node = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": "https://www.saharaprinter.com/#organization",
    name: "Sahara Office Equipments",
    url: "https://www.saharaprinter.com/",
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
