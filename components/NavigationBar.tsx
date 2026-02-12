import Link from "next/link";

export function NavigationBar() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="min-w-0 text-xs font-semibold tracking-[0.14em] sm:text-sm sm:tracking-[0.2em]">
          <span className="sm:hidden">TSC</span>
          <span className="hidden sm:inline">THE STEADY COMPANY</span>
        </Link>

        <nav className="flex shrink-0 items-center gap-3 text-xs text-secondary sm:gap-6 sm:text-sm">
          <Link href="/garden" className="whitespace-nowrap transition-colors hover:text-primary">
            Garden
          </Link>
          <a
            href="https://hogumachu.github.io"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Personal Blog (opens in a new tab)"
            className="whitespace-nowrap transition-colors hover:text-primary"
          >
            Personal Blog
          </a>
        </nav>
      </div>
    </header>
  );
}
