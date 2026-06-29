"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AppIcon, UI_ICONS } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";
import {
  communityHref,
  DEFAULT_MICROSITE_VERSION,
  micrositeVersions,
  parseMicrositeVersion,
  type MicrositeVersionId,
} from "@/lib/site-versions";

const STORAGE_KEY = "builtops-preview-nav-position";
const WIDGET_SIZE = 32;
const DEFAULT_POSITION = { x: 16, y: 66 };
const DESIGN_HREF = "/design";

function slugFromPath(pathname: string) {
  const match = pathname.match(/^\/communities\/([^/]+)/);
  return match?.[1] ?? null;
}

function clampPosition(x: number, y: number) {
  if (typeof window === "undefined") return { x, y };
  const maxX = Math.max(8, window.innerWidth - WIDGET_SIZE - 8);
  const maxY = Math.max(8, window.innerHeight - WIDGET_SIZE - 8);
  return {
    x: Math.min(Math.max(8, x), maxX),
    y: Math.min(Math.max(8, y), maxY),
  };
}

function PreviewNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(DEFAULT_POSITION);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    moved: boolean;
  } | null>(null);

  const slug = slugFromPath(pathname);
  const onCommunity = Boolean(slug);
  const activeVersion = onCommunity
    ? parseMicrositeVersion(searchParams.get("version"))
    : DEFAULT_MICROSITE_VERSION;
  const onDesign = pathname === DESIGN_HREF || pathname.startsWith(`${DESIGN_HREF}/`);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { x: number; y: number };
        setPos(clampPosition(parsed.x, parsed.y));
      }
    } catch {
      setPos(DEFAULT_POSITION);
    }
  }, []);

  useEffect(() => {
    const onResize = () => setPos((current) => clampPosition(current.x, current.y));
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

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x,
      originY: pos.y,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!drag.moved && Math.hypot(dx, dy) > 4) {
      drag.moved = true;
      setOpen(false);
    }

    if (!drag.moved) return;

    setPos(clampPosition(drag.originX + dx, drag.originY - dy));
  };

  const finishPointer = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.moved) {
      setPos((current) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
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

  const versionLink = (version: MicrositeVersionId) =>
    slug ? communityHref(slug, version) : communityHref("benchmark", version);

  return (
    <div
      ref={rootRef}
      className="fixed z-[200] font-body"
      style={{ left: pos.x, bottom: pos.y }}
    >
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-52 border border-border bg-surface shadow-[var(--shadow-card-hover)]">
          <div className="border-b border-border px-3 py-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
              Preview
            </p>
          </div>

          <ul className="py-1">
            <li>
              <Link
                href={DESIGN_HREF}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium transition-colors",
                  onDesign
                    ? "bg-primary-muted text-primary"
                    : "text-body hover:bg-fog hover:text-foreground",
                )}
              >
                Design system
              </Link>
            </li>

            <li className="group relative">
              <div
                className={cn(
                  "flex cursor-default items-center justify-between px-3 py-2.5 text-sm font-medium",
                  onCommunity ? "bg-primary-muted/40 text-foreground" : "text-body",
                )}
              >
                <span>Main website</span>
                <AppIcon icon={UI_ICONS.chevronRight} size={14} className="text-muted" />
              </div>

              <div className="absolute bottom-0 left-full z-10 ml-1 hidden min-w-[5.5rem] border border-border bg-surface py-1 shadow-[var(--shadow-card-hover)] group-hover:block group-focus-within:block">
                {micrositeVersions.map((version) => {
                  const href = versionLink(version.id);
                  const isActive = onCommunity && activeVersion === version.id;

                  return (
                    <Link
                      key={version.id}
                      href={href}
                      title={version.description}
                      className={cn(
                        "block px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-muted text-primary"
                          : "text-body hover:bg-fog hover:text-foreground",
                      )}
                    >
                      {version.label}
                    </Link>
                  );
                })}
              </div>
            </li>
          </ul>

          <div className="border-t border-border px-3 py-2">
            <p className="text-[0.65rem] leading-relaxed text-muted">
              {onDesign
                ? "Design system reference"
                : onCommunity
                  ? `Benchmark Towns · ${activeVersion}`
                  : "Select a preview destination"}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        className={cn(
          "flex h-8 w-8 touch-none items-center justify-center border border-border bg-surface shadow-[var(--shadow-card)]",
          "cursor-grab text-foreground transition-colors hover:bg-fog active:cursor-grabbing",
          open && "border-primary",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Preview pages"
      >
        <AppIcon icon={UI_ICONS.grid} size={16} className="pointer-events-none text-primary" />
      </button>
    </div>
  );
}

export function PreviewNav() {
  return (
    <Suspense fallback={null}>
      <PreviewNavInner />
    </Suspense>
  );
}
