import type { AppIconType } from "@/lib/icons";
import { HelpCircle, Images, Layers, MapPin, ShoppingBag } from "lucide-react";
import type { Community, CommunityStage, SectionId } from "@/lib/types/community";
import { NAV_SECTION_DESCRIPTIONS } from "@/lib/sections/nav-group-meta";
import { getNavSections } from "@/lib/sections/visibility";

export type NavLinkItem = {
  type: "link";
  id: SectionId;
  label: string;
};

export type NavGroupItem = {
  type: "group";
  id: string;
  label: string;
  icon: AppIconType;
  items: { id: SectionId; label: string; description?: string }[];
};

export type NavStructureItem = NavLinkItem | NavGroupItem;

type GroupTemplate = {
  type: "group";
  id: string;
  label: string;
  icon: AppIconType;
  sectionIds: SectionId[];
};

type NavTemplate = { type: "link"; id: SectionId } | GroupTemplate;

const STAGE_NAV_TEMPLATES: Record<CommunityStage, NavTemplate[]> = {
  future: [
    { type: "link", id: "vision" },
    { type: "link", id: "overview" },
    {
      type: "group",
      id: "community",
      label: "Community",
      icon: MapPin,
      sectionIds: ["gallery", "areaMap", "amenities", "features"],
    },
    { type: "link", id: "designCentre" },
    {
      type: "group",
      id: "help",
      label: "Help",
      icon: HelpCircle,
      sectionIds: ["faq"],
    },
  ],
  coming_soon: [
    { type: "link", id: "overview" },
    {
      type: "group",
      id: "homes",
      label: "Homes",
      icon: Layers,
      sectionIds: ["gallery", "floorplans", "sitePlan"],
    },
    {
      type: "group",
      id: "plan",
      label: "Plan",
      icon: MapPin,
      sectionIds: ["areaMap", "amenities", "timeline", "features", "downloads"],
    },
    { type: "link", id: "designCentre" },
    {
      type: "group",
      id: "help",
      label: "Help",
      icon: HelpCircle,
      sectionIds: ["faq"],
    },
  ],
  available: [
    { type: "link", id: "overview" },
    {
      type: "group",
      id: "buy",
      label: "Buy",
      icon: ShoppingBag,
      sectionIds: ["promotions", "quickMoveIn"],
    },
    {
      type: "group",
      id: "homes",
      label: "Homes",
      icon: Layers,
      sectionIds: ["floorplans", "sitePlan"],
    },
    {
      type: "group",
      id: "explore",
      label: "Explore",
      icon: Images,
      sectionIds: ["gallery", "areaMap", "amenities", "features", "designCentre", "video", "downloads"],
    },
    {
      type: "group",
      id: "help",
      label: "Help",
      icon: HelpCircle,
      sectionIds: ["testimonials", "events", "faq"],
    },
    { type: "link", id: "salesOffice" },
  ],
};

/**
 * v4 audit nav — Buy and Homes are merged into a single "Buy" group so the
 * primary purchase path (floorplans, move-in ready, live site plan, promotions)
 * lives under one menu. Brochures live in the navbar CTA dropdown on v4.
 */
const V4_AVAILABLE_NAV_TEMPLATE: NavTemplate[] = [
  { type: "link", id: "overview" },
  {
    type: "group",
    id: "buy",
    label: "Buy",
    icon: ShoppingBag,
    sectionIds: ["floorplans", "quickMoveIn", "sitePlan", "promotions"],
  },
  {
    type: "group",
    id: "explore",
    label: "Explore",
    icon: Images,
    sectionIds: ["gallery", "areaMap", "amenities", "features", "designCentre", "video"],
  },
  {
    type: "group",
    id: "help",
    label: "Help",
    icon: HelpCircle,
    sectionIds: ["testimonials", "events", "faq"],
  },
  { type: "link", id: "salesOffice" },
];

/** v5 — buy path, then location/lifestyle directly after move-in ready. */
const V5_AVAILABLE_NAV_TEMPLATE: NavTemplate[] = [
  { type: "link", id: "overview" },
  {
    type: "group",
    id: "buy",
    label: "Buy",
    icon: ShoppingBag,
    sectionIds: ["sitePlan", "floorplans", "quickMoveIn", "areaMap", "amenities", "promotions"],
  },
  {
    type: "group",
    id: "explore",
    label: "Explore",
    icon: Images,
    sectionIds: ["gallery", "features", "designCentre", "video"],
  },
  {
    type: "group",
    id: "help",
    label: "Help",
    icon: HelpCircle,
    sectionIds: ["testimonials", "events", "faq"],
  },
  { type: "link", id: "salesOffice" },
];

function getNavTemplate(community: Community): NavTemplate[] {
  if (
    (community.micrositeVersion === "v5" ||
      community.micrositeVersion === "v6" ||
      community.micrositeVersion === "v6b") &&
    community.stage === "available"
  ) {
    return V5_AVAILABLE_NAV_TEMPLATE;
  }
  if (community.micrositeVersion === "v4" && community.stage === "available") {
    return V4_AVAILABLE_NAV_TEMPLATE;
  }
  return STAGE_NAV_TEMPLATES[community.stage];
}

function toNavItem(
  template: NavTemplate,
  visible: Map<SectionId, string>,
): NavStructureItem | null {
  if (template.type === "link") {
    const label = visible.get(template.id);
    if (!label) return null;
    return { type: "link", id: template.id, label };
  }

  const items = template.sectionIds
    .filter((id) => visible.has(id))
    .map((id) => ({
      id,
      label: visible.get(id)!,
      description: NAV_SECTION_DESCRIPTIONS[id],
    }));

  if (items.length === 0) return null;
  if (items.length === 1) {
    return { type: "link", id: items[0].id, label: items[0].label };
  }

  return {
    type: "group",
    id: template.id,
    label: template.label,
    icon: template.icon,
    items,
  };
}

/** Top-level nav entries — grouped where sensible, every visible section still reachable */
export function getNavStructure(community: Community): NavStructureItem[] {
  const visible = new Map(
    getNavSections(community)
      .filter(({ id }) => id !== "registration")
      .map(({ id, label }) => [id, label]),
  );

  return getNavTemplate(community)
    .map((template) => toNavItem(template, visible))
    .filter((item): item is NavStructureItem => item !== null);
}

export function getNavSectionIds(community: Community): SectionId[] {
  const ids: SectionId[] = [];
  for (const item of getNavStructure(community)) {
    if (item.type === "link") ids.push(item.id);
    else ids.push(...item.items.map((i) => i.id));
  }
  return ids;
}
