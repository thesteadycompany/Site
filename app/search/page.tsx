import type { Metadata } from "next";
import { Suspense } from "react";
import { MainLayout } from "@/components/MainLayout";
import { SearchPageContent } from "@/components/search/SearchPageContent";
import { getHomeFeed } from "@/lib/home-feed";

export const metadata: Metadata = {
  title: "Search",
};

export default async function SearchPage() {
  const feed = await getHomeFeed();

  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-5xl pt-6">
        <Suspense fallback={<p className="text-secondary">검색 결과를 불러오는 중입니다.</p>}>
          <SearchPageContent items={feed.allItems} />
        </Suspense>
      </section>
    </MainLayout>
  );
}
