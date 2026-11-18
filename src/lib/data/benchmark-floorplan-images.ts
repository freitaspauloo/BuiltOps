import type { Floorplan } from "@/lib/types/community";
import images from "./benchmark-floorplan-images.json";

export const benchmarkFloorplanImages = images as Record<string, string>;

export function normalizeFloorplanName(name: string) {
  return name
    .toLowerCase()
    .replace(/[\u2018\u2019`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function findFloorplanForLot(floorplans: Floorplan[], lotFloorplan: string) {
  const norm = normalizeFloorplanName(lotFloorplan);
  return (
    floorplans.find((plan) => normalizeFloorplanName(plan.name) === norm) ??
    floorplans.find((plan) => plan.id === lotFloorplan)
  );
}

export function withFloorplanImages(floorplans: Floorplan[]): Floorplan[] {
  return floorplans.map((plan) => ({
    ...plan,
    image: benchmarkFloorplanImages[plan.id] ?? plan.image,
  }));
}
