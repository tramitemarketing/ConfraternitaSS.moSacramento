import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, createArticle, Article } from "@/lib/posts";
import { cookies } from "next/headers";

async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get("admin_session")?.value === "1";
}

export async function GET() {
  const articles = await getAllArticles();
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const body = await req.json();
  const { title, excerpt, content, date, published, slug, coverImage } = body;

  if (!title || !content || !slug) {
    return NextResponse.json(
      { error: "Campi obbligatori mancanti" },
      { status: 400 }
    );
  }

  try {
    const newArticle: Article = {
      slug,
      title,
      excerpt: excerpt ?? "",
      content,
      date: date ?? new Date().toISOString().split("T")[0],
      published: published ?? false,
      coverImage: coverImage || undefined,
    };

    const created = await createArticle(newArticle);
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    // Supabase restituisce un codice 23505 per violazione unique constraint
    if (message.includes("23505") || message.includes("unique")) {
      return NextResponse.json({ error: "Slug già esistente" }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
