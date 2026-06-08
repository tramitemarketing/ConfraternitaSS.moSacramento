# 📦 Pattern riutilizzabile — Upload immagini con Supabase Storage

Pulsante "Carica foto" in un pannello admin Next.js (App Router), con:

- **Upload sicuro server-side** — il file passa da una API route che verifica
  l'autenticazione e usa la `service_role` key (mai esposta al browser).
- **Ridimensionamento automatico nel browser** prima dell'upload — le foto
  pesanti da smartphone diventano leggere (max 1600px, JPEG q.85).
- **Bucket creato automaticamente** alla prima immagine — zero configurazione
  manuale su Supabase.
- **Riuso dell'auth esistente** (cookie) — nessuna dipendenza da Supabase Auth.

> Copiato da: progetto Confraternita SS.mo Sacramento (giugno 2026).

---

## Prerequisiti

```bash
npm install @supabase/supabase-js
```

Variabili d'ambiente (le stesse del database, nessuna nuova):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # SEGRETO, solo server-side
```

Client Supabase server-side (`src/lib/supabase.ts`):

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
```

---

## 1) API route — `src/app/api/upload/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const BUCKET = "immagini";
const MAX_SIZE = 4 * 1024 * 1024; // margine sotto il limite ~4.5MB di Vercel
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp",
  "image/gif": "gif", "image/avif": "avif",
};

async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get("admin_session")?.value === "1"; // adatta al tuo schema auth
}

async function ensureBucket() {
  const { data } = await supabase.storage.getBucket(BUCKET);
  if (data) return;
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true, fileSizeLimit: MAX_SIZE,
    allowedMimeTypes: Object.keys(EXT_BY_TYPE),
  });
  if (error && !/exist/i.test(error.message)) throw new Error(error.message);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated()))
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const file = (await req.formData()).get("file");
  if (!(file instanceof File))
    return NextResponse.json({ error: "Nessun file ricevuto" }, { status: 400 });

  const ext = EXT_BY_TYPE[file.type];
  if (!ext)
    return NextResponse.json({ error: "Formato non supportato." }, { status: 400 });
  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: "Immagine troppo grande." }, { status: 400 });

  try {
    await ensureBucket();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, await file.arrayBuffer(), { contentType: file.type });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return NextResponse.json({ url: data.publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

---

## 2) Helper client — `src/lib/imageUpload.ts`

```ts
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 0.85;

export async function resizeImage(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file; // preserva animazione
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); } catch { return file; }
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();
  return new Promise((res) => canvas.toBlob((b) => res(b ?? file), "image/jpeg", JPEG_QUALITY));
}

export async function uploadImage(file: File): Promise<string> {
  const blob = await resizeImage(file);
  const ext = blob.type === "image/gif" ? "gif" : "jpg";
  const fd = new FormData();
  fd.append("file", blob, `foto.${ext}`);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Errore durante il caricamento.");
  return data.url as string;
}
```

---

## 3) Uso nel componente admin (client)

```tsx
const fileInputRef = useRef<HTMLInputElement>(null);
const [uploading, setUploading] = useState(false);

async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;
  setUploading(true);
  try {
    const url = await uploadImage(file);
    setForm((f) => ({ ...f, coverImage: url }));
  } catch (err) {
    alert(err instanceof Error ? err.message : "Errore");
  } finally {
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
}

// JSX:
<input ref={fileInputRef} type="file" accept="image/*"
       onChange={handleFileSelected} className="hidden" />
<button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
  {uploading ? "Caricamento…" : "Carica foto"}
</button>
```

---

## Note e accorgimenti

- **Runtime Node** (default per le route handler): necessario perché si usa la
  service key. Non aggiungere `export const runtime = "edge"`.
- **Limite body Vercel ~4.5MB**: il ridimensionamento client tiene le immagini
  ben sotto soglia; il limite server (`MAX_SIZE`) è una rete di sicurezza.
- **`<img>` semplice**: l'URL pubblico Supabase
  (`/storage/v1/object/public/<bucket>/...`) funziona ovunque senza configurare
  `remotePatterns`. Con `next/image` aggiungere invece il dominio Supabase a
  `images.remotePatterns` in `next.config`.
- **Pulizia file orfani** (opzionale): se vuoi cancellare le immagini quando un
  articolo viene eliminato, chiama `supabase.storage.from(BUCKET).remove([path])`
  estraendo il path dall'URL pubblico.
- **Sicurezza**: l'upload è protetto dallo stesso cookie dell'admin; il bucket è
  pubblico in lettura ma scrivibile solo via service key lato server.
```
