import { MEMBERSHIP_SIGNUP_MAILTO } from "@/lib/constants";

export type MembershipTier = {
  id: string;
  name: string;
  price: string;
  signUpUrl: string;
  /** Included features align by index with `featureNames`. */
  included: boolean[];
};

export const MEMBERSHIP_FEATURE_NAMES = [
  "Fob Access",
  "Fitness Room",
  "Steam Room",
  "Doubles",
  "Free Towels",
  "PlaySight",
  "Off-Peak Singles",
  "Prime Time Singles",
  "Ball Machine",
  "ESL Eligible",
] as const;

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "junior-student",
    name: "Junior/Student",
    price: "$65.00 / Month",
    signUpUrl: MEMBERSHIP_SIGNUP_MAILTO,
    included: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: "off-peak",
    name: "Off Peak",
    price: "$65.00 / Month",
    signUpUrl: MEMBERSHIP_SIGNUP_MAILTO,
    included: [true, true, true, true, true, true, true, false, false, false],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$130 / Month",
    signUpUrl: MEMBERSHIP_SIGNUP_MAILTO,
    included: [true, true, true, true, true, true, true, true, true, true],
  },
  {
    id: "doubles",
    name: "Doubles",
    price: "$50.00 / Month",
    signUpUrl: MEMBERSHIP_SIGNUP_MAILTO,
    included: [true, true, true, true, true, false, false, false, false, false],
  },
];

export const MEMBERSHIP_FOOTER_NOTE =
  "All memberships require a $15.00 fee for a key fob. All doubles memberships require a $15 registration fee. Discounts are available for 1-year prepaid premium accounts (one month discount) and for students and seniors (10% for Premium & Premium ESL memberships). Drop-ins are available during staffed hours for $20.00/visit for off-peak or $25.00/visit for peak time ($12.00 for ages 25 and under or 60 and over). Guests of members can drop in for $15.00/day during off-peak hours or $20.00 during peak hours. All prices are exclusive of GST.";
