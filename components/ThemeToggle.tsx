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
    return <div aria-hidden className="h-7 w-12 rounded-full bg-secondary-background" />;
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      onClick={() => setTheme(nextTheme)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full p-1 transition-colors ${
        isDark ? "bg-tertiary-background" : "bg-secondary-background"
      }`}
    >
      <span
        className={`absolute left-1.5 text-[9px] text-tertiary transition-opacity ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
      >
        ☀
      </span>
      <span
        className={`absolute right-1.5 text-[9px] text-tertiary transition-opacity ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      >
        ☾
      </span>
      <span
        className={`h-5 w-5 rounded-full transition-transform duration-200 ease-out ${
          isDark ? "translate-x-5 bg-primary" : "translate-x-0 bg-primary"
        }`}
      />
    </button>
  );
}
