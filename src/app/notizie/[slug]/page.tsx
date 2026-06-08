import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, formatDate } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DivisoreOrnato } from "@/components/ui/Ornaments";

// Articoli renderizzati dinamicamente — sempre aggiornati da Supabase
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — SS.mo Sacramento Monteprandone`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || !article.published) notFound();

  return (
    <div className="min-h-screen bg-nero">
      {/* Header */}
      <div
        className="py-32 px-6 text-bianco-soft relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/notizie"
            className="text-oro text-sm hover:underline opacity-80 mb-6 inline-block"
          >
            ← Tutte le notizie
          </Link>
          <time className="block text-xs uppercase tracking-widest opacity-60 mb-4">
            {formatDate(article.date)}
          </time>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {article.title}
          </h1>
          <DivisoreOrnato className="w-40 h-6 text-oro mt-6" />
        </div>
      </div>

      {/* Immagine di copertina */}
      {article.coverImage && (
        <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-bianco-soft/80 text-lg leading-relaxed mb-10 border-l-4 border-oro pl-5 italic">
          {article.excerpt}
        </p>
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={article.content} />
        </div>

        <div className="mt-16 pt-8 border-t border-nero-bordo">
          <Link
            href="/notizie"
            className="text-oro font-semibold hover:text-oro-chiaro transition-colors"
          >
            ← Torna alle notizie
          </Link>
        </div>
      </div>
    </div>
  );
}
