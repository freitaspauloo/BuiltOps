import type { HomeModel } from "@/lib/types/model";

export type ModelNavSection = {
  id: string;
  label: string;
};

/** Section anchors for model page sticky navigation — mirrors Notion P0 flow. */
export function getModelNavSections(model: HomeModel): ModelNavSection[] {
  const sections: ModelNavSection[] = [
    { id: "overview", label: "Details" },
    { id: "floorplan", label: "Floorplan" },
  ];

  sections.push({ id: "tour", label: "Virtual tour" });

  if (model.similarModels.length > 0) {
    sections.push({ id: "similarModels", label: "Similar models" });
  }

  if (model.availableAt.length > 0) {
    sections.push({ id: "availableAt", label: "Available at" });
  }

  sections.push({ id: "registration", label: "Contact" });

  return sections;
}
