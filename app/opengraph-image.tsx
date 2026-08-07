import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// No per-page params, so this is generated once at build time and reused
// as the fallback OG image for every route — including in a static export.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0efed",
          fontSize: 72,
          fontWeight: 700,
          color: "#2e3d45",
          fontFamily: "sans-serif",
        }}
      >
        {site.name.toLowerCase()}
      </div>
    ),
    { ...size }
  );
}
