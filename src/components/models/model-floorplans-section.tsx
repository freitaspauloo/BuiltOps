"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { HomeModel } from "@/lib/types/model";
import type { GalleryImage } from "@/lib/types/community";
import { Button } from "@/components/ui/button";
import { GalleryLightboxDialog } from "@/components/ui/gallery-lightbox";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";

export function ModelFloorplansSection({ model }: { model: HomeModel }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = useMemo<GalleryImage[]>(
    () =>
      model.floorLevels.map((level) => ({
        url: level.image,
        alt: `${model.name} — ${level.name}`,
        caption: level.name,
      })),
    [model.floorLevels, model.name],
  );

  if (model.floorLevels.length === 0) return null;

  return (
    <SectionShell id="floorplan" siteVersion="v6" reveal={false}>
      <SectionIntro
        label="Floorplan"
        title="Level by level"
        description={`Explore every floor of the ${model.name}. Tap any drawing to view it full screen.`}
        showRule={false}
        className="mb-6 md:mb-8"
      />

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {model.floorLevels.map((level, levelIndex) => (
          <article key={level.id} className="flex flex-col">
            <button
              type="button"
              onClick={() => {
                setIndex(levelIndex);
                setOpen(true);
              }}
              className="group relative min-h-[16rem] overflow-hidden rounded-[var(--radius-card)] border border-border bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={`View ${level.name} drawing full screen`}
            >
              <Image
                src={level.image}
                alt={`${model.name} — ${level.name}`}
                fill
                className="object-contain p-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
              <span className="pointer-events-none absolute bottom-4 right-4 rounded-[var(--radius-control)] border border-border bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                View full screen
              </span>
            </button>

            <h3 className="mt-4 text-lg font-semibold text-heading">{level.name}</h3>
            {level.highlights && level.highlights.length > 0 ? (
              <ul className="mt-3 space-y-1.5 text-sm text-body">
                {level.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden className="text-primary">
                      —
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href="#registration" size="sm">
          Inquire about this plan
        </Button>
        {model.floorplanPdfUrl ? (
          <Button
            variant="ghost"
            size="sm"
            href={model.floorplanPdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-heading underline"
          >
            Floorplan (PDF)
          </Button>
        ) : null}
        {model.factSheetUrl && model.factSheetUrl !== model.floorplanPdfUrl ? (
          <Button
            variant="ghost"
            size="sm"
            href={model.factSheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-heading underline"
          >
            Fact sheet (PDF)
          </Button>
        ) : null}
      </div>

      <GalleryLightboxDialog
        images={images}
        index={index}
        open={open}
        onOpenChange={setOpen}
        onNavigate={setIndex}
      />
    </SectionShell>
  );
}
