import {
  CLUB_ADDRESS,
  CLUB_EMAIL,
  CLUB_MAPS_URL,
  CLUB_PHONE,
  CLUB_PHONE_TEL,
  SOCIAL_LINKS,
} from "@/lib/constants";

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "Facebook":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "Twitter":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer>
      <div className="bg-[#e8edf0] py-6">
        <ul className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-esc-black/70 transition-colors hover:text-esc-red"
                aria-label={`${social.label} (opens in new tab)`}
              >
                <SocialIcon label={social.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-esc-black text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide">Contact</h2>
            <address className="mt-4 space-y-2 not-italic text-white/80">
              <p>
                <a
                  href={CLUB_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {CLUB_ADDRESS}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a href={`tel:${CLUB_PHONE_TEL}`} className="hover:text-white">
                  {CLUB_PHONE}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${CLUB_EMAIL}`} className="hover:text-white">
                  {CLUB_EMAIL}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide">
              Operating Hours
            </h2>
            <div className="mt-4 space-y-2 text-white/80">
              <p>Mon–Friday: 4 PM – 10 PM</p>
              <p>Saturday/Sunday: 10 AM – 6 PM</p>
              <p className="pt-2 text-sm text-white/60">
                The Club is often staffed outside of regular hours — call at least
                1 day in advance for further information.
              </p>
              <p className="text-sm text-white/60">
                Members can access the facility from 5 AM – 12 AM, 365 days a year
                with their key fob.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
          © Edmonton Squash Club 2015–{new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
