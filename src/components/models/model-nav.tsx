"use client";

import { useEffect, useState } from "react";
import type { DownloadAsset } from "@/lib/types/community";
import type { ModelNavSection } from "@/lib/model-nav";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { LosaniLogo } from "@/components/ui/losani-logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function ModelNav({
  sections,
  brochures,
}: {
  sections: ModelNavSection[];
  brochures?: DownloadAsset[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass =
    "text-body hover:bg-mist hover:text-foreground data-[active=true]:bg-primary-muted data-[active=true]:font-semibold data-[active=true]:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
      <nav
        aria-label="Model navigation"
        className="grid min-h-[5.5rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-6 lg:gap-5 md:px-10 lg:px-16"
      >
        <div className="flex shrink-0 items-center py-3">
          <LosaniLogo className="h-8 w-auto sm:h-9" />
        </div>

        <div className="hidden min-w-0 justify-center lg:flex">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList>
              {sections.map((section) => (
                <NavigationMenuItem key={section.id}>
                  <NavigationMenuLink
                    href={`#${section.id}`}
                    className={cn(navigationMenuTriggerStyle(), navLinkClass)}
                  >
                    {section.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 py-1">
          <div className="hidden items-center gap-3 lg:flex">
            <CommunityCtaButtons
              primaryCta={{ label: "Book Appointment", href: "#registration" }}
              secondaryCta={
                brochures?.length
                  ? { label: "Download Brochure", href: "#floorplan" }
                  : { label: "View Floorplan", href: "#floorplan" }
              }
              downloads={brochures}
              size="sm"
              tone="light"
            />
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-body hover:text-foreground lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="model-mobile-nav-panel"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <AppIcon icon={mobileOpen ? UI_ICONS.close : UI_ICONS.menu} size={22} />
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="model-mobile-nav-panel"
          className="border-t border-border bg-background px-6 py-4 md:px-10 lg:hidden"
        >
          <div className="flex flex-col">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-medium text-body hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </div>
          <CommunityCtaButtons
            primaryCta={{ label: "Book Appointment", href: "#registration" }}
            secondaryCta={
              brochures?.length
                ? { label: "Download Brochure", href: "#floorplan" }
                : { label: "View Floorplan", href: "#floorplan" }
            }
            downloads={brochures}
            size="sm"
            tone="light"
            className="mt-4 flex-col items-stretch gap-3 [&_a]:justify-center [&_button]:justify-center"
            onNavigate={() => setMobileOpen(false)}
          />
        </div>
      ) : null}
    </header>
  );
}
