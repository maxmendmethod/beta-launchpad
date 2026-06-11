import Link from "next/link";
import { cn } from "@/lib/utils";

export function CTAButton({ children = "I'M READY TO OPTIMIZE", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <Link
      href="/signup"
      className={cn("inline-block rounded-md bg-brand px-8 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-sm transition-all hover:bg-brand-hover hover:shadow-md", className)}
    >
      {children}
    </Link>
  );
}
