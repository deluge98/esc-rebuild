import Image from "next/image";
import { goldSponsors, sponsorLinkLabel } from "@/data/sponsors";

const cardClassName =
  "flex items-center justify-center rounded-lg border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-esc-red";

function SponsorLogo({
  name,
  logo,
  width,
  height,
}: {
  name: string;
  logo: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={logo}
      alt={name}
      width={width}
      height={height}
      className="h-auto max-h-16 w-full object-contain sm:max-h-20"
    />
  );
}

export default function Sponsors() {
  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-esc-black sm:text-3xl">
          Sponsors
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 bg-esc-red" />

        <ul className="mt-8 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {goldSponsors.map((sponsor) => (
            <li key={sponsor.name}>
              {sponsor.href ? (
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                  aria-label={sponsorLinkLabel(sponsor)}
                >
                  <SponsorLogo {...sponsor} />
                </a>
              ) : (
                <div className={cardClassName}>
                  <SponsorLogo {...sponsor} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
