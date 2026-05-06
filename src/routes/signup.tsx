import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Apply for the Beta — Brand" },
      { name: "description", content: "Apply for the closed free beta. Limited spots." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        {/* video side */}
        <div>
          <div className="relative aspect-[9/12] overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent/30 to-card">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/90 text-3xl">▶</div>
            </div>
            {/* MrBeast progress bar placeholder */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/30">
                <div className="h-full w-1/4 rounded-full bg-accent" />
              </div>
              <p className="mt-2 text-xs text-primary-foreground/80">Founder video — placeholder · 0:42 / 3:10</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Hit play. We explain the problem, why we built this, and exactly what happens after you apply.
          </p>
        </div>

        {/* form side */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Closed beta application</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">Tell us about you.</h1>
          <p className="mt-3 text-muted-foreground">
            We pick a small batch of athletes each round. The more honest you are, the better
            your shot.
          </p>

          {submitted ? (
            <div className="mt-10 rounded-2xl border border-accent bg-card p-8 text-center">
              <h2 className="font-display text-3xl">You're on the list.</h2>
              <p className="mt-2 text-muted-foreground">
                We'll be in touch the moment we open the next batch. (Placeholder — no data was sent.)
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="mt-8 space-y-4"
            >
              <Field label="Name" name="name" placeholder="Your full name" required />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
              <Field label="What's the outcome you're after?" name="goal" placeholder="In one sentence — what would make this a win for you?" />
              <label className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                <input type="checkbox" defaultChecked className="mt-1 h-4 w-4 accent-[var(--accent)]" />
                <span className="text-muted-foreground">
                  I'd like a chance at a free product if I follow + post about my experience.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-lg shadow-accent/20 hover:scale-[1.01]"
              >
                Submit my application →
              </button>
              <p className="text-center text-xs text-muted-foreground">
                <span className="font-semibold text-[color:var(--free)]">FREE</span> · Money-back guarantee on launch · No spam, ever.
              </p>
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none ring-accent focus:ring-2"
      />
    </div>
  );
}
