"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { Community } from "@/lib/types/community";
import { getNavStructure } from "@/lib/sections/nav-groups";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { LosaniLogo } from "@/components/ui/losani-logo";
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function navItemClasses(isActive: boolean, inverse: boolean) {
  return cn(
    navigationMenuTriggerStyle(),
    inverse
      ? cn(
          isActive
            ? "bg-white/14 text-white"
            : "text-white/72 hover:bg-white/8 hover:text-white",
          "data-[popup-open]:bg-white/14 data-[popup-open]:text-white",
        )
      : cn(
          isActive
            ? "bg-primary-muted font-semibold text-primary"
            : "text-body hover:bg-mist hover:text-foreground",
          "data-[popup-open]:bg-primary-muted data-[popup-open]:font-semibold data-[popup-open]:text-primary",
        ),
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

import { CommunityNavDropdown } from "./community-nav-dropdown";

export function StickyNav({ community }: { community: Community }) {
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
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
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navigate = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isGroupActive = (ids: string[]) => ids.includes(active);

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

  const renderDesktopNav = (inverse: boolean) => (
    <NavigationMenu className="max-w-none">
      <NavigationMenuList>
        {structure.map((item) => {
          if (item.type === "link") {
            return (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink
                  href={`#${item.id}`}
                  onClick={() => navigate(item.id)}
                  className={navItemClasses(active === item.id, inverse)}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          const childIds = item.items.map((i) => i.id);

          return (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger
                className={navItemClasses(isGroupActive(childIds), inverse)}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <CommunityNavDropdown
                  group={item}
                  community={community}
                  active={active}
                  onNavigate={navigate}
                />
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuPositioner>
        <NavigationMenuPopup>
          <NavigationMenuArrow />
        </NavigationMenuPopup>
      </NavigationMenuPositioner>
    </NavigationMenu>
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
    <header
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
          <LosaniLogo inverse={overHero} className="text-2xl sm:text-3xl" />
        </div>

        <div className="hidden min-w-0 justify-center lg:flex">{renderDesktopNav(overHero)}</div>

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
            onNavigate={() => setMobileOpen(false)}
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
  );
}
