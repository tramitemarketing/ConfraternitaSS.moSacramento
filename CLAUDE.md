@AGENTS.md

# Confraternita del SS.mo Sacramento — Monteprandone

Sito vetrina + blog per la Confraternita del SS.mo Sacramento di Monteprandone (fondata 1836).

## Stack

- **Next.js 16** con App Router
- **Tailwind CSS v4** — config via CSS `@theme` in `globals.css`
- **TypeScript**
- Font: Playfair Display (headings) + Lato (body) via `next/font/google`
- Blog: articoli in `content/notizie.json`
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
  components/
    Navbar.tsx                # Navbar fissa con scroll detection
    Footer.tsx
    ArticleCard.tsx           # Card per anteprima articoli
    sections/
      Hero.tsx                # Sezione hero (fullscreen)
      ChiSiamo.tsx            # Storia e identità
      Attivita.tsx            # Attività spirituali e caritative
      NotiziePreview.tsx      # Anteprima 3 ultimi articoli
      Contatti.tsx            # Info contatti (no form)
  lib/
    posts.ts                  # CRUD articoli su Supabase (async)
    supabase.ts               # Client Supabase (service role, server-only)
    imageUpload.ts            # Helper client: ridimensiona + carica immagini
    site.ts                   # Config contatti/social
  app/api/upload/route.ts     # Upload immagini → Supabase Storage (bucket "immagini")
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

> Gradienti decorativi: nero→oro (vedi `docs/superpowers/specs/2026-06-06-redesign-colore-nero-oro-bianco-design.md`). Bottoni con sfondo oro → testo nero.

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
```

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

- **Nome**: Confraternita del SS.mo Sacramento di Monteprandone
- **Diocesi**: San Benedetto del Tronto – Ripatransone – Montalto Marche
- **Priore**: Tonino Sciarroni (coordina anche a livello diocesano)
- **Fondazione**: 1836
- **Riforma statuto**: ~2009 (accesso ufficiale delle consorelle)
- **Adorazione eucaristica**: ogni 1° giovedì del mese
- **Incontri diocesani**: 4 all'anno
