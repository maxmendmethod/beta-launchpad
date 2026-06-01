"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import logo from "@/src/assets/m3-logo.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border" style={{ backgroundColor: "#fffaeb" }}>
      {/* Desktop */}
      <div className="hidden md:flex w-full items-center justify-between pl-[5%] pr-[5%] py-4">

        {/* Left: logo + nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="M3" className="h-20 w-auto" priority />
          </Link>
          <nav className="flex items-center gap-8 text-sm font-semibold text-foreground">
            <Link href="/science" className="transition-colors hover:text-brand">
              Science
            </Link>
            <Link href="/about" className="transition-colors hover:text-brand">
              About
            </Link>
            <Link href="/signup" className="transition-colors hover:text-brand">
              Become a Founding Member
            </Link>
          </nav>
        </div>

        {/* Right: cart + login */}
        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            aria-label="Cart"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-foreground/60 transition-colors hover:border-brand hover:text-brand"
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-semibold text-foreground/70 transition-colors hover:border-brand hover:text-brand"
          >
            <User className="h-3.5 w-3.5" />
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image src={logo} alt="M3" className="h-10 w-auto" priority />
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/signup"
            aria-label="Cart"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-foreground/60"
          >
            <ShoppingCart className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="p-2 rounded-md hover:bg-secondary text-foreground"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border" style={{ backgroundColor: "#fffaeb" }}>
          <nav className="flex flex-col gap-3 px-4 py-4 text-sm font-semibold text-foreground">
            <Link href="/science" onClick={() => setOpen(false)} className="self-start transition-colors hover:text-brand">
              Science
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="self-start transition-colors hover:text-brand">
              About
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="self-start transition-colors hover:text-brand">
              Become a Founding Member
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="self-start transition-colors hover:text-brand">
              Log in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
