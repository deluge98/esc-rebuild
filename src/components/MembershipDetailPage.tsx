import InnerPageLayout from "@/components/InnerPageLayout";
import PageContent, { PageHeader } from "@/components/PageContent";
import PageHero from "@/components/PageHero";
import {
  getMembershipHeroImage,
  type MembershipDetailSlug,
} from "@/data/membership-pages";
import { getPage } from "@/lib/content";
import { normalizeMembershipContent } from "@/lib/normalize-membership-content";

type Props = {
  slug: MembershipDetailSlug;
};

export default function MembershipDetailPage({ slug }: Props) {
  const page = getPage(slug);
  if (!page) return null;

  const content = normalizeMembershipContent(page.content);

  return (
    <InnerPageLayout
      hero={
        <PageHero
          src={getMembershipHeroImage(slug)}
          alt={`${page.title} — Edmonton Squash Club`}
        />
      }
    >
      <PageHeader title={page.title} variant="display" />
      <PageContent html={content} className="membership-detail-content" />
    </InnerPageLayout>
  );
}
