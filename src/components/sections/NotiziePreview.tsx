import Link from "next/link";
import { getPublishedArticles } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";

export default function NotiziePreview() {
  const articles = getPublishedArticles().slice(0, 3);

  return (
    <section id="notizie" className="py-24 bg-crema">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-primario text-sm uppercase tracking-widest mb-3">
              Dalla comunità
            </p>
            <h2 className="text-4xl md:text-5xl text-marrone">
              Ultime Notizie
            </h2>
            <div className="w-12 h-0.5 bg-oro mt-4" />
          </div>
          <Link
            href="/notizie"
            className="self-start md:self-auto px-6 py-2 border-2 border-primario text-primario font-semibold rounded-full hover:bg-primario hover:text-crema transition-colors duration-200 text-sm tracking-wide"
          >
            Tutte le notizie →
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 text-marrone-medio opacity-60">
            <p className="text-xl">Nessuna notizia disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((a) => (
              <ArticleCard
                key={a.slug}
                slug={a.slug}
                title={a.title}
                date={a.date}
                excerpt={a.excerpt}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
