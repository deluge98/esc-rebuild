export type PageHeroConfig = {
  src: string;
  width: number;
  height: number;
};

const CLUB_SIGN_HERO: PageHeroConfig = {
  src: "/images/heroes/club-sign.jpg",
  width: 1200,
  height: 400,
};

/** Featured-image banners from the live WordPress site (GeneratePress page-header-image). */
export const PAGE_HEROES: Record<string, PageHeroConfig> = {
  sponsors: CLUB_SIGN_HERO,
  "coaches-and-club-pros": CLUB_SIGN_HERO,
  facilities: CLUB_SIGN_HERO,
};

export function getPageHero(slug: string): PageHeroConfig | null {
  return PAGE_HEROES[slug] ?? null;
}
