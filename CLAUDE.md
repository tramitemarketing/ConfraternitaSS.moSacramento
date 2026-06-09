@AGENTS.md

# Confraternita della Pietà e della Morte — Monteprandone

Sito vetrina + blog per la Confraternita della Pietà e della Morte di Monteprandone (fondata XVII sec., rifondata 2009).

## Stack

- **Next.js 16** con App Router
- **Tailwind CSS v4** — config via CSS `@theme` in `globals.css`
- **TypeScript**
- Font: Playfair Display (headings) + Lato (body) via `next/font/google`
- Blog: articoli su Supabase PostgreSQL
- Auth admin: cookie `admin_session`, password in `.env.local`

## Struttura directory

```
src/
  app/
    page.tsx                  # Homepage (scroll unico)
    layout.tsx                # Layout root con Navbar + Footer
    globals.css               # Palette colori Tailwind v4 + CSS base
    notizie/
      page.tsx                # Lista articoli blog
      [slug]/page.tsx         # Dettaglio articolo
    admin/
      page.tsx                # Pannello admin (protetto)
      login/page.tsx          # Pagina login admin
    api/
      auth/route.ts           # POST login / DELETE logout
      notizie/route.ts        # GET lista / POST nuovo articolo
      notizie/[slug]/route.ts # PUT modifica / DELETE elimina
      upload/route.ts         # Upload immagini → Supabase Storage
  components/
    Navbar.tsx                # Navbar fissa con scroll detection
    Footer.tsx
    ArticleCard.tsx           # Card per anteprima articoli
    sections/
      Hero.tsx                # Sezione hero (fullscreen)
      ChiSiamo.tsx            # Storia e identità
      Processione.tsx         # Sezione dedicata alla Processione del Cristo Morto
      Galleria.tsx            # Carosello foto (placeholder → reali)
      Attivita.tsx            # Attività spirituali e caritative
      NotiziePreview.tsx      # Anteprima 3 ultimi articoli
      Contatti.tsx            # Info contatti (no form)
  lib/
    posts.ts                  # CRUD articoli su Supabase (async)
    supabase.ts               # Client Supabase (service role, server-only)
    imageUpload.ts            # Helper client: ridimensiona + carica immagini
    site.ts                   # Config contatti/social/chiesa
  proxy.ts                    # Protegge /admin/* (ex middleware.ts, Next 16)
supabase/
  schema.sql                  # DDL tabella notizie + RLS + dati iniziali
docs/reusable/                # Pattern riutilizzabili per progetti futuri
```

## Palette colori (Tailwind)

Definita in `globals.css` con `@theme`. Classi disponibili:

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

> Gradienti decorativi: nero→oro. Bottoni con sfondo oro → testo nero.

## Comandi

```bash
npm run dev      # Sviluppo locale (http://localhost:3000)
npm run build    # Build produzione
npm run lint     # ESLint
```

## Admin panel

Accesso: `/admin` → reindirizza a `/admin/login`
Password default: `confraternita2024` (cambiare in `.env.local`)

L'admin permette di:
- Creare nuovi articoli con editor markdown + toolbar di formattazione
- Caricare immagini di copertina (pulsante "Carica foto" → Supabase Storage)
- Modificare articoli esistenti
- Pubblicare/mettere in bozza
- Eliminare articoli

## Storage (Supabase)

Articoli e immagini sono su **Supabase** (Postgres + Storage).

- **Database**: tabella `notizie` (vedi `supabase/schema.sql`). CRUD in `lib/posts.ts`.
- **Immagini**: bucket pubblico `immagini`, creato automaticamente al primo
  upload da `app/api/upload/route.ts`. Le foto vengono ridimensionate nel
  browser (max 1600px) prima dell'invio.

Variabili d'ambiente richieste (Vercel + `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # SEGRETO, solo server-side
ADMIN_PASSWORD=...
NEXT_PUBLIC_SITE_URL=https://...   # URL pubblico, per i metadati Open Graph (anteprime social)
```

## Asset grafici (logo)

Da caricare in `public/` (consumati con fallback automatico alla croce ornamentale):

- `public/logo-confraternita.png` — sigillo circolare completo. Usato nella
  navbar, nel footer, come favicon e immagine Open Graph. Ideale: PNG quadrato
  con sfondo trasparente, ≥512px.
- `public/teschio.png` — teschio centrale ritagliato. Usato come elemento
  decorativo nei punti principali (sfondo hero, sezione processione, contatti).
  Ideale: PNG con sfondo trasparente, monocromatico (oro/bianco).

Componenti: `components/ui/Logo.tsx` e `components/ui/Teschio.tsx` (client,
con `onError` → croce ornamentale finché i file non sono presenti).

## SEO

- Metadati centralizzati in `app/layout.tsx`: `title` con `template`,
  `description`, `keywords`, Open Graph + Twitter Card, `canonical`.
- `app/notizie/page.tsx` e `app/notizie/[slug]/page.tsx` hanno metadati propri;
  gli articoli generano Open Graph `type: article` con immagine di copertina.
- Mappa percorso: embed Google My Maps in `components/sections/Processione.tsx`
  (costante `MYMAPS_EMBED_URL`; fallback a mappa keyless centrata sulla chiesa).

Formato articolo (campi camelCase nell'app, snake_case nel DB):

```json
{
  "slug": "identificativo-url",
  "title": "Titolo articolo",
  "date": "2025-06-01",
  "excerpt": "Breve descrizione...",
  "content": "Testo in **markdown**...",
  "coverImage": "https://xxxx.supabase.co/storage/v1/object/public/immagini/...",
  "published": true
}
```

> Le pagine pubbliche `/notizie` e `/notizie/[slug]` usano `force-dynamic`:
> i contenuti sono sempre aggiornati senza rebuild.

## Pattern riutilizzabili

In `docs/reusable/` ci sono guide self-contained copiabili in altri progetti:
- `supabase-image-upload.md` — pulsante "Carica foto" con Supabase Storage,
  upload sicuro server-side e ridimensionamento client.

## Informazioni confraternita

- **Nome**: Confraternita della Pietà e della Morte di Monteprandone
- **Origini**: monaci dell'Abbazia di Farfa (~anno 1000); fondata formalmente da vescovo Pompeo De-Nobili (episcopato 1591–1606)
- **Prima attestazione**: decreto Sacra Visita 1610
- **Chiesa**: San Nicolò di Bari, Monteprandone
- **Rifondazione**: 9 giugno 2009 (dopo ~70 anni di inattività)
- **Riconoscimento 2026**: "Borghi più belli d'Italia nelle Marche" — 5 processioni imperdibili del Venerdì Santo

### La Bara del Cristo Morto (1846–1859)

Costruita sotto il Priore Alessandro Sardi — costo totale 220,21 scudi romani:
- 1846: Cristo in legno — Emidio Paci (33,21 scudi)
- 1847: Cataletto ligneo — Sante Morelli, Montegiorgio (60 scudi)
- 1851: Doratura — Tito Boccachiodi (55 scudi)
- 1855: Velluti, frange oro/argento (36 scudi)
- 1855: Ricami in argento — Monache di Santa Caterina di Ripatransone (33 scudi)
- Prima processione: Venerdì Santo 1859

### La Processione del Venerdì Santo

- **Orario**: ore 21:00, partenza da Chiesa San Nicolò di Bari
- **Figuranti**: 300+ in costume storico
- **Bus gratuito**: dalle 20:30 da Centobuchi (piazzale Eurospin) e piazzale Santuario S. Maria delle Grazie
- **Ordine corteo**: Croce/simboli Passione → 7 gonfaloni rossi (ultime parole Cristo) → Vergini (bambine in bianco) → Pie Donne (abito nero, canti polifonici) → fanciulle con 7 spade → Banda (Istituto Comprensivo Musicale di Monteprandone) → clero + Padri Santuario S. Maria delle Grazie + autorità civili + Carabinieri Alta Uniforme → San Giovanni + Madonna Addolorata → Bara del Cristo Morto
- **Percorso**: via Leopardi → via Roma → Piazza 14 Novembre → via Corso → via Tavernette → via Orti → Contrada Macigne → via Borgo da Monte → via Borgo da Sole → rientro in chiesa
- **Canti**: «Popule meus» (Improperia) e «Stava Maria» (Stabat Mater locale, Pie Donne)
