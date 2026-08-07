const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=";

export default function GoogleReviewsBadge({
  rating,
  reviewCount,
  placeId = "",
  className = "",
}: {
  rating: number;
  reviewCount: number;
  placeId?: string;
  className?: string;
}) {
  const href = placeId ? `${GOOGLE_REVIEW_URL}${placeId}` : "https://www.google.com/maps/place/?q=place_id:";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <span className="text-[#f5be53]">★</span>
      <span className="font-bold text-white">{rating.toFixed(1)}</span>
      <span className="text-slate-400">·</span>
      <span className="text-slate-300">{reviewCount} Google reviews</span>
    </a>
  );
}
