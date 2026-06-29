import type { Community, CommunityStage, SectionId } from "@/lib/types/community";

const STAGE_ORDER: Record<CommunityStage, number> = {
  future: 0,
  coming_soon: 1,
  available: 2,
};

/** Min stage required for a section to appear */
const SECTION_MIN_STAGE: Partial<Record<SectionId, CommunityStage>> = {
  vision: "future",
  salesOffice: "coming_soon",
  timeline: "coming_soon",
  floorplans: "coming_soon",
  sitePlan: "coming_soon",
  promotions: "available",
  quickMoveIn: "available",
  events: "coming_soon",
};

/** Doc-recommended scroll order per lifecycle stage */
const STAGE_SECTION_ORDER: Record<CommunityStage, SectionId[]> = {
  future: [
    "vision",
    "overview",
    "areaMap",
    "amenities",
    "features",
    "gallery",
    "designCentre",
    "testimonials",
    "faq",
    "registration",
    "similarCommunities",
  ],
  coming_soon: [
    "overview",
    "gallery",
    "floorplans",
    "sitePlan",
    "areaMap",
    "amenities",
    "downloads",
    "timeline",
    "designCentre",
    "salesOffice",
    "features",
    "testimonials",
    "faq",
    "registration",
    "similarCommunities",
  ],
  available: [
    "overview",
    "salesOffice",
    "promotions",
    "quickMoveIn",
    "floorplans",
    "sitePlan",
    "video",
    "gallery",
    "areaMap",
    "amenities",
    "downloads",
    "features",
    "designCentre",
    "testimonials",
    "events",
    "faq",
    "registration",
    "similarCommunities",
  ],
};

function hasContent(community: Community, id: SectionId): boolean {
  switch (id) {
    case "hero":
    case "snapshot":
    case "registration":
      return true;
    case "vision":
      return Boolean(community.vision);
    case "overview":
      return Boolean(community.overview);
    case "quickFacts":
      return Boolean(community.quickFacts?.facts.length);
    case "video":
      return Boolean(community.videoUrl);
    case "gallery":
      return Boolean(community.gallery?.length);
    case "areaMap":
      return Boolean(community.areaMap?.points.length);
    case "amenities":
      return Boolean(community.amenities?.items.length);
    case "features":
      return Boolean(community.features?.items.length);
    case "sitePlan":
      return Boolean(community.sitePlan?.lots.length);
    case "floorplans":
      return Boolean(community.floorplans?.length);
    case "quickMoveIn":
      return Boolean(community.quickMoveIn?.length);
    case "downloads":
      return Boolean(community.downloads?.length);
    case "promotions":
      return Boolean(community.promotions?.length);
    case "salesOffice":
      return Boolean(community.salesOffice);
    case "timeline":
      return Boolean(community.timeline?.length);
    case "designCentre":
      return Boolean(community.designCentre);
    case "testimonials":
      return Boolean(community.testimonials?.length);
    case "events":
      return Boolean(community.events?.length);
    case "faq":
      return Boolean(community.faq?.length);
    case "similarCommunities":
      return Boolean(community.similarCommunities?.length);
    default:
      return false;
  }
}

export function isSectionVisible(community: Community, id: SectionId): boolean {
  const minStage = SECTION_MIN_STAGE[id];
  if (minStage && STAGE_ORDER[community.stage] < STAGE_ORDER[minStage]) {
    return false;
  }
  return hasContent(community, id);
}

export function getOrderedSections(community: Community): SectionId[] {
  return STAGE_SECTION_ORDER[community.stage].filter((id) => isSectionVisible(community, id));
}

export function getVisibleSections(community: Community): SectionId[] {
  return getOrderedSections(community);
}

const NAV_LABELS: Record<SectionId, string> = {
  hero: "Overview",
  snapshot: "Snapshot",
  vision: "Vision",
  salesOffice: "Visit us",
  promotions: "Promotions",
  quickMoveIn: "Move-in ready",
  floorplans: "Floorplans",
  sitePlan: "Site plan",
  video: "Video",
  gallery: "Gallery",
  overview: "Overview",
  quickFacts: "Quick facts",
  areaMap: "Location",
  amenities: "Lifestyle",
  features: "Why Losani",
  downloads: "Downloads",
  timeline: "Timeline",
  designCentre: "Design centre",
  testimonials: "Reviews",
  events: "Events",
  faq: "FAQ",
  registration: "Contact",
  similarCommunities: "Similar",
};

/** Sticky nav — doc labels per stage, filtered to visible sections */
const STAGE_NAV_ORDER: Record<CommunityStage, SectionId[]> = {
  future: ["vision", "overview", "areaMap", "amenities", "features", "faq", "registration"],
  coming_soon: ["overview", "gallery", "floorplans", "sitePlan", "areaMap", "timeline", "downloads", "faq", "registration"],
  available: [
    "overview",
    "salesOffice",
    "promotions",
    "quickMoveIn",
    "floorplans",
    "sitePlan",
    "video",
    "gallery",
    "areaMap",
    "amenities",
    "downloads",
    "features",
    "designCentre",
    "events",
    "faq",
    "registration",
  ],
};

export function getNavSections(community: Community): { id: SectionId; label: string }[] {
  return STAGE_NAV_ORDER[community.stage]
    .filter((id) => isSectionVisible(community, id))
    .map((id) => ({ id, label: NAV_LABELS[id] }));
}
