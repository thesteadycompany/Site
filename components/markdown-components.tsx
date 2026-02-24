import Image from "next/image";
import type { Components } from "react-markdown";

function isGitHubAttachmentAssetLink(url: string): boolean {
  return url.includes("github.com/user-attachments/assets/");
}

function looksLikeVideoLabel(text: string): boolean {
  return /(video|영상|mp4|mov|webm)/i.test(text);
}

function isVideoFilePath(url: string): boolean {
  return /\.(mp4|mov|webm)(\?.*)?$/i.test(url);
}

function getVideoMimeType(url: string): string | undefined {
  if (/\.mov(\?.*)?$/i.test(url)) return "video/quicktime";
  if (/\.mp4(\?.*)?$/i.test(url)) return "video/mp4";
  if (/\.webm(\?.*)?$/i.test(url)) return "video/webm";
  return undefined;
}

function shouldRenderAsVideo(url: string, labelText = ""): boolean {
  if (isVideoFilePath(url)) {
    return true;
  }
  return isGitHubAttachmentAssetLink(url) && looksLikeVideoLabel(labelText);
}

export const markdownComponents: Components = {
  a: ({ href, children }) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
    const childText = (Array.isArray(children) ? children : [children])
      .map((child) => (typeof child === "string" ? child : ""))
      .join(" ")
      .trim();

    if (typeof href === "string" && shouldRenderAsVideo(href, childText)) {
      return (
        <span className="my-5 block">
          <video
            controls
            playsInline
            preload="metadata"
            className="mx-auto block h-auto max-h-[70vh] w-full max-w-[420px] rounded-xl border border-border bg-black object-contain"
          >
            <source src={href} type={getVideoMimeType(href)} />
            브라우저가 video 태그를 지원하지 않습니다. <a href={href}>영상 링크</a>
          </video>
        </span>
      );
    }

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

    if (shouldRenderAsVideo(src, alt ?? "")) {
      return (
        <span className="my-5 block">
          <video
            controls
            playsInline
            preload="metadata"
            className="mx-auto block h-auto max-h-[70vh] w-full max-w-[420px] rounded-xl border border-border bg-black object-contain"
          >
            <source src={src} type={getVideoMimeType(src)} />
            브라우저가 video 태그를 지원하지 않습니다. <a href={src}>영상 링크</a>
          </video>
        </span>
      );
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
