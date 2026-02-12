import Link from "next/link";
import type { HomeFeedItem } from "@/lib/home-feed";

type HomeHeroCardProps = {
  item: HomeFeedItem;
};

export function HomeHeroCard({ item }: HomeHeroCardProps) {
  return (
    <section className="p-0 sm:p-0">
      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-primary sm:text-5xl">{item.title}</h1>
      {item.subtitle ? <p className="mt-3 max-w-3xl text-sm leading-7 text-secondary sm:text-base">{item.subtitle}</p> : null}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={item.url}
          className="inline-flex min-w-[132px] items-center justify-center rounded-full bg-secondary-background px-5 py-2.5 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
        >
          대표 글 읽기
        </Link>
        <a
          href="#home-feed"
          className="inline-flex min-w-[132px] items-center justify-center rounded-full bg-secondary-background px-5 py-2.5 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
        >
          최신 피드 보기
        </a>
      </div>
    </section>
  );
}
