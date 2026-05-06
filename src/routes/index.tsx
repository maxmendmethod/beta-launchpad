import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAButton } from "@/components/CTAButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brand — Do You Want To Feel Unstoppable?" },
      { name: "description", content: "The simplest way to optimize your nutrition timing. Join the free closed beta." },
    ],
  }),
  component: Index,
});

const faqs = [
  { q: "What exactly is this product?", a: "Placeholder. A short, plain-language explanation of what it is and what it does for the user." },
  { q: "How do I get selected for the beta?", a: "Placeholder. Sign up below and we hand-pick a small batch of athletes for each round." },
  { q: "How much does it cost?", a: "Placeholder. The closed beta is 100% free for selected applicants." },
  { q: "Is there a money-back guarantee?", a: "Placeholder. Yes — if you don't love it, we'll refund you, no questions asked." },
  { q: "When will it ship?", a: "Placeholder. Selected beta participants receive their kit within 2 weeks of approval." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent)/0.15,_transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--free)]" />
            Closed beta · 497 athletes on the waitlist
          </span>
          <h1 className="mt-8 font-display text-5xl leading-[1.05] md:text-7xl">
            Do you want to feel<br />
            <em className="italic text-accent">unstoppable</em> every single day?
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            We built the simplest way to dial in your nutrition timing — so your body does
            exactly what you ask it to, when you ask it.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <CTAButton>I'm ready to feel unstoppable</CTAButton>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-[color:var(--free)]">100% FREE</span> for beta members · Money-back guarantee on launch
            </p>
          </div>

          {/* founder strip */}
          <div className="mx-auto mt-16 flex max-w-md items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left">
            <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-accent to-primary" />
            <div>
              <p className="text-sm font-medium">Built by athletes who got tired of guessing.</p>
              <p className="text-xs text-muted-foreground">— The founders (placeholder)</p>
            </div>
          </div>
        </div>
      </section>

      {/* FREE VALUE SECTION */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--free)]">100% Free Resources</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Even if you don't pick us.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              The wellness industry is full of nonsense. Here's what we wish someone gave us
              when we started — no email required.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { tag: "FREE", title: "Navigating the grocery store", body: "Decoding labels, terms that mean nothing, and what those numbers actually represent." },
              { tag: "FREE", title: "Nutrient timing 101", body: "A short, no-fluff intro to when your body actually uses what you put in it." },
              { tag: "FREE", title: "What 'clean' really means", body: "The marketing words to ignore, and the three things that actually matter on a label." },
            ].map((c) => (
              <div key={c.title} className="group rounded-2xl border border-border bg-card p-6 transition hover:border-accent">
                <span className="inline-block rounded-full bg-[color:var(--free)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
                  {c.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                <span className="mt-4 inline-block text-sm font-medium text-accent group-hover:underline">Read free →</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <CTAButton>Join the free beta</CTAButton>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF PLACEHOLDER */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center text-sm uppercase tracking-wider text-muted-foreground">Real testimonials, coming soon</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <figure key={i} className="rounded-2xl border border-dashed border-border bg-card p-6">
              <blockquote className="font-display text-xl italic text-muted-foreground">
                "Testimonial placeholder — real quotes from beta athletes will land here, with links to their profiles."
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                <span className="h-9 w-9 rounded-full bg-muted" />
                <span className="text-muted-foreground">Beta athlete · placeholder</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="font-display text-4xl md:text-5xl">Frequently asked.</h2>
          <p className="mt-2 text-muted-foreground">The things people keep emailing us about.</p>
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-medium">{f.q}</span>
                  <span className="text-2xl text-muted-foreground transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent/30 via-card to-primary/20" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Who we are</p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">We had the same problem.</h2>
            <p className="mt-4 text-muted-foreground">
              Placeholder founder story. After years of trying everything else, we got tired
              of products that overpromised and underdelivered. So we made the thing we wished
              existed — and we're letting a small group of athletes try it for free.
            </p>
            <Link to="/about" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
              Read our story →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl md:text-6xl">One last thing.</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
            Spots are limited. We pick a small batch of athletes for each round so we can
            actually pay attention to your feedback.
          </p>
          <div className="mt-10">
            <CTAButton>Apply for the free beta</CTAButton>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
