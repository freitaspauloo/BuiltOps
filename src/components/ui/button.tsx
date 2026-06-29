import { cn } from "@/lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "hero";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  target,
  rel,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-none font-semibold transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    sizeStyles[size],
    // Primary teal pill
    variant === "primary" && "bg-primary text-white hover:bg-primary-hover",
    // Secondary light-grey fill
    variant === "secondary" && "bg-fog text-foreground hover:bg-mist",
    // Hero: white pill on photography
    variant === "hero" && "bg-white text-foreground hover:bg-white/90",
    // Ghost: bare text link
    variant === "ghost" &&
      "font-medium text-foreground underline-offset-4 hover:underline",
    className,
  );

  if (href) {
    return (
      <a href={href} className={styles} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
