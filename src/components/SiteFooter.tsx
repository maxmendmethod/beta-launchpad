import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16" style={{ backgroundColor: "#e68163" }}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground">
        <nav className="flex flex-wrap items-center justify-center gap-5">
          <Link to="/about" className="hover:text-brand">About M3</Link>
          <Link to="/science" className="hover:text-brand">Core Principles</Link>
          <Link to="/signup" className="hover:text-brand">Become a Founding Member</Link>
        </nav>
        <p className="text-xs">© {new Date().getFullYear()} Max Mend Method. All rights reserved.</p>
        <p className="text-xs max-w-2xl text-center">
          These statements have not been evaluated by the FDA. M3 is not intended to diagnose, treat, cure, or prevent any disease.
          Consult your healthcare provider before starting any supplement protocol.
        </p>
      </div>
    </footer>
  );
}
