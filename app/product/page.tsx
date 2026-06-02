import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { ProductClient } from "./ProductClient";

export const metadata: Metadata = {
  title: "The M3 Protocol — Max Mend Method",
  description:
    "A 30-day rotating supplement protocol designed around nutrient absorption dynamics, interaction management, and real-world results. Built for people who want their supplements to actually work.",
  alternates: { canonical: "https://www.maxmendmethod.com/product" },
  openGraph: {
    title: "The M3 Protocol — Max Mend Method",
    description:
      "A 30-day rotating supplement protocol designed around nutrient absorption dynamics, interaction management, and real-world results.",
    url: "https://www.maxmendmethod.com/product",
  },
};

export default function ProductPage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main>
        <ProductClient />
        <section className="border-t border-border bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <p className="mb-3 text-sm uppercase tracking-wide" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 400, color: '#e68163' }}>
              Generic Supplements Don&apos;t Consider Changing Daily Needs
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-snug" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>
              Max Mend Method is a 30 day performance nutrition drink that follows a rotating science backed protocol. Each daily packet is tailored to that stage of the cycle rather than a one size fits all blend, designed for effortless top tier results.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
