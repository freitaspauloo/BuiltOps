import { cn } from "@/lib/utils/cn";

const LOGO_SRC = "/losani-logo.svg";

export function LosaniLogo({
  href = "#hero",
  className,
  inverse,
}: {
  href?: string;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <a href={href} className="inline-flex shrink-0" aria-label="Losani Homes">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt=""
        className={cn(
          "h-7 w-auto sm:h-8",
          inverse && "brightness-0 invert",
          className,
        )}
      />
    </a>
  );
}
