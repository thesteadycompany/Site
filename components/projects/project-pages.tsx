import type { ReactNode } from "react";
import { TheDriverProjectPage } from "@/components/projects/pages/thedriver";

const projectPages: Record<string, () => ReactNode> = {
  thedriver: () => <TheDriverProjectPage />,
};

export function getProjectPageRenderer(slug: string): ReactNode | null {
  const render = projectPages[slug];
  return render ? render() : null;
}
