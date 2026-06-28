import MembershipPricingTable from "@/components/MembershipPricingTable";
import { PageHeader } from "@/components/PageContent";

export default function MembershipInfoPage() {
  return (
    <div>
      <PageHeader title="Membership Info" />
      <MembershipPricingTable />
    </div>
  );
}
