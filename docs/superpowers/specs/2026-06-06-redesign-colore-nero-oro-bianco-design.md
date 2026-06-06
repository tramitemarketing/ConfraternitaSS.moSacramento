# Redesign cromatico — Nero / Oro / Bianco

**Data:** 2026-06-06
**Tipo:** Redesign solo colore (nessuna modifica a layout, struttura, contenuti o comportamento)
**Ambito:** Tutto il sito — home, galleria, notizie, admin, componenti condivisi

---

## 1. Obiettivo

Ribaltare la palette del sito da quella attuale calda (terracotta / crema / marrone / oliva) a una nuova palette **nero, oro, bianco** — in quest'ordine di importanza:

1. **Nero** — colore dominante delle superfici (tema scuro)
2. **Oro** — colore d'accento ("soldi colour")
3. **Bianco** — colore del testo

Vincolo: è un intervento **solo cromatico**. Non si toccano markup, layout, tipografia, animazioni (se non i loro colori), né la logica dell'app.

## 2. Decisioni di design (validate con l'utente)

| # | Decisione | Scelta |
|---|---|---|
| 1 | Dominanza del nero | **Tema scuro**: sfondi neri ovunque, testo bianco, oro come accento |
| 2 | Trattamento dei gradienti caldi attuali | **Gradienti nero→oro** ("oro liquido"): nero dominante, oro che fiorisce nell'ultimo tratto |
| 3 | Badge di stato admin (no verde) | **Oro pieno = pubblicato / contorno grigio neutro = bozza** |
| 4 | `primario`/terracotta | Diventa **oro** ovunque (niente più terracotta) |
| 5 | Quantità di grigio | **Minima**: la gerarchia del testo usa la famiglia bianca con opacità (`bianco-soft/70`), non grigio piatto. `grigio` resta solo per lo stato "bozza" |
| 6 | Slide galleria | **4 sfumature nero→oro diverse** (stesso tema, intensità/angolo differenti) |
| 7 | Shade dell'oro | `#C9A24A` (metallico, premium su nero) |
| 8 | Nero | Non puro: `#0A0A0B` + secondo nero caldo `#15130E` per profondità |

## 3. Strategia di implementazione

**Approccio scelto: B — rinomina dei token nella nuova palette.**

I token semantici vecchi (`primario`, `crema`, `marrone`, `oliva`…) vengono sostituiti da token nuovi e onesti (`nero`, `oro`, `bianco`, `grigio`). Tutte le ~190 occorrenze di classi colore nei file vengono migrate ai nomi nuovi.

**Punto critico — mappatura per RUOLO, non find-replace cieco.**
Alcuni token vecchi fanno doppio lavoro:
- `marrone` è sia il **testo scuro** (su sezioni chiare) sia la **superficie scura** (sfondo del footer).
- `crema` è sia lo **sfondo chiaro** della pagina sia il **testo chiaro** sopra i gradienti/footer.

Nel tema scuro questi due ruoli vanno in direzioni opposte. Quindi ogni occorrenza `bg-`/`text-`/`border-`/`fill-`/`stroke-` va valutata singolarmente e mappata al token corretto per quel ruolo (è ciò che evita, per esempio, un footer sbiancato).

## 4. Nuovi token `@theme` (in `globals.css`)

```css
@theme {
  /* Neri — superfici (colore dominante) */
  --color-nero:        #0A0A0B;  /* sfondo principale di tutto il sito */
  --color-nero-soft:   #15130E;  /* sezioni alternate, card, pannelli (near-black caldo) */
  --color-nero-bordo:  #2A2720;  /* bordi sottili su fondo scuro */

  /* Oro — accento (secondo per importanza) */
  --color-oro:         #C9A24A;  /* accento base: CTA, link, ornamenti, badge "pubblicato" */
  --color-oro-chiaro:  #EBCB73;  /* punto luce dei gradienti, shimmer, hover luminoso */
  --color-oro-scuro:   #8C6A2B;  /* hover su superfici oro, ombre dorate */

  /* Bianchi/neutri — testo (terzo per importanza) */
  --color-bianco:      #FFFFFF;  /* titoli, alta enfasi */
  --color-bianco-soft: #E8E6DF;  /* corpo testo (bianco caldo, comodo su nero) */
  --color-grigio:      #9A968C;  /* uso minimo: solo stato "bozza" */
}
```

I vecchi token (`primario*`, `crema*`, `marrone*`, `oliva*`) vengono **rimossi** dal `@theme`.

## 5. Tabella di migrazione (vecchio → nuovo, per ruolo)

| Token vecchio | Hex vecchio | Nuovo token (per ruolo) |
|---|---|---|
| `primario` (terracotta, accento/CTA) | `#C4622D` | `oro` |
| `primario-scuro` (hover) | `#9E4A1E` | `oro-scuro` |
| `primario-chiaro` | `#E8936B` | `oro-chiaro` |
| `oro` | `#C8893A` | `oro` (`#C9A24A`) |
| `oro-chiaro` | `#E0B970` | `oro-chiaro` (`#EBCB73`) |
| `crema` come **sfondo** pagina | `#FEFAF4` | `nero` |
| `crema` come **testo chiaro** su scuro | `#FEFAF4` | `bianco-soft` |
| `crema-scuro` (sezioni alternate) | `#F0E4CF` | `nero-soft` |
| `marrone` come **testo** su chiaro (titoli) | `#3D1F0D` | `bianco` |
| `marrone` come **testo** su chiaro (corpo) | `#3D1F0D` | `bianco-soft` |
| `marrone` come **superficie** scura (footer bg) | `#3D1F0D` | `nero` / `nero-soft` |
| `marrone-medio` come **testo** secondario | `#6B3A20` | `bianco-soft/70` (niente grigio) |
| `marrone-medio` come **bordo** | `#6B3A20` | `nero-bordo` |
| `oliva` (badge "pubblicato") | `#7A8C5C` | `oro` |
| `oliva-chiaro` (badge "bozza") | `#A8BC88` | `grigio` (contorno/neutro) |

## 6. Gradienti — ricetta nero→oro

Il nero occupa la maggior parte (partenza + centro), l'oro fiorisce nell'ultimo tratto, `oro-chiaro` è il punto luce metallico finale.

**Ricetta base** (Hero, header pagine notizie, login admin, NotiziePreview, Attività, ArticleCard):
```css
linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%);
/* per i blocchi oggi a 135deg, mantenere 135deg */
```

**Vignette Hero** (`radial-gradient`):
```css
radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%);
```

**Galleria — 4 slide, 4 sfumature distinte:**
```css
/* slide 1 — nero puro → oro            */ linear-gradient(135deg, #0A0A0B 0%, #6E561F 70%, #C9A24A 100%)
/* slide 2 — nero caldo → oro scuro     */ linear-gradient(135deg, #15130E 0%, #8C6A2B 100%)
/* slide 3 — più brillante → oro chiaro */ linear-gradient(135deg, #0A0A0B 0%, #C9A24A 60%, #EBCB73 100%)
/* slide 4 — intermedia                 */ linear-gradient(135deg, #15130E 0%, #6E561F 55%, #C9A24A 100%)
```

**Overlay didascalia galleria** (classi Tailwind): `from-marrone/80` → `from-nero/85`.

**Shimmer bottoni** (`btn-shimmer` in `globals.css`): resta un guizzo **bianco** — su oro legge come riflesso metallico. Invariato.

## 7. CSS base in `globals.css`

- `body` → `background-color: #0A0A0B; color: #E8E6DF;`
- `.prose h1/h2/h3` → `#FFFFFF`
- `.prose p, .prose li` → `#E8E6DF`
- `.prose a` → `#C9A24A`
- `.prose strong` → `#FFFFFF`
- `.hover-lift:hover` box-shadow → da ombra marrone (invisibile sul nero) a ombra nera profonda + alone oro:
  ```css
  box-shadow: 0 24px 48px -12px rgba(0,0,0,0.7),
              0 8px 24px -12px rgba(201,162,74,0.22);
  ```
- `.nav-underline::after` usa già `var(--color-oro)` → si aggiorna da solo.

## 8. Applicazione per area

- **Home** — sezioni alternate `nero`/`nero-soft`, testo `bianco`/`bianco-soft`, ornamenti e accenti `oro`, gradienti nero→oro su Hero e blocchi decorativi.
- **Navbar** — trasparente sopra l'Hero, su scroll diventa `nero-soft` translucido con bordo inferiore `oro` sottile.
- **Footer** — `bg-nero`, testo `bianco-soft`, divisori e accenti `oro`.
- **Notizie** (lista + dettaglio) — header con gradiente nero→oro, card su `nero-soft`, testo bianco, `.prose` ribaltato per fondo scuro.
- **Admin login** — sfondo gradiente nero→oro, form su superficie scura.
- **Admin pannello** — superfici `nero`/`nero-soft`, input scuri con bordo `nero-bordo` e focus `oro`, badge **oro = pubblicato / contorno grigio = bozza**.

## 9. Regole di contrasto / leggibilità

- **Bottoni/CTA con sfondo oro** → testo **nero** (`nero`), non bianco: oro+bianco hanno contrasto insufficiente, oro+nero è netto e premium.
- **Bottoni/superfici scure** → testo `oro` o `bianco`.
- Testo `bianco-soft` su `nero` = contrasto altissimo (comodo).
- Oro `#C9A24A` su nero ≈ 7:1 → ok per titoli, accenti, icone; evitare oro su oro.
- Mantenere il blocco `@media (prefers-reduced-motion)` invariato.

## 10. File coinvolti

Solo modifiche cromatiche (classi/valori colore); nessuna modifica strutturale.

- `src/app/globals.css` — token `@theme`, `body`, `.prose`, ombre
- `src/components/sections/Hero.tsx` — gradiente + vignette
- `src/components/sections/Galleria.tsx` — 4 gradienti slide + overlay
- `src/components/sections/NotiziePreview.tsx` — gradiente blocco
- `src/components/sections/Attivita.tsx` — gradiente blocco
- `src/components/sections/ChiSiamo.tsx` — classi colore
- `src/components/sections/Contatti.tsx` — classi colore
- `src/components/ArticleCard.tsx` — gradiente placeholder + classi
- `src/components/Navbar.tsx` — classi colore / stato scroll
- `src/components/Footer.tsx` — classi colore (superficie + testo)
- `src/components/ui/Ornaments.tsx` — classi colore
- `src/components/ui/Icons.tsx`, `src/components/ui/SocialLinks.tsx` — se usano token colore
- `src/app/notizie/page.tsx` — header gradiente + classi
- `src/app/notizie/[slug]/page.tsx` — header gradiente + classi
- `src/app/admin/page.tsx` — superfici, input, badge stato
- `src/app/admin/login/page.tsx` — gradiente + classi
- `CLAUDE.md` — aggiornare la tabella "Palette colori" con i nuovi token

## 11. Fuori ambito (YAGNI)

- Nessun toggle tema chiaro/scuro: il sito è mono-tema (scuro).
- Nessuna modifica a font, spaziature, layout, componenti, animazioni (salvo i loro colori).
- Nessun refactoring non cromatico.

## 12. Verifica

- `npm run build` e `npm run lint` passano.
- Nessun riferimento residuo ai token vecchi (`primario`, `crema`, `marrone`, `oliva`) in `src/` né nel `@theme`.
- Ispezione visiva di home, galleria, notizie (lista + dettaglio), admin login, admin pannello: nessun residuo terracotta/crema/marrone/verde; testo leggibile su tutti gli sfondi.
