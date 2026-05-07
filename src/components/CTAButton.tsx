import { Link } from "@tanstack/react-router";

export function CTAButton({ children = "I'M READY TO OPTIMIZE" }: { children?: React.ReactNode }) {
  return (
    <Link
      to="/signup"
      className="inline-block rounded-md bg-brand px-8 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-sm hover:opacity-90"
    >
      {children}
    </Link>
  );
}
