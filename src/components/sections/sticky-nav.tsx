"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { Community } from "@/lib/types/community";
import {
  getNavStructure,
  getSectionBlurb,
  type NavStructureItem,
} from "@/lib/sections/nav-groups";
import {
  discoverBlurb,
  discoverColumns,
  discoverCommunities,
} from "@/lib/sections/nav-discovery";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { LosaniLogo } from "@/components/ui/losani-logo";
import { communityStageLabels } from "@/components/ui/status-badge";
import { AppIcon, UI_ICONS } from "@/lib/icons";

const DISCOVER_ID = "discover";
const ALL_COMMUNITIES_HREF = discoverColumns[0]?.links[0]?.href ?? "#";

function navItemClasses(inverse: boolean, highlighted: boolean) {
  return cn(
    "inline-flex items-center justify-center gap-1 px-4 py-2.5 text-sm font-medium transition-[color,background-color] duration-200",
    inverse
      ? highlighted
        ? "bg-white/16 text-white"
        : "text-white/85 hover:bg-white/10 hover:text-white"
      : highlighted
        ? "bg-primary-muted font-semibold text-primary"
        : "text-body hover:bg-mist hover:text-foreground",
  );
}

function PanelLink({
  label,
  blurb,
  onClick,
}: {
  label: string;
  blurb?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="group flex w-full flex-col items-start gap-0.5 border-b border-border/70 py-3.5 text-left transition-colors last:border-b-0 hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
    >
      <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
        {label}
      </span>
      {blurb && <span className="text-sm leading-snug text-muted">{blurb}</span>}
    </button>
  );
}

function DiscoverPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
      <div>
        <p className="eyebrow">Discover Losani</p>
        <p className="max-w-xl text-sm leading-relaxed text-body md:text-base">
          {discoverBlurb}
        </p>

        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {discoverColumns.map((column) => (
            <div key={column.title}>
              <p className="label-overline">
                {column.title}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onNavigate}
                      className="text-sm font-medium text-body underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="eyebrow mb-0">Explore communities</p>
          <a
            href={ALL_COMMUNITIES_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onNavigate}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View all
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {discoverCommunities.map((community) => (
            <a
              key={community.name}
              href={community.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="card-interactive group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 90vw, 240px"
                />
              </div>
              <div className="p-4">
                <span className="card-label mb-2">
                  {communityStageLabels[community.stage]}
                </span>
                <p className="text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                  {community.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">{community.city}</p>
                {community.priceFrom && (
                  <p className="text-xs text-muted">{community.priceFrom}</p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StickyNav({ community }: { community: Community }) {
  const [active, setActive] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const structure = getNavStructure(community);
  const sectionIds = structure.flatMap((item) =>
    item.type === "link" ? [item.id] : item.items.map((i) => i.id),
  );

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setStuck(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), {
      threshold: 0,
    });
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
      if (headerRef.current?.contains(e.target as Node)) return;
      setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const close = () => setOpenMenu(null);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", close);
    };
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const navigate = (id: string) => {
    closeAll();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Any open surface makes the chrome solid — white-on-photo nav text over a
  // light panel would be unreadable.
  const inverse = !stuck && !openMenu && !mobileOpen;
  const openGroup = structure.find(
    (item): item is Extract<NavStructureItem, { type: "group" }> =>
      item.type === "group" && item.id === openMenu,
  );

  const renderTrigger = (
    id: string,
    label: string,
    highlighted: boolean,
    onClick: () => void,
  ) => (
    <button
      key={id}
      type="button"
      aria-expanded={openMenu === id}
      aria-haspopup="menu"
      onClick={onClick}
      className={cn("relative whitespace-nowrap", navItemClasses(inverse, highlighted))}
    >
      {label}
      <AppIcon
        icon={UI_ICONS.chevronDown}
        size={14}
        className={cn(
          "transition-transform duration-200",
          inverse ? "text-white/60" : "text-muted",
          openMenu === id && "rotate-180",
        )}
      />
    </button>
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-[box-shadow,background-color,border-color] duration-300",
        inverse
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border/80 bg-background/95 backdrop-blur-md",
      )}
    >
      <nav
        aria-label="Community sections"
        className="page-bounds grid min-h-[5.5rem] grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-5"
      >
        <div className="flex shrink-0 items-center py-3">
          <LosaniLogo inverse={inverse} />
        </div>

        <div className="hidden min-w-0 items-center justify-center gap-0.5 lg:flex">
          {structure.map((item) => {
            if (item.type === "link") {
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpenMenu(null)}
                  className={cn(
                    "relative whitespace-nowrap",
                    navItemClasses(inverse, !openMenu && active === item.id),
                  )}
                >
                  {item.label}
                </a>
              );
            }

            const highlighted =
              openMenu === item.id ||
              (!openMenu && item.items.some((child) => child.id === active));

            return renderTrigger(item.id, item.label, highlighted, () =>
              setOpenMenu((current) => (current === item.id ? null : item.id)),
            );
          })}

          {renderTrigger(DISCOVER_ID, "Discover", openMenu === DISCOVER_ID, () =>
            setOpenMenu((current) => (current === DISCOVER_ID ? null : DISCOVER_ID)),
          )}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 py-1">
          <button
            type="button"
            className={cn(
              "px-3 py-2.5 text-sm font-medium lg:hidden",
              inverse ? "text-white/80 hover:text-white" : "text-body hover:text-foreground",
            )}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => {
              setOpenMenu(null);
              setMobileOpen((v) => !v);
            }}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
          <CommunityCtaButtons
            primaryCta={community.hero.primaryCta}
            secondaryCta={community.hero.secondaryCta}
            size="sm"
            tone={inverse ? "onImage" : "light"}
            secondaryClassName="hidden lg:inline-flex"
            onNavigate={closeAll}
          />
        </div>
      </nav>

      {/* Desktop panel — spans the page frame instead of a 11rem dropdown. */}
      {openMenu && (
        <div
          role="menu"
          aria-label={openGroup ? openGroup.label : "Discover Losani"}
          className="hidden max-h-[calc(100svh-5.5rem)] overflow-y-auto border-t border-border bg-background shadow-[var(--shadow-card-hover)] lg:block"
        >
          <div className="page-bounds py-9 lg:py-11">
            {openGroup ? (
              <>
                <p className="eyebrow">{openGroup.label}</p>
                {/* Fixed-width cells, left aligned — a two-item group must not
                    stretch its rules across the whole page frame. */}
                <div
                  className="grid gap-x-12"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 20rem))" }}
                >
                  {openGroup.items.map((child) => (
                    <PanelLink
                      key={child.id}
                      label={child.label}
                      blurb={getSectionBlurb(child.id)}
                      onClick={() => navigate(child.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <DiscoverPanel onNavigate={closeAll} />
            )}
          </div>
        </div>
      )}

      {/* Mobile panel — one scrollable frame, no repeat of the pinned CTA. */}
      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="max-h-[calc(100svh-5.5rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <div className="page-bounds py-6">
            {structure.map((item) =>
              item.type === "link" ? (
                <PanelLink
                  key={item.id}
                  label={item.label}
                  blurb={getSectionBlurb(item.id)}
                  onClick={() => navigate(item.id)}
                />
              ) : (
                <div key={item.id} className="pt-6 first:pt-0">
                  <p className="label-overline">
                    {item.label}
                  </p>
                  <div className="mt-1">
                    {item.items.map((child) => (
                      <PanelLink
                        key={child.id}
                        label={child.label}
                        blurb={getSectionBlurb(child.id)}
                        onClick={() => navigate(child.id)}
                      />
                    ))}
                  </div>
                </div>
              ),
            )}

            <div className="mt-8 border-t border-border pt-8">
              <DiscoverPanel onNavigate={closeAll} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
