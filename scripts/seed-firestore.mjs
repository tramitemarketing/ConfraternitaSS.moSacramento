// ============================================================
// Seed Firestore — articoli iniziali della Confraternita
// Uso:  node scripts/seed-firestore.mjs
// Richiede le variabili d'ambiente Firebase in .env.local
// (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).
// Idempotente: usa lo slug come doc ID e salta gli articoli già presenti.
// ============================================================

import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Carica .env.local senza dipendenze esterne.
try {
  const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // .env.local assente: si assume che le env var siano già nell'ambiente.
}

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();

const articoli = [
  {
    slug: "processione-venerdi-santo-2026",
    title: "Processione del Cristo Morto — Venerdì Santo 2026",
    date: "2026-04-03",
    excerpt:
      "Il Venerdì Santo 2026 la Confraternita della Pietà e della Morte torna nelle vie medievali di Monteprandone con la tradizionale Processione del Cristo Morto. Partenza alle ore 21:00 dalla Chiesa San Nicolò di Bari.",
    content: `## La Processione del Cristo Morto

Anche quest'anno la **Confraternita della Pietà e della Morte di Monteprandone** porta nelle strade del borgo la storica Processione del Cristo Morto.

### Dettagli

- **Data**: Venerdì Santo 2026
- **Ora di partenza**: 21:00
- **Luogo di partenza**: Chiesa San Nicolò di Bari, Monteprandone
- **Bus gratuito**: dalle ore 20:30 da Centobuchi (piazzale Eurospin) e piazzale Santuario S. Maria delle Grazie

### Il corteo

Oltre **300 figuranti in costume storico** accompagnano la Bara del Cristo Morto — costruita tra il 1846 e il 1859 — attraverso le vie medievali del borgo.

Le **Pie Donne** intonano i canti tradizionali *«Popule meus»* (Improperia) e *«Stava Maria»*, tramandati oralmente da generazioni.

### Riconoscimento 2026

Quest'anno la processione è stata inserita da **Borghi più belli d'Italia nelle Marche** tra le 5 processioni del Venerdì Santo imperdibili della regione.`,
    published: true,
  },
  {
    slug: "rifondazione-confraternita-2009",
    title: "La rifondazione del 2009 — quindici anni di rinascita",
    date: "2024-06-09",
    excerpt:
      "Il 9 giugno 2009 la Confraternita della Pietà e della Morte tornava in vita dopo circa settant'anni di inattività. Ripercorriamo quindici anni di storia rinata.",
    content: `## 9 giugno 2009: una nuova vita

Dopo circa settant'anni di inattività, il **9 giugno 2009** la Confraternita della Pietà e della Morte di Monteprandone è stata ufficialmente rifondata.

### La storia

La confraternita, attestata almeno dal decreto della Sacra Visita del 1610 voluto dal vescovo Pompeo De-Nobili, aveva una tradizione secolare nella cura dei defunti e nell'organizzazione della processione del Venerdì Santo.

### La Bara del Cristo Morto

Il simbolo più prezioso della confraternita è la **Bara del Cristo Morto**, costruita tra il 1846 e il 1859 sotto il Priore Alessandro Sardi:

- **1846**: scultura del Cristo in legno — Emidio Paci (33,21 scudi)
- **1847**: cataletto ligneo — Sante Morelli di Montegiorgio (60 scudi)
- **1851**: doratura — Tito Boccachiodi (55 scudi)
- **1855**: ricami in oro e argento — Monache di Santa Caterina di Ripatransone (33 scudi)

Costo totale: **220,21 scudi romani**. La prima processione con la Bara si tenne il Venerdì Santo del **1859**.`,
    published: true,
  },
  {
    slug: "benvenuti-sul-nostro-sito",
    title: "Benvenuti sul sito della Confraternita",
    date: "2024-01-10",
    excerpt:
      "La Confraternita della Pietà e della Morte di Monteprandone è ora online. Troverete qui notizie, eventi e informazioni sulla nostra tradizione secolare.",
    content: `## Siamo online!

Benvenuti sul sito della **Confraternita della Pietà e della Morte di Monteprandone**.

### Cosa troverete qui

- **Notizie** sulla processione del Venerdì Santo e sulle attività della confraternita
- **La storia** delle nostre origini nel XVII secolo e della costruzione della Bara del Cristo Morto
- **Informazioni pratiche** su orari, percorso e bus gratuito per la processione

Siamo presenti in questo borgo fin dal XVII secolo, e ogni anno il **Venerdì Santo** torniamo a portare il Cristo Morto tra le vie medievali di Monteprandone.`,
    published: true,
  },
];

let creati = 0;
let saltati = 0;
for (const a of articoli) {
  const ref = db.collection("notizie").doc(a.slug);
  const snap = await ref.get();
  if (snap.exists) {
    saltati++;
    console.log(`= salto (già presente): ${a.slug}`);
    continue;
  }
  await ref.set({
    title: a.title,
    date: a.date,
    excerpt: a.excerpt,
    content: a.content,
    published: a.published,
    coverImage: null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  creati++;
  console.log(`+ creato: ${a.slug}`);
}

console.log(`\nFatto. Creati: ${creati}, saltati: ${saltati}.`);
process.exit(0);
