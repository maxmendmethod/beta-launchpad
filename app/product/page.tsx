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
      </main>
      <SiteFooter />
    </div>
  );
}
