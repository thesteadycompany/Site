import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { MainLayout } from "@/components/MainLayout";
import { DEFAULT_COVER_IMAGE, getAllArticles, getArticleBySlug } from "@/lib/articles";

type GardenArticlePageProps = {
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

  const url = `${BASE_URL}/garden/${slug}`;
  const description = article.subtitle ?? article.title;
  const coverImage = article.coverImage || DEFAULT_COVER_IMAGE;
  const coverImageUrl = toAbsoluteUrl(coverImage);

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
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 675,
          alt: `${article.title} cover image`,
        },
      ],
      publishedTime: toIsoDateString(article.date),
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [coverImageUrl],
    },
  };
}

export default async function GardenArticlePage({ params }: GardenArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

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
    url: `${BASE_URL}/garden/${slug}`,
    image: toAbsoluteUrl(article.coverImage),
  };

  return (
    <MainLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto w-full max-w-3xl space-y-6 pt-6">
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
