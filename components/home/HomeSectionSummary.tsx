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
    <section className="rounded-2xl p-4 sm:p-5">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <p className="mt-1 text-sm text-secondary">{description}</p>
      </div>
      <ul className="grid gap-1">
        {items.map((item) => (
          <li key={`${item.contentType}-${item.slug}`}>
            <Link href={item.url} className="ui-hover ui-hover-soft flex items-start justify-between gap-3 rounded-lg py-2">
              <span className="text-sm text-primary">{item.title}</span>
              <span className="shrink-0 text-xs text-tertiary">{item.date}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href={href} className="ui-hover mt-3 inline-flex text-sm text-secondary underline underline-offset-4">
        {title} 전체 보기
      </Link>
    </section>
  );
}
