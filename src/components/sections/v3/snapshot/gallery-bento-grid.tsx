"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { XIcon } from "lucide-react";
import type { GalleryImage } from "@/lib/types/community";
import { cn } from "@/lib/utils/cn";
import { embedUrl } from "@/components/sections/video-section";

const SMALL_AREAS = [
  "gallery-bento-s0",
  "gallery-bento-s1",
  "gallery-bento-s2",
  "gallery-bento-s3",
  "gallery-bento-s4",
  "gallery-bento-s5",
  "gallery-bento-s6",
  "gallery-bento-s7",
] as const;

function GalleryLightbox({
  image,
  onClose,
}: {
  image: GalleryImage;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4 pt-14 md:p-10 md:pt-14"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-80"
        aria-label="Close gallery image"
      >
        <XIcon className="size-7" strokeWidth={1.5} />
      </button>

      <figure
        className="relative max-h-[85vh] w-full max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={image.url}
          alt={image.alt}
          width={1600}
          height={1200}
          className="mx-auto max-h-[85vh] w-auto max-w-full object-contain"
          sizes="100vw"
          priority
        />
        {image.caption && (
          <figcaption className="mt-4 text-center text-sm text-white/80">
            {image.caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}

function BentoPhoto({
  image,
  className,
  priority,
  sizes,
  onSelect,
}: {
  image: GalleryImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onSelect: (image: GalleryImage) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(image)}
      className={cn(
        "gallery-bento-cell group cursor-zoom-in border-0 bg-card p-0 text-left",
        className,
      )}
      aria-label={`View ${image.alt}`}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        sizes={sizes ?? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"}
        priority={priority}
      />
    </button>
  );
}

function BentoVideo({ videoUrl }: { videoUrl: string }) {
  const src = embedUrl(videoUrl);

  return (
    <figure
      id="video"
      className="gallery-bento-cell gallery-bento-lead scroll-mt-[var(--nav-height,4rem)]"
    >
      <iframe
        src={src}
        title="Community video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </figure>
  );
}

export function GalleryBentoGrid({
  images,
  videoUrl,
}: {
  images: GalleryImage[];
  videoUrl?: string;
}) {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const openLightbox = useCallback((image: GalleryImage) => setLightboxImage(image), []);
  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  if (images.length === 0 && !videoUrl) return null;

  const hasVideo = Boolean(videoUrl);
  let index = 0;

  const takeImage = () => {
    const image = images[index];
    if (!image) return null;
    index += 1;
    return image;
  };

  const leadImage = hasVideo ? null : takeImage();
  const smallImages = Array.from({ length: 8 }, () => takeImage()).filter(
    (image): image is GalleryImage => image !== null,
  );
  const heroImage = takeImage();
  const overflow = images.slice(index);

  return (
    <>
      <div className="space-y-3 md:space-y-4">
        <div className="gallery-bento-grid">
          {hasVideo && videoUrl ? (
            <BentoVideo videoUrl={videoUrl} />
          ) : leadImage ? (
            <BentoPhoto
              image={leadImage}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="gallery-bento-lead"
              onSelect={openLightbox}
            />
          ) : null}

          {smallImages.map((image, slot) => (
            <BentoPhoto
              key={`${image.url}-small-${slot}`}
              image={image}
              priority={!hasVideo && slot === 0 && !leadImage}
              className={SMALL_AREAS[slot]}
              onSelect={openLightbox}
            />
          ))}

          {heroImage && (
            <BentoPhoto
              image={heroImage}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="gallery-bento-hero"
              onSelect={openLightbox}
            />
          )}
        </div>

        {overflow.length > 0 && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {overflow.map((image) => (
              <BentoPhoto
                key={image.url}
                image={image}
                className="min-h-[10rem]"
                onSelect={openLightbox}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxImage && (
        <GalleryLightbox image={lightboxImage} onClose={closeLightbox} />
      )}
    </>
  );
}
