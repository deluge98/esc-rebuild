export type Sponsor = {
  name: string;
  logo: string;
  /** Company homepage when publicly findable; omitted if none located */
  href?: string;
  width: number;
  height: number;
};

export const goldSponsors: Sponsor[] = [
  {
    name: "Pozniak HD Field Services",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Pozniak-HD-Field-Services-300x202.png",
    href: "https://www.facebook.com/HeavyDutyTechnician/",
    width: 300,
    height: 202,
  },
  {
    name: "Bee Clean Building Maintenance",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Bee-Clean-Logo-clean_logos_One-Colour-300x117.png",
    href: "https://bee-clean.com/",
    width: 300,
    height: 117,
  },
  {
    name: "Oak Point Developments",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Oakpoint-Logo-2021-Stacked-Slogan-2-300x215.png",
    href: "https://www.oakpoint.ca/",
    width: 300,
    height: 215,
  },
  {
    name: "Access Automotive",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Access-Automotive-Logo-2024-300x97.png",
    href: "https://accessautomotive.ca/",
    width: 300,
    height: 97,
  },
  {
    name: "Task Concrete",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Task-Concrete-300x133.png",
    href: "https://taskconcrete.com/",
    width: 300,
    height: 133,
  },
  {
    name: "Timber Benefits",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/Timber_Logo_CMYK-1-300x106.png",
    href: "https://timberbenefits.com/",
    width: 300,
    height: 106,
  },
  {
    name: "CMB Insurance",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/cmb-logo-footer.png",
    href: "https://cmbinsurance.ca/",
    width: 300,
    height: 120,
  },
  {
    name: "Rotex Supply",
    logo: "https://edmontonsquashclub.ca/wp-content/uploads/2024/01/New-Logo-Black-w-red-1-300x193.jpg",
    href: "https://rotexsupply.com/",
    width: 300,
    height: 193,
  },
];
