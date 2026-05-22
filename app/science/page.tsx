import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";

export const metadata: Metadata = {
  title: "Core Principles",
  description:
    "The science behind Max Mend Method — nutrient absorption, interactions, and timing rules that shape the M3 rotating supplement protocol.",
  alternates: { canonical: "/science" },
  openGraph: {
    title: "Core Principles",
    description:
      "The science behind Max Mend Method — nutrient absorption, interactions, and timing rules that shape the M3 rotating supplement protocol.",
    url: "https://www.maxmendmethod.com/science",
  },
};

export default function SciencePage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold uppercase">Core Principles</h1>
        <p className="mt-4 text-muted-foreground">Coming soon.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
