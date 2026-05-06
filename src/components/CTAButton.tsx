import { Link } from "@tanstack/react-router";

export function CTAButton({ children = "I'm ready to improve my health", className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <Link
      to="/signup"
      className={`inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:scale-[1.02] hover:shadow-xl ${className}`}
    >
      {children} <span className="ml-2">→</span>
    </Link>
  );
}
