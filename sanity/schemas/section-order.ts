import { defineField, defineType } from "sanity";

/**
 * Ordered section list — editors drag to reorder the community page.
 * Empty content still hides a section at render time.
 */
export const SECTION_ORDER_OPTIONS = [
  { title: "Vision", value: "vision" },
  { title: "Overview", value: "overview" },
  { title: "Quick facts", value: "quickFacts" },
  { title: "Promotions", value: "promotions" },
  { title: "Move-in ready", value: "quickMoveIn" },
  { title: "Floorplans", value: "floorplans" },
  { title: "Site plan", value: "sitePlan" },
  { title: "Video", value: "video" },
  { title: "Gallery", value: "gallery" },
  { title: "Location map", value: "areaMap" },
  { title: "Lifestyle", value: "amenities" },
  { title: "Downloads", value: "downloads" },
  { title: "Timeline", value: "timeline" },
  { title: "Design centre", value: "designCentre" },
  { title: "Why Losani", value: "features" },
  { title: "Testimonials", value: "testimonials" },
  { title: "Events", value: "events" },
  { title: "FAQ", value: "faq" },
  { title: "Sales office", value: "salesOffice" },
  { title: "Registration / Book appointment", value: "registration" },
  { title: "Similar communities", value: "similarCommunities" },
] as const;

/** Default Available Now (v5) order — matches live Benchmark microsite. */
export const DEFAULT_SECTION_ORDER_AVAILABLE = [
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

export const DEFAULT_SECTION_ORDER_COMING_SOON = [
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
  "testimonials",
  "faq",
  "registration",
  "similarCommunities",
  "salesOffice",
];

export const DEFAULT_SECTION_ORDER_FUTURE = [
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
];

export function defaultSectionOrderForStage(stage?: string): string[] {
  if (stage === "coming_soon") return [...DEFAULT_SECTION_ORDER_COMING_SOON];
  if (stage === "future") return [...DEFAULT_SECTION_ORDER_FUTURE];
  return [...DEFAULT_SECTION_ORDER_AVAILABLE];
}

export const sectionOrderField = defineField({
  name: "sectionOrder",
  title: "Page section order",
  description:
    "Drag to reorder sections on this community page. Empty sections still hide automatically. Hero stays at the top.",
  type: "array",
  of: [
    {
      type: "string",
      options: {
        list: [...SECTION_ORDER_OPTIONS],
      },
    },
  ],
  initialValue: DEFAULT_SECTION_ORDER_AVAILABLE,
});

export const sectionOrderObject = defineType({
  name: "sectionOrderDoc",
  title: "Section order helper",
  type: "object",
  fields: [sectionOrderField],
});
