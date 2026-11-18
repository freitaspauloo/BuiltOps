import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { isEditorialVersion, type MicrositeVersionId } from "@/lib/site-versions";
import { cn } from "@/lib/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", align === "center" && "mx-auto")}>{eyebrow}</p>
      )}
      <h2 className="headline-section">{title}</h2>
      {description && (
        <p className="prose-editorial mt-5 max-w-2xl text-muted">{description}</p>
      )}
    </div>
  );
}

export function SectionHeaderSplit({
  eyebrow,
  title,
  description,
  aside,
  asideAlign = "end",
  align = "left",
  className,
  siteVersion = "v3",
  showRule = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
  asideAlign?: "start" | "center" | "end";
  align?: "left" | "center";
  className?: string;
  siteVersion?: MicrositeVersionId;
  showRule?: boolean;
}) {
  if (siteVersion === "v1") {
    return (
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
        className={className}
      />
    );
  }

  if (isEditorialVersion(siteVersion)) {
    const centered = align === "center";
    const asideItemsClass =
      asideAlign === "center"
        ? "lg:items-center"
        : asideAlign === "start"
          ? "lg:items-start"
          : "lg:items-end";

    return (
      <div
        className={cn(
          centered && aside ? "mb-6 md:mb-8" : "mb-10 md:mb-14",
          centered && "text-center",
          className,
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            centered && aside ? "gap-4" : "gap-6",
            aside && !centered && cn("lg:flex-row lg:justify-between", asideItemsClass),
            aside && centered && "items-center",
          )}
        >
          <SectionIntro
            label={eyebrow}
            title={title}
            description={description}
            showRule={false}
            className={cn("mb-0", centered && "mx-auto max-w-3xl")}
          />
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
        {showRule && <hr className="v3-hairline" aria-hidden />}
      </div>
    );
  }

  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 lg:mb-14",
        centered
          ? "items-center text-center"
          : "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <p className={cn("eyebrow", centered && "mx-auto")}>{eyebrow}</p>
        )}
        <h2 className="headline-section text-balance">{title}</h2>
        {description && (
          <p
            className={cn(
              "mt-5 max-w-lg text-base leading-relaxed text-body md:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {aside && (
        <div className={cn("shrink-0", centered && "flex justify-center")}>{aside}</div>
      )}
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className,
  muted,
  reveal,
  siteVersion = "v3",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  reveal?: boolean;
  siteVersion?: MicrositeVersionId;
  /** @deprecated use muted */
  dark?: boolean;
}) {
  const shouldReveal = reveal ?? siteVersion === "v2";
  const inner = shouldReveal ? <ScrollReveal>{children}</ScrollReveal> : children;

  return (
    <section
      id={id}
      className={cn(
        "section-padding scroll-mt-[var(--nav-height,4rem)] scroll-pb-24 bg-background",
        muted && "bg-card/40",
        className,
      )}
    >
      <div className="container-wide min-w-0 max-w-full">{inner}</div>
    </section>
  );
}

export function cardSurfaceClass(siteVersion: MicrositeVersionId = "v3", interactive = true) {
  if (isEditorialVersion(siteVersion)) return interactive ? "v3-panel" : "bg-background";
  if (siteVersion === "v2" && interactive) return "card-interactive";
  return "archun-card";
}
