"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Community, DownloadAsset } from "@/lib/types/community";
import type { NavStructureItem } from "@/lib/sections/nav-groups";
import { AppIcon, UI_ICONS, getSectionIcon } from "@/lib/icons";
import { CommunityCtaButtons } from "@/components/ui/community-cta-buttons";
import { cn } from "@/lib/utils/cn";

export function MobileNavDrawer({
  open,
  onClose,
  structure,
  community,
  active,
  downloads,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  structure: NavStructureItem[];
  community: Community;
  active: string;
  downloads?: DownloadAsset[];
  onNavigate: (id: string) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const linkClasses = (isActive: boolean) =>
    cn(
      "flex w-full items-start gap-3 px-5 py-3.5 text-left text-sm transition-[color,background-color] duration-200",
      isActive
        ? "bg-primary-muted font-semibold text-primary"
        : "text-body hover:bg-mist hover:text-foreground",
    );

  const groupLabelClasses =
    "px-5 pt-5 pb-2 text-xs font-semibold uppercase tracking-wider text-muted";

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 z-[60] bg-black/40 lg:hidden"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed inset-y-0 right-0 z-[70] flex w-[min(100vw,20rem)] flex-col border-l border-border bg-background lg:hidden"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-foreground">Menu</p>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] text-body transition-colors hover:text-foreground"
          >
            <AppIcon icon={UI_ICONS.close} size={22} />
          </button>
        </div>

        <nav aria-label="Community sections" className="min-h-0 flex-1 overflow-y-auto">
          {structure.map((item) => {
            if (item.type === "link") {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={linkClasses(active === item.id)}
                >
                  <AppIcon
                    icon={getSectionIcon(item.id)}
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <div key={item.id} className="border-t border-border">
                <p className={groupLabelClasses}>{item.label}</p>
                {item.items.map((child) => {
                  const Icon = getSectionIcon(child.id);
                  return (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => onNavigate(child.id)}
                      className={linkClasses(active === child.id)}
                    >
                      <AppIcon icon={Icon} size={18} className="mt-0.5 shrink-0 text-primary" />
                      <span>{child.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-border px-4 py-4">
          <CommunityCtaButtons
            primaryCta={community.hero.primaryCta}
            secondaryCta={community.hero.secondaryCta}
            downloads={downloads}
            size="sm"
            tone="light"
            className="flex-col items-stretch gap-3 [&_a]:justify-center [&_button]:justify-center"
            onNavigate={onClose}
          />
        </div>
      </div>
    </>,
    document.body,
  );
}
