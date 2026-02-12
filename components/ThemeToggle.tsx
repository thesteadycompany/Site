"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // We intentionally defer theme-dependent UI until after mount
    // to avoid server/client theme hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div aria-hidden className="h-10 w-24 rounded-full border border-border bg-secondary-background" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-secondary-background p-1">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`rounded-full px-3 py-1 text-sm transition-colors ${
          !isDark
            ? "bg-background text-primary shadow-sm"
            : "text-secondary hover:text-primary"
        }`}
        aria-label="Switch to light mode"
      >
        Sun
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`rounded-full px-3 py-1 text-sm transition-colors ${
          isDark
            ? "bg-background text-primary shadow-sm"
            : "text-secondary hover:text-primary"
        }`}
        aria-label="Switch to dark mode"
      >
        Moon
      </button>
    </div>
  );
}
