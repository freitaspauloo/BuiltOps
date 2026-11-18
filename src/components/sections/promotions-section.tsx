import type { Promotion } from "@/lib/types/community";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

export function PromotionsSection({
  promotions,
  siteVersion = "v3",
}: {
  promotions: Promotion[];
  siteVersion?: MicrositeVersionId;
}) {
  const editorial = isEditorialVersion(siteVersion);

  return (
    <SectionShell id="promotions" siteVersion={siteVersion} reveal={false}>
      {editorial ? (
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <SectionIntro
            label="Offers"
            title="Current promotions"
            description="Limited-time programs and pricing on select Benchmark Towns homes."
            showRule={false}
            className="mb-0 lg:sticky lg:top-[calc(var(--nav-height,4rem)+1.5rem)] lg:self-start"
          />
          <div className="divide-y divide-border border-y border-border">
            {promotions.map((promo) => (
              <article key={promo.title} className="v3-list-row">
                {promo.badge && <p className="text-sm text-muted">{promo.badge}</p>}
                <h3 className="mt-1 text-lg font-semibold text-foreground">{promo.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{promo.description}</p>
                {promo.expiresAt && (
                  <Pill className="mt-3" size="sm">
                    Expires {promo.expiresAt}
                  </Pill>
                )}
                <Button
                  href="#registration"
                  size="sm"
                  variant="secondary"
                  className="mt-6 border border-border bg-mist hover:bg-card-label"
                >
                  Book a showing
                </Button>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <>
          <SectionHeaderSplit eyebrow="Offers" title="Current promotions" siteVersion={siteVersion} />
          <div className="grid gap-6 md:grid-cols-2">
            {promotions.map((promo) => (
              <div key={promo.title} className="card-surface p-8">
                {promo.badge && <span className="card-label block">{promo.badge}</span>}
                <h3 className="text-xl font-bold text-foreground">{promo.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{promo.description}</p>
                {promo.expiresAt && (
                  <p className="mt-5 text-xs text-muted">Expires {promo.expiresAt}</p>
                )}
                <Button href="#registration" size="sm" className="mt-6">
                  Book a showing
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
