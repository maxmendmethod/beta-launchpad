import { Link } from "@tanstack/react-router";

export function StickyBanner() {
  return (
    <div className="sticky top-0 z-50 bg-brand text-white text-center text-sm">
      <Link to="/signup" className="flex items-center justify-center gap-2 px-4 py-2 hover:opacity-95">
        <span className="rounded-full bg-white text-brand text-[10px] font-extrabold px-2 py-0.5 tracking-wide">
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
