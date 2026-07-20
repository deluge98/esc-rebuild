import AmbassadorForm from "@/components/forms/AmbassadorForm";
import ContactInquiryForm from "@/components/forms/ContactInquiryForm";
import JuniorInquiryForm from "@/components/forms/JuniorInquiryForm";
import PageContent, { PageHeader } from "@/components/PageContent";
import {
  FORM_ID_BY_PAGE,
  type ContactFormPageSlug,
} from "@/data/contact-forms";
import { getPage } from "@/lib/content";

type Props = {
  slug: ContactFormPageSlug;
};

const FORM_SECTION_TITLE: Record<ContactFormPageSlug, string> = {
  "adult-programs": "Contact us",
  "junior-programs-2": "Contact us",
  "junior-programs-2-copy": "Contact us",
  "become-an-esc-club-ambassador": "ESC Ambassador",
};

export default function ContentWithContactForm({ slug }: Props) {
  const page = getPage(slug);
  if (!page) return null;

  const formId = FORM_ID_BY_PAGE[slug];

  return (
    <>
      <PageHeader title={page.title} />
      <PageContent html={page.content} />
      <section
        className="mt-10 border-t border-gray-200 pt-8"
        aria-labelledby="inquiry-form-heading"
      >
        <h2
          id="inquiry-form-heading"
          className="font-display text-2xl font-normal uppercase tracking-wide text-esc-black"
        >
          {FORM_SECTION_TITLE[slug]}
        </h2>
        {formId === "contact-inquiry" &&
          (slug === "adult-programs" || slug === "junior-programs-2-copy") && (
            <ContactInquiryForm pageSlug={slug} />
          )}
        {formId === "junior-inquiry" && <JuniorInquiryForm />}
        {formId === "ambassador" && <AmbassadorForm />}
      </section>
    </>
  );
}
