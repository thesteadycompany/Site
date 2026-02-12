#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const sourceDir = "/Users/hongsungjun/Develop/iOS/hogumachu.github.io/Content/article";
const targetDir = path.join(process.cwd(), "content", "article");

function findFirstHeading(markdown) {
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.slice(2).trim();
    }
  }
  return "";
}

function fallbackTitleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toOutputMarkdown({ author, title, subtitle, date, tags, published, content }) {
  const frontmatter = ["---", `author: ${author}`, `title: ${title}`];

  if (subtitle) {
    frontmatter.push(`subtitle: ${subtitle}`);
  }

  frontmatter.push(`date: ${date}`, `tags: ${tags}`, `published: ${published}`, "---");
  return `${frontmatter.join("\n")}\n\n${content.trim()}\n`;
}

async function main() {
  await fs.mkdir(targetDir, { recursive: true });

  const fileNames = await fs.readdir(sourceDir);
  const markdownFiles = fileNames.filter((fileName) => fileName.endsWith(".md"));

  for (const fileName of markdownFiles) {
    const sourcePath = path.join(sourceDir, fileName);
    const raw = await fs.readFile(sourcePath, "utf8");
    const { data, content } = matter(raw);
    const slug = fileName.replace(/\.md$/i, "");

    const parsedTitle = findFirstHeading(content);
    const title = parsedTitle || fallbackTitleFromSlug(slug);
    const subtitle = typeof data.description === "string" ? data.description.trim() : "";
    const author = typeof data.author === "string" && data.author.trim() ? data.author.trim() : "hogumachu";
    const date = typeof data.date === "string" ? data.date.trim() : "";
    const tags = typeof data.tags === "string" ? data.tags.trim() : "";
    const published = data.published === true;

    const output = toOutputMarkdown({
      author,
      title,
      subtitle,
      date,
      tags,
      published,
      content,
    });

    const targetPath = path.join(targetDir, fileName);
    await fs.writeFile(targetPath, output, "utf8");
  }

  console.log(`Migrated ${markdownFiles.length} article files to ${targetDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
