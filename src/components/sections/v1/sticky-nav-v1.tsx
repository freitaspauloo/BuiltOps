"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils/cn";
import type { Community } from "@/lib/types/community";
import { getNavStructure, type NavStructureItem } from "@/lib/sections/nav-groups";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { LosaniLogo } from "@/components/ui/losani-logo";

type OpenMenu = {
  id: string;
  items: { id: string; label: string }[];
  anchor: DOMRect;
};

/** v1 — static top nav, desktop links, portal dropdowns, no mobile drawer or sticky */
export function StickyNavV1({ community }: { community: Community }) {
  const [active, setActive] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<OpenMenu | null>(null);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const structure = getNavStructure(community);
  const sectionIds = structure.flatMap((item) =>
    item.type === "link" ? [item.id] : item.items.map((i) => i.id),
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -25% 0px", threshold: [0, 0.2, 0.45] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (navRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  const navigate = (id: string) => {
    setOpenMenu(null);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleGroup = (item: Extract<NavStructureItem, { type: "group" }>, el: HTMLButtonElement) => {
    if (openMenu?.id === item.id) {
      setOpenMenu(null);
      return;
    }
    setOpenMenu({
      id: item.id,
      items: item.items,
      anchor: el.getBoundingClientRect(),
    });
  };

  const linkClass = (isActive: boolean) =>
    cn(
      "whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors",
      isActive ? "text-primary" : "text-body hover:text-foreground",
    );

  return (
    <>
      <header ref={navRef} className="relative z-50 mb-3 w-full bg-background">
        <nav
          aria-label="Community sections"
          className="grid grid-cols-[auto_1fr_auto] items-center gap-2 lg:gap-4"
        >
          <div className="flex shrink-0 items-center py-2">
            <LosaniLogo />
          </div>

          <div className="hidden min-w-0 items-center justify-center overflow-x-auto scrollbar-hide lg:flex">
            {structure.map((item) => {
              if (item.type === "link") {
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={linkClass(active === item.id)}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </a>
                );
              }

              const childIds = item.items.map((i) => i.id);
              const isActive = childIds.some((id) => id === active) || openMenu?.id === item.id;
              const isOpen = openMenu?.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={(e) => toggleGroup(item, e.currentTarget)}
                  className={linkClass(isActive)}
                >
                  {item.label}
                  <span
                    className={cn(
                      "ml-0.5 inline-block text-[0.65em] text-muted transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-end">
            <CommunityCtaButtons
              primaryCta={community.hero.primaryCta}
              secondaryCta={community.hero.secondaryCta}
              size="sm"
              secondaryClassName="hidden lg:inline-flex"
            />
          </div>
        </nav>
      </header>

      {mounted &&
        openMenu &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-[300] w-max min-w-[11rem] max-w-[min(16rem,calc(100vw-2rem))] border border-border bg-background py-1 shadow-[var(--shadow-card-hover)]"
            style={{
              top: openMenu.anchor.bottom + 4,
              left: openMenu.anchor.left + openMenu.anchor.width / 2,
              transform: "translateX(-50%)",
            }}
          >
            {openMenu.items.map((child) => (
              <button
                key={child.id}
                type="button"
                role="menuitem"
                onClick={() => navigate(child.id)}
                className={cn(
                  "block w-full px-4 py-2.5 text-left text-sm font-medium transition-colors",
                  active === child.id ? "text-primary" : "text-body hover:text-foreground",
                )}
              >
                {child.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
