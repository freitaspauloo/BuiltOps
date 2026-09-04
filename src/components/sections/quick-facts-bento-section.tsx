import type { QuickFacts } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { sortFactsForBento } from "@/lib/quick-facts/bento";
import { cn } from "@/lib/utils/cn";

export function QuickFactsBentoSection({
  data,
  siteVersion = "v2",
}: {
  data: QuickFacts;
  siteVersion?: MicrositeVersionId;
}) {
  const facts = sortFactsForBento(data.facts);

  if (facts.length === 0) return null;

  return (
    <SectionShell id="quickFacts" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Details"
        title={data.title ?? "At a glance"}
        description="The numbers behind the collection — sizes, pricing, and the mix of homes available in this release."
        siteVersion={siteVersion}
      />

      <dl className="metrics-band">
        {facts.map((fact) => (
          <div key={fact.label} className="metrics-band-cell">
            <dd
              className={cn(
                "metrics-band-value",
                fact.value.length > 12 && "metrics-band-value--long",
              )}
            >
              {fact.value}
            </dd>
            <dt className="metrics-band-label">{fact.label}</dt>
          </div>
        ))}
      </dl>
    </SectionShell>
  );
}
