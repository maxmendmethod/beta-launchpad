import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/m3-logo.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Become a Founding Member — M3" },
      { name: "description", content: "Apply for the M3 Founding Members Program. Free product, free shipping." },
    ],
  }),
  component: SignupPage,
});

const faqs = [
  {
    q: "What is The Founding Members Program?",
    a: "Before M3 officially launches, we're giving a small group of people early access to the full 30 day M3 protocol completely free. In exchange, we ask for honest feedback and a little word of mouth if you love it. No strings attached.",
  },
  {
    q: "How much does The Founding Members Program cost?",
    a: "Nothing. The product and shipping are completely free. If you love it, leave us a Google review under Max Mend Method, follow us on Instagram (@maxvalrose, @maxmendmethod), and tell a friend.",
  },
  {
    q: "How will I receive it?",
    a: "We'll ship it directly to you at no cost. Once you're confirmed as a founding member, we'll reach out with next steps.",
  },
  {
    q: "What happens after my 30 days?",
    a: "When M3 officially drops, founding members get first access at $49 - half the retail price of $99. That discount is yours to keep.",
  },
  {
    q: "What if I don't want to lose momentum before the official launch?",
    a: "DM us on Instagram @maxmendmethod. If you loved the first cycle and don't want a gap, we'll take care of you.",
  },
];

function SignupPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="text-center">
          <Link to="/"><img src={logo} alt="M3" className="mx-auto h-12 w-auto" /></Link>
        </div>

        <h1 className="mt-8 text-2xl md:text-3xl font-bold text-center">
          Are you getting everything out of your supplements?
        </h1>
        <p className="mt-3 text-center text-muted-foreground">
          Join 345 Other M3 Founding Members — Stop Guessing at Your Supplement Routine
        </p>

        {/* Video placeholder */}
        <div className="mt-6 aspect-video w-full border border-border bg-secondary/60 flex items-center justify-center text-sm text-muted-foreground">
          Video coming soon (auto-play)
        </div>

        <p className="mt-4 text-center text-muted-foreground">
          It's a 30 day, science backed protocol where every packet is optimized for the day you're on. No research or guesswork required.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-md border border-border bg-background p-6 text-center">
            <h2 className="text-xl font-bold">You're on the list.</h2>
            <p className="mt-2 text-muted-foreground">We'll be in touch shortly with next steps for your founding membership.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mt-8 space-y-4"
          >
            <Field label="Name" name="name" placeholder="Your full name" required />
            <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
            <button
              type="submit"
              className="w-full rounded-md bg-brand px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:opacity-90"
            >
              Join The Waitlist
            </button>
            <p className="text-center text-sm text-muted-foreground">
              The founding members program is FREE + free shipping
            </p>
          </form>
        )}

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold text-center uppercase">FAQ</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="border border-border rounded-md bg-background px-4 py-3">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Minimal footer (same content as homepage footer) */}
      <footer className="border-t border-border mt-16 bg-background">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground">
          <nav className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/about" className="hover:text-brand">About M3</Link>
            <Link to="/science" className="hover:text-brand">Core Principles</Link>
            <Link to="/signup" className="hover:text-brand">Become a Founding Member</Link>
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} Max Mend Method. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
      />
    </div>
  );
}
