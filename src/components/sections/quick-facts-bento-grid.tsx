import type { QuickFacts } from "@/lib/types/community";
import { AppIcon, getSnapshotIcon } from "@/lib/icons";
import { getBentoSpan, sortFactsForBento } from "@/lib/quick-facts/bento";
import { cn } from "@/lib/utils/cn";

type QuickFactsBentoGridProps = {
  facts: NonNullable<QuickFacts["facts"]>;
  variant?: "onImage" | "light";
  className?: string;
};

export function QuickFactsBentoGrid({
  facts,
  variant = "light",
  className,
}: QuickFactsBentoGridProps) {
  const ordered = sortFactsForBento(facts);
  const onImage = variant === "onImage";

  return (
    <div
      className={cn(
        "grid w-full grid-cols-2 gap-2.5 md:gap-3",
        onImage
          ? "ml-auto w-max max-w-full sm:max-w-[26rem] lg:max-w-[30rem] xl:max-w-[32rem]"
          : "max-w-full sm:max-w-[26rem] lg:max-w-[30rem] xl:max-w-[32rem]",
        className,
      )}
    >
      {ordered.map((fact) => (
        <div
          key={fact.label}
          className={cn(
            "flex items-center gap-3",
            onImage ? "hero-bento-cell" : "metrics-bento-cell",
            getBentoSpan(fact.label),
          )}
        >
          <AppIcon
            icon={getSnapshotIcon(fact.label)}
            size={18}
            className={cn("shrink-0", onImage ? "text-white" : "text-primary")}
            strokeWidth={1.25}
          />
          <span
            className={cn(
              "min-w-0 text-sm font-medium leading-snug md:text-base",
              onImage ? "text-white" : "text-foreground",
            )}
          >
            {fact.value}
          </span>
        </div>
      ))}
    </div>
  );
}
