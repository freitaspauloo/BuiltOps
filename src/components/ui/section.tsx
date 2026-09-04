import { ScrollReveal } from "@/components/motion/scroll-reveal";
import type { MicrositeVersionId } from "@/lib/site-versions";
import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

/**
 * The one section header on the site. Every section — with or without an
 * aside — renders this markup so eyebrow, headline, dek and the gap down to
 * the section body stay on a single rhythm.
 */
function SectionHeaderBase({
  eyebrow,
  title,
  description,
  aside,
  className,
}: SectionHeaderProps & { aside?: React.ReactNode }) {
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
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            {description}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

export function SectionHeading(props: SectionHeaderProps) {
  return <SectionHeaderBase {...props} />;
}

export function SectionHeaderSplit({
  aside,
  siteVersion = "v2",
  ...props
}: SectionHeaderProps & {
  aside?: React.ReactNode;
  siteVersion?: MicrositeVersionId;
}) {
  return <SectionHeaderBase {...props} aside={siteVersion === "v1" ? undefined : aside} />;
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
      <div className="page-bounds min-w-0">{inner}</div>
    </section>
  );
}

export function cardSurfaceClass(siteVersion: MicrositeVersionId = "v2", interactive = true) {
  if (siteVersion === "v2" && interactive) return "card-interactive";
  return "card-surface";
}
