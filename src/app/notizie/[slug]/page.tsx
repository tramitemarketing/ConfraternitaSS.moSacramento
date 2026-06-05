import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedArticles, getArticleBySlug, formatDate } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

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
        className="py-32 px-6 text-crema"
        style={{
          background:
            "linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
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
          <div className="w-12 h-0.5 bg-oro mt-6" />
        </div>
      </div>

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
