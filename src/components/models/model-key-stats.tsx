import type { HomeModel } from "@/lib/types/model";
import { cn } from "@/lib/utils/cn";

export function ModelKeyStats({
  model,
  className,
}: {
  model: HomeModel;
  className?: string;
}) {
  const homeTypeLabel = model.homeType === "townhome" ? "Townhome" : "Detached";

  return (
    <div className={cn("space-y-3", className)}>
      <dl
        className={cn(
          "v5-overview-facts v5-overview-outline-facts grid grid-cols-2 gap-3 sm:grid-cols-3",
        )}
      >
        {model.priceFrom ? (
          <div className="v5-overview-fact v5-overview-fact--lead col-span-2 sm:col-span-3">
            <dt>Starting from</dt>
            <dd>{model.priceFrom.replace(/^From\s+/i, "")}</dd>
          </div>
        ) : null}
        <div className="v5-overview-fact">
          <dt>Home type</dt>
          <dd>{homeTypeLabel}</dd>
        </div>
        <div className="v5-overview-fact">
          <dt>Bedrooms</dt>
          <dd>{model.beds}</dd>
        </div>
        <div className="v5-overview-fact">
          <dt>Bathrooms</dt>
          <dd>{model.baths}</dd>
        </div>
        <div className="v5-overview-fact">
          <dt>Square feet</dt>
          <dd>{model.sqft.toLocaleString()}</dd>
        </div>
        {model.storeys ? (
          <div className="v5-overview-fact">
            <dt>Storeys</dt>
            <dd>{model.storeys}</dd>
          </div>
        ) : null}
        {model.garage ? (
          <div className="v5-overview-fact col-span-2 sm:col-span-1">
            <dt>Garage</dt>
            <dd>{model.garage}</dd>
          </div>
        ) : null}
      </dl>

      {model.estimatedPayment ? (
        <p className="text-sm text-body">
          <span className="font-semibold text-heading">{model.estimatedPayment}</span>
          {model.paymentDisclaimer ? (
            <span className="mt-0.5 block text-xs text-muted">{model.paymentDisclaimer}</span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
