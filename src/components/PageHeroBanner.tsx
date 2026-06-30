import PageHero from "@/components/PageHero";
import { getPageHero } from "@/data/page-heroes";

type PageHeroBannerProps = {
  slug: string;
  title: string;
};

export default function PageHeroBanner({ slug, title }: PageHeroBannerProps) {
  const hero = getPageHero(slug);
  if (!hero) return null;

  return (
    <PageHero
      src={hero.src}
      alt={`${title} — Edmonton Squash Club`}
      width={hero.width}
      height={hero.height}
    />
  );
}
