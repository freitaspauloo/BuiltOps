import Image from "next/image";
import type { QuickMoveInHome } from "@/lib/types/community";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

function QuickMoveInBadge() {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-border px-2.5 py-0.5 text-xs font-semibold text-white",
        "rounded-[var(--radius-control)] community-collection-badge--default",
      )}
    >
      Quick move-in
    </span>
  );
}

export function QuickMoveInCard({ home }: { home: QuickMoveInHome }) {
  const specs = `${home.beds} beds · ${home.baths} baths · ${home.sqft.toLocaleString()} sqft`;

  return (
    <article className="model-card flex h-full flex-col overflow-hidden bg-background">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={home.image}
          alt={home.address}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 88vw, 290px"
        />
        <div className="absolute left-2.5 top-2.5">
          <QuickMoveInBadge />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-medium leading-tight text-heading">
            {home.address}
          </h3>
          <span className="model-card-lot-pill shrink-0">Lot {home.lot}</span>
        </div>

        <p className="text-[11px] leading-snug text-muted sm:text-xs">{home.possessionDate}</p>

        <p className="text-sm font-bold leading-tight text-heading">{home.price}</p>

        <p className="text-xs text-muted">{specs}</p>

        <div className="mt-auto pt-3">
          <Button href="#registration" variant="primary" size="sm" className="w-full overflow-hidden">
            Book showing
          </Button>
        </div>
      </div>
    </article>
  );
}
