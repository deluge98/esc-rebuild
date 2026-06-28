"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  isNavActive,
  isSectionActive,
  mainNavSections,
  type NavSection,
} from "@/lib/navigation";

function NavDropdown({
  section,
  pathname,
  onNavigate,
}: {
  section: NavSection;
  pathname: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const active = isSectionActive(pathname, section);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-white transition-colors ${
          active ? "bg-white/15" : "hover:bg-white/10"
        }`}
      >
        {section.label}
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-50 min-w-[220px] border-t-2 border-esc-red bg-esc-black py-1 shadow-lg">
          {section.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                aria-current={isNavActive(pathname, child.href) ? "page" : undefined}
                className={`block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 ${
                  isNavActive(pathname, child.href) ? "bg-white/10 font-semibold text-white" : ""
                }`}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MainNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setExpandedSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav aria-label="Main navigation" className="border-t-2 border-esc-red bg-esc-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 lg:justify-center">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex items-center gap-2 py-2.5 text-sm font-medium uppercase tracking-wide text-white lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Menu
          </button>

          <ul className="hidden items-center lg:flex">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={`block px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-white ${
                  pathname === "/" ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                Home
              </Link>
            </li>
            {mainNavSections.map((section) => (
              <NavDropdown key={section.label} section={section} pathname={pathname} />
            ))}
          </ul>

          <div className="py-2.5 lg:hidden" aria-hidden="true">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">
              Edmonton Squash Club
            </span>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" id="mobile-nav">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,320px)] flex-col bg-esc-black shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-sm font-bold uppercase tracking-wide text-white">Menu</span>
              <button
                type="button"
                onClick={closeMobile}
                className="rounded p-1 text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto py-2">
              <li>
                <Link
                  href="/"
                  onClick={closeMobile}
                  className={`block px-4 py-3 text-sm font-medium uppercase tracking-wide text-white ${
                    pathname === "/" ? "bg-white/15" : "hover:bg-white/10"
                  }`}
                >
                  Home
                </Link>
              </li>
              {mainNavSections.map((section) => (
                <li key={section.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSection((v) => (v === section.label ? null : section.label))
                    }
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-white hover:bg-white/10"
                    aria-expanded={expandedSection === section.label}
                  >
                    {section.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        expandedSection === section.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedSection === section.label && (
                    <ul className="border-l-2 border-esc-red bg-black/30 py-1">
                      {section.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={closeMobile}
                            className={`block py-2.5 pl-6 pr-4 text-sm text-white/90 hover:bg-white/10 ${
                              isNavActive(pathname, child.href) ? "font-semibold text-white" : ""
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
