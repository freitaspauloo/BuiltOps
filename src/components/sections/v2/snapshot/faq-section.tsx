"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { FaqItem } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LosaniLogo } from "@/components/ui/losani-logo";
import { SectionShell } from "@/components/ui/section";
import { cn } from "@/lib/utils/cn";

function faqId(question: string, index: number) {
  return `faq-${index}-${question.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}`;
}

function FaqAccordionIcon() {
  return (
    <span className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/35 text-primary">
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

export function FaqSection({
  items,
  image,
  siteVersion = "v2",
}: {
  items: FaqItem[];
  image?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (items.length === 0) return null;

  return (
    <SectionShell id="faq" siteVersion={siteVersion}>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
        {image && (
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-primary lg:sticky lg:top-[calc(var(--nav-height,4rem)+2rem)]">
            <div className="absolute inset-0">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover object-center scale-110 blur-[5px]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="tide-photo-overlay absolute inset-0" aria-hidden />
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <LosaniLogo
                href="https://www.losanihomes.com"
                inverse
                className="pointer-events-auto text-4xl sm:text-5xl md:text-6xl"
              />
            </div>
          </div>
        )}

        <div className={cn(!image && "lg:col-span-2 lg:max-w-3xl")}>
          <p className="eyebrow">FAQ</p>
          <h2 className="headline-section text-balance">Frequently Asked Questions</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-body md:text-lg">
            Find answers to common questions about the community, homes, and move-in process.
          </p>

          <Accordion
            type="single"
            collapsible
            defaultValue={faqId(items[0].question, 0)}
            className="mt-10 border-t border-border"
          >
            {items.map((item, index) => (
              <AccordionItem key={item.question} value={faqId(item.question, index)}>
                <AccordionTrigger className="text-base leading-snug sm:text-lg">
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
