"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, Star, Shield, Truck, RefreshCw, ArrowRight, Plus } from "lucide-react";
import whatToExpectImg from "@/src/assets/whattoexpect.avif";

const MOCK_PRODUCT = {
  name: "Max Mend Method",
  tagline: "The daily drink that makes optimal nutrition effortless",
  claims: [
    { stat: "30 Day", label: "Monthly Cycle" },
    { stat: "3x", label: "Formula System" },
    { stat: "30+", label: "Proven Ingredients" },
    { stat: "40%", label: "More Iron Absorbed" },
  ],
  plans: {
    subscribe: [
      {
        id: "sub-90",
        label: "90 Day Supply",
        badge: "Best Value",
        pricePerMonth: 99,
        originalPrice: 149,
        perServing: 3.30,
        savingsPct: 33,
        billingNote: "Billed at $297 every 12 weeks",
        perks: ["Free shipping", "Cancel anytime", "Priority support"],
      },
      {
        id: "sub-30",
        label: "30 Day Supply",
        badge: "Monthly",
        pricePerMonth: 105,
        originalPrice: 149,
        perServing: 3.50,
        savingsPct: 29,
        billingNote: "Billed every 4 weeks",
        perks: ["Cancel anytime", "Priority support"],
      },
    ],
    oneTime: [
      {
        id: "ot-founding",
        label: "Founding Members Program",
        badge: "Free",
        price: 0,
        perServing: 0,
        note: "Free shipping included.",
        perks: ["Free shipping"],
      },
      {
        id: "ot-standard",
        label: "30 Day Supply",
        badge: "One Time",
        price: 149,
        perServing: 4.97,
        note: "No subscription. Free shipping on orders over $180.",
        perks: [],
      },
    ],
  },
};

const FAQS = [
  {
    q: "Why does the formula change every other day?",
    a: "Some nutrients compete with each other, so your body absorbs less of both. Others become harder to absorb when you take them every day. By changing which nutrients you take each day, your body can absorb more over time.",
  },
  {
    q: "Is this hard to follow?",
    a: "No. You take one serving every day. M3 handles the rotating formulas inside the product. You do not need to track which day you are on.",
  },
  {
    q: "How do I take it?",
    a: "",
    steps: ["Take the leftmost stick pack in the box", "Pour it in 12oz of water", "Enjoy"],
  },
  {
    q: "Can I take this with my medication?",
    a: "As with any supplement, if you are on prescription medication it is always a good idea to run it by your doctor or pharmacist first.",
  },
  {
    q: "How long before I notice something?",
    a: "Some nutrients work fast. Others take time to build up in your body. The more consistently you use M3, the more it can help over time. Most people notice the biggest difference after using it for a few months.",
  },
];

const TABS = [
  {
    id: "ingredients",
    label: "What's Inside",
    sections: [
      {
        title: "Performance Days (13 days per month)",
        body: "Iron is the focus. Four things boost how much you absorb at the same time: Vitamin C converts iron into the form that gets through your gut wall. Beta-carotene wraps around iron to carry more of it across. L. plantarum 299v (a specific probiotic strain) releases a molecule that makes iron easier to dissolve. The bisglycinate form of iron itself takes a different absorption path that avoids most of the competition. Vitamin K2 is on. Magnesium switches to a different form (taurate instead of glycinate) so it does not compete with iron. Calcium and zinc are slightly reduced. Manganese and phosphorus are fully off.",
      },
      {
        title: "Recovery Days (13 days per month)",
        body: "No iron. No K2. Vitamin E gets its biggest dose of the month. The animal form of Vitamin A (retinyl) comes on at full strength. CoQ10 keeps running. Calcium, zinc, and magnesium all go back to their full amounts. Manganese comes back on. Phosphorus supports bone structure alongside calcium. Everything that was reduced on Performance Days comes back.",
      },
      {
        title: "Maintenance Days (last 4 days of each month)",
        body: "Iron, K2, manganese, and ashwagandha are turned off. All the daily nutrients keep running. This short break resets your body's iron ceiling so the first dose of the next month absorbs at its best. It also gives your stress response system a break from ashwagandha.",
      },
      {
        title: "Runs every single day across all three formulas",
        body: "Vitamin D3, CoQ10 (ubiquinol form), full B-vitamin complex (activated forms), B12 (sublingual methylcobalamin), folate (5-MTHF), creatine monohydrate, probiotics, prebiotics (three different fiber types), digestive enzymes, electrolytes (potassium-heavy), selenium, iodine, molybdenum, L-tyrosine, UMP, CDP-Choline (citicoline), Lion's Mane (fruiting body, not mycelium).",
      },
    ],
  },
  {
    id: "how-to",
    label: "How to Take It",
    sections: [
      {
        title: "One serving, every morning, with food",
        body: "Take M3 with a meal that has some fat in it. The fat helps the fat soluble vitamins (D3, K2, CoQ10, and others) actually get absorbed. A meal with both fat and carbs works best.",
      },
      {
        title: "The 30 day cycle",
        body: "Days 1 through 26 alternate between Performance and Recovery formulas. You do not need to track which one you are on. M3 handles it inside the product.\n\nDays 27 through 30 are the Maintenance phase. Fewer active ingredients. This is the reset window that makes the next month work better.\n\nThat is the whole protocol.",
      },
    ],
  },
  {
    id: "science",
    label: "The Science",
    sections: [
      {
        title: "It starts with iron",
        body: "The whole protocol is built around one finding: iron has a shutdown signal. When you take iron, your body releases something called hepcidin. Hepcidin tells your gut to stop absorbing iron for about 24 hours. If you take iron every day, you hit that wall every day. Every other day, the wall resets. That single scheduling change is what drives the entire formula rotation.",
      },
      {
        title: "Everything else falls into place around it",
        body: "Some nutrients use the same absorption path as iron in your gut. They get moved to the off days so they are not competing. Some nutrients actually help iron absorb better. They get pulled onto iron days. Magnesium even switches forms on iron days (taurate instead of glycinate) because the usual form uses the same transporter as iron.",
      },
      {
        title: "The 4-day reset matters more than people expect",
        body: "Without the monthly rest, your body's iron absorption ceiling slowly creeps up over months. The 4-day break resets that ceiling. It also gives your stress response system a break from ashwagandha. Both resets make month 2 work just as well as month 1.",
      },
    ],
  },
];

const RESULTS = [
  { pct: 92, label: "Felt more steady energy within 30 days" },
  { pct: 87, label: "Noticed better recovery between workouts" },
  { pct: 81, label: "Reported improved sleep quality" },
  { pct: 78, label: "Said focus felt sharper" },
];

const EXPERTS = [
  {
    initials: "SC",
    name: "Dr. Sarah Chen, MD",
    title: "Sports Medicine Physician",
    quote: "The rotating formula approach is the most scientifically sound thing I have seen in the supplement space. Managing iron absorption with alternating days is what I wish more products did.",
  },
  {
    initials: "MW",
    name: "Marcus Williams",
    title: "Division I Strength Coach, 12 Years",
    quote: "My athletes recover faster and keep their energy later in the week. M3 does not feel like just another supplement. It feels like a system that was actually thought through.",
  },
  {
    initials: "JO",
    name: "Dr. James Okafor, ND",
    title: "Functional Medicine Practitioner",
    quote: "The interaction management is what sets M3 apart. Most multi-supplements ignore the fact that nutrients compete with each other. This one was built around that problem from the start.",
  },
];

const TIMELINE = [
  {
    period: "Week 1",
    title: "Getting started",
    color: "#e68163",
    points: [
      "Your body adjusts to the new formulas",
      "Gut adapts to the probiotics and prebiotics",
      "Some people notice steadier energy by the end of the week",
    ],
  },
  {
    period: "Week 2",
    title: "First shifts",
    color: "#d4744f",
    points: [
      "Energy becomes more consistent through the day",
      "Afternoon crashes often fade around this point",
      "Sleep quality tends to pick up",
    ],
  },
  {
    period: "End of Month 1",
    title: "Creatine fully loaded",
    color: "#bf6840",
    points: [
      "After about 28 days, creatine fully saturates your muscles",
      "Strength, power, and recovery all step up from here",
      "Iron stores are actively building",
    ],
  },
  {
    period: "Month 2",
    title: "Brain stack kicks in",
    color: "#a85b32",
    points: [
      "Lion's Mane, UMP, and CDP-Choline take 6 to 8 weeks to build",
      "Focus and mental clarity start coming online",
      "Fat soluble vitamins are stacked deep in your tissue",
    ],
  },
  {
    period: "Month 3 and beyond",
    title: "Full protocol effect",
    color: "#8c4c26",
    points: [
      "Everything runs at steady state",
      "Most people say this is when they notice the clearest difference",
      "Steady energy, sharper focus, and faster recovery all at once",
    ],
  },
];

export function ProductClient({ defaultPlanType = "subscribe" }: { defaultPlanType?: "subscribe" | "onetime" } = {}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [planType, setPlanType] = useState<"subscribe" | "onetime">(defaultPlanType);
  const [selectedTier, setSelectedTier] = useState(0);
  const [selectedOneTimeTier, setSelectedOneTimeTier] = useState(0);
  const [openTab, setOpenTab] = useState<string | null>("ingredients");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ctaHovered, setCtaHovered] = useState(false);

  const activePlan = planType === "subscribe" ? MOCK_PRODUCT.plans.subscribe[selectedTier] : null;
  const activeOneTime = MOCK_PRODUCT.plans.oneTime[selectedOneTimeTier];
  const displayPrice = planType === "subscribe" ? activePlan!.pricePerMonth : activeOneTime.price;

  return (
    <>
      {/* Hero with sticky image */}
      <section className="mx-auto max-w-7xl px-4 md:px-12 pt-0 md:pt-16">
        <div className="grid grid-cols-1 gap-10 md:gap-12 items-start md:[grid-template-columns:1fr_1.2fr] md:ml-[7%]">

          {/* Left: sticky image + thumbnails */}
          <div className="md:sticky md:top-[192px] md:pb-10 flex flex-col gap-3">

            {/* Main image */}
            <div className="aspect-[4/5] w-full rounded-md bg-secondary flex items-center justify-center overflow-hidden">
              {selectedImage === 0 ? (
                <div className="text-center">
                  <p className="text-7xl text-brand" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>M3</p>
                  <p className="mt-2 text-sm" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400, color: '#000000' }}>Product image coming soon</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-3xl text-brand/30" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>View {selectedImage + 1}</p>
                  <p className="mt-1 text-xs" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400, color: '#000000' }}>Image coming soon</p>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-md bg-secondary flex items-center justify-center border-2 transition-colors ${
                    selectedImage === i
                      ? "border-brand"
                      : "border-transparent hover:border-brand/40"
                  }`}
                >
                  <span className="text-xs font-bold text-foreground/30">{i + 1}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right: scrollable product details and FAQ */}
          <div className="flex flex-col gap-5 pb-8 md:pb-10 md:pt-5">

            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-3xl tracking-tight leading-tight" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400, color: '#e68163' }}>
                {MOCK_PRODUCT.name}
              </h1>
              <p className="mt-1 text-lg md:text-base text-foreground" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700 }}>{MOCK_PRODUCT.tagline}</p>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand text-brand" />
              ))}
              <span className="ml-1 text-sm text-foreground" style={{ fontFamily: '"Arimo", sans-serif' }}>Founding member reviews loading soon</span>
            </div>

            {/* Claims */}
            <div className="order-last md:order-none grid grid-cols-2 gap-2 sm:grid-cols-4">
              {MOCK_PRODUCT.claims.map((c) => (
                <div
                  key={c.label}
                  className="rounded-md border border-border bg-secondary/50 px-3 py-2 text-center"
                >
                  <p className="text-lg font-black" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>{c.stat}</p>
                  <p className="text-[11px] leading-tight" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>{c.label}</p>
                </div>
              ))}
            </div>

            {/* Plan toggle */}
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
              <button
                onClick={() => setPlanType("subscribe")}
                className={`rounded-lg py-3 text-base md:text-sm transition-colors ${
                  planType === "subscribe"
                    ? "bg-brand text-white shadow-sm"
                    : ""
                }`}
                style={{
                  fontFamily: '"Arimo", sans-serif',
                  fontWeight: 700,
                  color: planType === "subscribe" ? undefined : '#000000',
                }}
              >
                Subscribe and Save
              </button>
              <button
                onClick={() => setPlanType("onetime")}
                className={`rounded-lg py-2.5 text-sm transition-colors ${
                  planType === "onetime"
                    ? "bg-brand text-white shadow-sm"
                    : ""
                }`}
                style={{
                  fontFamily: '"Arimo", sans-serif',
                  fontWeight: 700,
                  color: planType === "onetime" ? undefined : '#000000',
                }}
              >
                One Time
              </button>
            </div>

            {/* Subscribe tier cards */}
            {planType === "subscribe" && (
              <div className="flex flex-col gap-3">
                {MOCK_PRODUCT.plans.subscribe.map((tier, i) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(i)}
                    className={`w-full rounded-md border px-4 py-3 text-left transition-all ${
                      selectedTier === i
                        ? "border-brand bg-[#fffaeb]"
                        : "border-border bg-white hover:bg-[#fffaeb] hover:border-brand/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full border-2 shrink-0 ${
                            selectedTier === i ? "border-brand" : "border-border"
                          }`}
                        >
                          {selectedTier === i && (
                            <div className="h-2 w-2 rounded-full bg-brand" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>
                              {/^\d/.test(tier.label) ? (
                                <>
                                  <span style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>{tier.label.split(' ')[0]}</span>
                                  {' ' + tier.label.split(' ').slice(1).join(' ')}
                                </>
                              ) : tier.label}
                            </p>
                            <span className="rounded-full bg-brand text-white text-[9px] font-extrabold px-1.5 py-0.5 leading-none" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700 }}>
                              {tier.badge.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/60" style={{ fontFamily: '"Arimo", sans-serif' }}>{tier.billingNote}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>${tier.pricePerMonth}</span>
                          <span className="text-xs text-foreground/60" style={{ fontFamily: '"Arimo", sans-serif' }}>/mo</span>
                          <span className="text-xs text-foreground/35 line-through" style={{ fontFamily: '"Arimo", sans-serif' }}>${tier.originalPrice}</span>
                        </div>
                        <p className="text-[11px] text-foreground/50" style={{ fontFamily: '"Arimo", sans-serif' }}>${tier.perServing.toFixed(2)} per serving</p>
                        <span className="inline-block rounded-full bg-brand/10 text-brand text-[10px] font-extrabold px-2 py-0.5" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700 }}>
                          SAVE {tier.savingsPct}%
                        </span>
                      </div>
                    </div>
                    {selectedTier === i && (
                      <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 pl-6">
                        {tier.perks.map((p) => (
                          <li key={p} className="flex items-center gap-1 text-xs text-foreground/70" style={{ fontFamily: '"Arimo", sans-serif' }}>
                            <span className="font-bold text-brand" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700 }}>✓</span> {p}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* One-time tier cards */}
            {planType === "onetime" && (
              <div className="flex flex-col gap-3">
                {MOCK_PRODUCT.plans.oneTime.map((tier, i) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedOneTimeTier(i)}
                    className={`w-full rounded-md border px-4 py-3 text-left transition-all ${
                      selectedOneTimeTier === i
                        ? "border-brand bg-[#fffaeb]"
                        : "border-border bg-white hover:bg-[#fffaeb] hover:border-brand/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full border-2 shrink-0 ${
                            selectedOneTimeTier === i ? "border-brand" : "border-border"
                          }`}
                        >
                          {selectedOneTimeTier === i && (
                            <div className="h-2 w-2 rounded-full bg-brand" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>
                              {/^\d/.test(tier.label) ? (
                                <>
                                  <span style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>{tier.label.split(' ')[0]}</span>
                                  {' ' + tier.label.split(' ').slice(1).join(' ')}
                                </>
                              ) : tier.label}
                            </p>
                            <span className="rounded-full bg-brand text-white text-[9px] font-extrabold px-1.5 py-0.5 leading-none" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700 }}>
                              {tier.badge.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/60" style={{ fontFamily: '"Arimo", sans-serif' }}>{tier.note}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-lg" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>
                          {tier.price === 0 ? "FREE" : `$${tier.price}`}
                        </span>
                        {tier.perks.length > 0 && selectedOneTimeTier === i && (
                          <ul className="mt-1 space-y-0.5">
                            {tier.perks.map((p) => (
                              <li key={p} className="flex items-center gap-1 text-xs" style={{ fontFamily: '"Arimo", sans-serif' }}>
                                <span className="font-bold text-brand" style={{ fontWeight: 700 }}>✓</span> {p}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Price and CTA */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-3xl" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>${displayPrice}</span>
                {planType === "subscribe" && (
                  <span className="text-sm text-foreground/60" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>/month</span>
                )}
                <span className="text-sm text-foreground/40 line-through" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>
                  $149
                </span>
              </div>
              {/* TODO: Replace href with Shopify checkout URL when store is live */}
              <Link
                href="/signup"
                className="block w-full rounded-md py-5 md:py-4 text-center text-lg md:text-base font-extrabold uppercase tracking-wide text-white shadow-sm transition-colors" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, backgroundColor: ctaHovered ? '#c45a35' : '#e68163' }} onMouseEnter={() => setCtaHovered(true)} onMouseLeave={() => setCtaHovered(false)}
              >
                <span className="flex items-center justify-center gap-2">{planType === "subscribe" ? "Subscribe" : "Buy Now"}<svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0"><line x1="0" y1="10" x2="44" y2="10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><polyline points="36,3 44,10 36,17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></span>
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex justify-between -mt-3">
              <div className="flex flex-col items-center gap-1 text-center">
                <Shield className="h-5 w-5 text-brand" />
                <span className="text-[11px]" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>30 Day Guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Truck className="h-5 w-5 text-brand" />
                <span className="text-[11px]" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>Free Ship over $180</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <RefreshCw className="h-5 w-5 text-brand" />
                <span className="text-[11px]" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>Cancel Anytime</span>
              </div>
            </div>

            {/* FAQ */}
            <div className="-mt-1 border-t border-border pt-0">
              <div className="flex flex-col">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-border last:border-b-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-start justify-between py-3 text-left text-base md:text-sm gap-2"
                    >
                      <span style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>{faq.q}</span>
                      <Plus className={`h-4 w-4 shrink-0 mt-0.5 transition-transform duration-200 ${openFaq === i ? "rotate-45 text-brand" : "text-foreground/40"}`} />
                    </button>
                    {openFaq === i && (
                      faq.steps ? (
                        <ol className="pb-3 flex flex-col gap-1">
                          {faq.steps.map((step, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm" style={{ fontFamily: '"Arimo", sans-serif', color: '#000000' }}>
                              <span style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400, color: '#e68163', minWidth: '1rem' }}>{j + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="pb-3 text-sm leading-relaxed" style={{ fontFamily: '"Arimo", sans-serif', color: '#000000' }}>{faq.a}</p>
                      )
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-border" />
            </div>

          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-12 py-12">
          <h2 className="mb-6 text-center text-4xl" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>Trusted by Doctors and Coaches</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {EXPERTS.map((e) => (
              <div key={e.initials} className="flex flex-col gap-4 rounded-md border border-border p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <span className="text-sm font-black text-brand">{e.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700 }}>{e.name}</p>
                    <p className="text-xs leading-tight" style={{ fontFamily: '"Arimo", sans-serif', color: '#000000' }}>{e.title}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-brand text-brand" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ fontFamily: '"Arimo", sans-serif', color: '#000000' }}>{e.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Results */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-12 py-12">
          <h2 className="mb-8 text-center text-2xl font-black uppercase" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>What Members Report</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {RESULTS.map((r) => (
              <div key={r.label} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl text-brand" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}>{r.pct}%</span>
                  <span className="text-sm" style={{ fontFamily: '"Arimo", sans-serif', color: '#000000' }}>{r.label}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
          {/* Mobile-only cropped image */}
          <div className="md:hidden w-full rounded-md overflow-hidden mb-6 aspect-square">
            <Image src={whatToExpectImg} alt="What to expect with M3 over time" className="w-full h-full object-cover object-top" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <div className="flex flex-col">
          <h2 className="mb-10 text-2xl" style={{ fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400, color: '#e68163' }}>What to Expect</h2>
            {TIMELINE.map((item, i) => (
              <div key={item.period} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm"
                    style={{ backgroundColor: '#e68163', fontFamily: '"Gliker Expanded", sans-serif', fontWeight: 400 }}
                  >
                    {i + 1}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="my-1 w-0.5 flex-1 bg-border" />
                  )}
                </div>
                <div className={`${i < TIMELINE.length - 1 ? "pb-8" : "pb-0"}`}>
                  <p
                    className="mb-0.5 text-[11px] font-extrabold uppercase tracking-wider"
                    style={{ fontFamily: '"Arimo", sans-serif', color: '#e68163' }}
                  >
                    {item.period}
                  </p>
                  <p className="mb-2 text-base" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#000000' }}>{item.title}</p>
                  <ul className="space-y-1">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm" style={{ fontFamily: '"Arimo", sans-serif', color: '#000000' }}>
                        <span className="mt-0.5" style={{ fontFamily: '"Arimo", sans-serif', fontWeight: 700, color: '#e68163' }}>+</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {/* What to expect image */}
          <div className="hidden md:block w-full rounded-md overflow-hidden self-stretch">
            <Image src={whatToExpectImg} alt="What to expect with M3 over time" className="w-full h-full object-cover" />
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
    </>
  );
}
