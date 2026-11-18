"use client";

import type { ReactNode, RefObject } from "react";
import {
  CarouselNavButtons,
  HorizontalScrollTrack,
} from "@/components/ui/horizontal-scroll-track";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/utils/cn";

export function V3StickyScrollSection({
  label,
  title,
  description,
  trackRef,
  showNav,
  onPrev,
  onNext,
  prevLabel = "Previous",
  nextLabel = "Next",
  bleedClassName = "v3-sticky-scroll-bleed",
  trackClassName,
  children,
}: {
  label?: string;
  title: string;
  description?: string;
  trackRef: RefObject<HTMLDivElement | null>;
  showNav: boolean;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  bleedClassName?: string;
  trackClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className="v3-sticky-scroll">
      <aside className="v3-sticky-scroll-aside">
        <SectionIntro
          label={label}
          title={title}
          description={description}
          showRule={false}
          className="mb-0"
        />
        {showNav && (
          <div className="mt-8 hidden lg:block">
            <CarouselNavButtons
              onPrev={onPrev}
              onNext={onNext}
              prevLabel={prevLabel}
              nextLabel={nextLabel}
            />
          </div>
        )}
      </aside>

      <div className="v3-sticky-scroll-column">
        {showNav && (
          <div className="mb-4 flex justify-end lg:hidden">
            <CarouselNavButtons
              onPrev={onPrev}
              onNext={onNext}
              prevLabel={prevLabel}
              nextLabel={nextLabel}
            />
          </div>
        )}

        <HorizontalScrollTrack
          trackRef={trackRef}
          bleedClassName={bleedClassName}
          className={cn("scroll-smooth lg:pl-0", trackClassName)}
        >
          {children}
        </HorizontalScrollTrack>
      </div>
    </div>
  );
}
