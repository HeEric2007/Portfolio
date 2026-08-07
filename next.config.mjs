/** @type {import('next').NextConfig} */
// Two deployment modes from one config, toggled at build time:
//   npm run build         -> normal Next.js build (Vercel: route handlers work as
//                             serverless functions, so the Spotify widget is live)
//   npm run build:static  -> `next export`-style static output for GitHub Pages
//                             (no server, so /api/last-played 404s and the widget
//                             renders nothing — which is the desired failure mode)
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  output: isStaticExport ? "export" : undefined,
  images: {
    // next/image's optimization API needs a server; static export has none.
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
