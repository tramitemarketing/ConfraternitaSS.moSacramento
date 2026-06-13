"use client";
import { useState } from "react";

type OrdineItem = {
  label: string;
  detail?: string; // testo descrittivo (parte "dopo il trattino")
  intro?: string; // riga che introduce un eventuale sotto-elenco
  sub?: string[]; // sotto-elenco (confraternite, autorità…)
};

const ordineProcessione: OrdineItem[] = [
  {
    label: "Apertura del Corteo",
    detail:
      "La Croce e gli Incappucciati aprono ufficialmente la sfilata della processione.",
  },
  { label: "Le bambine vestite di bianco" },
  {
    label: "I giovani con gli stendardi",
    detail:
      "Gli stendardi contengono le sette parole pronunciate da Gesù sulla croce.",
  },
  { label: "I confratelli della Confraternita della Pietà e della Morte" },
  {
    label: "I musicisti della Banda di Monteprandone",
    detail:
      "Suonano esclusivamente in occasione di questa processione per onorare il Signore.",
  },
  {
    label: "I piccoli chierichetti",
    detail: "Recano con sé i simboli della Passione di Cristo.",
  },
  { label: "I presbiteri" },
  { label: "La Bara del Cristo Morto" },
  { label: "Le Pie Donne" },
  {
    label: "La statua della Madonna Addolorata",
    detail:
      "Indossa i preziosi gioielli d'oro donati nel corso degli anni come ex-voto per le grazie ricevute.",
    intro: "Trasportata dai confratelli di altre due Confraternite del paese:",
    sub: ["Confraternita di Sant'Anna", "Confraternita del Sacro Cuore"],
  },
  { label: "Le ragazze delle sette spade" },
  {
    label: "La statua di San Giovanni",
    detail:
      "Trasportata dai confratelli della Confraternita del Santissimo Sacramento.",
  },
  {
    label: "Ordini Religiosi",
    detail:
      "Gruppo di francescani provenienti dal convento di San Giacomo della Marca.",
  },
  {
    label: "Autorità Civili, Militari e Popolo di Dio",
    detail:
      "Il numeroso popolo di Dio: la cittadinanza riunita per condividere questo momento di grande spiritualità.",
    intro: "Autorità Civili e Militari presenti nel seguito:",
    sub: ["Sindaco di Monteprandone", "Comandante della Polizia Locale"],
  },
];

function isEspandibile(el: OrdineItem) {
  return Boolean(el.detail || el.sub?.length);
}

export default function OrdineCorteo() {
  const [aperti, setAperti] = useState<Record<number, boolean>>({});

  const toggle = (i: number) =>
    setAperti((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <ol className="space-y-2.5">
      {ordineProcessione.map((el, i) => {
        const espandibile = isEspandibile(el);
        const aperto = !!aperti[i];

        return (
          <li
            key={i}
            className="rounded-xl border border-nero-bordo bg-nero/40 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => espandibile && toggle(i)}
              aria-expanded={espandibile ? aperto : undefined}
              className={`w-full flex gap-4 items-center text-left px-4 py-3 ${
                espandibile
                  ? "cursor-pointer hover:bg-oro/5 transition-colors"
                  : "cursor-default"
              }`}
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-oro/15 border border-oro/40 text-oro text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-bianco-soft font-medium leading-snug flex-1">
                {el.label}
              </span>
              {espandibile && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`shrink-0 w-4 h-4 text-oro transition-transform duration-300 ${
                    aperto ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M9 6 L15 12 L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {espandibile && (
              <div
                className={`grid transition-all duration-300 ease-out ${
                  aperto
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 pl-[60px] space-y-3">
                    {el.detail && (
                      <p className="text-bianco-soft/70 text-sm leading-relaxed">
                        {el.detail}
                      </p>
                    )}
                    {el.intro && (
                      <p className="text-bianco-soft/70 text-sm leading-relaxed">
                        {el.intro}
                      </p>
                    )}
                    {el.sub && (
                      <ul className="space-y-1.5">
                        {el.sub.map((s, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-oro/90 font-medium"
                          >
                            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-oro/60" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
