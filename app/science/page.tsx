import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { ScienceContent } from "@/components/ScienceContent";

export const metadata: Metadata = {
  title: "Core Principles",
  description:
    "The science behind Max Mend Method — every scheduling decision behind each nutrient in the M3 rotating supplement protocol, plus every interaction we're watching.",
  alternates: { canonical: "/science" },
  openGraph: {
    title: "Core Principles",
    description:
      "The science behind Max Mend Method — every scheduling decision behind each nutrient in the M3 rotating supplement protocol, plus every interaction we're watching.",
    url: "https://www.maxmendmethod.com/science",
  },
};

export default function SciencePage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main>
        <ScienceContent />
      </main>
      <SiteFooter />
    </div>
  );
}
