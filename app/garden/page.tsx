import type { Metadata } from "next";
import { ArticlePreview } from "@/components/ArticlePreview";
import { MainLayout } from "@/components/MainLayout";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Garden",
  description: "정제하지 않은, 짧은 글을 씁니다.",
};

export default async function GardenPage() {
  const articles = await getAllArticles();

  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-5xl space-y-8">
        <header className="space-y-2 pt-6">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">
            <span aria-hidden>🪴</span> Garden
          </h1>
          <p className="text-secondary">정제하지 않은, 짧은 글을 씁니다.</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
