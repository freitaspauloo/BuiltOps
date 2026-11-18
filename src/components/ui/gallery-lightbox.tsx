"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import type { GalleryImage } from "@/lib/types/community";
import { cn } from "@/lib/utils/cn";

export function GalleryLightboxDialog({
  images,
  index,
  open,
  onOpenChange,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (index: number) => void;
}) {
  const thumbsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const image = images[index];
  const count = images.length;

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + count) % count);
  }, [count, index, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % count);
  }, [count, index, onNavigate]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const active = thumbsRef.current?.querySelector(`[data-index="${index}"]`);
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [index, open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrev, onOpenChange, open]);

  if (!open || !image || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex flex-col bg-foreground/95"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] border border-white/35 bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 md:top-5 md:right-5 md:h-12 md:w-12"
        aria-label="Close gallery"
      >
        <XIcon className="size-6 md:size-7" strokeWidth={1.5} />
      </button>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-6 md:px-20 md:py-8">
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-80 md:left-5"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="size-8" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-80 md:right-5"
              aria-label="Next image"
            >
              <ChevronRightIcon className="size-8" strokeWidth={1.5} />
            </button>
          </>
        )}

        <figure className="relative h-[min(78vh,calc(100dvh-10rem))] w-full max-w-[min(94vw,1320px)]">
          <Image
            key={image.url}
            src={image.url}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 94vw, 1320px"
            priority
          />
        </figure>
      </div>

      <div className="shrink-0 border-t border-white/10 px-4 py-3 md:px-6 md:py-4">
        <p className="mb-3 truncate text-center text-sm text-white/75">
          {image.caption ?? image.alt}
          <span className="text-white/45">
            {" "}
            · {index + 1} of {count}
          </span>
        </p>

        {count > 1 && (
          <div
            ref={thumbsRef}
            className="gallery-thumbs flex justify-center gap-2 overflow-x-auto pb-1 md:gap-3"
          >
            {images.map((entry, thumbIndex) => {
              const isActive = thumbIndex === index;
              return (
                <button
                  key={entry.url}
                  type="button"
                  data-index={thumbIndex}
                  onClick={() => onNavigate(thumbIndex)}
                  aria-label={`View image ${thumbIndex + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "gallery-thumb relative h-14 w-20 shrink-0 overflow-hidden border-2 bg-card md:h-16 md:w-24",
                    isActive
                      ? "gallery-thumb--active border-white"
                      : "border-transparent opacity-70 hover:opacity-100",
                  )}
                >
                  <Image
                    src={entry.url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
