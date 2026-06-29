import { PageHeader } from "@/components/PageContent";
import ProgramsPageClient from "@/components/ProgramsPageClient";
import { getPage } from "@/lib/content";
import { parseProgramsContent } from "@/lib/parse-programs";

export default function ProgramsPage() {
  const page = getPage("programs");
  if (!page) return null;

  const tabs = parseProgramsContent(page.content);

  return (
    <div>
      <PageHeader title={page.title} />
      <ProgramsPageClient tabs={tabs} />
    </div>
  );
}
