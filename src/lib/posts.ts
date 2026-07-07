import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "./firebase";

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published: boolean;
  coverImage?: string;
}

const COLLECTION = "notizie";

// Il doc ID su Firestore è lo slug: unicità naturale + lookup O(1).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDoc(id: string, data: any): Article {
  return {
    slug: id,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    published: data.published ?? false,
    coverImage: data.coverImage ?? undefined,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const snap = await getDb()
      .collection(COLLECTION)
      .orderBy("date", "desc")
      .get();
    return snap.docs.map((d) => mapDoc(d.id, d.data()));
  } catch (err) {
    console.error("[posts] getAllArticles:", (err as Error).message);
    return [];
  }
}

export async function getPublishedArticles(): Promise<Article[]> {
  try {
    // Filtro su singolo campo + ordinamento in memoria: evita di dover creare
    // un indice composto su Firestore. Adeguato al volume di un blog.
    const snap = await getDb()
      .collection(COLLECTION)
      .where("published", "==", true)
      .get();
    return snap.docs
      .map((d) => mapDoc(d.id, d.data()))
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  } catch (err) {
    console.error("[posts] getPublishedArticles:", (err as Error).message);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const doc = await getDb().collection(COLLECTION).doc(slug).get();
    if (!doc.exists) return null;
    return mapDoc(doc.id, doc.data());
  } catch (err) {
    console.error("[posts] getArticleBySlug:", (err as Error).message);
    return null;
  }
}

export async function createArticle(article: Article): Promise<Article> {
  const ref = getDb().collection(COLLECTION).doc(article.slug);
  // .create() fallisce se il documento esiste già (slug duplicato).
  await ref.create({
    title: article.title,
    date: article.date,
    excerpt: article.excerpt,
    content: article.content,
    published: article.published,
    coverImage: article.coverImage ?? null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return { ...article, coverImage: article.coverImage || undefined };
}

export async function updateArticle(
  slug: string,
  updates: Partial<Article>
): Promise<Article> {
  const ref = getDb().collection(COLLECTION).doc(slug);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbUpdates: Record<string, any> = { updatedAt: FieldValue.serverTimestamp() };
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.date !== undefined) dbUpdates.date = updates.date;
  if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt;
  if (updates.content !== undefined) dbUpdates.content = updates.content;
  if (updates.published !== undefined) dbUpdates.published = updates.published;
  if (updates.coverImage !== undefined)
    dbUpdates.coverImage = updates.coverImage || null;

  // update() lancia se il documento non esiste ("No document to update").
  await ref.update(dbUpdates);

  const doc = await ref.get();
  return mapDoc(doc.id, doc.data());
}

export async function deleteArticle(slug: string): Promise<void> {
  await getDb().collection(COLLECTION).doc(slug).delete();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
