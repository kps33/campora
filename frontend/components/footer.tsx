import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-heading text-base font-black">C</span>
            </div>
            <span className="font-heading text-lg font-bold text-foreground">
              Campora
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Made for students, by students.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/marketplace"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Marketplace
          </Link>
          <Link
            href="/lost-and-found"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Lost & Found
          </Link>
          <Link
            href="/login"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Campora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
