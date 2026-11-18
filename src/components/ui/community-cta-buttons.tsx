import type { DownloadAsset } from "@/lib/types/community";
import { BrochureDropdown } from "@/components/ui/brochure-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type CtaLink = { label: string; href: string };

export function CommunityCtaButtons({
  primaryCta,
  secondaryCta,
  downloads,
  menuPlacement = "bottom",
  size = "md",
  tone = "light",
  className,
  secondaryClassName,
  onNavigate,
}: {
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  downloads?: DownloadAsset[];
  menuPlacement?: "top" | "bottom";
  size?: "sm" | "md";
  tone?: "light" | "onPrimary" | "onImage";
  className?: string;
  secondaryClassName?: string;
  onNavigate?: () => void;
}) {
  const primaryVariant = tone === "light" ? "primary" : "hero";
  const secondaryVariant =
    tone === "light" ? "outline" : tone === "onImage" ? "outline-on-image" : "outline-on-image";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Button
        href={primaryCta.href}
        variant={primaryVariant}
        size={size}
        onClick={onNavigate}
      >
        {primaryCta.label}
      </Button>
      {secondaryCta &&
        (downloads && downloads.length > 0 ? (
          <BrochureDropdown
            label={secondaryCta.label}
            downloads={downloads}
            tone={tone}
            size={size}
            menuPlacement={menuPlacement}
            className={secondaryClassName}
            onNavigate={onNavigate}
          />
        ) : (
          <Button
            href={secondaryCta.href}
            variant={secondaryVariant}
            size={size}
            className={secondaryClassName}
            onClick={onNavigate}
          >
            {secondaryCta.label}
          </Button>
        ))}
    </div>
  );
}
