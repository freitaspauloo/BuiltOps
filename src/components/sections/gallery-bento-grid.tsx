"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import type { GalleryImage } from "@/lib/types/community";
import { GalleryLightboxDialog } from "@/components/ui/gallery-lightbox";
import { cn } from "@/lib/utils/cn";
import { embedUrl } from "./video-section";

const SMALL_AREAS = [
  "gallery-bento-s0",
  "gallery-bento-s1",
  "gallery-bento-s2",
  "gallery-bento-s3",
] as const;

function BentoPhoto({
  image,
  className,
  priority,
  sizes,
  onSelect,
  moreCount,
}: {
  image: GalleryImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
  onSelect: (image: GalleryImage) => void;
  moreCount?: number;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(image)}
      className={cn(
        "gallery-bento-cell group cursor-zoom-in border-0 bg-card p-0 text-left",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary",
        className,
      )}
      aria-label={
        moreCount && moreCount > 0
          ? `View gallery — ${moreCount} more photos`
          : `View ${image.alt}`
      }
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        sizes={sizes ?? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"}
        priority={priority}
      />
      {moreCount && moreCount > 0 ? (
        <span className="gallery-bento-more-chip" aria-hidden>
          +{moreCount} photos
        </span>
      ) : null}
    </button>
  );
}

function youtubeVideoId(url: string): string | null {
  const match = url.match(/youtube\.com\/embed\/([\w-]{6,})/);
  return match?.[1] ?? null;
}

/** Click-to-load facade — the YouTube iframe only loads after user intent. */
function BentoVideo({
  videoUrl,
  fallbackImage,
  onSelect,
}: {
  videoUrl: string;
  fallbackImage?: GalleryImage;
  onSelect: (image: GalleryImage) => void;
}) {
  const [activated, setActivated] = useState(false);
  const src = embedUrl(videoUrl);
  const videoId = youtubeVideoId(videoUrl);

  if (!videoId && fallbackImage) {
    return (
      <BentoPhoto
        image={fallbackImage}
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="gallery-bento-lead scroll-mt-[var(--nav-height,4rem)]"
        onSelect={onSelect}
      />
    );
  }

  return (
    <figure
      id="video"
      className="gallery-bento-cell gallery-bento-lead scroll-mt-[var(--nav-height,4rem)]"
    >
      {activated || !videoId ? (
        <iframe
          src={activated ? `${src}${src.includes("?") ? "&" : "?"}autoplay=1` : src}
          title="Community video"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer border-0 bg-card p-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
          aria-label="Play community video"
        >
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt="Community video preview"
            fill
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" aria-hidden />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[var(--radius-control)] bg-white/95 text-foreground shadow-[var(--shadow-card)] transition-transform group-hover:scale-105"
            aria-hidden
          >
            <PlayIcon className="ml-0.5 size-7 fill-current" strokeWidth={1} />
          </span>
        </button>
      )}
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback(
    (image: GalleryImage) => {
      const index = images.findIndex((entry) => entry.url === image.url);
      setLightboxIndex(index >= 0 ? index : 0);
    },
    [images],
  );

  const closeLightbox = useCallback((open: boolean) => {
    if (!open) setLightboxIndex(null);
  }, []);

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
  const smallImages = Array.from({ length: 4 }, () => takeImage()).filter(
    (image): image is GalleryImage => image !== null,
  );
  const remainingCount = Math.max(0, images.length - index);

  return (
    <>
      <div className="gallery-bento-grid">
          {hasVideo && videoUrl ? (
            <BentoVideo
              videoUrl={videoUrl}
              fallbackImage={images[0]}
              onSelect={openLightbox}
            />
          ) : leadImage ? (
            <BentoPhoto
              image={leadImage}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="gallery-bento-lead"
              onSelect={openLightbox}
            />
          ) : null}

          {smallImages.map((image, slot) => {
            const isLast = slot === smallImages.length - 1;
            return (
              <BentoPhoto
                key={`${image.url}-small-${slot}`}
                image={image}
                priority={!hasVideo && slot === 0 && !leadImage}
                className={SMALL_AREAS[slot]}
                onSelect={openLightbox}
                moreCount={isLast ? remainingCount : undefined}
              />
            );
          })}
      </div>

      <GalleryLightboxDialog
        images={images}
        index={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        onOpenChange={closeLightbox}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
