import { NextResponse } from "next/server";
import { refreshGoogleReviewsData } from "@/lib/google-reviews";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const CACHE_CONTROL = {
  "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
  "Content-Type": "application/json",
};

export async function GET() {
  const data = await refreshGoogleReviewsData();
  return NextResponse.json(data, { status: 200, headers: CACHE_CONTROL });
}
