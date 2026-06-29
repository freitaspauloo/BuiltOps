"use client";

import Image from "next/image";
import type { GalleryImage } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { getSlideRole, useCarouselA11y } from "@/lib/hooks/use-carousel-a11y";

export function GallerySection({
  images,
  siteVersion = "v2",
}: {
  images: GalleryImage[];
  siteVersion?: MicrositeVersionId;
}) {
  const count = images.length;
  const { active, direction, goPrev, goNext, goTo, regionProps, announcement } = useCarouselA11y(
    count,
    "Gallery slide",
  );

  if (count === 0) return null;

  const directionAttr = direction === 1 ? "next" : direction === -1 ? "prev" : "none";

  return (
    <SectionShell id="gallery" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Gallery"
        title={siteVersion === "v1" ? "Selected works" : "Community gallery"}
        description="Interiors, exteriors, and neighbourhood."
        siteVersion={siteVersion}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <div
        {...regionProps}
        className="relative mx-auto w-full max-w-[1200px] overflow-hidden outline-none"
      >
        <div
          className="gallery-strip flex items-end justify-center"
          data-direction={directionAttr}
          data-count={count}
        >
          {images.map((image, index) => {
            const role = getSlideRole(index, active, count);
            const isActive = role === "active";
            const isHidden = role === "hidden";

            if (isHidden) {
              return (
                <div
                  key={image.url}
                  className="gallery-slide gallery-slide--hidden"
                  aria-hidden
                />
              );
            }

            const slideInner = (
              <>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className={cn(
                    "object-cover",
                    isActive ? "gallery-slide-image--active" : "gallery-slide-image--adjacent",
                  )}
                  sizes={
                    isActive
                      ? "(max-width: 640px) 100vw, 420px"
                      : "(max-width: 1024px) 28vw, 260px"
                  }
                  priority={index === 0}
                />

                {isActive && image.caption && (
                  <p className="gallery-slide-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-5 pt-12 text-sm font-medium text-white">
                    {image.caption}
                  </p>
                )}
              </>
            );

            if (isActive) {
              return (
                <div
                  key={image.url}
                  className="gallery-slide gallery-slide--active relative z-10 aspect-[3/4] shrink-0 overflow-hidden bg-card"
                  aria-hidden={false}
                >
                  {slideInner}

                  {count > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous image"
                        className="carousel-control absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 sm:left-4 sm:h-11 sm:w-11"
                      >
                        <AppIcon icon={UI_ICONS.chevronLeft} size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next image"
                        className="carousel-control absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 sm:right-4 sm:h-11 sm:w-11"
                      >
                        <AppIcon icon={UI_ICONS.chevronRight} size={18} />
                      </button>
                    </>
                  )}
                </div>
              );
            }

            return (
              <button
                key={image.url}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`View ${image.alt}`}
                className={cn(
                  "gallery-slide gallery-slide--adjacent group relative aspect-[3/4] shrink-0 overflow-hidden bg-card",
                  role === "prev" ? "gallery-slide--prev" : "gallery-slide--next",
                )}
              >
                {slideInner}
              </button>
            );
          })}
        </div>

        {count > 1 && (
          <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
            {images.map((img, i) => (
              <button
                key={img.url}
                type="button"
                aria-label={`Go to ${img.alt}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
                  i === active ? "w-6 bg-primary" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
