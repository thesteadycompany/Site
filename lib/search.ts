export type SearchableItem = {
  slug: string;
  title: string;
  subtitle?: string;
  tags: string[];
  contentType: "garden" | "article";
  url: string;
  date: string;
  coverImage?: string;
  hasCover: boolean;
};

export function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function matchesQuery(item: SearchableItem, normalizedQuery: string): boolean {
  if (!normalizedQuery) {
    return false;
  }

  const title = normalizeSearchText(item.title);
  const subtitle = normalizeSearchText(item.subtitle ?? "");
  const tags = item.tags.map((tag) => normalizeSearchText(tag));

  return title.includes(normalizedQuery) || subtitle.includes(normalizedQuery) || tags.some((tag) => tag.includes(normalizedQuery));
}

export function searchItems(items: SearchableItem[], query: string): SearchableItem[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return [];
  }

  return items.filter((item) => matchesQuery(item, normalizedQuery));
}
