import { NextRequest, NextResponse } from "next/server";
import { updateArticle, deleteArticle } from "@/lib/posts";
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

  try {
    const updated = await updateArticle(slug, body);
    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    // Firestore update() su un doc inesistente → "No document to update"
    if (/no document to update/i.test(message) || message.includes("NOT_FOUND")) {
      return NextResponse.json(
        { error: "Articolo non trovato" },
        { status: 404 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    await deleteArticle(slug);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
