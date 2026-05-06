import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAButton } from "@/components/CTAButton";

export const Route = createFileRoute("/science")({
  head: () => ({
    meta: [
      { title: "The Science — Brand" },
      { name: "description", content: "How and why our approach to nutrient timing works." },
    ],
  }),
  component: SciencePage,
});

const sections = [
  { title: "The problem with how it's done today", body: "Placeholder — short framing of why current approaches miss the mark." },
  { title: "The mechanism, in plain English", body: "Placeholder — the one or two ideas that make this work, no jargon." },
  { title: "What the research says", body: "Placeholder — studies we're standing on, with sources." },
  { title: "Nutrient Schedule Grid (coming soon)", body: "Predictive grid placeholder." },
  { title: "Interaction Map + Sources (coming soon)", body: "Visual map placeholder with citations." },
];

function SciencePage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold">The Science</h1>
        <p className="mt-3 text-muted-foreground">Why this actually works — plain language, plus a predictive Nutrient Schedule Grid.</p>

        <div className="mt-8 space-y-6">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold">{s.title}</h2>
              <p className="mt-1 text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10"><CTAButton>Try it free in the beta</CTAButton></div>
      </main>
      <SiteFooter />
    </div>
  );
}
