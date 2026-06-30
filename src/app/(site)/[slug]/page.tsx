import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/BlogListing";
import CourtBookingCalendar from "@/components/CourtBookingCalendar";
import MembershipInfoPage from "@/components/MembershipInfoPage";
import PageContent, { PageHeader } from "@/components/PageContent";
import ProgramsPage from "@/components/ProgramsPage";
import SponsorsPage from "@/components/SponsorsPage";
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

  const SpecialComponent = SPECIAL_PAGES[slug];

  return (
    <div className="bg-white py-10 sm:py-16">
      <div
        className={`mx-auto px-4 sm:px-6 ${
          slug === "membership-info" || slug === "programs"
            ? "max-w-6xl"
            : "max-w-4xl"
        }`}
      >
        {SpecialComponent ? (
          <SpecialComponent />
        ) : content.type === "post" ? (
          <>
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
          </>
        ) : (
          <>
            <PageHeader title={content.data.title} />
            <PageContent html={content.data.content} />
          </>
        )}
      </div>
    </div>
  );
}
