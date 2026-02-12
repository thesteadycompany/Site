import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thesteadycompany.github.io"),
  title: {
    default: "THE STEADY COMPANY",
    template: "%s | THE STEADY COMPANY",
  },
  description: "Hogumachu's personal garden blog.",
  openGraph: {
    title: "THE STEADY COMPANY",
    description: "Hogumachu's personal garden blog.",
    url: "https://thesteadycompany.github.io",
    siteName: "THE STEADY COMPANY",
    type: "website",
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
