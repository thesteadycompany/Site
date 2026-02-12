import Image from "next/image";
import Link from "next/link";
import type { HomeFeedItem } from "@/lib/home-feed";

type HomeFeedCardProps = {
  item: HomeFeedItem;
};

export function HomeFeedCard({ item }: HomeFeedCardProps) {
  const isGarden = item.contentType === "garden";

  return (
    <article className="rounded-2xl border border-border bg-secondary-background/70 transition hover:-translate-y-0.5 hover:border-tertiary">
      <Link
        href={item.url}
        className={`grid gap-3 p-3 ${isGarden ? "md:grid-cols-[1fr_280px] md:items-center md:gap-4 md:p-4" : ""}`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                isGarden
                  ? "border-emerald-700/30 bg-emerald-700/10 text-emerald-700 dark:text-emerald-300"
                  : "border-blue-700/30 bg-blue-700/10 text-blue-700 dark:text-blue-300"
              }`}
            >
              {isGarden ? "Garden" : "Article"}
            </span>
            <span className="text-xs text-tertiary">{item.date}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold leading-6 text-primary">{item.title}</h3>
          {item.subtitle ? <p className="mt-1 line-clamp-2 text-sm text-secondary">{item.subtitle}</p> : null}
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <li key={`${item.slug}-${tag}`} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-secondary">
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
            className="order-first h-auto w-full rounded-lg md:order-none"
          />
        ) : null}
      </Link>
    </article>
  );
}
