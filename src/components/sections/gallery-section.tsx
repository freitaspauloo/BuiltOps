"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { useCarouselA11y } from "@/lib/hooks/use-carousel-a11y";

export function GallerySection({
  images,
  siteVersion = "v2",
}: {
  images: GalleryImage[];
  siteVersion?: MicrositeVersionId;
}) {
  const count = images.length;
  const thumbsRef = useRef<HTMLDivElement>(null);
  const { active, direction, goPrev, goNext, goTo, regionProps, announcement } = useCarouselA11y(
    count,
    "Gallery slide",
  );

  useEffect(() => {
    const thumb = thumbsRef.current?.querySelector<HTMLElement>(`[data-thumb-index="${active}"]`);
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  if (count === 0) return null;

  const current = images[active];
  const directionAttr = direction === 1 ? "next" : direction === -1 ? "prev" : "none";

  const navButtons =
    count > 1 ? (
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          aria-label="Previous image"
          onClick={goPrev}
          className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
        >
          <AppIcon icon={UI_ICONS.chevronLeft} size={18} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
        >
          <AppIcon icon={UI_ICONS.chevronRight} size={18} />
        </button>
      </div>
    ) : undefined;

  return (
    <SectionShell id="gallery" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Gallery"
        title={siteVersion === "v1" ? "Selected works" : "Community gallery"}
        description="Interiors, exteriors, and neighbourhood."
        aside={navButtons}
        siteVersion={siteVersion}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <div
        {...regionProps}
        data-direction={directionAttr}
        className="gallery-viewer relative w-full max-w-2xl outline-none"
      >
        <div className="gallery-main group relative aspect-[4/3] w-full overflow-hidden bg-card sm:aspect-[16/10] md:aspect-[5/3]">
          <Image
            key={active}
            src={current.url}
            alt={current.alt}
            fill
            className="gallery-main-image object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority={active === 0}
          />

          {current.caption && (
            <p className="gallery-slide-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white md:text-base">
              {current.caption}
            </p>
          )}

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="carousel-control absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-4 sm:h-11 sm:w-11 md:opacity-100"
              >
                <AppIcon icon={UI_ICONS.chevronLeft} size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="carousel-control absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:right-4 sm:h-11 sm:w-11 md:opacity-100"
              >
                <AppIcon icon={UI_ICONS.chevronRight} size={18} />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div
            ref={thumbsRef}
            className="gallery-thumbs mt-4 flex gap-2 overflow-x-auto pb-1 md:mt-5 md:gap-2.5"
            role="tablist"
            aria-label="Gallery thumbnails"
          >
            {images.map((image, index) => {
              const isActive = index === active;

              return (
                <button
                  key={image.url}
                  type="button"
                  data-thumb-index={index}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`View ${image.alt}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    "gallery-thumb group relative aspect-[4/3] w-[4.75rem] shrink-0 overflow-hidden bg-card sm:w-[5.5rem] md:w-[6.25rem] lg:w-[7rem]",
                    isActive && "gallery-thumb--active",
                  )}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="112px"
                  />
                  <span
                    className={cn(
                      "pointer-events-none absolute inset-0 transition-all duration-300",
                      isActive
                        ? "ring-2 ring-inset ring-primary"
                        : "bg-foreground/15 opacity-80 group-hover:bg-foreground/5 group-hover:opacity-100",
                    )}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
