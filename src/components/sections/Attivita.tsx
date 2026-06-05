const attivita = [
  {
    icon: "🕯️",
    titolo: "Adorazione Eucaristica",
    descrizione:
      "Ogni primo giovedì del mese la comunità si riunisce per l'adorazione eucaristica, cuore dello stile spirituale della confraternita. Un'ora di preghiera silenziosa davanti a Gesù Eucaristia.",
    dettaglio: "Ogni 1° giovedì del mese — ore 21:00",
  },
  {
    icon: "⛪",
    titolo: "Servizio Liturgico",
    descrizione:
      "I confratelli e le consorelle curano la chiesa e partecipano attivamente alle celebrazioni e alle processioni parrocchiali, garantendo la continuità della tradizione.",
    dettaglio: "Tutto l'anno",
  },
  {
    icon: "🤝",
    titolo: "Carità Locale",
    descrizione:
      "La confraternita è vicina alle persone del paese che si trovano in situazioni di reale bisogno, con un sostegno concreto e discreto radicato nello spirito di fratellanza cristiana.",
    dettaglio: "Continuamente",
  },
  {
    icon: "🌿",
    titolo: "Incontri Diocesani",
    descrizione:
      "Quattro volte all'anno i priori della diocesi si incontrano per programmare attività comuni e scambi culturali e religiosi tra le diverse confraternite del territorio.",
    dettaglio: "4 incontri all'anno",
  },
];

export default function Attivita() {
  return (
    <section
      id="attivita"
      className="py-24"
      style={{ backgroundColor: "#F5EDE0" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primario text-sm uppercase tracking-widest mb-3">
            La nostra vita comune
          </p>
          <h2 className="text-4xl md:text-5xl text-marrone mb-6">
            Attività e Spiritualità
          </h2>
          <div className="w-12 h-0.5 bg-oro mx-auto mb-6" />
          <p className="text-marrone-medio max-w-xl mx-auto leading-relaxed">
            Il legame con Gesù Eucaristia è al centro di tutto. Da esso nasce
            il servizio verso gli altri e la cura della comunità.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attivita.map((a) => (
            <div
              key={a.titolo}
              className="bg-crema rounded-xl p-8 border border-crema-scuro hover:border-primario-chiaro transition-colors duration-200 group"
            >
              <div className="text-4xl mb-4">{a.icon}</div>
              <h3 className="text-xl text-marrone mb-3 group-hover:text-primario transition-colors">
                {a.titolo}
              </h3>
              <p className="text-marrone-medio leading-relaxed text-sm mb-4">
                {a.descrizione}
              </p>
              <span className="inline-block bg-crema-scuro text-primario text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
                {a.dettaglio}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
