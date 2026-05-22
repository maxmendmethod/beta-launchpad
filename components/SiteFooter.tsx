import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16" style={{ backgroundColor: "#e68163" }}>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground">
        <nav className="flex flex-wrap items-center justify-center gap-5">
          <Link href="/about" className="hover:text-brand">About M3</Link>
          <Link href="/science" className="hover:text-brand">Core Principles</Link>
          <Link href="/signup" className="hover:text-brand">Become a Founding Member</Link>
        </nav>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
          <a
            href="https://www.instagram.com/maxmendmethod/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand"
          >
            Instagram @maxmendmethod
          </a>
          <a
            href="https://www.google.com/search?q=Max+Mend+Method"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand"
          >
            Google Business
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
          <Link href="/terms" className="hover:text-brand">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-brand">Privacy Policy</Link>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} Max Mend Method. All rights reserved.</p>
        <p className="text-xs max-w-2xl text-center">
          These statements have not been evaluated by the FDA. M3 is not intended to diagnose, treat, cure, or prevent any disease.
          Consult your healthcare provider before starting any supplement protocol.
        </p>
      </div>
    </footer>
  );
}
