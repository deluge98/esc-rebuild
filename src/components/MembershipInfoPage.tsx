import MembershipPricingTable from "@/components/MembershipPricingTable";
import { PageHeader } from "@/components/PageContent";

export default function MembershipInfoPage() {
  return (
    <>
      <PageHeader title="Membership Info" variant="display" />
      <MembershipPricingTable />
    </>
  );
}
