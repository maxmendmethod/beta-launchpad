import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAButton } from "@/components/CTAButton";

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "The Science — Brand" },
      { name: "description", content: "How and why our approach to nutrient timing actually works." },
    ],
  }),
  component: SciencePage,
});

function SciencePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">The Science</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Why this actually works.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Placeholder explanation of the science. This page will eventually hold a clear,
          plain-language breakdown — plus the predictive Nutrient Schedule Grid and the
          Interaction Map with sources.
        </p>

        <div className="mt-12 space-y-8">
          {[
            { title: "The problem with how it's done today", body: "Placeholder — a short framing of why current approaches miss the mark." },
            { title: "The mechanism, in plain English", body: "Placeholder — the one or two ideas that make this work, explained without jargon." },
            { title: "What the research says", body: "Placeholder — the studies we're standing on, with sources." },
            { title: "Nutrient Schedule Grid (coming soon)", body: "Predictive grid placeholder. We'll wire this up once the data is locked in." },
            { title: "Interaction Map + Sources (coming soon)", body: "Visual map placeholder showing how nutrients interact, with citations." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CTAButton>Try it free in the beta</CTAButton>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
