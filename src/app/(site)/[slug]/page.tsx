import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing from "@/components/BlogListing";
import CourtBookingCalendar from "@/components/CourtBookingCalendar";
import MembershipInfoPage from "@/components/MembershipInfoPage";
import PageContent, { PageHeader } from "@/components/PageContent";
import SponsorsPage from "@/components/SponsorsPage";
import {
  getAllContentSlugs,
  getContentBySlug,
  type ContentRecord,
  type PostRecord,
} from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

const SPECIAL_PAGES: Record<string, React.ComponentType> = {
  blog: BlogListing,
  sponsors: SponsorsPage,
  "court-booking-calendar": CourtBookingCalendar,
  "membership-info": MembershipInfoPage,
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
  isPost: boolean,
): Metadata {
  const title = record.yoastTitle?.replace(/ \| Edmonton Squash Club$/, "") ?? record.title;
  const description =
    record.yoastDescription ||
    record.excerpt ||
    `${record.title} — Edmonton Squash Club`;

  return {
    title: title.replace(/<[^>]+>/g, ""),
    description: description.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: {
      title: title.replace(/<[^>]+>/g, ""),
      description: description.replace(/<[^>]+>/g, "").slice(0, 160),
      type: isPost ? "article" : "website",
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
  return buildMetadata(content.data, content.type === "post");
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
          slug === "membership-info" ? "max-w-6xl" : "max-w-4xl"
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
