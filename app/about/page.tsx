import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";

export const metadata: Metadata = {
  title: "Why We Made M3 — About M3",
  description:
    "Leo Sherman on why M3 was built: the problem with daily supplement routines, nutrient competition, and the rotating protocol that changed how we think about supplementation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Why We Made M3 — About M3",
    description:
      "Leo Sherman on why M3 was built: the problem with daily supplement routines, nutrient competition, and the rotating protocol that changed how we think about supplementation.",
    url: "https://www.maxmendmethod.com/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <StickyBanner />
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
        <header className="mb-12">
          <h1 className="text-4xl font-bold leading-tight">Why We Made M3</h1>
          <p className="mt-3 text-sm text-muted-foreground uppercase tracking-widest">By Leo Sherman</p>
        </header>

        <div className="prose prose-neutral max-w-none space-y-6 text-base leading-relaxed text-foreground">
          <p>Most people taking supplements have a nagging sense that their routine isn&apos;t actually working the way they think it is.</p>

          <p>Americans spend enormous amounts of money every year trying to improve their health, while nutrient deficiencies remain incredibly common. Vitamin D, magnesium, and iron deficiencies still show up everywhere despite the category becoming bigger every year.</p>

          <p>And yet most supplements are still built around the same assumption: take the same formula every day indefinitely.</p>

          <p>For a while, I never questioned that. Most people don&apos;t. You buy a supplement, follow the directions, and assume the formulation already accounts for how the body actually handles nutrients.</p>

          <p>Then you get deeper into health.</p>

          <p>You start with a few basics. Vitamin D in the winter. Magnesium before bed. Creatine because everyone recommends it. Maybe calcium gets added later.</p>

          <p>At first it feels simple. You feel healthier, more intentional, more in control.</p>

          <p>Then the routine slowly becomes more complicated.</p>

          <p>You start second guessing choices you used to feel good about. You realize you&apos;re spending more time managing your routine than actually benefiting from it. The deeper you go, the more supplementation starts to feel less like a health habit and more like a system you&apos;re constantly trying to optimize.</p>

          <p>You hear that some nutrients compete with each other for absorption. That certain vitamins can stay in tissue for weeks. That some compounds may work better when cycled instead of taken continuously. You start reading ingredient labels differently. You start wondering whether timing matters, or whether the combination you&apos;re taking even makes sense together.</p>

          <p>What&apos;s strange is that the people who become most overwhelmed by supplements are usually the ones putting the most effort into getting things right.</p>

          <p>They&apos;re reading studies, listening to podcasts, researching forms and dosages, trying to build routines carefully. But the deeper they go, the less confident they seem to become.</p>

          <p>That gap between effort and clarity was what pulled my brother and me into this problem in the first place.</p>

          <p>Once we started digging into the research, we realized how many nutrient interactions the average supplement routine completely ignores.</p>

          <p>The clearest example was iron and calcium.</p>

          <p>Iron and calcium compete for absorption in the intestine. If you take them together, iron absorption can decrease because they&apos;re competing for the same transport pathways.</p>

          <p>This isn&apos;t obscure physiology. It&apos;s well established.</p>

          <p>And yet most supplement products still combine large amounts of minerals together into one daily serving without much consideration for how they interact once they&apos;re actually inside the body.</p>

          <p>The deeper we went, the more examples we found.</p>

          <p>Zinc can interfere with copper absorption over time. Some fat soluble vitamins don&apos;t necessarily need constant daily exposure because they can remain in tissue for long periods. Some adaptogens lose their noticeable effects when taken continuously without breaks.</p>

          <p>None of this means the average supplement stack is useless. The body is resilient and handles imperfect routines all the time.</p>

          <p>But as lifelong optimizers, we never wanted to settle for imperfect, and neither should you.</p>

          <p>The deeper we went, the more one idea kept emerging:</p>

          <p className="font-medium">The body needs different things on different days, so your supplements probably shouldn&apos;t be exactly the same every day either.</p>

          <p>That thinking eventually became M3.</p>

          <p>Not because we originally set out to build a company around rotating supplement protocols, but because this was the structure that kept emerging from the research.</p>

          <p>M3 uses alternating formulas alongside a maintenance period across a 30 day cycle. The rotation is designed around nutrient absorption dynamics, pharmacokinetics, interaction management, and how different compounds stabilize over time inside the body.</p>

          <p>What we liked most about that approach wasn&apos;t just the physiology behind it. It was that it simplified the experience for the person taking it.</p>

          <p>People don&apos;t want a more complex supplement routine. They want a better one.</p>

          <p>We also became increasingly focused on keeping the system leaner and more intentional. We prioritized the proven ingredients with stronger human evidence.</p>

          <p>At the same time, I understand why the industry evolved the way it did. The convenience model solved a real problem because most people are far more likely to stick with one scoop a day than a complicated protocol.</p>

          <p>But now with M3 convenience and physiology can finally be combined.</p>

          <p>And once you understand how much nutrient timing, absorption competition, and accumulation dynamics matter, you start seeing the category differently. You realize some supplements are probably competing with each other in your gut right now. You realize the &ldquo;same thing every day forever&rdquo; model may have more to do with convenience than biology.</p>

          <p>That realization alone changed how we approach nutrition entirely.</p>

          <p>We think this information matters whether or not you ever buy anything from us, so we decided to publish a lot of our thinking for free.</p>

          <p>We&apos;ve shared the full M3 protocol publicly, including every ingredient, dose, and interaction mapped across the 30 day cycle so people can understand exactly what we built and why.</p>

          <p>We also wrote a separate guide covering everything I&apos;ve learned about nutrition and supplementation from years of obsessive research, including the diet structure I personally follow.</p>

          <p>And we put together an AI prompt that lets people build a more personalized supplement protocol for themselves based on their own goals, diet, and biomarkers.</p>

          <p>None of this requires buying anything from us.</p>

          <p>Just use whatever&apos;s useful.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
