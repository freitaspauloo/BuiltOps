import * as React from "react";

import { cn } from "@/lib/utils";

const formControlBase =
  "w-full rounded-[var(--radius-control)] border px-4 text-sm text-foreground shadow-none transition-[color,box-shadow,border-color] placeholder:text-muted focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-accent aria-invalid:ring-2 aria-invalid:ring-accent/20 md:text-sm";

export const formControlClass = cn(
  formControlBase,
  "border-border bg-background py-2.5 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15",
);

/** Inputs on grey card surfaces — white fill reads cleaner than card-on-card. */
export const formControlElevatedClass = cn(
  formControlBase,
  "border-border/80 bg-white py-3 shadow-[inset_0_1px_2px_rgba(12,20,23,0.04)] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
);

function Input({
  className,
  type,
  tone = "default",
  ...props
}: React.ComponentProps<"input"> & { tone?: "default" | "elevated" }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 min-w-0",
        tone === "elevated" ? formControlElevatedClass : formControlClass,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
