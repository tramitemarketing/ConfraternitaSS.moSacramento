import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Inizializzazione LAZY di Firebase Admin: l'app viene creata solo alla prima
// chiamata a runtime, così `next build` non richiede le credenziali.
// Le credenziali provengono da un service account (mai esposte al browser).
// Firestore ospita gli articoli; le immagini sono su Cloudinary (vedi
// app/api/upload/route.ts).

let app: App | undefined;

// Normalizza la private key presa dalle env var, tollerando i due errori più
// comuni quando la si incolla su Vercel:
//  1) virgolette di wrapping (" o ') incollate insieme al valore;
//  2) a-capo scritti come "\n" letterali invece che reali.
function normalizePrivateKey(raw?: string): string | undefined {
  if (!raw) return raw;
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  // Converte i \n letterali in a-capo reali (se sono già reali, non fa nulla).
  return key.replace(/\\n/g, "\n");
}

function getFirebaseApp(): App {
  if (app) return app;

  const existing = getApps();
  if (existing.length > 0) {
    app = existing[0];
    return app;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Variabili d'ambiente Firebase mancanti: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY"
    );
  }

  app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
  return app;
}

// Firestore — database degli articoli (collezione "notizie").
export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}
