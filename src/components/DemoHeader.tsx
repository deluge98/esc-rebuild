import Image from "next/image";

const navItems = ["Home", "Memberships", "About", "Programs"];

function CtaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-esc-red font-semibold text-white ${className}`}
    >
      {children}
    </span>
  );
}

export default function DemoHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar: logo, phone, and CTAs in as few rows as possible */}
      <div className="mx-auto max-w-6xl px-3 py-2 sm:px-6 sm:py-2.5">
        {/* Mobile: logo + phone on one line, CTAs side-by-side below */}
        <div className="flex items-center justify-between gap-2 sm:hidden">
          <Image
            src="https://edmontonsquashclub.ca/wp-content/uploads/2017/11/Edmonton-Squash-Club-Logo-Horz-outline-2col.png"
            alt="Edmonton Squash Club"
            width={160}
            height={46}
            priority
            className="h-8 w-auto"
          />
          <a
            href="tel:+17803062395"
            className="shrink-0 text-xs font-semibold text-esc-black"
          >
            780-306-2395
          </a>
        </div>

        <div className="mt-1.5 flex gap-2 sm:hidden">
          <CtaButton className="flex-1 px-2 py-1.5 text-xs">Login</CtaButton>
          <CtaButton className="flex-1 px-2 py-1.5 text-xs">Book Court</CtaButton>
        </div>

        {/* Desktop: everything on one line */}
        <div className="hidden items-center justify-between gap-4 sm:flex">
          <Image
            src="https://edmontonsquashclub.ca/wp-content/uploads/2017/11/Edmonton-Squash-Club-Logo-Horz-outline-2col.png"
            alt="Edmonton Squash Club"
            width={180}
            height={52}
            priority
            className="h-10 w-auto lg:h-11"
          />

          <div className="flex items-center gap-3">
            <a
              href="tel:+17803062395"
              className="text-sm font-semibold text-esc-black"
            >
              780-306-2395
            </a>
            <CtaButton className="px-4 py-1.5 text-sm">Member Login</CtaButton>
            <CtaButton className="px-4 py-1.5 text-sm">Book Court</CtaButton>
          </div>
        </div>
      </div>

      <nav
        aria-label="Main navigation preview"
        className="border-t-2 border-esc-red bg-esc-black"
      >
        <ul className="mx-auto flex max-w-6xl items-center justify-center px-1 sm:px-4">
          {navItems.map((item, index) => (
            <li key={item} className="shrink-0">
              <span
                className={`block px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-white sm:px-5 sm:py-2.5 sm:text-sm ${
                  index === 0 ? "bg-white/15" : ""
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
