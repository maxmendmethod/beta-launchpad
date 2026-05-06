import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Brand</span>
        <div className="flex gap-5">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/science" className="hover:underline">Science</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/signup" className="hover:underline">Join Beta</Link>
        </div>
      </div>
    </footer>
  );
}
