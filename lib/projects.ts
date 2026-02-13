export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  period: string;
  role: string;
  stack: string[];
  thumbnail?: string;
  published: boolean;
  updatedAt: string;
};

const projects: ProjectMeta[] = [
  {
    slug: "thedriver",
    title: "TheDriver",
    summary: "앱 파일을 드래그앤드롭으로 설치해 비개발 직군도 테스트를 빠르게 수행할 수 있게 만든 macOS 앱",
    period: "2026.02 - 진행 중",
    role: "기획 · iOS 개발 · 제품 설계",
    stack: ["Swift", "SwiftUI", "Shell Process", "Simulator", "Android Emulator"],
    thumbnail: "/images/projects/thedriver/thedriver-screen-1.png",
    published: true,
    updatedAt: "2026-02-13 22:54",
  },
];

function toComparableTime(dateString: string): number {
  const normalized = dateString.includes("T")
    ? dateString
    : `${dateString.replace(" ", "T")}:00+09:00`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

export async function getAllProjects(): Promise<ProjectMeta[]> {
  return [...projects].sort((a, b) => toComparableTime(b.updatedAt) - toComparableTime(a.updatedAt));
}

export async function getAllPublishedProjects(): Promise<ProjectMeta[]> {
  const all = await getAllProjects();
  return all.filter((project) => project.published);
}

export async function getProjectBySlug(slug: string): Promise<ProjectMeta | null> {
  const all = await getAllProjects();
  return all.find((project) => project.slug === slug && project.published) ?? null;
}
