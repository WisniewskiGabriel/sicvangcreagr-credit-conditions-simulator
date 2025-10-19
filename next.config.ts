import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* TurboPack configuration */
  turbopack: {
    // Enable optimizations
  },

  /* Performance optimizations */
  reactStrictMode: true,

  /* Optimize images */
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /* Additional optimizations */
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
