import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-gliker">404</h1>
        <p className="mt-4 text-muted-foreground">Looks like you tried to search for a page that doesn't exist. Let's get you back on track to optimizing your supplement routine.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}
