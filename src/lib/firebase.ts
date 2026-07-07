import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import type { Bucket } from "@google-cloud/storage";

// Inizializzazione LAZY di Firebase Admin: l'app viene creata solo alla prima
// chiamata a runtime, così `next build` non richiede le credenziali.
// Le credenziali provengono da un service account (mai esposte al browser).

let app: App | undefined;

function getFirebaseApp(): App {
  if (app) return app;

  const existing = getApps();
  if (existing.length > 0) {
    app = existing[0];
    return app;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // La private key nelle env var ha i "\n" letterali: vanno riconvertiti.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Variabili d'ambiente Firebase mancanti: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY"
    );
  }

  app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });
  return app;
}

// Firestore — database degli articoli (collezione "notizie").
export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

// Storage bucket — immagini di copertina degli articoli.
export function getBucket(): Bucket {
  const bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucketName) {
    throw new Error("Variabile d'ambiente mancante: FIREBASE_STORAGE_BUCKET");
  }
  return getStorage(getFirebaseApp()).bucket(bucketName);
}
