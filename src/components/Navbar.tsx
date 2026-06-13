"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./ui/Logo";

const links = [
  { href: "/#chi-siamo", label: "Chi Siamo" },
  { href: "/#processione", label: "Processione" },
  { href: "/#galleria", label: "Galleria" },
  { href: "/#attivita", label: "Attività" },
  { href: "/#notizie", label: "Notizie" },
  { href: "/#contatti", label: "Contatti" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Al click: se la sezione è in pagina, scrolla manualmente e rimuove subito
  // l'hash dall'URL, così lo stesso bottone resta cliccabile più volte.
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    const id = href.split("#")[1];
    const el = id ? document.getElementById(id) : null;
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-nero/95 backdrop-blur-sm shadow-lg border-b border-oro/30 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group min-w-0">
          <Logo
            className="w-11 h-11 rounded-full shrink-0 transition-transform duration-500 group-hover:scale-105"
            fallbackClassName="w-5 h-7 text-oro shrink-0 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="leading-tight min-w-0">
            <p className="text-bianco-soft font-semibold text-xs sm:text-sm tracking-wide truncate">
              Confraternita della Pietà e della Morte
            </p>
            <p className="text-bianco-soft opacity-70 text-[10px] sm:text-xs tracking-wider uppercase">
              Monteprandone
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className="nav-underline text-bianco-soft text-sm hover:text-oro transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-bianco-soft p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-nero border-t border-nero-bordo px-6 pb-5 pt-2 mt-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-bianco-soft hover:text-oro transition-colors border-b border-nero-bordo last:border-0"
              onClick={(e) => handleNavClick(e, l.href)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
