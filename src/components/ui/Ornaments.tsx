// Grafiche decorative SVG in stile ornamentale / barocco religioso.
// Sostituiscono emoji e croci semplici con elementi disegnati a mano.

interface BaseProps {
  className?: string;
}

/** Croce ornata con volute laterali — elemento simbolico principale */
export function CroceOrnata({ className = "" }: BaseProps) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Asta verticale */}
      <rect x="45" y="8" width="10" height="114" rx="3" fill="currentColor" />
      {/* Braccio orizzontale */}
      <rect x="18" y="42" width="64" height="10" rx="3" fill="currentColor" />
      {/* Pomelli alle estremità */}
      <circle cx="50" cy="10" r="6" fill="currentColor" />
      <circle cx="50" cy="120" r="6" fill="currentColor" />
      <circle cx="20" cy="47" r="6" fill="currentColor" />
      <circle cx="80" cy="47" r="6" fill="currentColor" />
      {/* Volute decorative all'incrocio */}
      <path
        d="M50 52 C40 60, 32 62, 30 74 C36 70, 44 68, 50 62 C56 68, 64 70, 70 74 C68 62, 60 60, 50 52 Z"
        fill="currentColor"
        opacity="0.55"
      />
      {/* Raggi sottili */}
      <g opacity="0.4" stroke="currentColor" strokeWidth="1.5">
        <line x1="50" y1="30" x2="50" y2="20" />
        <line x1="38" y1="34" x2="33" y2="27" />
        <line x1="62" y1="34" x2="67" y2="27" />
      </g>
    </svg>
  );
}

/** Divisore ornamentale orizzontale tra le sezioni */
export function DivisoreOrnato({ className = "" }: BaseProps) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="88" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="152" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      {/* Volute centrali */}
      <path
        d="M92 12 C100 4, 108 4, 112 12 C108 20, 100 20, 92 12 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M148 12 C140 4, 132 4, 128 12 C132 20, 140 20, 148 12 Z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Rombo centrale */}
      <path d="M120 4 L126 12 L120 20 L114 12 Z" fill="currentColor" />
      <circle cx="120" cy="12" r="2" fill="var(--color-nero)" />
    </svg>
  );
}

/** Cornice ad arco — utile come decoro sopra titoli o immagini */
export function ArcoDecorativo({ className = "" }: BaseProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 58 C10 28, 32 6, 60 6 C88 6, 110 28, 110 58"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
        fill="none"
      />
      <path
        d="M20 58 C20 33, 38 14, 60 14 C82 14, 100 33, 100 58"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
        fill="none"
      />
      <circle cx="60" cy="6" r="4" fill="currentColor" />
    </svg>
  );
}

/** Pattern di sfondo ripetibile (motivo a giglio stilizzato) come data-URL */
export const patternFleur = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A24A' stroke-width='1' opacity='0.5'%3E%3Cpath d='M40 18 C36 26, 28 28, 28 36 C28 42, 34 44, 40 40 C46 44, 52 42, 52 36 C52 28, 44 26, 40 18 Z'/%3E%3Cline x1='40' y1='40' x2='40' y2='54'/%3E%3Cpath d='M32 48 C36 50, 40 50, 40 50 C40 50, 44 50, 48 48'/%3E%3C/g%3E%3C/svg%3E")`;

/** Angolo ornamentale (per cornici di card / immagini) */
export function AngoloOrnato({ className = "" }: BaseProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 44 L4 16 C4 9, 9 4, 16 4 L44 4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M12 30 C12 20, 20 12, 30 12"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <circle cx="6" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}
