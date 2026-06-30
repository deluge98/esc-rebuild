/** Individual membership detail pages (not membership-info comparison). */
export const MEMBERSHIP_DETAIL_SLUGS = [
  "premium-membership",
  "doubles-fitness-membership",
  "off-peak-membership",
  "junior-membership",
  "basic-membership",
  "basic-legacy-membership",
] as const;

export type MembershipDetailSlug = (typeof MEMBERSHIP_DETAIL_SLUGS)[number];

export function isMembershipDetailSlug(slug: string): slug is MembershipDetailSlug {
  return (MEMBERSHIP_DETAIL_SLUGS as readonly string[]).includes(slug);
}

export function getMembershipHeroImage(slug: MembershipDetailSlug): string {
  return `/images/membership/${slug}.jpg`;
}
