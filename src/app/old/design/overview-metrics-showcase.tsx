import type { ReactNode } from "react";
import { V5OverviewLayouts } from "@/components/sections/v5-overview-layouts";
import type { CommunityOverview, OverviewSectionLayoutVariant, SnapshotFact } from "@/lib/types/community";
import { cn } from "@/lib/utils/cn";

const BENCHMARK_OVERVIEW: CommunityOverview = {
  title: "Discover a New Standard of Living in the Heart of Niagara's Wine Country",
  introduction:
    "Benchmark by Losani Homes is more than a place to live — it is a celebration of lifestyle, architecture, and location in the heart of wine country.",
  description:
    "Modern townhomes on the Beamsville Bench feature open-concept layouts, customizable finishes, and gourmet kitchens. Walk to vineyards, farm-to-table dining, and scenic Niagara Escarpment trails.",
};

const BENCHMARK_FACTS: SnapshotFact[] = [
  { label: "Homes", value: "Townhomes" },
  { label: "Size (sqft)", value: "1,205 – 2,115" },
  { label: "Bedrooms", value: "3" },
  { label: "Bathrooms", value: "2.5 – 3.5" },
  { label: "Starting Price", value: "$499,900" },
  { label: "Phases", value: "2" },
];

const VARIANTS = [
  {
    id: "bento-poster" as const,
    title: "Split grid",
    description:
      "Bold introduction on the left, 3×2 outline pill grid on the right. Live on Benchmark.",
    live: true,
  },
  {
    id: "stacked-pills" as const,
    title: "Stacked",
    description:
      "Same editorial copy and outline pills, stacked vertically — prose first, full-width pill grid below.",
  },
  {
    id: "vertical-rail" as const,
    title: "Vertical rail",
    description:
      "Prose on the left with a narrow single-column pill rail on the right — compact and scannable.",
  },
  {
    id: "inline-band" as const,
    title: "Inline band",
    description:
      "Prose on top, stats in a horizontal wrapping band of equal outline pills underneath.",
  },
] as const;

function ShowcaseBlock({
  title,
  description,
  badge,
  children,
}: {
  title: string;
  description: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="card-surface rounded-none p-6 md:p-8">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="v3-section-label">{title}</p>
        {badge ? (
          <span className="bg-primary px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-primary-foreground">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
      <div data-microsite-version="v5">{children}</div>
    </div>
  );
}

export function OverviewMetricsShowcase() {
  return (
    <div className={cn("flex flex-col gap-8")} data-microsite-version="v5">
      {VARIANTS.map((variant) => (
        <ShowcaseBlock
          key={variant.id}
          title={variant.title}
          description={variant.description}
          badge={"live" in variant && variant.live ? "Live on site" : undefined}
        >
          <V5OverviewLayouts
            data={BENCHMARK_OVERVIEW}
            facts={BENCHMARK_FACTS}
            variant={variant.id as OverviewSectionLayoutVariant}
          />
        </ShowcaseBlock>
      ))}
    </div>
  );
}
