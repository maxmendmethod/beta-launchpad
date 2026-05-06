import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About M3 — Coming Soon" },
      { name: "description", content: "About M3 — coming soon." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold uppercase">About M3</h1>
        <p className="mt-4 text-muted-foreground">Coming soon.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
