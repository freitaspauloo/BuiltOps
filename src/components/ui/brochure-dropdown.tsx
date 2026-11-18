"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DownloadAsset } from "@/lib/types/community";
import { AppIcon, UI_ICONS, getSectionIcon } from "@/lib/icons";
import { cn } from "@/lib/utils/cn";
import { buttonSizeStyles } from "@/components/ui/button";

function downloadIcon(file: DownloadAsset) {
  if (file.type.toLowerCase() === "pdf") return UI_ICONS.file;
  if (file.title.toLowerCase().includes("site plan")) return getSectionIcon("sitePlan");
  return UI_ICONS.download;
}

export function BrochureDropdown({
  label,
  downloads,
  tone = "light",
  size = "md",
  variant = "button",
  menuPlacement = "bottom",
  className,
  onNavigate,
}: {
  label: string;
  downloads: DownloadAsset[];
  tone?: "light" | "onPrimary" | "onImage";
  size?: "sm" | "md";
  variant?: "button" | "link";
  menuPlacement?: "top" | "bottom";
  className?: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const pad = buttonSizeStyles[size];

  const triggerClass =
    variant === "link"
      ? "inline-flex items-center gap-1.5 transition-colors"
      : tone === "light"
        ? "control-radius inline-flex items-center justify-center overflow-hidden font-semibold transition-colors border border-border bg-surface text-foreground hover:bg-fog"
        : tone === "onImage"
          ? "control-radius inline-flex items-center justify-center overflow-hidden font-semibold transition-colors border border-transparent bg-white/12 text-white hover:bg-white/20"
          : "control-radius inline-flex items-center justify-center overflow-hidden font-semibold transition-colors border border-white/70 bg-white text-foreground hover:bg-white/90";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (downloads.length === 0) return null;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={cn(triggerClass, variant === "button" && pad, "gap-1.5")}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 opacity-70 transition-transform",
            menuPlacement === "top" ? !open && "rotate-180" : open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label={label}
          className={cn(
            "absolute right-0 z-[60] w-[min(100vw-2rem,18rem)] overflow-hidden rounded-[var(--radius-card)] border border-border bg-background shadow-[var(--shadow-card)] sm:w-[20rem]",
            menuPlacement === "top" ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          <ul className="max-h-[min(70vh,24rem)] space-y-0.5 overflow-y-auto p-2">
            {downloads.map((file) => (
              <li key={file.title} role="option">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="group flex items-start gap-3 rounded-[var(--radius-control)] px-3 py-2.5 transition-colors hover:bg-mist focus-visible:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <AppIcon
                    icon={downloadIcon(file)}
                    size={20}
                    className="mt-0.5 shrink-0 text-primary transition-colors group-hover:text-primary-hover"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-foreground group-hover:text-primary">
                      {file.title}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-wide text-muted">{file.type}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
