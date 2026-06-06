import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato, AngoloOrnato } from "@/components/ui/Ornaments";

const timeline = [
  { anno: "1836", testo: "Fondazione della Confraternita del SS.mo Sacramento" },
  { anno: "1933", testo: "Redazione del vecchio statuto associativo" },
  {
    anno: "2009",
    testo: "Riforma dello statuto: le consorelle entrano ufficialmente nella confraternita",
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

        {/* Layout asimmetrico: testo prominente a sinistra (3/5), visual a destra (2/5) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Testo */}
          <Reveal className="lg:col-span-3 space-y-6">
            <p className="text-bianco-soft leading-relaxed text-xl md:text-2xl font-light">
              La{" "}
              <strong className="text-bianco font-semibold">
                Confraternita del Santissimo Sacramento
              </strong>{" "}
              di Monteprandone è una delle realtà associative più antiche del
              paese, fondata nel{" "}
              <strong className="text-oro font-semibold">1836</strong> e mai
              interrotta nel corso delle generazioni.
            </p>

            <p className="text-bianco-soft leading-relaxed text-lg">
              Oggi conta{" "}
              <strong className="text-bianco">24 confratelli e consorelle</strong>{" "}
              — un dato che testimonia la vitalità di una comunità che, intorno al
              2009, ha rinnovato il proprio statuto per accogliere ufficialmente
              anche le donne, aprendo un nuovo capitolo di fraternità.
            </p>

            <p className="text-bianco-soft leading-relaxed">
              La confraternita fa parte della{" "}
              <strong className="text-bianco">
                Diocesi di San Benedetto del Tronto – Ripatransone – Montalto
                Marche
              </strong>{" "}
              ed è guidata dal Priore{" "}
              <strong className="text-bianco">Tonino Sciarroni</strong>, che
              coordina le attività anche a livello diocesano.
            </p>

            {/* Citazione in evidenza */}
            <blockquote className="border-l-4 border-oro pl-6 py-2 mt-8 italic text-bianco text-xl font-light font-[var(--font-playfair)]">
              «Una fede trasmessa di generazione in generazione, senza mai
              interrompersi.»
            </blockquote>
          </Reveal>

          {/* Timeline visual */}
          <Reveal delay={1} className="lg:col-span-2 relative">
            <div className="relative bg-nero-soft rounded-2xl p-8 hover-lift">
              <AngoloOrnato className="absolute top-3 left-3 w-8 h-8 text-oro" />
              <AngoloOrnato className="absolute top-3 right-3 w-8 h-8 text-oro rotate-90" />

              <h3 className="text-bianco text-center text-lg uppercase tracking-widest mb-8 mt-2">
                La nostra storia
              </h3>

              <div className="space-y-7 relative">
                {/* Linea verticale */}
                <div className="absolute left-[27px] top-2 bottom-2 w-px bg-oro/40" />
                {timeline.map((t) => (
                  <div key={t.anno} className="flex gap-5 relative">
                    <div className="shrink-0 w-14 h-14 rounded-full bg-oro text-nero flex items-center justify-center font-bold text-sm shadow-md relative z-10">
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
