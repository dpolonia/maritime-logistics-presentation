import type { NextConfig } from "next";
import withPWA from "next-pwa";
import { withMDX } from "@next/mdx";

// Setup MDX support
const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

// Combine with PWA for offline capabilities
const config: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize image handling
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
    formats: ["image/avif", "image/webp"],
  },

  // Add GZIP compression for smaller bundles
  compress: true,

  // Set appropriate caching headers
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*).(?:jpg|jpeg|gif|png|svg|webp|avif)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/_next/static/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // Configure progressive web app
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },

  // Handle MDX files
  pageExtensions: ["ts", "tsx", "mdx"],

  // Optimize for production builds
  swcMinify: true,

  // Configure compiler for enhanced performance
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Configure environment variables
  env: {
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

// Apply all configurations
export default withPWA(withMDXConfig(config));