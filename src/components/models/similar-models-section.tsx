"use client";

import Image from "next/image";
import Link from "next/link";
import type { HomeModel } from "@/lib/types/model";
import { COMPARE_MODELS_URL } from "@/lib/connected-experience";
import { modelHref } from "@/lib/site-versions";
import { Button } from "@/components/ui/button";
import { HorizontalScrollTrack, useHorizontalScroll } from "@/components/ui/horizontal-scroll-track";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";

function SimilarModelCard({
  item,
  fromParam,
}: {
  item: HomeModel["similarModels"][number];
  fromParam?: string;
}) {
  const homeTypeLabel = item.homeType === "townhome" ? "Townhome" : "Detached";

  return (
    <Link
      href={fromParam ? `${modelHref(item.slug)}?from=${encodeURIComponent(fromParam)}` : modelHref(item.slug)}
      data-scroll-card
      className="model-card group flex w-[min(78vw,17.5rem)] min-w-[min(78vw,17.5rem)] shrink-0 snap-start flex-col"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
          sizes="280px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{homeTypeLabel}</p>
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {item.name}
        </h3>
        <p className="text-sm text-muted">
          {item.beds} beds · {item.baths} baths · {item.sqft.toLocaleString()} sqft
        </p>
        {item.priceFrom ? (
          <p className="mt-auto pt-2 text-sm font-semibold text-heading">{item.priceFrom}</p>
        ) : null}
      </div>
    </Link>
  );
}

export function SimilarModelsSection({
  model,
  fromParam,
}: {
  model: HomeModel;
  fromParam?: string;
}) {
  const { trackRef } = useHorizontalScroll();

  if (model.similarModels.length === 0) return null;

  return (
    <SectionShell id="similarModels" siteVersion="v6" reveal={false}>
      <SectionIntro
        label="Keep exploring"
        title="Similar models"
        description="Browse related floorplans, then compare side-by-side in the connected tool."
        showRule={false}
        className="mb-6 md:mb-8"
      />

      <HorizontalScrollTrack trackRef={trackRef} bleedClassName="v3-sticky-scroll-bleed">
        {model.similarModels.map((item) => (
          <SimilarModelCard key={item.slug} item={item} fromParam={fromParam} />
        ))}
      </HorizontalScrollTrack>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href={COMPARE_MODELS_URL} target="_blank" rel="noopener noreferrer">
          Compare models
        </Button>
        <Button href="#registration" variant="ghost" className="text-heading underline">
          Book appointment
        </Button>
      </div>
    </SectionShell>
  );
}
