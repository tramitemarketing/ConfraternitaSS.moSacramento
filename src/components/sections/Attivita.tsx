import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato } from "@/components/ui/Ornaments";
import {
  IconCandela,
  IconChiesa,
  IconMani,
  IconRete,
} from "@/components/ui/Icons";

const Icone = { candela: IconCandela, chiesa: IconChiesa, mani: IconMani, rete: IconRete };

const featured = {
  icon: "candela" as keyof typeof Icone,
  titolo: "Adorazione Eucaristica",
  descrizione:
    "Il legame con Gesù Eucaristia è il cuore dello stile spirituale della confraternita. Ogni primo giovedì del mese la comunità si riunisce per un'ora di adorazione silenziosa, momento centrale della nostra vita di fede.",
  dettaglio: "Ogni 1° giovedì del mese — ore 21:00",
};

const altre = [
  {
    icon: "chiesa" as keyof typeof Icone,
    titolo: "Servizio Liturgico",
    descrizione:
      "Cura della chiesa e partecipazione attiva alle celebrazioni e alle processioni parrocchiali.",
    dettaglio: "Tutto l'anno",
  },
  {
    icon: "mani" as keyof typeof Icone,
    titolo: "Carità Locale",
    descrizione:
      "Vicinanza concreta e discreta alle persone del paese in situazioni di reale bisogno.",
    dettaglio: "Continuamente",
  },
  {
    icon: "rete" as keyof typeof Icone,
    titolo: "Incontri Diocesani",
    descrizione:
      "Quattro incontri all'anno con i priori della diocesi per programmare attività e scambi.",
    dettaglio: "4 volte all'anno",
  },
];

export default function Attivita() {
  return (
    <section id="attivita" className="py-28 bg-crema scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-primario text-sm uppercase tracking-[0.25em] mb-4">
            La nostra vita comune
          </p>
          <h2 className="text-4xl md:text-6xl text-marrone mb-6">
            Attività e Spiritualità
          </h2>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto mb-6" />
          <p className="text-marrone-medio max-w-xl mx-auto leading-relaxed text-lg">
            Il legame con Gesù Eucaristia è al centro di tutto. Da esso nasce il
            servizio verso gli altri e la cura della comunità.
          </p>
        </Reveal>

        {/* Card featured grande */}
        <Reveal className="mb-8">
          {(() => {
            const Icon = Icone[featured.icon];
            return (
              <div className="hover-lift relative overflow-hidden rounded-3xl p-10 md:p-14 text-crema grid md:grid-cols-[auto_1fr] gap-8 items-center"
                style={{
                  background:
                    "linear-gradient(135deg, #3D1F0D 0%, #6B3A20 50%, #9E4A1E 100%)",
                }}
              >
                <div className="shrink-0">
                  <div className="w-28 h-28 rounded-full bg-crema/10 border border-oro/30 flex items-center justify-center">
                    <Icon className="w-14 h-14 text-oro-chiaro" />
                  </div>
                </div>
                <div>
                  <span className="inline-block bg-oro text-marrone text-xs font-bold px-3 py-1 rounded-full tracking-wide mb-4 uppercase">
                    In primo piano
                  </span>
                  <h3 className="text-3xl md:text-4xl mb-4">{featured.titolo}</h3>
                  <p className="text-crema/85 leading-relaxed text-lg mb-5 max-w-2xl">
                    {featured.descrizione}
                  </p>
                  <span className="inline-flex items-center gap-2 text-oro-chiaro font-semibold">
                    <IconCandela className="w-5 h-5" />
                    {featured.dettaglio}
                  </span>
                </div>
              </div>
            );
          })()}
        </Reveal>

        {/* Tre card più piccole */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {altre.map((a, i) => {
            const Icon = Icone[a.icon];
            return (
              <Reveal key={a.titolo} delay={(i + 1) as 1 | 2 | 3}>
                <div className="hover-lift bg-crema-scuro rounded-2xl p-8 h-full border border-transparent hover:border-oro/40 transition-colors group">
                  <div className="w-16 h-16 rounded-xl bg-crema flex items-center justify-center mb-5 group-hover:bg-primario transition-colors duration-300">
                    <Icon className="w-9 h-9 text-primario group-hover:text-crema transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl text-marrone mb-3 group-hover:text-primario transition-colors">
                    {a.titolo}
                  </h3>
                  <p className="text-marrone-medio leading-relaxed text-sm mb-5">
                    {a.descrizione}
                  </p>
                  <span className="inline-block bg-crema text-primario text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
                    {a.dettaglio}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
