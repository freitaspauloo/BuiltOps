"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { AppIcon, UI_ICONS } from "@/lib/icons";

export function FaqSection({
  items,
  siteVersion = "v2",
}: {
  items: FaqItem[];
  siteVersion?: MicrositeVersionId;
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.question ?? null);

  if (items.length === 0) return null;

  return (
    <SectionShell id="faq" siteVersion={siteVersion}>
      <ScrollReveal>
        <SectionHeaderSplit
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Answers to the questions we hear most about the community, the homes, and the move-in process."
          siteVersion={siteVersion}
        />
      </ScrollReveal>

      <ScrollReveal delay={0.08} y={32}>
        <div className="accordion-list">
          {items.map((item) => {
            const isOpen = open === item.question;
            const panelId = `faq-panel-${item.question.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

            return (
              <div key={item.question} className="accordion-row">
                <h3>
                  <button
                    type="button"
                    className="accordion-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : item.question)}
                  >
                    <span className="accordion-question">{item.question}</span>
                    <span className="accordion-marker" aria-hidden>
                      <AppIcon icon={UI_ICONS.chevronDown} size={18} />
                    </span>
                  </button>
                </h3>
                <div id={panelId} hidden={!isOpen}>
                  <p className="accordion-answer">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
