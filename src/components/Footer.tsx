import Link from "next/link";
import { DivisoreOrnato } from "./ui/Ornaments";
import Logo from "./ui/Logo";
import SocialLinks from "./ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-nero text-bianco-soft border-t border-nero-bordo">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo
                className="w-10 h-10 rounded-full shrink-0"
                fallbackClassName="w-5 h-7 text-oro shrink-0"
              />
              <span className="font-semibold tracking-wide">
                Pietà e della Morte
              </span>
            </div>
            <p className="text-bianco-soft/70 text-sm leading-relaxed">
              Confraternita della Pietà e della Morte di Monteprandone.
              <br />
              La Processione del Cristo Morto — dal XVII secolo.
            </p>
            <SocialLinks size={18} className="text-oro mt-5" />
          </div>

          <div>
            <h4 className="text-oro font-semibold mb-4 uppercase text-xs tracking-widest">
              Navigazione
            </h4>
            <ul className="space-y-2 text-sm text-bianco-soft/80">
              <li><Link href="/#chi-siamo" className="hover:text-oro transition-colors">Chi Siamo</Link></li>
              <li><Link href="/#processione" className="hover:text-oro transition-colors">Processione</Link></li>
              <li><Link href="/#galleria" className="hover:text-oro transition-colors">Galleria</Link></li>
              <li><Link href="/#attivita" className="hover:text-oro transition-colors">Attività</Link></li>
              <li><Link href="/notizie" className="hover:text-oro transition-colors">Notizie</Link></li>
              <li><Link href="/#contatti" className="hover:text-oro transition-colors">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-oro font-semibold mb-4 uppercase text-xs tracking-widest">
              La Processione
            </h4>
            <p className="text-sm text-bianco-soft/80 leading-relaxed">
              Venerdì Santo · ore 21:00
              <br />
              Chiesa San Nicolò di Bari
              <br />
              <span className="text-bianco-soft/65">Bus gratuito dalle 20:30</span>
            </p>
          </div>
        </div>

        <DivisoreOrnato className="w-40 h-6 text-oro/40 mx-auto mt-12 mb-6" />

        <div className="text-center text-xs text-bianco-soft/65">
          © {new Date().getFullYear()} Confraternita della Pietà e della Morte di
          Monteprandone. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
