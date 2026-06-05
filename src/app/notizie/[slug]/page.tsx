import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedArticles, getArticleBySlug, formatDate } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DivisoreOrnato } from "@/components/ui/Ornaments";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — SS.mo Sacramento Monteprandone`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || !article.published) notFound();

  return (
    <div className="min-h-screen bg-crema">
      {/* Header */}
      <div
        className="py-32 px-6 text-crema relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",
        }}
      >
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
        <p className="text-marrone-medio text-lg leading-relaxed mb-10 border-l-4 border-primario-chiaro pl-5 italic">
          {article.excerpt}
        </p>
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={article.content} />
        </div>

        <div className="mt-16 pt-8 border-t border-crema-scuro">
          <Link
            href="/notizie"
            className="text-primario font-semibold hover:text-primario-scuro transition-colors"
          >
            ← Torna alle notizie
          </Link>
        </div>
      </div>
    </div>
  );
}
