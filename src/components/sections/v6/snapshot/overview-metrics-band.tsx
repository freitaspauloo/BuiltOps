import type { ReactNode } from "react";
import type { SnapshotFact } from "@/lib/types/community";
import { cn } from "@/lib/utils/cn";

export type V5MetricsLayoutVariant = "spotlight" | "ribbon" | "chips" | "grid";

const PRICE_LABEL = "starting price";

function isPriceFact(fact: SnapshotFact) {
  return fact.label.trim().toLowerCase() === PRICE_LABEL;
}

function getPriceFact(facts: SnapshotFact[]) {
  return facts.find(isPriceFact) ?? facts[0];
}

function getSpecFacts(facts: SnapshotFact[]) {
  const price = getPriceFact(facts);
  return facts.filter((fact) => fact !== price);
}

function formatValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return { lines: [""] };
  if (trimmed.includes("–") || trimmed.includes("-")) {
    return { lines: trimmed.split(/\s*[–-]\s*/) };
  }
  return { lines: [trimmed] };
}

function MetricsValue({
  value,
  className,
  anchor = false,
}: {
  value: string;
  className?: string;
  anchor?: boolean;
}) {
  const { lines } = formatValue(value);
  return (
    <p
      className={cn(
        anchor ? "v5-metrics-band-value" : "v5-metrics-spec-value",
        className,
      )}
    >
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="v5-metrics-band-value-line">
          {line}
        </span>
      ))}
    </p>
  );
}

function MetricsLabel({ label, anchor = false }: { label: string; anchor?: boolean }) {
  return (
    <p className={cn(anchor ? "v5-metrics-band-label" : "v5-metrics-spec-label")}>
      {label}
    </p>
  );
}

/** Legacy 3×2 bordered grid — kept for design comparison. */
export function V5MetricsGrid({ facts }: { facts: SnapshotFact[] }) {
  const priceFact = getPriceFact(facts);
  const ordered = [priceFact, ...getSpecFacts(facts)];

  return (
    <div className="v5-metrics-band-shell">
      <dl className="v5-metrics-band">
        {ordered.map((fact) => {
          const isAnchor = fact === priceFact;
          return (
            <div
              key={fact.label}
              className={cn(
                "v5-metrics-band-item",
                isAnchor && "v5-metrics-band-item--anchor",
              )}
            >
              <MetricsValue value={fact.value} anchor={isAnchor} />
              <MetricsLabel label={fact.label} anchor={isAnchor} />
            </div>
          );
        })}
      </dl>
    </div>
  );
}

/** Price hero band + horizontal spec rail — default live layout. */
function V5MetricsSpotlight({ facts }: { facts: SnapshotFact[] }) {
  const priceFact = getPriceFact(facts);
  const specs = getSpecFacts(facts);

  return (
    <div className="v5-metrics-spotlight">
      <div className="v5-metrics-spotlight-hero">
        <MetricsValue value={priceFact.value} anchor />
        <MetricsLabel label={priceFact.label} anchor />
      </div>
      <dl className="v5-metrics-spotlight-rail">
        {specs.map((fact) => (
          <div key={fact.label} className="v5-metrics-spotlight-rail-item">
            <MetricsValue value={fact.value} />
            <MetricsLabel label={fact.label} />
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Single editorial strip — all stats inline with hairline dividers. */
function V5MetricsRibbon({ facts }: { facts: SnapshotFact[] }) {
  const priceFact = getPriceFact(facts);
  const ordered = [priceFact, ...getSpecFacts(facts)];

  return (
    <dl className="v5-metrics-ribbon">
      {ordered.map((fact, index) => {
        const isAnchor = fact === priceFact;
        return (
          <div
            key={fact.label}
            className={cn(
              "v5-metrics-ribbon-item",
              isAnchor && "v5-metrics-ribbon-item--anchor",
              index === ordered.length - 1 && "v5-metrics-ribbon-item--last",
            )}
          >
            <MetricsValue value={fact.value} anchor={isAnchor} />
            <MetricsLabel label={fact.label} anchor={isAnchor} />
          </div>
        );
      })}
    </dl>
  );
}

/** Soft fog chips — airy flex wrap, no connected grid. */
function V5MetricsChips({ facts }: { facts: SnapshotFact[] }) {
  const priceFact = getPriceFact(facts);
  const ordered = [priceFact, ...getSpecFacts(facts)];

  return (
    <dl className="v5-metrics-chips">
      {ordered.map((fact) => {
        const isAnchor = fact === priceFact;
        return (
          <div
            key={fact.label}
            className={cn("v5-metrics-chip", isAnchor && "v5-metrics-chip--anchor")}
          >
            <MetricsValue value={fact.value} anchor={isAnchor} />
            <MetricsLabel label={fact.label} anchor={isAnchor} />
          </div>
        );
      })}
    </dl>
  );
}

const VARIANT_RENDERERS: Record<
  V5MetricsLayoutVariant,
  (props: { facts: SnapshotFact[] }) => ReactNode
> = {
  spotlight: V5MetricsSpotlight,
  ribbon: V5MetricsRibbon,
  chips: V5MetricsChips,
  grid: V5MetricsGrid,
};

export function V5OverviewMetricsBand({
  facts,
  variant = "spotlight",
  className,
}: {
  facts: SnapshotFact[];
  variant?: V5MetricsLayoutVariant;
  className?: string;
}) {
  if (facts.length === 0) return null;

  const Renderer = VARIANT_RENDERERS[variant];

  return (
    <div className={cn("v5-overview-metrics", className)}>
      <Renderer facts={facts} />
    </div>
  );
}
