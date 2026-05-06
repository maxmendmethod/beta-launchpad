import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-bold">Brand</Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link to="/" activeOptions={{ exact: true }} className="hover:underline">Home</Link>
          <Link to="/science" className="hover:underline">Science</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/signup" className="hover:underline">Join Beta</Link>
        </nav>
      </div>
    </header>
  );
}
