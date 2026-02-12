import type { Metadata } from "next";
import { MainLayout } from "@/components/MainLayout";
import { PersonalArticlePreview } from "@/components/PersonalArticlePreview";
import { getAllPersonalArticles } from "@/lib/personal-articles";

export const metadata: Metadata = {
  title: "Article",
  description: "정제된 장문 글을 모아 둔 개인 아카이브입니다.",
};

export default async function ArticlePage() {
  const articles = await getAllPersonalArticles();

  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-5xl space-y-8">
        <header className="space-y-2 pt-6">
          <h1 className="text-3xl font-bold text-primary sm:text-4xl">Article</h1>
          <p className="text-secondary">정제된 장문 글을 모아 둔 개인 아카이브입니다.</p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <PersonalArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
