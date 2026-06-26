export type Sponsor = {
  name: string;
  logo: string;
  href?: string;
  /** Accessible label for the outbound link */
  linkLabel?: string;
  width: number;
  height: number;
};

export const goldSponsors: Sponsor[] = [
  {
    name: "Pozniak HD Field Services",
    logo: "/images/sponsor-pozniak.png",
    href: "https://www.facebook.com/HeavyDutyTechnician/",
    linkLabel: "Visit Pozniak HD Field Services on Facebook",
    width: 300,
    height: 202,
  },
  {
    name: "Bee Clean Building Maintenance",
    logo: "/images/sponsor-bee-clean.png",
    href: "https://bee-clean.com/",
    width: 300,
    height: 117,
  },
  {
    name: "Oak Point Developments",
    logo: "/images/sponsor-oak-point.png",
    href: "https://www.oakpoint.ca/",
    width: 300,
    height: 215,
  },
  {
    name: "Access Automotive",
    logo: "/images/sponsor-access-automotive.png",
    href: "https://accessautomotive.ca/",
    width: 300,
    height: 97,
  },
  {
    name: "Task Concrete",
    logo: "/images/sponsor-task-concrete.png",
    href: "https://taskconcrete.com/",
    width: 300,
    height: 133,
  },
  {
    name: "Timber Benefits",
    logo: "/images/sponsor-timber-benefits.png",
    href: "https://timberbenefits.com/",
    width: 300,
    height: 106,
  },
  {
    name: "CMB Insurance",
    logo: "/images/sponsor-cmb-insurance.png",
    href: "https://cmbinsurance.ca/",
    width: 300,
    height: 120,
  },
  {
    name: "Rotex Supply",
    logo: "/images/sponsor-rotex-supply.jpg",
    href: "https://rotexsupply.com/",
    width: 300,
    height: 193,
  },
];

export function sponsorLinkLabel(sponsor: Sponsor): string {
  return sponsor.linkLabel ?? `Visit ${sponsor.name}`;
}
