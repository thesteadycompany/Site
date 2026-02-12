import Link from "next/link";
import { MainLayout } from "@/components/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <section className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6 pt-12 sm:pt-16">
        <p className="rounded-full bg-secondary-background px-3 py-1 text-xs font-semibold tracking-[0.12em] text-tertiary">
          404 NOT FOUND
        </p>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight text-primary sm:text-5xl">페이지를 찾을 수 없습니다.</h1>
          <p className="text-base leading-7 text-secondary sm:text-lg">
            주소가 변경되었거나 삭제된 페이지일 수 있습니다. 아래 링크에서 다시 탐색해 보세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/"
            className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-secondary-background px-4 py-2 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
          >
            홈으로
          </Link>
          <Link
            href="/garden"
            className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-secondary-background px-4 py-2 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
          >
            Garden
          </Link>
          <Link
            href="/article"
            className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-secondary-background px-4 py-2 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
          >
            Article
          </Link>
          <Link
            href="/search"
            className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-secondary-background px-4 py-2 text-sm font-medium text-primary transition-transform hover:-translate-y-0.5"
          >
            검색
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
