"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HomeFeedCard } from "@/components/home/HomeFeedCard";
import { HomeFilterChips } from "@/components/home/HomeFilterChips";
import { HomeProjectsCarousel } from "@/components/home/HomeProjectsCarousel";
import type { HomeFeedData, HomeFilterType } from "@/lib/home-feed";

type HomeFeedProps = {
  data: HomeFeedData;
};

const LATEST_FEED_COUNT = 4;

function toFilterType(value: string | null): HomeFilterType {
  if (value === "garden" || value === "article") {
    return value;
  }
  return "all";
}

export function HomeFeed({ data }: HomeFeedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedType = toFilterType(searchParams.get("type"));

  const visibleItems = useMemo(() => {
    if (selectedType === "all") {
      return data.allItems.slice(0, LATEST_FEED_COUNT);
    }

    return data.allItems.filter((item) => item.contentType === selectedType).slice(0, LATEST_FEED_COUNT);
  }, [data.allItems, selectedType]);

  function handleSelectType(next: HomeFilterType) {
    const params = new URLSearchParams(searchParams.toString());

    if (next === "all") {
      params.delete("type");
    } else {
      params.set("type", next);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 pt-2 sm:gap-10 sm:pt-4">
      {data.hero || data.projectHighlights.length > 0 ? (
        <HomeProjectsCarousel heroItem={data.hero} items={data.projectHighlights} />
      ) : null}

      <div id="home-feed" className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.16em] text-tertiary">LATEST FEED</p>
          <h2 className="mt-1 text-2xl font-bold text-primary sm:text-3xl">최신 피드</h2>
        </div>
        <HomeFilterChips selected={selectedType} onSelect={handleSelectType} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {visibleItems.map((item) => (
          <HomeFeedCard key={`${item.contentType}-${item.slug}`} item={item} />
        ))}
      </div>
    </section>
  );
}
