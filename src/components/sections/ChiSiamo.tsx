import Reveal from "@/components/ui/Reveal";
import {
  DivisoreOrnato,
  AngoloOrnato,
  CroceOrnata,
} from "@/components/ui/Ornaments";

const timeline = [
  {
    anno: "~1610",
    testo:
      "Fondazione ufficiale attestata nel decreto della Sacra Visita del vescovo Pompeo De-Nobili (episcopato 1591–1606)",
  },
  {
    anno: "1846–59",
    testo:
      "Costruzione della Bara del Cristo Morto sotto il Priore Alessandro Sardi: scultura, cataletto ligneo, doratura e ricami in argento per 220 scudi romani",
  },
  {
    anno: "1859",
    testo:
      "Prima processione del Venerdì Santo con la Bara del Cristo Morto — tradizione che continua ininterrotta da oltre 165 anni",
  },
  {
    anno: "2009",
    testo:
      "Rifondazione ufficiale il 9 giugno, dopo circa 70 anni di inattività, con il ripristino della processione storica",
  },
  {
    anno: "2026",
    testo:
      'Riconoscimento da "Borghi più belli d\'Italia nelle Marche" tra le 5 processioni del Venerdì Santo imperdibili della regione',
  },
];

const opereDiBene = [
  "Opere di manutenzione della Bara",
  "Restauro dei panneggi della Bara (a cura delle Suore di Clausura di Offida)",
  "Nuovo impianto di illuminazione a led della Bara",
  "Abbigliamento per i componenti della Banda, per gli «Incappucciati» e per le «Vergini»",
  "Mantelle e gonfalone della Confraternita",
  "Radiotrasmittenti per il servizio d'ordine",
  "Megafoni donati alla parrocchia per le processioni",
  "Armadio per conservare tutti gli oggetti sacri della processione",
  "Contributo alla realizzazione del portone della sala S. Leonardo",
  "Restauro della statua di S. Giovanni",
  "Nuovo velo bianco del Cristo",
  "Giochi da giardino donati alla Scuola Materna delle Suore di Centobuchi",
  "Giubbini per il servizio d'ordine",
];

export default function ChiSiamo() {
  return (
    <section id="chi-siamo" className="py-28 bg-nero scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
            La nostra storia
          </p>
          <h2 className="text-4xl md:text-6xl text-bianco mb-6">Chi Siamo</h2>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-3 space-y-6">
            <p className="text-bianco-soft leading-relaxed text-xl md:text-2xl font-light">
              La{" "}
              <strong className="text-bianco font-semibold">
                Confraternita della Pietà e della Morte
              </strong>{" "}
              di Monteprandone affonda le sue radici nei monaci dell&apos;Abbazia
              di Farfa, presenti nel territorio già intorno all&apos;anno{" "}
              <strong className="text-oro font-semibold">1000</strong>, e fu
              formalmente istituita nel primo Seicento su impulso del vescovo{" "}
              <strong className="text-bianco">Pompeo De-Nobili</strong>.
            </p>

            <p className="text-bianco-soft leading-relaxed text-xl md:text-2xl font-light">
              Tra il{" "}
              <strong className="text-bianco">1846 e il 1859</strong>, sotto la
              guida del Priore Alessandro Sardi, fu costruita la celebre{" "}
              <strong className="text-oro">Bara del Cristo Morto</strong>: la
              scultura del Cristo fu opera di{" "}
              <strong className="text-bianco">Emidio Paci</strong>, il cataletto
              ligneo di Sante Morelli da Montegiorgio, la doratura di Tito
              Boccachiodi, e i ricami in oro e argento delle Monache di Santa
              Caterina di Ripatransone. Un&apos;opera collettiva costata 220,21
              scudi romani.
            </p>

            <p className="text-bianco-soft leading-relaxed text-xl md:text-2xl font-light">
              Dopo circa settant&apos;anni di inattività, la confraternita è
              stata rifondata il{" "}
              <strong className="text-bianco">9 giugno 2009</strong>, riportando
              in vita la processione storica che oggi riunisce oltre{" "}
              <strong className="text-oro">300 figuranti in costume</strong>{" "}
              nel cuore medievale di Monteprandone ogni Venerdì Santo.
            </p>

            <blockquote className="border-l-4 border-oro pl-6 py-2 mt-8 italic text-bianco text-xl font-light font-[var(--font-playfair)]">
              «Una memoria viva che si rinnova ogni anno, tra preghiera,
              canto e devozione popolare.»
            </blockquote>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-2 relative">
            <div className="relative bg-nero-soft rounded-2xl p-8 hover-lift">
              <AngoloOrnato className="absolute top-3 left-3 w-8 h-8 text-oro" />
              <AngoloOrnato className="absolute top-3 right-3 w-8 h-8 text-oro rotate-90" />

              <h3 className="text-bianco text-center text-lg uppercase tracking-widest mb-8 mt-2">
                Tappe storiche
              </h3>

              <div className="space-y-7 relative">
                <div className="absolute left-[27px] top-2 bottom-2 w-px bg-oro/40" />
                {timeline.map((t) => (
                  <div key={t.anno} className="flex gap-5 relative">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-oro text-nero flex items-center justify-center font-bold text-[11px] text-center shadow-md relative z-10 leading-tight px-1">
                      {t.anno}
                    </div>
                    <p className="text-bianco-soft text-sm leading-relaxed pt-3">
                      {t.testo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Opere di bene realizzate grazie alle offerte */}
        <Reveal className="mt-24">
          <div className="relative bg-nero-soft rounded-3xl p-8 md:p-14 border border-nero-bordo overflow-hidden">
            <AngoloOrnato className="absolute top-4 left-4 w-9 h-9 text-oro/70" />
            <AngoloOrnato className="absolute top-4 right-4 w-9 h-9 text-oro/70 rotate-90" />
            <AngoloOrnato className="absolute bottom-4 left-4 w-9 h-9 text-oro/70 -rotate-90" />
            <AngoloOrnato className="absolute bottom-4 right-4 w-9 h-9 text-oro/70 rotate-180" />

            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
                Grazie alla vostra generosità
              </p>
              <h3 className="text-3xl md:text-4xl text-bianco mb-6">
                Le Opere di Bene
              </h3>
              <DivisoreOrnato className="w-40 h-5 text-oro mx-auto mb-7" />
              <p className="text-bianco-soft leading-relaxed text-lg font-light">
                La{" "}
                <strong className="text-bianco font-semibold">
                  Confraternita della Pietà e della Morte
                </strong>{" "}
                di Monteprandone, ricostituita il{" "}
                <strong className="text-oro">9 giugno 2009</strong> dopo
                settant&apos;anni, ringrazia di cuore i cittadini per le offerte
                che hanno reso possibili le seguenti opere:
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl mx-auto">
              {opereDiBene.map((opera, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 mt-0.5 w-8 h-8 rounded-full bg-oro/10 border border-oro/30 flex items-center justify-center">
                    <CroceOrnata className="w-3.5 h-4 text-oro" />
                  </span>
                  <span className="text-bianco-soft leading-relaxed pt-1">
                    {opera}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
