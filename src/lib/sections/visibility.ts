import type { Community, CommunityStage, SectionId } from "@/lib/types/community";
import {
  isSectionHiddenForPresentation,
  type PresentationMode,
} from "@/lib/presentation-mode";
import {
  isInventoryHiddenForVersion,
  V6B_HIDDEN_INVENTORY_SECTIONS,
} from "@/lib/site-versions";

const STAGE_ORDER: Record<CommunityStage, number> = {
  future: 0,
  coming_soon: 1,
  available: 2,
};

/** Min stage required for a section to appear (aligned to original product doc). */
const SECTION_MIN_STAGE: Partial<Record<SectionId, CommunityStage>> = {
  vision: "future",
  timeline: "coming_soon",
  floorplans: "coming_soon",
  sitePlan: "coming_soon",
  /** Available Now only — sales centre, inventory, promos, events, video */
  salesOffice: "available",
  promotions: "available",
  quickMoveIn: "available",
  events: "available",
  video: "available",
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
    "faq",
    "registration",
    "similarCommunities",
  ],
  coming_soon: [
    "overview",
    "gallery",
    "quickFacts",
    "floorplans",
    "sitePlan",
    "areaMap",
    "amenities",
    "downloads",
    "timeline",
    "designCentre",
    "features",
    "faq",
    "registration",
    "similarCommunities",
  ],
  available: [
    "overview",
    "promotions",
    "quickMoveIn",
    "quickFacts",
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

/**
 * v4 audit order (available stage) — quick facts live inside overview, video is
 * folded into the gallery, and features acts as a closing validator just before
 * similar communities. Earlier versions keep STAGE_SECTION_ORDER untouched.
 */
const V4_AVAILABLE_SECTION_ORDER: SectionId[] = [
  "overview",
  "floorplans",
  "quickMoveIn",
  "sitePlan",
  "promotions",
  "gallery",
  "areaMap",
  "amenities",
  "designCentre",
  "testimonials",
  "events",
  "faq",
  "registration",
  "features",
  "similarCommunities",
];

/** v5 — buy path, then location/lifestyle, then gallery and help. */
const V5_AVAILABLE_SECTION_ORDER: SectionId[] = [
  "overview",
  "sitePlan",
  "floorplans",
  "quickMoveIn",
  "areaMap",
  "amenities",
  "promotions",
  "gallery",
  "designCentre",
  "testimonials",
  "events",
  "faq",
  "registration",
  "features",
  "similarCommunities",
];

function getStageSectionOrder(community: Community): SectionId[] {
  if (community.sectionOrder?.length) {
    return community.sectionOrder;
  }
  if (
    (community.micrositeVersion === "v6" || community.micrositeVersion === "v6b") &&
    community.stage === "available"
  ) {
    return V5_AVAILABLE_SECTION_ORDER;
  }
  if (community.micrositeVersion === "v5" && community.stage === "available") {
    return V5_AVAILABLE_SECTION_ORDER;
  }
  if (community.micrositeVersion === "v4" && community.stage === "available") {
    return V4_AVAILABLE_SECTION_ORDER;
  }
  return STAGE_SECTION_ORDER[community.stage];
}

/** Stage templates used as Sanity defaults / fallback when CMS order is empty. */
export function getDefaultSectionOrder(
  stage: CommunityStage,
  micrositeVersion?: string,
): SectionId[] {
  if ((micrositeVersion === "v6" || micrositeVersion === "v6b") && stage === "available") {
    return [...V5_AVAILABLE_SECTION_ORDER];
  }
  if (micrositeVersion === "v5" && stage === "available") return [...V5_AVAILABLE_SECTION_ORDER];
  if (micrositeVersion === "v4" && stage === "available") return [...V4_AVAILABLE_SECTION_ORDER];
  return [...STAGE_SECTION_ORDER[stage]];
}

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
  if (community.sectionDisabled?.includes(id)) {
    return false;
  }
  const minStage = SECTION_MIN_STAGE[id];
  if (minStage && STAGE_ORDER[community.stage] < STAGE_ORDER[minStage]) {
    return false;
  }
  return hasContent(community, id);
}

function resolvePresentationMode(community: Community): PresentationMode {
  return community.presentationMode ?? "landing";
}

export function getRenderedSections(
  community: Community,
  mode?: PresentationMode,
): SectionId[] {
  const presentation = mode ?? resolvePresentationMode(community);
  const hideInventory = isInventoryHiddenForVersion(community.micrositeVersion);
  return getStageSectionOrder(community)
    .filter((id) => id !== "hero" && id !== "snapshot")
    .filter((id) => isSectionRendered(community, id))
    .filter((id) => !isSectionHiddenForPresentation(id, presentation))
    .filter((id) => !(hideInventory && V6B_HIDDEN_INVENTORY_SECTIONS.has(id)));
}

export function getOrderedSections(community: Community): SectionId[] {
  return getRenderedSections(community);
}

export function getVisibleSections(community: Community): SectionId[] {
  return getRenderedSections(community);
}

/** v3 render rules — sections skipped when another block embeds the same anchor */
export function isSectionRendered(community: Community, id: SectionId): boolean {
  if (!isSectionVisible(community, id)) return false;

  switch (id) {
    case "quickFacts":
      return !community.overview;
    case "salesOffice":
      if (
        (community.micrositeVersion === "v4" ||
          community.micrositeVersion === "v5" ||
          community.micrositeVersion === "v6" ||
          community.micrositeVersion === "v6b") &&
        community.registration &&
        community.salesOffice
      ) {
        return false;
      }
      return !(
        community.overview &&
        community.quickFacts?.facts.length &&
        community.salesOffice
      );
    case "downloads":
      // v4+ — brochures live in hero/nav "View Brochure" dropdown only.
      if (
        community.micrositeVersion === "v4" ||
        community.micrositeVersion === "v5" ||
        community.micrositeVersion === "v6" ||
        community.micrositeVersion === "v6b"
      ) {
        return false;
      }
      return !(community.overview && community.downloads?.length);
    case "video":
      return Boolean(community.videoUrl && !community.gallery?.length);
    default:
      return true;
  }
}

const NAV_LABELS: Record<SectionId, string> = {
  hero: "Overview",
  snapshot: "Snapshot",
  vision: "Vision",
  salesOffice: "Visit us",
  promotions: "Promotions",
  quickMoveIn: "Move-in ready",
  floorplans: "Floorplans",
  sitePlan: "Live site plan",
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
  registration: "Book Appointment",
  similarCommunities: "Similar",
};

/** Sticky nav — scroll order subset, filtered to sections that actually render */
const STAGE_NAV_ORDER: Record<CommunityStage, SectionId[]> = {
  future: [
    "vision",
    "overview",
    "gallery",
    "areaMap",
    "amenities",
    "features",
    "designCentre",
    "faq",
  ],
  coming_soon: [
    "overview",
    "gallery",
    "floorplans",
    "sitePlan",
    "areaMap",
    "amenities",
    "timeline",
    "features",
    "designCentre",
    "downloads",
    "faq",
  ],
  available: [
    "overview",
    "salesOffice",
    "promotions",
    "quickMoveIn",
    "floorplans",
    "sitePlan",
    "gallery",
    "areaMap",
    "amenities",
    "features",
    "designCentre",
    "testimonials",
    "video",
    "downloads",
    "events",
    "faq",
  ],
};

export function getNavSections(community: Community): { id: SectionId; label: string }[] {
  const rendered = new Set(getRenderedSections(community));

  // Sales centre lives inside overview but keeps its own #salesOffice anchor
  if (
    community.salesOffice &&
    community.overview &&
    !rendered.has("salesOffice")
  ) {
    rendered.add("salesOffice");
  }

  // Prefer CMS section order for nav sequence when present; otherwise stage nav template.
  const navOrder = community.sectionOrder?.length
    ? community.sectionOrder.filter((id) => id !== "hero" && id !== "snapshot" && id !== "registration")
    : STAGE_NAV_ORDER[community.stage];

  return navOrder
    .filter((id) => rendered.has(id))
    .map((id) => ({
      id,
      label:
        community.micrositeVersion === "v4" && id === "sitePlan"
          ? "All models"
          : (community.micrositeVersion === "v5" ||
                community.micrositeVersion === "v6" ||
                community.micrositeVersion === "v6b") &&
              id === "sitePlan"
            ? "Site plan"
            : NAV_LABELS[id],
    }));
}
