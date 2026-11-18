import * as React from "react";

import { cn } from "@/lib/utils";
import {
  formControlClass,
  formControlElevatedClass,
} from "@/components/ui/input";

function Textarea({
  className,
  tone = "default",
  ...props
}: React.ComponentProps<"textarea"> & { tone?: "default" | "elevated" }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-[7.5rem] resize-y py-3",
        tone === "elevated" ? formControlElevatedClass : formControlClass,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
