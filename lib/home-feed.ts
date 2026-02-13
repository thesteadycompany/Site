import { getAllArticles } from "@/lib/articles";
import { getAllPersonalArticles } from "@/lib/personal-articles";
import { getAllPublishedProjects } from "@/lib/projects";

export type HomeFilterType = "all" | "garden" | "article";

export type HomeFeedItem = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  coverImage?: string;
  contentType: "garden" | "article";
  hasCover: boolean;
  url: string;
};

export type HomeProjectItem = {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
  stack: string[];
  thumbnail?: string;
  url: string;
};

export type HomeFeedData = {
  allItems: HomeFeedItem[];
  hero: HomeFeedItem | null;
  latest10: HomeFeedItem[];
  gardenHighlights: HomeFeedItem[];
  articleHighlights: HomeFeedItem[];
  projectHighlights: HomeProjectItem[];
};

function toComparableTime(dateString: string): number {
  const normalized = dateString.includes("T")
    ? dateString
    : `${dateString.replace(" ", "T")}:00+09:00`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

export async function getHomeFeed(): Promise<HomeFeedData> {
  const [gardenArticles, personalArticles, projects] = await Promise.all([
    getAllArticles(),
    getAllPersonalArticles(),
    getAllPublishedProjects(),
  ]);

  const gardenItems: HomeFeedItem[] = gardenArticles.map((item) => ({
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    date: item.date,
    tags: item.tags,
    coverImage: item.coverImage,
    contentType: "garden",
    hasCover: true,
    url: `/garden/${item.slug}`,
  }));

  const personalItems: HomeFeedItem[] = personalArticles.map((item) => ({
    slug: item.slug,
    title: item.title,
    subtitle: item.subtitle,
    date: item.date,
    tags: item.tags,
    coverImage: item.coverImage,
    contentType: "article",
    hasCover: Boolean(item.coverImage),
    url: `/article/${item.slug}`,
  }));

  const projectItems: HomeProjectItem[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    updatedAt: project.updatedAt,
    stack: project.stack,
    thumbnail: project.thumbnail,
    url: `/projects/${project.slug}`,
  }));

  const allItems = [...gardenItems, ...personalItems].sort(
    (a, b) => toComparableTime(b.date) - toComparableTime(a.date),
  );
  const heroCandidates = [...gardenItems, ...personalItems].sort((a, b) => toComparableTime(b.date) - toComparableTime(a.date));

  return {
    allItems,
    hero: heroCandidates[0] ?? null,
    latest10: allItems.slice(0, 10),
    gardenHighlights: gardenItems.slice(0, 3),
    articleHighlights: personalItems.slice(0, 3),
    projectHighlights: projectItems.slice(0, 3),
  };
}
