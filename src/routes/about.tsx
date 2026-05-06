import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAButton } from "@/components/CTAButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Brand" },
      { name: "description", content: "Who we are and why we're building this." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">About</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Built by people who needed it first.</h1>

        <div className="mt-10 aspect-video rounded-3xl bg-gradient-to-br from-accent/30 via-card to-primary/20" />
        <p className="mt-3 text-center text-xs text-muted-foreground">Founder video — placeholder</p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>Placeholder founder story. We were the customer first.</p>
          <p>
            We've spent years (placeholder) chasing the same outcomes our customers chase. We
            tried what was on the shelves, we read the studies, we asked the questions nobody
            wanted to answer. None of it worked the way it was sold.
          </p>
          <p>So we built this. Then we gave it to a small group of friends. Then they told their friends.</p>
          <p>That's the whole story. The rest is the work.</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {["Founder One", "Founder Two"].map((name) => (
            <div key={name} className="rounded-2xl border border-border bg-card p-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-accent to-primary" />
              <h3 className="mt-4 font-display text-2xl">{name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Role placeholder</p>
              <p className="mt-3 text-sm text-muted-foreground">Short bio placeholder — what they do, why they care.</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <CTAButton>Be part of the first batch</CTAButton>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
