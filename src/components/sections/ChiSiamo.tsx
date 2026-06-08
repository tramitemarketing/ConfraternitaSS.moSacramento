import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato, AngoloOrnato } from "@/components/ui/Ornaments";

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

            <p className="text-bianco-soft leading-relaxed text-lg">
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

            <p className="text-bianco-soft leading-relaxed">
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
      </div>
    </section>
  );
}
