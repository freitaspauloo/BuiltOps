import { cn } from "@/lib/utils/cn";

export function LosaniLogo({
  href = "#hero",
  className,
  inverse,
}: {
  href?: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "shrink-0 text-xs font-bold tracking-[0.18em] sm:text-sm",
        inverse ? "text-white" : "text-foreground",
        className,
      )}
      aria-label="Losani Homes"
    >
      LOSANI
    </a>
  );
}
