import { ThemeToggle } from "@/components/ThemeToggle";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/thesteadycompany",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hogumachu/",
  },
];

export function SocialFooter() {
  return (
    <footer className="mt-20 border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-5 text-sm text-secondary">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${item.label} (opens in a new tab)`}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </footer>
  );
}
