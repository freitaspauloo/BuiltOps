import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { MicrositeVersionId } from "@/lib/site-versions";
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
  className,
  siteVersion = "v2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
  className?: string;
  siteVersion?: MicrositeVersionId;
}) {
  if (siteVersion === "v1") {
    return (
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="headline-section text-balance">{title}</h2>
        {description && (
          <p className="mt-5 max-w-lg text-base leading-relaxed text-body md:text-lg">
            {description}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

export function SectionShell({
  id,
  children,
  className,
  muted,
  reveal,
  siteVersion = "v2",
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

export function cardSurfaceClass(siteVersion: MicrositeVersionId = "v2", interactive = true) {
  if (siteVersion === "v2" && interactive) return "card-interactive";
  return "archun-card";
}
