import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/isbn/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
