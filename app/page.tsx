import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Shield } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { CTAButton } from "@/components/CTAButton";
import { ProductClient } from "@/components/ProductClient";
import logo from "@/src/assets/m3-logo.png";
import founderMyles from "@/src/assets/founder-max.png";
import founderLeo from "@/src/assets/founder-jon.png";
import foundersDuo from "@/src/assets/founders-duo.png";
import drinkExample from "@/src/assets/drink_example.png";
import heroBg from "@/src/assets/hero-bg.avif";

export const metadata: Metadata = {
  title: "Max Mend Method | Precision Timed Supplement",
  description:
    "Max Mend Method is a rotating supplement protocol designed to optimize nutrient absorption, recovery, hydration, and performance with science-backed daily packets.",
  alternates: { canonical: "https://www.maxmendmethod.com/" },
};

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
    text: "Your body doesn't absorb nutrients the same way every day. Some nutrients block each other when taken together. Some build up over time and don't need daily dosing. Some stop working if taken without a break. M3 is the first supplement built around all of that. It works as a rotating daily protocol where each packet is designed around that science. Different packet every day. Zero thinking required.",
  },
  {
    q: "Why is the formula different every day?",
    a: <p>Every nutrient has its own absorption rules. Iron and calcium compete for the same transporter, so they never share a day. Fat soluble vitamins can build up in your body, so they're pulsed rather than dosed daily. Positive interactions are always paired. Every ingredient is scheduled around when your body can actually use it.</p>,
    text: "Every nutrient has its own absorption rules. Iron and calcium compete for the same transporter, so they never share a day. Fat soluble vitamins can build up in your body, so they're pulsed rather than dosed daily. Positive interactions are always paired. Every ingredient is scheduled around when your body can actually use it.",
  },
  {
    q: "What kind of person uses M3?",
    a: <p>Anyone who wants to optimize their supplements without a PhD or 10,000 hours of research. M3 is the supplement you'd build if you spent years studying how nutrients absorb, interact, and compete. We did that. You just take today's packet.</p>,
    text: "Anyone who wants to optimize their supplements without a PhD or 10,000 hours of research. M3 is the supplement you'd build if you spent years studying how nutrients absorb, interact, and compete. We did that. You just take today's packet.",
  },
  {
    q: "When will I start seeing results?",
    a: <p>Energy and digestion usually shift within the first two weeks. Skin, sleep, and inflammation follow by week four. The benefits are cumulative so the sooner you start, the sooner they build.</p>,
    text: "Energy and digestion usually shift within the first two weeks. Skin, sleep, and inflammation follow by week four. The benefits are cumulative so the sooner you start, the sooner they build.",
  },
];

const SITE_URL = "https://www.maxmendmethod.com";

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Max Mend Method",
  url: SITE_URL,
  description:
    "Max Mend Method is a rotating supplement protocol designed to optimize nutrient absorption, recovery, hydration, and performance with science-backed daily packets.",
};

const brandLd = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: "Max Mend Method",
  alternateName: "M3",
  url: SITE_URL,
  logo: `${SITE_URL}/m3tablogo.png`,
  description:
    "Max Mend Method is a rotating supplement protocol designed to optimize nutrient absorption, recovery, hydration, and performance with science-backed daily packets.",
  sameAs: ["https://www.instagram.com/maxmendmethod/"],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.text },
  })),
};

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <StickyBanner />
      <SiteHeader />

      <main>
        <h1 className="sr-only">Max Mend Method — Precision Timed Supplement Protocol</h1>

        {/* HERO — background image with left-to-right white fade */}
        <section className="relative overflow-hidden md:border-b md:border-border">
          {/* Background image */}
          <Image
            src={heroBg}
            alt=""
            aria-hidden
            fill
            priority
            className="object-cover object-center pointer-events-none select-none"
          />
          {/* White fade: solid on left, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent" />

          <div className="relative z-10 flex min-h-[50vh] md:min-h-[56vh] max-w-7xl items-end pl-10 md:pl-32 pr-4 pb-10 md:pb-16">
            <div className="max-w-2xl text-left">
              <h2 className="text-[1.6rem] md:text-[4rem] lg:text-[4.3rem] tracking-tight leading-[1.05]" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>
                Do You Want To Feel Like Yourself Again?
              </h2>
              <p className="mt-3 text-base md:text-[1.7rem]">
                Take the precision timed supplement and come alive in 30 days.
              </p>
              <div className="hidden md:block mt-7">
                <a href="#product" className="inline-block rounded-md bg-brand px-20 py-3 text-xl font-extrabold uppercase tracking-wide text-white shadow-sm hover:opacity-90" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700 }}>
                  I'M READY TO OPTIMIZE
                </a>
              </div>
              <p className="hidden md:block mt-3 text-sm text-muted-foreground">Become a founding member. Try M3 on us.</p>
            </div>
          </div>
        </section>

        {/* Quote */}
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

        {/* PRODUCT SECTIONS */}
        <div id="product">
          <ProductClient defaultPlanType="onetime" />
        </div>

{/* FAQ — borderless, wide */}
        <section className="mx-auto max-w-6xl px-4 py-10">
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

        {/* Founders — hero-style side images on 2xl+, duo image + text grid below */}
        <section className="bg-white relative overflow-hidden">
          <Image
            src={founderMyles}
            alt=""
            aria-hidden
            className="hidden 2xl:block pointer-events-none select-none absolute left-16 bottom-[-30%] h-[135%] w-auto max-w-[42vw] object-contain object-bottom"
          />
          <Image
            src={founderLeo}
            alt=""
            aria-hidden
            className="hidden 2xl:block pointer-events-none select-none absolute right-16 bottom-[-30%] h-[135%] w-auto max-w-[42vw] object-contain object-bottom"
          />
          <div className="mx-auto max-w-5xl px-4 py-12 relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-8">About The Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-1 gap-8 items-start">
              <div className="md:col-span-1 2xl:hidden">
                <Image src={foundersDuo} alt="Myles and Leo Sherman" className="w-full rounded-lg h-auto" />
              </div>
              <div className="md:col-span-2 2xl:col-span-1 2xl:max-w-2xl 2xl:mx-auto space-y-4 text-sm md:text-base text-foreground/85">
                <p>Myles and Leo Sherman are brothers and co-founders of M3. Myles holds a degree in Cybersecurity and Economics. Leo holds a degree in Physics and Electrical Engineering. Both are The Knowledge Society alumni. Across their education a deep focus on human performance and nutrition remained constant.</p>
                <p>Over time that gave them a thorough understanding of the industry and its problems. They have spent years implementing nutrition science. Myles has a 2,000 consecutive day streak on Cronometer and MyFitnessPal. Neither has missed a single gym session in eight years. When they travel, TSA often flags their bags for supplements. They became the default reference point in their circles for training and nutrition.</p>
                <p>They have been through the mistakes M3 is designed to prevent. From managing over 20 supplements to spending hundreds of dollars per month on trending ingredients: they get it. The research they did to understand those failures is what M3 is built on.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section>
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
              <Shield className="h-8 w-8 text-brand" />
            </div>
            <h2 className="mb-3 text-2xl uppercase" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>30 Day Money Back Guarantee</h2>
            <p className="mx-auto max-w-xl text-base" style={{ fontFamily: '"Arimo", sans-serif', color: '#000000' }}>
              Try M3 for a full 30 days. If you do not feel the difference, we will refund every dollar. No questions asked. We are confident in the protocol.
            </p>
            <Link
              href="/refunds"
              className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
              style={{ fontFamily: '"Arimo", sans-serif' }}
            >
              Read our refund policy
            </Link>
          </div>
        </section>

        {/* Final CTA — centered logo + button */}
        <section className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex flex-col items-center justify-center gap-6">
            <Image src={logo} alt="M3" className="h-14 w-auto" />
            <div className="relative inline-block">
              <Link
                href="/signup"
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
