import type { Community, CommunityStage } from "@/lib/types/community";
import { stagePrimaryCta } from "@/lib/community-stages";

const STAGE_REGISTRATION: Record<
  CommunityStage,
  { title: string; description: string; submitLabel: string }
> = {
  future: {
    title: "Register your interest",
    description:
      "Be first to hear when Benchmark opens for reservations. Share your details and our team will keep you updated on timing, pricing, and next steps.",
    submitLabel: "Register Interest",
  },
  coming_soon: {
    title: "Join the VIP list",
    description:
      "Get early access to floorplans, launch details, and private preview opportunities before the community is fully released.",
    submitLabel: "Join VIP List",
  },
  available: {
    title: "Book Your Private Showing",
    description:
      "Register to tour model homes, receive pricing updates, and connect with our sales team at the Beamsville sales centre.",
    submitLabel: "Book Appointment",
  },
};

/**
 * Force a lifecycle stage for presentation routes.
 * Clears CMS section order so doc stage templates apply.
 * Keeps sales office + registration so the footer signup form stays available;
 * strips inventory-only modules on earlier stages.
 */
export function applyCommunityStage(
  community: Community,
  stage: CommunityStage,
): Community {
  const cta = stagePrimaryCta(stage);
  const isAvailable = stage === "available";
  const isFuture = stage === "future";
  const regCopy = STAGE_REGISTRATION[stage];

  return {
    ...community,
    stage,
    sectionOrder: undefined,
    hero: {
      ...community.hero,
      statusBadge: stage,
      primaryCta: cta,
    },
    // Available Now only (page sections) — keep salesOffice for footer form
    promotions: isAvailable ? community.promotions : undefined,
    quickMoveIn: isAvailable ? community.quickMoveIn : undefined,
    events: isAvailable ? community.events : undefined,
    videoUrl: isAvailable ? community.videoUrl : undefined,
    // Coming Soon+
    floorplans: isFuture ? undefined : community.floorplans,
    sitePlan: isFuture ? undefined : community.sitePlan,
    timeline: isFuture ? undefined : community.timeline,
    downloads: isFuture ? undefined : community.downloads,
    registration: community.registration
      ? {
          ...community.registration,
          title: regCopy.title,
          description: regCopy.description,
          submitLabel: regCopy.submitLabel,
        }
      : {
          title: regCopy.title,
          description: regCopy.description,
          submitLabel: regCopy.submitLabel,
        },
  };
}
