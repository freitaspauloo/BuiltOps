"use client";

import { useState } from "react";
import { SectionRenderer } from "@/components/sections/section-renderer";
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

export function StageToggle({ showPreview = false }: { showPreview?: boolean }) {
  const [stage, setStage] = useState<CommunityStage>("available");
  const active = stages.find((s) => s.value === stage)!;
  const previewCommunity = { ...benchmarkCommunity, stage };
  const visibleSections = getOrderedSections(previewCommunity);

  return (
    <div className="space-y-8">
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
      </div>

      {showPreview && (
        <div className="overflow-hidden border border-border">
          <SectionRenderer community={previewCommunity} />
        </div>
      )}
    </div>
  );
}
