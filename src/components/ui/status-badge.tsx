import { cn } from "@/lib/utils/cn";
import type { CommunityStage } from "@/lib/types/community";

const stageLabels: Record<CommunityStage, string> = {
  future: "Future community",
  coming_soon: "Coming soon",
  available: "Now selling",
};

/** Plain text status — no pill chrome */
export function StatusLabel({
  stage,
  className,
  inverse,
}: {
  stage: CommunityStage;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span
      className={cn(
        "text-sm font-semibold",
        inverse ? "text-white" : "text-foreground",
        !inverse && stage === "future" && "text-muted",
        !inverse && stage === "coming_soon" && "text-status-coming",
        !inverse && stage === "available" && "text-status-available",
        className,
      )}
    >
      {stageLabels[stage]}
    </span>
  );
}

/** @deprecated use StatusLabel — kept for import compatibility */
export function StatusBadge(props: Parameters<typeof StatusLabel>[0]) {
  return <StatusLabel {...props} />;
}
