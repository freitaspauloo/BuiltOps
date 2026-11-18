import { Bed, Ruler, ShieldCheck, Wifi } from "lucide-react";
import { AccordionDemo } from "./accordion-demo";
import { CardShowcase } from "./card-showcase";
import { OverviewMetricsShowcase } from "./overview-metrics-showcase";
import { StageMatrix } from "./stage-toggle";
import { Button } from "@/components/ui/button";
import { LosaniLogo } from "@/components/ui/losani-logo";
import { Pill, PillGroup } from "@/components/ui/pill";
import { SectionIntro } from "@/components/ui/section-intro";
import { StatusLabel } from "@/components/ui/status-badge";

const nav = [
  { id: "overview", label: "Overview" },
  { id: "tokens", label: "Tokens" },
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors" },
  { id: "components", label: "Components" },
  { id: "v3-editorial", label: "v3 Editorial" },
  { id: "stage-lifecycle", label: "Stage lifecycle" },
  { id: "community-cards", label: "Community cards" },
  { id: "model-cards", label: "Model cards" },
  { id: "overview-sections", label: "Overview layouts" },
];

const colorGroups = [
  {
    label: "Canvas & surfaces",
    swatches: [
      { name: "Background", value: "#FFFFFF", var: "--color-background" },
      { name: "Surface", value: "#FFFFFF", var: "--color-surface" },
      { name: "Card / Fog", value: "#F4F7FB", var: "--color-card" },
      { name: "Mist", value: "#E8EDF5", var: "--color-mist" },
      { name: "Card label", value: "#DAE3EF", var: "--color-card-label" },
    ],
  },
  {
    label: "Ink & text",
    swatches: [
      { name: "Foreground", value: "#0C1417", var: "--color-foreground" },
      { name: "Body", value: "#5A5250", var: "--color-body" },
      { name: "Muted", value: "#8FA0B5", var: "--color-muted" },
      { name: "Emphasis", value: "#4A6282", var: "--color-emphasis" },
      { name: "Subtle", value: "#C5D0DE", var: "--color-subtle" },
    ],
  },
  {
    label: "Primary navy",
    swatches: [
      { name: "Primary", value: "#203A54", var: "--color-primary" },
      { name: "Primary hover", value: "#274866", var: "--color-primary-hover" },
      { name: "Primary light", value: "#315A7C", var: "--color-primary-light" },
      { name: "Primary muted", value: "#ECF0F6", var: "--color-primary-muted" },
      { name: "Nav", value: "#203A54", var: "--color-nav" },
    ],
  },
  {
    label: "Accents & ambient",
    swatches: [
      { name: "Accent orange", value: "#DB6A1D", var: "--color-accent" },
      { name: "Accent hover", value: "#C25E18", var: "--color-accent-hover" },
      { name: "Teal mid", value: "#5B7A9E", var: "--color-teal-mid" },
      { name: "Ambient top", value: "#8FA8C8", var: "--color-ambient-top" },
      { name: "Ambient bottom", value: "#DCE6F2", var: "--color-ambient-bottom" },
    ],
  },
  {
    label: "Borders & status",
    swatches: [
      { name: "Border", value: "#DFE6F0", var: "--color-border" },
      { name: "Border strong", value: "#0C1417", var: "--color-border-strong" },
      { name: "Status future", value: "#A1B2B4", var: "--color-status-future" },
      { name: "Status coming", value: "#DB6A1D", var: "--color-status-coming" },
      { name: "Status available", value: "#203A54", var: "--color-status-available" },
    ],
  },
];

const radii = [
  { name: "card", token: "--radius-card" },
  { name: "control", token: "--radius-control" },
  { name: "sm", token: "--radius-sm" },
  { name: "md", token: "--radius-md" },
  { name: "lg", token: "--radius-lg" },
  { name: "2xl", token: "--radius-2xl" },
  { name: "3xl", token: "--radius-3xl" },
];

const shadows = [
  { name: "card", token: "--shadow-card" },
  { name: "card-hover", token: "--shadow-card-hover" },
];

const spacing = [
  { name: "Section Y (mobile)", value: "5rem", w: 80 },
  { name: "Section Y (desktop)", value: "7rem", w: 112 },
  { name: "Gutter", value: "1.5rem", w: 24 },
  { name: "Hero frame inset", value: "30px", w: 30 },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="v3-section-label">{eyebrow}</p>
      <h2 className="headline-section-v3 text-balance">{title}</h2>
      <hr className="v3-hairline" aria-hidden />
    </div>
  );
}

function BrandPanelDemo() {
  return (
    <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden bg-primary">
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 15% 10%, rgba(143, 168, 200, 0.42) 0%, transparent 58%), radial-gradient(ellipse 75% 55% at 90% 95%, rgba(39, 72, 102, 0.65) 0%, transparent 52%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <LosaniLogo inverse className="h-12 w-auto sm:h-14" />
        <hr className="v3-hero-rule !my-6 !max-w-[9rem]" aria-hidden />
        <p className="max-w-[16rem] text-sm leading-relaxed text-white/75">
          Branded editorial panel — navy wash, grid texture, inverse logo.
        </p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background" data-microsite-version="v3">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="container-wide flex items-center justify-between px-6 py-4 md:px-10">
          <p className="text-base font-semibold">BuiltOps · Design System</p>
          <p className="text-sm text-muted">Microsite v3 · editorial</p>
        </div>
      </header>

      <div className="container-wide gap-12 px-6 md:px-10 lg:flex lg:gap-16">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28 py-16">
            <p className="v3-section-label mb-5">On this page</p>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="block px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-fog hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 flex-1 space-y-24 py-16">
          <section id="overview" className="max-w-3xl scroll-mt-28">
            <p className="v3-section-label mb-3">Losani Homes · BuiltOps</p>
            <h1 className="headline-section-v3">Design language reference</h1>
            <p className="v3-section-dek mt-5">
              Token, typography, and component reference for the v3 editorial microsite.
              Soft portal corners — <code className="text-xs">--radius-card</code> (16px) on
              cards/media; <code className="text-xs">--radius-control</code> (12px) on buttons,
              inputs, and pills. Not fully rounded.
              #F4F7FB cards, Instrument Serif display type, hairline dividers, and color accents
              on icons and CTAs only.
            </p>
            <hr className="v3-hairline mt-8" aria-hidden />
          </section>

          <section id="tokens" className="scroll-mt-28">
            <SectionTitle eyebrow="Foundations" title="Tokens" />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="card-surface p-7">
                <p className="v3-section-label mb-2">Border radius</p>
                <p className="mb-5 text-sm text-body">
                  Cards and media use{" "}
                  <strong className="font-semibold text-foreground">16px</strong> (
                  <code className="text-xs">--radius-card</code>). Buttons, inputs, and pills use{" "}
                  <strong className="font-semibold text-foreground">12px</strong> (
                  <code className="text-xs">--radius-control</code>).
                </p>
                <div className="flex flex-wrap items-end gap-5">
                  {radii.map((r) => (
                    <div key={r.name} className="text-center">
                      <div
                        className="mb-2 h-16 w-16 border border-border bg-fog"
                        style={{ borderRadius: `var(${r.token})` }}
                      />
                      <p className="text-xs font-medium">{r.name}</p>
                      <p className="font-mono text-[0.65rem] text-muted">{r.token}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-surface p-7">
                <p className="v3-section-label mb-5">Elevation</p>
                <div className="flex flex-wrap items-center gap-6">
                  {shadows.map((s) => (
                    <div key={s.name} className="text-center">
                      <div
                        className="mb-2 h-16 w-16 border border-border bg-fog"
                        style={{ boxShadow: `var(${s.token})` }}
                      />
                      <p className="font-mono text-[0.65rem] text-muted">{s.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-surface mt-8 p-7">
              <p className="v3-section-label mb-6">Spacing scale</p>
              <div className="space-y-4">
                {spacing.map((s) => (
                  <div key={s.name} className="flex items-center gap-4">
                    <div className="h-3 bg-primary" style={{ width: s.w }} />
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="typography" className="scroll-mt-28">
            <SectionTitle eyebrow="Voice" title="Typography" />
            <div className="card-surface space-y-10 p-8">
              <div>
                <p className="v3-section-label mb-2">Display · Instrument Serif</p>
                <p className="font-display text-5xl font-medium tracking-tight text-foreground md:text-6xl">
                  Editorial display
                </p>
                <p className="mt-2 text-sm text-muted">`.font-display` · hero and large titles</p>
              </div>
              <div className="border-t border-border pt-8">
                <p className="v3-section-label mb-2">Section headline · v3</p>
                <p className="headline-section-v3">Section title scale</p>
                <p className="mt-2 text-sm text-muted">
                  `.headline-section-v3` · clamp(2.25rem → 4.75rem)
                </p>
              </div>
              <div className="border-t border-border pt-8">
                <p className="v3-section-label mb-2">Section headline · legacy</p>
                <p className="headline-section">Legacy section title</p>
                <p className="mt-2 text-sm text-muted">`.headline-section` · v1/v2 modules</p>
              </div>
              <div className="border-t border-border pt-8">
                <p className="v3-section-label mb-4">Labels & eyebrows</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="v3-section-label !mb-0">v3 section label</span>
                  <span className="eyebrow !mb-0">v2 eyebrow pill</span>
                  <span className="card-label !mb-0">Card label</span>
                  <span className="hero-eyebrow bg-primary px-3.5 py-1.5">Hero eyebrow</span>
                </div>
              </div>
              <div className="border-t border-border pt-8">
                <p className="v3-section-label mb-2">Body copy</p>
                <p className="prose-editorial max-w-2xl">
                  Inter for UI and body text. Muted labels, body color for paragraphs, emphasis
                  blue for links and highlights. Selection uses primary-muted background.
                </p>
              </div>
            </div>
          </section>

          <section id="colors" className="scroll-mt-28">
            <SectionTitle eyebrow="Palette" title="Colors" />
            <div className="space-y-10">
              {colorGroups.map((group) => (
                <div key={group.label}>
                  <p className="v3-section-label mb-4">{group.label}</p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {group.swatches.map((c) => (
                      <div key={c.var} className="card-surface overflow-hidden">
                        <div className="h-20 border-b border-border" style={{ background: c.value }} />
                        <div className="p-4">
                          <p className="text-sm font-semibold">{c.name}</p>
                          <p className="text-xs text-muted">{c.value}</p>
                          <p className="mt-1 font-mono text-[0.65rem] text-muted">{c.var}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="components" className="scroll-mt-28">
            <SectionTitle eyebrow="Building blocks" title="Components" />
            <div className="space-y-8">
              <div className="card-surface p-8">
                <p className="v3-section-label mb-6">Buttons</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button>Medium</Button>
                  <Button size="lg">Large CTA</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <span className="inline-flex bg-primary px-4 py-3">
                    <Button variant="hero">Hero on photo</Button>
                  </span>
                </div>
              </div>

              <div className="card-surface p-8">
                <p className="v3-section-label mb-6">Pills</p>
                <PillGroup>
                  <Pill icon={Bed}>3 beds</Pill>
                  <Pill icon={Ruler}>2,115 sqft</Pill>
                  <Pill icon={Wifi}>Smart home ready</Pill>
                  <Pill icon={ShieldCheck}>Tarion warranty</Pill>
                </PillGroup>
                <PillGroup size="sm" className="mt-4">
                  <Pill size="sm" icon={Bed}>
                    Small pill
                  </Pill>
                </PillGroup>
              </div>

              <div className="card-surface p-8">
                <p className="v3-section-label mb-6">Status labels</p>
                <div className="flex flex-wrap gap-6">
                  <StatusLabel stage="future" />
                  <StatusLabel stage="coming_soon" />
                  <StatusLabel stage="available" />
                </div>
              </div>

              <div className="card-surface p-8">
                <p className="v3-section-label mb-6">Section intro & hairline</p>
                <SectionIntro
                  label="Module label"
                  title="SectionIntro component"
                  description="v3 editorial header with muted label, display headline, optional dek, and hairline rule."
                />
              </div>

              <div className="card-surface p-8">
                <p className="v3-section-label mb-6">Cards</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="card-surface p-6">
                    <p className="card-label">card-surface</p>
                    <p className="text-sm text-body">Flat #F4F7FB — no border, no shadow.</p>
                  </div>
                  <button
                    type="button"
                    className="card-interactive p-6 text-left"
                  >
                    <p className="card-label">card-interactive</p>
                    <p className="text-sm text-body">Hover shifts to mist; focus ring on primary.</p>
                  </button>
                </div>
              </div>

              <div className="card-surface p-8">
                <p className="v3-section-label mb-6">Accordion · v3 icon treatment</p>
                <AccordionDemo />
              </div>

              <div className="card-surface p-8">
                <p className="v3-section-label mb-6">Brand panel</p>
                <BrandPanelDemo />
              </div>
            </div>
          </section>

          <section id="v3-editorial" className="scroll-mt-28">
            <SectionTitle eyebrow="Microsite version" title="v3 editorial" />
            <div className="card-surface space-y-6 p-8">
              <p className="text-base leading-relaxed text-body">
                v3 styles are scoped under{" "}
                <code className="bg-fog px-1.5 py-0.5 font-mono text-xs">data-microsite-version=&quot;v3&quot;</code>.
                This page uses that scope so tokens and components render as they do on live v3
                microsites.
              </p>
              <ul className="space-y-2 text-sm text-body">
                <li>Hairline dividers (`.v3-hairline`) instead of heavy section chrome</li>
                <li>Open white canvas with whitespace over bordered cards</li>
                <li>Muted text labels + Instrument Serif headlines</li>
                <li>Color accents on icons, CTAs, and status — not full-bleed fills</li>
                <li>Soft portal radius — 16px cards, 12px controls (not pill-shaped)</li>
              </ul>
              <p className="text-sm text-muted">
                v1 and v2 section trees are frozen snapshots — extend v3 root sections only.
              </p>
            </div>
          </section>

          <section id="stage-lifecycle" className="scroll-mt-28">
            <SectionTitle eyebrow="Lifecycle" title="Stage matrix" />
            <p className="mb-8 max-w-2xl text-muted">
              Community release stage controls which section modules appear. Reference only —
              no embedded microsite preview.
            </p>
            <StageMatrix />
          </section>

          <CardShowcase />

          <section id="overview-sections" className="scroll-mt-28">
            <SectionTitle eyebrow="v5 microsite" title="Overview layouts" />
            <p className="mb-8 max-w-2xl text-muted">
              Four introduction-led overview layouts with outline stat pills — same content,
              different composition. Split grid is live on the community page.
            </p>
            <OverviewMetricsShowcase />
          </section>
        </div>
      </div>
    </div>
  );
}
