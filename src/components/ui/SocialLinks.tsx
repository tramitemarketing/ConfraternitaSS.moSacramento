import { contatti } from "@/lib/site";
import {
  IconInstagram,
  IconFacebook,
  IconTelefono,
  IconEmail,
} from "./Icons";

interface Props {
  /** dimensione icona in px */
  size?: number;
  className?: string;
}

/**
 * Mostra le icone social/contatto solo per i valori effettivamente compilati
 * in lib/site.ts. Se tutti vuoti, non renderizza nulla.
 */
export default function SocialLinks({ size = 20, className = "" }: Props) {
  const links = [
    contatti.instagram && {
      href: contatti.instagram,
      label: "Instagram",
      Icon: IconInstagram,
      external: true,
    },
    contatti.facebook && {
      href: contatti.facebook,
      label: "Facebook",
      Icon: IconFacebook,
      external: true,
    },
    contatti.telefono && {
      href: `tel:${contatti.telefono.replace(/\s/g, "")}`,
      label: "Telefono",
      Icon: IconTelefono,
      external: false,
    },
    contatti.email && {
      href: `mailto:${contatti.email}`,
      label: "Email",
      Icon: IconEmail,
      external: false,
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    Icon: (p: { className?: string }) => React.JSX.Element;
    external: boolean;
  }[];

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="inline-flex items-center justify-center rounded-full border border-current/30 p-2.5 transition-all duration-300 hover:scale-110 hover:border-current hover:bg-current/10"
        >
          <span style={{ width: size, height: size }} className="block">
            <Icon className="w-full h-full" />
          </span>
        </a>
      ))}
    </div>
  );
}
