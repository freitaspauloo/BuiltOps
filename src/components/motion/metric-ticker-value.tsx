"use client";

import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { cn } from "@/lib/utils/cn";
import type { SpringOptions } from "motion/react";

const COUNTING_SPRING = { stiffness: 90, damping: 50 } as const satisfies SpringOptions;
const COUNTING_SPRING_FAST = { stiffness: 220, damping: 36 } as const satisfies SpringOptions;

type ParsedMetric =
  | { type: "text"; text: string }
  | {
      type: "number";
      value: number;
      prefix?: string;
      suffix?: string;
      locale?: boolean;
    }
  | {
      type: "range";
      start: number;
      end: number;
      prefix?: string;
      suffix?: string;
      locale?: boolean;
      separator: string;
    };

function parseNumberToken(token: string): number | null {
  const normalized = token.replace(/,/g, "").trim();
  if (!normalized || !/^\d+(\.\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function parseMetricValue(value: string): ParsedMetric {
  const trimmed = value.trim();

  const currencyMatch = trimmed.match(/^\$([\d,]+(?:\.\d+)?)$/);
  if (currencyMatch) {
    const amount = parseNumberToken(currencyMatch[1]);
    if (amount != null) {
      return { type: "number", value: amount, prefix: "$", locale: true };
    }
  }

  const rangeMatch = trimmed.match(/^(.+?)\s*([–-])\s*(.+)$/);
  if (rangeMatch) {
    const [, left, separator, right] = rangeMatch;
    const rightParts = right.match(/^([\d,.]+)(.*)$/);
    if (rightParts) {
      const start = parseNumberToken(left);
      const end = parseNumberToken(rightParts[1]);
      const suffix = rightParts[2] || undefined;
      const leftHasDecimals = left.includes(".");
      const rightHasDecimals = rightParts[1].includes(".");

      if (
        start != null &&
        end != null &&
        !leftHasDecimals &&
        !rightHasDecimals &&
        Number.isInteger(start) &&
        Number.isInteger(end)
      ) {
        return {
          type: "range",
          start,
          end,
          suffix,
          locale: left.includes(",") || rightParts[1].includes(","),
          separator: ` ${separator} `,
        };
      }
    }
  }

  const integer = parseNumberToken(trimmed);
  if (integer != null && Number.isInteger(integer) && !trimmed.includes(".")) {
    return { type: "number", value: integer };
  }

  return { type: "text", text: trimmed };
}

function AnimatedCount({
  value,
  locale,
  className,
  transition = COUNTING_SPRING,
}: {
  value: number;
  locale?: boolean;
  className?: string;
  transition?: SpringOptions;
}) {
  return (
    <CountingNumber
      number={value}
      locale={locale}
      inView
      inViewOnce
      inViewMargin="-10% 0px"
      transition={transition}
      className={cn("tabular-nums", className)}
    />
  );
}

export function MetricTickerValue({
  value,
  className,
  countSpeed = "default",
}: {
  value: string;
  className?: string;
  countSpeed?: "default" | "fast";
}) {
  const parsed = parseMetricValue(value);
  const transition = countSpeed === "fast" ? COUNTING_SPRING_FAST : COUNTING_SPRING;

  if (parsed.type === "text") {
    return <span className={className}>{parsed.text}</span>;
  }

  if (parsed.type === "number") {
    return (
      <span className={cn("inline-flex items-baseline tabular-nums", className)}>
        {parsed.prefix ? <span>{parsed.prefix}</span> : null}
        <AnimatedCount value={parsed.value} locale={parsed.locale} transition={transition} />
        {parsed.suffix ? <span>{parsed.suffix}</span> : null}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-0 tabular-nums", className)}>
      {parsed.prefix ? <span>{parsed.prefix}</span> : null}
      <AnimatedCount value={parsed.start} locale={parsed.locale} transition={transition} />
      <span>{parsed.separator}</span>
      <AnimatedCount value={parsed.end} locale={parsed.locale} transition={transition} />
      {parsed.suffix ? <span>{parsed.suffix}</span> : null}
    </span>
  );
}
