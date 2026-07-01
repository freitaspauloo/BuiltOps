import Link from "next/link";
import { Bed, Ruler, ShieldCheck, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pill, PillGroup } from "@/components/ui/pill";
import { StatusLabel } from "@/components/ui/status-badge";
import { StageToggle } from "./stage-toggle";

const nav = [
  { id: "tokens", label: "Tokens" },
  { id: "typography", label: "Typography" },
  { id: "colors", label: "Colors" },
  { id: "components", label: "Components" },
  { id: "sections", label: "Sections" },
  { id: "stage-matrix", label: "Stage & Preview" },
];

const colors = [
  { name: "Canvas", value: "#FFFFFF", var: "--color-background" },
  { name: "Surface", value: "#FFFFFF", var: "--color-surface" },
  { name: "Card", value: "#F6F6F6", var: "--color-card" },
  { name: "Fog", value: "#F6F6F6", var: "--color-fog" },
  { name: "Ink", value: "#0C1417", var: "--color-foreground" },
  { name: "Body", value: "#5A5250", var: "--color-body" },
  { name: "Emphasis", value: "#486268", var: "--color-emphasis" },
  { name: "Muted", value: "#A1B2B4", var: "--color-muted" },
  { name: "Tide Blue (Primary)", value: "#002934", var: "--color-primary" },
  { name: "Tide Blue Light", value: "#004556", var: "--color-primary-light" },
  { name: "Tide Blue Muted", value: "#E8EEF0", var: "--color-primary-muted" },
  { name: "Teal Mid", value: "#4895A2", var: "--color-teal-mid" },
  { name: "Nav Cyan", value: "#1BA1B7", var: "--color-nav" },
  { name: "Ambient Top", value: "#58BBCA", var: "--color-ambient-top" },
  { name: "Ambient Bottom", value: "#B8E2E8", var: "--color-ambient-bottom" },
  { name: "Accent Orange", value: "#DB6A1D", var: "--color-accent" },
  { name: "Hero frame inset", value: "30px", var: "--hero-frame-inset" },
];

const radii = [
  { name: "sm", value: "0" },
  { name: "lg", value: "0" },
  { name: "2xl", value: "0" },
  { name: "3xl", value: "0" },
];

const shadows = [
  { name: "card", token: "--shadow-card" },
  { name: "card-hover", token: "--shadow-card-hover" },
];

const spacing = [
  { name: "Section Y (mobile)", value: "5rem", w: 80 },
  { name: "Section Y (desktop)", value: "7rem", w: 112 },
  { name: "Gutter", value: "1.5rem", w: 24 },
  { name: "Block gap", value: "5rem", w: 80 },
];

const sections = [
  "Hero", "Sticky Nav", "Overview", "Vision", "Quick Facts",
  "Sales Office", "Promotions", "Quick Move-In", "Floorplans", "Site Plan", "Video",
  "Gallery", "Area Map", "Lifestyle / Amenities", "Community Features", "Downloads",
  "Timeline", "Design Centre", "Testimonials", "Events", "FAQ", "Registration", "Similar Communities",
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

export default function DesignHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="container-wide flex items-center justify-between px-6 py-4 md:px-10">
          <p className="text-base font-semibold">Losani Homes · Design Hub</p>
          <nav className="flex gap-3">
            <Button size="sm" variant="secondary" href="/communities/benchmark">
              View Demo
            </Button>
            <Button
              size="sm"
              variant="ghost"
              href="http://localhost:3333"
              target="_blank"
              rel="noreferrer"
            >
              CMS Studio
            </Button>
          </nav>
        </div>
      </header>

      <div className="container-wide gap-12 px-6 md:px-10 lg:flex lg:gap-16">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28 py-16">
            <p className="eyebrow mb-5">Design System</p>
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

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-24 py-16">
          {/* Intro */}
          <section className="max-w-3xl">
            <p className="eyebrow mb-3">ARCHUN-inspired · Losani</p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              BuiltOps design language
            </h1>
            <p className="prose-editorial mt-5 max-w-2xl">
              ARCHUN base system with a framed hero (30px ambient gutter), soft teal page glow,
              Instrument Serif display type, unified section headers, scroll reveals on every module,
              sharp corners (0 radius), and flat #F6F6F6 cards. Benchmark ships as microsite v2.
            </p>
          </section>

          {/* Tokens */}
          <section id="tokens" className="scroll-mt-28">
            <SectionTitle eyebrow="Foundations" title="Tokens" />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="card-surface p-7">
                <p className="eyebrow mb-5">Radius</p>
                <div className="flex items-end gap-5">
                  {radii.map((r) => (
                    <div key={r.name} className="text-center">
                      <div
                        className="mb-2 h-16 w-16 border border-border bg-fog"
                        style={{ borderRadius: r.value }}
                      />
                      <p className="text-xs font-medium">{r.name}</p>
                      <p className="text-[0.65rem] text-muted">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-surface p-7">
                <p className="eyebrow mb-5">Elevation</p>
                <div className="flex flex-wrap items-center gap-6">
                  {shadows.map((s) => (
                    <div key={s.name} className="text-center">
                      <div
                        className="mb-2 h-16 w-16 border border-border bg-fog"
                        style={{ boxShadow: `var(${s.token})` }}
                      />
                      <p className="text-[0.65rem] text-muted">{s.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-surface mt-8 p-7">
              <p className="eyebrow mb-6">Spacing Scale</p>
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

          {/* Typography */}
          <section id="typography" className="scroll-mt-28">
            <SectionTitle eyebrow="Voice" title="Typography" />
            <div className="card-surface space-y-8 p-8">
              <div>
                <p className="eyebrow mb-2">Hero title</p>
                <p className="font-display text-5xl font-medium tracking-tight text-foreground md:text-6xl">
                  Benchmark Towns
                </p>
                <p className="mt-2 text-sm text-muted">
                  Instrument Serif — display scale over photography; Inter for UI and body
                </p>
              </div>
              <div className="border-t border-border pt-8">
                <p className="eyebrow mb-2">Section heading</p>
                <p className="headline-section text-3xl md:text-4xl">Home designs</p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
                  Instrument Serif for section titles; teal eyebrow pills; Inter for body copy.
                  ScrollReveal wraps every SectionShell by default (respects prefers-reduced-motion).
                </p>
              </div>
            </div>
          </section>

          {/* Colors */}
          <section id="colors" className="scroll-mt-28">
            <SectionTitle eyebrow="Palette" title="Colors" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {colors.map((c) => (
                <div key={c.name} className="card-surface overflow-hidden">
                  <div className="h-24" style={{ background: c.value }} />
                  <div className="p-4">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-muted">{c.value}</p>
                    <p className="mt-1 font-mono text-[0.65rem] text-muted">{c.var}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Components */}
          <section id="components" className="scroll-mt-28">
            <SectionTitle eyebrow="Building Blocks" title="Components" />
            <div className="space-y-8">
              <div className="card-surface p-8">
                <p className="eyebrow mb-6">Buttons</p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button>Medium</Button>
                  <Button size="lg">Large CTA</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>
              <div className="card-surface p-8">
                <p className="eyebrow mb-6">Pills</p>
                <PillGroup>
                  <Pill icon={Bed}>3 beds</Pill>
                  <Pill icon={Ruler}>2,115 sqft</Pill>
                  <Pill icon={Wifi}>Smart home ready</Pill>
                  <Pill icon={ShieldCheck}>Tarion warranty</Pill>
                </PillGroup>
              </div>
              <div className="card-surface p-8">
                <p className="eyebrow mb-6">Status labels</p>
                <div className="flex flex-wrap gap-6">
                  <StatusLabel stage="future" />
                  <StatusLabel stage="coming_soon" />
                  <StatusLabel stage="available" />
                </div>
              </div>
            </div>
          </section>

          {/* Sections */}
          <section id="sections" className="scroll-mt-28">
            <SectionTitle eyebrow="Modular Blocks" title={`All Sections (${sections.length})`} />
            <p className="mb-8 max-w-2xl text-muted">
              Every module from the spec — required, optional, and stage-gated — composed
              dynamically per community release.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((s, i) => (
                <Link
                  key={s}
                  href="/communities/benchmark"
                  className="flex items-center gap-3 border border-border bg-background px-4 py-3 text-sm transition-colors hover:bg-fog"
                >
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s}
                </Link>
              ))}
            </div>
          </section>

          {/* Stage Matrix */}
          <section id="stage-matrix" className="scroll-mt-28">
            <SectionTitle eyebrow="Lifecycle" title="Stage Matrix & Live Preview — Benchmark · v2" />
            <p className="mb-8 max-w-2xl text-muted">
              A community&apos;s release stage drives which sections appear. Toggle below to
              preview each state — the live page updates with filtered sections from seed data.
            </p>
            <StageToggle showPreview />
          </section>
        </div>
      </div>
    </div>
  );
}
