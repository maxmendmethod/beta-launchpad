"use client";

import React, { useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   M3 SCIENCE PAGE — themed version of the M3 Formulator Brief.
   No specific weights or dosages. Only directional language: increased,
   decreased, boosted, reduced, pulsed, zeroed, paired, separated, etc.
   ───────────────────────────────────────────────────────────────────────── */

// Day type helpers (26 days alternating F1/F2, then 4-day washout W)
const getF = (i: number) => (i >= 26 ? "W" : i % 2 === 0 ? "F1" : "F2");

// Traffic-light palette themed to M3 brand
const FC: Record<string, string> = {
  F1: "#e68163", // Iron Day — brand orange
  F2: "#7d9b6a", // Rest Day — sage green
  W:  "#c9b07a", // Maintenance — soft cream/gold
};
const FN: Record<string, string> = {
  F1: "Iron Day",
  F2: "Rest Day",
  W:  "Maintenance",
};

// Heatmap colors for the schedule grid
const HC: Record<number, string> = {
  0: "#ffffff", // off
  1: "#f4c4ad", // reduced (faded brand)
  2: "#e68163", // full (brand)
  3: "#b04a26", // boosted (deep brand)
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

type Nutrient = {
  id: string;
  name: string;
  cat: Cat;
  // What happens on each day type — directional only.
  f1: DayState;
  f2: DayState;
  w: DayState;
  // Per-day schedule values (0=off, 1=reduced, 2=full, 3=boosted) for the heatmap.
  sched: number[];
  // One-line summary for the closed card
  blurb: string;
  // The full reasoning, 3rd-grade-readable but smart.
  why: string;
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
    why: "Your body parks D3 in fat tissue for weeks, so timing within the day barely matters — what matters is that you're feeding the reservoir consistently. We keep it on every single day at the same amount. D3 also pairs really well with K2 at the small doses used here, so they ride together without elbowing each other for absorption. D3 makes the proteins your bones use; K2 turns those proteins on. Daily on both is what completes the loop.",
  },
  {
    id: "k2",
    name: "Vitamin K2 (MK-7)",
    cat: "Fat-Soluble",
    f1: "full", f2: "off", w: "off",
    sched: altF1Only(),
    blurb: "Pulsed onto Iron Days only — separated from Vitamin E.",
    why: "Vitamin K2 and Vitamin E are enemies at the dosage scale they live at in a stack like this. E elbows K2 out of the absorption truck (called a chylomicron) AND directly blocks the enzyme K2 needs to work. We can't have them on the same day. So K2 is exiled to Iron Days and E lives on Rest Days. K2's effects last about 72 hours per dose, so taking it every other day is enough — your body bridges the gap. During the 4-day washout, K2 still stays zero because even reduced E is too much company for K2 to coexist with.",
  },
  {
    id: "vitA",
    name: "Vitamin A (β-Carotene + Retinyl)",
    cat: "Fat-Soluble",
    f1: "reduced", f2: "boosted", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : i % 2 === 0 ? 1 : 2)),
    blurb: "Plant form runs daily. Animal form is pulsed onto Rest Days.",
    why: "We split Vitamin A into two forms so they can each do a different job. The plant form (beta-carotene) is on every single day because on Iron Days it actually helps iron get absorbed — it grabs onto iron in the gut and keeps it dissolved, adding meaningful extra uptake. The animal form (retinyl) is added only on Rest Days, on top of the baseline plant dose. Retinyl is kept off Iron Days because it would compete with the iron-day absorption setup, and it's only needed sometimes anyway — retinyl stays in your liver for over four months, so your tissues are completely indifferent to whether it's daily or every other day. During washout, the animal form drops to zero again to ease long-term load.",
  },
  {
    id: "vitE",
    name: "Vitamin E (Mixed Tocopherols)",
    cat: "Fat-Soluble",
    f1: "off", f2: "boosted", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : i % 2 === 0 ? 0 : 2)),
    blurb: "Boosted on Rest Days, reduced on washout, zero on Iron Days.",
    why: "Vitamin E is held off Iron Days because it fights K2 — see the K2 card for the full story. On Rest Days, E gets its full boosted dose. On the 4-day washout, E is reduced because K2 isn't around to be antagonized, and your fat tissue holds onto E for about six months — daily dosing isn't necessary. We use mixed tocopherols (alpha plus gamma plus delta) instead of just alpha, because gamma has its own anti-inflammatory job that alpha alone can't do. Daily Vitamin C is the partner that recycles spent E back into the active form — these two are functionally linked.",
  },
  {
    id: "coq10",
    name: "CoQ10 (Ubiquinol)",
    cat: "Fat-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, every day. Smoother than pulsing.",
    why: "Originally CoQ10 was pulsed onto Rest Days and washout only, to avoid any theoretical interaction with iron in the gut. We switched it to a smaller daily dose because the math is cleaner: the half-life supports daily better than every-other-day, and total monthly exposure is the same with smoother blood levels. The theoretical iron concern turned out to be a non-issue in practice — even if some converts to the oxidized form in the gut, that form is still biologically useful. The reduced (ubiquinol) form is chosen over the oxidized (ubiquinone) because it absorbs 3–4× better, especially in people over 40 where your body's own production has dropped meaningfully.",
  },
  // ─── WATER-SOLUBLE ─────────────────────────────────────────────────────
  {
    id: "vitC",
    name: "Vitamin C",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : 3)),
    blurb: "Daily for two jobs — slightly trimmed during washout.",
    why: "Vitamin C works two completely different jobs depending on the day. On Iron Days, it converts iron from the hard-to-absorb form to the easy-to-absorb form right in your gut, giving a 4–6× boost in iron absorption. On Rest Days, it recycles spent Vitamin E back into the active form — a partnership that keeps the antioxidant loop running. Because the transporter that pulls C into your cells saturates at a relatively low dose, anything above that level stays in your gut — which is exactly where iron needs it. During washout, C is trimmed slightly because iron is off and demand is a little lower.",
  },
  {
    id: "bComplex",
    name: "B-Complex (B1/B2/B3/B5/P-5-P)",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, all of them — each on its own private transporter.",
    why: "Every B vitamin uses its own dedicated transporter — different from any mineral, different from any fat-soluble. Zero competition with anything else in the stack. Daily is right because the half-lives are all over the map: some B's deplete within hours, others last weeks. Daily covers the short ones without overshooting the long ones. We use the activated form of B6 (P-5-P) instead of the cheap form because it skips a conversion step in your liver — about 30% of people have reduced ability to do that conversion. B6 also matters because it powers the enzyme that turns L-tyrosine into dopamine.",
  },
  {
    id: "b12",
    name: "B12 (Sublingual Methylcobalamin)",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, under the tongue — bypasses the gut entirely.",
    why: "Sublingual (under-the-tongue) absorption skips the stomach, skips the intrinsic-factor system, skips every gut interaction this stack has to manage. The methyl form is already activated and ready to use. Even though B12 stores in your liver for years, daily dosing makes sense because how much you absorb from a sublingual dose varies a lot — daily smooths that out.",
  },
  {
    id: "folate",
    name: "Folate (5-MTHF)",
    cat: "Water-Soluble",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily, activated form — works for everyone including MTHFR variants.",
    why: "The activated form (5-MTHF) uses its own transporter that's completely independent of everything else in this stack. It also bypasses the MTHFR genetic variants that limit how well the cheap form (folic acid) actually gets used — about 10–15% of people are homozygous for those variants. Daily is right because folate is small, easily handled, and pairs with B12 and choline to recycle homocysteine back into methionine.",
  },
  // ─── MINERALS ──────────────────────────────────────────────────────────
  {
    id: "iron",
    name: "Iron Bisglycinate",
    cat: "Mineral",
    f1: "full", f2: "off", w: "off",
    sched: altF1Only(),
    blurb: "The keystone. Pulsed onto Iron Days. Zeroed during washout.",
    why: "Iron drives the entire architecture of this protocol — both the alternating Iron Day / Rest Day pattern AND the 4-day washout. Here's why: when you take iron, a signal called hepcidin spikes and shuts off iron absorption for roughly 24 hours. If you take iron daily, you're fighting your own shutdown signal. Alternate-day dosing lets hepcidin reset between doses, giving about 40% more total absorption from the same amount of iron. Beyond that, after weeks of continuous use even alternate-day dosing slowly raises your baseline hepcidin ceiling. The 4-day pure break at the end of each month resets that ceiling, so the next month's first dose absorbs at its monthly maximum. Iron is paired with a four-way absorption booster on every Iron Day: Vitamin C (converts iron to the absorbable form), beta-carotene (forms a soluble iron complex), the bisglycinate form itself (partial bypass of the competition gate), and L. plantarum 299v in the probiotic blend (enhances solubility). On the same days, every potential competitor is either reduced, switched to a non-competing form, or zeroed.",
  },
  {
    id: "ca",
    name: "Calcium Citrate",
    cat: "Mineral",
    f1: "reduced", f2: "full", w: "full",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Reduced on Iron Days, full on Rest Days and washout.",
    why: "Calcium and iron share a competition gate (called DMT1) at the cells lining your small intestine. At full doses they meaningfully interfere. On Iron Days, calcium is reduced so the interference drops below 6% — iron stays absorbed. On Rest Days and washout, calcium goes to its full dose without any iron present to compete. Citrate form is used because it works without strong stomach acid, and it also grabs onto oxalate in your gut to reduce kidney-stone risk. This is supplemental calcium — dietary calcium is still the primary source.",
  },
  {
    id: "mg",
    name: "Magnesium (Taurate / Glycinate)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 1 : 2)),
    blurb: "Two different forms — one for Iron Days, one for everything else.",
    why: "This was an interesting puzzle. Iron bisglycinate and magnesium glycinate both use the same gut transporter (called PepT1). Direct fight. The fix isn't to drop the magnesium dose — it's to switch the form. On Iron Days, magnesium is in the taurate form, which uses a totally different transporter (TauT). Problem solved. On Rest Days and washout, magnesium switches to the glycinate form (because there's no iron to compete with). Bonus: the Iron Day form (magnesium taurate) delivers a meaningful side dose of taurine — combined with the amino complex it pushes Iron Days into felt-effect taurine territory. The washout dose is slightly reduced because your intracellular magnesium lasts about four months — your tissues don't care about a small daily fluctuation.",
  },
  {
    id: "zn",
    name: "Zinc Bisglycinate",
    cat: "Mineral",
    f1: "reduced", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Reduced on Iron Days, full on Rest Days.",
    why: "Zinc and iron compete at the same shared gate (DMT1). At full zinc plus iron together, you'd lose meaningful iron absorption. On Iron Days, zinc is reduced so the competition drops to under 5% — iron stays absorbed. On Rest Days, zinc gets its full dose with no iron to compete with. We can get away with this fluctuation because your whole-body zinc lasts about 280 days — your tissues are indifferent to whether the dose is the same every day.",
  },
  {
    id: "cu",
    name: "Copper Bisglycinate",
    cat: "Mineral",
    f1: "reduced", f2: "full", w: "reduced",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 1 : 2)),
    blurb: "Tracks zinc inversely — keeps the safe ratio.",
    why: "The ratio of zinc to copper has to stay under 15:1 for safety. Copper tracks zinc inversely every single day — when zinc goes up, copper goes up; when zinc goes down, copper goes down. That keeps the ratio safe on every day type. Same bisglycinate form as zinc and iron for transporter consistency.",
  },
  {
    id: "mn",
    name: "Manganese (Bisglycinate)",
    cat: "Mineral",
    f1: "off", f2: "full", w: "off",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : i % 2 === 0 ? 0 : 2)),
    blurb: "Banished to Rest Days only. Zeroed everywhere else.",
    why: "Manganese versus iron is the strongest fight among all the divalent minerals at the shared gate (DMT1) — stronger than zinc-vs-iron or copper-vs-iron. Putting them on the same day would crush both. So manganese is exiled to Rest Days only. During washout it's zeroed too, even though it's not fighting anything — your whole-body manganese lasts about 37 days, so getting it just 13 days a month is plenty. The 4-day washout also adds a safety margin against any long-term basal ganglia accumulation (which is a chronic-high-dose concern, not a normal-dose concern, but the pulsing keeps the margin wide).",
  },
  {
    id: "se",
    name: "Selenium (Selenomethionine)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — the selenium taxi refreshes every 24 hours.",
    why: "Selenoprotein P (the protein that ferries selenium around your body) turns over about every 24 hours. So daily dosing fits the kinetics. Selenomethionine moves via the amino-acid transport system at tiny molar amounts — negligible competition with anything else. It's also the cofactor your body uses to convert thyroid hormone from T4 to T3.",
  },
  {
    id: "iodine",
    name: "Iodine (Potassium Iodide)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — the thyroid has its own private transporter.",
    why: "Iodine uses a transporter dedicated entirely to iodide (called NIS, in the thyroid). Complete independence from everything else. Iodine plus selenium plus L-tyrosine completes the thyroid-hormone production set. Iodine is the rate-limiting substrate in most diets that don't include iodized salt or seaweed.",
  },
  {
    id: "mo",
    name: "Molybdenum (Sodium Molybdate)",
    cat: "Mineral",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — independent transporter, low dose, safe.",
    why: "Molybdenum has its own dedicated transporter — zero competition with any other mineral in the stack. Helps process sulfites (relevant for high-sulfur-food and sulfite-preservative tolerance) and purines. Most diets cover this from legumes, grains, and organ meats, so this dose is insurance-tier — completes the trace-mineral picture. The only meaningful interaction would be with copper, but only at chronic high doses, far above what's used here.",
  },
  {
    id: "p",
    name: "Phosphorus (Monosodium Phosphate)",
    cat: "Mineral",
    f1: "off", f2: "full", w: "full",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 2 : i % 2 === 0 ? 0 : 2)),
    blurb: "Rest Days and washout. Zeroed on Iron Days.",
    why: "Phosphate can grab onto iron in your gut and pull it out of absorption. To keep Iron Days clean, phosphorus is zeroed there. On Rest Days and washout, it's on at its small structural-mineral dose. Most people get plenty of phosphorus from food (dairy, meat, grains, processed foods) — this is here mainly for the bone-mineral ratio with calcium and for label completeness, not as a pharmacological dose.",
  },
  // ─── ELECTROLYTE ───────────────────────────────────────────────────────
  {
    id: "electrolytes",
    name: "Electrolytes (K-dominant, minimal Na)",
    cat: "Electrolyte",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — heavy on potassium, nominal on sodium.",
    why: "The average American already gets well over the daily sodium limit from food, and actively too much for the ~24% of adults with high blood pressure. So supplemental sodium is intentionally nominal here — a trace amount, not a meaningful dose. Potassium, meanwhile, is genuinely deficient in most American diets, so the potassium dose is meaningful. Endurance athletes, fasting people, low-carb or keto folks, and anyone doing sweat-heavy work should add a separate electrolyte drink around training — that's not what this base supplement is for.",
  },
  // ─── GUT ───────────────────────────────────────────────────────────────
  {
    id: "probiotics",
    name: "Probiotic Blend",
    cat: "Gut",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — these strains wash out without re-dosing.",
    why: "Transient probiotic strains wash out of your gut in 1–3 weeks if you stop re-dosing them — so daily is required to maintain any effect. We picked a blend with a specific strain (L. plantarum 299v) that boosts iron absorption on Iron Days through a small molecule it produces. We also chose strains that are low TMA producers (TMA is a metabolite that becomes TMAO, which you don't want elevated) to keep that pathway quiet.",
  },
  {
    id: "prebiotic",
    name: "Prebiotic Blend (PHGG + GOS + XOS)",
    cat: "Gut",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — three fibers feeding three different microbe groups.",
    why: "Different gut microbes prefer different fibers. Instead of one big dose of one fiber, this is three smaller doses of three different ones — each effective at its specific dose for its specific target microbes. The blend reaches a broader spread of populations across the length of your colon than a single substrate would. None of these fibers chelate minerals (which is a problem with some fiber sources like phytate-rich ones).",
  },
  {
    id: "enzymes",
    name: "Digestive Enzymes",
    cat: "Gut",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — local effect in the gut, no systemic competition.",
    why: "Digestive enzymes act locally in your gut and aren't absorbed systemically — so they don't interact with anything else in the stack. The lipase portion is the important one here: it helps form micelles for the fat-soluble vitamins (A, E, K2, CoQ10) so they actually get absorbed from the one daily meal this is taken with. The protease portion helps liberate amino acids from whatever you're eating alongside.",
  },
  // ─── AMINO & PERFORMANCE ───────────────────────────────────────────────
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — saturates muscles in about 28 days. Matches the cycle.",
    why: "Creatine has the strongest evidence base in the whole stack. It uses its own dedicated transporter (CRT1) with zero documented interactions with anything else here. At a daily maintenance dose, it takes about 28 days for muscles to fully saturate — which matches the 30-day cycle almost perfectly: you reach steady state mid-month and hold through the rest. No cycling because phosphocreatine pools decay over weeks if you stop. Monohydrate over fancier forms because it's the cheapest, best-studied, and equally effective.",
  },
  {
    id: "aminoComplex",
    name: "Amino & ALA Complex (Glycine + Taurine + R-ALA)",
    cat: "Amino & Performance",
    f1: "reduced", f2: "full", w: "full",
    sched: [1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,2,2,2,2],
    blurb: "Daily blend — but R-ALA is zeroed on Iron Days.",
    why: "Three things share this complex. Glycine and taurine are both at substrate-pool doses (below the threshold for their own felt effects on sleep or cardiovascular tone) — they're here for substrate insurance and to cover the methyl-buffer demand from CDP-choline. R-ALA (alpha-lipoic acid) is at its evidence-effective floor for antioxidant and insulin-sensitivity effects. The catch: R-ALA reversibly chelates iron in your gut. So on Iron Days, ALA is zeroed out — only the glycine and taurine portions remain. On Rest Days and washout, all three are at full dose. All three use different transporters from each other and from everything else.",
  },
  {
    id: "tyrosine",
    name: "L-Tyrosine",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — independent transport. Critical drug interactions.",
    why: "L-tyrosine is the substrate for both the dopamine pathway (tyrosine → L-DOPA → dopamine) and thyroid hormones. It uses the amino-acid transport system with zero meaningful competition from anything else in the stack. Daily makes sense because catecholamine synthesis is substrate-dependent under acute load — you want the pool topped up. CRITICAL: absolutely contraindicated with MAOIs (risk of hypertensive crisis). Caution with SSRIs and SNRIs. Pharmacist review required if you're on any of those.",
  },
  {
    id: "ump",
    name: "Uridine Monophosphate (UMP)",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — pairs with CDP-choline for brain cell membranes.",
    why: "UMP feeds the pyrimidine arm of the Kennedy pathway — the system your brain uses to build the membranes of new dendritic spines (the contact points between neurons). It pairs in-product with CDP-choline (which feeds the choline arm of the same pathway). The third arm is DHA (from algal omega-3) — that's recommended as a separate paired supplement. UMP uses its own nucleoside transporters, completely independent of everything else. Daily, conservative dose to avoid bumping uric acid.",
  },
  {
    id: "choline",
    name: "CDP-Choline (Citicoline)",
    cat: "Amino & Performance",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — the cleanest-evidence choline source.",
    why: "Citicoline is chosen over Alpha-GPC and choline bitartrate for three reasons. First, it has the cleanest felt-effect evidence in healthy adults at this dose range. Second, it produces less TMAO than Alpha-GPC. Third, it splits in the gut into cytidine plus choline — the cytidine arm actually contributes back to the UMP pool, so it's additive with the UMP dose. Independent transport. It also covers the cholinergic demand from ashwagandha's mild acetylcholinesterase inhibition without needing a second choline source.",
  },
  // ─── BOTANICAL ─────────────────────────────────────────────────────────
  {
    id: "ashwagandha",
    name: "Ashwagandha (KSM-66 root extract)",
    cat: "Botanical",
    f1: "full", f2: "full", w: "off",
    sched: Array.from({ length: 30 }, (_, i) => (i >= 26 ? 0 : 2)),
    blurb: "Iron Days and Rest Days. Zeroed during the 4-day washout.",
    why: "Ashwagandha is pulsed: on for 26 days, off for 4. Any compound that's active on the HPA (stress) axis benefits from a periodic receptor adaptation break — the washout gives that. The dose is also deliberately reduced from the full clinical dose to soften the upstream push on the thyroid axis (which is dose-dependent), keep the safety margin against liver concerns wide, and trim the powder weight. At this reduced dose, the felt-effect on cortisol is partial (still measurable, just gentler than the full clinical effect). We use the KSM-66 extract specifically — standardized to withanolides, root-only (the leaf form contains a different compound that's cytotoxic).",
  },
  {
    id: "lionsMane",
    name: "Lion's Mane (fruiting body)",
    cat: "Botanical",
    f1: "full", f2: "full", w: "full",
    sched: daily(2),
    blurb: "Daily — all 30 days. No cycling.",
    why: "Lion's Mane works by gradually upregulating NGF (nerve growth factor) — it's a cumulative, weeks-long effect, not an acute hit. Critically, the gains decay if you stop dosing, so no cycling is allowed: daily on every day including the washout. The dose is intentionally below the canonical research dose, which trades a bit of ligand-side effect for cost and powder weight. The pairing with UMP still works qualitatively though: UMP upregulates the NGF receptors that Lion's Mane's ligands bind to, so receptor-side amplification is preserved at full strength even though ligand-side is partial. We use the fruiting body (which contains the active hericenones) — not mycelium products that often contain mostly grain filler.",
  },
];

// ── INTERACTIONS ────────────────────────────────────────────────────────
type IxType = "resolved" | "synergy" | "interact" | "accepted";
type IxSev = "critical" | "high" | "moderate" | "low";

type Interaction = {
  cat: string;
  a: string;
  b: string;
  type: IxType;
  sev: IxSev;
  note: string;
};

const IX: Interaction[] = [
  {
    cat: "Iron Absorption",
    a: "Iron",
    b: "Vitamin C + β-Carotene + Bisglycinate + L. plantarum 299v",
    type: "synergy",
    sev: "critical",
    note: "A four-way iron-absorption booster runs on every Iron Day. Vitamin C converts iron into the form your gut can absorb (4–6× more uptake). Beta-carotene forms a soluble iron complex that prevents iron from falling out of solution in your gut. The bisglycinate form of iron itself gets a partial bypass of the main competition gate. And a specific probiotic strain in the blend (L. plantarum 299v) produces a molecule that further enhances iron solubility. Together these stack up to far more absorbed iron than the same dose of iron alone.",
  },
  {
    cat: "Iron Absorption",
    a: "Iron",
    b: "Calcium / Magnesium / Zinc / Manganese / Phosphorus / ALA",
    type: "resolved",
    sev: "critical",
    note: "Every potential Iron Day competitor is handled: calcium is reduced to where interference is negligible; magnesium switches to the taurate form (totally different transporter — no fight); zinc is reduced to where interference drops under 5%; manganese is zeroed because it's the strongest divalent competitor; phosphorus is zeroed because it could grab onto iron in your gut; and the R-ALA portion of the amino complex is zeroed because ALA reversibly chelates iron.",
  },
  {
    cat: "Fat-Soluble",
    a: "K2 (MK-7)",
    b: "Vitamin A retinyl + Vitamin E + CoQ10",
    type: "resolved",
    sev: "critical",
    note: "K2 is on Iron Days only; retinyl Vitamin A and Vitamin E are on Rest Days only. The reason: Vitamin E exerts a dual antagonism against K2 — it competes for the absorption truck (chylomicron) AND directly blocks the enzyme K2 needs to do its job. The two simply can't share a day. CoQ10 is now consolidated to daily at a smaller dose; the load is well below saturation and there's no documented CoQ10–K2 antagonism. During washout, Vitamin E is reduced but the ratio against any K2 would still be antagonistic — so K2 stays zeroed there. The long half-life of MK-7 means it bridges the 4-day break.",
  },
  {
    cat: "Fat-Soluble",
    a: "Vitamin D3",
    b: "K2 + Magnesium taurate + Calcium + Phosphorus",
    type: "synergy",
    sev: "critical",
    note: "Iron Days double as 'bone-axis days.' D3 makes the proteins your bones use (osteocalcin and MGP). K2 turns them on via an enzyme called gamma-glutamyl carboxylase. Magnesium taurate provides the catalytic cofactor your body needs to activate D3 itself, plus broader cofactor roles in bone metabolism (ATP-dependent osteoblast activity, PTH signaling). Calcium is the structural mineral. On Rest Days, phosphorus joins as the calcium-phosphorus structural partner for bone formation.",
  },
  {
    cat: "Fat-Soluble",
    a: "Vitamin E",
    b: "Vitamin C",
    type: "synergy",
    sev: "critical",
    note: "Vitamin C donates an electron to spent Vitamin E (specifically the tocopheroxyl radical), regenerating it back to its active form. Daily Vitamin C keeps the recycling capacity in excess of Vitamin E's burn rate, even on the Rest Days when Vitamin E peaks. The two are functionally yoked.",
  },
  {
    cat: "Fat-Soluble",
    a: "CoQ10 + Vitamin A retinyl + Vitamin E",
    b: "Chylomicron sharing on Rest Days",
    type: "accepted",
    sev: "low",
    note: "On Rest Days, CoQ10, retinyl Vitamin A, and Vitamin E all share the same chylomicron packaging system in your gut. The combined fat-soluble load is well below saturation, so this is fine. The lipase in the digestive enzyme blend supports good micelle formation. Taking the dose with a meal that includes some fat is recommended for reliable absorption of any of these fat-solubles.",
  },
  {
    cat: "Mineral",
    a: "Manganese",
    b: "Iron and other divalents",
    type: "resolved",
    sev: "high",
    note: "Manganese shares the same competition gate (DMT1) with iron, zinc, and copper. Manganese-vs-iron is the strongest competition among them. Solution: manganese is exiled to Rest Days only — zero overlap with iron. On Rest Days, the combined mineral load is still well within safe concurrent absorption thresholds, and the bisglycinate forms reduce dependence on that one specific transporter.",
  },
  {
    cat: "Mineral",
    a: "Calcium",
    b: "Magnesium",
    type: "resolved",
    sev: "low",
    note: "On Iron Days, calcium is reduced and magnesium is in the taurate form (uses a separate transporter from calcium). On Rest Days, calcium is full and magnesium is in the glycinate form (uses yet another transporter, also separate from calcium). All combinations stay below the threshold where calcium and magnesium meaningfully compete at the shared gate.",
  },
  {
    cat: "Mineral",
    a: "Molybdenum",
    b: "Copper",
    type: "resolved",
    sev: "low",
    note: "At chronic high doses, molybdenum can deplete copper (this is actually the classic mechanism of Wilson's disease therapy). At the trace dose used here against the meaningful copper dose, the ratio strongly favors copper retention — no clinical concern. Independent transporters anyway.",
  },
  {
    cat: "Mineral",
    a: "Phosphorus",
    b: "Calcium + Iron",
    type: "resolved",
    sev: "low",
    note: "Phosphorus is well below any calcium-phosphorus imbalance threshold (concern starts when phosphorus is more than twice the calcium dose — far above what's here). Phosphorus's mild iron-chelation potential is handled by keeping it off Iron Days entirely. Independent transporter from any other mineral pathway.",
  },
  {
    cat: "Mineral",
    a: "Zinc",
    b: "Copper",
    type: "resolved",
    sev: "moderate",
    note: "The zinc-to-copper ratio is kept safely under 15:1 (the safety limit) on every day type. Copper tracks zinc inversely — when zinc goes up, copper goes up; when zinc goes down, copper goes down. The ratio is maintained on Iron Days (where both are reduced), on Rest Days (where both are full), and during washout (where both are reduced).",
  },
  {
    cat: "Cognitive",
    a: "UMP + CDP-Choline (in-product) + DHA (paired)",
    b: "Kennedy pathway",
    type: "synergy",
    sev: "high",
    note: "Two arms of the Kennedy pathway (the system your brain uses to build dendritic spine membranes) are in this product: UMP feeds the pyrimidine arm, and CDP-choline feeds the choline arm (and bonus: CDP-choline's cytidine contributes back to the UMP pool). The third arm — DHA — is intentionally not in this product because the algal omega-3 powder is too heavy for a powder format. To complete the full triad, pair this with a separate algal omega-3 supplement. The UMP + CDP-choline pair stands on its own for meaningful effects.",
  },
  {
    cat: "Cognitive",
    a: "Lion's Mane + UMP",
    b: "NGF ligand + receptor co-upregulation",
    type: "synergy",
    sev: "moderate",
    note: "Lion's Mane's hericenones increase NGF (nerve growth factor) synthesis — that's the ligand side. UMP upregulates the NGF receptors that bind those ligands — that's the receptor side. Combined, you get amplification on both sides of the same pathway. At the reduced Lion's Mane dose used here, the ligand side is partial but the receptor side is preserved at full strength — so the pair still meaningfully amplifies, with a lower ceiling than the canonical research dose of Lion's Mane would produce.",
  },
  {
    cat: "Methylation",
    a: "CDP-Choline + B12 + 5-MTHF",
    b: "Homocysteine → Methionine",
    type: "synergy",
    sev: "moderate",
    note: "The folate cycle (activated folate + B12) is the primary route to recycle homocysteine back into methionine. CDP-choline contributes a modest secondary methyl-donor stream through the choline → betaine → BHMT route. Total exogenous methyl load is low, so the small glycine in the amino complex is enough buffer. If a 30-day homocysteine bloodwork check shows elevation, supplemental betaine can be reintroduced.",
  },
  {
    cat: "Thyroid",
    a: "Iodine + Selenium + Tyrosine + B6 + Ashwagandha",
    b: "Thyroid axis (gently active upstream)",
    type: "synergy",
    sev: "moderate",
    note: "Four pieces of the thyroid axis are covered: substrate (iodine + L-tyrosine), conversion cofactor (selenium), decarboxylation cofactor (activated B6), and a gentle upstream push (ashwagandha at the reduced dose). At the reduced ashwagandha dose, the thyroid push is meaningfully softened — most users will see modest changes rather than the bigger shifts at the full clinical dose. Anyone with hyperthyroidism, Hashimoto's, or on levothyroxine should flag this. Baseline thyroid panel recommended for first-time users.",
  },
  {
    cat: "Performance",
    a: "Creatine",
    b: "Everything else in the stack",
    type: "resolved",
    sev: "low",
    note: "Creatine uses its own dedicated transporter (CRT1) with zero documented interactions with anything else in this stack. The saturation curve (about 28 days at maintenance dose) matches the 30-day cycle almost perfectly — steady state hits mid-month and holds.",
  },
  {
    cat: "Amino",
    a: "Amino & ALA Complex + Tyrosine + Creatine",
    b: "Amino transporter independence",
    type: "resolved",
    sev: "low",
    note: "Every amino-class compound in the stack rides a different transporter: glycine, taurine, R-ALA, tyrosine, and creatine each use their own. No transporter competition. R-ALA's reversible iron chelation is the one wrinkle, handled by zeroing the ALA portion of the amino complex on Iron Days.",
  },
  {
    cat: "Gut",
    a: "Prebiotic Blend + Probiotic + Creatine",
    b: "Gut barrier integrity",
    type: "synergy",
    sev: "moderate",
    note: "The multi-substrate prebiotic blend feeds different microbial populations across the length of your colon — broader coverage than any single-substrate alternative. The probiotic strains compete with pathogenic flora and produce short-chain fatty acids. Creatine incidentally serves as an energy substrate for enterocytes (gut lining cells). Together, the gut barrier coverage is solid.",
  },
  {
    cat: "Washout",
    a: "4-day Maintenance (days 27–30)",
    b: "Hepcidin reset + HPA reset + Manganese pulsing",
    type: "interact",
    sev: "moderate",
    note: "The washout serves three independent rest functions at once. (1) Iron is zeroed so the hepcidin ceiling fully resets — next month's first dose absorbs at maximum. (2) Ashwagandha is zeroed so the HPA-axis receptors can resensitize. (3) Manganese stays zeroed for the conservative safety margin. Meanwhile, all the daily compounds keep running (creatine, Lion's Mane, B-complex, etc.) and several others continue at reduced doses (Vitamin A drops to plant-form only, Vitamin E is reduced, magnesium and zinc are slightly reduced). The washout is a true rest cycle, not a full pause.",
  },
  {
    cat: "Drug",
    a: "L-Tyrosine",
    b: "MAOIs / SSRIs",
    type: "interact",
    sev: "critical",
    note: "Absolute contraindication with MAOIs — risk of hypertensive crisis from norepinephrine substrate flooding. Relative contraindication with SSRIs and SNRIs. Pharmacist review is mandatory if you're on any of these.",
  },
  {
    cat: "Drug",
    a: "Vitamin K2",
    b: "Warfarin / VKAs",
    type: "interact",
    sev: "critical",
    note: "Vitamin K2 directly opposes warfarin's mechanism. Contraindicated.",
  },
  {
    cat: "Drug",
    a: "Iron",
    b: "Levothyroxine / Bisphosphonates / Quinolones / Tetracyclines",
    type: "interact",
    sev: "high",
    note: "Iron binds and inactivates several drug classes in the gut. Separate iron dosing by at least 2 hours from levothyroxine, bisphosphonates, fluoroquinolones, and tetracyclines.",
  },
  {
    cat: "Drug",
    a: "CoQ10",
    b: "Warfarin",
    type: "interact",
    sev: "moderate",
    note: "CoQ10's structural similarity to Vitamin K can modestly reduce warfarin's effect. INR monitoring required if you're on warfarin or other vitamin-K antagonists.",
  },
  {
    cat: "Drug",
    a: "Ashwagandha",
    b: "Sedatives / Thyroid meds / Immunosuppressants / Sympathomimetics",
    type: "interact",
    sev: "moderate",
    note: "At the reduced dose used here, the drug interaction surface is smaller than at full clinical dose — but still real. May potentiate sedatives (additive GABAergic effect, gentler at this dose). Thyroid medication interaction is softened — but levothyroxine users should still flag this. Mild immunomodulatory effect persists — caution with immunosuppressants. Pregnancy contraindication applies regardless of dose. Pharmacist and physician review recommended for anyone on chronic medication.",
  },
];

const IX_CATS = [...new Set(IX.map((x) => x.cat))];
const SvC: Record<IxSev, string> = {
  critical: "#c0392b",
  high: "#d4760a",
  moderate: "#b8860b",
  low: "#3a7a3a",
};
const TpC: Record<IxType, string> = {
  resolved: "#2980b9",
  synergy: "#3a7a3a",
  interact: "#b8860b",
  accepted: "#777",
};
const IxCC: Record<string, string> = {
  "Iron Absorption": "#e68163",
  "Fat-Soluble": "#b8860b",
  Mineral: "#2980b9",
  Cognitive: "#7b68ee",
  Methylation: "#6a8e3e",
  Thyroid: "#c0392b",
  Performance: "#3a7a3a",
  Amino: "#b05574",
  Gut: "#6a8e3e",
  Washout: "#c9b07a",
  Drug: "#8b0000",
};

// ── COMPONENT ───────────────────────────────────────────────────────────
export function ScienceContent() {
  const [selDay, setSelDay] = useState<number | null>(null);
  const [selNut, setSelNut] = useState<string | null>(null);
  const [catF, setCatF] = useState<Cat | null>(null);
  const [ixCat, setIxCat] = useState<string | null>(null);
  const [expIx, setExpIx] = useState<number | null>(null);

  const schedR = useRef<HTMLDivElement>(null);
  const gridR = useRef<HTMLDivElement>(null);
  const nutR = useRef<HTMLDivElement>(null);
  const ixR = useRef<HTMLDivElement>(null);

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
  const filtIx = ixCat ? IX.filter((x) => x.cat === ixCat) : IX;

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
              ["Interactions", ixR],
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
              Everything is taken in a single morning dose with a meal. All absorption conflicts are resolved <em>across</em> days, not within a day. The architecture is driven by iron&apos;s shutdown signal (hepcidin): alternate-day dosing lets that signal reset between doses, giving roughly 40% more absorption. That creates two day environments &mdash; an <span style={{ color: FC.F1, fontWeight: 700 }}>Iron Day</span> (clean of competitors, all absorption boosters on) and a <span style={{ color: FC.F2, fontWeight: 700 }}>Rest Day</span> (full fat-soluble vitamins, manganese, full minerals). A 4-day <span style={{ color: FC.W, fontWeight: 700 }}>Maintenance Washout</span> at the end of every month provides a hepcidin floor reset, an HPA-axis reset, and a manganese safety margin.
            </p>
            <p>
              The 30-day cycle is intentional. It matches the saturation timescales of the strongest-evidence ingredients: creatine reaches muscle saturation in ~28 days; iron&apos;s hepcidin ceiling resets cleanly over 4 days off; fat-soluble vitamin tissue stores are months-deep; activated B-vitamins and CoQ10 hit steady state within 3&ndash;4 weeks. The cycle reaches plateau mid-month and holds, with a clean 4-day rest before re-entering Iron Day 1.
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
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
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
              <span className="inline-block w-3 h-3 rounded-sm border border-border" style={{ background: HC[0] }} />
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
                                className="inline-block w-2.5 h-2.5 rounded-sm"
                                style={{
                                  background: v > 0 ? HC[v] : HC[0],
                                  border: v === 0 ? "1px solid #ddd" : "none",
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
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTERACTION MAP ──────────────────────────────────────────── */}
      <section ref={ixR} className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Every Interaction We&apos;re Watching</h2>
          <p className="mt-2 text-xs uppercase tracking-wider text-foreground/55">
            {IX.length} interactions across the stack. Tap to expand the reasoning.
          </p>

          {/* Type legend */}
          <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-foreground/65">
            {(Object.entries(TpC) as [IxType, string][]).map(([k, c]) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-sm" style={{ background: c }} />
                <span className="capitalize">{k}</span>{" "}
                <span className="text-foreground/40">({IX.filter((x) => x.type === k).length})</span>
              </span>
            ))}
          </div>

          {/* Category filter */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setIxCat(null);
                setExpIx(null);
              }}
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border"
              style={{
                background: ixCat === null ? "#1a1a1a" : "white",
                color: ixCat === null ? "white" : "#555",
                borderColor: ixCat === null ? "#1a1a1a" : "#e5e5e5",
              }}
            >
              All
            </button>
            {IX_CATS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setIxCat(ixCat === c ? null : c);
                  setExpIx(null);
                }}
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border"
                style={{
                  background: ixCat === c ? IxCC[c] || "#1a1a1a" : "white",
                  color: ixCat === c ? "white" : "#555",
                  borderColor: ixCat === c ? IxCC[c] || "#1a1a1a" : "#e5e5e5",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Interactions */}
          <div className="mt-4 grid gap-2">
            {filtIx.map((x) => {
              const gi = IX.indexOf(x);
              const open = expIx === gi;
              return (
                <div
                  key={gi}
                  onClick={() => setExpIx(open ? null : gi)}
                  className="bg-white rounded-lg border px-4 py-3 cursor-pointer transition-colors"
                  style={{ borderColor: open ? SvC[x.sev] : "#e5e5e5" }}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider"
                      style={{
                        color: IxCC[x.cat] || "#555",
                        background: `${IxCC[x.cat] || "#999"}1A`,
                      }}
                    >
                      {x.cat}
                    </span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider"
                      style={{ color: SvC[x.sev], background: `${SvC[x.sev]}1A` }}
                    >
                      {x.sev}
                    </span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider"
                      style={{ color: TpC[x.type], background: `${TpC[x.type]}1A` }}
                    >
                      {x.type}
                    </span>
                    <span className="font-bold text-foreground text-sm">
                      {x.a} <span className="text-foreground/40 mx-1">↔</span> {x.b}
                    </span>
                  </div>
                  {open && (
                    <p className="mt-3 pt-3 border-t border-border text-sm text-foreground/85 leading-relaxed">
                      {x.note}
                    </p>
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
              <strong className="text-foreground">Magnesium is at a felt-effect dose on Iron Days.</strong>{" "}
              The taurate form on Iron Days delivers a meaningful side-load of taurine, pushing Iron Days into felt-effect territory. Rest Days and washout magnesium is sub-felt but tissue-sufficient (intracellular magnesium lasts ~4 months &mdash; daily fluctuation doesn&apos;t matter).
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
