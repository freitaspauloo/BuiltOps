import type { Community, SectionId } from "@/lib/types/community";

export const NAV_SECTION_DESCRIPTIONS: Partial<Record<SectionId, string>> = {
  promotions: "Current offers and incentives",
  quickMoveIn: "Homes available for faster occupancy",
  floorplans: "Models, sizes, and pricing",
  sitePlan: "Phases, lots, and community layout",
  video: "Tour the neighbourhood and homes",
  gallery: "Interiors, exteriors, and lifestyle",
  areaMap: "Location and nearby points of interest",
  amenities: "Wine country and everyday conveniences",
  features: "Why build with Losani",
  designCentre: "Finishes, fixtures, and personalization",
  downloads: "Brochures, plans, and resources",
  timeline: "Opening dates and milestones",
  events: "Sales centre events and previews",
  testimonials: "What buyers are saying",
  faq: "Answers before you visit",
  salesOffice: "Hours, directions, and contact",
  vision: "Future vision for the community",
  overview: "Community story and highlights",
};

type NavGroupSidebar = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
};

export function getNavGroupSidebar(community: Community, groupId: string): NavGroupSidebar {
  const hero = community.hero.heroImage;
  const gallery = community.gallery?.[0]?.url ?? hero;

  const defaults: NavGroupSidebar = {
    title: "Plan your visit",
    description: "Tour model homes and connect with our sales team.",
    ctaLabel: community.hero.primaryCta.label,
    ctaHref: community.hero.primaryCta.href,
    image: gallery,
  };

  const byGroup: Record<string, Partial<NavGroupSidebar>> = {
    buy: {
      title: "Find your home",
      description: "Compare floorplans, browse the live site plan, and see move-in ready homes.",
      ctaLabel: "Browse floorplans",
      ctaHref: "#floorplans",
      image: community.floorplans?.[0]?.image ?? community.quickMoveIn?.[0]?.image ?? gallery,
    },
    homes: {
      title: "Find your floorplan",
      description: "Compare layouts and see what's available today.",
      ctaLabel: "Browse floorplans",
      ctaHref: "#floorplans",
      image: community.floorplans?.[0]?.image ?? gallery,
    },
    explore: {
      title: "Explore Benchmark",
      description: "Gallery, amenities, and everything around Beamsville.",
      ctaLabel: "View gallery",
      ctaHref: "#gallery",
      image: gallery,
    },
    plan: {
      title: "Resources & location",
      description: "Downloads, timeline, and area highlights.",
      ctaLabel: "View downloads",
      ctaHref: "#downloads",
      image: hero,
    },
    community: {
      title: "Wine country living",
      description: "Location, lifestyle, and community features.",
      ctaLabel: "See the area",
      ctaHref: "#areaMap",
      image: gallery,
    },
    help: {
      title: "We're here to help",
      description: "Events, FAQs, and answers before you register.",
      ctaLabel: community.hero.primaryCta.label,
      ctaHref: "#registration",
      image: community.designCentre?.image ?? hero,
    },
  };

  return { ...defaults, ...byGroup[groupId] };
}
