import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Add the WordPress media host when connecting the real store, e.g.:
      // { protocol: "https", hostname: "www.zevtechnologies.com" },
    ],
  },
};

export default nextConfig;
