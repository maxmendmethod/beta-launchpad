import Link from "next/link";

export function StickyBanner() {
  return (
    <div className="sticky top-0 z-50 bg-brand text-white text-center text-xs">
      <Link href="/signup" className="flex items-center justify-center gap-2 px-3 py-[11px] hover:opacity-95">
        <span className="rounded-full bg-white text-brand text-[8px] font-extrabold px-1.5 py-0.5 tracking-wide">
          NEW
        </span>
        <span>
          <span className="font-extrabold">Max Mend Method Founding Members Program: </span>
          <span className="font-normal">Find out if you are a fit →</span>
        </span>
      </Link>
    </div>
  );
}
