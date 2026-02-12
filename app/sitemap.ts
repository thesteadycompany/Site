import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { getAllPersonalArticles } from "@/lib/personal-articles";

const BASE_URL = "https://thesteadycompany.github.io";
export const dynamic = "force-static";

function toDate(dateString: string): Date {
  const normalized = dateString.includes("T")
    ? dateString
    : `${dateString.replace(" ", "T")}:00+09:00`;

  return new Date(normalized);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const personalArticles = await getAllPersonalArticles();

  const gardenEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/garden/${article.slug}`,
    lastModified: toDate(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  const personalArticleEntries: MetadataRoute.Sitemap = personalArticles.map((article) => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified: toDate(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/garden`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/article`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...gardenEntries,
    ...personalArticleEntries,
  ];
}
