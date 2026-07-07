import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

// Cartella dentro Cloudinary dove finiscono le immagini caricate dall'admin.
const FOLDER = "confraternita";
// Limite lato server (le immagini sono già ridimensionate dal browser,
// ma teniamo un margine sotto il limite di Vercel ~4.5MB).
const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get("admin_session")?.value === "1";
}

// Configura Cloudinary a runtime (le env var non servono in fase di build).
function configureCloudinary() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Variabili d'ambiente Cloudinary mancanti: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET"
    );
  }
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Nessun file ricevuto" }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
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
    configureCloudinary();
    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: FOLDER, resource_type: "image" },
          (error, res) => {
            if (error || !res) return reject(error ?? new Error("Upload fallito"));
            resolve(res as { secure_url: string });
          }
        );
        stream.end(buffer);
      }
    );

    // Inserisce f_auto,q_auto nell'URL di delivery: Cloudinary serve la foto
    // nel formato migliore (webp/avif) e con qualità ottimizzata → LCP più basso.
    const url = result.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_auto/"
    );

    return NextResponse.json({ url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
