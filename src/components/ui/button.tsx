import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "hero" | "outline" | "outline-on-image";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "min-h-10 px-5 py-2 text-sm",
  md: "min-h-11 px-6 py-2.5 text-sm",
  lg: "min-h-12 px-8 py-3.5 text-base",
};

export { sizeStyles as buttonSizeStyles };

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  target,
  rel,
  onClick,
  ...props
}: ButtonProps) {
  const styles = cn(
    "control-radius inline-flex items-center justify-center overflow-hidden font-semibold transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    sizeStyles[size],
    // Primary — Losani navy gradient (portal cards)
    variant === "primary" && "cta-primary-gradient",
    // Secondary light-grey fill
    variant === "secondary" && "bg-fog text-foreground hover:bg-mist",
    // Hero: white button on photography
    variant === "hero" && "border border-transparent bg-white text-foreground hover:bg-white/90",
    // Outline secondary on light surfaces
    variant === "outline" &&
      "border border-border bg-surface text-foreground hover:bg-fog",
    // Solid low-opacity secondary on hero photography
    variant === "outline-on-image" &&
      "border border-transparent bg-white/12 text-white hover:bg-white/20",
    // Ghost: bare text link
    variant === "ghost" &&
      "font-medium text-foreground underline-offset-4 hover:underline",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={styles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
