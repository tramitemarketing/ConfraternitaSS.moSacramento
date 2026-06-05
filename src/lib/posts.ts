import fs from "fs";
import path from "path";

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published: boolean;
  coverImage?: string;
}

const filePath = path.join(process.cwd(), "content", "notizie.json");

export function getAllArticles(): Article[] {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const articles: Article[] = JSON.parse(raw);
    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((a) => a.published);
}

export function getArticleBySlug(slug: string): Article | null {
  return getAllArticles().find((a) => a.slug === slug) ?? null;
}

export function saveArticles(articles: Article[]): void {
  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf-8");
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
