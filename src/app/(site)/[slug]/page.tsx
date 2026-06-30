import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/BlogListing";
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
import { absoluteUrl } from "@/lib/site-url";

type Props = {
  params: Promise<{ slug: string }>;
};

const SPECIAL_PAGES: Record<string, React.ComponentType> = {
  blog: BlogListing,
  sponsors: SponsorsPage,
  "court-booking-calendar": CourtBookingCalendar,
  "membership-info": MembershipInfoPage,
  programs: ProgramsPage,
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
  const title = record.yoastTitle?.replace(/ \| Edmonton Squash Club$/, "") ?? record.title;
  const description =
    record.yoastDescription ||
    record.excerpt ||
    `${record.title} — Edmonton Squash Club`;
  const plainTitle = title.replace(/<[^>]+>/g, "");
  const plainDescription = description.replace(/<[^>]+>/g, "").slice(0, 160);
  const canonical = absoluteUrl(slug);

  return {
    title: plainTitle,
    description: plainDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: plainTitle,
      description: plainDescription,
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
