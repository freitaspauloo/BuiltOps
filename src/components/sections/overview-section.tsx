"use client";

import Image from "next/image";
import Link from "next/link";
import type { CommunityOverview, QuickFacts } from "@/lib/types/community";
import { Pill, PillGroup } from "@/components/ui/pill";
import { AppIcon, getSnapshotIcon } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";
import { RiPlayFill } from "react-icons/ri";

type OverviewSectionProps = {
  data: CommunityOverview;
  quickFacts?: QuickFacts;
  videoUrl?: string;
  videoPoster?: string;
  contact?: { name: string; role: string; image?: string };
};

const shellClass =
  "scroll-mt-[var(--nav-height,4.25rem)] scroll-pb-24 bg-background pb-14 pt-6 md:pb-20 md:pt-8 lg:pb-24 hero-frame-sides";

export function OverviewSection({
  data,
  quickFacts,
  videoUrl,
  videoPoster,
  contact,
}: OverviewSectionProps) {
  const paired = Boolean(quickFacts?.facts.length);

  if (!paired) {
    return (
      <section id="overview" className={shellClass}>
        <p className="eyebrow">Overview</p>
        <h2 className="headline-section max-w-3xl text-balance">{data.title}</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed md:text-lg">
          <span className="font-semibold text-foreground">{data.introduction}</span>{" "}
          <span className="text-body">{data.description}</span>
        </p>
      </section>
    );
  }

  return (
    <section id="overview" className={cn(shellClass, "!pt-4 md:!pt-5")}>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-6">
        <article className="card-surface flex h-full min-h-[22rem] flex-col p-6 md:min-h-[26rem] md:p-8 lg:p-10">
          <p className="card-label">Overview</p>
          <h2 className="headline-section text-2xl md:text-3xl lg:text-4xl">Description</h2>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-body md:text-base">
            <span className="font-semibold text-foreground">{data.introduction}</span>{" "}
            {data.description}
          </p>

          {(contact || videoUrl) && (
            <div className="mt-auto flex items-end justify-between gap-4 pt-8 md:gap-6 md:pt-10">
              {contact && (
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden bg-mist md:h-12 md:w-12">
                    {contact.image && (
                      <Image
                        src={contact.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground md:text-base">
                      {contact.name}
                    </p>
                    <p className="truncate text-xs text-muted md:text-sm">{contact.role}</p>
                  </div>
                </div>
              )}

              {videoUrl && (
                <Link
                  href="#video"
                  className="group relative h-20 w-28 shrink-0 overflow-hidden bg-mist md:h-24 md:w-32"
                  aria-label="Watch community video"
                >
                  {videoPoster && (
                    <Image
                      src={videoPoster}
                      alt=""
                      fill
                      className="carousel-slide-hover object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="128px"
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-colors group-hover:bg-foreground/30">
                    <AppIcon icon={RiPlayFill} size={28} className="text-white drop-shadow-sm" />
                  </span>
                </Link>
              )}
            </div>
          )}
        </article>

        <article
          id="quickFacts"
          className="card-surface flex h-full min-h-[22rem] flex-col p-6 md:min-h-[26rem] md:p-8 lg:p-10"
        >
          <p className="card-label">Details</p>
          <h2 className="headline-section text-2xl md:text-3xl lg:text-4xl">
            {quickFacts!.title ?? "At a Glance"}
          </h2>
          <div className="flex-1" />
          <PillGroup className="mt-6">
            {quickFacts!.facts.map((fact) => (
              <Pill key={fact.label} icon={getSnapshotIcon(fact.label)}>
                {fact.value}
              </Pill>
            ))}
          </PillGroup>
        </article>
      </div>
    </section>
  );
}
