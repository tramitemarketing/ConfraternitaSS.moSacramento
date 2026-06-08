"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/lib/posts";
import { uploadImage } from "@/lib/imageUpload";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

const TOOLBAR_ACTIONS = [
  { label: "Grassetto", icon: "B", title: "Testo in grassetto", before: "**", after: "**" },
  { label: "Corsivo", icon: "I", title: "Testo in corsivo", before: "_", after: "_" },
  { label: "Titolo", icon: "H", title: "Titolo di sezione", before: "\n## ", after: "\n" },
  { label: "Sottotitolo", icon: "h", title: "Sottotitolo", before: "\n### ", after: "\n" },
  { label: "Elenco", icon: "•", title: "Punto elenco", before: "\n- ", after: "" },
];

const emptyForm = {
  title: "",
  slug: "",
  date: new Date().toISOString().split("T")[0],
  excerpt: "",
  content: "",
  coverImage: "",
  published: false,
};

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState(emptyForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadArticles = useCallback(async () => {
    const res = await fetch("/api/notizie");
    if (res.ok) setArticles(await res.json());
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/notizie")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (active) setArticles(data);
      });
    return () => {
      active = false;
    };
  }, []);

  function openNew() {
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] });
    setEditing(null);
    setView("new");
    setPreview(false);
    setImgError(false);
    setMsg("");
  }

  function openEdit(a: Article) {
    setForm({
      title: a.title,
      slug: a.slug,
      date: a.date,
      excerpt: a.excerpt,
      content: a.content,
      coverImage: a.coverImage ?? "",
      published: a.published,
    });
    setEditing(a);
    setView("edit");
    setPreview(false);
    setImgError(false);
    setMsg("");
  }

  function handleTitleChange(val: string) {
    setForm((f) => ({
      ...f,
      title: val,
      slug: editing ? f.slug : slugify(val),
    }));
  }

  function insertFormatting(before: string, after: string) {
    const ta = document.getElementById("content-area") as HTMLTextAreaElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = form.content.substring(start, end);
    const newContent =
      form.content.substring(0, start) +
      before +
      selected +
      after +
      form.content.substring(end);
    setForm((f) => ({ ...f, content: newContent }));
    setTimeout(() => {
      ta.focus();
      ta.selectionStart = start + before.length;
      ta.selectionEnd = start + before.length + selected.length;
    }, 0);
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setImgError(false);
    setMsg("");
    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Errore durante il caricamento.";
      setMsg(`❌ ${message}`);
    } finally {
      setUploading(false);
      // permette di ri-selezionare lo stesso file
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSave() {
    if (!form.title || !form.content || !form.slug) {
      setMsg("⚠️ Compila almeno il titolo e il testo dell'articolo.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSaving(true);
    setMsg("");

    const method = view === "edit" ? "PUT" : "POST";
    const url = view === "edit" ? `/api/notizie/${editing!.slug}` : "/api/notizie";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMsg("✅ Articolo salvato con successo!");
      await loadArticles();
      setTimeout(() => setView("list"), 1200);
    } else {
      const err = await res.json();
      setMsg(`❌ Errore: ${err.error}`);
    }
    setSaving(false);
  }

  async function handleDelete(slug: string) {
    if (!confirm("Sei sicuro di voler eliminare definitivamente questo articolo?"))
      return;
    const res = await fetch(`/api/notizie/${slug}`, { method: "DELETE" });
    if (res.ok) {
      setMsg("Articolo eliminato.");
      loadArticles();
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  // ============ LISTA ARTICOLI ============
  if (view === "list") {
    return (
      <div className="min-h-screen bg-nero pt-16">
        <div className="bg-nero-soft text-bianco-soft px-6 py-4 flex justify-between items-center sticky top-16 z-10">
          <div className="flex items-center gap-2">
            <span className="text-oro text-xl">✚</span>
            <span className="font-semibold">Pannello Gestione Notizie</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-bianco-soft/30 opacity-70 hover:opacity-100 text-sm rounded-lg transition-opacity"
          >
            Esci
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          {msg && (
            <p className="mb-6 p-4 bg-oro/15 text-bianco-soft rounded-lg font-medium">
              {msg}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl text-bianco">I tuoi articoli</h1>
              <p className="text-bianco-soft/70 text-sm mt-1">
                Qui puoi creare, modificare e pubblicare le notizie del sito.
              </p>
            </div>
            <button
              onClick={openNew}
              className="px-5 py-3 bg-oro text-nero font-semibold rounded-xl hover:bg-oro-chiaro transition-colors shadow-md whitespace-nowrap"
            >
              + Scrivi nuovo articolo
            </button>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20 text-bianco-soft/60 bg-nero-soft rounded-2xl border border-nero-bordo">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-lg">Non hai ancora scritto nessun articolo.</p>
              <button
                onClick={openNew}
                className="mt-5 px-5 py-2.5 bg-oro text-nero rounded-lg hover:bg-oro-chiaro transition-colors"
              >
                Inizia ora →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((a) => (
                <div
                  key={a.slug}
                  className="bg-nero-soft rounded-2xl p-5 border border-nero-bordo flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  {/* Mini cover */}
                  <div className="w-full sm:w-24 h-24 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-nero-bordo">
                    {a.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-bianco-soft/40 text-2xl">
                        ✚
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-bianco font-medium">{a.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          a.published
                            ? "bg-oro text-nero"
                            : "border border-grigio/60 text-grigio"
                        }`}
                      >
                        {a.published ? "● Pubblicato" : "○ Bozza"}
                      </span>
                    </div>
                    <p className="text-sm text-bianco-soft/70">
                      {new Date(a.date).toLocaleDateString("it-IT")} —{" "}
                      {a.excerpt.slice(0, 70)}…
                    </p>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(a)}
                      className="px-4 py-2 text-sm bg-nero-bordo text-bianco rounded-lg hover:bg-oro hover:text-nero transition-colors font-medium"
                    >
                      Modifica
                    </button>
                    <button
                      onClick={() => handleDelete(a.slug)}
                      className="px-4 py-2 text-sm border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                      Elimina
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============ FORM (nuovo / modifica) ============
  const showImgPreview = form.coverImage.trim() !== "" && !imgError;

  return (
    <div className="min-h-screen bg-nero pb-20 pt-16">
      <div className="bg-nero-soft text-bianco-soft px-6 py-4 flex justify-between items-center sticky top-16 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("list")}
            className="text-bianco-soft/70 hover:text-bianco-soft transition-colors"
          >
            ← Torna agli articoli
          </button>
          <span className="opacity-30">|</span>
          <span className="font-semibold text-sm">
            {view === "new" ? "Nuovo articolo" : "Modifica articolo"}
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-oro text-nero text-sm rounded-lg hover:bg-oro-chiaro disabled:opacity-50 transition-colors font-semibold"
        >
          {saving ? "Salvataggio..." : "💾 Salva"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {msg && (
          <p
            className={`p-4 rounded-xl text-sm font-medium ${
              msg.startsWith("✅")
                ? "bg-oro/15 text-bianco-soft"
                : "bg-red-500/10 text-red-300"
            }`}
          >
            {msg}
          </p>
        )}

        {/* PASSO 1 — Titolo */}
        <Step n={1} titolo="Titolo dell'articolo" obbligatorio>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-nero-bordo bg-nero-soft focus:outline-none focus:border-oro text-bianco text-lg"
            placeholder="Es. Adorazione Eucaristica di Giugno"
          />
        </Step>

        {/* PASSO 2 — Immagine di copertina */}
        <Step
          n={2}
          titolo="Immagine di copertina"
          aiuto="Carica una foto dal tuo computer o telefono. Verrà ottimizzata e salvata automaticamente. Lascia vuoto per usare una grafica predefinita."
        >
          {/* input file nascosto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            onChange={handleFileSelected}
            className="hidden"
          />

          {/* pulsante carica */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-5 py-3 bg-oro text-nero font-semibold rounded-xl hover:bg-oro-chiaro disabled:opacity-50 transition-colors shadow-md"
          >
            {uploading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-nero/40 border-t-nero rounded-full animate-spin" />
                Caricamento…
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                  <path d="M12 16 L12 4 M12 4 L8 8 M12 4 L16 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 16 L4 19 C4 19.5 4.5 20 5 20 L19 20 C19.5 20 20 19.5 20 19 L20 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                {form.coverImage ? "Cambia foto" : "Carica foto"}
              </>
            )}
          </button>

          {/* anteprima */}
          {form.coverImage.trim() !== "" && (
            <div className="mt-4">
              {showImgPreview ? (
                <div className="relative rounded-xl overflow-hidden border border-nero-bordo aspect-[16/9] max-w-md group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.coverImage}
                    alt="Anteprima copertina"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImgError(false);
                      setForm((f) => ({ ...f, coverImage: "" }));
                    }}
                    className="absolute top-2 right-2 bg-nero/70 text-bianco text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-nero"
                  >
                    Rimuovi
                  </button>
                </div>
              ) : (
                <p className="text-sm text-red-300">
                  ⚠️ Impossibile mostrare questa immagine. Prova a caricarla di
                  nuovo.
                </p>
              )}
            </div>
          )}

          {/* campo URL avanzato (facoltativo) */}
          <details className="mt-4">
            <summary className="text-xs text-bianco-soft/60 cursor-pointer hover:text-bianco-soft">
              Oppure incolla un link a un&apos;immagine già online
            </summary>
            <input
              type="url"
              value={form.coverImage}
              onChange={(e) => {
                setImgError(false);
                setForm((f) => ({ ...f, coverImage: e.target.value }));
              }}
              className="w-full mt-2 px-4 py-2.5 rounded-xl border border-nero-bordo bg-nero-soft focus:outline-none focus:border-oro text-bianco text-sm"
              placeholder="https://esempio.com/foto.jpg"
            />
          </details>
        </Step>

        {/* PASSO 3 — Introduzione */}
        <Step
          n={3}
          titolo="Breve introduzione"
          aiuto="Una o due frasi che riassumono l'articolo. Appariranno nell'anteprima in homepage e nella lista notizie."
        >
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-nero-bordo bg-nero-soft focus:outline-none focus:border-oro text-bianco text-sm resize-none"
            placeholder="Ci ritroviamo come ogni primo giovedì del mese per l'adorazione..."
          />
        </Step>

        {/* PASSO 4 — Testo */}
        <Step n={4} titolo="Testo dell'articolo" obbligatorio>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-bianco-soft/70">
              {preview ? "Stai vedendo l'anteprima" : "Scrivi il contenuto qui sotto"}
            </span>
            <button
              onClick={() => setPreview(!preview)}
              className="text-xs text-oro font-semibold hover:underline"
            >
              {preview ? "✏️ Torna a scrivere" : "👁 Vedi anteprima"}
            </button>
          </div>

          {!preview ? (
            <>
              <div className="flex gap-2 mb-2 flex-wrap items-center bg-nero-bordo/50 p-2 rounded-lg">
                {TOOLBAR_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    title={action.title}
                    onMouseDown={(e) => {
                      e.preventDefault(); // keep textarea focused so selectionStart/End are preserved
                      insertFormatting(action.before, action.after);
                    }}
                    className="px-3 py-1.5 bg-nero-soft text-bianco text-xs font-semibold rounded hover:bg-oro hover:text-nero transition-colors flex items-center gap-1.5"
                  >
                    <span className="font-bold w-3 inline-block text-center">
                      {action.icon}
                    </span>
                    {action.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-bianco-soft/60 mb-2">
                💡 Seleziona una parola e clicca un pulsante per formattarla.
              </p>
              <textarea
                id="content-area"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                rows={16}
                className="w-full px-4 py-3 rounded-xl border border-nero-bordo bg-nero-soft focus:outline-none focus:border-oro text-bianco text-sm leading-relaxed resize-y"
                placeholder="Scrivi qui il testo completo dell'articolo..."
              />
            </>
          ) : (
            <div
              className="prose prose-sm max-w-none bg-nero-soft rounded-xl border border-nero-bordo p-6 min-h-64"
              dangerouslySetInnerHTML={{
                __html: renderSimpleMarkdown(form.content),
              }}
            />
          )}
        </Step>

        {/* PASSO 5 — Dettagli e pubblicazione */}
        <Step n={5} titolo="Pubblicazione">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs text-bianco-soft/70 mb-2">
                Data dell&apos;articolo
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-nero-bordo bg-nero-soft focus:outline-none focus:border-oro text-bianco text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-bianco-soft/70 mb-2">
                Indirizzo web (generato dal titolo)
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-nero-bordo bg-nero/40 focus:outline-none focus:border-oro text-bianco-soft/70 text-sm font-mono"
                placeholder="titolo-articolo"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 bg-nero-bordo/40 rounded-xl p-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) =>
                  setForm((f) => ({ ...f, published: e.target.checked }))
                }
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-nero-bordo rounded-full peer peer-checked:bg-oro transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6" />
            </label>
            <div>
              <span className="text-sm text-bianco font-medium block">
                {form.published ? "Pubblicato (visibile a tutti)" : "Bozza (nascosto)"}
              </span>
              <span className="text-xs text-bianco-soft/70">
                {form.published
                  ? "L'articolo apparirà subito sul sito."
                  : "Attiva l'interruttore quando vuoi renderlo pubblico."}
              </span>
            </div>
          </div>
        </Step>

      </div>
    </div>
  );
}

/* Componente "passo" numerato per guidare l'utente */
function Step({
  n,
  titolo,
  aiuto,
  obbligatorio,
  children,
}: {
  n: number;
  titolo: string;
  aiuto?: string;
  obbligatorio?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-nero-soft rounded-2xl border border-nero-bordo p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="shrink-0 w-7 h-7 rounded-full bg-oro text-nero flex items-center justify-center text-sm font-bold">
          {n}
        </span>
        <div>
          <h2 className="text-bianco font-semibold">
            {titolo}{" "}
            {obbligatorio && (
              <span className="text-oro text-sm">(obbligatorio)</span>
            )}
          </h2>
          {aiuto && (
            <p className="text-xs text-bianco-soft/70 mt-1 leading-relaxed">
              {aiuto}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

function renderSimpleMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(?!<[hul])(.+)$/gm, "<p>$1</p>");
}
