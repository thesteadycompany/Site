import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thesteadycompany.github.io"),
  title: {
    default: "THE STEADY COMPANY",
    template: "%s | THE STEADY COMPANY",
  },
  description: "Hogumachu's personal blog with Garden notes and long-form Articles.",
  keywords: ["개발 블로그", "iOS", "Swift", "AI", "프로그래밍", "THE STEADY COMPANY"],
  alternates: {
    canonical: "https://thesteadycompany.github.io",
  },
  openGraph: {
    title: "THE STEADY COMPANY",
    description: "Hogumachu's personal blog with Garden notes and long-form Articles.",
    url: "https://thesteadycompany.github.io",
    siteName: "THE STEADY COMPANY",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "THE STEADY COMPANY",
    description: "Hogumachu's personal blog with Garden notes and long-form Articles.",
  },
  verification: {
    google: "google6a751de03e3b3eb2.html",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
