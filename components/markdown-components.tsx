import Image from "next/image";
import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  a: ({ href, children }) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className="article-link"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="my-4 list-disc pl-6 text-secondary">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 list-decimal pl-6 text-secondary">{children}</ol>,
  li: ({ children }) => <li className="my-1 leading-8 text-secondary">{children}</li>,
  table: ({ children }) => (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse overflow-hidden rounded-xl border border-border">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border bg-secondary-background px-3 py-2 text-left font-semibold text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="border border-border px-3 py-2 text-left align-top text-secondary">{children}</td>,
  img: ({ alt, src }) => {
    if (!src || typeof src !== "string") {
      return null;
    }

    return (
      <Image
        src={src}
        alt={alt ?? "Article image"}
        width={1200}
        height={675}
        unoptimized
        className="my-5 h-auto max-w-full rounded-xl border border-border"
      />
    );
  },
};
