import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/components/markdown-components";
import { MainLayout } from "@/components/MainLayout";
import { getAllPersonalArticles, getPersonalArticleBySlug } from "@/lib/personal-articles";
import { remarkSoftBreaks } from "@/lib/remark-soft-breaks";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
const BASE_URL = "https://thesteadycompany.github.io";

function toAbsoluteUrl(urlPath: string): string {
  if (urlPath.startsWith("http://") || urlPath.startsWith("https://")) {
    return urlPath;
  }

  return new URL(urlPath, BASE_URL).toString();
}

function toIsoDateString(dateString: string): string {
  const normalized = dateString.includes("T")
    ? dateString
    : `${dateString.replace(" ", "T")}:00+09:00`;

  return new Date(normalized).toISOString();
}

export async function generateStaticParams() {
  const articles = await getAllPersonalArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPersonalArticleBySlug(slug);

  if (!article) {
    return {
      title: "Not Found",
    };
  }

  const url = `${BASE_URL}/article/${slug}`;
  const description = article.subtitle ?? article.title;
  const images = article.coverImage ? [toAbsoluteUrl(article.coverImage)] : undefined;

  return {
    title: article.title,
    description,
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description,
      url,
      type: "article",
      images,
      publishedTime: toIsoDateString(article.date),
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: article.coverImage ? "summary_large_image" : "summary",
      title: article.title,
      description,
      images,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPersonalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.subtitle ?? article.title,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: toIsoDateString(article.date),
    keywords: article.tags.join(", "),
    url: `${BASE_URL}/article/${slug}`,
    image: article.coverImage ? toAbsoluteUrl(article.coverImage) : undefined,
  };

  return (
    <MainLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto w-full max-w-3xl space-y-6 pt-6">
        {article.coverImage ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src={article.coverImage}
              alt={`${article.title} cover image`}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        ) : null}
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
            remarkPlugins={[remarkGfm, remarkSoftBreaks]}
            rehypePlugins={[rehypeHighlight]}
            components={markdownComponents}
          >
            {article.content}
          </Markdown>
        </div>
      </article>
    </MainLayout>
  );
}
