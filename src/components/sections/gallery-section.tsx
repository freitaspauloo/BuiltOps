"use client";

import Image from "next/image";
import type { GalleryImage } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { useCarouselA11y, wrapIndex } from "@/lib/hooks/use-carousel-a11y";

export function GallerySection({
  images,
  siteVersion = "v2",
}: {
  images: GalleryImage[];
  siteVersion?: MicrositeVersionId;
}) {
  const count = images.length;
  const { active, goPrev, goNext, goTo, regionProps, announcement } = useCarouselA11y(
    count,
    "Gallery slide",
  );

  if (count === 0) return null;

  const visible =
    count === 1
      ? [0]
      : count === 2
        ? [wrapIndex(active - 1, count), active]
        : [wrapIndex(active - 1, count), active, wrapIndex(active + 1, count)];

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

      <div {...regionProps} className="relative mx-auto w-full max-w-[1200px] overflow-hidden outline-none">
        <div
          className={cn(
            "flex items-end justify-center gap-3 sm:gap-4 md:gap-5",
            count === 1 && "justify-center",
          )}
        >
          {visible.map((imageIndex, position) => {
            const isCenter = count === 1 || position === 1;
            const image = images[imageIndex];

            if (isCenter) {
              return (
                <div
                  key={`${image.url}-${imageIndex}`}
                  className="gallery-slide-center relative z-10 aspect-[3/4] w-full max-w-[420px] shrink-0 overflow-hidden bg-card sm:w-[42%]"
                  aria-hidden={false}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 420px"
                    priority={active === 0}
                  />

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

                  {image.caption && (
                    <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-5 pt-12 text-sm font-medium text-white">
                      {image.caption}
                    </p>
                  )}
                </div>
              );
            }

            return (
              <button
                key={`${image.url}-${imageIndex}`}
                type="button"
                onClick={() => goTo(imageIndex)}
                aria-label={`View ${image.alt}`}
                className={cn(
                  "carousel-control group relative aspect-[3/4] shrink-0 overflow-hidden bg-card opacity-80 transition-opacity duration-500 ease-[var(--ease-out-soft)] hover:opacity-100",
                  count === 2
                    ? "w-[34%] max-w-[260px]"
                    : "w-[28%] max-w-[260px] max-sm:hidden",
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="carousel-slide-hover object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 28vw, 260px"
                />
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
