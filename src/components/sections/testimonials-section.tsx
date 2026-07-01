"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { useCarouselA11y } from "@/lib/hooks/use-carousel-a11y";

const SLIDE_GAP = 24;

function TestimonialCard({
  testimonial,
  isActive,
  onSelect,
}: {
  testimonial: Testimonial;
  isActive: boolean;
  onSelect?: () => void;
}) {
  const content = (
    <>
      {testimonial.image && (
        <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-card sm:w-[220px] lg:w-[260px]">
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="260px"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between bg-card p-6 sm:p-7 lg:p-8">
        <div>
          <div className="mb-4 flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <AppIcon
                key={i}
                icon={UI_ICONS.star}
                size={14}
                className="fill-primary text-primary"
              />
            ))}
          </div>
          <blockquote className="text-base font-medium leading-snug text-foreground sm:text-lg lg:text-xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
        </div>
        <figcaption className="mt-6">
          <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
          {testimonial.role && (
            <p className="mt-0.5 text-sm text-muted">{testimonial.role}</p>
          )}
        </figcaption>
      </div>
    </>
  );

  const className = cn(
    "group flex w-[min(100%,720px)] shrink-0 flex-col overflow-hidden transition-opacity duration-500 sm:flex-row",
    isActive ? "opacity-100" : "opacity-40 hover:opacity-65",
  );

  if (isActive) {
    return <figure className={className}>{content}</figure>;
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View testimonial from ${testimonial.author}`}
      className={cn("carousel-control text-left", className)}
    >
      {content}
    </button>
  );
}

export function TestimonialsSection({
  items,
  siteVersion = "v2",
}: {
  items: Testimonial[];
  siteVersion?: MicrositeVersionId;
}) {
  const count = items.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { active, goPrev, goNext, goTo, regionProps, announcement } = useCarouselA11y(
    count,
    "Testimonial",
  );

  const measure = useCallback(() => {
    const slide = slideRef.current;
    const track = trackRef.current;
    if (!slide || !track) return;

    const slideWidth = slide.offsetWidth;
    setOffset(track.offsetWidth / 2 - slideWidth / 2 - active * (slideWidth + SLIDE_GAP));
  }, [active]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const updateMobile = () => setIsMobile(mq.matches);
    updateMobile();
    mq.addEventListener("change", updateMobile);
    return () => mq.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  if (count === 0) return null;

  const navButtons =
    count > 1 ? (
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          aria-label="Previous story"
          onClick={goPrev}
          className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
        >
          <AppIcon icon={UI_ICONS.chevronLeft} size={18} />
        </button>
        <button
          type="button"
          aria-label="Next story"
          onClick={goNext}
          className="carousel-control h-10 w-10 sm:h-11 sm:w-11"
        >
          <AppIcon icon={UI_ICONS.chevronRight} size={18} />
        </button>
      </div>
    ) : undefined;

  return (
    <SectionShell id="testimonials" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Stories"
        title="Homeowner stories"
        description="Real experiences from buyers and homeowners in our communities."
        aside={navButtons}
        siteVersion={siteVersion}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      <div
        {...regionProps}
        className="relative mx-auto w-full max-w-[1200px] overflow-hidden outline-none"
      >
        <div ref={trackRef} className="overflow-hidden py-2">
          <div
            className={cn(
              "flex items-stretch transition-transform duration-700 ease-[var(--ease-out-soft)]",
              isMobile && "justify-center",
            )}
            style={{
              gap: SLIDE_GAP,
              transform: count > 1 && !isMobile ? `translateX(${offset}px)` : undefined,
            }}
          >
            {items.map((testimonial, index) => (
              <div
                key={`${testimonial.author}-${index}`}
                ref={index === 0 ? slideRef : undefined}
                className={cn("shrink-0", index !== active && "max-sm:hidden")}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === active}
                  onSelect={index === active ? undefined : () => goTo(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {count > 1 && (
          <div className="mt-6 flex justify-center gap-1.5 sm:hidden">
            {items.map((item, i) => (
              <button
                key={item.author}
                type="button"
                aria-label={`Go to story from ${item.author}`}
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
