"use client";
import { useState } from "react";

// Foto del percorso caricata nella repo: public/percorso-processione.png
// Finché il file non è presente, viene mostrato un placeholder.
export default function PercorsoFoto() {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 text-bianco-soft/50">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-12 h-12 text-oro/40 mb-3"
          aria-hidden="true"
        >
          <path
            d="M9 20 L3 17 V4 L9 7 M9 20 L15 17 M9 20 V7 M15 17 L21 20 V7 L15 4 M15 17 V4 M9 7 L15 4"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-sm">La mappa del percorso sarà presto disponibile.</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/percorso-processione.png"
      alt="Mappa illustrata del percorso della Processione del Cristo Morto a Monteprandone"
      className="w-full h-full object-contain bg-bianco-soft"
      onError={() => setErr(true)}
    />
  );
}
