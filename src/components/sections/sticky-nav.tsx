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

function navItemClasses(isActive: boolean, inverse: boolean, isOpen = false) {
  const highlighted = isActive || isOpen;

  return cn(
    "inline-flex items-center justify-center gap-1 px-4 py-2.5 text-sm font-medium transition-[color,background-color] duration-200",
    inverse
      ? highlighted
        ? "bg-white/14 text-white"
        : "text-white/72 hover:bg-white/8 hover:text-white"
      : highlighted
        ? "bg-primary-muted font-semibold text-primary"
        : "text-body hover:bg-mist hover:text-foreground",
  );
}

function NavLink({
  href,
  label,
  isActive,
  onClick,
  inverse,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  inverse?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn("relative whitespace-nowrap", navItemClasses(isActive, Boolean(inverse)))}
    >
      {label}
    </a>
  );
}

export function StickyNav({ community }: { community: Community }) {
  const [active, setActive] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<OpenMenu | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const structure = getNavStructure(community);
  const sectionIds = structure.flatMap((item) =>
    item.type === "link" ? [item.id] : item.items.map((i) => i.id),
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setStuck(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-height", "5.5rem");
    return () => {
      document.documentElement.style.removeProperty("--nav-height");
    };
  }, []);

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

  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navigate = (id: string) => {
    setOpenMenu(null);
    setMobileOpen(false);
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

  const isGroupActive = (groupId: string, ids: string[]) =>
    ids.includes(active) || openMenu?.id === groupId;

  const linkState = (isActive: boolean, inverse: boolean, isOpen = false) =>
    cn("relative whitespace-nowrap text-left lg:text-center", navItemClasses(isActive, inverse, isOpen));

  const mobileItemClasses = (isActive: boolean, inverse: boolean) =>
    cn(
      "block w-full px-4 py-3.5 text-left text-sm font-medium transition-[color,background-color] duration-200",
      inverse
        ? isActive
          ? "bg-white/14 text-white"
          : "text-white/72 hover:bg-white/8 hover:text-white"
        : isActive
          ? "bg-primary-muted font-semibold text-primary"
          : "text-body hover:bg-mist hover:text-foreground",
    );

  const renderMobileLinks = (inverse: boolean) => (
    <div className="flex flex-col py-2">
      {structure.map((item) => {
        if (item.type === "link") {
          return (
            <NavLink
              key={item.id}
              href={`#${item.id}`}
              label={item.label}
              isActive={active === item.id}
              inverse={inverse}
              onClick={() => setMobileOpen(false)}
            />
          );
        }
        return (
          <div key={item.id} className={cn("border-t", inverse ? "border-white/15" : "border-border")}>
            <p
              className={cn(
                "px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider",
                inverse ? "text-white/50" : "text-muted",
              )}
            >
              {item.label}
            </p>
            {item.items.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => navigate(child.id)}
                className={mobileItemClasses(active === child.id, inverse)}
              >
                {child.label}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );

  const overHero = !stuck;

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-[box-shadow,background-color,border-color] duration-300",
          overHero
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border/80 bg-background/95 backdrop-blur-md",
        )}
      >
        <nav
          aria-label="Community sections"
          className="hero-frame-sides grid min-h-[5.5rem] grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-5"
        >
          <div className="flex shrink-0 items-center py-3">
            <LosaniLogo inverse={overHero} />
          </div>

          <div className="hidden min-w-0 items-center justify-center gap-0.5 lg:flex">
            {structure.map((item) => {
              if (item.type === "link") {
                return (
                  <NavLink
                    key={item.id}
                    href={`#${item.id}`}
                    label={item.label}
                    isActive={active === item.id}
                    inverse={overHero}
                    onClick={() => setOpenMenu(null)}
                  />
                );
              }

              const childIds = item.items.map((i) => i.id);
              const isActive = isGroupActive(item.id, childIds);
              const isOpen = openMenu?.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="menu"
                  onClick={(e) => toggleGroup(item, e.currentTarget)}
                  className={linkState(isActive, overHero, isOpen)}
                >
                  {item.label}
                  <span
                    className={cn(
                      "ml-0.5 inline-block text-[0.65em] transition-transform",
                      overHero ? "text-white/60" : "text-muted",
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

          <div className="flex shrink-0 items-center justify-end gap-3 py-1">
            <button
              type="button"
              className={cn(
                "px-3 py-2.5 text-sm font-medium lg:hidden",
                overHero ? "text-white/80 hover:text-white" : "text-body hover:text-foreground",
              )}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
            <CommunityCtaButtons
              primaryCta={community.hero.primaryCta}
              secondaryCta={community.hero.secondaryCta}
              size="sm"
              tone={overHero ? "onImage" : "light"}
              secondaryClassName="hidden lg:inline-flex"
              onNavigate={() => {
                setOpenMenu(null);
                setMobileOpen(false);
              }}
            />
          </div>
        </nav>

        {mobileOpen && (
          <div
            id="mobile-nav-panel"
            className={cn(
              "border-t lg:hidden",
              overHero ? "border-white/15 bg-black/40 backdrop-blur-md" : "border-border bg-background",
            )}
          >
            {renderMobileLinks(overHero)}
            <div className={cn("border-t px-3 py-4", overHero ? "border-white/15" : "border-border")}>
              <CommunityCtaButtons
                primaryCta={community.hero.primaryCta}
                secondaryCta={community.hero.secondaryCta}
                size="sm"
                tone={overHero ? "onImage" : "light"}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </div>
        )}
      </header>

      {mounted &&
        openMenu &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-[300] hidden w-max min-w-[11rem] max-w-[min(16rem,calc(100vw-2rem))] border border-border bg-background py-2 shadow-[var(--shadow-card-hover)] lg:block"
            style={{
              top: openMenu.anchor.bottom + 8,
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
                  "block w-full px-4 py-3 text-left text-sm font-medium transition-[color,background-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary",
                  active === child.id
                    ? "bg-primary-muted font-semibold text-primary"
                    : "text-body hover:bg-mist hover:text-foreground",
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
