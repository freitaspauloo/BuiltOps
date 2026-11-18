"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";
import {
  COMMUNITY_STAGE_PRESENTATIONS,
  communityStageHrefFromSlug,
  isCommunityStageSlug,
  type CommunityStageSlug,
} from "@/lib/community-stages";
import { communityHref, modelHref } from "@/lib/site-versions";

const STORAGE_KEY = "builtops-presentation-nav-position";
const HANDLE_WIDTH = 14;
const HANDLE_HEIGHT = 40;
const VIEWPORT_PADDING = 16;
const DEFAULT_OFFSET_FROM_BOTTOM = 66;
const DESIGN_HREF = "/old/design";
const CMS_HREF = "/admin";
const MARIGOLD_HREF = modelHref("marigold");

function communitySlugFromPath(pathname: string) {
  const match = pathname.match(/^\/communities\/([^/]+)/);
  return match?.[1] ?? "benchmark";
}

function stageSlugFromPath(pathname: string): CommunityStageSlug | null {
  const match = pathname.match(/^\/communities\/[^/]+\/([^/]+)/);
  if (!match) return null;
  return isCommunityStageSlug(match[1]) ? match[1] : null;
}

function defaultY() {
  if (typeof window === "undefined") return VIEWPORT_PADDING;
  return Math.max(
    VIEWPORT_PADDING,
    window.innerHeight - DEFAULT_OFFSET_FROM_BOTTOM - HANDLE_HEIGHT,
  );
}

function clampY(y: number) {
  if (typeof window === "undefined") return y;
  const maxY = Math.max(
    VIEWPORT_PADDING,
    window.innerHeight - HANDLE_HEIGHT - VIEWPORT_PADDING,
  );
  return Math.min(Math.max(VIEWPORT_PADDING, y), maxY);
}

function PresentationNavInner() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [posY, setPosY] = useState(defaultY);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startY: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  const hide =
    Boolean(pathname?.startsWith("/admin")) ||
    Boolean(pathname?.startsWith("/old"));
  const slug = communitySlugFromPath(pathname ?? "");
  const activeStage = stageSlugFromPath(pathname ?? "");
  const onBaseCommunity =
    Boolean(pathname?.match(/^\/communities\/[^/]+\/?$/)) && !activeStage;
  const onMarigold = pathname === MARIGOLD_HREF;
  const onDesign =
    pathname === DESIGN_HREF || Boolean(pathname?.startsWith(`${DESIGN_HREF}/`));

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { y?: number };
        if (typeof parsed.y === "number") setPosY(clampY(parsed.y));
        else setPosY(clampY(defaultY()));
      } else {
        setPosY(clampY(defaultY()));
      }
    } catch {
      setPosY(clampY(defaultY()));
    }
  }, []);

  useEffect(() => {
    const onResize = () => setPosY((current) => clampY(current));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onDragPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      originY: posY,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDragPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.abs(dy) > 3) {
      drag.moved = true;
      setOpen(false);
    }
    if (!drag.moved) return;
    setPosY(clampY(drag.originY + dy));
  };

  const finishDrag = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.moved) {
      setPosY((current) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ y: current }));
        return current;
      });
    } else {
      setOpen((v) => !v);
    }
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  if (hide) return null;

  return (
    <div
      ref={rootRef}
      className="fixed left-0 z-[200] font-body"
      style={{ top: posY, width: HANDLE_WIDTH }}
    >
      {open && (
        <div
          className="absolute left-full top-0 ml-2 w-[17.5rem] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-[var(--shadow-card-hover)]"
          role="menu"
          aria-label="Presentation navigation"
        >
          <div className="border-b border-border px-3 py-2.5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Present
            </p>
          </div>

          <div className="space-y-0.5 p-1.5">
            <a
              href={CMS_HREF}
              role="menuitem"
              className="flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium text-body transition-colors hover:bg-fog hover:text-foreground"
            >
              <AppIcon icon={UI_ICONS.grid} size={16} className="shrink-0 text-primary" />
              CMS
            </a>
            <Link
              href={DESIGN_HREF}
              role="menuitem"
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors",
                onDesign
                  ? "bg-primary-muted text-primary"
                  : "text-body hover:bg-fog hover:text-foreground",
              )}
            >
              <AppIcon icon={UI_ICONS.file} size={16} className="shrink-0 text-primary" />
              Design system
            </Link>
            <Link
              href={MARIGOLD_HREF}
              role="menuitem"
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors",
                onMarigold
                  ? "bg-primary-muted text-primary"
                  : "text-body hover:bg-fog hover:text-foreground",
              )}
            >
              <AppIcon icon={UI_ICONS.home} size={16} className="shrink-0 text-primary" />
              Marigold model
            </Link>
          </div>

          <div className="border-t border-border px-3 py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Lifecycle stages
            </p>
            <p className="mt-0.5 text-xs capitalize text-muted">
              {slug.replace(/-/g, " ")}
            </p>
          </div>

          <ul className="space-y-0.5 p-1.5 pt-0" role="group" aria-label="Community stages">
            {COMMUNITY_STAGE_PRESENTATIONS.map((item) => {
              const href = communityStageHrefFromSlug(slug, item.slug);
              const isActive = activeStage === item.slug;

              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    role="menuitem"
                    title={item.description}
                    className={cn(
                      "flex min-h-11 flex-col justify-center rounded-[var(--radius-control)] px-3 py-2 transition-colors",
                      isActive
                        ? "bg-primary-muted text-primary"
                        : "text-body hover:bg-fog hover:text-foreground",
                    )}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="mt-0.5 text-[0.65rem] leading-snug text-muted">
                      {item.description}
                    </span>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={communityHref(slug)}
                role="menuitem"
                className={cn(
                  "flex min-h-11 flex-col justify-center rounded-[var(--radius-control)] px-3 py-2 transition-colors",
                  onBaseCommunity
                    ? "bg-primary-muted text-primary"
                    : "text-body hover:bg-fog hover:text-foreground",
                )}
              >
                <span className="text-sm font-medium">Production (default)</span>
                <span className="mt-0.5 text-[0.65rem] leading-snug text-muted">
                  /communities/{slug} — full available now
                </span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <button
        type="button"
        onPointerDown={onDragPointerDown}
        onPointerMove={onDragPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        className={cn(
          "flex cursor-grab touch-none flex-col items-center justify-center gap-0.5 border border-l-0 border-border bg-fog/80 shadow-[var(--shadow-card)] transition-colors hover:bg-fog active:cursor-grabbing",
          "rounded-r-[var(--radius-control)]",
          open && "border-primary bg-primary-muted/40",
        )}
        style={{ width: HANDLE_WIDTH, height: HANDLE_HEIGHT }}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Presentation navigation"
      >
        <span className="block h-px w-2 bg-muted" aria-hidden />
        <span className="block h-px w-2 bg-muted" aria-hidden />
        <span className="block h-px w-2 bg-muted" aria-hidden />
      </button>
    </div>
  );
}

export function PresentationNav() {
  return (
    <Suspense fallback={null}>
      <PresentationNavInner />
    </Suspense>
  );
}
