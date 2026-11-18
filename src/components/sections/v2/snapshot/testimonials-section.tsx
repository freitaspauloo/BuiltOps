"use client";

import type { Testimonial } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";
import { CardPhotoLens } from "@/components/ui/card-photo-lens";
import { SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";
import { AppIcon, UI_ICONS } from "@/lib/icons";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="group flex w-[min(88vw,720px)] shrink-0 flex-col overflow-hidden sm:flex-row">
      {testimonial.image && (
        <CardPhotoLens
          src={testimonial.image}
          alt={testimonial.author}
          aspectClass="aspect-[4/5] h-full w-full sm:w-[220px] lg:w-[260px]"
          className="shrink-0 bg-mist sm:h-auto"
          sizes="260px"
        />
      )}
      <div className="flex flex-1 flex-col justify-between bg-card p-6 sm:min-h-[260px] sm:p-7 lg:p-8">
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
    </figure>
  );
}

export function TestimonialsSection({
  items,
  siteVersion = "v2",
}: {
  items: Testimonial[];
  siteVersion?: MicrositeVersionId;
}) {
  if (items.length === 0) return null;

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
      <div className="container-wide mb-10 lg:mb-14">
        <ScrollReveal>{header}</ScrollReveal>
      </div>

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
