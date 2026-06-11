import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { ScienceContent } from "@/components/ScienceContent";
import guidePreview from "@/src/assets/guide-preview.png.png";

export const metadata: Metadata = {
  title: "Core Principles",
  description:
    "The science behind Max Mend Method — every scheduling decision behind each nutrient in the M3 rotating supplement protocol, plus every interaction we're watching.",
  alternates: { canonical: "https://www.maxmendmethod.com/science" },
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
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-3xl px-4 py-8 text-center">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              <span className="text-brand">FREE</span> RESOURCE
            </h2>
            <p className="mt-2 text-sm md:text-base text-foreground/80">
              The same nutrient timing science M3 is built on in a free guide you can follow on your own:
            </p>
            <div className="mt-5 mx-auto max-w-sm">
              <h3 className="text-lg md:text-xl font-black uppercase">Nutrient Timing Guide</h3>
              <div className="relative inline-block mt-3">
                <Image
                  src={guidePreview}
                  alt="Nutrient Timing Guide preview"
                  className="w-full max-w-[220px] rounded border border-border h-auto"
                />
                <span className="pointer-events-none absolute -top-3 -right-3 z-10 rounded-md bg-[#d92d20] text-white text-[10px] font-bold px-2 py-1 uppercase shadow-sm">
                  It&apos;s Free
                </span>
              </div>
              <a
                href="https://docs.google.com/document/d/14I4Id_ZUuAeovT98vToEZzOjyMMJKlfYcUbG8kZhuQI/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-hover hover:shadow-md"
              >
                Get Your Free Guide →
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
