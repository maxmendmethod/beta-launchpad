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
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold">About</h1>
        <p className="mt-3 text-muted-foreground">Built by people who needed it first.</p>

        <div className="mt-8 space-y-4 text-muted-foreground">
          <p>Placeholder founder story. We were the customer first.</p>
          <p>We tried what was on the shelves, read the studies, asked the questions nobody wanted to answer. None of it worked the way it was sold.</p>
          <p>So we built this. Then we gave it to a small group of friends. Then they told their friends.</p>
          <p>That's the whole story. The rest is the work.</p>
        </div>

        <h2 className="mt-10 text-xl font-bold">The team</h2>
        <ul className="mt-3 space-y-3 text-muted-foreground">
          <li><strong className="text-foreground">Founder One</strong> — role placeholder. Short bio placeholder.</li>
          <li><strong className="text-foreground">Founder Two</strong> — role placeholder. Short bio placeholder.</li>
        </ul>

        <div className="mt-10"><CTAButton>Be part of the first batch</CTAButton></div>
      </main>
      <SiteFooter />
    </div>
  );
}
