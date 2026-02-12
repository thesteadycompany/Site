import Link from "next/link";
import type { HomeFeedItem } from "@/lib/home-feed";

type HomeHeroCardProps = {
  item: HomeFeedItem;
};

export function HomeHeroCard({ item }: HomeHeroCardProps) {
  const isGarden = item.contentType === "garden";

  return (
    <section className="p-0 sm:p-0">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
            isGarden
              ? "border-emerald-700/30 bg-emerald-700/10 text-emerald-700 dark:text-emerald-300"
              : "border-blue-700/30 bg-blue-700/10 text-blue-700 dark:text-blue-300"
          }`}
        >
          {isGarden ? "Garden" : "Article"}
        </span>
      </div>
      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-primary sm:text-5xl">{item.title}</h1>
      {item.subtitle ? <p className="mt-3 max-w-3xl text-sm leading-7 text-secondary sm:text-base">{item.subtitle}</p> : null}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={item.url}
          className="inline-flex min-w-[120px] items-center justify-center rounded-full border border-primary/70 bg-white px-4 py-2 text-sm font-semibold !text-black transition hover:opacity-90 dark:bg-white dark:!text-black"
        >
          대표 글 읽기
        </Link>
        <a
          href="#home-feed"
          className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-secondary transition hover:border-tertiary hover:text-primary"
        >
          최신 피드 보기
        </a>
      </div>
    </section>
  );
}
