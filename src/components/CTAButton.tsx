import { Link } from "@tanstack/react-router";

export function CTAButton({ children = "I'M READY TO OPTIMIZE" }: { children?: React.ReactNode }) {
  return (
    <Link
      to="/signup"
      className="inline-block rounded-md bg-brand px-7 py-3 text-sm uppercase tracking-wide text-white shadow-sm hover:opacity-90"
    >
      {children}
    </Link>
  );
}
