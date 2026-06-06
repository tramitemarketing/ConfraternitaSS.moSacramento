# Redesign cromatico Nero / Oro / Bianco — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ribaltare la palette del sito da calda (terracotta/crema/marrone/oliva) a **nero/oro/bianco** (tema scuro), sostituendo i gradienti caldi con gradienti nero→oro, senza toccare layout, struttura o logica.

**Architecture:** Approccio "B" — si introducono token semantici nuovi e onesti (`nero`, `oro`, `bianco`, `grigio`) nel `@theme` di Tailwind v4, poi si migra ogni file dai token vecchi ai nuovi **per ruolo** (es. `bg-marrone`=superficie→`bg-nero`, `text-marrone`=testo→`text-bianco`). I token vecchi restano definiti durante tutta la migrazione e vengono rimossi solo all'ultimo task, così ogni stato intermedio compila e si vede. È un intervento **solo cromatico**: si cambiano solo classi colore, valori di gradiente e `backgroundColor` inline.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4 (config via `@theme` in `globals.css`), TypeScript, React 19.

---

## Costanti di gradiente (riusate nei task)

Definite qui una volta; ogni task che le usa le riporta per intero.

- **GRAD_160** (Hero, header notizie, login):
  `linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)`
- **GRAD_135** (Attività, NotiziePreview cover, ArticleCard cover):
  `linear-gradient(135deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)`
- **Vignette Hero**:
  `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)`
- **Galleria slide 1**: `linear-gradient(135deg, #0A0A0B 0%, #6E561F 70%, #C9A24A 100%)`
- **Galleria slide 2**: `linear-gradient(135deg, #15130E 0%, #8C6A2B 100%)`
- **Galleria slide 3**: `linear-gradient(135deg, #0A0A0B 0%, #C9A24A 60%, #EBCB73 100%)`
- **Galleria slide 4**: `linear-gradient(135deg, #15130E 0%, #6E561F 55%, #C9A24A 100%)`

## Mappa di sostituzione classi (riferimento globale)

Applicata per ruolo in ogni file. Il prefisso (`bg-`/`text-`/`border-`) determina la regola.

| Classe vecchia | Classe nuova |
|---|---|
| `bg-crema` (sfondo pagina/sezione) | `bg-nero` |
| `bg-crema-scuro` (superficie/card) | `bg-nero-soft` (o `bg-nero-bordo` per superfici "input/chip") |
| `bg-white` (card/input admin) | `bg-nero-soft` |
| `bg-marrone` (superficie scura) | `bg-nero` |
| `bg-marrone-medio/30` (card Contatti) | `bg-nero-soft/60` |
| `text-crema` | `text-bianco-soft` |
| `text-marrone` (titoli/enfasi) | `text-bianco` |
| `text-marrone-medio` (testo secondario) | `text-bianco-soft/70` |
| `text-primario` | `text-oro` |
| `border-crema` / `border-crema-scuro` | `border-nero-bordo` |
| `border-marrone-medio` | `border-nero-bordo` |
| `border-primario` / `border-primario-chiaro` | `border-oro` |
| `bg-primario` (bottoni/badge) | `bg-oro` + testo `text-nero` |
| `bg-primario-scuro` / `hover:bg-primario-scuro` | `bg-oro-chiaro` / `hover:bg-oro-chiaro` |
| `hover:bg-primario hover:text-crema` | `hover:bg-oro hover:text-nero` |
| `bg-oro text-marrone` (bottone oro) | `bg-oro text-nero` |
| `peer-checked:bg-oliva` | `peer-checked:bg-oro` |
| `bg-oliva-chiaro text-marrone` (badge pubblicato) | `bg-oro text-nero` |
| `bg-crema-scuro text-marrone-medio` (badge bozza) | `border border-grigio/60 text-grigio` |
| `after:bg-white` (knob toggle) | **invariato** (resta bianco) |

> Eccezione funzionale: i colori d'errore `red-*` (testo errore, bottone Elimina) restano rossi ma si adattano al fondo scuro (specificato nei task admin). Non fanno parte della palette ma sono segnali di stato.

---

## Task 1: Inizializzare git (consigliato)

Il progetto non è ancora un repository git. Questo task abilita i commit di checkpoint dei task successivi. **Se preferisci non usare git, salta questo task e ignora gli step "Commit" in tutti i task seguenti.**

**Files:**
- Usa: `.gitignore` (già presente)

- [ ] **Step 1: Inizializzare il repository**

Run:
```bash
git init
git add -A
git commit -m "chore: snapshot iniziale prima del redesign cromatico"
```
Expected: un commit creato con tutti i file correnti.

---

## Task 2: Nuovi token + CSS base in `globals.css`

Aggiunge i token nuovi **mantenendo quelli vecchi** (rimossi nel Task 17), ribalta `body` e `.prose` al tema scuro, aggiorna l'ombra `hover-lift`.

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Aggiungere i nuovi token nel blocco `@theme`**

Sostituire il blocco `@theme { ... }` esistente con questo (i token vecchi restano in coda, verranno tolti al Task 17):

```css
@theme {
  /* ===== NUOVA PALETTE — nero / oro / bianco ===== */
  /* Neri — superfici (dominante) */
  --color-nero:        #0A0A0B;
  --color-nero-soft:   #15130E;
  --color-nero-bordo:  #2A2720;
  /* Oro — accento */
  --color-oro:         #C9A24A;
  --color-oro-chiaro:  #EBCB73;
  --color-oro-scuro:   #8C6A2B;
  /* Bianchi/neutri — testo */
  --color-bianco:      #FFFFFF;
  --color-bianco-soft: #E8E6DF;
  --color-grigio:      #9A968C;

  /* ===== PALETTE VECCHIA — rimossa nel Task finale ===== */
  --color-primario: #C4622D;
  --color-primario-scuro: #9E4A1E;
  --color-primario-chiaro: #E8936B;
  --color-crema: #FEFAF4;
  --color-crema-scuro: #F0E4CF;
  --color-marrone: #3D1F0D;
  --color-marrone-medio: #6B3A20;
  --color-oliva: #7A8C5C;
  --color-oliva-chiaro: #A8BC88;
}
```

> Nota: i vecchi `--color-oro` e `--color-oro-chiaro` vengono **sostituiti** dai nuovi valori sopra (oro raffinato). Non vanno duplicati nella sezione "vecchia".

- [ ] **Step 2: Ribaltare `body` al tema scuro**

Sostituire la regola `body { ... }`:

```css
body {
  background-color: #0A0A0B;
  color: #E8E6DF;
  font-family: var(--font-lato), system-ui, sans-serif;
}
```

- [ ] **Step 3: Ribaltare le regole `.prose` per fondo scuro**

Sostituire le quattro regole `.prose ...` esistenti con:

```css
.prose h1, .prose h2, .prose h3 {
  color: #FFFFFF;
  font-family: var(--font-playfair), Georgia, serif;
}

.prose p, .prose li {
  color: #E8E6DF;
  line-height: 1.8;
}

.prose a {
  color: #C9A24A;
  text-decoration: underline;
}

.prose strong {
  color: #FFFFFF;
}
```

- [ ] **Step 4: Aggiornare l'ombra `hover-lift` (marrone invisibile → nera + alone oro)**

Sostituire la regola `.hover-lift:hover { ... }`:

```css
.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.7),
    0 8px 24px -12px rgba(201, 162, 74, 0.22);
}
```

- [ ] **Step 5: Verificare che la build passi con i nuovi token**

Run: `npm run build`
Expected: build completata senza errori (i token nuovi e vecchi coesistono).

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): aggiungi palette nero/oro/bianco e base CSS scura"
```

---

## Task 3: `Ornaments.tsx` (token CSS var + pattern dorato)

Componenti decorativi condivisi: il punto centrale del divisore usa `var(--color-crema)` e il pattern a giglio incorpora il vecchio oro come hex URL-encoded.

**Files:**
- Modify: `src/components/ui/Ornaments.tsx`

- [ ] **Step 1: Punto centrale del divisore (riga ~68)**

Sostituire:
```tsx
<circle cx="120" cy="12" r="2" fill="var(--color-crema)" />
```
con:
```tsx
<circle cx="120" cy="12" r="2" fill="var(--color-nero)" />
```
(Il divisore è dorato; il puntino centrale deve "bucare" verso lo sfondo scuro.)

- [ ] **Step 2: Stroke dorato del `patternFleur` (riga ~103)**

Nella stringa `patternFleur`, sostituire l'unica occorrenza `stroke='%23C8893A'` con `stroke='%23C9A24A'` (nuovo oro). Il resto della data-URL resta identico.

- [ ] **Step 3: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|C8893A" src/components/ui/Ornaments.tsx`
Expected: nessun match.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Ornaments.tsx
git commit -m "feat(theme): orna divisore e pattern con nuova palette"
```

---

## Task 4: `Navbar.tsx`

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Applicare le sostituzioni**

Eseguire queste sostituzioni esatte (tutte le occorrenze):

1. Stato scrolled — da:
   `"bg-marrone/95 backdrop-blur-sm shadow-lg py-2"`
   a:
   `"bg-nero/95 backdrop-blur-sm shadow-lg border-b border-oro/30 py-2"`
2. `text-crema font-semibold text-sm tracking-wide` → `text-bianco-soft font-semibold text-sm tracking-wide`
3. `text-crema opacity-70 text-xs tracking-wider uppercase` → `text-bianco-soft opacity-70 text-xs tracking-wider uppercase`
4. Link nav: `nav-underline text-crema text-sm hover:text-oro ...` → `nav-underline text-bianco-soft text-sm hover:text-oro ...` (solo `text-crema`→`text-bianco-soft`)
5. Bottone menu mobile: `className="md:hidden text-crema p-1"` → `className="md:hidden text-bianco-soft p-1"`
6. Menu mobile contenitore: `"md:hidden bg-marrone border-t border-marrone-medio px-6 pb-5 pt-2 mt-2"` → `"md:hidden bg-nero border-t border-nero-bordo px-6 pb-5 pt-2 mt-2"`
7. Link menu mobile: `"block py-3 text-crema hover:text-oro transition-colors border-b border-marrone-medio last:border-0"` → `"block py-3 text-bianco-soft hover:text-oro transition-colors border-b border-nero-bordo last:border-0"`

- [ ] **Step 2: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva" src/components/Navbar.tsx`
Expected: nessun match.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat(theme): navbar scura con bordo oro"
```

---

## Task 5: `Footer.tsx`

**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Applicare le sostituzioni**

1. `<footer className="bg-marrone text-crema border-t border-marrone-medio/50">` → `<footer className="bg-nero text-bianco-soft border-t border-nero-bordo">`
2. `text-crema/70 text-sm leading-relaxed` → `text-bianco-soft/70 text-sm leading-relaxed`
3. Entrambi gli `<ul ...>` / link: `text-sm text-crema/80` → `text-sm text-bianco-soft/80`
4. `<p className="text-sm text-crema/80 leading-relaxed">` → `<p className="text-sm text-bianco-soft/80 leading-relaxed">`
5. `<div className="text-center text-xs text-crema/50">` → `<div className="text-center text-xs text-bianco-soft/50">`

(`text-oro` e `text-oro/40` restano invariati.)

- [ ] **Step 2: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva" src/components/Footer.tsx`
Expected: nessun match.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(theme): footer su superficie nera"
```

---

## Task 6: `Hero.tsx`

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Gradiente di sfondo (GRAD_160)**

Sostituire:
```tsx
"linear-gradient(160deg, #3D1F0D 0%, #6B3A20 40%, #C4622D 80%, #C8893A 100%)",
```
con:
```tsx
"linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
```

- [ ] **Step 2: Vignette**

Sostituire:
```tsx
"radial-gradient(ellipse at center, transparent 40%, rgba(61,31,13,0.55) 100%)",
```
con:
```tsx
"radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
```

- [ ] **Step 3: Sostituzioni classi testo/bottoni**

1. `text-crema/70 tracking-[0.35em]` → `text-bianco-soft/70 tracking-[0.35em]`
2. `text-crema text-4xl md:text-6xl lg:text-7xl font-bold` → `text-bianco text-4xl md:text-6xl lg:text-7xl font-bold`
3. `text-crema/80 text-xl md:text-2xl tracking-[0.3em]` → `text-bianco-soft/80 text-xl md:text-2xl tracking-[0.3em]`
4. `text-crema/85 text-lg md:text-2xl` → `text-bianco-soft/85 text-lg md:text-2xl`
5. `text-base md:text-lg text-crema/65` → `text-base md:text-lg text-bianco-soft/65`
6. CTA primaria: `btn-shimmer px-8 py-3.5 bg-oro text-marrone font-semibold rounded-full hover:bg-oro-chiaro ...` → cambiare solo `text-marrone` in `text-nero`
7. CTA secondaria: `px-8 py-3.5 border border-crema/70 text-crema font-semibold rounded-full hover:bg-crema hover:text-marrone ...` → `px-8 py-3.5 border border-bianco-soft/70 text-bianco-soft font-semibold rounded-full hover:bg-bianco-soft hover:text-nero ...`
8. `text-crema/60 text-xs tracking-widest uppercase` (label "Scorri") → `text-bianco-soft/60 text-xs tracking-widest uppercase`

(`text-oro`, `text-oro-chiaro`, `bg-oro/60` restano invariati.)

- [ ] **Step 4: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|3D1F0D|6B3A20|C4622D|C8893A" src/components/sections/Hero.tsx`
Expected: nessun match.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(theme): hero scuro con gradiente nero-oro"
```

---

## Task 7: `ChiSiamo.tsx`

**Files:**
- Modify: `src/components/sections/ChiSiamo.tsx`

- [ ] **Step 1: Applicare le sostituzioni**

1. `<section id="chi-siamo" className="py-28 bg-crema scroll-mt-20">` → `bg-crema` diventa `bg-nero`
2. `text-primario text-sm uppercase tracking-[0.25em] mb-4` → `text-oro text-sm uppercase tracking-[0.25em] mb-4`
3. `text-4xl md:text-6xl text-marrone mb-6` → `text-4xl md:text-6xl text-bianco mb-6`
4. Paragrafi: ogni `text-marrone-medio leading-relaxed ...` → `text-bianco-soft/70 leading-relaxed ...` (3 occorrenze)
5. `<strong className="text-marrone font-semibold">` → `text-bianco font-semibold`
6. `<strong className="text-primario font-semibold">1836</strong>` → `text-oro font-semibold`
7. Tutti gli `<strong className="text-marrone">` → `text-bianco` (3 occorrenze)
8. Blockquote: `border-l-4 border-oro pl-6 py-2 mt-8 italic text-marrone text-xl ...` → solo `text-marrone`→`text-bianco`
9. Card timeline: `bg-crema-scuro rounded-2xl p-8 hover-lift` → `bg-nero-soft rounded-2xl p-8 hover-lift`
10. `text-marrone text-center text-lg uppercase tracking-widest` → `text-bianco text-center ...`
11. Cerchio anno: `bg-primario text-crema flex items-center ...` → `bg-oro text-nero flex items-center ...`
12. `text-marrone-medio text-sm leading-relaxed pt-3` → `text-bianco-soft/70 text-sm leading-relaxed pt-3`

(`border-oro`, `text-oro`, `bg-oro/40` restano invariati.)

- [ ] **Step 2: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva" src/components/sections/ChiSiamo.tsx`
Expected: nessun match.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ChiSiamo.tsx
git commit -m "feat(theme): sezione Chi Siamo su tema scuro"
```

---

## Task 8: `Galleria.tsx`

**Files:**
- Modify: `src/components/sections/Galleria.tsx`

- [ ] **Step 1: Sostituire i 4 gradienti delle slide**

Nell'array `slides`, sostituire i quattro valori `gradient`:
- slide 1 ("La nostra chiesa"): `"linear-gradient(135deg, #0A0A0B 0%, #6E561F 70%, #C9A24A 100%)"`
- slide 2 ("Adorazione Eucaristica"): `"linear-gradient(135deg, #15130E 0%, #8C6A2B 100%)"`
- slide 3 ("Le processioni"): `"linear-gradient(135deg, #0A0A0B 0%, #C9A24A 60%, #EBCB73 100%)"`
- slide 4 ("La comunità"): `"linear-gradient(135deg, #15130E 0%, #6E561F 55%, #C9A24A 100%)"`

- [ ] **Step 2: Sfondo sezione (hardcoded)**

Sostituire `style={{ backgroundColor: "#F5EDE0" }}` con `style={{ backgroundColor: "#15130E" }}`.

- [ ] **Step 3: Sostituzioni classi**

1. `text-primario text-sm uppercase tracking-[0.25em] mb-4` → `text-oro ...`
2. `text-4xl md:text-6xl text-marrone mb-6` → `text-4xl md:text-6xl text-bianco mb-6`
3. I 4 `AngoloOrnato` con `text-crema/60` → `text-bianco-soft/60` (4 occorrenze, le altre classi `rotate-*` restano)
4. Overlay: `bg-gradient-to-t from-marrone/80 via-transparent to-transparent` → `bg-gradient-to-t from-nero/85 via-transparent to-transparent`
5. `<h3 className="text-crema text-2xl md:text-4xl mb-2">` → `text-bianco text-2xl md:text-4xl mb-2`
6. `text-crema/80 text-sm md:text-lg max-w-xl mx-auto` → `text-bianco-soft/80 text-sm md:text-lg max-w-xl mx-auto`
7. Entrambe le frecce: `bg-crema/20 backdrop-blur-sm text-crema flex ... hover:bg-crema hover:text-marrone ...` → `bg-bianco-soft/15 backdrop-blur-sm text-bianco-soft flex ... hover:bg-bianco-soft hover:text-nero ...` (2 occorrenze identiche)
8. Indicatori attivo/inattivo: `"w-8 bg-primario"` → `"w-8 bg-oro"`; `"w-2.5 bg-marrone/25 hover:bg-marrone/50"` → `"w-2.5 bg-bianco-soft/25 hover:bg-bianco-soft/50"`
9. Caption finale: `text-center text-marrone-medio/60 text-sm mt-8 italic` → `text-center text-bianco-soft/50 text-sm mt-8 italic`

- [ ] **Step 4: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|F5EDE0|6B3A20|C4622D|3D1F0D|7A8C5C|9E4A1E|C8893A|A8BC88" src/components/sections/Galleria.tsx`
Expected: nessun match.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Galleria.tsx
git commit -m "feat(theme): galleria con 4 gradienti nero-oro"
```

---

## Task 9: `Attivita.tsx`

**Files:**
- Modify: `src/components/sections/Attivita.tsx`

- [ ] **Step 1: Gradiente card featured (GRAD_135)**

Sostituire:
```tsx
"linear-gradient(135deg, #3D1F0D 0%, #6B3A20 50%, #9E4A1E 100%)",
```
con:
```tsx
"linear-gradient(135deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
```

- [ ] **Step 2: Sostituzioni classi**

1. `<section id="attivita" className="py-28 bg-crema scroll-mt-20">` → `bg-crema`→`bg-nero`
2. `text-primario text-sm uppercase tracking-[0.25em] mb-4` → `text-oro ...`
3. `text-4xl md:text-6xl text-marrone mb-6` → `text-bianco mb-6`
4. `text-marrone-medio max-w-xl mx-auto leading-relaxed text-lg` → `text-bianco-soft/70 max-w-xl mx-auto leading-relaxed text-lg`
5. Card featured wrapper: `... text-crema grid md:grid-cols-[auto_1fr] ...` → `text-crema`→`text-bianco-soft`
6. Cerchio icona: `bg-crema/10 border border-oro/30` → `bg-bianco-soft/10 border border-oro/30`
7. Badge "In primo piano": `bg-oro text-marrone text-xs font-bold ...` → `bg-oro text-nero text-xs font-bold ...`
8. `text-crema/85 leading-relaxed text-lg mb-5 max-w-2xl` → `text-bianco-soft/85 leading-relaxed text-lg mb-5 max-w-2xl`
9. Tre card piccole: `hover-lift bg-crema-scuro rounded-2xl p-8 ...` → `bg-crema-scuro`→`bg-nero-soft`
10. Cerchio icona piccola: `bg-crema flex items-center justify-center mb-5 group-hover:bg-primario ...` → `bg-nero flex ... group-hover:bg-oro ...`
11. Icona: `text-primario group-hover:text-crema` → `text-oro group-hover:text-nero`
12. `text-xl text-marrone mb-3 group-hover:text-primario` → `text-xl text-bianco mb-3 group-hover:text-oro`
13. `text-marrone-medio leading-relaxed text-sm mb-5` → `text-bianco-soft/70 leading-relaxed text-sm mb-5`
14. Pill dettaglio: `bg-crema text-primario text-xs font-semibold px-3 py-1 rounded-full tracking-wide` → `bg-nero-soft text-oro text-xs font-semibold px-3 py-1 rounded-full tracking-wide`

(`text-oro-chiaro`, `border-oro/30`, `border-oro/40` restano invariati.)

- [ ] **Step 3: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|3D1F0D|6B3A20|9E4A1E" src/components/sections/Attivita.tsx`
Expected: nessun match.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Attivita.tsx
git commit -m "feat(theme): sezione Attività su tema scuro"
```

---

## Task 10: `NotiziePreview.tsx`

**Files:**
- Modify: `src/components/sections/NotiziePreview.tsx`

- [ ] **Step 1: Gradiente `FeaturedCover` (GRAD_135)**

Sostituire:
```tsx
background: "linear-gradient(135deg, #6B3A20 0%, #C4622D 70%, #C8893A 100%)",
```
con:
```tsx
background: "linear-gradient(135deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
```

- [ ] **Step 2: Sfondo sezione (hardcoded)**

Sostituire `style={{ backgroundColor: "#F5EDE0" }}` con `style={{ backgroundColor: "#15130E" }}`.

- [ ] **Step 3: Sostituzioni classi**

1. SVG placeholder: `text-crema/30` → `text-bianco-soft/30`
2. `text-primario text-sm uppercase tracking-[0.25em] mb-3` → `text-oro ...`
3. `text-4xl md:text-6xl text-marrone` → `text-4xl md:text-6xl text-bianco`
4. Bottone "Tutte le notizie": `... border-2 border-primario text-primario font-semibold rounded-full hover:bg-primario hover:text-crema ...` → `... border-2 border-oro text-oro font-semibold rounded-full hover:bg-oro hover:text-nero ...`
5. Stato vuoto: `text-center py-16 text-marrone-medio/60` → `text-center py-16 text-bianco-soft/60`
6. Card in evidenza: `hover-lift group block h-full bg-crema rounded-3xl ...` → `bg-crema`→`bg-nero-soft`
7. Badge "Ultima notizia": `bg-primario text-crema text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide` → `bg-oro text-nero ...`
8. `text-xs text-marrone-medio uppercase tracking-wider` (time) → `text-xs text-bianco-soft/70 uppercase tracking-wider`
9. `text-2xl md:text-3xl text-marrone mb-3 group-hover:text-primario ...` → `text-bianco mb-3 group-hover:text-oro ...`
10. `text-marrone-medio leading-relaxed` (excerpt) → `text-bianco-soft/70 leading-relaxed`
11. `... mt-5 text-primario font-semibold group-hover:gap-2 ...` → `text-oro font-semibold ...`

(`hover:border-oro/40` resta invariato.)

- [ ] **Step 4: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|F5EDE0|6B3A20|C4622D|C8893A" src/components/sections/NotiziePreview.tsx`
Expected: nessun match.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/NotiziePreview.tsx
git commit -m "feat(theme): anteprima notizie su tema scuro"
```

---

## Task 11: `Contatti.tsx`

**Files:**
- Modify: `src/components/sections/Contatti.tsx`

- [ ] **Step 1: Applicare le sostituzioni**

1. `<section id="contatti" className="py-28 bg-marrone text-crema scroll-mt-20 relative overflow-hidden">` → `bg-marrone text-crema` diventa `bg-nero text-bianco-soft`
2. Le tre card: `bg-marrone-medio/30 rounded-2xl p-7 border border-marrone-medio h-full hover:border-oro/40 transition-colors` → `bg-nero-soft/60 rounded-2xl p-7 border border-nero-bordo h-full hover:border-oro/40 transition-colors` (3 occorrenze identiche)
3. Bottone email: `inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-oro text-marrone font-semibold hover:bg-oro-chiaro transition-colors text-sm` → `text-marrone`→`text-nero`
4. Bottone telefono: `... border border-crema/50 text-crema font-semibold hover:bg-crema hover:text-marrone transition-colors text-sm` → `... border border-bianco-soft/50 text-bianco-soft font-semibold hover:bg-bianco-soft hover:text-nero transition-colors text-sm`
5. `text-crema/60 text-xs uppercase tracking-widest` ("Seguici") → `text-bianco-soft/60 text-xs uppercase tracking-widest`

(`text-oro`, `opacity-80`, `opacity-60`, `opacity-50` restano invariati: sono opacità sul colore di testo della sezione, ora `bianco-soft`.)

- [ ] **Step 2: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva" src/components/sections/Contatti.tsx`
Expected: nessun match.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contatti.tsx
git commit -m "feat(theme): sezione Contatti su tema scuro"
```

---

## Task 12: `ArticleCard.tsx`

**Files:**
- Modify: `src/components/ArticleCard.tsx`

- [ ] **Step 1: Gradiente placeholder (GRAD_135)**

Sostituire:
```tsx
"linear-gradient(135deg, #F0E4CF 0%, #E8936B 60%, #C4622D 100%)",
```
con:
```tsx
"linear-gradient(135deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
```

- [ ] **Step 2: Sostituzioni classi**

1. SVG placeholder: `text-crema/50` → `text-bianco-soft/50`
2. `<article className="hover-lift bg-crema-scuro rounded-2xl overflow-hidden border border-transparent hover:border-oro/40 ...">` → `bg-crema-scuro`→`bg-nero-soft`
3. `text-xs text-marrone-medio uppercase tracking-wider` (time) → `text-xs text-bianco-soft/70 uppercase tracking-wider`
4. `mt-2 text-lg leading-snug text-marrone group-hover:text-primario ...` → `... text-bianco group-hover:text-oro ...`
5. `mt-3 text-sm text-marrone-medio leading-relaxed line-clamp-3 flex-1` → `mt-3 text-sm text-bianco-soft/70 leading-relaxed line-clamp-3 flex-1`
6. `inline-flex items-center gap-1 mt-4 text-sm text-primario font-semibold ...` → `text-oro font-semibold ...`

- [ ] **Step 3: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|F0E4CF|E8936B|C4622D" src/components/ArticleCard.tsx`
Expected: nessun match.

- [ ] **Step 4: Commit**

```bash
git add src/components/ArticleCard.tsx
git commit -m "feat(theme): card articolo su tema scuro"
```

---

## Task 13: `notizie/page.tsx` (lista)

**Files:**
- Modify: `src/app/notizie/page.tsx`

- [ ] **Step 1: Sostituzioni**

1. `<div className="min-h-screen bg-crema">` → `bg-crema`→`bg-nero`
2. Header: `py-36 text-center text-crema relative overflow-hidden` → `text-crema`→`text-bianco-soft`
3. Gradiente header (GRAD_160) — sostituire
   `"linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",`
   con
   `"linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",`
4. Stato vuoto: `text-center py-20 text-marrone-medio/60` → `text-center py-20 text-bianco-soft/50`

(`text-oro`, `opacity-75`, `opacity-[0.06]`, `opacity-[0.07]` restano invariati.)

- [ ] **Step 2: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|3D1F0D|6B3A20|C4622D" src/app/notizie/page.tsx`
Expected: nessun match.

- [ ] **Step 3: Commit**

```bash
git add src/app/notizie/page.tsx
git commit -m "feat(theme): lista notizie su tema scuro"
```

---

## Task 14: `notizie/[slug]/page.tsx` (dettaglio)

**Files:**
- Modify: `src/app/notizie/[slug]/page.tsx`

- [ ] **Step 1: Sostituzioni**

1. `<div className="min-h-screen bg-crema">` → `bg-crema`→`bg-nero`
2. Header: `py-32 px-6 text-crema relative overflow-hidden` → `text-crema`→`text-bianco-soft`
3. Gradiente header (GRAD_160) — sostituire
   `"linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",`
   con
   `"linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",`
4. Excerpt: `text-marrone-medio text-lg leading-relaxed mb-10 border-l-4 border-primario-chiaro pl-5 italic` → `text-bianco-soft/80 text-lg leading-relaxed mb-10 border-l-4 border-oro pl-5 italic`
5. Separatore fondo: `mt-16 pt-8 border-t border-crema-scuro` → `mt-16 pt-8 border-t border-nero-bordo`
6. Link ritorno: `text-primario font-semibold hover:text-primario-scuro transition-colors` → `text-oro font-semibold hover:text-oro-chiaro transition-colors`

(`text-oro`, `opacity-80`, `opacity-60` restano invariati. Il corpo `.prose` è già gestito da `globals.css`.)

- [ ] **Step 2: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|3D1F0D|6B3A20|C4622D" src/app/notizie/\[slug\]/page.tsx`
Expected: nessun match.

- [ ] **Step 3: Commit**

```bash
git add "src/app/notizie/[slug]/page.tsx"
git commit -m "feat(theme): dettaglio articolo su tema scuro"
```

---

## Task 15: `admin/login/page.tsx`

**Files:**
- Modify: `src/app/admin/login/page.tsx`

- [ ] **Step 1: Gradiente sfondo (GRAD_160)**

Sostituire:
```tsx
"linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",
```
con:
```tsx
"linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
```

- [ ] **Step 2: Sostituzioni classi**

1. Card: `bg-crema rounded-2xl shadow-2xl p-10 w-full max-w-sm` → `bg-nero-soft rounded-2xl shadow-2xl p-10 w-full max-w-sm`
2. `text-2xl text-marrone` ("Area Riservata") → `text-2xl text-bianco`
3. `text-marrone-medio text-sm mt-2 opacity-70` → `text-bianco-soft/70 text-sm mt-2`
4. Label: `block text-xs uppercase tracking-wider text-marrone-medio mb-2` → `... text-bianco-soft/70 mb-2`
5. Input: `w-full px-4 py-3 rounded-lg border border-crema-scuro bg-crema focus:outline-none focus:border-primario text-marrone text-sm` → `w-full px-4 py-3 rounded-lg border border-nero-bordo bg-nero focus:outline-none focus:border-oro text-bianco-soft text-sm`
6. Bottone: `w-full py-3 bg-primario text-crema font-semibold rounded-lg hover:bg-primario-scuro transition-colors disabled:opacity-50 tracking-wide` → `w-full py-3 bg-oro text-nero font-semibold rounded-lg hover:bg-oro-chiaro transition-colors disabled:opacity-50 tracking-wide`

(`text-oro`, `text-red-600` restano invariati.)

- [ ] **Step 3: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|3D1F0D|6B3A20|C4622D" src/app/admin/login/page.tsx`
Expected: nessun match.

- [ ] **Step 4: Commit**

```bash
git add src/app/admin/login/page.tsx
git commit -m "feat(theme): login admin su tema scuro"
```

---

## Task 16: `admin/page.tsx` (pannello)

File grande ma sostituzioni meccaniche. Attenzione alle eccezioni segnalate (toggle, badge stato, errori).

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Superfici e barre**

1. Entrambe le `<div className="min-h-screen bg-crema ...">` (lista e form) → `bg-crema`→`bg-nero` (la form ha anche `pb-20`, mantenerlo)
2. Entrambe le barre superiori `bg-marrone text-crema px-6 py-4 ...` → `bg-nero-soft text-bianco-soft px-6 py-4 ...`
3. Bottone "Esci": `px-4 py-2 border border-crema/40 opacity-70 ...` → `... border border-bianco-soft/30 opacity-70 ...`
4. Barra form, link "Torna agli articoli": `text-crema/70 hover:text-crema transition-colors` → `text-bianco-soft/70 hover:text-bianco-soft transition-colors`

- [ ] **Step 2: Tutte le superfici `bg-white` → `bg-nero-soft`**

Sostituire **ogni** occorrenza di `bg-white` (card, input, textarea, preview, toolbar buttons, Step wrapper, empty state) con `bg-nero-soft`.
**ECCEZIONE — NON toccare** `after:bg-white` (knob del toggle, Step PASSO 5): resta `after:bg-white`.

- [ ] **Step 3: Bordi e chip `crema-scuro`**

1. Ogni `border-crema-scuro` → `border-nero-bordo`
2. `bg-crema-scuro` come superficie (mini cover vuota, knob OFF, edit button) → `bg-nero-bordo`
3. `bg-crema-scuro/50` (wrapper toolbar) → `bg-nero-bordo/50`
4. `bg-crema-scuro/40` (riga pubblicazione) → `bg-nero-bordo/40`
5. `bg-crema-scuro/30` (input slug) → `bg-nero/40`

- [ ] **Step 4: Testi**

1. Ogni `text-marrone` → `text-bianco`
2. Ogni `text-marrone-medio` (incluse varianti `/70`, `/60`, `/40`) → `text-bianco-soft` mantenendo la stessa opacità (es. `text-marrone-medio/70`→`text-bianco-soft/70`, `text-marrone-medio`→`text-bianco-soft/70`)

- [ ] **Step 5: Bottoni e accenti oro**

1. Ogni `bg-primario text-crema ... hover:bg-primario-scuro` (3 bottoni Salva/Nuovo) → `bg-oro text-nero ... hover:bg-oro-chiaro`
2. `bg-primario text-crema rounded-lg hover:bg-primario-scuro` (empty state "Inizia ora") → `bg-oro text-nero rounded-lg hover:bg-oro-chiaro`
3. Step number `shrink-0 w-7 h-7 rounded-full bg-primario text-crema ...` → `bg-oro text-nero ...`
4. Ogni `text-primario` rimasto (link "Vedi anteprima", "(obbligatorio)") → `text-oro`
5. `focus:border-primario` (tutti gli input/textarea) → `focus:border-oro`
6. Hover dell'edit button e dei toolbar buttons: ogni `hover:bg-primario hover:text-crema` → `hover:bg-oro hover:text-nero` (lo sfondo base `bg-white`/`bg-crema-scuro` e il testo `text-marrone` di questi due bottoni sono già stati convertiti negli Step 2–4; qui si tocca solo l'hover)

- [ ] **Step 6: Badge di stato e toggle**

1. Badge pubblicato/bozza:
```tsx
className={`text-xs px-2 py-0.5 rounded-full ${
  a.published
    ? "bg-oliva-chiaro text-marrone"
    : "bg-crema-scuro text-marrone-medio"
}`}
```
diventa:
```tsx
className={`text-xs px-2 py-0.5 rounded-full ${
  a.published
    ? "bg-oro text-nero"
    : "border border-grigio/60 text-grigio"
}`}
```
2. Toggle (PASSO 5): `w-12 h-6 bg-crema-scuro rounded-full peer peer-checked:bg-oliva ... after:bg-white ...` → `w-12 h-6 bg-nero-bordo rounded-full peer peer-checked:bg-oro ... after:bg-white ...` (cambiano solo `bg-crema-scuro`→`bg-nero-bordo` e `peer-checked:bg-oliva`→`peer-checked:bg-oro`; `after:bg-white` resta)

- [ ] **Step 7: Messaggi di stato ed errori (eccezione rossa)**

1. Messaggio lista: `mb-6 p-4 bg-oliva-chiaro/40 text-marrone rounded-lg font-medium` → `mb-6 p-4 bg-oro/15 text-bianco-soft rounded-lg font-medium`
2. Messaggio form (successo/errore):
```tsx
msg.startsWith("✅")
  ? "bg-oliva-chiaro text-marrone"
  : "bg-red-50 text-red-700"
```
diventa:
```tsx
msg.startsWith("✅")
  ? "bg-oro/15 text-bianco-soft"
  : "bg-red-500/10 text-red-300"
```
3. Bottone Elimina: `px-4 py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors` → `px-4 py-2 text-sm border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors`
4. Mini cover vuota icona: `text-marrone-medio/40 text-2xl` → coperto dallo Step 4 (`text-bianco-soft/40`). Verificare che sia stato applicato.

(`text-red-500` del messaggio anteprima immagine — riga "Impossibile caricare questa immagine" — resta `text-red-500`: leggibile su scuro.)

- [ ] **Step 8: Verificare nessun token vecchio residuo**

Run: `rg -n "crema|marrone|primario|oliva|bg-white" src/app/admin/page.tsx`
Expected: un solo match ammesso → `after:bg-white` (knob). Nessun altro.

- [ ] **Step 9: Commit**

```bash
git add src/app/admin/page.tsx
git commit -m "feat(theme): pannello admin su tema scuro"
```

---

## Task 17: Rimuovere token vecchi, aggiornare docs, verifica finale

**Files:**
- Modify: `src/app/globals.css`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Rimuovere la sezione "PALETTE VECCHIA" da `@theme`**

In `src/app/globals.css`, cancellare le righe dei token vecchi aggiunte nel Task 2, lasciando solo i 9 token nuovi:

```css
@theme {
  /* Neri — superfici (dominante) */
  --color-nero:        #0A0A0B;
  --color-nero-soft:   #15130E;
  --color-nero-bordo:  #2A2720;
  /* Oro — accento */
  --color-oro:         #C9A24A;
  --color-oro-chiaro:  #EBCB73;
  --color-oro-scuro:   #8C6A2B;
  /* Bianchi/neutri — testo */
  --color-bianco:      #FFFFFF;
  --color-bianco-soft: #E8E6DF;
  --color-grigio:      #9A968C;
}
```

- [ ] **Step 2: Verifica globale — nessun token vecchio in `src/`**

Run: `rg -n "primario|crema|marrone|oliva" src`
Expected: nessun match (in tutto `src/`).

Run: `rg -n "C4622D|9E4A1E|E8936B|C8893A|E0B970|FEFAF4|F0E4CF|3D1F0D|6B3A20|7A8C5C|A8BC88|F5EDE0" src`
Expected: nessun match (tutti gli hex vecchi spariti, incluso l'encoded del pattern).

> Se un comando trova un match, correggerlo nel file indicato usando la mappa di sostituzione, poi rilanciare.

- [ ] **Step 3: Aggiornare la tabella "Palette colori" in `CLAUDE.md`**

Sostituire la tabella sotto `## Palette colori (Tailwind)` con:

```markdown
| Classe | Hex | Uso |
|---|---|---|
| `bg/text-nero` | `#0A0A0B` | Sfondo principale (tema scuro) |
| `bg/text-nero-soft` | `#15130E` | Sezioni alternate, card, pannelli |
| `bg/text-nero-bordo` | `#2A2720` | Bordi sottili su fondo scuro |
| `bg/text-oro` | `#C9A24A` | Accento: CTA, link, ornamenti, badge "pubblicato" |
| `bg/text-oro-chiaro` | `#EBCB73` | Punto luce gradienti, shimmer, hover |
| `bg/text-oro-scuro` | `#8C6A2B` | Hover/ombre dorate |
| `bg/text-bianco` | `#FFFFFF` | Titoli, alta enfasi |
| `bg/text-bianco-soft` | `#E8E6DF` | Corpo testo |
| `bg/text-grigio` | `#9A968C` | Stato "bozza" (uso minimo) |

> Gradienti decorativi: nero→oro (vedi `docs/superpowers/specs/2026-06-06-redesign-colore-nero-oro-bianco-design.md`). Bottoni con sfondo oro → testo nero.
```

- [ ] **Step 4: Build e lint finali**

Run: `npm run build`
Expected: build completata senza errori.

Run: `npm run lint`
Expected: nessun errore di lint.

- [ ] **Step 5: Ispezione visiva**

Run: `npm run dev` e aprire `http://localhost:3000`. Controllare:
- Home: Hero (gradiente nero→oro), Chi Siamo, Galleria (4 slide diverse), Attività, Notizie, Contatti — tutto scuro, testo leggibile, accenti oro, nessun residuo terracotta/crema/verde.
- `/notizie` e un articolo (`.prose` chiaro su scuro).
- `/admin/login` e `/admin`: pannello scuro, bottoni oro con testo nero, badge oro=pubblicato / contorno grigio=bozza, errori rossi leggibili.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css CLAUDE.md
git commit -m "feat(theme): rimuovi palette vecchia e aggiorna documentazione"
```

---

## Verifica di copertura (spec → task)

- Token nuovi `@theme` → Task 2, 17
- Mappatura per ruolo (marrone/crema doppio uso) → Task 2 (CSS), 4 (Navbar), 5 (Footer), 11 (Contatti), 16 (admin)
- Gradienti nero→oro (ricetta base) → Task 6, 9, 10, 12, 13, 14, 15
- Galleria 4 sfumature distinte → Task 8
- Overlay/vignette nere → Task 6 (vignette), 8 (overlay)
- Badge stato oro/grigio → Task 16
- CTA oro → testo nero → Task 6, 9, 10, 11, 15, 16
- `.prose` ribaltato → Task 2
- Ombre hover → Task 2
- `var(--color-crema)` e pattern dorato → Task 3
- Rimozione token vecchi + docs → Task 17
