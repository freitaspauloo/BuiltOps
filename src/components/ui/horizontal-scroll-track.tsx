"use client";

import { useCallback, useRef, type ReactNode, type RefObject } from "react";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";

export const HORIZONTAL_SCROLL_GAP = 20;

export function CarouselNavButtons({
  onPrev,
  onNext,
  prevLabel = "Previous",
  nextLabel = "Next",
  className,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex shrink-0 gap-2", className)}>
      <button
        type="button"
        aria-label={prevLabel}
        onClick={onPrev}
        className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
      >
        <AppIcon icon={UI_ICONS.chevronLeft} size={18} />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={onNext}
        className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
      >
        <AppIcon icon={UI_ICONS.chevronRight} size={18} />
      </button>
    </div>
  );
}

export function useHorizontalScroll(gap = HORIZONTAL_SCROLL_GAP) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;

      const card = track.querySelector<HTMLElement>("[data-scroll-card], article");
      const step = card ? card.offsetWidth + gap : track.clientWidth * 0.85;
      track.scrollBy({ left: direction * step, behavior: "smooth" });
    },
    [gap],
  );

  return {
    trackRef,
    scrollPrev: () => scrollByCard(-1),
    scrollNext: () => scrollByCard(1),
  };
}

export function HorizontalScrollTrack({
  children,
  trackRef,
  className,
  bleedClassName = "v3-horizontal-bleed",
}: {
  children: ReactNode;
  trackRef: RefObject<HTMLDivElement | null>;
  className?: string;
  bleedClassName?: string;
}) {
  return (
    <div className={bleedClassName}>
      <div
        ref={trackRef}
        className={cn(
          "scrollbar-hide flex snap-x snap-mandatory snap-proximity flex-nowrap gap-5 overflow-x-auto overscroll-x-contain py-1 pl-6 pr-6 [-webkit-overflow-scrolling:touch] md:pl-10 md:pr-10 lg:pl-16 lg:pr-16",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
