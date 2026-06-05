import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, saveArticles, Article } from "@/lib/posts";
import { cookies } from "next/headers";

async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get("admin_session")?.value === "1";
}

export async function GET() {
  return NextResponse.json(getAllArticles());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await req.json();
  const { title, excerpt, content, date, published, slug } = body;

  if (!title || !content || !slug) {
    return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 });
  }

  const articles = getAllArticles();
  if (articles.find((a) => a.slug === slug)) {
    return NextResponse.json({ error: "Slug già esistente" }, { status: 409 });
  }

  const newArticle: Article = {
    slug,
    title,
    excerpt: excerpt ?? "",
    content,
    date: date ?? new Date().toISOString().split("T")[0],
    published: published ?? false,
  };

  saveArticles([newArticle, ...articles]);
  return NextResponse.json(newArticle, { status: 201 });
}
