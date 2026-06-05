// Icone SVG line-art per attività e social. Stroke = currentColor.

interface IconProps {
  className?: string;
}

/* ---------- Attività ---------- */

export function IconCandela({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 6 C22 10, 20 12, 20 15 C20 17.2 21.8 19 24 19 C26.2 19 28 17.2 28 15 C28 12, 26 10, 24 6 Z" stroke="currentColor" strokeWidth="1.6" />
      <rect x="18" y="22" width="12" height="20" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="24" y1="19" x2="24" y2="22" stroke="currentColor" strokeWidth="1.6" />
      <line x1="14" y1="42" x2="34" y2="42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconChiesa({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <line x1="24" y1="4" x2="24" y2="12" stroke="currentColor" strokeWidth="1.6" />
      <line x1="20" y1="7" x2="28" y2="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M24 12 L36 22 L36 42 L12 42 L12 22 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 42 L20 32 C20 30, 21.8 28, 24 28 C26.2 28, 28 30, 28 32 L28 42" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function IconMani({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 12 C24 12 20 20 20 26 C20 30 24 32 24 32 C24 32 28 30 28 26 C28 20 24 12 24 12 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 38 C14 33 18 32 24 32 C30 32 34 33 34 38" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 28 C10 28 13 30 16 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M38 28 C38 28 35 30 32 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconRete({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="10" r="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="34" r="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="37" cy="34" r="5" stroke="currentColor" strokeWidth="1.6" />
      <line x1="21" y1="14" x2="14" y2="29" stroke="currentColor" strokeWidth="1.6" />
      <line x1="27" y1="14" x2="34" y2="29" stroke="currentColor" strokeWidth="1.6" />
      <line x1="16" y1="34" x2="32" y2="34" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ---------- Social / Contatti ---------- */

export function IconInstagram({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function IconFacebook({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 8 L14 6.5 C14 5.7 14.4 5 16 5 L17 5 L17 2 L14.5 2 C12 2 11 3.6 11 5.8 L11 8 L9 8 L9 11 L11 11 L11 22 L14 22 L14 11 L16.5 11 L17 8 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTelefono({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 3 L9 3 L11 8 L8.5 10 C9.5 12.5 11.5 14.5 14 15.5 L16 13 L21 15 L21 18 C21 19.5 19.5 21 18 21 C10 20.5 3.5 14 3 6 C3 4.5 4.5 3 6 3 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function IconEmail({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7 L12 13 L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLuogo({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 22 C12 22 19 15 19 9.5 C19 5.4 15.9 2 12 2 C8.1 2 5 5.4 5 9.5 C5 15 12 22 12 22 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
