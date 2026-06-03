"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";
import logo from "@/src/assets/m3-logo.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#ffffff" }}>
      {/* Desktop */}
      <div className="hidden md:flex w-full items-center justify-between pl-[5%] pr-[5%] py-2">

        {/* Left: logo + nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image src={logo} alt="M3" className="h-14 w-auto" priority />
          </Link>
          <nav className="flex items-center gap-8 text-sm text-foreground" style={{ fontFamily: '"Arimo", sans-serif' }}>
            <Link href="/science" className="hover:underline hover:decoration-[#e68163] hover:decoration-[3px] hover:underline-offset-[5px]">
              Science
            </Link>
            {/* About dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-0.5 hover:underline hover:decoration-[#e68163] hover:decoration-[3px] hover:underline-offset-[5px]">
                About
                <ChevronDown className="h-3.5 w-3.5 mt-px transition-transform duration-150 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full hidden group-hover:flex flex-col pt-2 z-50 min-w-[260px]">
                <div className="rounded-lg border border-border bg-white shadow-md py-1 text-sm text-foreground">
                  <Link
                    href="/about"
                    className="block px-4 py-2.5 hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium">Why We Made M3</span>
                  </Link>
                  <Link
                    href="/quality"
                    className="block px-4 py-2.5 hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium">Quality</span>
                  </Link>
                  <Link
                    href="/why-taking-the-same-supplements-every-day-isnt-enough"
                    className="block px-4 py-2.5 hover:bg-secondary transition-colors"
                  >
                    <span className="font-medium">Why Daily Supplements Aren&apos;t Enough</span>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/signup" className="hover:underline hover:decoration-[#e68163] hover:decoration-[3px] hover:underline-offset-[5px]">
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
            className="flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm text-foreground/70 transition-colors hover:border-brand hover:text-brand" style={{ fontFamily: '"Arimo", sans-serif' }}
          >
            <User className="h-3.5 w-3.5" />
            Log in
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-4 py-2">
        <Link href="/">
          <Image src={logo} alt="M3" className="h-8 w-auto" priority />
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
        <div className="md:hidden border-t border-border" style={{ backgroundColor: "#ffffff" }}>
          <nav className="flex flex-col gap-3 px-4 py-4 text-sm font-semibold text-foreground">
            <Link href="/science" onClick={() => setOpen(false)} className="self-start transition-colors hover:text-brand">
              Science
            </Link>
            <div className="flex flex-col gap-0">
              <span className="text-foreground/50 text-xs uppercase tracking-widest pb-1">About</span>
              <Link href="/about" onClick={() => setOpen(false)} className="self-start pl-2 transition-colors hover:text-brand py-1">
                Why We Made M3
              </Link>
              <Link href="/quality" onClick={() => setOpen(false)} className="self-start pl-2 transition-colors hover:text-brand py-1">
                Quality
              </Link>
              <Link href="/why-taking-the-same-supplements-every-day-isnt-enough" onClick={() => setOpen(false)} className="self-start pl-2 transition-colors hover:text-brand py-1">
                Why Daily Supplements Aren&apos;t Enough
              </Link>
            </div>
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
