const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/thesteadycompany",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.16c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.77 2.72 1.26 3.39.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.41-5.29 5.69.41.36.78 1.08.78 2.18v3.24c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hogumachu/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
        <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM2.75 9.75h4.5v11.75h-4.5V9.75ZM9.75 9.75h4.31v1.6h.06c.6-1.14 2.08-2.35 4.29-2.35 4.58 0 5.43 3.02 5.43 6.94v5.56h-4.5v-4.93c0-1.18-.02-2.69-1.64-2.69-1.64 0-1.89 1.28-1.89 2.6v5.02h-4.5V9.75Z" />
      </svg>
    ),
  },
];

export function SocialFooter() {
  return (
    <footer className="mt-20 bg-secondary-background/70 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-3 text-secondary">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${item.label} (opens in a new tab)`}
              className="ui-hover ui-hover-soft inline-flex h-10 w-10 items-center justify-center rounded-full"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
