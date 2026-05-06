import { Link } from "@tanstack/react-router";
import logo from "@/assets/m3-logo.png";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="M3" className="h-12 w-auto" />
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/about" className="hover:text-brand">About M3</Link>
          <Link to="/science" className="hover:text-brand">Core Principles</Link>
          <Link to="/signup" className="hover:text-brand">Become a Founding Member</Link>
        </nav>
      </div>
    </header>
  );
}
