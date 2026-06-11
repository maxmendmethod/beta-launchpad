import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { ProductClient } from "@/components/ProductClient";

export const metadata: Metadata = {
  title: "The 3 Major Reasons You Feel Drained On Your GLP-1 | Max Mend Method",
  description:
    "Your GLP-1 is working — you're eating less. But eating less means fewer of the vitamins, minerals, and nutrients your body runs on. Discover the 3 major reasons you feel drained and how M3's rotating nutrition helps protect your progress.",
  alternates: { canonical: "https://www.maxmendmethod.com/glp-1" },
  openGraph: {
    title: "The 3 Major Reasons You Feel Drained On Your GLP-1",
    description:
      "Your GLP-1 is working — you're eating less. But eating less means fewer of the vitamins, minerals, and nutrients your body runs on. Discover the 3 major reasons you feel drained.",
    url: "https://www.maxmendmethod.com/glp-1",
  },
};

const ARTICLE_POINTS = [
  {
    title: "You're Eating Less. Your Body Is Getting Less Of Everything.",
    body: "GLP-1 medications work by quieting your appetite, and that's exactly the point. But when your food intake drops, your intake of vitamins, minerals, and plant compounds drops right along with it. Smaller meals and fewer of them can leave real gaps in nutrients your body depends on every day, like iron, magnesium, B vitamins, and vitamin D. Those gaps are one reason so many people on GLP-1s report feeling tired, foggy, or run down even as the scale moves in the right direction. M3 was designed to help fill that space. One daily drink delivers a broad, rotating spectrum of vitamins, minerals, and antioxidants, so a smaller appetite doesn't have to mean a smaller nutritional foundation.",
    mediaLabel: "Image coming soon",
  },
  {
    title: "Not All The Weight You're Losing Is Fat.",
    body: "When weight comes off quickly, your body doesn't only burn fat. A meaningful portion of rapid weight loss can come from lean muscle, and muscle is exactly what you want to keep. It supports your metabolism, your strength, your posture, and your ability to maintain results long after the weight is gone. Protecting it takes protein, resistance training, and the right nutritional support. That's why M3 includes creatine monohydrate every single day, alongside electrolytes, activated B vitamins, and rotating minerals that support strength, energy, and recovery. M3 isn't a replacement for protein or training, but it helps give your body the raw materials it needs to hold onto the muscle you've worked for while the fat comes off.",
    mediaLabel: "Image coming soon",
  },
  {
    title: "Your Dose Changes. Your Appetite Changes. Your Supplement Doesn't.",
    body: "A GLP-1 journey is anything but static. Your dose titrates up over time, your appetite swings from week to week, and some days you simply eat far less than others. Yet most supplements hand you the exact same formula every single day, as if your body's needs never change. M3 was built around the opposite idea: because your body's needs change, your nutrition should too. By rotating nutrient profiles throughout the month, M3 delivers a broader range of vitamins, minerals, and plant compounds than any single static formula can, and it manages the interactions between them so more of what you take actually gets absorbed. It's nutritional support designed for a body in transition, which is exactly what a body on a GLP-1 is.",
    mediaLabel: "Image coming soon",
  },
];

export default function Glp1Page() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="bg-[#fffaeb] md:border-b md:border-border">
          <div className="mx-auto px-4 md:px-[15%] py-12 md:py-20">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
              {/* Left: hook + CTAs */}
              <div>
                <h1 className="text-3xl md:text-[3rem] lg:text-[3.3rem] tracking-tight leading-[1.1] font-gliker font-bold text-brand">
                  The 3 Major Reasons You Feel Drained On Your GLP-1
                </h1>
                <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                  Your GLP-1 is doing exactly what it&apos;s supposed to do. You&apos;re eating
                  less, and the scale is finally moving. But eating less also means getting less of
                  the vitamins, minerals, and nutrients your body runs on every day. That&apos;s
                  why so many people on GLP-1s feel tired and run down, lose muscle along with the
                  fat, and notice changes in their hair, skin, and strength. Losing weight
                  shouldn&apos;t mean losing your energy.
                </p>
                <div className="mt-6 md:mt-8">
                  <a
                    href="#product"
                    className="inline-block whitespace-nowrap rounded-md bg-brand px-10 py-5 text-lg md:px-14 md:py-4 md:text-xl font-extrabold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-brand-hover hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Protect My Progress
                  </a>
                </div>
                <a
                  href="#article"
                  className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  See the 3 reasons you feel drained ↓
                </a>
              </div>

              {/* Right: product image (placeholder) */}
              <div className="aspect-[4/5] w-full max-w-md mx-auto rounded-md bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <p className="text-7xl text-brand font-gliker">M3</p>
                  <p className="mt-2 text-sm font-gliker">Product image coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLE SECTION */}
        <section id="article" className="bg-white scroll-mt-24">
          <div className="mx-auto px-4 md:px-[15%] py-14 md:py-20 flex flex-col gap-14 md:gap-24">
            {ARTICLE_POINTS.map((point, i) => (
              <div
                key={point.title}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14 items-center"
              >
                {/* Left: text */}
                <div>
                  <p className="mb-2 text-sm font-extrabold uppercase tracking-wider text-brand">
                    Reason {i + 1}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-gliker font-bold leading-snug">
                    {point.title}
                  </h2>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-foreground/80">
                    {point.body}
                  </p>
                </div>

                {/* Right: media (placeholder) */}
                <div className="aspect-[4/3] w-full rounded-md bg-secondary flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl text-brand/30 font-gliker">{i + 1}</p>
                    <p className="mt-1 text-xs font-gliker">{point.mediaLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT SECTION */}
        <section id="product" className="scroll-mt-24 border-t border-border">
          <div className="mx-auto px-4 md:px-[15%] pt-12 md:pt-16 text-center">
            <h2 className="text-4xl md:text-5xl font-gliker font-bold uppercase">
              Protect Your Progress With M3
            </h2>
            <p className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              A rotating 30 day protocol that helps fill the nutritional gaps a smaller appetite
              leaves behind.
            </p>
          </div>
          <ProductClient defaultPlanType="onetime" />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
