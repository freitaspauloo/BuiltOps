import type { HomeType } from "@/lib/types/model";
import { cn } from "@/lib/utils/cn";

export function ModelLotFitCallout({
  homeType,
  className,
}: {
  homeType: HomeType;
  className?: string;
}) {
  const isTownhome = homeType === "townhome";

  return (
    <aside
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-card px-4 py-3 text-sm leading-relaxed text-body md:px-5 md:py-4",
        className,
      )}
    >
      <p className="font-semibold text-foreground">
        {isTownhome ? "Townhome lot assignment" : "Detached homesite fit"}
      </p>
      <p className="mt-1">
        {isTownhome
          ? "On townhome blocks, each lot is paired with a predetermined model and elevation. Select a lot below to open live availability on the connected experience."
          : "On detached homesites, buyers choose a lot first, then select from the models that fit the homesite width and orientation."}
      </p>
    </aside>
  );
}
