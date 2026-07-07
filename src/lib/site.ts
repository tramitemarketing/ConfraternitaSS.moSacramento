// Configurazione centralizzata dei contatti e social della confraternita.
// Compila qui i valori quando saranno disponibili: lasciando una stringa vuota ("")
// il relativo link/icona NON verrà mostrato sul sito.

// URL pubblico del sito, usato per metadati Open Graph, canonical, sitemap e
// robots. Impostabile via NEXT_PUBLIC_SITE_URL su Vercel. Il dominio contiene
// una lettera accentata: new URL().origin lo normalizza in forma ASCII/punycode
// (xn--...) e rimuove l'eventuale slash finale.
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    "https://confraternitadellapietàedellamorte.it"
).origin;

export interface ContactConfig {
  email: string;
  telefono: string; // formato libero per la visualizzazione, es. "+39 0735 000000"
  instagram: string; // URL completo, es. "https://instagram.com/..."
  facebook: string; // URL completo, es. "https://facebook.com/..."
}

export const contatti: ContactConfig = {
  email: "", // es. "confraternita@example.it"
  telefono: "", // es. "+39 0735 000000"
  instagram: "", // es. "https://instagram.com/confraternita.monteprandone"
  facebook: "", // es. "https://facebook.com/confraternita.monteprandone"
};

// Indirizzo / luogo mostrato nella sezione contatti
export const luogo = {
  comune: "Monteprandone (AP)",
  regione: "Marche, Italia",
};

// Chiesa di riferimento della confraternita
export const chiesa = {
  nome: "Chiesa San Nicolò di Bari",
  comune: "Monteprandone",
};
