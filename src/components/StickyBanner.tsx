import { Link } from "@tanstack/react-router";

export function StickyBanner() {
  return (
    <div className="sticky top-0 z-50 bg-brand text-white text-center text-sm">
      <Link to="/signup" className="block px-4 py-2 hover:opacity-95">
        <span className="font-semibold">(NEW)</span> Max Mend Method Founding Members Program: Find out if you are a fit →
      </Link>
    </div>
  );
}
