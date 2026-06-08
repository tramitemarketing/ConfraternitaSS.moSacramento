import { supabase } from "./supabase";

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published: boolean;
  coverImage?: string;
}

// Mappa le colonne snake_case del DB ai campi camelCase dell'interfaccia
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Article {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    published: row.published,
    coverImage: row.cover_image ?? undefined,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("notizie")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("[posts] getAllArticles:", error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("notizie")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });

  if (error) {
    console.error("[posts] getPublishedArticles:", error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("notizie")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function createArticle(article: Article): Promise<Article> {
  const { data, error } = await supabase
    .from("notizie")
    .insert({
      slug: article.slug,
      title: article.title,
      date: article.date,
      excerpt: article.excerpt,
      content: article.content,
      published: article.published,
      cover_image: article.coverImage || null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data);
}

export async function updateArticle(
  slug: string,
  updates: Partial<Article>
): Promise<Article> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbUpdates: Record<string, any> = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.date !== undefined) dbUpdates.date = updates.date;
  if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt;
  if (updates.content !== undefined) dbUpdates.content = updates.content;
  if (updates.published !== undefined) dbUpdates.published = updates.published;
  if (updates.coverImage !== undefined)
    dbUpdates.cover_image = updates.coverImage || null;

  const { data, error } = await supabase
    .from("notizie")
    .update(dbUpdates)
    .eq("slug", slug)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data);
}

export async function deleteArticle(slug: string): Promise<void> {
  const { error } = await supabase.from("notizie").delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
