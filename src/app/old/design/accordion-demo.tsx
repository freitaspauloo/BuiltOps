"use client";

import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function AccordionIcon() {
  return (
    <span className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-accent/35 text-accent">
      <Plus
        strokeWidth={1.5}
        className="absolute size-3.5 transition-all duration-200 ease-out group-data-[state=open]:rotate-90 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0"
        aria-hidden
      />
      <Minus
        strokeWidth={1.5}
        className="absolute size-3.5 rotate-90 scale-75 opacity-0 transition-all duration-200 ease-out group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100"
        aria-hidden
      />
    </span>
  );
}

const items = [
  {
    id: "deposit",
    question: "What is the deposit structure?",
    answer:
      "Deposits are staged across signing, frame, and closing milestones. Exact amounts vary by home type and release phase.",
  },
  {
    id: "closing",
    question: "When is the estimated closing date?",
    answer:
      "Closing windows are published per phase and updated as construction milestones are confirmed.",
  },
];

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue={items[0].id} className="border-t border-border">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-base leading-snug sm:text-lg">
            <AccordionIcon />
            <span className="pt-1">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="pl-12 pr-2 text-sm leading-relaxed text-body sm:text-base">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
