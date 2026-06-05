import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-marrone text-crema">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-oro text-xl">✝</span>
              <span className="font-semibold tracking-wide">
                SS.mo Sacramento
              </span>
            </div>
            <p className="text-crema opacity-70 text-sm leading-relaxed">
              Confraternita del Santissimo Sacramento di Monteprandone.<br />
              Fondata nel 1836, al servizio della comunità.
            </p>
          </div>

          <div>
            <h4 className="text-oro font-semibold mb-4 uppercase text-xs tracking-widest">
              Navigazione
            </h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link href="/#chi-siamo" className="hover:text-oro transition-colors">Chi Siamo</Link></li>
              <li><Link href="/#attivita" className="hover:text-oro transition-colors">Attività</Link></li>
              <li><Link href="/notizie" className="hover:text-oro transition-colors">Notizie</Link></li>
              <li><Link href="/#contatti" className="hover:text-oro transition-colors">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-oro font-semibold mb-4 uppercase text-xs tracking-widest">
              Diocesi
            </h4>
            <p className="text-sm opacity-80 leading-relaxed">
              San Benedetto del Tronto<br />
              Ripatransone – Montalto Marche
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-marrone-medio text-center text-xs opacity-50">
          © {new Date().getFullYear()} Confraternita del SS.mo Sacramento di Monteprandone.
          Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
