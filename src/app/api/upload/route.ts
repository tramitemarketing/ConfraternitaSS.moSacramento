import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { getBucket } from "@/lib/firebase";

// Cartella dentro il bucket Storage dove finiscono le immagini caricate.
const FOLDER = "immagini";
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
    const filename = `${FOLDER}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    // Token di download permanente: permette un URL pubblico stabile senza
    // dover configurare ACL/IAM del bucket (uniform bucket-level access ok).
    const token = randomUUID();

    const bucket = getBucket();
    await bucket.file(filename).save(bytes, {
      contentType: file.type,
      resumable: false,
      metadata: {
        cacheControl: "public, max-age=31536000, immutable",
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });

    const url = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURIComponent(filename)}?alt=media&token=${token}`;

    return NextResponse.json({ url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
