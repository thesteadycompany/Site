import type { Metadata } from "next";
import { Suspense } from "react";
import { HomeFeed } from "@/components/home/HomeFeed";
import { MainLayout } from "@/components/MainLayout";
import { getHomeFeed } from "@/lib/home-feed";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const feed = await getHomeFeed();

  return (
    <MainLayout>
      <Suspense fallback={<section className="mx-auto w-full max-w-6xl pt-4" />}>
        <HomeFeed data={feed} />
      </Suspense>
    </MainLayout>
  );
}
