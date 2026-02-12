import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const PERSONAL_ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "article");

type PersonalArticleFrontmatter = {
  author: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  date: string;
  tags: string;
  published: boolean;
};

export type PersonalArticle = {
  slug: string;
  author: string;
  title: string;
  subtitle?: string;
  coverImage?: string;
  date: string;
  tags: string[];
  published: boolean;
  content: string;
};

export type PersonalArticleSummary = Omit<PersonalArticle, "content">;

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

function toPersonalArticle(fileName: string, fileContent: string): PersonalArticle {
  const slug = toSlug(fileName);
  const { data, content } = matter(fileContent);
  const frontmatter = data as PersonalArticleFrontmatter;

  return {
    slug,
    author: frontmatter.author,
    title: frontmatter.title,
    subtitle: frontmatter.subtitle,
    coverImage: frontmatter.coverImage?.trim() || undefined,
    date: frontmatter.date,
    tags: parseTags(frontmatter.tags),
    published: frontmatter.published,
    content,
  };
}

export async function getAllPersonalArticles(): Promise<PersonalArticleSummary[]> {
  const fileNames = await fs.readdir(PERSONAL_ARTICLES_DIRECTORY);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"));

  const allArticles = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const filePath = path.join(PERSONAL_ARTICLES_DIRECTORY, fileName);
      const fileContent = await fs.readFile(filePath, "utf8");
      return toPersonalArticle(fileName, fileContent);
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

export async function getPersonalArticleBySlug(slug: string): Promise<PersonalArticle | null> {
  const filePath = path.join(PERSONAL_ARTICLES_DIRECTORY, `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const article = toPersonalArticle(`${slug}.md`, fileContent);
    if (!article.published) {
      return null;
    }
    return article;
  } catch {
    return null;
  }
}
