"use client";

import { useEffect, useState } from "react";
import type { ModelNavSection } from "@/lib/model-nav";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

export function ModelStickyNav({ sections }: { sections: ModelNavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ids = sections.map((section) => section.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActive(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (!visible) return null;

  return (
    <nav
      aria-label="Model page sections"
      className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="container-wide flex items-center gap-3 px-6 py-2 md:px-10 lg:px-16">
        <div className="scrollbar-hide flex min-w-0 flex-1 gap-1 overflow-x-auto [-webkit-overflow-scrolling:touch]">
          {sections.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "shrink-0 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-muted text-primary"
                    : "text-body hover:bg-mist hover:text-foreground",
                )}
              >
                {section.label}
              </a>
            );
          })}
        </div>
        <Button href="#registration" size="sm" className="hidden shrink-0 sm:inline-flex">
          Book Appointment
        </Button>
      </div>
    </nav>
  );
}
