import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/m3-logo.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border" style={{ backgroundColor: "#1d1e1c" }}>
      {/* Desktop */}
      <div className="hidden md:flex mx-auto max-w-5xl items-center justify-center gap-8 px-4 py-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="M3" className="h-12 w-auto" />
        </Link>
        <nav className="flex items-center gap-8 text-sm font-semibold text-white">
          {/* <Link to="/about" className="hover:text-brand">About M3</Link> */}
          {/* <Link to="/science" className="hover:text-brand">Core Principles</Link> */}
          <Link to="/signup" className="hover:text-brand">Become a Founding Member</Link>
        </nav>
      </div>

      {/* Mobile */}
      <div className="md:hidden mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <Link to="/"><img src={logo} alt="M3" className="h-10 w-auto" /></Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="p-2 rounded-md hover:bg-secondary text-white"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border" style={{ backgroundColor: "#1d1e1c" }}>
          <nav className="flex flex-col px-4 py-3 text-sm font-semibold text-white">
            {/* <Link to="/about" onClick={() => setOpen(false)} className="py-2">About M3</Link> */}
            {/* <Link to="/science" onClick={() => setOpen(false)} className="py-2">Core Principles</Link> */}
            <Link to="/signup" onClick={() => setOpen(false)} className="py-2">Become a Founding Member</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
