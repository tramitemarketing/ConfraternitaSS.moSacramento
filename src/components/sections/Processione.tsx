import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato, CroceOrnata } from "@/components/ui/Ornaments";

const ordineProcessione = [
  { label: "Croce e simboli della Passione", note: "apertura del corteo" },
  { label: "7 gonfaloni rossi", note: "le ultime parole di Cristo" },
  {
    label: "Le Vergini",
    note: "bambine in abito bianco con velo",
  },
  {
    label: "Le Pie Donne",
    note: "abito nero, canti polifonici tradizionali",
  },
  { label: "Fanciulle con 7 spade", note: "simbolo dei dolori della Madonna" },
  {
    label: "La Banda",
    note: "alunni dell'Istituto Comprensivo Musicale di Monteprandone",
  },
  {
    label: "Clero e autorità civili",
    note:
      "Padri del Santuario S. Maria delle Grazie · Carabinieri in Alta Uniforme",
  },
  { label: "Statua di San Giovanni e Madonna Addolorata", note: "" },
  {
    label: "La Bara del Cristo Morto",
    note: "chiude solennemente il corteo",
  },
];

const percorso = [
  "Chiesa San Nicolò di Bari (partenza ore 21:00)",
  "via Giacomo Leopardi",
  "via Roma",
  "Piazza 14 Novembre",
  "via Corso",
  "via Tavernette",
  "via Orti",
  "Contrada Macigne",
  "via Borgo da Monte",
  "via Borgo da Sole",
  "Rientro in chiesa",
];

export default function Processione() {
  return (
    <section
      id="processione"
      className="py-28 scroll-mt-20 relative overflow-hidden"
      style={{ backgroundColor: "#0D0C09" }}
    >
      {/* Croce decorativa di sfondo */}
      <CroceOrnata className="absolute -left-20 top-1/2 -translate-y-1/2 w-[50vh] h-[50vh] text-oro opacity-[0.04] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <Reveal className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-oro/10 border border-oro/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-oro text-xs font-bold tracking-widest uppercase">
              Venerdì Santo · ore 21:00
            </span>
          </div>
          <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
            Dal 1859
          </p>
          <h2 className="text-4xl md:text-6xl text-bianco mb-4">
            La Processione del Cristo Morto
          </h2>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto mb-6" />
          <p className="text-bianco-soft max-w-2xl mx-auto leading-relaxed text-lg">
            Oltre <strong className="text-oro">300 figuranti in costume storico</strong> percorrono
            le vie medievali di Monteprandone in un corteo di straordinaria
            suggestione. Una delle{" "}
            <strong className="text-bianco">5 processioni più belle delle Marche</strong> secondo
            &ldquo;Borghi più belli d&apos;Italia nelle Marche&rdquo; (2026).
          </p>
        </Reveal>

        {/* Due colonne: Ordine e Percorso + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          {/* Ordine della processione */}
          <Reveal>
            <div className="bg-nero-soft rounded-2xl p-8 border border-nero-bordo h-full">
              <h3 className="text-oro text-xs font-bold uppercase tracking-widest mb-7 flex items-center gap-3">
                <span className="w-8 h-px bg-oro/60 inline-block" />
                Ordine del corteo
                <span className="w-8 h-px bg-oro/60 inline-block" />
              </h3>
              <ol className="space-y-4">
                {ordineProcessione.map((el, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-oro/15 border border-oro/40 text-oro text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-bianco-soft font-medium leading-snug">
                        {el.label}
                      </p>
                      {el.note && (
                        <p className="text-bianco-soft/50 text-xs mt-0.5">
                          {el.note}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Percorso + Bus + Canti */}
          <div className="space-y-6">
            {/* Percorso */}
            <Reveal delay={1}>
              <div className="bg-nero-soft rounded-2xl p-8 border border-nero-bordo">
                <h3 className="text-oro text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-3">
                  <span className="w-8 h-px bg-oro/60 inline-block" />
                  Percorso
                  <span className="w-8 h-px bg-oro/60 inline-block" />
                </h3>
                <ol className="space-y-1.5">
                  {percorso.map((tappa, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-sm ${
                        i === 0 || i === percorso.length - 1
                          ? "text-oro font-semibold"
                          : "text-bianco-soft/80"
                      }`}
                    >
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-oro/50" />
                      {tappa}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            {/* Bus gratuito */}
            <Reveal delay={2}>
              <div className="bg-nero-soft rounded-2xl p-8 border border-oro/25 hover:border-oro/50 transition-colors">
                <h3 className="text-oro text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-oro/60 inline-block" />
                  Bus gratuito
                  <span className="w-8 h-px bg-oro/60 inline-block" />
                </h3>
                <p className="text-bianco-soft text-sm mb-3">
                  Servizio navetta gratuito dalle{" "}
                  <strong className="text-bianco">ore 20:30</strong>:
                </p>
                <ul className="space-y-1.5 text-sm text-bianco-soft/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-oro/50" />
                    Centobuchi — piazzale Eurospin
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-oro/50" />
                    Piazzale Santuario S. Maria delle Grazie
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* Canti tradizionali */}
            <Reveal delay={3}>
              <div className="bg-nero-soft rounded-2xl p-8 border border-nero-bordo">
                <h3 className="text-oro text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-oro/60 inline-block" />
                  Canti tradizionali
                  <span className="w-8 h-px bg-oro/60 inline-block" />
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-bianco font-semibold italic font-[var(--font-playfair)]">
                      Popule meus
                    </p>
                    <p className="text-bianco-soft/60 text-xs">
                      Improperia — antifona della liturgia del Venerdì Santo
                    </p>
                  </div>
                  <div>
                    <p className="text-bianco font-semibold italic font-[var(--font-playfair)]">
                      Stava Maria
                    </p>
                    <p className="text-bianco-soft/60 text-xs">
                      Adattamento locale dello Stabat Mater, tramandato dalle Pie Donne
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bara del Cristo Morto — dettaglio storico */}
        <Reveal className="mt-16">
          <div
            className="rounded-3xl p-10 md:p-14 text-bianco-soft relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
            }}
          >
            <div className="max-w-3xl">
              <span className="inline-block bg-oro text-nero text-xs font-bold px-3 py-1 rounded-full tracking-wide mb-4 uppercase">
                La Bara del Cristo Morto
              </span>
              <h3 className="text-3xl md:text-4xl text-bianco mb-5">
                Un capolavoro costruito 1846–1859
              </h3>
              <p className="text-bianco-soft leading-relaxed mb-6">
                Sotto il Priore Alessandro Sardi, la bara fu realizzata in più
                anni da artisti diversi: la scultura del Cristo in legno da{" "}
                <strong className="text-bianco">Emidio Paci</strong> (1846,
                33,21 scudi), il cataletto ligneo da{" "}
                <strong className="text-bianco">Sante Morelli</strong> di
                Montegiorgio (1847, 60 scudi), la doratura da{" "}
                <strong className="text-bianco">Tito Boccachiodi</strong> (1851,
                55 scudi) e i ricami in filo d&apos;oro e argento dalle{" "}
                <strong className="text-bianco">
                  Monache di Santa Caterina di Ripatransone
                </strong>{" "}
                (1855, 33 scudi). Costo totale: 220,21 scudi romani.
              </p>
              <span className="inline-flex items-center gap-2 text-oro-chiaro font-semibold">
                <CroceOrnata className="w-5 h-6" />
                Prima processione: Venerdì Santo 1859
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
