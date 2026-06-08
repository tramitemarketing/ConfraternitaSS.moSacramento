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
  icon: "chiesa" as keyof typeof Icone,
  titolo: "Processione del Venerdì Santo",
  descrizione:
    "Il cuore della vita della confraternita. Ogni anno, la sera del Venerdì Santo, oltre 300 figuranti in costume storico animano le vie medievali di Monteprandone nella Processione del Cristo Morto — una delle più suggestive delle Marche.",
  dettaglio: "Venerdì Santo · ore 21:00 · partenza da Chiesa San Nicolò di Bari",
};

const altre = [
  {
    icon: "candela" as keyof typeof Icone,
    titolo: "Preparazione annuale",
    descrizione:
      "Tutto l'anno la confraternita cura i costumi storici, i gonfaloni, la Bara del Cristo Morto e organizza le prove dei canti tradizionali con le Pie Donne.",
    dettaglio: "Tutto l'anno",
  },
  {
    icon: "mani" as keyof typeof Icone,
    titolo: "Canti della tradizione",
    descrizione:
      "Le Pie Donne tramandano il «Popule meus» (Improperia) e lo «Stava Maria» (Stabat Mater locale), canti polifonici tramandati oralmente da generazioni.",
    dettaglio: "Tradizione orale secolare",
  },
  {
    icon: "rete" as keyof typeof Icone,
    titolo: "Servizio e comunità",
    descrizione:
      "Partecipazione alle altre celebrazioni liturgiche della parrocchia e alla vita del paese, in spirito di fraternità e servizio.",
    dettaglio: "Continuamente",
  },
];

export default function Attivita() {
  return (
    <section id="attivita" className="py-28 bg-nero scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
            La nostra vita comune
          </p>
          <h2 className="text-4xl md:text-6xl text-bianco mb-6">
            Attività e Spiritualità
          </h2>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto mb-6" />
          <p className="text-bianco-soft max-w-xl mx-auto leading-relaxed text-lg">
            La processione del Venerdì Santo è il centro della nostra vita
            associativa. Attorno ad essa ruotano un anno di preparazione,
            canto e fraternità.
          </p>
        </Reveal>

        <Reveal className="mb-8">
          {(() => {
            const Icon = Icone[featured.icon];
            return (
              <div
                className="hover-lift relative overflow-hidden rounded-3xl p-10 md:p-14 text-bianco-soft grid md:grid-cols-[auto_1fr] gap-8 items-center"
                style={{
                  background:
                    "linear-gradient(135deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
                }}
              >
                <div className="shrink-0">
                  <div className="w-28 h-28 rounded-full bg-bianco-soft/10 border border-oro/30 flex items-center justify-center">
                    <Icon className="w-14 h-14 text-oro-chiaro" />
                  </div>
                </div>
                <div>
                  <span className="inline-block bg-oro text-nero text-xs font-bold px-3 py-1 rounded-full tracking-wide mb-4 uppercase">
                    In primo piano
                  </span>
                  <h3 className="text-3xl md:text-4xl mb-4">{featured.titolo}</h3>
                  <p className="text-bianco-soft leading-relaxed text-lg mb-5 max-w-2xl">
                    {featured.descrizione}
                  </p>
                  <span className="inline-flex items-center gap-2 text-oro-chiaro font-semibold">
                    <IconChiesa className="w-5 h-5" />
                    {featured.dettaglio}
                  </span>
                </div>
              </div>
            );
          })()}
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {altre.map((a, i) => {
            const Icon = Icone[a.icon];
            return (
              <Reveal key={a.titolo} delay={(i + 1) as 1 | 2 | 3}>
                <div className="hover-lift bg-nero-soft rounded-2xl p-8 h-full border border-transparent hover:border-oro/40 transition-colors group">
                  <div className="w-16 h-16 rounded-xl bg-nero flex items-center justify-center mb-5 group-hover:bg-oro transition-colors duration-300">
                    <Icon className="w-9 h-9 text-oro group-hover:text-nero transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl text-bianco mb-3 group-hover:text-oro transition-colors">
                    {a.titolo}
                  </h3>
                  <p className="text-bianco-soft leading-relaxed text-sm mb-5">
                    {a.descrizione}
                  </p>
                  <span className="inline-block bg-nero-soft text-oro text-xs font-semibold px-3 py-1 rounded-full tracking-wide border border-oro/20">
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
