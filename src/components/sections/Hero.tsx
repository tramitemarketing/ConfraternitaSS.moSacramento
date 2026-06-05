"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CroceOrnata, patternFleur } from "@/components/ui/Ornaments";

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // parallax: il contenuto sale più lentamente, lo sfondo si muove
  const contentParallax = Math.min(offset * 0.35, 250);
  const bgParallax = offset * 0.15;
  const fade = Math.max(1 - offset / 600, 0);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sfondo a gradiente caldo con parallax */}
      <div
        className="absolute inset-0 scale-110"
        style={{
          background:
            "linear-gradient(160deg, #3D1F0D 0%, #6B3A20 40%, #C4622D 80%, #C8893A 100%)",
          transform: `translateY(${bgParallax}px)`,
        }}
      />

      {/* Pattern a giglio */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: patternFleur,
          transform: `translateY(${bgParallax * 0.5}px)`,
        }}
      />

      {/* Vignetta scura ai bordi */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(61,31,13,0.55) 100%)",
        }}
      />

      {/* Croce ornamentale grande sullo sfondo */}
      <CroceOrnata className="hero-ornament absolute w-[60vh] h-[60vh] text-oro opacity-[0.06] float-slow pointer-events-none" />

      {/* Contenuto */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ transform: `translateY(${contentParallax}px)`, opacity: fade }}
      >
        <div className="hero-ornament flex justify-center mb-6">
          <CroceOrnata className="w-14 h-18 text-oro-chiaro drop-shadow-lg" />
        </div>

        <p className="hero-anim hero-delay-1 text-crema/70 tracking-[0.35em] uppercase text-sm mb-5">
          Dal 1836
        </p>

        <h1 className="hero-anim hero-delay-2 text-crema text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-2">
          Confraternita del
        </h1>
        <h1 className="hero-anim hero-delay-2 text-oro-chiaro text-3xl md:text-5xl lg:text-6xl font-bold italic leading-tight mb-3">
          SS.mo Sacramento
        </h1>
        <p className="hero-anim hero-delay-3 text-crema/80 text-xl md:text-2xl tracking-[0.3em] uppercase mb-8">
          Monteprandone
        </p>

        <div className="hero-anim hero-delay-3 w-20 h-px bg-oro/60 mx-auto mb-8" />

        <p className="hero-anim hero-delay-4 text-crema/85 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto mb-12 font-light">
          Fede, fratellanza e servizio.
          <span className="block mt-2 text-base md:text-lg text-crema/65">
            Una comunità che cammina insieme da quasi due secoli.
          </span>
        </p>

        <div className="hero-anim hero-delay-5 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#chi-siamo"
            className="btn-shimmer px-8 py-3.5 bg-oro text-marrone font-semibold rounded-full hover:bg-oro-chiaro transition-colors duration-300 tracking-wide shadow-lg"
          >
            Scopri chi siamo
          </Link>
          <Link
            href="/#notizie"
            className="px-8 py-3.5 border border-crema/70 text-crema font-semibold rounded-full hover:bg-crema hover:text-marrone transition-all duration-300 tracking-wide"
          >
            Ultime notizie
          </Link>
        </div>
      </div>

      {/* Indicatore scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
      >
        <span className="text-crema/60 text-xs tracking-widest uppercase">
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
