import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/MainLayout";
import { getProjectPageRenderer } from "@/components/projects/project-pages";
import { ProjectDetailHeader } from "@/components/projects/ProjectPrimitives";
import { getAllPublishedProjects, getProjectBySlug } from "@/lib/projects";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
const BASE_URL = "https://thesteadycompany.github.io";

function toAbsoluteUrl(urlPath: string): string {
  if (urlPath.startsWith("http://") || urlPath.startsWith("https://")) {
    return urlPath;
  }

  return new URL(urlPath, BASE_URL).toString();
}

export async function generateStaticParams() {
  const projects = await getAllPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Not Found",
    };
  }

  const url = `${BASE_URL}/projects/${slug}`;
  const images = project.thumbnail ? [toAbsoluteUrl(project.thumbnail)] : undefined;

  return {
    title: project.title,
    description: project.summary,
    keywords: [...project.stack, "portfolio", "projects"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      type: "article",
      images,
    },
    twitter: {
      card: project.thumbnail ? "summary_large_image" : "summary",
      title: project.title,
      description: project.summary,
      images,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const projectPage = getProjectPageRenderer(slug);

  if (!project || !projectPage) {
    notFound();
  }

  return (
    <MainLayout>
      <article className="mx-auto w-full max-w-5xl space-y-8 pt-6">
        <ProjectDetailHeader project={project} />

        {project.thumbnail ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={project.thumbnail}
              alt={`${project.title} thumbnail`}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        ) : null}

        {projectPage}
      </article>
    </MainLayout>
  );
}
