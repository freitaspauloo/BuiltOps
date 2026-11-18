"use client";

import { MetricTickerValue } from "@/components/motion/metric-ticker-value";
import { cn } from "@/lib/utils/cn";

export function MetricCell({
  value,
  label,
  long = false,
  countSpeed = "default",
}: {
  value: string;
  label: string;
  long?: boolean;
  countSpeed?: "default" | "fast";
}) {
  return (
    <div className="metrics-editorial-cell">
      <p
        className={cn(
          "metrics-editorial-value",
          long && "metrics-editorial-value--long",
        )}
      >
        <MetricTickerValue value={value} countSpeed={countSpeed} />
      </p>
      <p className="metrics-editorial-label">{label}</p>
    </div>
  );
}
