import type { ReactNode } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { SocialFooter } from "@/components/SocialFooter";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavigationBar />
      <main id="main-content" className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6">
        {children}
      </main>
      <SocialFooter />
    </>
  );
}
