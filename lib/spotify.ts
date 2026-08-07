import "server-only";

export type LastPlayed = {
  track: string;
  artist: string;
  albumArt: string;
  trackUrl: string;
};

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function getRecentlyPlayed(): Promise<LastPlayed | null> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const res = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const data = await res.json();
    const item = data?.items?.[0]?.track;
    if (!item) return null;

    const albumArt = item.album?.images?.[0]?.url;
    const artist = item.artists?.map((a: { name: string }) => a.name).join(", ");
    if (!item.name || !artist || !albumArt) return null;

    return {
      track: item.name,
      artist,
      albumArt,
      trackUrl: item.external_urls?.spotify ?? "",
    };
  } catch {
    return null;
  }
}
