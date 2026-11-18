"use client";

import Image from "next/image";
import type { Community } from "@/lib/types/community";
import { getNavGroupSidebar } from "@/lib/sections/nav-group-meta";
import type { NavGroupItem } from "@/lib/sections/nav-groups";
import { AppIcon, getSectionIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils/cn";

export function CommunityNavDropdown({
  group,
  community,
  active,
  onNavigate,
}: {
  group: NavGroupItem;
  community: Community;
  active: string;
  onNavigate: (id: string) => void;
}) {
  const sidebar = getNavGroupSidebar(community, group.id);
  const showSidebar = Boolean(sidebar.image);
  const useSplitLayout = showSidebar && group.items.length > 0;

  return (
    <div className="nav-menu-panel-rich">
      <div
        className={cn(
          "grid grid-cols-1",
          useSplitLayout && "sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
        )}
      >
        <div className="bg-background p-3 sm:p-4">
          <div className="space-y-1">
            {group.items.map((child) => {
              const Icon = getSectionIcon(child.id);
              return (
                <NavigationMenuLink
                  key={child.id}
                  href={`#${child.id}`}
                  onClick={() => onNavigate(child.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-none px-3 py-3 sm:px-4",
                    active === child.id && "bg-primary-muted font-semibold text-primary",
                  )}
                >
                  <AppIcon icon={Icon} size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="font-medium leading-snug">{child.label}</p>
                    {child.description && (
                      <p className="mt-0.5 text-sm leading-snug text-muted">{child.description}</p>
                    )}
                  </div>
                </NavigationMenuLink>
              );
            })}
          </div>
        </div>

        {showSidebar && (
          <div className="flex flex-col gap-4 border-t border-border bg-background p-3 sm:border-0 sm:p-4 sm:pl-5">
            {sidebar.image && (
              <div className="relative aspect-video w-full overflow-hidden bg-mist">
                <Image
                  src={sidebar.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>
            )}
            <div className="space-y-1">
              <h4 className="font-medium text-foreground">{sidebar.title}</h4>
              <p className="text-sm text-muted">{sidebar.description}</p>
            </div>
            <Button href={sidebar.ctaHref} size="sm" className="w-full justify-between">
              {sidebar.ctaLabel}
              <span aria-hidden>→</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
