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
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold">Apply for the closed beta</h1>
        <p className="mt-3 text-muted-foreground">
          We pick a small batch each round. The more honest you are, the better your shot. 100% free.
        </p>

        {submitted ? (
          <div className="mt-8 border border-border p-6">
            <h2 className="text-xl font-bold">You're on the list.</h2>
            <p className="mt-2 text-muted-foreground">We'll be in touch when the next batch opens. (Placeholder — no data was sent.)</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mt-8 space-y-4"
          >
            <Field label="Name" name="name" placeholder="Your full name" required />
            <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
            <Field label="What outcome are you after?" name="goal" placeholder="One sentence" />
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input type="checkbox" defaultChecked className="mt-1" />
              <span>I'd like a chance at a free product if I follow + post about my experience.</span>
            </label>
            <button
              type="submit"
              className="w-full bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90"
            >
              Submit application
            </button>
            <p className="text-xs text-muted-foreground">Free · Money-back guarantee on launch · No spam.</p>
          </form>
        )}
      </main>
      <SiteFooter />
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
        className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
