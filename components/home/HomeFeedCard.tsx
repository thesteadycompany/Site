import Image from "next/image";
import Link from "next/link";
import type { HomeFeedItem } from "@/lib/home-feed";

type HomeFeedCardProps = {
  item: HomeFeedItem;
};

export function HomeFeedCard({ item }: HomeFeedCardProps) {
  const isGarden = item.contentType === "garden";
  const badgeClassName = isGarden
    ? "bg-[var(--badge-garden-bg)] text-[var(--badge-garden-text)]"
    : "bg-[var(--badge-article-bg)] text-[var(--badge-article-text)]";
  const badgeLabel = isGarden ? "Garden" : "Article";
  const shouldShowImage = Boolean(item.coverImage);

  return (
    <article className="group">
      <Link
        href={item.url}
        className={`ui-hover ui-hover-lift grid gap-3 rounded-2xl ${
          shouldShowImage ? "md:grid-cols-[1fr_280px] md:items-center md:gap-4" : ""
        }`}
      >
        <div className="min-w-0 py-1">
          <div className="flex items-center gap-2">
            <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold ${badgeClassName}`}>{badgeLabel}</span>
            <span className="text-xs text-tertiary">{item.date}</span>
          </div>
          <h3 className="mt-2 text-xl font-semibold leading-7 text-primary transition-colors group-hover:text-secondary sm:text-2xl sm:leading-8">
            {item.title}
          </h3>
          {item.subtitle ? <p className="mt-1 line-clamp-2 text-sm text-secondary">{item.subtitle}</p> : null}
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <li key={`${item.slug}-${tag}`} className="rounded-full bg-secondary-background px-2 py-0.5 text-[11px] font-medium text-primary/85">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        {shouldShowImage ? (
          <div className="relative order-first aspect-video w-full overflow-hidden rounded-xl md:order-none">
            <Image
              src={item.coverImage!}
              alt={`${item.title} cover image`}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
