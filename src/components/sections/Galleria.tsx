"use client";
import { useState, useEffect, useCallback } from "react";
import { DivisoreOrnato, AngoloOrnato } from "@/components/ui/Ornaments";

// Placeholder: ogni slide ha un gradiente e una didascalia.
// Sostituisci `image` con un URL reale quando disponibile (resta retrocompatibile:
// se `image` è presente viene mostrata, altrimenti si vede il gradiente segnaposto).
interface Slide {
  titolo: string;
  descrizione: string;
  gradient: string;
  emoji: string;
  image?: string;
}

const slides: Slide[] = [
  {
    titolo: "La nostra chiesa",
    descrizione: "Il cuore della vita liturgica della confraternita",
    gradient: "linear-gradient(135deg, #0A0A0B 0%, #6E561F 70%, #C9A24A 100%)",
    emoji: "⛪",
  },
  {
    titolo: "Adorazione Eucaristica",
    descrizione: "Il primo giovedì di ogni mese, riuniti in preghiera",
    gradient: "linear-gradient(135deg, #15130E 0%, #8C6A2B 100%)",
    emoji: "🕯️",
  },
  {
    titolo: "Le processioni",
    descrizione: "Partecipazione attiva alla vita della parrocchia",
    gradient: "linear-gradient(135deg, #0A0A0B 0%, #C9A24A 60%, #EBCB73 100%)",
    emoji: "✝",
  },
  {
    titolo: "La comunità",
    descrizione: "Confratelli e consorelle, una grande famiglia",
    gradient: "linear-gradient(135deg, #15130E 0%, #6E561F 55%, #C9A24A 100%)",
    emoji: "🤝",
  },
];

export default function Galleria() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    []
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="galleria"
      className="py-28 scroll-mt-20"
      style={{ backgroundColor: "#15130E" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
            Momenti di comunità
          </p>
          <h2 className="text-4xl md:text-6xl text-bianco mb-6">Galleria</h2>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto" />
        </div>

        {/* Carosello */}
        <div className="relative">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            {slides.map((slide, i) => (
              <div
                key={slide.titolo}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: i === current ? 1 : 0 }}
                aria-hidden={i !== current}
              >
                {slide.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.image}
                    alt={slide.titolo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: slide.gradient }}
                  >
                    <span className="text-[12rem] opacity-20 select-none">
                      {slide.emoji}
                    </span>
                  </div>
                )}

                {/* Cornici ornamentali agli angoli */}
                <AngoloOrnato className="absolute top-5 left-5 w-10 h-10 text-bianco-soft/60" />
                <AngoloOrnato className="absolute top-5 right-5 w-10 h-10 text-bianco-soft/60 rotate-90" />
                <AngoloOrnato className="absolute bottom-5 left-5 w-10 h-10 text-bianco-soft/60 -rotate-90" />
                <AngoloOrnato className="absolute bottom-5 right-5 w-10 h-10 text-bianco-soft/60 rotate-180" />

                {/* Overlay testo */}
                <div className="absolute inset-0 bg-gradient-to-t from-nero/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center">
                  <h3 className="text-bianco text-2xl md:text-4xl mb-2">
                    {slide.titolo}
                  </h3>
                  <p className="text-bianco-soft/80 text-sm md:text-lg max-w-xl mx-auto">
                    {slide.descrizione}
                  </p>
                </div>
              </div>
            ))}

            {/* Frecce */}
            <button
              onClick={prev}
              aria-label="Precedente"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bianco-soft/15 backdrop-blur-sm text-bianco-soft flex items-center justify-center hover:bg-bianco-soft hover:text-nero transition-all duration-300 z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M15 6 L9 12 L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Successivo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-bianco-soft/15 backdrop-blur-sm text-bianco-soft flex items-center justify-center hover:bg-bianco-soft hover:text-nero transition-all duration-300 z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Indicatori */}
          <div className="flex justify-center gap-3 mt-6">
            {slides.map((s, i) => (
              <button
                key={s.titolo}
                onClick={() => setCurrent(i)}
                aria-label={`Vai alla slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-oro"
                    : "w-2.5 bg-bianco-soft/25 hover:bg-bianco-soft/50"
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-bianco-soft/50 text-sm mt-8 italic">
          Le immagini mostrate sono segnaposto — presto le sostituiremo con foto
          reali della nostra comunità.
        </p>
      </div>
    </section>
  );
}
