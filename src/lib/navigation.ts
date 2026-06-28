export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  label: string;
  href?: string;
  children: NavLink[];
};

export const mainNavSections: NavSection[] = [
  {
    label: "Memberships",
    href: "/membership-info/",
    children: [
      { label: "Membership Comparison", href: "/membership-info/" },
      { label: "Premium Membership", href: "/premium-membership/" },
      { label: "Doubles & Fitness", href: "/doubles-fitness-membership/" },
      { label: "Off-Peak Membership", href: "/off-peak-membership/" },
      { label: "Junior Membership", href: "/junior-membership/" },
    ],
  },
  {
    label: "About",
    href: "/coaches-and-club-pros/",
    children: [
      { label: "About Us", href: "/coaches-and-club-pros/" },
      { label: "Facilities", href: "/facilities/" },
      { label: "Jobs", href: "/jobs/" },
      { label: "Pro Shop", href: "/pro-shop/" },
      { label: "Blog", href: "/blog/" },
      { label: "Sponsors", href: "/sponsors/" },
      { label: "Court Booking Calendar", href: "/court-booking-calendar/" },
      { label: "Club Ambassador", href: "/become-an-esc-club-ambassador/" },
    ],
  },
  {
    label: "Programs",
    href: "/programs/",
    children: [
      { label: "All Programs", href: "/programs/" },
      { label: "Junior Programs", href: "/junior-programs-2/" },
      { label: "Adult Programs", href: "/adult-programs/" },
      { label: "Lesson Packages", href: "/junior-programs-2-copy/" },
      { label: "Doubles Squash", href: "/doubles-squash/" },
      { label: "Fitness Programs", href: "/fitness-programs/" },
      { label: "Women's Programs", href: "/women-programs/" },
      { label: "Yoga", href: "/yoga/" },
      { label: "Events", href: "/events/" },
    ],
  },
];

export function isNavActive(pathname: string, href: string): boolean {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const normalizedHref = href.endsWith("/") ? href : `${href}/`;
  if (normalizedHref === "/") return normalized === "/";
  return normalized === normalizedHref || normalized.startsWith(normalizedHref);
}

export function isSectionActive(pathname: string, section: NavSection): boolean {
  if (section.href && isNavActive(pathname, section.href)) return true;
  return section.children.some((child) => isNavActive(pathname, child.href));
}
