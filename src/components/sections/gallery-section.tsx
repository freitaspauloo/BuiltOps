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

  // Centre the active thumbnail by moving the strip's own scroll position.
  // scrollIntoView would walk up to the document and yank the whole page down
  // to the gallery on first paint.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.querySelector<HTMLElement>(`[data-thumb-index="${active}"]`);
    if (!strip || !thumb) return;

    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  if (count === 0) return null;

  const current = images[active];
  const directionAttr = direction === 1 ? "next" : direction === -1 ? "prev" : "none";

  const navButtons =
    count > 1 ? (
      <div className="flex shrink-0 items-center gap-4">
        <p className="text-sm tabular-nums text-muted">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
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
      </div>
    ) : undefined;

  return (
    <SectionShell id="gallery" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Gallery"
        title={siteVersion === "v1" ? "Selected works" : "Community gallery"}
        description="Interiors, exteriors, and the neighbourhood around Benchmark."
        aside={navButtons}
        siteVersion={siteVersion}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <div
        {...regionProps}
        data-direction={directionAttr}
        className="gallery-viewer relative w-full outline-none"
      >
        <div className="gallery-main relative aspect-[4/3] w-full overflow-hidden bg-card sm:aspect-[16/10] lg:aspect-[16/9]">
          <Image
            key={active}
            src={current.url}
            alt={current.alt}
            fill
            className="gallery-main-image object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 92vw, 1320px"
            priority={active === 0}
          />

          {current.caption && (
            <p className="gallery-slide-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-6 pb-6 pt-16 text-sm font-medium text-white md:px-8 md:pb-8 md:text-base">
              {current.caption}
            </p>
          )}
        </div>

        {count > 1 && (
          <div
            ref={thumbsRef}
            className="gallery-thumbs mt-3 flex gap-2 overflow-x-auto pb-1 md:mt-4 md:gap-3"
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
                    "gallery-thumb group relative aspect-[4/3] w-[5.5rem] shrink-0 overflow-hidden bg-card sm:w-[6.5rem] md:w-[7.5rem] lg:w-[8.5rem]",
                    isActive && "gallery-thumb--active",
                  )}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="136px"
                  />
                  <span className="gallery-thumb-veil" aria-hidden />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
