import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";

export const metadata: Metadata = {
  title: "About M3",
  description:
    "About Max Mend Method (M3) — a rotating supplement protocol designed to optimize nutrient absorption, recovery, hydration, and performance with science-backed daily packets.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About M3",
    description:
      "About Max Mend Method (M3) — a rotating supplement protocol designed to optimize nutrient absorption, recovery, hydration, and performance with science-backed daily packets.",
    url: "https://www.maxmendmethod.com/about",
  },
};

export default function AboutPage() {
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
