"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/events", label: "Events" },
    { href: "/team", label: "Team" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-google-border/50"
          : "bg-white border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <span className="text-google-blue font-mono font-bold text-lg leading-none tracking-tighter">
                &lt;/&gt;
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-google-dark text-[15px] leading-tight">
                GDGoC
              </span>
              <span className="text-[10px] text-google-gray font-medium tracking-wide uppercase leading-tight">
                BME
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-google-gray hover:text-google-dark transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-google-light"
              >
                {l.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-google-border mx-2" />
            <a
              href="https://gdg.community.dev/gdg-on-campus-budapest-university-of-technology-and-economics/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-google-dark text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-google-dark/90 transition-all hover:shadow-lg hover:shadow-google-dark/20"
            >
              Join Us
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-google-light transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 text-google-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-google-border/50 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block px-3 py-2.5 text-google-dark hover:bg-google-light rounded-lg text-sm font-medium transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://gdg.community.dev/gdg-on-campus-budapest-university-of-technology-and-economics/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2.5 bg-google-dark text-white rounded-lg text-sm font-medium text-center mt-2"
            >
              Join Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
