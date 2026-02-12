import Link from "next/link";

export function NavigationBar() {
  return (
    <header className="fixed top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="min-w-0 text-xs font-semibold tracking-[0.14em] sm:text-sm sm:tracking-[0.2em]">
          <span className="sm:hidden">TSC</span>
          <span className="hidden sm:inline">THE STEADY COMPANY</span>
        </Link>

        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <nav className="flex shrink-0 items-center gap-3 text-xs text-secondary sm:gap-6 sm:text-sm">
            <Link href="/garden" className="whitespace-nowrap transition-colors hover:text-primary">
              Garden
            </Link>
            <Link href="/article" className="whitespace-nowrap transition-colors hover:text-primary">
              Article
            </Link>
          </nav>

          <Link
            href="/search"
            aria-label="검색 페이지로 이동"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-secondary transition-colors hover:border-tertiary hover:text-primary sm:h-9 sm:w-9"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
