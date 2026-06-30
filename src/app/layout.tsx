import type { Metadata } from "next";
import { Geist } from "next/font/google";
import SkipLink from "@/components/SkipLink";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Edmonton Squash Club",
    template: "%s | Edmonton Squash Club",
  },
  description:
    "Edmonton's only dedicated squash facility. Leagues, lessons, and programs for players ages 4 to 100.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Edmonton Squash Club",
    description:
      "Edmonton's only dedicated squash facility. Growing the Edmonton squash community.",
    locale: "en_CA",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
