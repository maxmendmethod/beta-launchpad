import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function CTAButton({ children = "I'M READY TO OPTIMIZE", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <Link
      to="/signup"
      className={cn("inline-block rounded-md bg-brand px-8 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-sm hover:opacity-90", className)}
    >
      {children}
    </Link>
  );
}
