import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAButton } from "@/components/CTAButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brand — Optimize Your Nutrition Timing" },
      { name: "description", content: "The simplest way to dial in your nutrition timing. Join the free closed beta." },
    ],
  }),
  component: Index,
});

const faqs = [
  { q: "What is this?", a: "Placeholder. A short, plain-language explanation." },
  { q: "How do I get into the beta?", a: "Placeholder. Apply below — we pick a small batch each round." },
  { q: "How much does it cost?", a: "Placeholder. The closed beta is 100% free." },
  { q: "Money-back guarantee?", a: "Placeholder. Yes, no questions asked." },
  { q: "When does it ship?", a: "Placeholder. Within 2 weeks of approval." },
];

function Index() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold">Optimize your nutrition timing.</h1>
        <p className="mt-3 text-muted-foreground">
          The simplest way to dial in when your body uses what you put in it. Free closed beta — 497 athletes on the waitlist.
        </p>
        <div className="mt-5"><CTAButton>Join the free beta</CTAButton></div>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold">Free resources</h2>
        <p className="mt-1 text-muted-foreground">No email required.</p>
        <ul className="mt-4 space-y-2 list-disc pl-5">
          <li><a href="#" className="underline">Navigating the grocery store</a> — decoding labels and numbers.</li>
          <li><a href="#" className="underline">Nutrient timing 101</a> — when your body actually uses food.</li>
          <li><a href="#" className="underline">What "clean" really means</a> — marketing words to ignore.</li>
        </ul>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold">What people say</h2>
        <ul className="mt-4 space-y-3 text-muted-foreground">
          <li>"Testimonial placeholder." — Beta athlete</li>
          <li>"Testimonial placeholder." — Beta athlete</li>
          <li>"Testimonial placeholder." — Beta athlete</li>
        </ul>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="border-b border-border pb-3">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>

        <hr className="my-10 border-border" />

        <h2 className="text-2xl font-bold">Who we are</h2>
        <p className="mt-2 text-muted-foreground">
          Placeholder founder story. We were the customer first.{" "}
          <Link to="/about" className="underline">Read more →</Link>
        </p>

        <div className="mt-10">
          <CTAButton>Apply for the free beta</CTAButton>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
