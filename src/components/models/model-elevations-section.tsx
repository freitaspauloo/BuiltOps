"use client";

import { useMemo, useState } from "react";
import type { HomeModel } from "@/lib/types/model";
import type { GalleryImage } from "@/lib/types/community";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { GalleryLightboxDialog } from "@/components/ui/gallery-lightbox";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";

export function ModelElevationsSection({ model }: { model: HomeModel }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const isDetached = model.homeType === "detached";
  const elevations = useMemo(
    () => (isDetached ? model.elevations : model.elevations.slice(0, 1)),
    [isDetached, model.elevations],
  );

  const images = useMemo<GalleryImage[]>(
    () =>
      elevations.map((elevation) => ({
        url: elevation.image,
        alt: elevation.name,
        caption: elevation.description
          ? `${elevation.name} — ${elevation.description}`
          : elevation.name,
      })),
    [elevations],
  );

  if (elevations.length === 0) return null;

  if (!isDetached) {
    const elevation = elevations[0];
    return (
      <SectionShell id="elevations" siteVersion="v6" reveal={false}>
        <SectionIntro
          label="Exterior"
          title="Elevation"
          description={`The ${model.name} townhome elevation — materials and streetscape as shown. Personalize interiors at the Losani Design Centre after you purchase.`}
          showRule={false}
          className="mb-8 md:mb-10"
        />
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          className="group block w-full max-w-3xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`View ${elevation.name} full screen`}
        >
          <div className="v3-portfolio-tile overflow-hidden rounded-[var(--radius-card)] bg-card">
            <CardPhotoLens
              src={elevation.image}
              alt={elevation.name}
              aspectClass="aspect-[16/10] h-full"
              enableLens={false}
              imageClassName="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-foreground">{elevation.name}</h3>
            {elevation.description && (
              <p className="mt-1 text-sm text-muted">{elevation.description}</p>
            )}
          </div>
        </button>
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

  return (
    <SectionShell id="elevations" siteVersion="v6" reveal={false}>
      <SectionIntro
        label="Exterior styles"
        title="Choose your elevation"
        description={`The ${model.name} is available in ${elevations.length} architectural styles — each with its own material palette and streetscape character.`}
        showRule={false}
        className="mb-8 md:mb-10"
      />

      <div className="grid gap-10 sm:grid-cols-2 lg:gap-12">
        {elevations.map((elevation, elevationIndex) => (
          <button
            key={elevation.id}
            type="button"
            onClick={() => {
              setIndex(elevationIndex);
              setOpen(true);
            }}
            className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`View ${elevation.name} full screen`}
          >
            <div className="v3-portfolio-tile overflow-hidden rounded-[var(--radius-card)] bg-card">
              <CardPhotoLens
                src={elevation.image}
                alt={elevation.name}
                aspectClass="aspect-[4/3] h-full"
                enableLens={false}
                imageClassName="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {elevation.name}
              </h3>
              {elevation.description && (
                <p className="mt-1 text-sm text-muted">{elevation.description}</p>
              )}
            </div>
          </button>
        ))}
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
