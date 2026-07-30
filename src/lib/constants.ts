/** External services — keep in sync with docs/plan.md */
export const COURT_RESERVE_LOGIN_URL = "https://app.courtreserve.com/";
export const CATCH_CORNER_BOOKING_URL =
  "https://www.catchcorner.com/facility-page/embedded/rental/889";

export const CLUB_PHONE = "(780) 306-2395";
export const CLUB_PHONE_TEL = "+17803062395";
export const CLUB_EMAIL = "info@edmontonsquashclub.ca";
export const MEMBERSHIP_SIGNUP_MAILTO = `mailto:${CLUB_EMAIL}?subject=${encodeURIComponent("Membership signup")}`;
export const CLUB_ADDRESS = "15330 111 Ave NW, Edmonton, AB T5M 4C8";
export const CLUB_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=15330+111+Ave+NW+Edmonton+AB+T5M+4C8";

/** Inquiry form mail — To/From hardcoded; only RESEND_API_KEY stays in env. */
export const CONTACT_FORM_TO = [
  "drewlefe@gmail.com",
  CLUB_EMAIL, // info@edmontonsquashclub.ca
  "tyler@edmontonsquashclub.org",
] as const;
export const CONTACT_FORM_BCC = [
  "jimdawson@live.ca",
  "jeff.williams@edmontonsquashclub.ca",
] as const;
export const CONTACT_FORM_FROM =
  "Edmonton Squash Club <hello@edmontonsquashclub.ca>";

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/edmontonsquashclub/",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/YEGSquashClub",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC4-hHQLVKQBzLFU98qY-pKQ",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/edmontonsquashclub/",
  },
] as const;
