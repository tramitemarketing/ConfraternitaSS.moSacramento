import { NextRequest, NextResponse } from "next/server";
import { getAllArticles, saveArticles } from "@/lib/posts";
import { cookies } from "next/headers";

async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get("admin_session")?.value === "1";
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await req.json();
  const articles = getAllArticles();
  const idx = articles.findIndex((a) => a.slug === slug);

  if (idx === -1) {
    return NextResponse.json({ error: "Articolo non trovato" }, { status: 404 });
  }

  articles[idx] = { ...articles[idx], ...body, slug };
  saveArticles(articles);
  return NextResponse.json(articles[idx]);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { slug } = await params;
  const articles = getAllArticles();
  const filtered = articles.filter((a) => a.slug !== slug);

  if (filtered.length === articles.length) {
    return NextResponse.json({ error: "Articolo non trovato" }, { status: 404 });
  }

  saveArticles(filtered);
  return NextResponse.json({ ok: true });
}
