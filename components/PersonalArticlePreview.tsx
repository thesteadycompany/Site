import Image from "next/image";
import Link from "next/link";
import type { PersonalArticleSummary } from "@/lib/personal-articles";

type PersonalArticlePreviewProps = {
  article: PersonalArticleSummary;
};

export function PersonalArticlePreview({ article }: PersonalArticlePreviewProps) {
  return (
    <article className="group">
      <Link href={`/article/${article.slug}`} className="ui-hover ui-hover-lift block rounded-2xl">
        <div className="space-y-3 py-1">
          {article.coverImage ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src={article.coverImage}
                alt={`${article.title} cover image`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : null}
          <p className="text-sm text-tertiary">{article.date}</p>
          <h2 className="text-xl font-semibold text-primary transition-colors group-hover:text-secondary">{article.title}</h2>
          {article.subtitle ? <p className="text-sm text-secondary">{article.subtitle}</p> : null}
          <ul className="flex flex-wrap gap-2 pt-1">
            {article.tags.map((tag) => (
              <li key={`${article.slug}-${tag}`} className="rounded-full bg-secondary-background/70 px-2.5 py-1 text-xs text-secondary">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
