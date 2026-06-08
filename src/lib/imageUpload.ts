// Utility lato client per caricare un'immagine all'endpoint /api/upload.
// Ridimensiona e comprime l'immagine nel browser PRIMA dell'upload, così
// anche le foto pesanti da smartphone diventano leggere e veloci da caricare.

const MAX_WIDTH = 1600; // larghezza massima in px
const JPEG_QUALITY = 0.85;

/**
 * Ridimensiona un'immagine mantenendo le proporzioni e la comprime in JPEG.
 * I GIF vengono lasciati intatti per preservarne l'animazione.
 */
export async function resizeImage(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file; // fallback: carica l'originale se il browser non collabora
  }

  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  return new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob ?? file),
      "image/jpeg",
      JPEG_QUALITY
    );
  });
}

/**
 * Ridimensiona e carica un file immagine. Ritorna l'URL pubblico salvato.
 * Lancia un Error con messaggio leggibile in caso di problemi.
 */
export async function uploadImage(file: File): Promise<string> {
  const blob = await resizeImage(file);
  const ext = blob.type === "image/gif" ? "gif" : "jpg";

  const formData = new FormData();
  formData.append("file", blob, `foto.${ext}`);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Errore durante il caricamento.");
  }
  return data.url as string;
}
