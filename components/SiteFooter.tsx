import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/m3-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-[#d46a4e]">
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* Main row */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image src={logo} alt="M3" className="h-16 w-auto footer-logo" />
          </Link>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white md:justify-end">
              <Link href="/about" className="transition-colors hover:text-black">About M3</Link>
              <Link href="/science" className="transition-colors hover:text-black">Core Principles</Link>
              <Link href="/signup" className="transition-colors hover:text-black">Become a Founding Member</Link>
              <a href="https://www.instagram.com/maxmendmethod/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">Instagram</a>
              <a href="https://www.linkedin.com/company/maxmendmethod/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">LinkedIn</a>
              <a href="https://www.facebook.com/maxmendmethod" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">Facebook</a>
              <a href="https://x.com/maxmendmethod" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">X</a>
              <a href="https://www.google.com/search?q=Max+Mend+Method" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">Google Business</a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-white/80 md:justify-end">
              <Link href="/terms" className="transition-colors hover:text-black">Terms of Service</Link>
              <Link href="/privacy" className="transition-colors hover:text-black">Privacy Policy</Link>
              <Link href="/refunds" className="transition-colors hover:text-black">Refund Policy</Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/30 pt-6 flex flex-col items-center gap-2 text-xs text-white/70">
          <p>© {new Date().getFullYear()} Max Mend Method LLC. All rights reserved.</p>
          <p className="max-w-2xl text-center">
            These statements have not been evaluated by the FDA. M3 is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any supplement protocol.
          </p>
        </div>

      </div>
    </footer>
  );
}
