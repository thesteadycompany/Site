import type { Metadata } from "next";
import { MainLayout } from "@/components/MainLayout";
import { ProjectCard } from "@/components/projects/ProjectPrimitives";
import { getAllPublishedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "제품처럼 설계하고 운영한 포트폴리오 프로젝트를 정리한 공간입니다.",
};

export default async function ProjectsPage() {
  const projects = await getAllPublishedProjects();

  return (
    <MainLayout>
      <section className="mx-auto w-full max-w-5xl space-y-8">
        <header className="space-y-2 pt-6">
          <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-primary sm:text-5xl">Projects</h1>
          <p className="text-sm leading-7 text-secondary sm:text-base">
            문제 정의부터 구현, 운영까지 경험한 프로젝트를 정리합니다. 각 프로젝트는 목적에 맞게 다른 UI로 구성됩니다.
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="rounded-2xl bg-secondary-background/40 p-6 text-sm leading-7 text-secondary sm:text-base">
            아직 공개된 프로젝트가 없습니다. 곧 첫 포트폴리오를 추가할 예정입니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
    </MainLayout>
  );
}
