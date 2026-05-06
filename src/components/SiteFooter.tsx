import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-accent" />
          <span className="font-display text-xl text-foreground">Brand</span>
          <span className="ml-3">© {new Date().getFullYear()} — All rights reserved.</span>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <Link to="/science" className="hover:text-foreground">Science</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/signup" className="hover:text-foreground">Join Beta</Link>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
        </div>
      </div>
    </footer>
  );
}
