import { Link } from "@tanstack/react-router";

export function StickyBanner() {
  return (
    <div className="sticky top-0 z-50 bg-brand text-white text-center text-sm">
      <Link to="/signup" className="block px-4 py-2 hover:opacity-95">
        <span className="font-black">(NEW)</span> <span className="font-extrabold">Max Mend Method Founding Members Program:</span> Find out if you are a fit →
      </Link>
    </div>
  );
}
