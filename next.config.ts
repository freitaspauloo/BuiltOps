import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults to [75] and silently coerces anything else — the hero
    // asks for 90.
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.losanihomes.com" },
      { protocol: "https", hostname: "losani-connected-site-experience.replit.app" },
    ],
  },
};

export default nextConfig;
