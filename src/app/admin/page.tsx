"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Article } from "@/lib/posts";

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
  { label: "G", title: "Grassetto", before: "**", after: "**" },
  { label: "I", title: "Corsivo", before: "_", after: "_" },
  { label: "H2", title: "Titolo", before: "\n## ", after: "\n" },
  { label: "H3", title: "Sottotitolo", before: "\n### ", after: "\n" },
  { label: "•", title: "Elenco", before: "\n- ", after: "" },
];

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [view, setView] = useState<"list" | "new" | "edit">("list");
  const [editing, setEditing] = useState<Article | null>(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    published: false,
  });

  const loadArticles = useCallback(async () => {
    const res = await fetch("/api/notizie");
    if (res.ok) setArticles(await res.json());
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  function openNew() {
    setForm({
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
      published: false,
    });
    setEditing(null);
    setView("new");
    setMsg("");
  }

  function openEdit(a: Article) {
    setForm({
      title: a.title,
      slug: a.slug,
      date: a.date,
      excerpt: a.excerpt,
      content: a.content,
      published: a.published,
    });
    setEditing(a);
    setView("edit");
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

  async function handleSave() {
    if (!form.title || !form.content || !form.slug) {
      setMsg("⚠️ Titolo, slug e contenuto sono obbligatori.");
      return;
    }
    setSaving(true);
    setMsg("");

    const method = view === "edit" ? "PUT" : "POST";
    const url =
      view === "edit"
        ? `/api/notizie/${editing!.slug}`
        : "/api/notizie";

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
    if (!confirm("Sei sicuro di voler eliminare questo articolo?")) return;
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

  // Render article list
  if (view === "list") {
    return (
      <div className="min-h-screen bg-crema">
        <div className="bg-marrone text-crema px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-oro text-xl">✝</span>
            <span className="font-semibold">Pannello Admin</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={openNew}
              className="px-4 py-2 bg-primario text-crema text-sm rounded-lg hover:bg-primario-scuro transition-colors"
            >
              + Nuovo articolo
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-crema opacity-60 hover:opacity-100 text-sm rounded-lg transition-opacity"
            >
              Esci
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          {msg && <p className="mb-6 text-primario font-medium">{msg}</p>}
          <h1 className="text-3xl text-marrone mb-8">Articoli</h1>

          {articles.length === 0 ? (
            <div className="text-center py-20 text-marrone-medio opacity-50">
              <div className="text-5xl mb-4">📝</div>
              <p>Nessun articolo. Creane uno nuovo!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((a) => (
                <div
                  key={a.slug}
                  className="bg-white rounded-xl p-6 border border-crema-scuro flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-marrone font-medium truncate">{a.title}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          a.published
                            ? "bg-oliva-chiaro text-marrone"
                            : "bg-crema-scuro text-marrone-medio"
                        }`}
                      >
                        {a.published ? "Pubblicato" : "Bozza"}
                      </span>
                    </div>
                    <p className="text-sm text-marrone-medio opacity-70">
                      {new Date(a.date).toLocaleDateString("it-IT")} — {a.excerpt.slice(0, 80)}…
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(a)}
                      className="px-4 py-2 text-sm bg-crema-scuro text-marrone rounded-lg hover:bg-primario-chiaro hover:text-crema transition-colors"
                    >
                      Modifica
                    </button>
                    <button
                      onClick={() => handleDelete(a.slug)}
                      className="px-4 py-2 text-sm border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
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

  // Render form (new / edit)
  return (
    <div className="min-h-screen bg-crema">
      <div className="bg-marrone text-crema px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("list")}
            className="text-crema opacity-60 hover:opacity-100 transition-opacity"
          >
            ← Articoli
          </button>
          <span className="opacity-30">|</span>
          <span className="font-semibold text-sm">
            {view === "new" ? "Nuovo articolo" : "Modifica articolo"}
          </span>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-primario text-crema text-sm rounded-lg hover:bg-primario-scuro disabled:opacity-50 transition-colors font-semibold"
        >
          {saving ? "Salvataggio..." : "Salva"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {msg && (
          <p
            className={`p-4 rounded-lg text-sm font-medium ${
              msg.startsWith("✅")
                ? "bg-oliva-chiaro text-marrone"
                : "bg-red-50 text-red-700"
            }`}
          >
            {msg}
          </p>
        )}

        {/* Title */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-marrone-medio mb-2">
            Titolo *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-crema-scuro bg-white focus:outline-none focus:border-primario text-marrone text-lg"
            placeholder="Titolo dell'articolo..."
          />
        </div>

        {/* Slug + Date row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-marrone-medio mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-crema-scuro bg-white focus:outline-none focus:border-primario text-marrone text-sm font-mono"
              placeholder="titolo-dell-articolo"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-marrone-medio mb-2">
              Data
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-crema-scuro bg-white focus:outline-none focus:border-primario text-marrone text-sm"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-marrone-medio mb-2">
            Breve introduzione
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border border-crema-scuro bg-white focus:outline-none focus:border-primario text-marrone text-sm resize-none"
            placeholder="Una o due frasi che introducono l'articolo..."
          />
        </div>

        {/* Content editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-wider text-marrone-medio">
              Testo dell&apos;articolo *
            </label>
            <button
              onClick={() => setPreview(!preview)}
              className="text-xs text-primario font-semibold hover:underline"
            >
              {preview ? "← Torna a scrivere" : "Anteprima →"}
            </button>
          </div>

          {!preview ? (
            <>
              {/* Toolbar */}
              <div className="flex gap-2 mb-2 flex-wrap">
                {TOOLBAR_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    title={action.title}
                    onClick={() => insertFormatting(action.before, action.after)}
                    className="px-3 py-1.5 bg-crema-scuro text-marrone text-xs font-bold rounded hover:bg-primario-chiaro hover:text-crema transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
                <span className="text-xs text-marrone-medio opacity-50 self-center ml-2">
                  Seleziona testo e clicca un pulsante
                </span>
              </div>
              <textarea
                id="content-area"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={18}
                className="w-full px-4 py-3 rounded-lg border border-crema-scuro bg-white focus:outline-none focus:border-primario text-marrone text-sm font-mono leading-relaxed resize-y"
                placeholder="Scrivi il contenuto dell'articolo qui..."
              />
            </>
          ) : (
            <div
              className="prose prose-sm max-w-none bg-white rounded-lg border border-crema-scuro p-6 min-h-64"
              dangerouslySetInnerHTML={{
                __html: renderSimpleMarkdown(form.content),
              }}
            />
          )}
        </div>

        {/* Published toggle */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm((f) => ({ ...f, published: e.target.checked }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-crema-scuro rounded-full peer peer-checked:bg-primario transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
          </label>
          <span className="text-sm text-marrone-medio">
            {form.published ? (
              <strong className="text-oliva">Pubblicato</strong>
            ) : (
              "Bozza (non visibile sul sito)"
            )}
          </span>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-primario text-crema font-semibold rounded-lg hover:bg-primario-scuro disabled:opacity-50 transition-colors"
          >
            {saving ? "Salvataggio..." : "Salva articolo"}
          </button>
        </div>
      </div>
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
