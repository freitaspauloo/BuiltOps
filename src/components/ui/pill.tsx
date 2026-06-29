import type { IconType } from "react-icons";
import { cn } from "@/lib/utils/cn";
import { AppIcon } from "@/lib/icons";

export function Pill({
  children,
  icon,
  size = "default",
  className,
}: {
  children: React.ReactNode;
  icon?: IconType;
  size?: "default" | "sm";
  className?: string;
}) {
  return (
    <span className={cn("pill", size === "sm" && "pill-sm", className)}>
      {icon && (
        <AppIcon
          icon={icon}
          size={size === "sm" ? 14 : 16}
          className="shrink-0 opacity-80"
        />
      )}
      {children}
    </span>
  );
}

export function PillGroup({
  children,
  size = "default",
  className,
}: {
  children: React.ReactNode;
  size?: "default" | "sm";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap", size === "sm" ? "gap-2" : "gap-3", className)}>
      {children}
    </div>
  );
}

/** @deprecated use Pill */
export function Tag({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon?: IconType;
  className?: string;
}) {
  return (
    <Pill icon={icon} className={className}>
      {children}
    </Pill>
  );
}
