import Image from "next/image";

type PageHeroProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/** Featured-image banner — natural aspect ratio, no cropping (matches live GP page-header-image). */
export default function PageHero({
  src,
  alt,
  width = 1200,
  height = 630,
}: PageHeroProps) {
  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="block h-auto w-full"
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
    </div>
  );
}
