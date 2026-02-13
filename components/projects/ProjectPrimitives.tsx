import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ProjectMeta } from "@/lib/projects";

type ProjectHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ProjectHero({ eyebrow, title, description }: ProjectHeroProps) {
  return (
    <section className="rounded-2xl bg-secondary-background/45 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tertiary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.02em] text-primary sm:text-5xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-secondary sm:text-base">{description}</p>
    </section>
  );
}

type ProjectSectionProps = {
  title: string;
  children: ReactNode;
};

export function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h3>
      {children}
    </section>
  );
}

type ProjectHighlight = {
  title: string;
  description: string;
};

type ProjectHighlightGridProps = {
  items: ProjectHighlight[];
};

export function ProjectHighlightGrid({ items }: ProjectHighlightGridProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-xl bg-secondary-background/40 p-4">
          <h3 className="text-base font-semibold text-primary">{item.title}</h3>
          <p className="mt-2 text-sm leading-7 text-secondary">{item.description}</p>
        </article>
      ))}
    </section>
  );
}

type ProjectBulletListProps = {
  items: string[];
};

export function ProjectBulletList({ items }: ProjectBulletListProps) {
  return (
    <ul className="space-y-3 text-secondary">
      {items.map((item) => (
        <li key={item} className="rounded-xl bg-secondary-background/40 px-4 py-3 text-sm leading-7 sm:text-base">
          {item}
        </li>
      ))}
    </ul>
  );
}

type ProjectMediaFrameProps = {
  children: ReactNode;
};

export function ProjectMediaFrame({ children }: ProjectMediaFrameProps) {
  return <div className="overflow-hidden rounded-2xl bg-secondary-background/30">{children}</div>;
}

type ProjectExternalLinksProps = {
  links: Array<{ href: string; label: string }>;
};

export function ProjectExternalLinks({ links }: ProjectExternalLinksProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3 text-sm">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className="ui-hover rounded-md bg-secondary-background px-3 py-1.5 text-secondary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

type ProjectCardProps = {
  project: ProjectMeta;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      <Link href={`/projects/${project.slug}`} className="ui-hover ui-hover-lift block rounded-2xl bg-secondary-background/35 p-4">
        {project.thumbnail ? (
          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl">
            <Image src={project.thumbnail} alt={`${project.title} thumbnail`} fill unoptimized className="object-cover" />
          </div>
        ) : null}
        <p className="text-xs text-tertiary">{project.period}</p>
        <h2 className="mt-2 text-xl font-semibold leading-7 text-primary transition-colors group-hover:text-secondary sm:text-2xl sm:leading-8">
          {project.title}
        </h2>
        <p className="mt-1 text-sm leading-7 text-secondary">{project.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={`${project.slug}-${tech}`} className="rounded-full bg-secondary-background/70 px-2.5 py-1 text-[11px] font-medium text-primary/85">
              {tech}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}

type ProjectDetailHeaderProps = {
  project: ProjectMeta;
};

export function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
  return (
    <header className="space-y-3">
      <p className="text-sm text-tertiary">{project.period}</p>
      <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-primary sm:text-5xl">{project.title}</h1>
      <p className="text-sm leading-7 text-secondary sm:text-base">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-secondary-background px-2.5 py-1 text-[11px] font-medium text-primary/85">{project.role}</span>
        {project.stack.map((tech) => (
          <span key={`${project.slug}-${tech}`} className="rounded-full bg-secondary-background px-2.5 py-1 text-[11px] font-medium text-primary/85">
            {tech}
          </span>
        ))}
      </div>
    </header>
  );
}

type ProjectStoryStepProps = {
  step: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export function ProjectStoryStep({ step, title, description, imageSrc, imageAlt }: ProjectStoryStepProps) {
  return (
    <section className="grid gap-4 md:grid-cols-[1.05fr_1fr] md:items-center">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-tertiary">{step}</p>
        <h3 className="text-xl font-semibold leading-7 text-primary sm:text-2xl sm:leading-8">{title}</h3>
        <p className="text-sm leading-7 text-secondary sm:text-base">{description}</p>
      </div>
      <ProjectMediaFrame>
        <div className="relative aspect-video w-full">
          <Image src={imageSrc} alt={imageAlt} fill unoptimized className="object-cover" />
        </div>
      </ProjectMediaFrame>
    </section>
  );
}
