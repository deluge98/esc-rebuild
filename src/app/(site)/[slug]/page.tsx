import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutUsPage from "@/components/AboutUsPage";
import BlogListing from "@/components/BlogListing";
import ContentWithContactForm from "@/components/ContentWithContactForm";
import CourtBookingCalendar from "@/components/CourtBookingCalendar";
import InnerPageLayout from "@/components/InnerPageLayout";
import MembershipDetailPage from "@/components/MembershipDetailPage";
import MembershipInfoPage from "@/components/MembershipInfoPage";
import PageContent, { PageHeader } from "@/components/PageContent";
import PageHeroBanner from "@/components/PageHeroBanner";
import ProgramsPage from "@/components/ProgramsPage";
import SponsorsPage from "@/components/SponsorsPage";
import { isMembershipDetailSlug } from "@/data/membership-pages";
import { getPageHero } from "@/data/page-heroes";
import {
  getAllContentSlugs,
  getContentBySlug,
  type ContentRecord,
  type PostRecord,
} from "@/lib/content";
import {
  fullPageTitle,
  plainMetaDescription,
  plainTitle,
} from "@/lib/seo-text";
import { absoluteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ slug: string }>;
};

function AdultProgramsPage() {
  return <ContentWithContactForm slug="adult-programs" />;
}

function JuniorProgramsPage() {
  return <ContentWithContactForm slug="junior-programs-2" />;
}

function LessonPackagesPage() {
  return <ContentWithContactForm slug="junior-programs-2-copy" />;
}

function ClubAmbassadorPage() {
  return <ContentWithContactForm slug="become-an-esc-club-ambassador" />;
}

const SPECIAL_PAGES: Record<string, React.ComponentType> = {
  blog: BlogListing,
  sponsors: SponsorsPage,
  "court-booking-calendar": CourtBookingCalendar,
  "membership-info": MembershipInfoPage,
  programs: ProgramsPage,
  "coaches-and-club-pros": AboutUsPage,
  "adult-programs": AdultProgramsPage,
  "junior-programs-2": JuniorProgramsPage,
  "junior-programs-2-copy": LessonPackagesPage,
  "become-an-esc-club-ambassador": ClubAmbassadorPage,
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildMetadata(
  record: ContentRecord | PostRecord,
  slug: string,
  isPost: boolean,
): Metadata {
  const rawTitle =
    record.yoastTitle?.replace(/ [–|] Edmonton Squash Club$/u, "") ??
    record.title;
  const pageTitle = plainTitle(rawTitle);
  const documentTitle = fullPageTitle(pageTitle);
  const description = plainMetaDescription(
    record.yoastDescription ||
      record.excerpt ||
      `${record.title} — Edmonton Squash Club`,
  );
  const canonical = absoluteUrl(slug);

  return {
    // Absolute so <title> and og:title stay identical (no template double-suffix).
    title: {
      absolute: documentTitle,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: documentTitle,
      description,
      type: isPost ? "article" : "website",
      url: canonical,
      ...(isPost && "date" in record
        ? { publishedTime: record.date }
        : {}),
    },
  };
}

export async function generateStaticParams() {
  return getAllContentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) return {};
  return buildMetadata(content.data, slug, content.type === "post");
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const content = getContentBySlug(slug);
  if (!content) notFound();

  if (isMembershipDetailSlug(slug)) {
    return <MembershipDetailPage slug={slug} />;
  }

  const SpecialComponent = SPECIAL_PAGES[slug];
  const pageHero = content.type === "page" ? getPageHero(slug) : null;
  const hero =
    pageHero && content.type === "page" ? (
      <PageHeroBanner slug={slug} title={content.data.title} />
    ) : undefined;

  if (SpecialComponent) {
    return (
      <InnerPageLayout hero={hero}>
        <SpecialComponent />
      </InnerPageLayout>
    );
  }

  if (content.type === "post") {
    return (
      <InnerPageLayout>
        <PageHeader
          title={content.data.title}
          backHref="/blog/"
          backLabel="All posts"
        />
        <time
          dateTime={content.data.date}
          className="-mt-4 mb-6 block text-sm font-medium text-gray-500"
        >
          {formatDate(content.data.date)}
        </time>
        <PageContent html={content.data.content} />
      </InnerPageLayout>
    );
  }

  return (
    <InnerPageLayout hero={hero}>
      <PageHeader title={content.data.title} />
      <PageContent html={content.data.content} />
    </InnerPageLayout>
  );
}
