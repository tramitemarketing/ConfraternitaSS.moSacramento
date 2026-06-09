"use client";
import { useState } from "react";
import { CroceOrnata } from "./Ornaments";

/**
 * Teschio centrale del sigillo, ritagliato, usato come elemento decorativo
 * al posto delle croci nei punti principali del sito.
 * Mostra il file /public/teschio.png; se non è ancora stato caricato,
 * ripiega sulla croce ornamentale (stesso className → stesse dimensioni/colore).
 */
export default function Teschio({ className = "" }: { className?: string }) {
  const [err, setErr] = useState(false);
  if (err) return <CroceOrnata className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/teschio.png"
      alt=""
      aria-hidden="true"
      className={className}
      onError={() => setErr(true)}
    />
  );
}
