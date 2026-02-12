import Image from "next/image";
import Link from "next/link";
import type { HomeFeedItem } from "@/lib/home-feed";

type HomeFeedCardProps = {
  item: HomeFeedItem;
};

export function HomeFeedCard({ item }: HomeFeedCardProps) {
  const isGarden = item.contentType === "garden";

  return (
    <article className="group">
      <Link
        href={item.url}
        className={`ui-hover ui-hover-lift grid gap-3 rounded-2xl ${
          isGarden ? "md:grid-cols-[1fr_280px] md:items-center md:gap-4" : ""
        }`}
      >
        <div className="min-w-0 py-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold ${
                isGarden
                  ? "bg-[var(--badge-garden-bg)] text-[var(--badge-garden-text)]"
                  : "bg-[var(--badge-article-bg)] text-[var(--badge-article-text)]"
              }`}
            >
              {isGarden ? "Garden" : "Article"}
            </span>
            <span className="text-xs text-tertiary">{item.date}</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold leading-7 text-primary transition-colors group-hover:text-secondary sm:text-2xl sm:leading-8">
            {item.title}
          </h3>
          {item.subtitle ? <p className="mt-1 line-clamp-2 text-sm text-secondary">{item.subtitle}</p> : null}
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <li key={`${item.slug}-${tag}`} className="rounded-full bg-secondary-background/70 px-2 py-0.5 text-[11px] text-secondary">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {isGarden && item.coverImage ? (
          <Image
            src={item.coverImage}
            alt={`${item.title} cover image`}
            width={1200}
            height={675}
            unoptimized
            className="order-first h-auto w-full rounded-xl md:order-none"
          />
        ) : null}
      </Link>
    </article>
  );
}
