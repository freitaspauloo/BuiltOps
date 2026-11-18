import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    localPatterns: [
      { pathname: "/media/**" },
      { pathname: "/api/media/file/**" },
      { pathname: "/site-plans/**" },
      { pathname: "/images/**" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "www.losanihomes.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "losani-connected-site-experience.replit.app" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/studio",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/studio/:path*",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/design",
        destination: "/old/design",
        permanent: false,
      },
      {
        source: "/design/:path*",
        destination: "/old/design/:path*",
        permanent: false,
      },
    ];
  },
};

export default withPayload(nextConfig);
