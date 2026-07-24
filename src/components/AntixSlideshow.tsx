import {
  antixPlayUrl,
  antixSponsors,
  type AntixVariant,
} from "@/data/antix-sponsors";

export default function AntixSlideshow({
  variant = "landscape",
}: {
  variant?: AntixVariant;
}) {
  const insert = antixSponsors[variant];

  return (
    <div className={`mx-auto w-full ${insert.maxWidthClass}`}>
      <div className={`relative w-full ${insert.aspectClass}`}>
        <iframe
          title={insert.title}
          src={antixPlayUrl(insert.webGuid)}
          className="absolute inset-0 h-full w-full border-0"
          scrolling="no"
          loading="lazy"
        />
      </div>
    </div>
  );
}
