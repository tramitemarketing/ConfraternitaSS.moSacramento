import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

// Bucket pubblico dove vengono salvate le immagini caricate dall'admin.
const BUCKET = "immagini";
// Limite lato server (le immagini sono già ridimensionate dal browser,
// ma teniamo un margine sotto il limite di Vercel ~4.5MB).
const MAX_SIZE = 4 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get("admin_session")?.value === "1";
}

// Crea il bucket pubblico la prima volta; idempotente.
async function ensureBucket() {
  const { data } = await supabase.storage.getBucket(BUCKET);
  if (data) return;
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_SIZE,
    allowedMimeTypes: Object.keys(EXT_BY_TYPE),
  });
  // Ignora l'errore se il bucket esiste già (es. richieste in parallelo)
  if (error && !/exist/i.test(error.message)) {
    throw new Error(error.message);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "Nessun file ricevuto" },
      { status: 400 }
    );
  }

  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Formato non supportato. Usa JPG, PNG, WEBP, GIF o AVIF." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Immagine troppo grande. Riprova con una foto più piccola." },
      { status: 400 }
    );
  }

  try {
    await ensureBucket();

    const filename = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
    return NextResponse.json({ url: data.publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
