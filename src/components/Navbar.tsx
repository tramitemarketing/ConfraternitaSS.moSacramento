"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#chi-siamo", label: "Chi Siamo" },
  { href: "/#attivita", label: "Attività" },
  { href: "/#notizie", label: "Notizie" },
  { href: "/#contatti", label: "Contatti" },
  { href: "/notizie", label: "Blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-marrone shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-oro text-2xl leading-none">✝</span>
          <div className="leading-tight">
            <p className="text-crema font-semibold text-sm tracking-wide">
              SS.mo Sacramento
            </p>
            <p className="text-crema opacity-70 text-xs tracking-wider uppercase">
              Monteprandone
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-crema text-sm hover:text-oro transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-crema p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-marrone border-t border-marrone-medio px-6 pb-5 pt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-crema hover:text-oro transition-colors border-b border-marrone-medio last:border-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
