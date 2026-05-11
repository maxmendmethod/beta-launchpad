import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { CTAButton } from "@/components/CTAButton";
import logo from "@/assets/m3-logo.png";
import founderMax from "@/assets/founder-max.png";
import founderJon from "@/assets/founder-jon.png";
import foundersDuo from "@/assets/founders-duo.jpg";
import guidePreview from "@/assets/guide-preview.png.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M3 — Max Mend Method" },
      { name: "description", content: "The first supplement built around how your body actually absorbs nutrients. Join the Founding Members Program — free." },
    ],
  }),
  component: Index,
});

const faqs = [
  {
    q: "What is M3?",
    a: (
      <>
        <p>Your body doesn't absorb nutrients the same way every day.</p>
        <p className="mt-2">Some nutrients block each other when taken together. Some build up over time and don't need daily dosing. Some stop working if taken without a break.</p>
        <p className="mt-2">M3 is the first supplement built around all of that. It works as a rotating daily protocol where each packet is designed around that science. Different packet every day. Zero thinking required.</p>
      </>
    ),
  },
  {
    q: "Why is the formula different every day?",
    a: <p>Every nutrient has its own absorption rules. Iron and calcium compete for the same transporter, so they never share a day. Fat soluble vitamins can build up in your body, so they're pulsed rather than dosed daily. Positive interactions are always paired. Every ingredient is scheduled around when your body can actually use it.</p>,
  },
  {
    q: "What kind of person uses M3?",
    a: <p>Anyone who wants to optimize their supplements without a PhD or 10,000 hours of research. M3 is the supplement you'd build if you spent years studying how nutrients absorb, interact, and compete. We did that. You just take today's packet.</p>,
  },
  {
    q: "When will I start seeing results?",
    a: <p>Energy and digestion usually shift within the first two weeks. Skin, sleep, and inflammation follow by week four. The benefits are cumulative so the sooner you start, the sooner they build.</p>,
  },
];

function Index() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />

      <main>
        {/* HERO — fills viewport, founder pngs on sides (desktop), peek of free resource at bottom */}
        <section className="relative overflow-hidden bg-[#fffaeb]">
          {/* Side founder images — large desktop only, anchored to section edges */}
          <img
            src={founderMax}
            alt=""
            aria-hidden
            className="hidden 2xl:block pointer-events-none select-none absolute left-0 bottom-[-30%] h-[135%] w-auto max-w-[42vw] object-contain object-bottom"
          />
          <img
            src={founderJon}
            alt=""
            aria-hidden
            className="hidden 2xl:block pointer-events-none select-none absolute right-0 bottom-[-30%] h-[135%] w-auto max-w-[42vw] object-contain object-bottom"
          />

          <div className="relative mx-auto flex min-h-[56vh] max-w-7xl items-center justify-center px-4 pt-6 pb-2 md:pt-10 md:pb-3.5">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h1 className="text-[2.3rem] md:text-[3.6rem] lg:text-[3.7rem] font-extrabold uppercase tracking-tight leading-[1.05]">
                Do You Want To Feel Like Yourself Again?
              </h1>
              <p className="mt-5 text-2xl md:text-[1.7rem] font-normal text-foreground/80">
                Take the precision timed supplement and come alive in 30 days.
              </p>
              <div className="mt-7"><CTAButton className="px-12 py-6 text-2xl">I'M READY TO OPTIMIZE</CTAButton></div>
              <p className="mt-3 text-sm text-muted-foreground">Become a founding member. Try M3 on us.</p>

              {/* Duo image — shown below text until viewport is wide enough for side PNGs */}
              <img
                src={foundersDuo}
                alt="Max and Jon Valrose, M3 founders"
                className="2xl:hidden mt-8 mx-auto w-full max-w-sm rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* FREE RESOURCE — thin section */}
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
                <img
                  src={guidePreview}
                  alt="Nutrient Timing Guide preview"
                  className="w-full max-w-[220px] rounded border border-border"
                />
                <span className="pointer-events-none absolute -top-3 -right-3 z-10 rounded-md bg-[#FF0000] text-white text-[10px] px-2 py-1 uppercase">
                  It's Free
                </span>
              </div>
              <a
                href="https://docs.google.com/document/d/14I4Id_ZUuAeovT98vToEZzOjyMMJKlfYcUbG8kZhuQI/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-md bg-brand px-6 py-3 text-sm text-white hover:opacity-90"
              >
                Get Your Free Guide →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ — borderless, wide */}
        <section className="mx-auto max-w-4xl px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-black text-center uppercase">FAQs</h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex justify-between items-center font-bold text-base md:text-lg">
                  <span>{f.q}</span>
                  <span className="ml-4 text-brand text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-3 text-sm md:text-base text-foreground/80">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Founders — 33% image / 66% text */}
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-5xl px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-8">About The Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <img src={foundersDuo} alt="Max and Jon Valrose" className="w-full rounded-lg" />
              </div>
              <div className="md:col-span-2 space-y-4 text-sm md:text-base text-foreground/85">
                <p>Max and Jon Valrose are brothers and co-founders of M3. Max holds a degree in Cybersecurity and Economics. Jon holds a degree in Physics and Electrical Engineering. Both are The Knowledge Society alumni. Across their education a deep focus on human performance and nutrition remained constant.</p>
                <p>Over time that gave them a thorough understanding of the industry and its problems. They have spent years implementing nutrition science. Max has a 2,000 consecutive day streak on Cronometer and MyFitnessPal. Neither has missed a single gym session in eight years. When they travel, TSA often flags their bags for supplements. They became the default reference point in their circles for training and nutrition.</p>
                <p>They have been through the mistakes M3 is designed to prevent. From managing over 20 supplements to spending hundreds of dollars per month on trending ingredients: they get it. The research they did to understand those failures is what M3 is built on.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA — centered logo + button */}
        <section className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex flex-col items-center justify-center gap-6">
            <img src={logo} alt="M3" className="h-14 w-auto" />
            <div className="relative inline-block">
              <Link
                to="/signup"
                className="relative inline-block rounded-md bg-brand px-7 py-4 text-base uppercase tracking-wide text-white hover:opacity-90"
              >
                Start Feeling Better For Free
              </Link>
              <span className="pointer-events-none absolute -top-3 -right-3 z-10 rounded-md bg-[#FF0000] text-white text-[10px] px-2 py-1 uppercase">
                Limited Opportunity
              </span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
