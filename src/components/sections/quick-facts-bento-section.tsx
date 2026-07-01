import type { QuickFacts } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionShell } from "@/components/ui/section";
import { getFactByKey, sortFactsForBento } from "@/lib/quick-facts/bento";
import { cn } from "@/lib/utils/cn";

function MetricCell({
  value,
  label,
  long = false,
}: {
  value: string;
  label: string;
  long?: boolean;
}) {
  return (
    <div className="metrics-editorial-cell">
      <p
        className={cn(
          "metrics-editorial-value",
          (long || value.length > 14) && "metrics-editorial-value--long",
        )}
      >
        {value}
      </p>
      <p className="metrics-editorial-label">{label}</p>
    </div>
  );
}

export function QuickFactsBentoSection({
  data,
  siteVersion = "v2",
}: {
  data: QuickFacts;
  siteVersion?: MicrositeVersionId;
}) {
  const ordered = sortFactsForBento(data.facts);
  const size = getFactByKey(ordered, "size") ?? getFactByKey(ordered, "area") ?? ordered[0];
  const bedrooms = getFactByKey(ordered, "bedrooms") ?? ordered[1];
  const bathrooms = getFactByKey(ordered, "bathrooms") ?? ordered[2];
  const homes = getFactByKey(ordered, "homes") ?? ordered[3];
  const price = getFactByKey(ordered, "starting_price") ?? ordered[4];
  const collections = getFactByKey(ordered, "collections") ?? ordered[5];

  return (
    <SectionShell id="quickFacts" siteVersion={siteVersion}>
      <div className="metrics-editorial-grid">
        <div className="metrics-editorial-cell metrics-editorial-header">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted">Details</p>
            <h2 className="headline-section mt-4 max-w-[12ch] text-balance">
              {data.title ?? "At a Glance"}
            </h2>
          </div>
        </div>

        {size && <MetricCell value={size.value} label={size.label} long />}
        {price && <MetricCell value={price.value} label={price.label} />}
        {bedrooms && <MetricCell value={bedrooms.value} label={bedrooms.label} />}
        {bathrooms && <MetricCell value={bathrooms.value} label={bathrooms.label} />}
        {homes && <MetricCell value={homes.value} label={homes.label} />}
        {collections && <MetricCell value={collections.value} label={collections.label} />}
      </div>
    </SectionShell>
  );
}
