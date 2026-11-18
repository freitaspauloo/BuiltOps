import Image from "next/image";
import type { Community } from "@/lib/types/community";
import {
  isAuditMicrositeVersion,
  isEditorialVersion,
  isV6MicrositeVersion,
  type MicrositeVersionId,
} from "@/lib/site-versions";
import { SectionHeaderSplit, SectionShell } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { AppIcon, getAmenityIcon } from "@/lib/icons";
import { SectionBrochureLink } from "@/components/ui/section-brochure-link";
import { cn } from "@/lib/utils/cn";

/**
 * v6 Lifestyle — locked to container-wide (1320).
 * Copy left, photos right. One composition, no full-bleed tricks.
 */
function AmenitiesSectionV6({
  data,
  image,
  secondaryImage,
}: {
  data: NonNullable<Community["amenities"]>;
  image?: string;
  secondaryImage?: string;
}) {
  // Prefer vineyard/location beauty shot when both exist (seed order is trails, vineyard).
  const primary = secondaryImage ?? image;
  const secondary =
    image && secondaryImage && image !== primary ? image : undefined;

  return (
    <SectionShell id="amenities" siteVersion="v6" reveal={false}>
      <div className="grid min-w-0 gap-10 md:gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div className="min-w-0">
          <SectionIntro
            label="Lifestyle"
            title={data.title}
            description="From wine-country views to everyday conveniences — the features that shape daily life at this community."
            showRule={false}
            className="mb-0"
          />

          <div className="mt-7 divide-y divide-border border-y border-border md:mt-8">
            {data.items.map((item) => (
              <article key={item.title} className="py-5 md:py-6">
                <h3 className="text-base font-semibold text-foreground md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body md:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          {data.brochureUrl ? (
            <SectionBrochureLink
              url={data.brochureUrl}
              label={data.brochureLabel ?? "Open Brochure"}
              className="mt-8"
            />
          ) : null}
        </div>

        {primary ? (
          <div className="grid min-w-0 gap-3 sm:gap-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] bg-mist">
              <Image
                src={primary}
                alt="Lifestyle at Benchmark Towns"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 660px"
              />
            </div>
            {secondary ? (
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[var(--radius-card)] bg-mist">
                <Image
                  src={secondary}
                  alt="Community and surroundings"
                  fill
                  className="object-cover object-[center_40%]"
                  sizes="(max-width: 1024px) 100vw, 660px"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}

function AmenitiesImageCollage({
  primary,
  secondary,
  primaryAlt = "",
  secondaryAlt = "",
  tall = false,
  compact = false,
}: {
  primary: string;
  secondary?: string;
  primaryAlt?: string;
  secondaryAlt?: string;
  tall?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "v4-lifestyle-collage relative w-full",
        tall && !compact && "lg:flex lg:h-full lg:min-h-0 lg:items-center lg:justify-center",
        compact && "lg:flex lg:items-start lg:justify-center",
      )}
    >
      <div
        className={cn(
          "relative w-[76%] overflow-hidden rounded-[var(--radius-card)] bg-mist sm:w-[72%]",
          compact
            ? "aspect-[4/5] lg:aspect-auto lg:h-[26rem] lg:w-[88%]"
            : tall
              ? "aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[36rem] lg:w-[88%]"
              : "aspect-[3/4]",
        )}
      >
        <Image
          src={primary}
          alt={primaryAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {secondary && (
        <div
          className={cn(
            "absolute right-0 top-[42%] z-10 aspect-[4/3] w-[min(72%,20rem)] -translate-y-1/2 overflow-hidden rounded-[var(--radius-card)] border-[10px] border-background bg-mist shadow-[var(--shadow-card)] sm:w-[68%] sm:max-w-[24rem]",
            tall && !compact && "lg:top-1/2 lg:w-[min(72%,22rem)] lg:max-w-[28rem]",
            compact && "lg:top-[48%] lg:w-[min(68%,18rem)] lg:max-w-[20rem]",
          )}
        >
          <Image
            src={secondary}
            alt={secondaryAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 80vw, 40vw"
          />
        </div>
      )}
      <div
        className={cn("h-16 sm:h-20", tall && !compact && "lg:h-10", compact && "h-10 sm:h-12")}
        aria-hidden
      />
    </div>
  );
}

export function AmenitiesSection({
  data,
  image,
  secondaryImage,
  siteVersion = "v3",
}: {
  data: NonNullable<Community["amenities"]>;
  image?: string;
  secondaryImage?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (isV6MicrositeVersion(siteVersion)) {
    return (
      <AmenitiesSectionV6
        data={data}
        image={image}
        secondaryImage={secondaryImage}
      />
    );
  }

  if (isEditorialVersion(siteVersion)) {
    const isAudit = isAuditMicrositeVersion(siteVersion);
    const collage =
      image &&
      (isAudit ? (
        <AmenitiesImageCollage
          primary={image}
          secondary={secondaryImage}
          primaryAlt="Lifestyle at Benchmark Towns"
          secondaryAlt="Community and surroundings"
          tall={isAudit}
        />
      ) : (
        <div className="aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-mist lg:sticky lg:top-[calc(var(--nav-height,4rem)+2rem)]">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      ));

    return (
      <SectionShell id="amenities" siteVersion={siteVersion} reveal={false}>
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-2 lg:gap-14",
            isAudit ? "lg:items-stretch" : "lg:items-start",
          )}
        >
          <div
            className={cn(
              !image && "lg:col-span-2 lg:max-w-3xl",
              isAudit && "lg:flex lg:flex-col lg:justify-center",
            )}
          >
            <SectionIntro
              label="Lifestyle"
              title={data.title}
              description={
                isAudit
                  ? "From wine-country views to everyday conveniences — the features that shape daily life at this community."
                  : "Everything that makes this neighbourhood worth calling home."
              }
              showRule={false}
            />

            {isAudit && collage && <div className="mt-8 lg:hidden">{collage}</div>}

            <div className="mt-8 divide-y divide-border border-y border-border">
              {data.items.map((item) => (
                <article key={item.title} className="v3-list-row flex gap-4">
                  <span className="icon-chip" aria-hidden>
                    <AppIcon icon={getAmenityIcon(item.icon)} size={20} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-foreground md:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body md:text-base">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {data.brochureUrl && (
              <SectionBrochureLink
                url={data.brochureUrl}
                label={data.brochureLabel ?? "Open Brochure"}
                className="mt-10 md:mt-14"
              />
            )}
          </div>

          {collage &&
            (isAudit ? (
              <div className="hidden lg:flex lg:h-full lg:items-stretch lg:justify-center lg:self-stretch">
                {collage}
              </div>
            ) : (
              collage
            ))}
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="amenities" siteVersion={siteVersion}>
      <SectionHeaderSplit
        eyebrow="Lifestyle"
        title={data.title}
        description="Everything that makes this neighbourhood worth calling home."
        siteVersion={siteVersion}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {data.items.map((item) => (
          <article key={item.title} className="card-interactive p-7 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="icon-chip">
                <AppIcon icon={getAmenityIcon(item.icon)} size={20} />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-body md:text-base">{item.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
