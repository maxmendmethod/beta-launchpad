"use client";

import React, { useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   M3 SCIENCE PAGE â€” themed version of the M3 Formulator Brief.
   No specific weights or dosages. Only directional language: increased,
   decreased, boosted, reduced, pulsed, zeroed, paired, separated, etc.
   ───────────────────────────────────────────────────────────────────────── */

// Day type helpers (26 days alternating F1/F2, then 4-day washout W)
const getF = (i: number) => (i >= 26 ? "W" : i % 2 === 0 ? "F1" : "F2");

// Traffic-light palette themed to M3 brand
const FC: Record<string, string> = {
  F1: "#e68163", // Performance â€” brand orange
  F2: "#7d9b6a", // Recovery â€” sage green
  W:  "#c9b07a", // Maintenance â€” soft cream/gold
};
const FN: Record<string, string> = {
  F1: "Performance",
  F2: "Recovery",
  W:  "Maintenance",
};

// Heatmap colors for the schedule grid — high-contrast 4-level scale
const HC: Record<number, string> = {
  0: "#ffffff", // zeroed (white, will get a visible outline)
  1: "#fcd9a8", // reduced (pale warm)
  2: "#e68163", // full (brand orange)
  3: "#7a1f0b", // boosted (deep maroon)
};

// Nutrient categories
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

// Per-day day-type chip ("full" / "reduced" / "boosted" / "off")
type DayState = "boosted" | "full" | "reduced" | "off";

type IxKind = "pairs" | "separates" | "drug" | "note";

type Nutrient = {
  id: string;
  name: string;
  cat: Cat;
  // What happens on each day type â€” directional only.
  f1: DayState;
  f2: DayState;
  w: DayState;
  // Per-day schedule values (0=off, 1=reduced, 2=full, 3=boosted) for the heatmap.
  sched: number[];
  // One-line summary for the closed card
  blurb: string;
  // The full reasoning, 3rd-grade-readable but smart.
  why: string;
  // Per-nutrient interactions â€” what it pairs with, what it's separated from, drug interactions, notes.
  interactions: { kind: IxKind; text: string }[];
};

const ds = (s: number): DayState =>
  s === 0 ? "off" : s === 1 ? "reduced" : s === 2 ? "full" : "boosted";

// 30-day schedule generators
const daily = (v: number) => Array.from({ length: 30 }, () => v);
const altF1Only = () => Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : i % 2 === 0 ? 2 : 0));
const altF2Only = () => Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : i % 2 === 0 ? 0 : 2));
const altF2_w   = () => Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 0 : 2));
const altF1HighF2Low = (highF1: number, lowF2: number, wval: number) =>
  Array.from({ length: 30 }, (_, i) => (i >= 26 ? wval : i % 2 === 0 ? highF1 : lowF2));
const altF1LowF2High = (lowF1: number, highF2: number, wval: number) =>
  Array.from({ length: 30 }, (_, i) => (i >= 26 ? wval : i % 2 === 0 ? lowF1 : highF2));

const N: Nutrient[] = [
  // ─── FAT-SOLUBLE ───────────────────────────────────────────────────────
  {
    id: "d3",
    name: "Vitamin D3",
    cat: "Fat-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Steady, daily, every day. The slow-burn nutrient.",
    why: "Your body parks D3 in fat tissue for weeks, so timing within the day barely matters â€” what matters is that you're feeding the reservoir consistently. We keep it on every single day at the same amount. D3 also pairs really well with K2 at the small doses used here, so they ride together without elbowing each other for absorption. D3 makes the proteins your bones use; K2 turns those proteins on. Daily on both is what completes the loop.",
    interactions: [
      { kind: "pairs", text: "K2, Magnesium, and Calcium on Performance Days as the bone-axis stack. D3 makes the bone proteins, K2 turns them on, Magnesium powers D3's own activation enzyme, and Calcium is the structural building block." },
    ],
  },
  {
    id: "k2",
    name: "Vitamin K2 (MK-7)",
    cat: "Fat-Soluble",
    f1: "full", f2: "off", w: "off",
    sched: altF1Only(),
    blurb: "Pulsed onto Performance Days only â€” separated from Vitamin E.",
    why: "Vitamin K2 and Vitamin E are enemies at the dosage scale they live at in a stack like this. E elbows K2 out of the absorption truck (called a chylomicron) AND directly blocks the enzyme K2 needs to work. We can't have them on the same day. So K2 is exiled to Performance Days and E lives on Recovery Days. K2's effects last about 72 hours per dose, so taking it every other day is enough â€” your body bridges the gap. During the 4-day washout, K2 still stays zero because even reduced E is too much company for K2 to coexist with.",
    interactions: [
      { kind: "pairs", text: "Vitamin D3 on Performance Days. D3 makes the bone proteins; K2 activates them." },
      { kind: "separates", text: "Vitamin E. E elbows K2 out of the same fat-absorption truck AND directly blocks the enzyme K2 needs to do its job. K2 lives on Performance Days, E lives on Recovery Days â€” they never share a day." },
      { kind: "drug", text: "Contraindicated with warfarin and other vitamin-K antagonists â€” K2 directly opposes the drug's mechanism." },
    ],
  },
  {
    id: "vitA",
    name: "Vitamin A (Î²-Carotene + Retinyl)",
    cat: "Fat-Soluble",
    f1: "reduced", f2: "boosted", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : i % 2 === 0 ? 1 : 2)),
    blurb: "Plant form runs daily. Animal form is pulsed onto Recovery Days.",
    why: "We split Vitamin A into two forms so they can each do a different job. The plant form (beta-carotene) is on every single day because on Performance Days it actually helps iron get absorbed â€” it grabs onto iron in the gut and keeps it dissolved, adding meaningful extra uptake. The animal form (retinyl) is added only on Recovery Days, on top of the baseline plant dose. Retinyl is kept off Performance Days because it would compete with the iron-day absorption setup, and it's only needed sometimes anyway â€” retinyl stays in your liver for over four months, so your tissues are completely indifferent to whether it's daily or every other day. During washout, the animal form drops to zero again to ease long-term load.",
    interactions: [
      { kind: "pairs", text: "Iron on Performance Days. The plant form (Î²-carotene) forms a soluble iron complex that adds significant extra absorption." },
      { kind: "separates", text: "Iron on Performance Days for the animal form (retinyl) only â€” kept on Recovery Days to avoid competition with iron-day absorption." },
      { kind: "note", text: "Shares the fat-absorption truck with Vitamin E and CoQ10 on Recovery Days. Combined load stays well below saturation." },
    ],
  },
  {
    id: "vitE",
    name: "Vitamin E (Mixed Tocopherols)",
    cat: "Fat-Soluble",
    f1: "off", f2: "boosted", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : i % 2 === 0 ? 0 : 2)),
    blurb: "Boosted on Recovery Days, reduced on washout, zero on Performance Days.",
    why: "Vitamin E is held off Performance Days because it fights K2 â€” see the K2 card for the full story. On Recovery Days, E gets its full boosted dose. On the 4-day washout, E is reduced because K2 isn't around to be antagonized, and your fat tissue holds onto E for about six months â€” daily dosing isn't necessary. We use mixed tocopherols (alpha plus gamma plus delta) instead of just alpha, because gamma has its own anti-inflammatory job that alpha alone can't do. Daily Vitamin C is the partner that recycles spent E back into the active form â€” these two are functionally linked.",
    interactions: [
      { kind: "pairs", text: "Vitamin C. C donates an electron to spent E, recycling it back into the active form. Daily C keeps the recycling capacity in excess of E's burn rate." },
      { kind: "separates", text: "Vitamin K2. E double-antagonizes K2 â€” competes for the same fat-absorption truck AND directly blocks the enzyme K2 needs. The two never share a day." },
      { kind: "note", text: "Shares the fat-absorption truck with Vitamin A retinyl and CoQ10 on Recovery Days. Combined load stays below saturation." },
    ],
  },
  {
    id: "coq10",
    name: "CoQ10 (Ubiquinol)",
    cat: "Fat-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, every day. Smoother than pulsing.",
    why: "Originally CoQ10 was pulsed onto Recovery Days and washout only, to avoid any theoretical interaction with iron in the gut. We switched it to a smaller daily dose because the math is cleaner: the half-life supports daily better than every-other-day, and total monthly exposure is the same with smoother blood levels. The theoretical iron concern turned out to be a non-issue in practice â€” even if some converts to the oxidized form in the gut, that form is still biologically useful. The reduced (ubiquinol) form is chosen over the oxidized (ubiquinone) because it absorbs 3â€“4Ã— better, especially in people over 40 where your body's own production has dropped meaningfully.",
    interactions: [
      { kind: "note", text: "Shares the fat-absorption truck with Vitamin A retinyl and Vitamin E on Recovery Days. Combined load stays well below saturation." },
      { kind: "drug", text: "Mild reduction of warfarin's effect â€” CoQ10 structurally resembles Vitamin K. INR monitoring required if on warfarin or other vitamin-K antagonists." },
    ],
  },
  // ─── WATER-SOLUBLE ─────────────────────────────────────────────────────
  {
    id: "vitC",
    name: "Vitamin C",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : 3)),
    blurb: "Daily for two jobs â€” slightly trimmed during washout.",
    why: "Vitamin C works two completely different jobs depending on the day. On Performance Days, it converts iron from the hard-to-absorb form to the easy-to-absorb form right in your gut, giving a 4â€“6Ã— boost in iron absorption. On Recovery Days, it recycles spent Vitamin E back into the active form â€” a partnership that keeps the antioxidant loop running. Because the transporter that pulls C into your cells saturates at a relatively low dose, anything above that level stays in your gut â€” which is exactly where iron needs it. During washout, C is trimmed slightly because iron is off and demand is a little lower.",
    interactions: [
      { kind: "pairs", text: "Iron on Performance Days. Converts iron into the absorbable form right in your gut â€” adds 4â€“6Ã— more uptake." },
      { kind: "pairs", text: "Vitamin E on Recovery Days. Recycles spent E back into the active form." },
    ],
  },
  {
    id: "bComplex",
    name: "B-Complex (B1/B2/B3/B5/P-5-P)",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, all of them â€” each on its own private transporter.",
    why: "Every B vitamin uses its own dedicated transporter â€” different from any mineral, different from any fat-soluble. Zero competition with anything else in the stack. Daily is right because the half-lives are all over the map: some B's deplete within hours, others last weeks. Daily covers the short ones without overshooting the long ones. We use the activated form of B6 (P-5-P) instead of the cheap form because it skips a conversion step in your liver â€” about 30% of people have reduced ability to do that conversion. B6 also matters because it powers the enzyme that turns L-tyrosine into dopamine.",
    interactions: [
      { kind: "pairs", text: "L-Tyrosine. Activated B6 (P-5-P) powers the enzyme that converts tyrosine into dopamine." },
      { kind: "pairs", text: "Iodine, Selenium, and L-Tyrosine for thyroid hormone production." },
      { kind: "note", text: "Every B vitamin uses its own dedicated transporter â€” zero competition with anything else in the stack." },
    ],
  },
  {
    id: "b12",
    name: "B12 (Sublingual Methylcobalamin)",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, under the tongue â€” bypasses the gut entirely.",
    why: "Sublingual (under-the-tongue) absorption skips the stomach, skips the intrinsic-factor system, skips every gut interaction this stack has to manage. The methyl form is already activated and ready to use. Even though B12 stores in your liver for years, daily dosing makes sense because how much you absorb from a sublingual dose varies a lot â€” daily smooths that out.",
    interactions: [
      { kind: "pairs", text: "Folate and CDP-Choline for the methylation cycle (recycling homocysteine back into methionine)." },
      { kind: "note", text: "Sublingual absorption bypasses every gut interaction in the stack." },
    ],
  },
  {
    id: "folate",
    name: "Folate (5-MTHF)",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, activated form â€” works for everyone including MTHFR variants.",
    why: "The activated form (5-MTHF) uses its own transporter that's completely independent of everything else in this stack. It also bypasses the MTHFR genetic variants that limit how well the cheap form (folic acid) actually gets used â€” about 10â€“15% of people are homozygous for those variants. Daily is right because folate is small, easily handled, and pairs with B12 and choline to recycle homocysteine back into methionine.",
    interactions: [
      { kind: "pairs", text: "B12 and CDP-Choline for the methylation cycle." },
      { kind: "note", text: "Activated form (5-MTHF) uses its own dedicated transporter â€” works for everyone including the 10â€“15% with MTHFR variants." },
    ],
  },
  // ─── MINERALS ──────────────────────────────────────────────────────────
  {
    id: "iron",
    name: "Iron Bisglycinate",
    cat: "Mineral",
    f1: "full", f2: "off", w: "off",
    sched: altF1Only(),
    blurb: "The keystone. Pulsed onto Performance Days. Zeroed during washout.",
    why: "Iron drives the entire architecture of this protocol â€” both the alternating Performance Day / Recovery Day pattern AND the 4-day washout. Here's why: when you take iron, a signal called hepcidin spikes and shuts off iron absorption for roughly 24 hours. If you take iron daily, you're fighting your own shutdown signal. Alternate-day dosing lets hepcidin reset between doses, giving about 40% more total absorption from the same amount of iron. Beyond that, after weeks of continuous use even alternate-day dosing slowly raises your baseline hepcidin ceiling. The 4-day pure break at the end of each month resets that ceiling, so the next month's first dose absorbs at its monthly maximum. Iron is paired with a four-way absorption booster on every Performance Day: Vitamin C (converts iron to the absorbable form), beta-carotene (forms a soluble iron complex), the bisglycinate form itself (partial bypass of the competition gate), and L. plantarum 299v in the probiotic blend (enhances solubility). On the same days, every potential competitor is either reduced, switched to a non-competing form, or zeroed.",
    interactions: [
      { kind: "pairs", text: "Quadruple booster on every Performance Day â€” Vitamin C (converts iron to the absorbable form), Î²-Carotene (soluble iron complex), the bisglycinate form itself (partial transporter bypass), and L. plantarum 299v probiotic (enhances solubility)." },
      { kind: "separates", text: "Every potential Performance Day competitor is managed â€” Calcium is reduced, Magnesium switches to taurate form (different transporter), Zinc is reduced, Manganese is zeroed, Phosphorus is zeroed, and the R-ALA portion of the amino complex is zeroed." },
      { kind: "drug", text: "Separate by at least 2 hours from levothyroxine, bisphosphonates, fluoroquinolones, and tetracyclines. Iron binds and inactivates these drug classes in the gut." },
    ],
  },
  {
    id: "ca",
    name: "Calcium Citrate",
    cat: "Mineral",
    f1: "reduced", f2: "full", w: "full",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Reduced on Performance Days, full on Recovery Days and washout.",
    why: "Calcium and iron share a competition gate (called DMT1) at the cells lining your small intestine. At full doses they meaningfully interfere. On Performance Days, calcium is reduced so the interference drops below 6% â€” iron stays absorbed. On Recovery Days and washout, calcium goes to its full dose without any iron present to compete. Citrate form is used because it works without strong stomach acid, and it also grabs onto oxalate in your gut to reduce kidney-stone risk. This is supplemental calcium â€” dietary calcium is still the primary source.",
    interactions: [
      { kind: "pairs", text: "D3, K2, and Magnesium on Performance Days as the bone-axis stack. Pairs with Phosphorus on Recovery Days for the bone-mineral structural ratio." },
      { kind: "separates", text: "Iron on Performance Days â€” calcium and iron share the same competition gate. Reduced on Performance Days so interference drops well under control while iron absorbs cleanly." },
      { kind: "note", text: "Citrate form chelates gut oxalate from Vitamin C, reducing kidney stone risk." },
    ],
  },
  {
    id: "mg",
    name: "Magnesium (Taurate / Glycinate)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : 2)),
    blurb: "Two different forms â€” one for Performance Days, one for everything else.",
    why: "This was an interesting puzzle. Iron bisglycinate and magnesium glycinate both use the same gut transporter (called PepT1). Direct fight. The fix isn't to drop the magnesium dose â€” it's to switch the form. On Performance Days, magnesium is in the taurate form, which uses a totally different transporter (TauT). Problem solved. On Recovery Days and washout, magnesium switches to the glycinate form (because there's no iron to compete with). Bonus: the Performance Day form (magnesium taurate) delivers a meaningful side dose of taurine â€” combined with the amino complex it pushes Performance Days into felt-effect taurine territory. The washout dose is slightly reduced because your intracellular magnesium lasts about four months â€” your tissues don't care about a small daily fluctuation.",
    interactions: [
      { kind: "pairs", text: "D3 on Performance Days as the catalytic cofactor for D3's activation enzyme. Part of the bone-axis stack (D3 + K2 + Mg + Ca)." },
      { kind: "separates", text: "Iron on Performance Days. Magnesium glycinate and iron bisglycinate both use the PepT1 transporter â€” direct fight. Fixed by switching to the taurate form on Performance Days (different transporter entirely)." },
      { kind: "note", text: "Magnesium taurate on Performance Days delivers a meaningful side-load of taurine, pushing Performance Days into felt-effect taurine territory." },
    ],
  },
  {
    id: "zn",
    name: "Zinc Bisglycinate",
    cat: "Mineral",
    f1: "reduced", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Reduced on Performance Days, full on Recovery Days.",
    why: "Zinc and iron compete at the same shared gate (DMT1). At full zinc plus iron together, you'd lose meaningful iron absorption. On Performance Days, zinc is reduced so the competition drops to under 5% â€” iron stays absorbed. On Recovery Days, zinc gets its full dose with no iron to compete with. We can get away with this fluctuation because your whole-body zinc lasts about 280 days â€” your tissues are indifferent to whether the dose is the same every day.",
    interactions: [
      { kind: "pairs", text: "Copper. Copper tracks zinc inversely every single day to keep the Zn:Cu ratio safely under 15:1." },
      { kind: "separates", text: "Iron on Performance Days â€” they share the same competition gate (DMT1). Zinc is reduced on Performance Days so interference stays minimal." },
    ],
  },
  {
    id: "cu",
    name: "Copper Bisglycinate",
    cat: "Mineral",
    f1: "reduced", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Tracks zinc inversely â€” keeps the safe ratio.",
    why: "The ratio of zinc to copper has to stay under 15:1 for safety. Copper tracks zinc inversely every single day â€” when zinc goes up, copper goes up; when zinc goes down, copper goes down. That keeps the ratio safe on every day type. Same bisglycinate form as zinc and iron for transporter consistency.",
    interactions: [
      { kind: "pairs", text: "Tracks zinc inversely to maintain the Zn:Cu ratio under 15:1 on every day type." },
      { kind: "note", text: "Independent of molybdenum at this dose (copper-depleting effect of molybdenum only shows up at chronic high molybdenum doses)." },
    ],
  },
  {
    id: "mn",
    name: "Manganese (Bisglycinate)",
    cat: "Mineral",
    f1: "off", f2: "full", w: "off",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : i % 2 === 0 ? 0 : 2)),
    blurb: "Banished to Recovery Days only. Zeroed everywhere else.",
    why: "Manganese versus iron is the strongest fight among all the divalent minerals at the shared gate (DMT1) â€” stronger than zinc-vs-iron or copper-vs-iron. Putting them on the same day would crush both. So manganese is exiled to Recovery Days only. During washout it's zeroed too, even though it's not fighting anything â€” your whole-body manganese lasts about 37 days, so getting it just 13 days a month is plenty. The 4-day washout also adds a safety margin against any long-term basal ganglia accumulation (which is a chronic-high-dose concern, not a normal-dose concern, but the pulsing keeps the margin wide).",
    interactions: [
      { kind: "separates", text: "Iron â€” manganese vs. iron is the strongest competition pair at the shared transporter (DMT1). Manganese is exiled to Recovery Days only and zeroed during Maintenance for additional safety margin." },
    ],
  },
  {
    id: "se",
    name: "Selenium (Selenomethionine)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” the selenium taxi refreshes every 24 hours.",
    why: "Selenoprotein P (the protein that ferries selenium around your body) turns over about every 24 hours. So daily dosing fits the kinetics. Selenomethionine moves via the amino-acid transport system at tiny molar amounts â€” negligible competition with anything else. It's also the cofactor your body uses to convert thyroid hormone from T4 to T3.",
    interactions: [
      { kind: "pairs", text: "Iodine, L-Tyrosine, and activated B6 for thyroid hormone production. Selenium is the cofactor that converts T4 into the active T3 form." },
      { kind: "note", text: "Independent amino-acid transport â€” no competition with anything else." },
    ],
  },
  {
    id: "iodine",
    name: "Iodine (Potassium Iodide)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” the thyroid has its own private transporter.",
    why: "Iodine uses a transporter dedicated entirely to iodide (called NIS, in the thyroid). Complete independence from everything else. Iodine plus selenium plus L-tyrosine completes the thyroid-hormone production set. Iodine is the rate-limiting substrate in most diets that don't include iodized salt or seaweed.",
    interactions: [
      { kind: "pairs", text: "Selenium, L-Tyrosine, and B6 for thyroid hormones. Iodine is the rate-limiting substrate in most diets without iodized salt or seaweed." },
      { kind: "note", text: "Uses its own dedicated thyroid transporter (NIS) â€” completely independent of everything else." },
    ],
  },
  {
    id: "mo",
    name: "Molybdenum (Sodium Molybdate)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” independent transporter, low dose, safe.",
    why: "Molybdenum has its own dedicated transporter â€” zero competition with any other mineral in the stack. Helps process sulfites (relevant for high-sulfur-food and sulfite-preservative tolerance) and purines. Most diets cover this from legumes, grains, and organ meats, so this dose is insurance-tier â€” completes the trace-mineral picture. The only meaningful interaction would be with copper, but only at chronic high doses, far above what's used here.",
    interactions: [
      { kind: "note", text: "Independent molybdate transporter â€” zero competition with any other mineral in the stack. Could theoretically deplete copper at chronic high doses, but at this dose, no concern." },
    ],
  },
  {
    id: "p",
    name: "Phosphorus (Monosodium Phosphate)",
    cat: "Mineral",
    f1: "off", f2: "full", w: "full",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 0 : 2)),
    blurb: "Recovery Days and washout. Zeroed on Performance Days.",
    why: "Phosphate can grab onto iron in your gut and pull it out of absorption. To keep Performance Days clean, phosphorus is zeroed there. On Recovery Days and washout, it's on at its small structural-mineral dose. Most people get plenty of phosphorus from food (dairy, meat, grains, processed foods) â€” this is here mainly for the bone-mineral ratio with calcium and for label completeness, not as a pharmacological dose.",
    interactions: [
      { kind: "pairs", text: "Calcium on Recovery Days for the bone-mineral structural ratio (Ca:P balance matters for bone formation)." },
      { kind: "separates", text: "Iron on Performance Days â€” phosphate could grab onto iron in your gut. Zeroed on Performance Days to keep them clean." },
    ],
  },
  // ─── ELECTROLYTE ───────────────────────────────────────────────────────
  {
    id: "electrolytes",
    name: "Electrolytes (K-dominant, minimal Na)",
    cat: "Electrolyte",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” heavy on potassium, nominal on sodium.",
    why: "The average American already gets well over the daily sodium limit from food, and actively too much for the ~24% of adults with high blood pressure. So supplemental sodium is intentionally nominal here â€” a trace amount, not a meaningful dose. Potassium, meanwhile, is genuinely deficient in most American diets, so the potassium dose is meaningful. Endurance athletes, fasting people, low-carb or keto folks, and anyone doing sweat-heavy work should add a separate electrolyte drink around training â€” that's not what this base supplement is for.",
    interactions: [
      { kind: "note", text: "Ion channels are independent at these doses â€” no competition with anything else in the stack. Endurance athletes, fasting people, and keto folks should add separate sodium around training." },
    ],
  },
  // ─── GUT ───────────────────────────────────────────────────────────────
  {
    id: "probiotics",
    name: "Probiotic Blend",
    cat: "Gut",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” these strains wash out without re-dosing.",
    why: "Transient probiotic strains wash out of your gut in 1â€“3 weeks if you stop re-dosing them â€” so daily is required to maintain any effect. We picked a blend with a specific strain (L. plantarum 299v) that boosts iron absorption on Performance Days through a small molecule it produces. We also chose strains that are low TMA producers (TMA is a metabolite that becomes TMAO, which you don't want elevated) to keep that pathway quiet.",
    interactions: [
      { kind: "pairs", text: "L. plantarum 299v specifically pairs with Iron on Performance Days â€” it produces a molecule that boosts iron solubility in the gut." },
      { kind: "pairs", text: "Prebiotic blend (feeds the strains) and Creatine (enterocyte energy substrate) for gut barrier integrity." },
    ],
  },
  {
    id: "prebiotic",
    name: "Prebiotic Blend (PHGG + GOS + XOS)",
    cat: "Gut",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” three fibers feeding three different microbe groups.",
    why: "Different gut microbes prefer different fibers. Instead of one big dose of one fiber, this is three smaller doses of three different ones â€” each effective at its specific dose for its specific target microbes. The blend reaches a broader spread of populations across the length of your colon than a single substrate would. None of these fibers chelate minerals (which is a problem with some fiber sources like phytate-rich ones).",
    interactions: [
      { kind: "pairs", text: "Probiotics (feeds the strains) and Creatine for gut barrier integrity." },
      { kind: "note", text: "None of the three fibers chelate minerals â€” no interference with the mineral absorption pathways." },
    ],
  },
  {
    id: "enzymes",
    name: "Digestive Enzymes",
    cat: "Gut",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” local effect in the gut, no systemic competition.",
    why: "Digestive enzymes act locally in your gut and aren't absorbed systemically â€” so they don't interact with anything else in the stack. The lipase portion is the important one here: it helps form micelles for the fat-soluble vitamins (A, E, K2, CoQ10) so they actually get absorbed from the one daily meal this is taken with. The protease portion helps liberate amino acids from whatever you're eating alongside.",
    interactions: [
      { kind: "pairs", text: "Lipase helps form micelles for the fat-soluble vitamins (A, E, K2, CoQ10) so they actually absorb from the single daily meal." },
      { kind: "note", text: "Local gut action only â€” no systemic absorption, no competition with anything in the stack." },
    ],
  },
  // ─── AMINO & PERFORMANCE ───────────────────────────────────────────────
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” saturates muscles in about 28 days. Matches the cycle.",
    why: "Creatine has the strongest evidence base in the whole stack. It uses its own dedicated transporter (CRT1) with zero documented interactions with anything else here. At a daily maintenance dose, it takes about 28 days for muscles to fully saturate â€” which matches the 30-day cycle almost perfectly: you reach steady state mid-month and hold through the rest. No cycling because phosphocreatine pools decay over weeks if you stop. Monohydrate over fancier forms because it's the cheapest, best-studied, and equally effective.",
    interactions: [
      { kind: "pairs", text: "Prebiotic and Probiotic for gut barrier integrity. Creatine incidentally serves as an energy substrate for gut-lining cells." },
      { kind: "note", text: "Zero documented interactions with any other compound in the stack. Uses its own dedicated transporter (CRT1)." },
    ],
  },
  {
    id: "aminoComplex",
    name: "Amino & ALA Complex (Glycine + Taurine + R-ALA)",
    cat: "Amino & Performance",
    f1: "reduced", f2: "full", w: "full",
    sched: [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,2,2,2,2],
    blurb: "Daily blend â€” but R-ALA is zeroed on Performance Days.",
    why: "Three things share this complex. Glycine and taurine are both at substrate-pool doses (below the threshold for their own felt effects on sleep or cardiovascular tone) â€” they're here for substrate insurance and to cover the methyl-buffer demand from CDP-choline. R-ALA (alpha-lipoic acid) is at its evidence-effective floor for antioxidant and insulin-sensitivity effects. The catch: R-ALA reversibly chelates iron in your gut. So on Performance Days, ALA is zeroed out â€” only the glycine and taurine portions remain. On Recovery Days and washout, all three are at full dose. All three use different transporters from each other and from everything else.",
    interactions: [
      { kind: "separates", text: "The R-ALA portion is zeroed on Performance Days because ALA reversibly chelates iron in your gut. Glycine and taurine portions stay on every day." },
      { kind: "note", text: "Glycine, taurine, and R-ALA each use different transporters â€” no internal competition, and no competition with anything else in the stack." },
    ],
  },
  {
    id: "tyrosine",
    name: "L-Tyrosine",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” independent transport. Critical drug interactions.",
    why: "L-tyrosine is the substrate for both the dopamine pathway (tyrosine â†’ L-DOPA â†’ dopamine) and thyroid hormones. It uses the amino-acid transport system with zero meaningful competition from anything else in the stack. Daily makes sense because catecholamine synthesis is substrate-dependent under acute load â€” you want the pool topped up. CRITICAL: absolutely contraindicated with MAOIs (risk of hypertensive crisis). Caution with SSRIs and SNRIs. Pharmacist review required if you're on any of those.",
    interactions: [
      { kind: "pairs", text: "Iodine, Selenium, and activated B6 for thyroid hormone production. Activated B6 also powers the enzyme that converts tyrosine into dopamine." },
      { kind: "drug", text: "ABSOLUTE contraindication with MAOIs â€” risk of hypertensive crisis from norepinephrine substrate flooding. Caution with SSRIs and SNRIs. Pharmacist review mandatory." },
    ],
  },
  {
    id: "ump",
    name: "Uridine Monophosphate (UMP)",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” pairs with CDP-choline for brain cell membranes.",
    why: "UMP feeds the pyrimidine arm of the Kennedy pathway â€” the system your brain uses to build the membranes of new dendritic spines (the contact points between neurons). It pairs in-product with CDP-choline (which feeds the choline arm of the same pathway). The third arm is DHA (from algal omega-3) â€” that's recommended as a separate paired supplement. UMP uses its own nucleoside transporters, completely independent of everything else. Daily, conservative dose to avoid bumping uric acid.",
    interactions: [
      { kind: "pairs", text: "CDP-Choline (in-product) and DHA (separate algal omega-3 recommended) for the Kennedy pathway â€” the system your brain uses to build neuron membranes." },
      { kind: "pairs", text: "Lion's Mane for NGF amplification â€” UMP upregulates the NGF receptors that Lion's Mane's ligands bind to." },
    ],
  },
  {
    id: "choline",
    name: "CDP-Choline (Citicoline)",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” the cleanest-evidence choline source.",
    why: "Citicoline is chosen over Alpha-GPC and choline bitartrate for three reasons. First, it has the cleanest felt-effect evidence in healthy adults at this dose range. Second, it produces less TMAO than Alpha-GPC. Third, it splits in the gut into cytidine plus choline â€” the cytidine arm actually contributes back to the UMP pool, so it's additive with the UMP dose. Independent transport. It also covers the cholinergic demand from ashwagandha's mild acetylcholinesterase inhibition without needing a second choline source.",
    interactions: [
      { kind: "pairs", text: "UMP (in-product) and DHA (external omega-3) for the Kennedy pathway." },
      { kind: "pairs", text: "B12 and Folate for the methylation cycle (modest secondary methyl-donor stream via the choline â†’ betaine route)." },
      { kind: "note", text: "Cytidine moiety contributes back to the UMP pool â€” additive effect. Cleanest TMAO profile compared to Alpha-GPC." },
    ],
  },
  // ─── BOTANICAL ─────────────────────────────────────────────────────────
  {
    id: "ashwagandha",
    name: "Ashwagandha (KSM-66 root extract)",
    cat: "Botanical",
    f1: "full", f2: "full", w: "off",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : 2)),
    blurb: "Performance Days and Recovery Days. Zeroed during the 4-day washout.",
    why: "Ashwagandha is pulsed: on for 26 days, off for 4. Any compound that's active on the HPA (stress) axis benefits from a periodic receptor adaptation break â€” the washout gives that. The dose is also deliberately reduced from the full clinical dose to soften the upstream push on the thyroid axis (which is dose-dependent), keep the safety margin against liver concerns wide, and trim the powder weight. At this reduced dose, the felt-effect on cortisol is partial (still measurable, just gentler than the full clinical effect). We use the KSM-66 extract specifically â€” standardized to withanolides, root-only (the leaf form contains a different compound that's cytotoxic).",
    interactions: [
      { kind: "pairs", text: "Iodine, Selenium, L-Tyrosine, and B6 for a gentle upstream thyroid axis push. Zeroed during Maintenance for HPA-axis receptor reset." },
      { kind: "drug", text: "May potentiate sedatives (additive GABA effect). Softens thyroid medications â€” flag with your endocrinologist. Mild immunomodulatory effect â€” caution with immunosuppressants. PREGNANCY CONTRAINDICATION regardless of dose." },
    ],
  },
  {
    id: "lionsMane",
    name: "Lion's Mane (fruiting body)",
    cat: "Botanical",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily â€” all 30 days. No cycling.",
    why: "Lion's Mane works by gradually upregulating NGF (nerve growth factor) â€” it's a cumulative, weeks-long effect, not an acute hit. Critically, the gains decay if you stop dosing, so no cycling is allowed: daily on every day including the washout. The dose is intentionally below the canonical research dose, which trades a bit of ligand-side effect for cost and powder weight. The pairing with UMP still works qualitatively though: UMP upregulates the NGF receptors that Lion's Mane's ligands bind to, so receptor-side amplification is preserved at full strength even though ligand-side is partial. We use the fruiting body (which contains the active hericenones) â€” not mycelium products that often contain mostly grain filler.",
    interactions: [
      { kind: "pairs", text: "UMP for NGF amplification â€” Lion's Mane stimulates NGF synthesis (ligand side), UMP upregulates the NGF receptors (receptor side). Both sides of the same pathway." },
      { kind: "note", text: "No documented drug interactions at this dose." },
    ],
  },
];

// ── INTERACTION COLORS (per nutrient interaction kind) ─────────────────
const IxKindC: Record<IxKind, string> = {
  pairs: "#3a7a3a",      // green â€” synergistic
  separates: "#c25e3c",  // orange â€” keep apart
  drug: "#b03030",       // red â€” drug caution
  note: "#666666",       // gray â€” informational
};
const IxKindLabel: Record<IxKind, string> = {
  pairs: "Pairs with",
  separates: "Separated from",
  drug: "Drug interaction",
  note: "Note",
};


// ── COMPONENT ───────────────────────────────────────────────────────────
export function ScienceContent() {
  const [selDay, setSelDay] = useState<number | null>(null);
  const [selNut, setSelNut] = useState<string | null>(null);
  const [catF, setCatF] = useState<Cat | null>(null);

  const schedR = useRef<HTMLDivElement>(null);
  const gridR = useRef<HTMLDivElement>(null);
  const nutR = useRef<HTMLDivElement>(null);

  const scrl = (r: React.RefObject<HTMLDivElement | null>) =>
    r.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const dayNuts = (i: number) => {
    const f = getF(i);
    return N.map((n) => ({
      name: n.name,
      state: f === "F1" ? n.f1 : f === "F2" ? n.f2 : n.w,
      cat: n.cat,
      id: n.id,
    }));
  };

  const sf = selDay !== null ? getF(selDay) : null;
  const filtN = catF ? N.filter((n) => n.cat === catF) : N;

  const labelFor = (s: DayState) =>
    s === "boosted" ? "Boosted" : s === "full" ? "Full" : s === "reduced" ? "Reduced" : "Off";

  const chipBgFor = (s: DayState) =>
    s === "boosted" ? "#b04a26" :
    s === "full"    ? "#e68163" :
    s === "reduced" ? "#f4c4ad" :
                      "#ffffff";

  const chipFgFor = (s: DayState) =>
    s === "off" ? "#999" : s === "reduced" ? "#7c3a1a" : "#ffffff";

  return (
    <div style={{ background: "#fffaeb", color: "#1a1a1a", lineHeight: 1.65 }} className="font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-[#fffaeb] border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-14 md:py-20 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-foreground/60 mb-4">Core Principles</p>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[1.05]">
            Why Every Day Looks A Little Different
          </h1>
          <p className="mt-6 text-base md:text-lg text-foreground/80 leading-relaxed">
            Every nutrient in M3 has its own absorption rules. Some build up over weeks. Some block each other if dosed together. Some stop working if you take them without a break. The page below walks through every scheduling decision &mdash; why each nutrient is on each day, what it&apos;s paired with, what it&apos;s separated from, and what happens during the 4-day washout.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2 text-xs uppercase tracking-wide">
            {[
              ["Schedule", schedR],
              ["Grid", gridR],
              ["Nutrients", nutR],
            ].map(([l, r]) => (
              <button
                key={l as string}
                onClick={() => scrl(r as React.RefObject<HTMLDivElement>)}
                className="rounded-full border border-border bg-white px-4 py-2 font-semibold text-foreground/70 transition-colors hover:border-brand hover:text-brand"
              >
                {l as string}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO / CONTEXT ─────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">The Idea</h2>
          <div className="mt-5 space-y-4 text-base text-foreground/85 leading-relaxed">
            <p>
              Every supplement on the market gives you the same thing every day. But the pharmacokinetics of each nutrient are fundamentally different. Some accumulate in your liver for months. Some compete for absorption. Some need dosing breaks to keep working. The supplement industry just ignores it.
            </p>
            <p>
              The schedule itself is part of the formulation. <strong>When</strong> you take something matters as much as <strong>what</strong> you take.
            </p>
            <p>
              Everything is taken in a single morning dose with a meal. All absorption conflicts are resolved <em>across</em> days, not within a day. The architecture is driven by iron&apos;s shutdown signal (hepcidin): alternate-day dosing lets that signal reset between doses, giving roughly 40% more absorption. That creates two day environments &mdash; an <span style={{ color: FC.F1, fontWeight: 700 }}>Performance Day</span> (clean of competitors, all absorption boosters on) and a <span style={{ color: FC.F2, fontWeight: 700 }}>Recovery Day</span> (full fat-soluble vitamins, manganese, full minerals). A 4-day <span style={{ color: FC.W, fontWeight: 700 }}>Maintenance Washout</span> at the end of every month provides a hepcidin floor reset, an HPA-axis reset, and a manganese safety margin.
            </p>
            <p>
              The 30-day cycle is intentional. It matches the saturation timescales of the strongest-evidence ingredients: creatine reaches muscle saturation in ~28 days; iron&apos;s hepcidin ceiling resets cleanly over 4 days off; fat-soluble vitamin tissue stores are months-deep; activated B-vitamins and CoQ10 hit steady state within 3&ndash;4 weeks. The cycle reaches plateau mid-month and holds, with a clean 4-day rest before re-entering Performance Day 1.
            </p>
          </div>

          {/* THREE-DAY TYPE CARDS */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            {(["F1", "F2", "W"] as const).map((f) => (
              <div
                key={f}
                className="bg-white rounded-lg border border-border overflow-hidden"
                style={{ borderTop: `4px solid ${FC[f]}` }}
              >
                <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                  <span
                    className="text-xs font-extrabold uppercase tracking-wide px-2 py-0.5 rounded"
                    style={{ background: FC[f], color: "white" }}
                  >
                    {f}
                  </span>
                  <span className="text-sm font-bold text-foreground">{FN[f]}</span>
                  <span className="text-[10px] text-foreground/50 ml-auto uppercase">{f === "W" ? "4 days" : "13 days"}</span>
                </div>
                <div className="px-4 py-3 text-sm text-foreground/80 leading-relaxed">
                  {f === "F1" && (
                    <>K2, Iron, beta-carotene Vitamin A, Vitamin C, daily CoQ10. Magnesium switches to <em>taurate</em> form. Calcium, zinc, copper are reduced to protect iron absorption. Amino complex runs <em>without</em> R-ALA. Ashwagandha, Lion&apos;s Mane, B-complex on. Vitamin E, retinyl Vitamin A, manganese, phosphorus are zeroed.</>
                  )}
                  {f === "F2" && (
                    <>Vitamin A retinyl, Vitamin E (boosted), CoQ10, manganese, phosphorus. Calcium, magnesium glycinate, zinc, copper at full dose. Amino complex with full R-ALA. Ashwagandha, Lion&apos;s Mane, B-complex on. K2 and iron are zeroed.</>
                  )}
                  {f === "W" && (
                    <>All daily nutrients keep running (Lion&apos;s Mane, creatine, B-complex, probiotics). Several drop to reduced (Vitamin A to plant form only, Vitamin E reduced, magnesium and zinc reduced). Iron, K2, manganese, and ashwagandha are zeroed for the three resets.</>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground/55 uppercase tracking-wider">
            Meal recommendation: take with a meal that includes fat and carbs for reliable absorption.
          </p>
        </div>
      </section>

      {/* ── 30-DAY SCHEDULE ─────────────────────────────────────────── */}
      <section ref={schedR} className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">30-Day Schedule</h2>
          <p className="mt-2 text-xs uppercase tracking-wider text-foreground/55">Tap any day to see what&apos;s in it.</p>

          <div className="mt-6 grid grid-cols-10 gap-1.5">
            {Array.from({ length: 30 }, (_, i) => {
              const f = getF(i);
              const on = selDay === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelDay(on ? null : i)}
                  className="flex flex-col items-center justify-center py-2 rounded transition-colors border"
                  style={{
                    background: on ? FC[f] : "#ffffff",
                    borderColor: on ? FC[f] : "#e5e5e5",
                    color: on ? "white" : "#1a1a1a",
                  }}
                >
                  <span className="text-sm font-bold leading-none">{i + 1}</span>
                  <span
                    className="text-[8px] font-extrabold uppercase mt-0.5"
                    style={{ color: on ? "rgba(255,255,255,0.85)" : FC[f] }}
                  >
                    {f}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap gap-4 text-[10px] uppercase tracking-wider text-foreground/60">
            {(["F1", "F2", "W"] as const).map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: FC[f] }} />
                {FN[f]}
              </span>
            ))}
          </div>

          {selDay !== null && sf && (
            <div
              className="mt-5 bg-white rounded-lg border border-border overflow-hidden"
              style={{ borderTop: `4px solid ${FC[sf]}` }}
            >
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold" style={{ color: FC[sf] }}>Day {selDay + 1}</span>
                  <span className="text-sm font-bold text-foreground">{FN[sf]}</span>
                </div>
                <button
                  onClick={() => setSelDay(null)}
                  className="text-[10px] uppercase tracking-wider text-foreground/50 hover:text-foreground"
                >
                  close
                </button>
              </div>
              <div className="px-4 py-4">
                {CATS.filter((c) =>
                  dayNuts(selDay).some((n) => n.cat === c && n.state !== "off"),
                ).map((c) => (
                  <div key={c} className="mb-4">
                    <div
                      className="text-[10px] font-extrabold uppercase tracking-[0.1em] mb-1.5"
                      style={{ color: CC[c] }}
                    >
                      {c}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dayNuts(selDay)
                        .filter((n) => n.cat === c && n.state !== "off")
                        .map((n) => (
                          <button
                            key={n.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelNut(selNut === n.id ? null : n.id);
                              scrl(nutR);
                            }}
                            className="flex items-center gap-1.5 rounded border border-border bg-[#fffaeb] px-2.5 py-1 text-xs text-foreground hover:border-brand"
                          >
                            <span>{n.name}</span>
                            <span
                              className="rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider"
                              style={{
                                background: chipBgFor(n.state),
                                color: chipFgFor(n.state),
                                border: n.state === "off" ? "1px solid #ddd" : "none",
                              }}
                            >
                              {labelFor(n.state)}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
                {dayNuts(selDay).some((n) => n.state === "off") && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] mb-1.5 text-foreground/50">
                      Zeroed today
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dayNuts(selDay)
                        .filter((n) => n.state === "off")
                        .map((n) => (
                          <span
                            key={n.id}
                            className="rounded border border-border bg-[#fffaeb] px-2 py-1 text-[11px] text-foreground/55"
                          >
                            {n.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── NUTRIENT SCHEDULE GRID ─────────────────────────────────── */}
      <section ref={gridR} className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Nutrient Schedule Grid</h2>
          <p className="mt-2 text-xs uppercase tracking-wider text-foreground/55">
            Every nutrient across all 30 days. Tap a row for its full reasoning.
          </p>

          {/* Heatmap legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-foreground/65">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: HC[3] }} />
              Boosted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: HC[2] }} />
              Full
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: HC[1] }} />
              Reduced
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: HC[0], border: "1.5px dashed #b8b8b8" }} />
              Zeroed
            </span>
          </div>

          <div className="mt-5 overflow-x-auto -mx-4 px-4">
            <table className="border-collapse w-full min-w-[760px]">
              <thead>
                <tr>
                  <th className="text-left p-1 text-[10px] uppercase tracking-wider text-foreground/55 font-normal sticky left-0 bg-[#fffaeb] z-10 min-w-[190px]">
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
                        <td colSpan={31} className="pt-3 pb-1 sticky left-0 bg-[#fffaeb]">
                          <span
                            className="text-[10px] font-extrabold uppercase tracking-[0.1em]"
                            style={{ color: CC[cat] }}
                          >
                            {cat}
                          </span>
                        </td>
                      </tr>
                      {items.map((n) => (
                        <tr
                          key={n.id}
                          onClick={() => {
                            setSelNut(selNut === n.id ? null : n.id);
                            scrl(nutR);
                          }}
                          className="cursor-pointer hover:bg-white/40"
                        >
                          <td className="py-1 px-1 text-[11px] text-foreground/85 sticky left-0 bg-[#fffaeb] z-[5] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {n.name}
                          </td>
                          {n.sched.map((v, i) => (
                            <td key={i} className="text-center px-0 py-0.5">
                              <span
                                className="inline-block w-3.5 h-3.5 rounded-sm"
                                style={{
                                  background: v > 0 ? HC[v] : HC[0],
                                  border: v === 0 ? "1.5px dashed #b8b8b8" : "none",
                                }}
                              />
                            </td>
                          ))}
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

      {/* ── NUTRIENT REFERENCE ─────────────────────────────────────── */}
      <section ref={nutR} className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Every Nutrient, Explained</h2>
          <p className="mt-2 text-xs uppercase tracking-wider text-foreground/55">
            Tap a nutrient to see its full reasoning &mdash; why daily, why pulsed, what it pairs with, what it&apos;s separated from.
          </p>

          {/* Category filter */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setCatF(null);
                setSelNut(null);
              }}
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider border transition-colors"
              style={{
                background: catF === null ? "#1a1a1a" : "white",
                color: catF === null ? "white" : "#555",
                borderColor: catF === null ? "#1a1a1a" : "#e5e5e5",
              }}
            >
              All
            </button>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCatF(catF === c ? null : c);
                  setSelNut(null);
                }}
                className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider border transition-colors"
                style={{
                  background: catF === c ? CC[c] : "white",
                  color: catF === c ? "white" : "#555",
                  borderColor: catF === c ? CC[c] : "#e5e5e5",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Nutrient cards */}
          <div className="mt-5 grid gap-2">
            {filtN.map((n) => {
              const open = selNut === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelNut(open ? null : n.id)}
                  className="bg-white rounded-lg border overflow-hidden cursor-pointer transition-colors"
                  style={{ borderColor: open ? CC[n.cat] : "#e5e5e5" }}
                >
                  {!open ? (
                    <div className="px-4 py-3 flex items-center gap-3">
                      <span
                        className="inline-block w-2 h-2 rounded-full shrink-0"
                        style={{ background: CC[n.cat] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-foreground text-sm">{n.name}</div>
                        <div className="text-[12px] text-foreground/65 truncate">{n.blurb}</div>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 shrink-0">
                        {(["F1", "F2", "W"] as const).map((f) => {
                          const s = f === "F1" ? n.f1 : f === "F2" ? n.f2 : n.w;
                          return (
                            <span
                              key={f}
                              title={`${FN[f]}: ${labelFor(s)}`}
                              className="rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider"
                              style={{
                                background: chipBgFor(s),
                                color: chipFgFor(s),
                                border: s === "off" ? "1px solid #ddd" : "none",
                                minWidth: 26,
                                textAlign: "center",
                              }}
                            >
                              {f}
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-brand text-xl font-bold leading-none ml-1">+</span>
                    </div>
                  ) : (
                    <div>
                      <div className="px-4 py-4 border-b border-border">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span
                            className="rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
                            style={{ background: CC[n.cat], color: "white" }}
                          >
                            {n.cat}
                          </span>
                          <span className="text-base font-bold text-foreground">{n.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelNut(null);
                            }}
                            className="ml-auto text-[10px] uppercase tracking-wider text-foreground/50 hover:text-foreground"
                          >
                            close
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {(["F1", "F2", "W"] as const).map((f) => {
                            const s = f === "F1" ? n.f1 : f === "F2" ? n.f2 : n.w;
                            return (
                              <div
                                key={f}
                                className="rounded p-2 text-center bg-[#fffaeb]"
                                style={{ borderTop: `2px solid ${FC[f]}` }}
                              >
                                <div
                                  className="text-[10px] font-extrabold uppercase tracking-wider"
                                  style={{ color: FC[f] }}
                                >
                                  {FN[f]}
                                </div>
                                <div className="mt-1 text-sm font-bold text-foreground">
                                  {labelFor(s)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="px-4 py-4">
                        <p className="text-sm text-foreground/85 leading-relaxed">{n.why}</p>

                        {n.interactions.length > 0 && (
                          <div className="mt-5 pt-4 border-t border-border">
                            <div className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-foreground/60 mb-3">
                              Interactions
                            </div>
                            <ul className="space-y-2.5">
                              {n.interactions.map((ix, i) => (
                                <li key={i} className="flex gap-2.5">
                                  <span
                                    className="shrink-0 mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider whitespace-nowrap"
                                    style={{
                                      background: `${IxKindC[ix.kind]}1A`,
                                      color: IxKindC[ix.kind],
                                    }}
                                  >
                                    {IxKindLabel[ix.kind]}
                                  </span>
                                  <span className="text-sm text-foreground/85 leading-relaxed">
                                    {ix.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OPEN CONSIDERATIONS ──────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Open Considerations</h2>
          <p className="mt-2 text-xs uppercase tracking-wider text-foreground/55">
            Honest tradeoffs we&apos;ve made on purpose.
          </p>

          <div className="mt-6 space-y-5 text-sm text-foreground/80 leading-relaxed">
            <p>
              <strong className="text-foreground">Sub-clinical amino doses are intentional.</strong>{" "}
              Glycine and taurine in the amino complex are below the doses where their primary felt effects appear (the doses that move sleep or cardiovascular tone). They&apos;re here for substrate-pool insurance and label coverage, not the full pharmacological effect. The R-ALA portion of the same complex <em>is</em> at the evidence-effective floor for its antioxidant and insulin-sensitivity effects. Anyone wanting felt-effect glycine or taurine should dose those separately at evening.
            </p>
            <p>
              <strong className="text-foreground">Magnesium is at a felt-effect dose on Performance Days.</strong>{" "}
              The taurate form on Performance Days delivers a meaningful side-load of taurine, pushing Performance Days into felt-effect territory. Recovery Days and washout magnesium is sub-felt but tissue-sufficient (intracellular magnesium lasts ~4 months &mdash; daily fluctuation doesn&apos;t matter).
            </p>
            <p>
              <strong className="text-foreground">Sodium is nominal on purpose.</strong>{" "}
              The average American gets far over the limit from food. Supplemental sodium would be redundant for most people and counterproductive for the ~24% with high blood pressure. Potassium, on the other hand, is genuinely deficient in most diets &mdash; so the potassium dose is meaningful. Endurance athletes and keto folks should add a sodium product around training; that&apos;s not what this base supplement is for.
            </p>
            <p>
              <strong className="text-foreground">Thyroid axis is gently active.</strong>{" "}
              Ashwagandha at the reduced dose delivers a softened upstream push, keeping the thyroid stack (iodine + selenium + tyrosine + B6) on the moderate end. Most users will see modest T3 changes rather than the pronounced shifts at full clinical ashwagandha dosing. Caution still warranted in known hyperthyroid populations, Hashimoto&apos;s, or anyone on levothyroxine. Baseline thyroid panel advisable for users new to thyroid support. The 4-day washout gives the axis additional breathing room.
            </p>
            <p>
              <strong className="text-foreground">Botanical doses are intentionally sub-canonical.</strong>{" "}
              Ashwagandha is reduced from the full clinical dose; Lion&apos;s Mane is below the canonical research dose. Both expected to produce partial effects. This is a deliberate trade: smaller felt effect for better thyroid safety margin (ashwagandha), reduced liver concern (ashwagandha), and reduced powder bulk (both). Anyone seeking maximal effects from either should add them separately at the full evidence dose.
            </p>
            <p>
              <strong className="text-foreground">Iron screening matters.</strong>{" "}
              The pulsed iron schedule is well-suited to menstruating women and most adults. For men over 40 and post-menopausal women with no known losses, a baseline ferritin check is recommended to rule out hemochromatosis (1 in 200 prevalence in Northwestern European ancestry).
            </p>
            <p>
              <strong className="text-foreground">Pair with an omega-3 supplement.</strong>{" "}
              Omega-3 (EPA + DHA) is intentionally not in this product &mdash; it would add too much weight in a powder format for a single ingredient. Pair this with a daily algal omega-3 to complete the Kennedy-pathway cognitive synergy with UMP + CDP-choline, and to pick up the cardiovascular, inflammatory, and mood evidence that EPA+DHA carries.
            </p>
            <p>
              <strong className="text-foreground">Drug interactions requiring review.</strong>{" "}
              L-Tyrosine + MAOIs/SSRIs (critical), K2 + warfarin (critical), iron + levothyroxine/bisphosphonates/quinolones (high), Ashwagandha + sedatives/thyroid meds/immunosuppressants (moderate), CoQ10 + warfarin (moderate). Ashwagandha contraindicated in pregnancy regardless of dose. Pharmacist and physician review recommended for anyone on prescription medication.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
