"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { Community } from "@/lib/types/community";
import { isAuditMicrositeVersion, isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { getNavStructure } from "@/lib/sections/nav-groups";
import { AppIcon, UI_ICONS } from "@/lib/icons";
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

import { CommunityNavDropdown } from "./community-nav-dropdown";
import { MobileNavDrawer } from "./mobile-nav-drawer";

export function StickyNav({
  community,
  siteVersion = "v3",
}: {
  community: Community;
  siteVersion?: MicrositeVersionId;
}) {
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

  const overHero = !stuck;
  const downloads = isAuditMicrositeVersion(siteVersion) ? community.downloads : undefined;
  const minimalOverHero = isEditorialVersion(siteVersion) && overHero;

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
          <LosaniLogo inverse={overHero} className="h-8 w-auto sm:h-9" />
        </div>

        <div
          className={cn(
            "hidden min-w-0 justify-center lg:flex",
            minimalOverHero && "lg:hidden",
          )}
        >
          {renderDesktopNav(overHero)}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 py-1">
          <div className={cn("hidden items-center gap-3 lg:flex", minimalOverHero && "lg:hidden")}>
            <CommunityCtaButtons
              primaryCta={community.hero.primaryCta}
              secondaryCta={community.hero.secondaryCta}
              downloads={downloads}
              size="sm"
              tone={overHero ? "onImage" : "light"}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] lg:hidden",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              overHero ? "text-white/80 hover:text-white" : "text-body hover:text-foreground",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <AppIcon icon={mobileOpen ? UI_ICONS.close : UI_ICONS.menu} size={22} />
          </button>
        </div>
      </nav>

      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        structure={structure}
        community={community}
        active={active}
        downloads={downloads ?? community.downloads}
        onNavigate={navigate}
      />
    </header>
  );
}
