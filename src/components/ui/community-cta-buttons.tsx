import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type CtaLink = { label: string; href: string };

const sizeStyles = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
} as const;

export function CommunityCtaButtons({
  primaryCta,
  secondaryCta,
  size = "md",
  tone = "light",
  className,
  secondaryClassName,
  onNavigate,
}: {
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  size?: keyof typeof sizeStyles;
  tone?: "light" | "onPrimary" | "onImage";
  className?: string;
  secondaryClassName?: string;
  onNavigate?: () => void;
}) {
  const pad = sizeStyles[size];

  const primaryClass =
    tone === "light"
      ? cn(
          "inline-flex items-center font-semibold transition-colors bg-primary text-white hover:bg-primary-hover",
          pad,
        )
      : tone === "onImage"
        ? cn(
            "inline-flex items-center font-semibold transition-colors bg-white text-foreground hover:bg-white/90",
            pad,
          )
        : cn(
            "inline-flex items-center font-semibold transition-colors bg-white text-foreground hover:bg-white/90",
            pad,
          );

  const secondaryBase =
    tone === "light"
      ? "inline-flex items-center font-semibold transition-colors border border-border bg-surface text-foreground hover:bg-fog"
      : tone === "onImage"
        ? "inline-flex items-center font-semibold transition-colors border border-white/70 bg-transparent text-white hover:border-white hover:text-white"
        : "inline-flex items-center font-semibold transition-colors border border-white/70 bg-white text-foreground hover:bg-white/90";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Link href={primaryCta.href} onClick={onNavigate} className={primaryClass}>
        {primaryCta.label}
      </Link>
      {secondaryCta && (
        <Link
          href={secondaryCta.href}
          onClick={onNavigate}
          className={cn(secondaryBase, pad, secondaryClassName)}
        >
          {secondaryCta.label}
        </Link>
      )}
    </div>
  );
}
