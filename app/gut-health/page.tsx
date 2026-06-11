import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyBanner } from "@/components/StickyBanner";
import { ProductClient } from "@/components/ProductClient";

export const metadata: Metadata = {
  title: "The 3 Major Reasons You're Struggling With Chronic Bloating | Max Mend Method",
  description:
    "You eat healthy, stay active, and try to do everything right, yet your stomach still feels swollen, heavy, or uncomfortable. Discover the 3 major reasons behind chronic bloating and how M3's rotating nutrition supports your gut.",
  alternates: { canonical: "https://www.maxmendmethod.com/gut-health" },
  openGraph: {
    title: "The 3 Major Reasons You're Struggling With Chronic Bloating",
    description:
      "You eat healthy, stay active, and try to do everything right, yet your stomach still feels swollen, heavy, or uncomfortable. Discover the 3 major reasons behind chronic bloating.",
    url: "https://www.maxmendmethod.com/gut-health",
  },
};

const ARTICLE_POINTS = [
  {
    title: "Your Gut Is Changing. Your Supplement Isn't.",
    body: "Your gut isn't the same from one day to the next. The foods you eat, the stress you're under, how well you slept, and even your activity level can all influence your digestive system and gut microbiome. Yet most gut health supplements provide the exact same ingredients every single day. A lack of dietary variety may limit the diversity of microbes that help keep your digestive system functioning properly. That's why many people continue to struggle with bloating and digestive discomfort despite taking a daily supplement. M3 was designed around a different idea: because your body's needs change, your nutrition should too. By rotating nutrient profiles throughout the month and providing a broader spectrum of vitamins, minerals, and plant compounds, M3 optimizes its support of the diversity and nutritional foundation your gut relies on.",
    mediaLabel: "Image coming soon",
  },
  {
    title: "Stress May Be Showing Up In Your Stomach.",
    body: "Your gut and brain are in constant communication. When stress levels rise, your body shifts resources away from digestion and toward dealing with perceived threats. As a result, digestion can become less efficient, food may move differently through the digestive tract, and bloating or discomfort can become more common. In fact, many people notice their worst digestive symptoms during their most stressful periods. The problem is that most gut health products focus only on digestion itself without addressing the broader demands stress places on the body. M3 takes a more comprehensive approach by providing a rotating spectrum of nutrients that support your body's overall resilience and recovery. By helping strengthen the nutritional foundation your body relies on every day, M3 helps create an environment where healthy digestion can thrive.",
    mediaLabel: "Image coming soon",
  },
  {
    title: "Your Gut Thrives On Variety. Most Diets Don't.",
    body: "The trillions of bacteria that make up your gut microbiome depend on a wide range of nutrients and plant compounds to thrive. However, most people eat many of the same foods every week and take the same supplement every day. Over time, that lack of variety can limit the diversity of your gut microbiome, which researchers increasingly associate with digestive health and overall well-being. That's one reason why simply adding another probiotic often fails to solve the underlying issue. M3 was designed to bring more nutritional diversity into your routine by rotating formulations throughout the month. Instead of relying on the same ingredients day after day, M3 delivers a broader range of vitamins, minerals, and antioxidants to help support the diverse ecosystem living inside your gut.",
    mediaLabel: "Image coming soon",
  },
];

export default function GutHealthPage() {
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
                  The 3 Major Reasons You&apos;re Struggling With Chronic Bloating
                </h1>
                <p className="mt-4 text-base md:text-lg text-foreground/80 leading-relaxed">
                  You eat healthy, stay active, and try to do everything right, yet your stomach
                  still feels swollen, heavy, or uncomfortable by the end of the day. Chronic
                  bloating can make you feel self-conscious, sap your energy, and turn every meal
                  into a guessing game. Instead of enjoying food, you&apos;re left wondering when
                  the discomfort will hit next and why nothing you&apos;ve tried seems to solve the
                  problem for good.
                </p>
                <div className="mt-6 md:mt-8">
                  <a
                    href="#product"
                    className="inline-block whitespace-nowrap rounded-md bg-brand px-10 py-5 text-lg md:px-14 md:py-4 md:text-xl font-extrabold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-brand-hover hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Fix My Bloating
                  </a>
                </div>
                <a
                  href="#article"
                  className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  See the 3 reasons behind your bloating ↓
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
              Feed Your Gut With M3
            </h2>
            <p className="mt-3 text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
              A rotating 30 day protocol that delivers the nutritional variety your gut actually
              thrives on.
            </p>
          </div>
          <ProductClient defaultPlanType="onetime" />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
