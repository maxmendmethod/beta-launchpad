import { Link } from "@tanstack/react-router";

export function CTAButton({ children = "Join the beta" }: { children?: React.ReactNode }) {
  return (
    <Link
      to="/signup"
      className="inline-block bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
    >
      {children}
    </Link>
  );
}
