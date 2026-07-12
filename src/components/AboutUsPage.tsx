import Image from "next/image";
import { PageHeader } from "@/components/PageContent";
import { ABOUT_INTRO, STAFF_PROFILES } from "@/data/staff";

export default function AboutUsPage() {
  return (
    <>
      <PageHeader title="About Us" />

      <p className="mb-8 font-body text-base leading-relaxed text-gray-700 sm:text-lg">
        {ABOUT_INTRO}
      </p>

      <h2 className="mb-6 font-display text-[1.75rem] font-normal uppercase leading-none tracking-wide text-esc-black sm:mb-8 sm:text-3xl">
        Staff and Club Pros
      </h2>

      <div className="space-y-12">
        {STAFF_PROFILES.map((person) => (
          <article
            key={person.name}
            className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-start md:gap-8"
          >
            <div className="mx-auto w-[160px] shrink-0 text-center sm:w-[180px] md:mx-0 md:w-[225px]">
              <Image
                src={person.imageSrc}
                alt={person.imageAlt}
                width={person.imageWidth}
                height={person.imageHeight}
                className="mx-auto h-auto w-full rounded-none"
                sizes="(max-width: 768px) 180px, 225px"
              />
              <h3 className="mt-3 font-display text-xl font-normal uppercase leading-none tracking-wide text-esc-black sm:text-2xl">
                {person.name}
              </h3>
              <p className="mt-1.5 font-body text-sm italic text-gray-600 sm:text-base">
                {person.role}
              </p>
            </div>

            <div className="min-w-0 flex-1 space-y-4 font-body text-base leading-relaxed text-gray-700">
              {person.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
