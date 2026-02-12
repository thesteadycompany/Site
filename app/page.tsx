import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/components/MainLayout";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Home",
};

const LATEST_POST_COUNT = 4;
const TOP_TAG_COUNT = 8;

function getTopTags(allTags: string[]): string[] {
  const counts = new Map<string, number>();

  for (const tag of allTags) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return a[0].localeCompare(b[0]);
    })
    .slice(0, TOP_TAG_COUNT)
    .map(([tag]) => tag);
}

export default async function Home() {
  const articles = await getAllArticles();
  const latestArticles = articles.slice(0, LATEST_POST_COUNT);
  const topTags = getTopTags(articles.flatMap((article) => article.tags));

  return (
    <MainLayout>
      <div className="home-grid-background">
        <section className="mx-auto max-w-5xl space-y-10 pt-4 sm:space-y-14">
          <div className="home-reveal home-stagger-1 home-surface home-hero">
            <p className="text-xs font-semibold tracking-[0.2em] text-tertiary">THE STEADY COMPANY</p>
            <h1 className="home-hero-title mt-4 text-3xl font-semibold leading-tight text-primary sm:text-5xl">
              실험과 판단 기준을 빠르게 찾는
              <br />
              개인 개발 기록
            </h1>
            <p className="home-hero-copy mt-4 max-w-2xl text-sm leading-7 text-secondary sm:text-base">
              iOS, React Native, Flutter, AI, 아키텍처를 주제로 실제 시도와 선택 기준을 정리합니다. 완성된
              답보다 과정을 투명하게 기록합니다.
            </p>
            <div className="home-hero-actions mt-7 flex flex-wrap items-center gap-3">
              <a href="#latest-posts" className="home-primary-cta">
                최신 글 보러가기
              </a>
              <Link href="/garden" className="home-secondary-cta">
                Garden 전체 보기
              </Link>
            </div>
          </div>

          <section id="latest-posts" className="home-reveal home-stagger-2 space-y-4 scroll-mt-24">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-tertiary">LATEST</p>
                <h2 className="mt-1 text-2xl font-semibold text-primary">최신 글</h2>
              </div>
              <Link href="/garden" className="text-sm text-secondary transition-colors hover:text-primary">
                Garden 전체 글 보기
              </Link>
            </div>

            <div className="home-latest-grid grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
              {latestArticles.map((article) => (
                <article key={article.slug} className="home-reveal home-card home-surface group">
                  <Link href={`/garden/${article.slug}`} className="flex items-start gap-3 p-3 sm:p-4">
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-border sm:h-24 sm:w-36">
                      <Image
                        src={article.coverImage}
                        alt={`${article.title} cover image`}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="min-w-0 space-y-2">
                      <p className="text-xs text-tertiary">{article.date}</p>
                      <h3 className="home-line-clamp-2 text-base font-semibold leading-6 text-primary">{article.title}</h3>
                      {article.subtitle ? (
                        <p className="home-line-clamp-1 text-sm text-secondary">{article.subtitle}</p>
                      ) : null}
                      <ul className="flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 2).map((tag) => (
                          <li
                            key={`${article.slug}-${tag}`}
                            className="rounded-full border border-border px-2 py-0.5 text-[11px] text-secondary"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="home-reveal home-stagger-3 space-y-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-tertiary">EXPLORE</p>
              <h2 className="mt-1 text-2xl font-semibold text-primary">자주 다루는 태그</h2>
            </div>
            <div className="home-surface p-4 sm:p-5">
              <ul className="flex flex-wrap gap-2">
                {topTags.map((tag) => (
                  <li key={tag}>
                    <Link href="/garden" className="home-tag-chip">
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="home-reveal home-stagger-4 grid grid-cols-1 gap-4 pb-2 lg:grid-cols-2">
            <div className="home-surface p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-tertiary">ABOUT</p>
              <h2 className="mt-2 text-2xl font-semibold text-primary">이 블로그에서 쓰는 것</h2>
              <p className="mt-3 text-sm leading-7 text-secondary">
                iOS 네이티브 경험을 바탕으로 크로스플랫폼 전환, AI 기반 개발 방식, 모듈화와 의존성 설계를
                실험합니다. 의사결정에 도움이 되는 근거를 남기기 위해 씁니다.
              </p>
            </div>

            <div className="home-surface p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-tertiary">MORE</p>
              <h2 className="mt-2 text-2xl font-semibold text-primary">긴 글과 기록</h2>
              <p className="mt-3 text-sm leading-7 text-secondary">
                정제된 장문 아카이브는 개인 블로그에 따로 모아 두었습니다. 최신 실험 노트와 함께 읽으면 맥락이
                더 또렷해집니다.
              </p>
              <a
                href="https://hogumachu.github.io"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Personal Blog (opens in a new tab)"
                className="home-secondary-cta mt-5 inline-flex"
              >
                Personal Blog 이동
              </a>
            </div>
          </section>
        </section>
      </div>
    </MainLayout>
  );
}
