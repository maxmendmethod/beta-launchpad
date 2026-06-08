"use client";

import React, { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   M3 SCIENCE PAGE
   ───────────────────────────────────────────────────────────────────────── */

const getF = (i: number) => (i >= 26 ? "W" : i % 2 === 0 ? "F1" : "F2");

const FC: Record<string, string> = {
  F1: "#e68163",
  F2: "#7d9b6a",
  W:  "#c9b07a",
};

const HC: Record<number, string> = {
  0: "#ffffff",
  1: "#fcd9a8",
  2: "#e68163",
  3: "#7a1f0b",
};

const CATS = [
  "Fat-Soluble",
  "Water-Soluble",
  "Mineral",
  "Electrolyte",
  "Gut",
  "Amino & Performance",
  "Botanical",
] as const;
type Cat = typeof CATS[number];

const CC: Record<Cat, string> = {
  "Fat-Soluble": "#b8860b",
  "Water-Soluble": "#2e86ab",
  "Mineral": "#2980b9",
  "Electrolyte": "#777",
  "Gut": "#6a8e3e",
  "Amino & Performance": "#7b68ee",
  "Botanical": "#b05574",
};

type DayState = "boosted" | "full" | "reduced" | "off";
type IxKind = "pairs" | "separates" | "drug" | "note";

type Nutrient = {
  id: string;
  name: string;
  cat: Cat;
  f1: DayState;
  f2: DayState;
  w: DayState;
  sched: number[];
  blurb: string;
  why: string;
  interactions: { kind: IxKind; text: string }[];
};

const daily = (v: number) => Array.from({ length: 30 }, () => v);
const altF1Only = () => Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : i % 2 === 0 ? 2 : 0));

const N: Nutrient[] = [
  // ─── FAT-SOLUBLE ───────────────────────────────────────────────────────
  {
    id: "d3", name: "Vitamin D3", cat: "Fat-Soluble",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Steady, daily, every day.",
    why: "",
    interactions: [],
  },
  {
    id: "k2", name: "Vitamin K2 (MK-7)", cat: "Fat-Soluble",
    f1: "full", f2: "off", w: "off", sched: altF1Only(),
    blurb: "Pulsed onto Performance Days only.",
    why: "",
    interactions: [],
  },
  {
    id: "vitA", name: "Vitamin A (β-Carotene + Retinyl)", cat: "Fat-Soluble",
    f1: "reduced", f2: "boosted", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : i % 2 === 0 ? 1 : 2)),
    blurb: "Plant form runs daily. Animal form pulsed onto Recovery Days.",
    why: "",
    interactions: [],
  },
  {
    id: "vitE", name: "Vitamin E (Mixed Tocopherols)", cat: "Fat-Soluble",
    f1: "off", f2: "boosted", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : i % 2 === 0 ? 0 : 2)),
    blurb: "Boosted on Recovery Days, reduced on washout, zero on Performance Days.",
    why: "",
    interactions: [],
  },
  {
    id: "coq10", name: "CoQ10 (Ubiquinol)", cat: "Fat-Soluble",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily, every day.",
    why: "",
    interactions: [],
  },
  // ─── WATER-SOLUBLE ─────────────────────────────────────────────────────
  {
    id: "vitC", name: "Vitamin C", cat: "Water-Soluble",
    f1: "full", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : 3)),
    blurb: "Daily for two jobs — slightly trimmed during washout.",
    why: "",
    interactions: [],
  },
  {
    id: "bComplex", name: "B-Complex (B1/B2/B3/B5/P-5-P)", cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily, all of them — each on its own private transporter.",
    why: "",
    interactions: [],
  },
  {
    id: "b12", name: "B12 (Sublingual Methylcobalamin)", cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily, under the tongue — bypasses the gut entirely.",
    why: "",
    interactions: [],
  },
  {
    id: "folate", name: "Folate (5-MTHF)", cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily, activated form — works for everyone including MTHFR variants.",
    why: "",
    interactions: [],
  },
  // ─── MINERALS ──────────────────────────────────────────────────────────
  {
    id: "iron", name: "Iron Bisglycinate", cat: "Mineral",
    f1: "full", f2: "off", w: "off", sched: altF1Only(),
    blurb: "The keystone. Pulsed onto Performance Days. Zeroed during washout.",
    why: "",
    interactions: [],
  },
  {
    id: "ca", name: "Calcium Citrate", cat: "Mineral",
    f1: "reduced", f2: "full", w: "full",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Reduced on Performance Days, full on Recovery Days and washout.",
    why: "",
    interactions: [],
  },
  {
    id: "mg", name: "Magnesium (Taurate / Glycinate)", cat: "Mineral",
    f1: "full", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : 2)),
    blurb: "Two different forms — one for Performance Days, one for everything else.",
    why: "",
    interactions: [],
  },
  {
    id: "zn", name: "Zinc Bisglycinate", cat: "Mineral",
    f1: "reduced", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Reduced on Performance Days, full on Recovery Days.",
    why: "",
    interactions: [],
  },
  {
    id: "cu", name: "Copper Bisglycinate", cat: "Mineral",
    f1: "reduced", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Tracks zinc inversely — keeps the safe ratio.",
    why: "",
    interactions: [],
  },
  {
    id: "mn", name: "Manganese (Bisglycinate)", cat: "Mineral",
    f1: "off", f2: "full", w: "off",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : i % 2 === 0 ? 0 : 2)),
    blurb: "Banished to Recovery Days only. Zeroed everywhere else.",
    why: "",
    interactions: [],
  },
  {
    id: "se", name: "Selenium (Selenomethionine)", cat: "Mineral",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — the selenium taxi refreshes every 24 hours.",
    why: "",
    interactions: [],
  },
  {
    id: "iodine", name: "Iodine (Potassium Iodide)", cat: "Mineral",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — the thyroid has its own private transporter.",
    why: "",
    interactions: [],
  },
  {
    id: "mo", name: "Molybdenum (Sodium Molybdate)", cat: "Mineral",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — independent transporter, low dose, safe.",
    why: "",
    interactions: [],
  },
  {
    id: "p", name: "Phosphorus (Monosodium Phosphate)", cat: "Mineral",
    f1: "off", f2: "full", w: "full",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 0 : 2)),
    blurb: "Recovery Days and washout. Zeroed on Performance Days.",
    why: "",
    interactions: [],
  },
  // ─── ELECTROLYTE ───────────────────────────────────────────────────────
  {
    id: "electrolytes", name: "Electrolytes (K-dominant, minimal Na)", cat: "Electrolyte",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — heavy on potassium, nominal on sodium.",
    why: "",
    interactions: [],
  },
  // ─── GUT ───────────────────────────────────────────────────────────────
  {
    id: "probiotics", name: "Probiotic Blend", cat: "Gut",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — these strains wash out without re-dosing.",
    why: "",
    interactions: [],
  },
  {
    id: "prebiotic", name: "Prebiotic Blend (PHGG + GOS + XOS)", cat: "Gut",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — three fibers feeding three different microbe groups.",
    why: "",
    interactions: [],
  },
  {
    id: "enzymes", name: "Digestive Enzymes", cat: "Gut",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — local effect in the gut, no systemic competition.",
    why: "",
    interactions: [],
  },
  // ─── AMINO & PERFORMANCE ───────────────────────────────────────────────
  {
    id: "creatine", name: "Creatine Monohydrate", cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — saturates muscles in about 28 days. Matches the cycle.",
    why: "",
    interactions: [],
  },
  {
    id: "aminoComplex", name: "Amino & ALA Complex (Glycine + Taurine + R-ALA)", cat: "Amino & Performance",
    f1: "reduced", f2: "full", w: "full",
    sched: [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,2,2,2,2],
    blurb: "Daily blend — but R-ALA is zeroed on Performance Days.",
    why: "",
    interactions: [],
  },
  {
    id: "tyrosine", name: "L-Tyrosine", cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — independent transport. Critical drug interactions.",
    why: "",
    interactions: [],
  },
  {
    id: "ump", name: "Uridine Monophosphate (UMP)", cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — pairs with CDP-choline for brain cell membranes.",
    why: "",
    interactions: [],
  },
  {
    id: "choline", name: "CDP-Choline (Citicoline)", cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — the cleanest-evidence choline source.",
    why: "",
    interactions: [],
  },
  // ─── BOTANICAL ─────────────────────────────────────────────────────────
  {
    id: "ashwagandha", name: "Ashwagandha (KSM-66 root extract)", cat: "Botanical",
    f1: "full", f2: "full", w: "off",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : 2)),
    blurb: "Performance Days and Recovery Days. Zeroed during the 4-day washout.",
    why: "",
    interactions: [],
  },
  {
    id: "lionsMane", name: "Lion's Mane (fruiting body)", cat: "Botanical",
    f1: "full", f2: "full", w: "full", sched: daily(2),
    blurb: "Daily — all 30 days. No cycling.",
    why: "",
    interactions: [],
  },
];

// ── MINI GRID HELPERS ────────────────────────────────────────────────────
type CellLevel = "full" | "reduced" | "off";

function MiniCell({ level }: { level: CellLevel }) {
  const cls =
    level === "full" ? "bg-brand" :
    level === "reduced" ? "bg-[#fcd9a8]" :
    "bg-white border-[1.5px] border-dashed border-[#b8b8b8]";
  return <span className={`inline-block w-6 h-6 rounded-sm ${cls}`} />;
}

function MiniLegend() {
  return (
    <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-foreground/55 uppercase tracking-wider">
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-3 h-3 rounded-sm bg-brand" />
        Full dose
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-3 h-3 rounded-sm bg-[#fcd9a8]" />
        Reduced dose
      </span>
      <span className="flex items-center gap-1.5">
        <span className="inline-block w-3 h-3 rounded-sm bg-white border-[1.5px] border-dashed border-[#b8b8b8]" />
        Off
      </span>
    </div>
  );
}

function MiniGrid1() {
  const rows: { name: string; days: CellLevel[] }[] = [
    { name: "Vitamin B2", days: ["full", "full"] },
    { name: "Calcium",    days: ["full", "full"] },
    { name: "Iron",       days: ["full", "off"]  },
  ];

  return (
    <div className="my-8 bg-white rounded-xl border border-border p-5 max-w-xs">
      <table className="border-collapse">
        <thead>
          <tr>
            <td className="pb-2 pr-5 min-w-[110px]" />
            {["Day 1", "Day 2"].map((d) => (
              <td key={d} className="text-center text-[10px] uppercase tracking-wider text-foreground/50 pb-2 px-2.5 font-medium">
                {d}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="text-[12px] text-foreground/80 pr-5 py-1.5">{row.name}</td>
              {row.days.map((level, i) => (
                <td key={i} className="text-center px-2.5 py-1.5">
                  <MiniCell level={level} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <MiniLegend />
    </div>
  );
}

function MiniGrid2() {
  const rows: { name: string; dayA: CellLevel; dayB: CellLevel }[] = [
    { name: "Vitamin B2", dayA: "full", dayB: "full"    },
    { name: "Calcium",    dayA: "full", dayB: "reduced" },
    { name: "Iron",       dayA: "off",  dayB: "full"    },
  ];

  return (
    <div className="my-8 bg-white rounded-xl border border-border p-5 max-w-xs">
      <table className="border-collapse">
        <thead>
          <tr>
            <td className="pb-2 pr-5 min-w-[110px]" />
            <td className="text-center text-[10px] uppercase tracking-wider text-foreground/50 pb-2 px-6 font-medium">
              Day A
            </td>
            <td className="text-center text-[10px] uppercase tracking-wider text-foreground/50 pb-2 px-6 font-medium">
              Day B
            </td>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="text-[12px] text-foreground/80 pr-5 py-1.5">{row.name}</td>
              <td className="text-center px-6 py-1.5"><MiniCell level={row.dayA} /></td>
              <td className="text-center px-6 py-1.5"><MiniCell level={row.dayB} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <MiniLegend />
    </div>
  );
}

// ── PRINCIPLES DATA ──────────────────────────────────────────────────────
const PRINCIPLES: { name: string; body: string[] }[] = [
  {
    name: "Science, Not Tradition",
    body: [
      "Most supplement companies start with what everyone else is doing and then make small changes around the edges. We took the opposite approach. Instead of asking what ingredients belong in a supplement, we started by asking why those ingredients were being used in the first place, then we looked at the research, the dosing, the timing, the forms, and how everything interacted with everything else.",
      "The result was something that looked very different from the industry standard because when it comes to supplements, what you take is only part of the equation. How much you take, when you take it, and what you take it with can matter just as much.",
    ],
  },
  {
    name: "Full Transparency",
    body: [
      "The supplement industry has a bad habit of hiding things behind fancy marketing terms and proprietary blends. Every ingredient in M3 is listed openly and every decision has a reason behind it. No ingredient is included just because it’s trendy and “sells well.” Nothing is included because it sounds good on a label. Nothing is included because everyone else is doing it.",
      "If we can’t explain exactly why something belongs in the protocol, it doesn’t belong in the protocol.",
    ],
  },
  {
    name: "Results You Can Point To",
    body: [
      "Max Mend Method was built to help you feel better. Most people don’t care about ingredient names, metabolic pathways, or obscure scientific terminology like we do and we totally get that. People care about having more energy when they wake up, feeling focused at work, and getting through the day without feeling like garbage.",
      "At the end of the day, that’s what matters. The science only matters if it improves your life.",
    ],
  },
  {
    name: "Real Food, Real Ingredients",
    body: [
      "Our bodies evolved to eat real food, not synthetic lab chemicals. That’s why we try to source ingredients from food whenever it makes sense and avoid unnecessary additives whenever possible. No artificial junk that serves no real purpose. Just ingredients selected because they help move the protocol closer to its goal.",
    ],
  },
  {
    name: "The Best, Without a PhD",
    body: [
      "You shouldn’t need to spend hundreds of hours reading studies just to take care of your health. Nutrition can get complicated very quickly and the solution isn’t to force everyone to learn everything.",
      "We built a product smart enough so that you don’t have to become a dietician to get dietician optimal nutrition. We spent years thinking about the ingredients, the doses, the timing, the interactions, and the schedule. You just have to open today’s packet.",
    ],
  },
];

// ── COMPONENT ────────────────────────────────────────────────────────────
export function ScienceContent() {
  const [pIdx, setPIdx] = useState(0);

  function goTo(next: number) {
    setPIdx(((next % PRINCIPLES.length) + PRINCIPLES.length) % PRINCIPLES.length);
  }

  return (
    <div className="font-sans bg-white text-[#1a1a1a] leading-[1.65]">

      {/* ── CORE PRINCIPLES ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">

          <header className="mb-10">
            <h2 className="text-4xl leading-tight font-cormorant">Core Principles</h2>
          </header>

          {/* Grid stacking — all cards in the same cell so height = tallest card, no layout shift */}
          <div className="grid">
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                className={`[grid-area:1/1] h-full transition-[opacity,transform] duration-[240ms] ease-in-out ${
                  i === pIdx
                    ? "opacity-100 translate-y-0 pointer-events-auto z-[1]"
                    : "opacity-0 translate-y-[8px] pointer-events-none z-[0]"
                }`}
              >
                <div className="rounded-2xl border border-border bg-white overflow-hidden flex flex-col h-full">
                  {/* Progress bar */}
                  <div className="h-[3px] bg-[#f0ede4] shrink-0">
                    <div
                      className="h-full bg-[#e68163]"
                      style={{ width: `${((i + 1) / PRINCIPLES.length) * 100}%` }}
                    />
                  </div>

                  <div className="px-8 py-8 md:px-10 md:py-10 flex flex-col flex-1">
                    {/* Counter + dots */}
                    <div className="flex items-center justify-between mb-8 shrink-0">
                      <div className="flex gap-1.5">
                        {PRINCIPLES.map((_, j) => (
                          <button
                            key={j}
                            onClick={() => goTo(j)}
                            aria-label={PRINCIPLES[j].name}
                            className={`h-2 rounded transition-[width,background] duration-[250ms] ease-in-out ${
                              j === pIdx ? "w-[22px] bg-brand" : "w-2 bg-[#e5ddd0]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold tabular-nums text-brand">
                        {String(i + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(PRINCIPLES.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content — flex-1 so all cards fill to same height */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-5">
                        {p.name}
                      </h3>
                      <div className="space-y-4 text-base leading-relaxed text-foreground/80">
                        {p.body.map((para, j) => (
                          <p key={j}>{para}</p>
                        ))}
                      </div>
                    </div>

                    {/* Prev / Next */}
                    <div className="mt-8 flex justify-end gap-2 shrink-0">
                      <button
                        onClick={() => goTo(pIdx - 1)}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/50 transition-colors hover:border-[#e68163] hover:text-[#e68163]"
                        aria-label="Previous principle"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => goTo(pIdx + 1)}
                        className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground/50 transition-colors hover:border-[#e68163] hover:text-[#e68163]"
                        aria-label="Next principle"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTICLE ─────────────────────────────────────────────────── */}
      <article className="border-b border-border">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">

          <header className="mb-10">
            <h1 className="text-4xl leading-tight font-cormorant">Why Every Day Looks A Little Different</h1>
          </header>

          <div className="space-y-6 text-base leading-relaxed text-foreground">
            <p>Every supplement on the market is built around the same basic assumption.</p>
            <p>
              If you are deficient or below optimal in a nutrient, then you should probably take some sort of daily supplement for it.
            </p>
            <p>
              Seems reasonable enough. If you&apos;re low in magnesium, take magnesium every day. If you&apos;re low in vitamin D, take vitamin D every day. If you&apos;re low in iron, take iron every day. The entire supplement industry is basically built on that idea.
            </p>
            <p>But here&apos;s what started bothering us. The human body doesn&apos;t actually treat every nutrient the same way.</p>
            <p>
              Some nutrients are absorbed almost immediately and then excreted a few hours later while others can stick around in tissues for weeks or months.
            </p>
            <p>
              Some compete with each other for absorption, some become less effective when taken continuously, and some actually work better when you take them less often.
            </p>
            <p>So if all of these nutrients behave differently, why is every supplement protocol designed the exact same way?</p>
            <p>To explain what we mean, let&apos;s imagine a world where there are only three nutrients in existence.</p>
            <p>Vitamin B2, calcium, and iron.</p>
            <p>
              Now let&apos;s say you somehow figure out that you&apos;re deficient in all three so you decide to supplement them. Very logical.
            </p>
            <p>
              The obvious solution you would likely take would be to buy a B2 supplement, a calcium supplement, and an iron supplement and just take all three every morning with breakfast and honestly, that&apos;s not a terrible strategy. You would almost certainly improve your deficiencies over time.
            </p>
            <p>
              But if your goal isn&apos;t just &ldquo;better than before&rdquo; and instead your goal is to create the most optimized protocol possible, then that&apos;s where things start getting interesting.
            </p>
            <p>
              The first thing you do is start looking at what actually happens after each nutrient enters your body. You&apos;d look at things like how long it sticks around, how it&apos;s absorbed, where it goes, and how it&apos;s eventually removed.
            </p>
            <p>
              For example, Vitamin B2 is pretty straightforward. It lasts for a pretty short amount of time (around 2 hours) in your body before the excess is removed through natural processes. Your body is also very good at absorbing it and getting rid of excess amounts. There isn&apos;t even an established upper limit because toxicity hasn&apos;t really been shown to be a meaningful concern. Easy. Take your B2 every day and move on.
            </p>
            <p>With calcium, suddenly things become a lot more complicated.</p>
            <p>Calcium is stored in your bones for years, but calcium circulating in your blood only hangs around for about a day.</p>
            <p>
              That means your body is constantly trying to maintain a certain concentration in your bloodstream. If blood levels fall too low, your body starts pulling calcium out of your bones and teeth. If levels climb too high, you can start running into problems on the other end like chronic fatigue, muscle weakness, and lethargy.
            </p>
            <p>
              A useful way to think about it is that your bones are basically a giant calcium savings account that when your body needs calcium, it makes withdrawals from. When you have excess calcium available, it makes deposits.
            </p>
            <p>
              So now the goal isn&apos;t simply &ldquo;get enough calcium.&rdquo; The goal becomes finding the dosing strategy that keeps you in the sweet spot as consistently as possible.
            </p>
            <p>
              Then you get to iron. Most people assume taking something more often should lead to better results but iron is one of the best examples of why that isn&apos;t always true.
            </p>
            <p>
              In fact, many doctors recommend taking supplemental iron every other day because absorption is often higher and side effects like nausea and constipation are often lower.
            </p>
            <p>So now you&apos;ve got your first supplement schedule.</p>
          </div>

          <MiniGrid1 />

          <div className="space-y-6 text-base leading-relaxed text-foreground">
            <p>
              But then you keep digging and you realize this is where things start to get really annoying. You discover that calcium and iron actually compete for absorption. In the gut, they both use the same DMT1 transporter. In simple terms, they&apos;re trying to use the same doorway to get into your bloodstream so if calcium shows up and iron shows up at exactly the same time, less of both nutrients get absorbed.
            </p>
            <p>You paid for both, you swallowed both, but your body didn&apos;t actually get the full benefit of either.</p>
            <p>
              Now you&apos;re stuck with a puzzle. You need calcium every day. You want iron every other day. But you don&apos;t want them competing with each other.
            </p>
            <p>So eventually you end up with a schedule that looks something like this.</p>
          </div>

          <MiniGrid2 />

          <div className="space-y-6 text-base leading-relaxed text-foreground">
            <p>
              Now iron gets priority every other day, but calcium still remains present daily (with the added benefit of having controlled dosage to keep you in the Goldilocks zone of calcium intake). B2 keeps doing its thing in the background.
            </p>
            <p>
              You&apos;ve just created a system that is more optimized over a 48 hour period than simply taking everything together every morning.
            </p>
            <p>Your body absorbs more, you waste less, and you aren&apos;t creating unnecessary competition between nutrients.</p>
            <p>
              Now, try doing this with all the nutrients you may be getting a suboptimal dose of combined with all of the beneficial nutrients that supplement a complete diet. The three nutrient example only contains a handful of possible interactions. Bump it up to 30 and you now have hundreds of interactions to consider.
            </p>
            <p>
              Then on top of the interactions, you have to consider synergies, tolerance, adaptation, receptor downregulation, optimal forms, dosing windows, and long term optimization over years rather than days.
            </p>
            <p>At some point the problem becomes so complicated that no normal person could realistically manage it on their own.</p>
            <p>That&apos;s the entire reason M3 exists. We solved the scheduling problem so that you don&apos;t have to.</p>
            <p>Your job is to open today&apos;s packet and take it once a day.</p>
            <p className="font-medium">The complexity stays behind the scenes, the benefits don&apos;t.</p>
          </div>
        </div>
      </article>

      {/* ── NUTRIENT SCHEDULE GRID ─────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">

          <header className="mb-8">
            <h2 className="text-4xl leading-tight font-cormorant">Nutrient Schedule Grid</h2>
          </header>

          <div className="mb-6 flex flex-wrap gap-4 text-[11px] text-foreground/65">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#7a1f0b]" />
              Boosted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-brand" />
              Full
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-[#fcd9a8]" />
              Reduced
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-white border-[1.5px] border-dashed border-[#b8b8b8]" />
              Zeroed
            </span>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="border-collapse w-full min-w-[760px]">
              <thead>
                <tr>
                  <th className="text-left p-1 text-[10px] uppercase tracking-wider text-foreground/55 font-normal sticky left-0 bg-[#ffffff] z-10 min-w-[190px]">
                    Nutrient
                  </th>
                  {Array.from({ length: 30 }, (_, i) => {
                    const f = getF(i);
                    return (
                      <th key={i} className="text-center p-0 min-w-[18px]">
                        <div className="text-[9px] font-bold" style={{ color: FC[f] }}>
                          {i + 1}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {CATS.map((cat) => {
                  const items = N.filter((n) => n.cat === cat);
                  if (!items.length) return null;
                  return (
                    <React.Fragment key={cat}>
                      <tr>
                        <td colSpan={31} className="pt-3 pb-1 sticky left-0 bg-[#ffffff]">
                          <span
                            className="text-[10px] font-extrabold uppercase tracking-[0.1em]"
                            style={{ color: CC[cat] }}
                          >
                            {cat}
                          </span>
                        </td>
                      </tr>
                      {items.map((n) => (
                        <tr key={n.id}>
                          <td className="py-1 px-1 text-[11px] text-foreground/85 sticky left-0 bg-[#ffffff] z-[5] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {n.name}
                          </td>
                          {n.sched.map((v, idx) => {
                            const cls =
                              v === 0 ? "bg-white border-[1.5px] border-dashed border-[#b8b8b8]" :
                              v === 1 ? "bg-[#fcd9a8]" :
                              v === 2 ? "bg-brand" :
                              "bg-[#7a1f0b]";
                            return (
                              <td key={idx} className="text-center px-0 py-0.5">
                                <span className={`inline-block w-3.5 h-3.5 rounded-sm ${cls}`} />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
