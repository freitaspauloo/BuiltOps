"use client";

import { AppIcon, getAreaCategoryPillIcon } from "@/lib/icons";
import { AREA_MARKER_COLORS } from "@/lib/maps/markers";
import { cn } from "@/lib/utils/cn";
import type { MapPoint } from "@/lib/types/community";

type AreaMapMarkerPinProps = {
  category: MapPoint["category"];
  label: string;
  isFocused?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function AreaMapMarkerPin({
  category,
  label,
  isFocused = false,
  className,
  onClick,
}: AreaMapMarkerPinProps) {
  const color = AREA_MARKER_COLORS[category];

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={onClick ? isFocused : undefined}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center border-2 border-white shadow-[0_8px_24px_rgba(12,20,23,0.22)] transition-transform duration-200 ease-[var(--ease-out-soft)]",
        isFocused ? "h-11 w-11 scale-110 ring-2 ring-white" : "h-10 w-10 hover:scale-105",
        !onClick && "pointer-events-none",
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <AppIcon icon={getAreaCategoryPillIcon(category)} size={18} className="text-white" />
    </button>
  );
}
