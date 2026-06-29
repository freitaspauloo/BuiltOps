import type { IconType } from "react-icons";
import { cn } from "@/lib/utils/cn";
import { AppIcon } from "@/lib/icons";

export function Pill({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon?: IconType;
  className?: string;
}) {
  return (
    <span className={cn("pill", className)}>
      {icon && <AppIcon icon={icon} size={16} className="shrink-0 opacity-80" />}
      {children}
    </span>
  );
}

export function PillGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>;
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
