"use client";

import type { QuickFacts } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import { getFactByKey, sortFactsForBento } from "@/lib/quick-facts/bento";
import { MetricCell } from "@/components/sections/quick-facts-metric-cell";

export type MetricsBandFact = { label: string; value: string };

export function getMetricsBandFacts(data: QuickFacts): MetricsBandFact[] {
  const ordered = sortFactsForBento(data.facts);
  const size =
    getFactByKey(ordered, "size_sqft") ??
    getFactByKey(ordered, "size") ??
    getFactByKey(ordered, "area") ??
    ordered[0];
  const bedrooms = getFactByKey(ordered, "bedrooms") ?? ordered[1];
  const bathrooms = getFactByKey(ordered, "bathrooms") ?? ordered[2];
  const homes = getFactByKey(ordered, "homes") ?? ordered[3];
  const price = getFactByKey(ordered, "starting_price") ?? ordered[4];
  const collections =
    getFactByKey(ordered, "collections") ??
    getFactByKey(ordered, "phases") ??
    ordered[5];

  return [size, price, bedrooms, bathrooms, homes, collections]
    .filter((fact): fact is NonNullable<typeof fact> => Boolean(fact))
    .map((fact) => ({ label: fact.label, value: fact.value }));
}

/** v5 — starting price first as the bold anchor. */
export function getV5MetricsBandFacts(data: QuickFacts): MetricsBandFact[] {
  const facts = getMetricsBandFacts(data);
  const priceIndex = facts.findIndex((fact) =>
    /price/i.test(fact.label),
  );
  if (priceIndex <= 0) return facts;
  const price = facts[priceIndex];
  return [price, ...facts.filter((_, index) => index !== priceIndex)];
}

export function V3MetricsBand({ facts }: { facts: MetricsBandFact[] }) {
  return (
    <div className="v3-metrics-band-bleed">
      <div className="v3-metrics-band">
        {facts.map((fact) => (
          <div key={fact.label} className="v3-metrics-band-item">
            <p className="v3-metrics-band-value tabular-nums">{fact.value}</p>
            <p className="v3-metrics-band-label">{fact.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function V5MetricsBandValue({ value }: { value: string }) {
  const rangeMatch = value.match(/^(.+?)\s*[–—-]\s*(.+)$/);
  const shouldStackRange =
    rangeMatch &&
    (rangeMatch[1].includes(",") || value.replace(/\s/g, "").length > 11);

  if (rangeMatch && shouldStackRange) {
    const [, start, end] = rangeMatch;
    return (
      <p className="v5-metrics-band-value tabular-nums">
        <span className="v5-metrics-band-value-line">{start.trim()} –</span>
        <span className="v5-metrics-band-value-line">{end.trim()}</span>
      </p>
    );
  }

  return <p className="v5-metrics-band-value tabular-nums">{value}</p>;
}

export function V5MetricsBand({ facts }: { facts: MetricsBandFact[] }) {
  return (
    <div className="v5-metrics-band-shell">
      <div className="v5-metrics-band">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={cn(
              "v5-metrics-band-item",
              index === 0 && "v5-metrics-band-item--anchor",
            )}
          >
            <V5MetricsBandValue value={fact.value} />
            <p className="v5-metrics-band-label">{fact.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuickFactsBentoSection({
  data,
  siteVersion = "v3",
}: {
  data: QuickFacts;
  siteVersion?: MicrositeVersionId;
}) {
  const ordered = sortFactsForBento(data.facts);
  const size =
    getFactByKey(ordered, "size_sqft") ??
    getFactByKey(ordered, "size") ??
    getFactByKey(ordered, "area") ??
    ordered[0];
  const bedrooms = getFactByKey(ordered, "bedrooms") ?? ordered[1];
  const bathrooms = getFactByKey(ordered, "bathrooms") ?? ordered[2];
  const homes = getFactByKey(ordered, "homes") ?? ordered[3];
  const price = getFactByKey(ordered, "starting_price") ?? ordered[4];
  const collections =
    getFactByKey(ordered, "collections") ??
    getFactByKey(ordered, "phases") ??
    ordered[5];

  if (isEditorialVersion(siteVersion)) {
    return (
      <SectionShell id="quickFacts" siteVersion={siteVersion} reveal={false}>
        <SectionIntro
          label="Details"
          title={data.title ?? "At a Glance"}
          showRule={false}
          className="mb-8 md:mb-10"
        />
        <V3MetricsBand facts={getMetricsBandFacts(data)} />
      </SectionShell>
    );
  }

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

        {size && <MetricCell value={size.value} label={size.label} />}
        {price && <MetricCell value={price.value} label={price.label} countSpeed="fast" />}
        {bedrooms && <MetricCell value={bedrooms.value} label={bedrooms.label} />}
        {bathrooms && <MetricCell value={bathrooms.value} label={bathrooms.label} />}
        {homes && <MetricCell value={homes.value} label={homes.label} />}
        {collections && <MetricCell value={collections.value} label={collections.label} />}
      </div>
    </SectionShell>
  );
}
