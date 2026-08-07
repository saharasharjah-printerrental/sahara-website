import { getRequestContext } from "@cloudflare/next-on-pages";

export interface GoogleReviewsData {
  rating: number;
  reviewCount: number;
  lastFetched: string;
  source: "live" | "fallback" | "seed";
}

const FALLBACK: GoogleReviewsData = {
  rating: 5.0,
  reviewCount: 69,
  lastFetched: "2026-08-07T00:00:00.000Z",
  source: "fallback",
};

const CACHE_KEY = "google_reviews_cache";
const STALE_AFTER_MS = 12 * 60 * 60 * 1000; // 12h — matches the route's s-maxage

function getDB() {
  try {
    return (getRequestContext().env as any).DB;
  } catch {
    return null;
  }
}

function getEnv(name: string): string {
  try {
    return ((getRequestContext().env as any)[name] || "") as string;
  } catch {
    return "";
  }
}

async function readCache(db: any): Promise<GoogleReviewsData | null> {
  try {
    const row: any = await db.prepare("SELECT value FROM settings WHERE key = ?").bind(CACHE_KEY).first();
    if (!row?.value) return null;
    const parsed = JSON.parse(row.value);
    if (typeof parsed?.rating !== "number" || typeof parsed?.reviewCount !== "number") return null;
    return parsed as GoogleReviewsData;
  } catch {
    return null;
  }
}

async function writeCache(db: any, data: GoogleReviewsData): Promise<void> {
  try {
    await db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").bind(CACHE_KEY, JSON.stringify(data)).run();
  } catch {
    // best-effort — a failed write just means the next reader tries the live fetch again
  }
}

function isStale(data: GoogleReviewsData): boolean {
  const fetched = Date.parse(data.lastFetched);
  if (!Number.isFinite(fetched)) return true;
  return Date.now() - fetched > STALE_AFTER_MS;
}

async function fetchFromPlacesAPI(): Promise<GoogleReviewsData | null> {
  const apiKey = getEnv("GOOGLE_PLACES_API_KEY");
  const placeId = getEnv("GOOGLE_PLACE_ID");
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount",
      },
    });
    if (!res.ok) return null;
    const json: any = await res.json();
    if (typeof json?.rating !== "number" || typeof json?.userRatingCount !== "number") return null;
    return {
      rating: json.rating,
      reviewCount: json.userRatingCount,
      lastFetched: new Date().toISOString(),
      source: "live",
    };
  } catch {
    return null;
  }
}

/** Public Place ID for building "leave a review" / "view reviews" links — not a secret. */
export function getGooglePlaceId(): string {
  return getEnv("GOOGLE_PLACE_ID");
}

/**
 * Single read path for the live Google rating/review count, used by both
 * layout.tsx (schema) and any page badge. Never calls the Places API itself —
 * only reads D1 — so page render never depends on an external API's latency.
 * /api/google-reviews is the only thing that refreshes the cache.
 */
export async function getGoogleReviewsData(): Promise<GoogleReviewsData> {
  const db = getDB();
  if (!db) return FALLBACK;
  const cached = await readCache(db);
  return cached || FALLBACK;
}

/**
 * Called by /api/google-reviews. Refreshes the D1 cache from the live Places
 * API if stale and credentials are present; always returns a usable value.
 */
export async function refreshGoogleReviewsData(): Promise<GoogleReviewsData> {
  const db = getDB();
  const cached = db ? await readCache(db) : null;

  if (cached && !isStale(cached)) return cached;

  const live = await fetchFromPlacesAPI();
  if (live) {
    if (db) await writeCache(db, live);
    return live;
  }

  return cached || FALLBACK;
}
