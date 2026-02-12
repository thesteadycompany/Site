import type { Metadata } from "next";
import Link from "next/link";
import { MainLayout } from "@/components/MainLayout";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <MainLayout>
      <section className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center gap-14">
        <h1 className="text-center text-4xl font-bold leading-tight tracking-[0.18em] text-primary sm:text-6xl">
          THE
          <br />
          STEADY
          <br />
          COMPANY
        </h1>

        <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
          <Link
            href="/garden"
            className="group rounded-2xl border border-border bg-secondary-background p-6 transition-transform transition-colors hover:-translate-y-1 hover:border-tertiary"
          >
            <p className="mb-2 text-3xl">
              <span aria-hidden>🪴</span>
            </p>
            <p className="font-semibold text-primary">Garden</p>
            <p className="mt-2 text-sm text-secondary">정제하지 않은 짧은 글 모음</p>
          </Link>

          <a
            href="https://hogumachu.github.io"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Personal Blog (opens in a new tab)"
            className="group rounded-2xl border border-border bg-secondary-background p-6 transition-transform transition-colors hover:-translate-y-1 hover:border-tertiary"
          >
            <p className="mb-2 text-3xl">
              <span aria-hidden>📰</span>
            </p>
            <p className="font-semibold text-primary">Personal Blog</p>
            <p className="mt-2 text-sm text-secondary">긴 글과 기록 보기</p>
          </a>
        </div>
      </section>
    </MainLayout>
  );
}
