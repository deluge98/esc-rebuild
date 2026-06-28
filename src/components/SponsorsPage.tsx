import Link from "next/link";
import Sponsors from "@/components/Sponsors";
import { PageHeader } from "@/components/PageContent";

export default function SponsorsPage() {
  return (
    <div>
      <PageHeader
        title="2024 Edmonton Squash Club Sponsors"
        subtitle="Our club could not be what it is without our volunteers and sponsors."
      />
      <Link
        href="/sponsorshipoffer/"
        className="mb-8 inline-flex rounded-full bg-esc-red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-esc-red-dark"
      >
        View our Sponsorship Offering
      </Link>
      <Sponsors embedded />
    </div>
  );
}
