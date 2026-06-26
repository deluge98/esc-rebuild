import Image from "next/image";
import Link from "next/link";
import {
  CATCH_CORNER_BOOKING_URL,
  CLUB_PHONE,
  CLUB_PHONE_TEL,
  COURT_RESERVE_LOGIN_URL,
} from "@/lib/constants";

const navItems = [
  { label: "Home", href: "/" as const, current: true },
  { label: "Memberships", href: null },
  { label: "About", href: null },
  { label: "Programs", href: null },
];

function CtaLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-esc-red font-semibold text-white transition-colors hover:bg-esc-red-dark ${className}`}
    >
      {children}
    </a>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-3 py-2 sm:px-6 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:hidden">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Edmonton Squash Club"
              width={160}
              height={46}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <a
            href={`tel:${CLUB_PHONE_TEL}`}
            className="shrink-0 text-xs font-semibold text-esc-black"
          >
            {CLUB_PHONE}
          </a>
        </div>

        <div className="mt-1.5 flex gap-2 sm:hidden">
          <CtaLink
            href={COURT_RESERVE_LOGIN_URL}
            className="flex-1 px-2 py-1.5 text-xs"
          >
            Member Login
          </CtaLink>
          <CtaLink
            href={CATCH_CORNER_BOOKING_URL}
            className="flex-1 px-2 py-1.5 text-xs"
          >
            Book Court
          </CtaLink>
        </div>

        <div className="hidden items-center justify-between gap-4 sm:flex">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Edmonton Squash Club"
              width={180}
              height={52}
              priority
              className="h-10 w-auto lg:h-11"
            />
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${CLUB_PHONE_TEL}`}
              className="text-sm font-semibold text-esc-black"
            >
              {CLUB_PHONE}
            </a>
            <CtaLink href={COURT_RESERVE_LOGIN_URL} className="px-4 py-1.5 text-sm">
              Member Login
            </CtaLink>
            <CtaLink
              href={CATCH_CORNER_BOOKING_URL}
              className="px-4 py-1.5 text-sm"
            >
              Book Court
            </CtaLink>
          </div>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className="border-t-2 border-esc-red bg-esc-black"
      >
        <ul className="mx-auto flex max-w-6xl items-center justify-center px-1 sm:px-4">
          {navItems.map((item) => (
            <li key={item.label} className="shrink-0">
              {item.href ? (
                <Link
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={`block px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-white sm:px-5 sm:py-2.5 sm:text-sm ${
                    item.current ? "bg-white/15" : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="block cursor-not-allowed px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-white/50 sm:px-5 sm:py-2.5 sm:text-sm"
                  aria-disabled="true"
                  title="Coming soon on the new site"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
