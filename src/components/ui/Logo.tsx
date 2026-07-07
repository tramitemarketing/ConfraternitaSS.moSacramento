"use client";
import { useState } from "react";
import Image from "next/image";
import { CroceOrnata } from "./Ornaments";

/**
 * Logo completo della Confraternita (sigillo circolare).
 * Mostra il file /public/logo-confraternita.png ottimizzato da next/image
 * (webp/avif, ridimensionato); se non è ancora stato caricato, ripiega
 * automaticamente sulla croce ornamentale, così la navbar/footer non mostrano
 * mai un'immagine rotta.
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
    <Image
      src="/logo-confraternita.png"
      alt="Logo della Confraternita della Pietà e della Morte di Monteprandone"
      width={96}
      height={96}
      className={className}
      onError={() => setErr(true)}
      priority
    />
  );
}
