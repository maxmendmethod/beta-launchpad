import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-accent" />
          <span className="font-display text-2xl">Brand</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/science" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">The Science</Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/signup" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground">Join Beta</Link>
        </nav>
        <Link to="/signup" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
          Join the Beta
        </Link>
      </div>
    </header>
  );
}
