import { NextResponse } from "next/server";
import { getRecentlyPlayed } from "@/lib/spotify";

// Cache the upstream call for a few minutes rather than hitting Spotify on
// every page load. Not evaluated at all in a static export build, since
// there's no server to run it on — the widget's fetch just 404s, which it
// already treats as "render nothing".
export const revalidate = 180;

export async function GET() {
  const data = await getRecentlyPlayed();
  return NextResponse.json(data);
}
