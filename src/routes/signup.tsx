import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import logo from "@/assets/m3-logo.png";
import { SiteFooter } from "@/components/SiteFooter";

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
  const [copied, setCopied] = useState(false);
  const [notify, setNotify] = useState(false);

  const shareText = "Just joined the M3 Founding Members program. It's a free 30 day supplement protocol. Check it out:";
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/signup` : "/signup";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (submitted) {
    return (
      <div>
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <Link to="/"><img src={logo} alt="M3" className="mx-auto h-12 w-auto" /></Link>
          <h1 className="mt-10 text-2xl md:text-4xl font-black uppercase tracking-tight">
            Congratulations on taking the first step to optimizing your health
          </h1>
          <p className="mt-5 text-base md:text-lg text-foreground/80">
            We'll review your application and reach out soon with next steps and shipping info for your Founding Membership!
          </p>
          <p className="mt-3 text-base text-foreground/80">
            Follow along on Instagram for updates while you wait —{" "}
            <a href="https://instagram.com/maxmendmethod" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold">@maxmendmethod</a>
          </p>

          <div className="mt-10 space-y-3">
            <a
              href={`sms:&body=${encodeURIComponent(shareText + " " + shareUrl)}`}
              className="flex items-center justify-center gap-2 w-full rounded-md bg-brand px-5 py-3 text-sm font-bold uppercase text-white hover:opacity-90"
            >
              <Share2 className="h-4 w-4" /> Tell a friend
            </a>

            <button
              onClick={copy}
              className="flex items-center justify-center gap-2 w-full rounded-md border border-brand text-brand px-5 py-3 text-sm font-bold uppercase hover:bg-brand hover:text-white transition-colors"
            >
              {copied ? <><Check className="h-4 w-4" /> Link copied</> : <><Copy className="h-4 w-4" /> Copy share link</>}
            </button>

            <label className="flex items-center justify-center gap-2 text-sm text-foreground/80 mt-4 cursor-pointer">
              <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-4 w-4 accent-[var(--brand)]" />
              Be the first to know when M3 drops officially
            </label>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="text-center">
          <Link to="/"><img src={logo} alt="M3" className="mx-auto h-12 w-auto" /></Link>
        </div>

        {/* Video */}
        <div className="mt-8 aspect-video w-full border border-border bg-secondary/60 flex items-center justify-center text-sm text-muted-foreground">
          Video coming soon (auto-play)
        </div>

        <h1 className="mt-8 text-3xl md:text-5xl font-black text-center uppercase tracking-tight leading-[1.05]">
          Are you getting everything out of your supplements?
        </h1>
        <p className="mt-4 text-center text-base md:text-lg text-foreground/80">
          Join 345 Other M3 Founding Members - Stop Guessing at Your Supplement Routine
        </p>

        <p className="mt-6 text-center text-base text-foreground/85">
          It's a 30 day, <strong className="font-bold">science backed protocol</strong> where every packet is optimized for the day you're on. No research or guesswork required.
        </p>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="mt-8 space-y-4 max-w-md mx-auto"
        >
          <Field label="Name" name="name" placeholder="Your full name" required />
          <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
          <button
            type="submit"
            className="w-full rounded-md bg-brand px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:opacity-90"
          >
            Join The Waitlist
          </button>
          <p className="text-center text-sm text-muted-foreground">
            The founding members program is FREE + free shipping
          </p>
        </form>

        {/* FAQ */}
        <section className="mt-14 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-center uppercase">FAQs</h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex justify-between items-center font-bold text-base md:text-lg">
                  <span>{f.q}</span>
                  <span className="ml-4 text-brand text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm md:text-base text-foreground/80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-semibold">{label}</label>
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
