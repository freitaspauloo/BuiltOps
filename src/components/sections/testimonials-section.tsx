"use client";

import type { Testimonial } from "@/lib/types/community";
import { isAuditMicrositeVersion, isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { useHorizontalScroll } from "@/components/ui/horizontal-scroll-track";
import { Marquee } from "@/components/ui/marquee";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { V3StickyScrollSection } from "@/components/ui/v3-sticky-scroll-section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";

/** Neutral fallback so every testimonial keeps a consistent image area. */
const TESTIMONIAL_FALLBACK_IMAGE =
  "https://www.losanihomes.com/wp-content/uploads/2025/06/Benchmark-feature-communities_desktop-1-768x620.webp";

function TestimonialCard({
  testimonial,
  compact = false,
  showStars = true,
}: {
  testimonial: Testimonial;
  compact?: boolean;
  showStars?: boolean;
}) {
  return (
    <figure
      data-scroll-card
      className={cn(
        "group flex shrink-0 snap-start overflow-hidden rounded-[var(--radius-card)] border border-border bg-background",
        compact
          ? "min-h-[12.75rem] w-[min(88vw,22rem)] min-w-[min(88vw,22rem)] flex-row sm:min-h-[13.25rem] sm:w-[20rem] sm:min-w-[20rem]"
          : "w-[min(88vw,720px)] flex-col sm:flex-row",
      )}
    >
      <CardPhotoLens
        src={testimonial.image ?? TESTIMONIAL_FALLBACK_IMAGE}
        alt={testimonial.author}
        enableLens={false}
        aspectClass={
          compact
            ? "h-full w-[6.75rem] sm:w-28"
            : "aspect-[4/5] w-full shrink-0 sm:w-[220px] lg:w-[260px]"
        }
        imageClassName="object-cover object-top"
        className={cn(
          "shrink-0 bg-mist",
          compact
            ? "rounded-none after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-8 after:bg-gradient-to-r after:from-transparent after:to-background after:content-['']"
            : "sm:h-auto",
        )}
        sizes={compact ? "112px" : "260px"}
      />
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col justify-between",
          compact ? "p-4 sm:p-5" : "p-5 md:p-6 sm:min-h-[260px] sm:p-7 lg:p-8",
        )}
      >
        <div>
          {showStars && (
            <div
              className={cn("flex gap-0.5 text-primary", compact ? "mb-2" : "mb-4")}
              aria-hidden="true"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <AppIcon
                  key={i}
                  icon={UI_ICONS.star}
                  size={14}
                  className="fill-primary text-primary"
                />
              ))}
            </div>
          )}
          <blockquote
            className={cn(
              "font-medium leading-snug text-foreground",
              compact ? "line-clamp-5 text-sm" : "text-base",
            )}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
        </div>
        <figcaption className={compact ? "mt-4" : "mt-6"}>
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

  if (isEditorialVersion(siteVersion)) {
    const showNav = items.length > 1;
    const isAudit = isAuditMicrositeVersion(siteVersion);

    return (
      <SectionShell id="testimonials" siteVersion={siteVersion} reveal={false} muted>
        <V3StickyScrollSection
          label="Stories"
          title="Homeowner stories"
          description={
            isAudit
              ? "Representative buyer stories from Losani communities."
              : "Real experiences from buyers and homeowners in our communities."
          }
          trackRef={trackRef}
          showNav={showNav}
          onPrev={scrollPrev}
          onNext={scrollNext}
          prevLabel="Previous testimonial"
          nextLabel="Next testimonial"
          trackClassName="items-start"
        >
          {items.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              testimonial={testimonial}
              compact
              showStars={!isAudit}
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
