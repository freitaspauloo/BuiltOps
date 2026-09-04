import type { CommunityStage } from "@/lib/types/community";

/**
 * Losani site information architecture, mirrored from the approved Connected
 * Site Experience navigation (Communities / Properties / Design Centre /
 * About / Pronto Homes / Customer Care).
 *
 * Destinations are placeholders pointing at the live Losani pages and the
 * Connected Experience prototype until the CMS owns this menu.
 */
const CONNECTED_EXPERIENCE = "https://losani-connected-site-experience.replit.app";
const LOSANI = "https://www.losanihomes.com";

export type DiscoverLink = {
  label: string;
  href: string;
};

export type DiscoverColumn = {
  title: string;
  links: DiscoverLink[];
};

export const discoverColumns: DiscoverColumn[] = [
  {
    title: "Communities",
    links: [
      { label: "All communities", href: `${CONNECTED_EXPERIENCE}/search` },
      { label: "Available now", href: `${CONNECTED_EXPERIENCE}/search?status=available` },
      { label: "Coming soon", href: `${CONNECTED_EXPERIENCE}/search?status=coming-soon` },
      { label: "Completed communities", href: `${LOSANI}/completed-communities/` },
    ],
  },
  {
    title: "Homes & properties",
    links: [
      { label: "Pronto Homes", href: `${CONNECTED_EXPERIENCE}/search?category=Pronto%20Homes` },
      { label: "Losani Originals", href: `${LOSANI}/communities/losani-homes-originals/` },
      { label: "Losani Properties", href: `${LOSANI}/properties/` },
      { label: "Design Centre", href: `${LOSANI}/design-centre/` },
    ],
  },
  {
    title: "About Losani",
    links: [
      { label: "Why Losani Homes?", href: `${LOSANI}/about-us/why-losani/` },
      { label: "The Founders", href: `${LOSANI}/about-us/the-founders/` },
      { label: "The Losani Family Foundation", href: `${LOSANI}/about-us/` },
      { label: "Careers", href: `${LOSANI}/about-us/careers/` },
    ],
  },
  {
    title: "Customer care",
    links: [
      { label: "Customer experience", href: `${LOSANI}/customer-care/` },
      { label: "Warranty information", href: `${LOSANI}/customer-care/warranty-information/` },
      { label: "Home maintenance", href: `${LOSANI}/customer-care/home-maintenance/` },
      { label: "Contact us", href: `${LOSANI}/contact/` },
    ],
  },
];

/** ~50 words of orientation copy, so the menu explains Losani rather than just listing it. */
export const discoverBlurb =
  "Losani has been building across Hamilton, Niagara and Southern Ontario for more than four decades — from move-in-ready Pronto Homes to custom-built Originals. Browse what is selling today, register for the releases opening next season, and find the neighbourhood that suits how you actually want to live.";

export type DiscoverCommunity = {
  name: string;
  city: string;
  stage: CommunityStage;
  priceFrom?: string;
  image: string;
  href: string;
};

/** Placeholder feed — swap for the CMS community list when it lands. */
export const discoverCommunities: DiscoverCommunity[] = [
  {
    name: "Riverbend",
    city: "Caledonia, ON",
    stage: "available",
    priceFrom: "From $699,900",
    image: `${LOSANI}/wp-content/uploads/2025/07/riverbend-feature.webp`,
    href: `${LOSANI}/communities/riverbend/`,
  },
  {
    name: "Waterstone",
    city: "Binbrook, ON",
    stage: "available",
    priceFrom: "From $749,900",
    image: `${LOSANI}/wp-content/uploads/2025/07/waterstone-feature.webp`,
    href: `${LOSANI}/communities/waterstone/`,
  },
  {
    name: "Sweetberry",
    city: "Stoney Creek, ON",
    stage: "coming_soon",
    image: `${LOSANI}/wp-content/uploads/2025/07/sweetberry-feature.webp`,
    href: `${LOSANI}/communities/sweetberry/`,
  },
];
