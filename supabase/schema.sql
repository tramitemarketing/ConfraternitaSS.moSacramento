-- ============================================================
-- Schema per la Confraternita della Pietà e della Morte
-- Esegui questo script nella sezione "SQL Editor" di Supabase
-- ============================================================

-- Tabella articoli del blog
create table if not exists notizie (
  id          bigint generated always as identity primary key,
  slug        text unique not null,
  title       text not null,
  date        date not null default current_date,
  excerpt     text not null default '',
  content     text not null default '',
  cover_image text,
  published   boolean not null default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Indice per query frequenti
create index if not exists notizie_published_date_idx
  on notizie (published, date desc);

-- Trigger per aggiornare updated_at automaticamente
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger notizie_updated_at
  before update on notizie
  for each row execute procedure update_updated_at();

-- Row Level Security
alter table notizie enable row level security;

-- Chiunque può leggere gli articoli pubblicati (sito pubblico)
create policy "Leggi articoli pubblicati"
  on notizie for select
  using (published = true);

-- Il service_role bypassa l'RLS automaticamente (usato dall'app Next.js)

-- ============================================================
-- Dati iniziali (articoli di esempio)
-- Esegui solo la prima volta, oppure salta se vuoi partire da zero
-- ============================================================

insert into notizie (slug, title, date, excerpt, content, published) values
(
  'processione-venerdi-santo-2026',
  'Processione del Cristo Morto — Venerdì Santo 2026',
  '2026-04-03',
  'Il Venerdì Santo 2026 la Confraternita della Pietà e della Morte torna nelle vie medievali di Monteprandone con la tradizionale Processione del Cristo Morto. Partenza alle ore 21:00 dalla Chiesa San Nicolò di Bari.',
  E'## La Processione del Cristo Morto\n\nAnche quest''anno la **Confraternita della Pietà e della Morte di Monteprandone** porta nelle strade del borgo la storica Processione del Cristo Morto.\n\n### Dettagli\n\n- **Data**: Venerdì Santo 2026\n- **Ora di partenza**: 21:00\n- **Luogo di partenza**: Chiesa San Nicolò di Bari, Monteprandone\n- **Bus gratuito**: dalle ore 20:30 da Centobuchi (piazzale Eurospin) e piazzale Santuario S. Maria delle Grazie\n\n### Il corteo\n\nOltre **300 figuranti in costume storico** accompagnano la Bara del Cristo Morto — costruita tra il 1846 e il 1859 — attraverso le vie medievali del borgo.\n\nLe **Pie Donne** intonano i canti tradizionali *«Popule meus»* (Improperia) e *«Stava Maria»*, tramandati oralmente da generazioni.\n\n### Riconoscimento 2026\n\nQuest''anno la processione è stata inserita da **Borghi più belli d''Italia nelle Marche** tra le 5 processioni del Venerdì Santo imperdibili della regione.',
  true
),
(
  'rifondazione-confraternita-2009',
  'La rifondazione del 2009 — quindici anni di rinascita',
  '2024-06-09',
  'Il 9 giugno 2009 la Confraternita della Pietà e della Morte tornava in vita dopo circa settant''anni di inattività. Ripercorriamo quindici anni di storia rinata.',
  E'## 9 giugno 2009: una nuova vita\n\nDopo circa settant''anni di inattività, il **9 giugno 2009** la Confraternita della Pietà e della Morte di Monteprandone è stata ufficialmente rifondata.\n\n### La storia\n\nLa confraternita, attestata almeno dal decreto della Sacra Visita del 1610 voluto dal vescovo Pompeo De-Nobili, aveva una tradizione secolare nella cura dei defunti e nell''organizzazione della processione del Venerdì Santo.\n\n### La Bara del Cristo Morto\n\nIl simbolo più prezioso della confraternita è la **Bara del Cristo Morto**, costruita tra il 1846 e il 1859 sotto il Priore Alessandro Sardi:\n\n- **1846**: scultura del Cristo in legno — Emidio Paci (33,21 scudi)\n- **1847**: cataletto ligneo — Sante Morelli di Montegiorgio (60 scudi)\n- **1851**: doratura — Tito Boccachiodi (55 scudi)\n- **1855**: ricami in oro e argento — Monache di Santa Caterina di Ripatransone (33 scudi)\n\nCosto totale: **220,21 scudi romani**. La prima processione con la Bara si tenne il Venerdì Santo del **1859**.',
  true
),
(
  'benvenuti-sul-nostro-sito',
  'Benvenuti sul sito della Confraternita',
  '2024-01-10',
  'La Confraternita della Pietà e della Morte di Monteprandone è ora online. Troverete qui notizie, eventi e informazioni sulla nostra tradizione secolare.',
  E'## Siamo online!\n\nBenvenuti sul sito della **Confraternita della Pietà e della Morte di Monteprandone**.\n\n### Cosa troverete qui\n\n- **Notizie** sulla processione del Venerdì Santo e sulle attività della confraternita\n- **La storia** delle nostre origini nel XVII secolo e della costruzione della Bara del Cristo Morto\n- **Informazioni pratiche** su orari, percorso e bus gratuito per la processione\n\nSiamo presenti in questo borgo fin dal XVII secolo, e ogni anno il **Venerdì Santo** torniamo a portare il Cristo Morto tra le vie medievali di Monteprandone.',
  true
)
on conflict (slug) do nothing;
