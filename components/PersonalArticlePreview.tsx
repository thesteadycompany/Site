import Link from "next/link";
import type { PersonalArticleSummary } from "@/lib/personal-articles";

type PersonalArticlePreviewProps = {
  article: PersonalArticleSummary;
};

export function PersonalArticlePreview({ article }: PersonalArticlePreviewProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-secondary-background transition-transform transition-colors hover:-translate-y-0.5 hover:border-tertiary">
      <Link href={`/article/${article.slug}`} className="block">
        <div className="space-y-3 p-5">
          <p className="text-sm text-tertiary">{article.date}</p>
          <h2 className="text-xl font-semibold text-primary">{article.title}</h2>
          {article.subtitle ? <p className="text-sm text-secondary">{article.subtitle}</p> : null}
          <ul className="flex flex-wrap gap-2 pt-1">
            {article.tags.map((tag) => (
              <li
                key={`${article.slug}-${tag}`}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-secondary"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
