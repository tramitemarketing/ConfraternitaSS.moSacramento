# 📦 Pattern riutilizzabile — Upload immagini con Cloudinary

Pulsante "Carica foto" in un pannello admin Next.js (App Router), con:

- **Upload sicuro server-side** — il file passa da una API route che verifica
  l'autenticazione e usa le credenziali Cloudinary (mai esposte al browser).
- **Ridimensionamento automatico nel browser** prima dell'upload — le foto
  pesanti da smartphone diventano leggere (max 1600px, JPEG q.85).
- **Consegna ottimizzata** — l'URL salvato contiene `f_auto,q_auto`: Cloudinary
  serve automaticamente webp/avif alla qualità migliore → LCP più basso.
- **Nessuna carta di credito** — il piano gratuito Cloudinary è sufficiente per
  un sito vetrina.
- **Riuso dell'auth esistente** (cookie) — nessuna dipendenza da servizi terzi
  per il login.

> Copiato da: progetto Confraternita SS.mo Sacramento (luglio 2026).

---

## Prerequisiti

```bash
npm install cloudinary
```

Variabili d'ambiente (solo server-side, da Cloudinary Dashboard):

```
CLOUDINARY_CLOUD_NAME=il-tuo-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=il-tuo-api-secret
```

---

## API route (`src/app/api/upload/route.ts`)

Il cuore: configura Cloudinary a runtime, carica il buffer via `upload_stream`,
poi inserisce `f_auto,q_auto` nell'URL di delivery.

```ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const buffer = Buffer.from(await file.arrayBuffer());
const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: "confraternita", resource_type: "image" },
    (err, res) => (err || !res ? reject(err) : resolve(res))
  );
  stream.end(buffer);
});

const url = result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/");
```

L'autenticazione, il ridimensionamento client (`resizeImage`) e la utility
`uploadImage` restano invariati: cambia solo il backend di storage nell'API
route.
