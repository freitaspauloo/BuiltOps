"use client";

import { useRowLabel } from "@payloadcms/ui";

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  vision: "Vision",
  overview: "Overview",
  quickFacts: "Quick facts",
  promotions: "Promotions",
  quickMoveIn: "Move-in ready",
  floorplans: "Floorplans",
  sitePlan: "Site plan",
  video: "Video",
  gallery: "Gallery",
  areaMap: "Location map",
  amenities: "Lifestyle",
  downloads: "Downloads",
  timeline: "Timeline",
  designCentre: "Design centre",
  features: "Why Losani",
  testimonials: "Testimonials",
  events: "Events",
  faq: "FAQ",
  salesOffice: "Sales office",
  registration: "Registration",
  similarCommunities: "Similar communities",
};

/** Row title for section order: “Overview — ON” / “Gallery — OFF”. */
export default function SectionOrderRowLabel() {
  const { data, rowNumber } = useRowLabel<{
    section?: string;
    enabled?: boolean;
  }>();

  const label = data?.section
    ? SECTION_LABELS[data.section] || data.section
    : `Section ${String(rowNumber).padStart(2, "0")}`;
  const enabled = data?.enabled !== false;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <span
        style={{
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: 999,
          background: enabled ? "#16a34a" : "#94a3b8",
        }}
      />
      <strong>{label}</strong>
      <span style={{ opacity: 0.65, fontSize: "0.8em" }}>
        {enabled ? "ON" : "OFF"}
      </span>
    </span>
  );
}
