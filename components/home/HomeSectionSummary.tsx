import Link from "next/link";
import type { HomeFeedItem } from "@/lib/home-feed";

type HomeSectionSummaryProps = {
  title: string;
  description: string;
  href: string;
  items: HomeFeedItem[];
};

export function HomeSectionSummary({ title, description, href, items }: HomeSectionSummaryProps) {
  return (
    <section className="rounded-2xl border border-border bg-background p-4 sm:p-5">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <p className="mt-1 text-sm text-secondary">{description}</p>
      </div>
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={`${item.contentType}-${item.slug}`} className="border-t border-border/70 first:border-t-0">
            <Link href={item.url} className="flex items-start justify-between gap-3 py-2">
              <span className="text-sm text-primary">{item.title}</span>
              <span className="shrink-0 text-xs text-tertiary">{item.date}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={href} className="mt-3 inline-flex border-b border-current text-sm text-secondary hover:text-primary">
        {title} 전체 보기
      </Link>
    </section>
  );
}
