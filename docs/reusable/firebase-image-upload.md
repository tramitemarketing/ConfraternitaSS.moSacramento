# 📦 Pattern riutilizzabile — Upload immagini con Firebase Storage

Pulsante "Carica foto" in un pannello admin Next.js (App Router), con:

- **Upload sicuro server-side** — il file passa da una API route che verifica
  l'autenticazione e usa il **Firebase Admin SDK** (service account, mai
  esposto al browser).
- **Ridimensionamento automatico nel browser** prima dell'upload — le foto
  pesanti da smartphone diventano leggere (max 1600px, JPEG q.85).
- **URL pubblico stabile via download token** — nessuna configurazione di
  ACL/IAM del bucket (funziona anche con uniform bucket-level access).
- **Riuso dell'auth esistente** (cookie) — nessuna dipendenza da Firebase Auth.

> Copiato da: progetto Confraternita SS.mo Sacramento (luglio 2026).

---

## Prerequisiti

```bash
npm install firebase-admin
```

Variabili d'ambiente (service account, solo server-side):

```
FIREBASE_PROJECT_ID=il-tuo-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@il-tuo-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=il-tuo-project-id.appspot.com
```

Init lazy dell'Admin SDK (`src/lib/firebase.ts`):

```ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import type { Bucket } from "@google-cloud/storage";

export function getBucket(): Bucket {
  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  return getStorage(app).bucket(process.env.FIREBASE_STORAGE_BUCKET!);
}
```

---

## API route (`src/app/api/upload/route.ts`)

Il cuore: salva i byte nel bucket con un `firebaseStorageDownloadTokens` in
metadata, poi costruisce l'URL pubblico permanente.

```ts
import { randomUUID } from "crypto";
import { getBucket } from "@/lib/firebase";

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

const url =
  `https://firebasestorage.googleapis.com/v0/b/${bucket.name}` +
  `/o/${encodeURIComponent(filename)}?alt=media&token=${token}`;
```

L'autenticazione, il ridimensionamento client (`resizeImage`) e la utility
`uploadImage` restano identici alla versione Supabase: cambia solo il backend
di storage nell'API route.
