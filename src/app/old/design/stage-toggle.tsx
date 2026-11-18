"use client";

import { useState } from "react";
import { StatusLabel } from "@/components/ui/status-badge";
import { benchmarkCommunity } from "@/lib/data/seed-benchmark";
import { getOrderedSections } from "@/lib/sections/visibility";
import { cn } from "@/lib/utils/cn";
import type { CommunityStage } from "@/lib/types/community";

const stages: { value: CommunityStage; label: string; note: string }[] = [
  {
    value: "future",
    label: "Future",
    note: "Overview, location, lifestyle, and registration only.",
  },
  {
    value: "coming_soon",
    label: "Coming soon",
    note: "Adds gallery, floorplans, site plan, and sales office.",
  },
  {
    value: "available",
    label: "Available",
    note: "Full release with move-in homes, promotions, and live lots.",
  },
];

/** Stage lifecycle reference — section visibility only, no live microsite preview. */
export function StageMatrix() {
  const [stage, setStage] = useState<CommunityStage>("available");
  const active = stages.find((s) => s.value === stage)!;
  const previewCommunity = { ...benchmarkCommunity, stage };
  const visibleSections = getOrderedSections(previewCommunity);

  return (
    <div className="border border-border bg-background p-6">
      <div className="flex gap-6 border-b border-border">
        {stages.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setStage(s.value)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              stage === s.value
                ? "border-b-2 border-primary text-foreground"
                : "text-muted hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <StatusLabel stage={stage} />
        <p className="max-w-md text-sm text-muted">{active.note}</p>
      </div>
      <p className="mt-4 text-xs text-muted">
        {visibleSections.length} sections visible at this stage
      </p>
      <ul className="mt-6 grid gap-2 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleSections.map((sectionId, index) => (
          <li
            key={sectionId}
            className="flex items-center gap-3 border border-border bg-fog px-4 py-2.5 text-sm"
          >
            <span className="font-mono text-xs text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-medium">{sectionId}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
