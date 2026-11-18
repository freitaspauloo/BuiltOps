import type { TimelineMilestone } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

export function TimelineSection({
  milestones,
  siteVersion = "v3",
}: {
  milestones: TimelineMilestone[];
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="timeline" siteVersion={siteVersion} reveal={false}>
      <SectionHeaderSplit
        eyebrow="Progress"
        title="Community timeline"
        description="Key milestones from announcement to move-in."
        siteVersion={siteVersion}
      />
      <ol className="space-y-0 border-l-2 border-border pl-8">
        {milestones.map((m, i) => (
          <li key={`${m.title}-${i}`} className="relative pb-8 last:pb-0">
            <span
              className={cn(
                "absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 ring-4 ring-background",
                m.status === "complete" && "bg-babu",
                m.status === "current" && "bg-primary",
                (!m.status || m.status === "upcoming") && "bg-border",
              )}
            />
            <p className="text-sm text-muted">{m.date}</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{m.title}</p>
            {m.description && <p className="mt-1 text-sm text-body">{m.description}</p>}
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
