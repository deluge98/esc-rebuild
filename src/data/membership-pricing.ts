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
  "Towel Service",
  "Off-Peak Singles",
  "Prime Time Singles",
  "ESL Eligible",
] as const;

/** Column order: Premium first. Junior/Student removed (student discount noted in footer). */
export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "premium",
    name: "Premium",
    price: "$142.50 / Month",
    signUpUrl: MEMBERSHIP_SIGNUP_MAILTO,
    included: [true, true, true, true, true, true, true, true],
  },
  {
    id: "off-peak",
    name: "Off Peak",
    price: "$75.00 / Month",
    signUpUrl: MEMBERSHIP_SIGNUP_MAILTO,
    included: [true, true, true, true, true, true, false, false],
  },
  {
    id: "doubles",
    name: "Doubles",
    price: "$55.00 / Month",
    signUpUrl: MEMBERSHIP_SIGNUP_MAILTO,
    included: [true, true, true, true, true, false, false, false],
  },
];

export const MEMBERSHIP_FOOTER_NOTES = [
  "All new memberships are subject to a one-time $50.00 initiation fee that covers account creation, facility orientation, and key fob hardware and setup.",
  "A membership discount is available for 1-year prepaid accounts.",
  "Students enrolled in a full-time post-secondary program are eligible for a 20% discount on their membership fees.",
  "Non-members are welcome to play during staffed hours for a fee of $20 per individual per hour. Court bookings can be made on the CourtReserve app.",
  "Non-members are welcome to participate in ESC drop-in events for a fee of $15 per player.",
  "Social members can access the courts at the standard guest and drop-in rates.",
  "All prices listed are exclusive of GST.",
] as const;
