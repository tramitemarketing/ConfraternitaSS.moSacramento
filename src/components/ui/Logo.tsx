"use client";
import { useState } from "react";
import { CroceOrnata } from "./Ornaments";

/**
 * Logo completo della Confraternita (sigillo circolare).
 * Mostra il file /public/logo-confraternita.png; se non è ancora stato
 * caricato, ripiega automaticamente sulla croce ornamentale, così la
 * navbar/footer non mostrano mai un'immagine rotta.
 */
export default function Logo({
  className = "",
  fallbackClassName,
}: {
  className?: string;
  fallbackClassName?: string;
}) {
  const [err, setErr] = useState(false);
  if (err) return <CroceOrnata className={fallbackClassName ?? className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-confraternita.png"
      alt="Logo della Confraternita della Pietà e della Morte di Monteprandone"
      className={className}
      onError={() => setErr(true)}
    />
  );
}
