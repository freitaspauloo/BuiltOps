"use client";

import type { SnapshotFact } from "@/lib/types/community";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { AppIcon, getSnapshotIcon } from "@/lib/icons";

export function SnapshotSection({ facts }: { facts: SnapshotFact[] }) {
  return (
    <section id="snapshot" className="bg-surface pb-2 pt-0">
      <div className="hero-frame-inset">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {facts.map((fact) => {
              const icon = getSnapshotIcon(fact.label);
              return (
                <div
                  key={fact.label}
                  className="min-w-0 bg-card px-4 py-4 sm:px-5 sm:py-5"
                >
                  <AppIcon
                    icon={icon}
                    size={18}
                    className="mb-2 text-primary"
                  />
                  <p className="snapshot-value">{fact.value}</p>
                  <p className="snapshot-label">{fact.label}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
