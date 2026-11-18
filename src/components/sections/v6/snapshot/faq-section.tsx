"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "@/lib/types/community";
import { isEditorialVersion, isV6MicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LosaniLogo } from "@/components/ui/losani-logo";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

function faqId(question: string, index: number) {
  return `faq-${index}-${question.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}`;
}

function FaqAccordionIcon() {
  return (
    <span className="v3-faq-accordion-icon relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-primary/35 text-primary">
      <Plus
        strokeWidth={1.5}
        className="absolute size-3.5 transition-all duration-200 ease-out group-data-[state=open]:rotate-90 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0"
        aria-hidden
      />
      <Minus
        strokeWidth={1.5}
        className="absolute size-3.5 rotate-90 scale-75 opacity-0 transition-all duration-200 ease-out group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100"
        aria-hidden
      />
    </span>
  );
}

function FaqEditorialPanel({
  yearsLabel = "40 years",
  stretch = false,
}: {
  yearsLabel?: string;
  stretch?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--radius-card)] bg-primary",
        stretch
          ? "min-h-[20rem] lg:sticky lg:top-[calc(var(--nav-height,4rem)+2rem)] lg:min-h-full lg:self-start"
          : "aspect-[4/5] lg:sticky lg:top-[calc(var(--nav-height,4rem)+2rem)]",
      )}
    >
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 15% 10%, rgba(143, 168, 200, 0.42) 0%, transparent 58%), radial-gradient(ellipse 75% 55% at 90% 95%, rgba(39, 72, 102, 0.65) 0%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 lg:p-12">
        <LosaniLogo
          href="https://www.losanihomes.com"
          inverse
          className="pointer-events-auto text-4xl sm:text-5xl md:text-6xl"
        />
        <hr className="v3-hero-rule !my-6 !max-w-[9rem]" aria-hidden />
        <p className="max-w-[16rem] text-sm leading-relaxed text-white/75 md:text-base">
          Trusted builder across the GTA and Niagara for over {yearsLabel}.
        </p>
      </div>
    </div>
  );
}

export function FaqSection({
  items,
  image,
  siteVersion = "v3",
}: {
  items: FaqItem[];
  image?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (items.length === 0) return null;

  const editorial = isEditorialVersion(siteVersion);
  const isV5 = isV6MicrositeVersion(siteVersion);
  const faqDescription = isV5
    ? "Straight answers from Losani Homes — deposits, timelines, Tarion warranty coverage, and what to expect from contract to keys at Benchmark."
    : "Find answers to common questions about the community, homes, and move-in process.";

  return (
      <SectionShell id="faq" siteVersion={siteVersion} reveal={false}>
      <div
        className={cn(
          "grid gap-10 lg:grid-cols-2 lg:gap-14",
          isV5 ? "lg:items-stretch" : "lg:items-start",
        )}
      >
        {editorial ? (
          <FaqEditorialPanel
            yearsLabel={isV5 ? "50 years" : "40 years"}
            stretch={isV5}
          />
        ) : (
          image && (
            <div className="aspect-[4/5] w-full overflow-hidden bg-primary lg:sticky lg:top-[calc(var(--nav-height,4rem)+2rem)]">
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="scale-110 object-cover object-center blur-[5px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="tide-photo-overlay absolute inset-0" aria-hidden />
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <LosaniLogo
                    href="https://www.losanihomes.com"
                    inverse
                    className="pointer-events-auto text-4xl sm:text-5xl md:text-6xl"
                  />
                </div>
              </div>
            </div>
          )
        )}

        <div className={cn(!editorial && !image && "lg:col-span-2 lg:max-w-3xl")}>
          {editorial ? (
            <SectionIntro
              label="FAQ"
              title="Frequently Asked Questions"
              description={faqDescription}
              showRule={false}
            />
          ) : (
            <>
              <p className="eyebrow">FAQ</p>
              <h2 className="headline-section text-balance">Frequently Asked Questions</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-body md:text-lg">
                {faqDescription}
              </p>
            </>
          )}

          <Accordion
            type="single"
            collapsible
            defaultValue={isV5 ? undefined : faqId(items[0].question, 0)}
            className={cn("border-t border-border", editorial ? "mt-8" : "mt-10")}
          >
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={faqId(item.question, index)}
                className={cn(editorial && "v3-faq-item")}
              >
                <AccordionTrigger
                  className={cn(
                    "text-base leading-snug text-foreground sm:text-lg",
                    editorial && "v3-accordion-trigger",
                  )}
                >
                  <FaqAccordionIcon />
                  <span className="pt-1">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pl-12 pr-2 text-sm leading-relaxed text-body sm:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SectionShell>
  );
}
