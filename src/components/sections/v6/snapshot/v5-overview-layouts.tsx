import type { ReactNode } from "react";
import type { CommunityOverview, OverviewSectionLayoutVariant, SnapshotFact } from "@/lib/types/community";
import { cn } from "@/lib/utils/cn";

type V5OverviewLayoutsProps = {
  data: CommunityOverview;
  facts: SnapshotFact[];
  variant: OverviewSectionLayoutVariant;
  className?: string;
};

function orderFacts(facts: SnapshotFact[]) {
  return [...facts].sort((a, b) => {
    const aIsPrice = a.label.trim().toLowerCase() === "starting price";
    const bIsPrice = b.label.trim().toLowerCase() === "starting price";
    return Number(bIsPrice) - Number(aIsPrice);
  });
}

function OutlineFacts({ facts, className }: { facts: SnapshotFact[]; className?: string }) {
  const orderedFacts = orderFacts(facts);

  return (
    <dl className={cn("v5-overview-facts v5-overview-outline-facts", className)}>
      {orderedFacts.map((fact, index) => (
        <div key={fact.label} className={cn("v5-overview-fact", index === 0 && "v5-overview-fact--lead")}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function EditorialProse({ data, className }: { data: CommunityOverview; className?: string }) {
  return (
    <div className={cn("v5-overview-prose v5-overview-prose--editorial", className)}>
      <p className="v5-overview-introduction">{data.introduction}</p>
      <p className="v5-overview-description">{data.description}</p>
    </div>
  );
}

/** Live default — prose left, 3×2 outline pills right. */
function BentoPosterLayout({ data, facts }: Omit<V5OverviewLayoutsProps, "variant" | "className">) {
  return (
    <div className="v5-overview-layout v5-overview-layout--bento-poster">
      <EditorialProse data={data} className="v5-overview-poster-copy" />
      <OutlineFacts facts={facts} className="v5-overview-poster-facts" />
    </div>
  );
}

/** Prose block on top, pill grid spanning full width below. */
function StackedPillsLayout({ data, facts }: Omit<V5OverviewLayoutsProps, "variant" | "className">) {
  return (
    <div className="v5-overview-layout v5-overview-layout--stacked-pills">
      <EditorialProse data={data} className="v5-overview-stacked-copy" />
      <OutlineFacts facts={facts} className="v5-overview-stacked-facts" />
    </div>
  );
}

/** Prose left, single-column vertical pill rail on the right. */
function VerticalRailLayout({ data, facts }: Omit<V5OverviewLayoutsProps, "variant" | "className">) {
  return (
    <div className="v5-overview-layout v5-overview-layout--vertical-rail">
      <EditorialProse data={data} className="v5-overview-rail-copy" />
      <OutlineFacts facts={facts} className="v5-overview-rail-facts" />
    </div>
  );
}

/** Prose on top, pills in a horizontal wrapping band. */
function InlineBandLayout({ data, facts }: Omit<V5OverviewLayoutsProps, "variant" | "className">) {
  return (
    <div className="v5-overview-layout v5-overview-layout--inline-band">
      <EditorialProse data={data} className="v5-overview-band-copy" />
      <OutlineFacts facts={facts} className="v5-overview-band-facts" />
    </div>
  );
}

const LAYOUTS: Record<
  OverviewSectionLayoutVariant,
  (props: Omit<V5OverviewLayoutsProps, "variant" | "className">) => ReactNode
> = {
  "bento-poster": BentoPosterLayout,
  "stacked-pills": StackedPillsLayout,
  "vertical-rail": VerticalRailLayout,
  "inline-band": InlineBandLayout,
};

export function V5OverviewLayouts({ data, facts, variant, className }: V5OverviewLayoutsProps) {
  const Layout = LAYOUTS[variant];

  return (
    <div className={cn("v5-overview-composition", className)}>
      <Layout data={data} facts={facts} />
    </div>
  );
}
