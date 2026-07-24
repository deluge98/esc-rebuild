export type AntixVariant = "landscape" | "square" | "portrait";

export type AntixInsert = {
  webGuid: string;
  title: string;
  width: number;
  height: number;
  /** Tailwind max-width class matching the insert’s native width */
  maxWidthClass: string;
  /** Tailwind aspect-ratio class — keep native ratio when scaling */
  aspectClass: string;
};

const REFRESH_AT = 15;

export const antixSponsors: Record<AntixVariant, AntixInsert> = {
  landscape: {
    webGuid: "1deefc7cc6084325a75be5bbabb17552",
    title: "Antix System (Website - Landscape)",
    width: 600,
    height: 300,
    maxWidthClass: "max-w-[600px]",
    aspectClass: "aspect-[2/1]",
  },
  square: {
    webGuid: "ca361d50572b435eb7a7147e91987297",
    title: "Antix System (Website - Square)",
    width: 600,
    height: 600,
    maxWidthClass: "max-w-[600px]",
    aspectClass: "aspect-square",
  },
  portrait: {
    webGuid: "fcdaba6df9864a10ad254e0b8e84ccf9",
    title: "Antix System (Website - Portrait)",
    width: 300,
    height: 600,
    maxWidthClass: "max-w-[300px]",
    aspectClass: "aspect-[1/2]",
  },
};

export function antixPlayUrl(webGuid: string): string {
  return `https://antix.ca/Play?webGuid=${webGuid}&refreshAt=${REFRESH_AT}`;
}
