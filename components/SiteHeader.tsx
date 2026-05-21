"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/src/assets/m3-logo.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border" style={{ backgroundColor: "#1d1e1c" }}>
      {/* Desktop */}
      <div className="hidden md:flex mx-auto max-w-5xl items-center justify-center gap-8 px-4 py-4">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="M3" className="h-12 w-auto" priority />
        </Link>
        <nav className="flex items-center gap-8 text-sm font-semibold text-white">
          <Link
            href="/signup"
            className="rounded-md border border-white/40 px-4 py-2 transition-colors hover:border-brand hover:text-brand"
          >
            Become a Founding Member
          </Link>
        </nav>
      </div>

      {/* Mobile */}
      <div className="md:hidden mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image src={logo} alt="M3" className="h-10 w-auto" priority />
        </Link>
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
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="self-start rounded-md border border-white/40 px-4 py-2 transition-colors hover:border-brand hover:text-brand"
            >
              Become a Founding Member
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
