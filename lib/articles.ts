import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "garden");
const PUBLIC_DIRECTORY = path.join(process.cwd(), "public");
export const DEFAULT_COVER_IMAGE = "/images/covers/default-cover.jpg";

type ArticleFrontmatter = {
  author: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  date: string;
  tags: string;
  published: boolean;
};

export type Article = {
  slug: string;
  author: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  date: string;
  tags: string[];
  published: boolean;
  content: string;
};

export type ArticleSummary = Omit<Article, "content">;

function parseTags(rawTags: string): string[] {
  if (!rawTags) {
    return [];
  }

  return rawTags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.md$/i, "");
}

function toComparableTime(dateString: string): number {
  const normalized = dateString.includes("T")
    ? dateString
    : `${dateString.replace(" ", "T")}:00+09:00`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function doesLocalCoverImageExist(coverImagePath: string): boolean {
  const normalizedPath = coverImagePath.split(/[?#]/, 1)[0];
  if (!normalizedPath.startsWith("/") || normalizedPath.includes("..")) {
    return false;
  }

  const absolutePath = path.join(PUBLIC_DIRECTORY, normalizedPath.replace(/^\//, ""));
  return fsSync.existsSync(absolutePath);
}

function resolveCoverImage(rawCoverImage?: string): string {
  if (!rawCoverImage) {
    return DEFAULT_COVER_IMAGE;
  }

  const trimmed = rawCoverImage.trim();
  if (!trimmed) {
    return DEFAULT_COVER_IMAGE;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (!doesLocalCoverImageExist(trimmed)) {
    return DEFAULT_COVER_IMAGE;
  }

  return trimmed;
}

function toArticle(fileName: string, fileContent: string): Article {
  const slug = toSlug(fileName);
  const { data, content } = matter(fileContent);
  const frontmatter = data as ArticleFrontmatter;

  return {
    slug,
    author: frontmatter.author,
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    coverImage: resolveCoverImage(frontmatter.coverImage),
    date: frontmatter.date,
    tags: parseTags(frontmatter.tags),
    published: frontmatter.published,
    content,
  };
}

export async function getAllArticles(): Promise<ArticleSummary[]> {
  const fileNames = await fs.readdir(ARTICLES_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"));

  const allArticles = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(ARTICLES_DIRECTORY, fileName);
      const fileContent = await fs.readFile(filePath, "utf8");
      return toArticle(fileName, fileContent);
    }),
  );

  return allArticles
    .filter((article) => article.published)
    .map((article) => ({
      slug: article.slug,
      author: article.author,
      title: article.title,
      subtitle: article.subtitle,
      coverImage: article.coverImage,
      date: article.date,
      tags: article.tags,
      published: article.published,
    }))
    .sort((a, b) => toComparableTime(b.date) - toComparableTime(a.date));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIRECTORY, `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const article = toArticle(`${slug}.md`, fileContent);
    if (!article.published) {
      return null;
    }
    return article;
  } catch {
    return null;
  }
}
