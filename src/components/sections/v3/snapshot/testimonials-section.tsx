"use client";

import type { Testimonial } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { useHorizontalScroll } from "@/components/ui/horizontal-scroll-track";
import { Marquee } from "@/components/ui/marquee";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { V3StickyScrollSection } from "@/components/ui/v3-sticky-scroll-section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";

function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: Testimonial;
  compact?: boolean;
}) {
  return (
    <figure
      data-scroll-card
      className={cn(
        "group flex shrink-0 snap-start flex-col overflow-hidden border border-border bg-background",
        compact
          ? "w-[17.5rem] min-w-[17.5rem] sm:w-[20rem] sm:min-w-[20rem]"
          : "w-[min(88vw,720px)] sm:flex-row",
      )}
    >
      {testimonial.image && (
        <CardPhotoLens
          src={testimonial.image}
          alt={testimonial.author}
          enableLens={false}
          aspectClass={
            compact
              ? "aspect-[4/5] h-full w-full"
              : "aspect-[4/5] h-full w-full sm:w-[220px] lg:w-[260px]"
          }
          className="shrink-0 bg-mist sm:h-auto"
          sizes={compact ? "320px" : "260px"}
        />
      )}
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col justify-between p-5 md:p-6",
          !compact && "sm:min-h-[260px] sm:p-7 lg:p-8",
        )}
      >
        <div>
          <div className="mb-4 flex gap-0.5 text-primary" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <AppIcon
                key={i}
                icon={UI_ICONS.star}
                size={14}
                className="fill-primary text-primary"
              />
            ))}
          </div>
          <blockquote className="text-base font-medium leading-snug text-foreground">
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
    </figure>
  );
}

export function TestimonialsSection({
  items,
  siteVersion = "v3",
}: {
  items: Testimonial[];
  siteVersion?: MicrositeVersionId;
}) {
  const { trackRef, scrollPrev, scrollNext } = useHorizontalScroll();

  if (items.length === 0) return null;

  if (siteVersion === "v3") {
    const showNav = items.length > 1;

    return (
      <SectionShell id="testimonials" siteVersion={siteVersion} reveal={false} muted>
        <V3StickyScrollSection
          label="Stories"
          title="Homeowner stories"
          description="Real experiences from buyers and homeowners in our communities."
          trackRef={trackRef}
          showNav={showNav}
          onPrev={scrollPrev}
          onNext={scrollNext}
          prevLabel="Previous testimonial"
          nextLabel="Next testimonial"
        >
          {items.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              testimonial={testimonial}
              compact
            />
          ))}
        </V3StickyScrollSection>
      </SectionShell>
    );
  }

  const header =
    siteVersion === "v1" ? (
      <SectionHeading
        eyebrow="Stories"
        title="Homeowner stories"
        description="Real experiences from buyers and homeowners in our communities."
        className="mb-0"
      />
    ) : (
      <div className="max-w-2xl">
        <p className="eyebrow">Stories</p>
        <h2 className="headline-section text-balance">Homeowner stories</h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-body md:text-lg">
          Real experiences from buyers and homeowners in our communities.
        </p>
      </div>
    );

  return (
    <section
      id="testimonials"
      className={cn(
        "section-padding scroll-mt-[var(--nav-height,4rem)] scroll-pb-24 bg-background",
      )}
    >
      <div className="container-wide mb-10 lg:mb-14">{header}</div>

      <div className="testimonials-marquee-bleed">
        <Marquee
          pauseOnHover
          repeat={items.length < 3 ? 4 : 3}
          className="testimonials-marquee [--duration:52s] [--gap:1.5rem] py-1"
        >
          {items.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
