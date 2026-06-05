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
    posts.ts                  # Lettura/scrittura articoli da JSON
  middleware.ts               # Protegge /admin/* (redirect a login)
content/
  notizie.json                # Articoli del blog
```

## Palette colori (Tailwind)

Definita in `globals.css` con `@theme`. Classi disponibili:

| Classe | Hex | Uso |
|---|---|---|
| `bg/text-primario` | `#C4622D` | Terracotta — CTA, accenti |
| `bg/text-primario-scuro` | `#9E4A1E` | Hover terracotta |
| `bg/text-primario-chiaro` | `#E8936B` | Accenti leggeri |
| `bg/text-oro` | `#C8893A` | Oro — decorativo, navbar |
| `bg/text-crema` | `#FEFAF4` | Sfondo principale |
| `bg/text-crema-scuro` | `#F0E4CF` | Sfondo sezioni alternate |
| `bg/text-marrone` | `#3D1F0D` | Testo principale, footer |
| `bg/text-marrone-medio` | `#6B3A20` | Testo secondario |
| `bg/text-oliva` | `#7A8C5C` | Badge "pubblicato" |
| `bg/text-oliva-chiaro` | `#A8BC88` | Badge chiaro |

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
- Modificare articoli esistenti
- Pubblicare/mettere in bozza
- Eliminare articoli

## Storage articoli

Gli articoli sono in `content/notizie.json`. Formato:

```json
{
  "slug": "identificativo-url",
  "title": "Titolo articolo",
  "date": "2025-06-01",
  "excerpt": "Breve descrizione...",
  "content": "Testo in **markdown**...",
  "published": true
}
```

> **Nota produzione**: su Vercel il filesystem è read-only — il JSON viene letto ma non può essere scritto dalle API routes. Per la produzione servono: un database (es. Supabase, PlanetScale) o un CMS headless (Sanity, Contentful). Per ora funziona in locale e su hosting con filesystem persistente.

## Informazioni confraternita

- **Nome**: Confraternita del SS.mo Sacramento di Monteprandone
- **Diocesi**: San Benedetto del Tronto – Ripatransone – Montalto Marche
- **Priore**: Tonino Sciarroni (coordina anche a livello diocesano)
- **Fondazione**: 1836
- **Riforma statuto**: ~2009 (accesso ufficiale delle consorelle)
- **Adorazione eucaristica**: ogni 1° giovedì del mese
- **Incontri diocesani**: 4 all'anno
