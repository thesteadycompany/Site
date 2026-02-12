import { HomeFeedCard } from "@/components/home/HomeFeedCard";
import type { SearchableItem } from "@/lib/search";

type SearchResultListProps = {
  items: SearchableItem[];
};

export function SearchResultList({ items }: SearchResultListProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <HomeFeedCard key={`${item.contentType}-${item.slug}`} item={item} />
      ))}
    </div>
  );
}
