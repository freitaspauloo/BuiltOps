"use client";

import Image from "next/image";
import type { Testimonial } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { RiStarFill } from "react-icons/ri";
import { useCarouselA11y, wrapIndex } from "@/lib/hooks/use-carousel-a11y";

function TestimonialCard({
  testimonial,
  variant,
  onSelect,
}: {
  testimonial: Testimonial;
  variant: "center" | "side";
  onSelect?: () => void;
}) {
  const isCenter = variant === "center";

  const content = (
    <>
      {testimonial.image && (
        <div
          className={cn(
            "relative shrink-0 overflow-hidden bg-card",
            isCenter
              ? "aspect-[4/5] w-full sm:w-[220px] lg:w-[260px]"
              : "aspect-[4/5] w-full",
          )}
        >
          <Image
            src={testimonial.image}
            alt={testimonial.author}
            fill
            className="object-cover"
            sizes={isCenter ? "260px" : "200px"}
          />
        </div>
      )}
      <div
        className={cn(
          "flex flex-1 flex-col justify-between bg-card",
          isCenter ? "p-6 sm:p-7 lg:p-8" : "p-5",
        )}
      >
        <div>
          {isCenter && (
            <div className="mb-4 flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <AppIcon key={i} icon={RiStarFill} size={14} />
              ))}
            </div>
          )}
          <blockquote
            className={cn(
              "leading-snug text-foreground",
              isCenter
                ? "text-base font-medium sm:text-lg lg:text-xl"
                : "line-clamp-4 text-sm font-medium",
            )}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
        </div>
        <figcaption className={cn(isCenter ? "mt-6" : "mt-4")}>
          <p className={cn("font-semibold text-foreground", isCenter ? "text-sm" : "text-xs")}>
            {testimonial.author}
          </p>
          {testimonial.role && (
            <p className={cn("text-muted", isCenter ? "mt-0.5 text-sm" : "mt-0.5 text-xs")}>
              {testimonial.role}
            </p>
          )}
        </figcaption>
      </div>
    </>
  );

  if (isCenter) {
    return (
      <figure className="flex w-[min(100%,720px)] shrink-0 flex-col overflow-hidden sm:flex-row">
        {content}
      </figure>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`View testimonial from ${testimonial.author}`}
      className="carousel-control flex w-[min(72%,240px)] shrink-0 flex-col overflow-hidden text-left opacity-75 transition-opacity hover:opacity-100 sm:w-[28%] sm:max-w-[240px]"
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
  const { active, goPrev, goNext, goTo, regionProps, announcement } = useCarouselA11y(
    count,
    "Testimonial",
  );

  if (count === 0) return null;

  const visible =
    count === 1
      ? [0]
      : count === 2
        ? [wrapIndex(active - 1, count), active]
        : [wrapIndex(active - 1, count), active, wrapIndex(active + 1, count)];

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

      <div {...regionProps} className="relative mx-auto w-full max-w-[1200px] overflow-hidden outline-none">
        <div
          className={cn(
            "flex items-stretch justify-center gap-3 sm:gap-4 md:gap-5",
            count === 1 && "justify-center",
          )}
        >
          {visible.map((itemIndex, position) => {
            const isCenter = count === 1 || position === 1;
            const testimonial = items[itemIndex];

            if (isCenter) {
              return (
                <TestimonialCard
                  key={`${testimonial.author}-${itemIndex}-center`}
                  testimonial={testimonial}
                  variant="center"
                />
              );
            }

            return (
              <div key={`${testimonial.author}-${itemIndex}-side`} className="max-sm:hidden">
                <TestimonialCard
                  testimonial={testimonial}
                  variant="side"
                  onSelect={() => goTo(itemIndex)}
                />
              </div>
            );
          })}
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
