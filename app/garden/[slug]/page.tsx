import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { MainLayout } from "@/components/MainLayout";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

type GardenArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: GardenArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: article.title,
    description: article.subtitle ?? article.title,
  };
}

export default async function GardenArticlePage({ params }: GardenArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <MainLayout>
      <article className="mx-auto w-full max-w-3xl space-y-6 pt-6">
        <header className="space-y-3">
          <h1 className="scroll-mt-24 text-3xl font-bold text-primary sm:text-4xl">{article.title}</h1>
          {article.subtitle ? <p className="text-lg text-secondary">{article.subtitle}</p> : null}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <p className="text-sm text-tertiary">{article.date}</p>
            <span className="text-sm text-tertiary">·</span>
            <ul className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li
                  key={`${article.slug}-${tag}`}
                  className="rounded-full border border-border px-2 py-0.5 text-xs text-secondary"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="prose-content">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              img: ({ alt, src }) => {
                if (!src || typeof src !== "string") {
                  return null;
                }

                return (
                  <Image
                    src={src}
                    alt={alt ?? "Article image"}
                    width={1200}
                    height={675}
                    unoptimized
                    className="my-5 h-auto max-w-full rounded-xl border border-border"
                  />
                );
              },
            }}
          >
            {article.content}
          </Markdown>
        </div>
      </article>
    </MainLayout>
  );
}
