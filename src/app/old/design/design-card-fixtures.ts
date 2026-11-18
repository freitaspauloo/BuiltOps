import { benchmarkCommunity } from "@/lib/data/seed-benchmark";
import type { Floorplan, SimilarCommunity } from "@/lib/types/community";

const { similarCommunities, floorplans } = benchmarkCommunity;

function pickCommunity(
  match: (c: SimilarCommunity) => boolean,
  override?: Partial<SimilarCommunity>,
): SimilarCommunity {
  const base = similarCommunities!.find(match);
  if (!base) throw new Error("Community fixture not found in seed data");
  return { ...base, ...override };
}

function pickFloorplan(id: string, override: Partial<Floorplan> = {}): Floorplan {
  const base = floorplans!.find((f) => f.id === id);
  if (!base) throw new Error(`Floorplan fixture "${id}" not found in seed data`);
  return { ...base, ...override };
}

/** Community card showcase fixtures — Figma 181:619, 181:718, 181:820 */
export const communityShowcaseFixtures = [
  {
    id: "available-collections",
    label: "Available · Pronto + Originals",
    note: "Riverbend-style with dual collection badges and availability summary",
    community: pickCommunity((c) => c.name === "Riverbend"),
  },
  {
    id: "available-no-description",
    label: "Available · no description",
    note: "Price and specs only — description block omitted",
    community: pickCommunity((c) => c.name === "Riverbend", { description: undefined }),
  },
  {
    id: "coming-soon-collections",
    label: "Coming soon · Losani Originals",
    note: "Woodview-style with single collection badge",
    community: pickCommunity((c) => c.name === "Woodview"),
  },
  {
    id: "coming-soon-no-collections",
    label: "Coming soon · no collections",
    note: "Sweetberry-style — no collection badges",
    community: pickCommunity((c) => c.name === "Sweetberry"),
  },
  {
    id: "future",
    label: "Future Communities",
    note: "Columbus Gate-style future stage",
    community: pickCommunity((c) => c.name === "Columbus Gate"),
  },
] as const;

/** Model card showcase fixtures — Figma 204:3985 */
export const modelShowcaseFixtures = [
  {
    id: "townhome-end-lot",
    label: "Townhome end · lot pill",
    note: "18' lot derived from name + explicit lotLabel",
    plan: pickFloorplan("esprit-end"),
  },
  {
    id: "townhome-interior",
    label: "Townhome interior · no lot pill",
    note: "Interior unit — subtitle auto-derived, no lot width",
    plan: pickFloorplan("esprit-interior-f1"),
  },
  {
    id: "single-detached-lot",
    label: "Single detached · lot pill",
    note: "Explicit lotLabel on detached model",
    plan: pickFloorplan("whitehaven-end", {
      lotLabel: "46' lot",
      subtitle: "Single detached home",
    }),
  },
  {
    id: "pronto-collection",
    label: "Pronto collection badge",
    note: "Purple Pronto gradient on model photo",
    plan: pickFloorplan("knighton-interior-f2", {
      collection: { label: "Pronto Homes", variant: "pronto" },
    }),
  },
  {
    id: "waldorf-subtitle",
    label: "Waldorf · custom subtitle",
    note: "Enhanced end with explicit subtitle line",
    plan: pickFloorplan("waldorf-enhanced-end", {
      subtitle: "Townhome end unit with premium elevation package",
      lotLabel: "20' lot",
    }),
  },
] as const;

/**
 * Planned variants — showcase-only mocks, not backed by production components.
 * Documented here for Figma parity until implemented.
 */
export const plannedCommunityVariants = [
  {
    id: "rental-stage",
    label: "Rental community stage",
    figmaNote: "For Rent status tab — no CommunityStage value yet",
  },
  {
    id: "special-offers-badge",
    label: "Special Offers collection badge",
    figmaNote: "Red gradient badge on community card photo",
  },
] as const;

export const plannedModelVariants = [
  {
    id: "rent-model",
    label: "Rent model card",
    figmaNote: "Rent from pricing + lease CTAs — buy-only ModelCard today",
  },
] as const;
