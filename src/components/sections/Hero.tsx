"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { patternFleur } from "@/components/ui/Ornaments";
import Teschio from "@/components/ui/Teschio";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Parallasse via requestAnimationFrame che scrive direttamente sullo stile
  // degli elementi: nessun setState → nessun re-render ad ogni frame di scroll
  // (fluido anche su cellulari datati). Disattivato con prefers-reduced-motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const offset = window.scrollY;
      const fade = String(Math.max(1 - offset / 600, 0));
      if (bgRef.current)
        bgRef.current.style.transform = `translateY(${offset * 0.15}px)`;
      if (patternRef.current)
        patternRef.current.style.transform = `translateY(${offset * 0.075}px)`;
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${Math.min(
          offset * 0.35,
          250
        )}px)`;
        contentRef.current.style.opacity = fade;
      }
      if (scrollHintRef.current) scrollHintRef.current.style.opacity = fade;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        ref={bgRef}
        className="absolute inset-0 scale-110 will-change-transform"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
        }}
      />

      <div
        ref={patternRef}
        className="absolute inset-0 opacity-[0.07] will-change-transform"
        style={{ backgroundImage: patternFleur }}
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
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto will-change-transform"
      >
        {/* Badge 2026 */}
        <div className="hero-anim hero-delay-1 inline-flex items-center bg-oro/15 border border-oro/40 rounded-full px-4 py-1.5 mb-6 max-w-xs sm:max-w-none text-center">
          <span className="text-oro text-xs font-bold tracking-wide uppercase leading-snug">
            2026 · Borghi più belli d&apos;Italia nelle Marche
          </span>
        </div>

        <h1 className="hero-anim hero-delay-2 font-bold mb-3">
          <span className="block text-bianco text-4xl md:text-6xl lg:text-7xl leading-[1.05] mb-2">
            Confraternita della
          </span>
          <span className="block text-oro-chiaro text-3xl md:text-5xl lg:text-6xl italic leading-tight">
            Pietà e della Morte
          </span>
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
            className="btn btn-outline text-sm px-6 py-2.5 md:text-lg md:px-10 md:py-4"
          >
            La nostra storia
          </Link>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
