"use client";

import type { HomeFilterType } from "@/lib/home-feed";

type FilterOption = {
  value: HomeFilterType;
  label: string;
};

const FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "전체" },
  { value: "garden", label: "Garden" },
  { value: "article", label: "Article" },
];

type HomeFilterChipsProps = {
  selected: HomeFilterType;
  onSelect: (next: HomeFilterType) => void;
};

export function HomeFilterChips({ selected, onSelect }: HomeFilterChipsProps) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="콘텐츠 타입 필터">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={selected === option.value}
          className={`ui-hover rounded-full px-3 py-1.5 text-xs transition ${
            selected === option.value
              ? "bg-tertiary-background/70 font-semibold text-primary"
              : "text-secondary hover:bg-secondary-background/70 hover:text-primary"
          }`}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
