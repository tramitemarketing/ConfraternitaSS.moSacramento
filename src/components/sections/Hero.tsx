"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { patternFleur } from "@/components/ui/Ornaments";
import Teschio from "@/components/ui/Teschio";

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contentParallax = Math.min(offset * 0.35, 250);
  const bgParallax = offset * 0.15;
  const fade = Math.max(1 - offset / 600, 0);

  // Scroll esplicito: su Safari mobile lo scroll-to-hash nativo è inaffidabile
  // quando il target è già parzialmente visibile. scrollIntoView rispetta lo
  // scroll-margin CSS (scroll-mt-20), quindi allinea sempre la sezione sotto la navbar.
  function scrollToSection(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 scale-110"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
          transform: `translateY(${bgParallax}px)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: patternFleur,
          transform: `translateY(${bgParallax * 0.5}px)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Attenua la fascia bassa (oro brillante del gradiente) così che
          testo bianco e indicatore "Scorri" restino sempre leggibili */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0) 100%)",
        }}
      />

      <Teschio className="hero-ornament absolute w-[55vh] h-[55vh] object-contain text-oro opacity-[0.06] float-slow pointer-events-none" />

      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ transform: `translateY(${contentParallax}px)`, opacity: fade }}
      >
        {/* Badge 2026 */}
        <div className="hero-anim hero-delay-1 inline-flex items-center bg-oro/15 border border-oro/40 rounded-full px-4 py-1.5 mb-6 max-w-xs sm:max-w-none text-center">
          <span className="text-oro text-xs font-bold tracking-wide uppercase leading-snug">
            2026 · Borghi più belli d&apos;Italia nelle Marche
          </span>
        </div>

        <h1 className="hero-anim hero-delay-2 text-bianco text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-2">
          Confraternita della
        </h1>
        <h1 className="hero-anim hero-delay-2 text-oro-chiaro text-3xl md:text-5xl lg:text-6xl font-bold italic leading-tight mb-3">
          Pietà e della Morte
        </h1>
        <p className="hero-anim hero-delay-3 text-bianco-soft text-xl md:text-2xl tracking-[0.3em] uppercase mb-8">
          Monteprandone
        </p>

        <div className="hero-anim hero-delay-3 w-20 h-px bg-oro/60 mx-auto mb-8" />

        <p className="hero-anim hero-delay-4 text-bianco-soft text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12 font-light">
          La Processione del Cristo Morto del Venerdì Santo.
          <span className="block mt-2 text-base md:text-lg text-bianco-soft/80">
            Oltre 300 figuranti in costume storico — dal XVII secolo.
          </span>
        </p>

        <div className="hero-anim hero-delay-5 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/#processione"
            onClick={(e) => scrollToSection(e, "processione")}
            className="btn btn-primary btn-shimmer text-base md:text-lg md:px-10 md:py-4"
          >
            Scopri la Processione
          </Link>
          <Link
            href="/#chi-siamo"
            onClick={(e) => scrollToSection(e, "chi-siamo")}
            className="btn btn-outline btn-sm"
          >
            La nostra storia
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
      >
        <span className="text-bianco-soft text-xs tracking-widest uppercase">
          Scorri
        </span>
        <svg
          className="scroll-indicator w-5 h-5 text-oro-chiaro"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9 L12 15 L18 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
