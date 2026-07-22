import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // generates /out folder — works on Cloudflare Pages, any CDN
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,       // required with output:export (no Next.js image server)
  },
  trailingSlash: false,
};

export default nextConfig;
