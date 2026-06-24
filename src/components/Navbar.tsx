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
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: evidenzia nella navbar la sezione attualmente visibile.
  // Sulle pagine senza queste sezioni (es. /notizie) l'observer non trova
  // nulla e semplicemente non evidenzia alcuna voce.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.split("#")[1]))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

  // Il logo riporta sempre in cima: in homepage scrolla in alto (anche se
  // l'URL contiene un hash), altrove naviga normalmente verso "/".
  const handleLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
    }
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
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Torna all'inizio della pagina"
          className="flex items-center gap-3 group min-w-0"
        >
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
          {links.map((l) => {
            const id = l.href.split("#")[1];
            const isActive = active === id;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                aria-current={isActive ? "true" : undefined}
                className={`nav-underline text-sm transition-colors duration-200 tracking-wide ${
                  isActive
                    ? "nav-active"
                    : "text-bianco-soft hover:text-oro"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden text-bianco-soft flex items-center justify-center min-w-[44px] min-h-[44px] -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
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
