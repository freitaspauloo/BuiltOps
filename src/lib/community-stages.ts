import type { CommunityStage } from "@/lib/types/community";

/** URL segment for presentation stage pages. */
export type CommunityStageSlug =
  | "future-community"
  | "coming-soon"
  | "available-now";

export const COMMUNITY_STAGE_SLUGS: CommunityStageSlug[] = [
  "future-community",
  "coming-soon",
  "available-now",
];

export const COMMUNITY_STAGE_PRESENTATIONS: {
  slug: CommunityStageSlug;
  stage: CommunityStage;
  label: string;
  description: string;
}[] = [
  {
    slug: "future-community",
    stage: "future",
    label: "Future Community",
    description: "Vision, location, lifestyle — register interest",
  },
  {
    slug: "coming-soon",
    stage: "coming_soon",
    label: "Coming Soon",
    description: "Previews, floorplans, timeline — join VIP list",
  },
  {
    slug: "available-now",
    stage: "available",
    label: "Available Now",
    description: "Inventory, site plan, promotions — book appointment",
  },
];

const SLUG_TO_STAGE: Record<CommunityStageSlug, CommunityStage> = {
  "future-community": "future",
  "coming-soon": "coming_soon",
  "available-now": "available",
};

const STAGE_TO_SLUG: Record<CommunityStage, CommunityStageSlug> = {
  future: "future-community",
  coming_soon: "coming-soon",
  available: "available-now",
};

const STAGE_PRIMARY_CTA: Record<
  CommunityStage,
  { label: string; href: string }
> = {
  future: { label: "Register Interest", href: "#registration" },
  coming_soon: { label: "Join VIP List", href: "#registration" },
  available: { label: "Book Appointment", href: "#registration" },
};

export function isCommunityStageSlug(
  value: string | null | undefined,
): value is CommunityStageSlug {
  return (
    value === "future-community" ||
    value === "coming-soon" ||
    value === "available-now"
  );
}

export function parseCommunityStageSlug(
  value: string | null | undefined,
): CommunityStage | null {
  if (!isCommunityStageSlug(value)) return null;
  return SLUG_TO_STAGE[value];
}

export function communityStageSlug(stage: CommunityStage): CommunityStageSlug {
  return STAGE_TO_SLUG[stage];
}

/** Presentation URL for a community lifecycle stage. */
export function communityStageHref(slug: string, stage: CommunityStage) {
  return `/communities/${slug}/${STAGE_TO_SLUG[stage]}`;
}

export function communityStageHrefFromSlug(
  slug: string,
  stageSlug: CommunityStageSlug,
) {
  return `/communities/${slug}/${stageSlug}`;
}

export function stagePrimaryCta(stage: CommunityStage) {
  return STAGE_PRIMARY_CTA[stage];
}
