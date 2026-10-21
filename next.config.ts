import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    // Tailwind output is small, so inlining it removes the render-blocking stylesheet requests.
    inlineCss: true,
  },
};

export default nextConfig;
