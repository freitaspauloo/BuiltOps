import type { Promotion } from "@/lib/types/community";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";

export function PromotionsSection({
  promotions,
  siteVersion = "v2",
}: {
  promotions: Promotion[];
  siteVersion?: MicrositeVersionId;
}) {
  return (
    <SectionShell id="promotions" siteVersion={siteVersion}>
      <SectionHeaderSplit eyebrow="Offers" title="Current promotions" siteVersion={siteVersion} />
      <div className="grid gap-6 md:grid-cols-2">
        {promotions.map((promo) => (
          <div key={promo.title} className="card-surface p-8">
            {promo.badge && (
              <span className="card-label block">{promo.badge}</span>
            )}
            <h3 className="text-xl font-bold">{promo.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-body">{promo.description}</p>
            {promo.expiresAt && (
              <p className="mt-5 text-xs text-muted">Expires {promo.expiresAt}</p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
