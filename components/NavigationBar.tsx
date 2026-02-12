"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="fixed top-0 z-40 w-full bg-background/88 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMenu}
          className="ui-hover min-w-0 text-xs font-semibold tracking-[0.14em] sm:text-sm sm:tracking-[0.2em]"
        >
          THE STEADY COMPANY
        </Link>

        <div className="hidden min-w-0 items-center gap-2 sm:flex sm:gap-4">
          <ThemeToggle />

          <nav className="flex shrink-0 items-center gap-3 text-xs text-secondary sm:gap-6 sm:text-sm">
            <Link href="/garden" className="ui-hover whitespace-nowrap underline-offset-4 hover:underline">
              Garden
            </Link>
            <Link href="/article" className="ui-hover whitespace-nowrap underline-offset-4 hover:underline">
              Article
            </Link>
          </nav>

          <Link
            href="/search"
            aria-label="검색 페이지로 이동"
            className="ui-hover ui-hover-soft inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-secondary sm:h-9 sm:w-9"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          className="ui-hover ui-hover-soft inline-flex h-9 w-9 items-center justify-center rounded-md text-secondary sm:hidden"
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
            {isMenuOpen ? <path d="M6 6L18 18M18 6L6 18" /> : <path d="M4 7H20M4 12H20M4 17H20" />}
          </svg>
        </button>
      </div>

      {isMenuOpen ? (
        <div id="mobile-nav-menu" className="border-t border-border/50 bg-background sm:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4">
            <nav className="flex flex-col gap-2 text-sm text-secondary">
              <Link href="/garden" onClick={closeMenu} className="ui-hover rounded-md px-2 py-1.5">
                Garden
              </Link>
              <Link href="/article" onClick={closeMenu} className="ui-hover rounded-md px-2 py-1.5">
                Article
              </Link>
              <Link href="/search" onClick={closeMenu} className="ui-hover rounded-md px-2 py-1.5">
                Search
              </Link>
            </nav>
            <div className="pt-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
