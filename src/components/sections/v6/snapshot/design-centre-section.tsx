import Image from "next/image";
import type { DesignCentre } from "@/lib/types/community";
import { isEditorialVersion, isV6MicrositeVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { SectionIntro } from "@/components/ui/section-intro";
import { SectionHeading, SectionShell } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function DesignCentreSection({
  data,
  siteVersion = "v3",
}: {
  data: DesignCentre;
  siteVersion?: MicrositeVersionId;
}) {
  if (isEditorialVersion(siteVersion)) {
    const isV5 = isV6MicrositeVersion(siteVersion);

    if (isV5 && data.image) {
      return (
        <SectionShell id="designCentre" siteVersion={siteVersion} reveal={false}>
          <SectionIntro
            label="Design centre"
            title={data.title}
            description={data.description}
            showRule={false}
            className="mb-8 md:mb-10"
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-stretch lg:gap-10">
            <div className="relative min-h-[16rem] w-full overflow-hidden rounded-[var(--radius-card)] bg-mist sm:min-h-[20rem] lg:min-h-[24rem]">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>

            <div className="flex flex-col justify-between rounded-[var(--radius-card)] border border-border bg-background p-6 md:p-8">
              <div className="space-y-5">
                <p className="text-sm leading-relaxed text-body md:text-base">
                  After you purchase, dedicated design appointments let you tailor flooring,
                  cabinetry, countertops, and lighting — making every space unmistakably yours.
                </p>

                {data.address ? (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Location</p>
                    <p className="mt-1 text-sm text-foreground">{data.address}</p>
                  </div>
                ) : null}

                {data.hours?.length ? (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Hours</p>
                    <ul className="mt-1 space-y-1 text-sm text-foreground">
                      {data.hours.map((hour) => (
                        <li key={hour}>{hour}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <Button href="#registration" variant="primary" size="md" className="mt-8 w-full sm:w-auto">
                {data.ctaLabel ?? "Book a design appointment"}
              </Button>
            </div>
          </div>
        </SectionShell>
      );
    }

    return (
      <SectionShell id="designCentre" siteVersion={siteVersion} reveal={false} muted={!isV5}>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="v3-panel !border-t-0 !pt-0">
            <SectionIntro
              label="Design centre"
              title={data.title}
              description={data.description}
              className="mb-0"
            />
            {data.address && <p className="mt-5 text-sm text-muted">{data.address}</p>}
            {data.hours && (
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {data.hours.map((hour) => (
                  <li key={hour}>{hour}</li>
                ))}
              </ul>
            )}
            <Button href="#registration" variant="primary" size="md" className="mt-6">
              {data.ctaLabel ?? "Book a design appointment"}
            </Button>
          </div>

          {data.image && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-mist">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="designCentre" muted siteVersion={siteVersion}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Design centre"
            title={data.title}
            description={data.description}
            className="mb-0"
          />
          {data.address && <p className="mt-4 text-sm text-muted">{data.address}</p>}
          {data.hours && (
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {data.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          <a href="#registration" className="mt-6 inline-block text-sm font-semibold text-primary">
            {data.ctaLabel ?? "Book a design appointment"}
          </a>
        </div>
        {data.image && (
          <div className="relative aspect-[4/3] overflow-hidden bg-mist">
            <Image src={data.image} alt={data.title} fill className="object-cover" sizes="50vw" />
          </div>
        )}
      </div>
    </SectionShell>
  );
}
