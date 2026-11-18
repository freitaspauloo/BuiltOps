"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";
import {
  archiveCommunityHref,
  communityHref,
  DEFAULT_MICROSITE_VERSION,
  micrositeVersions,
  modelHref,
  modelPreviewLinks,
  parseMicrositeVersion,
  type MicrositeVersionId,
} from "@/lib/site-versions";

const STORAGE_KEY = "builtops-preview-nav-position";
const HANDLE_WIDTH = 14;
const HANDLE_HEIGHT = 40;
const VIEWPORT_PADDING = 16;
const DEFAULT_OFFSET_FROM_BOTTOM = 66;
const DESIGN_HREF = "/old/design";
const CMS_HREF = "/admin";
const ARCHIVE_INDEX_HREF = "/old";

function slugFromPath(pathname: string) {
  const match = pathname.match(/^\/(?:old\/)?communities\/([^/]+)/);
  return match?.[1] ?? null;
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

function PreviewNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [posY, setPosY] = useState(defaultY);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startY: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  const hideOnCms =
    Boolean(pathname?.startsWith("/admin")) || Boolean(pathname?.startsWith("/studio"));
  const slug = slugFromPath(pathname) ?? "benchmark";
  const onArchiveCommunity = Boolean(pathname?.match(/^\/old\/communities\//));
  const activeVersion = onArchiveCommunity
    ? parseMicrositeVersion(searchParams.get("version"))
    : DEFAULT_MICROSITE_VERSION;
  const onDesign = pathname === DESIGN_HREF || pathname.startsWith(`${DESIGN_HREF}/`);
  const onCms = hideOnCms;
  const onProduction = pathname === communityHref(slug);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { y?: number; x?: number };
        if (typeof parsed.y === "number") {
          setPosY(clampY(parsed.y));
        } else {
          setPosY(clampY(defaultY()));
        }
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
  }, [pathname, searchParams]);

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

  const versionLink = (version: MicrositeVersionId) => archiveCommunityHref(slug, version);

  // Must run hooks before any return — hiding on /admin used to early-return and crash client nav.
  if (hideOnCms) {
    return null;
  }

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
          aria-label="Archive navigation"
        >
          <div className="border-b border-border px-3 py-2.5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Archive
            </p>
          </div>

          <div className="space-y-0.5 p-1.5">
            <Link
              href={communityHref(slug)}
              role="menuitem"
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors",
                onProduction
                  ? "bg-primary-muted text-primary"
                  : "text-body hover:bg-fog hover:text-foreground",
              )}
            >
              <AppIcon icon={UI_ICONS.home} size={16} className="shrink-0 text-primary" />
              Production site
            </Link>
            <a
              href={CMS_HREF}
              role="menuitem"
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium transition-colors",
                onCms
                  ? "bg-primary-muted text-primary"
                  : "text-body hover:bg-fog hover:text-foreground",
              )}
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
              href={ARCHIVE_INDEX_HREF}
              role="menuitem"
              className="flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] px-3 text-sm font-medium text-body transition-colors hover:bg-fog hover:text-foreground"
            >
              <AppIcon icon={UI_ICONS.list} size={16} className="shrink-0 text-primary" />
              Archive index
            </Link>
          </div>

          <div className="border-t border-border px-3 py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Version archive
            </p>
            <p className="mt-0.5 text-xs text-muted capitalize">{slug.replace(/-/g, " ")}</p>
          </div>

          <ul className="space-y-0.5 p-1.5 pt-0" role="group" aria-label="Microsite versions">
            {micrositeVersions.map((version) => {
              const href = versionLink(version.id);
              const isActive = onArchiveCommunity && activeVersion === version.id;

              return (
                <li key={version.id}>
                  <Link
                    href={href}
                    role="menuitem"
                    title={version.description}
                    className={cn(
                      "flex min-h-11 flex-col justify-center rounded-[var(--radius-control)] px-3 py-2 transition-colors",
                      isActive
                        ? "bg-primary-muted text-primary"
                        : "text-body hover:bg-fog hover:text-foreground",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2 text-sm font-medium">
                      <span>{version.label}</span>
                      <span
                        className={cn(
                          "text-[0.6rem] font-semibold uppercase tracking-wide",
                          version.frozen ? "text-muted" : "text-primary",
                        )}
                      >
                        {version.frozen ? "Frozen" : "Prod"}
                      </span>
                    </span>
                    <span className="mt-0.5 text-[0.65rem] leading-snug text-muted">
                      {version.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-border px-3 py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Model pages
            </p>
          </div>

          <ul className="space-y-0.5 p-1.5 pt-0" role="group" aria-label="Model pages">
            {modelPreviewLinks.map((model) => {
              const isActive = pathname === modelHref(model.slug);

              return (
                <li key={model.slug}>
                  <Link
                    href={modelHref(model.slug)}
                    role="menuitem"
                    title={model.description}
                    className={cn(
                      "flex min-h-11 flex-col justify-center rounded-[var(--radius-control)] px-3 py-2 transition-colors",
                      isActive
                        ? "bg-primary-muted text-primary"
                        : "text-body hover:bg-fog hover:text-foreground",
                    )}
                  >
                    <span className="text-sm font-medium">{model.label}</span>
                    <span className="mt-0.5 text-[0.65rem] leading-snug text-muted">
                      {model.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-border px-3 py-2.5">
            <p className="text-[0.65rem] leading-relaxed text-muted">
              {onCms
                ? "Payload CMS admin"
                : onDesign
                  ? "Design system reference"
                  : onArchiveCommunity
                    ? `${slug} · ${activeVersion}${isFrozenLabel(activeVersion) ? " (frozen)" : ""}`
                    : "Browse archived microsite versions"}
            </p>
          </div>
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
        aria-label="Archive navigation"
      >
        <span className="block h-px w-2 bg-muted" aria-hidden />
        <span className="block h-px w-2 bg-muted" aria-hidden />
        <span className="block h-px w-2 bg-muted" aria-hidden />
      </button>
    </div>
  );
}

function isFrozenLabel(version: MicrositeVersionId) {
  return micrositeVersions.find((v) => v.id === version)?.frozen === true;
}

export function PreviewNav() {
  return (
    <Suspense fallback={null}>
      <PreviewNavInner />
    </Suspense>
  );
}
