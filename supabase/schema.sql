-- ============================================================
-- Schema per la Confraternita del SS.mo Sacramento
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
-- Dati iniziali (i 3 articoli di esempio)
-- Esegui solo la prima volta, oppure salta se vuoi partire da zero
-- ============================================================

insert into notizie (slug, title, date, excerpt, content, published) values
(
  'adorazione-eucaristica-giugno-2025',
  'Adorazione Eucaristica — Primo Giovedì di Giugno',
  '2025-06-01',
  'Ci ritroviamo come ogni primo giovedì del mese per l''adorazione eucaristica. Un momento di preghiera e raccoglimento aperto a tutta la comunità.',
  E'## Appuntamento mensile\n\nCome ogni primo giovedì del mese, la Confraternita del SS.mo Sacramento si ritrova per l''adorazione eucaristica.\n\nL''adorazione è aperta a tutti i fedeli della parrocchia e si svolge nella chiesa di Monteprandone.\n\n### Orario\n\nL''adorazione inizia alle ore 21:00 e si conclude con la Benedizione Eucaristica.\n\n### Come partecipare\n\nTutti sono benvenuti. Non è richiesta nessuna iscrizione preventiva. Portate con voi il vostro cuore aperto e il desiderio di stare con il Signore.',
  true
),
(
  'incontro-diocesano-priori-2025',
  'Incontro Diocesano dei Priori — Primavera 2025',
  '2025-04-15',
  'Il Priore Tonino Sciarroni ha partecipato all''incontro diocesano dei priori, occasione di confronto e programmazione per le attività dell''anno.',
  E'## Incontro dei Priori della Diocesi\n\nSi è tenuto l''incontro stagionale dei priori delle confraternite della Diocesi di San Benedetto del Tronto – Ripatransone – Montalto Marche.\n\n### Temi affrontati\n\n- Programmazione delle attività comuni\n- Scambi culturali e religiosi tra le confraternite\n- Iniziative di carità a livello diocesano',
  true
),
(
  'benvenuto-sul-nostro-sito',
  'Benvenuti sul nostro sito!',
  '2025-01-10',
  'La Confraternita del SS.mo Sacramento di Monteprandone è ora online. Troverete qui notizie, eventi e informazioni sulla nostra comunità.',
  E'## Siamo online!\n\nBenvenuti sul sito della **Confraternita del SS.mo Sacramento di Monteprandone**.\n\n### Cosa troverete qui\n\n- **Notizie** sulle attività della confraternita\n- **Informazioni** sulla nostra storia e spiritualità\n- **Aggiornamenti** sugli eventi parrocchiali e diocesani\n\nSiamo qui dal **1836** e continuiamo a camminare insieme, nella fede e nella fratellanza.\n\n*Il Priore Tonino Sciarroni e tutti i confratelli e le consorelle*',
  true
)
on conflict (slug) do nothing;
