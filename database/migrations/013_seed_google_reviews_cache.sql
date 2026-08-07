-- Migration 013: Bootstrap a live-updating Google reviews cache
-- Replaces the hardcoded/conflicting 4.9-star / 150-review schema claim with a
-- self-healing D1-cached value. Seeded with the real GBP figures confirmed
-- 2026-08-07 (5.0 stars, 69 reviews). /api/google-reviews refreshes this row
-- from the Google Places API once GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are
-- set — until then, every reader falls back to this seed.
INSERT OR IGNORE INTO settings (key, value) VALUES
('google_reviews_cache', '{"rating":5.0,"reviewCount":69,"lastFetched":"2026-08-07T00:00:00.000Z","source":"seed"}');
