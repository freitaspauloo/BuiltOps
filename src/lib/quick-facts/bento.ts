import type { QuickFacts } from "@/lib/types/community";

export function normalizeFactKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

const BENTO_ORDER = ["size", "bedrooms", "bathrooms", "homes", "starting_price", "collections"];

export function sortFactsForBento(facts: NonNullable<QuickFacts["facts"]>) {
  return [...facts].sort((a, b) => {
    const ai = BENTO_ORDER.indexOf(normalizeFactKey(a.label));
    const bi = BENTO_ORDER.indexOf(normalizeFactKey(b.label));
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

export function getFactByKey(
  facts: NonNullable<QuickFacts["facts"]>,
  key: string,
) {
  return facts.find((fact) => normalizeFactKey(fact.label) === key);
}

export function getBentoSpan(label: string) {
  const key = normalizeFactKey(label);
  if (key === "size" || key === "area" || key === "collections") {
    return "col-span-2";
  }
  return "";
}
