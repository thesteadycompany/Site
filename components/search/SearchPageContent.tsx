"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResultList } from "@/components/search/SearchResultList";
import type { HomeFeedItem } from "@/lib/home-feed";
import { normalizeSearchText, searchItems } from "@/lib/search";

type SearchPageContentProps = {
  items: HomeFeedItem[];
};

function toQueryValue(value: string | null): string {
  return value ?? "";
}

export function SearchPageContent({ items }: SearchPageContentProps) {
  const searchParams = useSearchParams();
  const query = toQueryValue(searchParams.get("q"));
  const normalizedQuery = normalizeSearchText(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const recommendedKeywords = useMemo(() => {
    const tagCounts = new Map<string, number>();

    for (const item of items) {
      for (const tag of item.tags) {
        const normalizedTag = normalizeSearchText(tag);
        if (!normalizedTag) {
          continue;
        }
        tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) ?? 0) + 1);
      }
    }

    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [items]);

  const latestGarden = useMemo(
    () => items.find((item) => item.contentType === "garden") ?? null,
    [items],
  );
  const latestArticle = useMemo(
    () => items.find((item) => item.contentType === "article") ?? null,
    [items],
  );

  const searchForm = (
    <form action="/search" method="get" role="search" className="flex items-center gap-2.5">
      <input
        ref={inputRef}
        type="search"
        name="q"
        defaultValue={query}
        aria-label="검색어 입력"
        placeholder="제목, 부제, 태그 검색"
        className="h-11 w-full rounded-full bg-secondary-background/70 px-4 text-base text-primary placeholder:text-tertiary"
      />
      <button
        type="submit"
        aria-label="검색"
        className="ui-hover ui-hover-soft inline-flex h-11 shrink-0 items-center rounded-full px-4 text-base text-secondary"
      >
        검색
      </button>
    </form>
  );

  const hasQuery = Boolean(normalizedQuery);
  const results = hasQuery ? searchItems(items, normalizedQuery) : [];

  return (
    <div className="space-y-4">
      {searchForm}
      {hasQuery ? (
        <>
          <p className="text-base text-secondary">
            <span className="font-medium text-primary">&quot;{query}&quot;</span> 검색 결과 {results.length}건
          </p>
          {results.length > 0 ? (
            <SearchResultList items={results} />
          ) : (
            <p className="rounded-xl bg-secondary-background/40 p-4 text-base text-secondary">
              검색 결과가 없습니다. 다른 키워드로 다시 시도해 주세요.
            </p>
          )}
        </>
      ) : null}

      <section className="space-y-3 pt-4">
        <h2 className="text-base font-semibold tracking-[0.04em] text-tertiary">추천 키워드</h2>
        <div className="flex flex-wrap gap-2">
          {recommendedKeywords.map((keyword) => (
            <Link
              key={keyword}
              href={`/search?q=${encodeURIComponent(keyword)}`}
              className="ui-hover inline-flex rounded-full bg-secondary-background px-3.5 py-1.5 text-sm text-secondary hover:bg-tertiary-background"
            >
              {keyword}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3 pt-2">
        <h2 className="text-base font-semibold tracking-[0.04em] text-tertiary">최신 콘텐츠</h2>
        <div className="grid grid-cols-1 gap-3">
          {latestGarden ? (
            <Link
              key={latestGarden.slug}
              href={latestGarden.url}
              className="ui-hover ui-hover-lift group rounded-xl p-1.5 sm:p-2"
            >
              <div className="grid gap-3 sm:grid-cols-[1fr_140px] sm:items-start">
                <div className="min-w-0">
                  <p className="text-sm text-tertiary">{latestGarden.date}</p>
                  <p className="mt-1 text-base font-semibold text-primary transition-colors group-hover:text-secondary">
                    {latestGarden.title}
                  </p>
                  {latestGarden.subtitle ? (
                    <p className="mt-1 line-clamp-2 text-sm text-secondary">{latestGarden.subtitle}</p>
                  ) : null}
                </div>
                {latestGarden.coverImage ? (
                  <div className="relative order-first h-20 w-full overflow-hidden rounded-lg sm:order-none sm:h-[84px]">
                    <Image
                      src={latestGarden.coverImage}
                      alt={`${latestGarden.title} cover image`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </Link>
          ) : null}
          {latestArticle ? (
            <Link
              key={latestArticle.slug}
              href={latestArticle.url}
              className="ui-hover ui-hover-lift group rounded-xl px-1.5 py-1"
            >
              <p className="text-sm text-tertiary">{latestArticle.date}</p>
              <p className="mt-1 text-base font-semibold text-primary transition-colors group-hover:text-secondary">
                {latestArticle.title}
              </p>
              {latestArticle.subtitle ? (
                <p className="mt-1 line-clamp-2 text-sm text-secondary">{latestArticle.subtitle}</p>
              ) : null}
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
