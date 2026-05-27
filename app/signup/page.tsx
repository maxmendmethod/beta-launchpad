import type { Metadata } from "next";
import { SignupClient } from "@/components/SignupClient";

export const metadata: Metadata = {
  title: "Become a Founding Member",
  description:
    "Join the Max Mend Method Founding Members Program. Free 30 day supplement protocol, free shipping, science-backed daily packets — no cost in exchange for honest feedback.",
  alternates: { canonical: "https://www.maxmendmethod.com/signup" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Become a Founding Member | Max Mend Method",
    description:
      "Join the Max Mend Method Founding Members Program. Free 30 day supplement protocol, free shipping, science-backed daily packets — no cost in exchange for honest feedback.",
    url: "https://www.maxmendmethod.com/signup",
  },
  twitter: {
    title: "Become a Founding Member | Max Mend Method",
    description:
      "Join the Max Mend Method Founding Members Program. Free 30 day supplement protocol, free shipping, science-backed daily packets — no cost in exchange for honest feedback.",
  },
};

const signupFaqs = [
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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: signupFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function SignupPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SignupClient />
    </>
  );
}
