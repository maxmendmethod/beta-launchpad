import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { CTAButton } from "@/components/CTAButton";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality — Max Mend Method",
  description:
    "How M3 sources ingredients, manufactures every protocol, and approaches testing before a single pack ships.",
  alternates: { canonical: "https://www.maxmendmethod.com/quality" },
  openGraph: {
    title: "Quality — Max Mend Method",
    description:
      "How M3 sources ingredients, manufactures every protocol, and approaches testing before a single pack ships.",
    url: "https://www.maxmendmethod.com/quality",
  },
};

const PILLARS = [
  {
    src: "/images/quality/pillar-sourcing.jpg",
    alt: "Close-up of raw botanical and plant-based supplement ingredients",
    header: "Ingredient sourcing",
    body: "We work with suppliers that can provide clear sourcing documentation, identity testing, and consistent ingredient quality. Ingredient forms are selected based on absorption, tolerability, and research support, not simply because they are cheaper or easier to manufacture.",
  },
  {
    src: "/images/quality/pillar-manufacturing.jpg",
    alt: "Supplement manufacturing equipment and production line",
    header: "Manufacturing standards",
    body: "M3 is manufactured in U.S. FDA-registered cGMP facilities built for precise production and quality control. Rotating protocols create more operational complexity than static formulas, so consistency across every daily pack matters.",
  },
  {
    src: "/images/quality/pillar-testing.jpg",
    alt: "Lab quality control testing environment",
    header: "Independent verification",
    body: "Supplement companies make a lot of claims that consumers have no real way to verify. We are building M3 around transparent labeling and third-party testing standards designed to confirm ingredient identity, label accuracy, and product safety.",
  },
];

const MFG_STATS = [
  { big: "cGMP", label: "FDA-registered, current Good Manufacturing Practice facilities" },
  { big: "USA", label: "Domestic manufacturing for control, traceability, and tariff resilience" },
  { big: "Per-pack", label: "Sequenced stick packs held to a consistent, documented spec" },
];

const TEST_ITEMS = [
  { label: "Label accuracy", desc: "Confirming the dose of every active ingredient matches what the label states." },
  { label: "Heavy metals", desc: "Screened against established limits for lead, arsenic, cadmium, and mercury." },
  { label: "Contaminants", desc: "Tested for microbial and other contaminants on a per-batch basis." },
  { label: "Ingredient identity", desc: "Verifying each ingredient is what it claims to be, not a cheaper substitute." },
];

const CHIPS = [
  "Transparent dosing",
  "No proprietary blends",
  "Non-GMO",
  "No artificial flavors",
  "No artificial colors",
  "No artificial sweeteners",
  "No added sugar",
  "Clinically meaningful doses",
];

const COMMITMENTS = [
  {
    src: "/images/quality/commitment-1.jpg",
    alt: "Active adult using M3 supplements as part of a daily routine",
    header: "Continuous improvement",
    body: "Nutrition research changes over time, and supplementation should adapt with it. M3 protocols are designed to evolve as new evidence emerges, ingredient research improves, and customer feedback helps us refine how the system performs in practice.",
  },
  {
    src: "/images/quality/commitment-2.jpg",
    alt: "Person engaged in a warm, human moment",
    header: "Our communication commitment",
    body: "If you have questions about ingredient choices, dosages, sourcing, or how the protocol was designed, you should be able to get a clear answer from a real person. We would rather explain the reasoning directly than hide behind marketing language.",
  },
];

export default function QualityPage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main>

        {/* 1. Hero */}
        <section className="">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center md:py-24">
            <h1
              className="text-4xl leading-tight md:text-5xl font-gliker"
            >
              Built around better standards from the beginning.
            </h1>
            <p className="mt-5 text-lg leading-relaxed md:text-xl">
              M3 only works if the ingredients, manufacturing, and dosing are handled carefully enough for the protocol to mean something. This page explains how we source ingredients, manufacture the product, and approach testing before launch.
            </p>
          </div>
        </section>

        {/* 2. Three-pillar card row */}
        <section className="">
          <div className="mx-auto max-w-7xl px-4 md:px-12 py-14">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {PILLARS.map(({ src, alt, header, body }) => (
                <div key={header} className="rounded-md border border-border overflow-hidden flex flex-col">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <h2 className="text-lg font-bold">
                      {header}
                    </h2>
                    <p className="text-sm leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Manufacturing split */}
        <section className="">
          <div className="mx-auto max-w-7xl px-4 md:px-12 py-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 items-start">
              <div>
                <h2 className="mb-6 text-2xl leading-snug md:text-3xl font-bold">
                  Manufactured in the USA with experienced production partners.
                </h2>
                <p className="mb-4 text-base leading-relaxed">
                  M3 is produced in established U.S. FDA-registered cGMP facilities with experience manufacturing complex nutritional products at scale. We wanted manufacturing partners with strong process controls, established quality systems, and a long operating history, not facilities optimized purely for speed and volume.
                </p>
                <p className="mb-8 text-base leading-relaxed">
                  Rotating protocols are harder to manufacture correctly than standard daily powders. Different stick packs contain different ingredient combinations and dosing schedules, which increases the importance of consistency across production runs. That affects how we evaluate manufacturing partners from the start.
                </p>
                <div className="flex flex-col gap-5">
                  {MFG_STATS.map((s) => (
                    <div key={s.big} className="flex flex-col gap-1">
                      <span className="text-3xl text-brand font-gliker">
                        {s.big}
                      </span>
                      <span className="text-sm leading-snug">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-full rounded-md overflow-hidden aspect-[3/4]">
                <Image
                  src="/images/quality/pillar-manufacturing.jpg"
                  alt="M3 manufacturing facility production environment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Testing split */}
        <section className="">
          <div className="mx-auto max-w-7xl px-4 md:px-12 py-14">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 items-start">
              <div>
                <h2 className="mb-6 text-2xl leading-snug md:text-3xl font-bold">
                  Claims should be backed by something measurable.
                </h2>
                <p className="mb-4 text-base leading-relaxed">
                  A large part of the supplement industry still relies on proprietary blends, vague labeling, and dosages that sound impressive but are difficult to evaluate. M3 takes the opposite approach. Every ingredient and dose is disclosed clearly because people should be able to assess what they are actually taking.
                </p>
                <p className="mb-6 text-base leading-relaxed">
                  Our final third-party testing protocol is still being finalized alongside our manufacturing partners ahead of launch. The goal is straightforward: testing should verify that the product matches the label and meets clear safety standards before it reaches customers.
                </p>
                <div className="rounded-md border border-border bg-[#fffaeb] px-5 py-4">
                  <p className="text-sm leading-relaxed font-bold">
                    Every production batch is planned to undergo independent third-party testing for label accuracy, heavy metals, and contaminants, with results tied to batch numbers and made publicly available.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {TEST_ITEMS.map((item) => (
                  <div key={item.label} className="flex gap-3 items-start">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                      <Check className="h-3 w-3 text-brand" strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">
                        {item.label}
                      </p>
                      <p className="text-sm leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Standards chips */}
        <section className="">
          <div className="mx-auto max-w-7xl px-4 md:px-12 py-14">
            <h2 className="mb-8 text-2xl md:text-3xl font-bold">
              What we include, and what we avoid.
            </h2>
            <div className="flex flex-wrap gap-3">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border px-4 py-1.5 text-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Commitment cards */}
        <section className="">
          <div className="mx-auto max-w-7xl px-4 md:px-12 py-14">
            <h2 className="mb-8 text-2xl md:text-3xl font-bold">
              Quality isn't a launch checklist. It's the whole point.
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {COMMITMENTS.map(({ src, alt, header, body }) => (
                <div key={header} className="rounded-md border border-border overflow-hidden flex flex-col">
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-6">
                    <h3 className="text-base font-bold">
                      {header}
                    </h3>
                    <p className="text-sm leading-relaxed">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Closing CTA */}
        <section>
          <div className="mx-auto max-w-2xl px-4 py-16 text-center md:py-24">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold">
              Your body has a rhythm. Your supplements should too.
            </h2>
            <p className="mb-8 text-base leading-relaxed">
              Join the waitlist for early access to M3 and follow the development of the first rotating supplement system built around how nutrient absorption actually works.
            </p>
            <CTAButton className="px-10 py-4 text-base">Join the M3 waitlist</CTAButton>
            <div className="mt-4">
              <Link href="/product/m3" className="inline-block rounded-md bg-brand px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-brand-hover hover:shadow-md">
                Learn About Max Mend Method →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
