import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { CTAButton } from "@/components/CTAButton";
import logo from "@/assets/m3-logo.png";

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
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">
            Do You Want To Feel Like Yourself Again?
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Take the precision timed supplement and come alive in 30 days.
          </p>
          <div className="mt-7"><CTAButton>I'M READY TO OPTIMIZE</CTAButton></div>
          <p className="mt-3 text-sm text-muted-foreground">Become a founding member. Try M3 on us.</p>
        </section>

        {/* Free Resource */}
        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <h2 className="text-2xl md:text-3xl font-bold uppercase">
              <span className="text-brand">FREE</span> RESOURCE
            </h2>
            <p className="mt-3 text-muted-foreground">
              The same nutrient timing science M3 is built on in a free guide you can follow on your own:
            </p>

            <div className="mt-8 mx-auto max-w-md rounded-lg border border-border bg-background p-6 shadow-sm">
              <div className="mx-auto mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white text-sm font-bold uppercase">
                Free
              </div>
              <h3 className="text-xl font-bold uppercase">Nutrient Timing Guide</h3>
              <div className="mt-4 mx-auto aspect-[4/3] w-full max-w-xs border border-border bg-secondary/60 flex items-center justify-center text-xs text-muted-foreground">
                Guide preview
              </div>
              <a
                href="https://docs.google.com/document/d/14I4Id_ZUuAeovT98vToEZzOjyMMJKlfYcUbG8kZhuQI/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-md bg-brand px-6 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Download the Free Guide →
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-center uppercase">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="border border-border rounded-md bg-background px-4 py-3">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <div className="mt-3 text-muted-foreground text-sm">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Founders */}
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-3xl px-4 py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-center uppercase">About The Founders</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>Max and Jon Valrose are brothers and co-founders of M3. Max holds a degree in Cybersecurity and Economics. Jon holds a degree in Physics and Electrical Engineering. Both are The Knowledge Society alumni. Across their education a deep focus on human performance and nutrition remained constant.</p>
              <p>Over time that gave them a thorough understanding of the industry and its problems. They have spent years implementing nutrition science. Max has a 2,000 consecutive day streak on Cronometer and MyFitnessPal. Neither has missed a single gym session in eight years. When they travel, TSA often flags their bags for supplements. They became the default reference point in their circles for training and nutrition.</p>
              <p>They have been through the mistakes M3 is designed to prevent. From managing over 20 supplements to spending hundreds of dollars per month on trending ingredients: they get it. The research they did to understand those failures is what M3 is built on.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <img src={logo} alt="M3" className="mx-auto h-16 w-auto" />
          <div className="mt-6">
            <Link
              to="/signup"
              className="inline-block rounded-md bg-brand px-8 py-4 text-base uppercase tracking-wide text-white hover:opacity-90"
            >
              Start Feeling Better For Free
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
