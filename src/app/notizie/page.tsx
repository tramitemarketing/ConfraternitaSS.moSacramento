import { getPublishedArticles } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";

export const metadata = {
  title: "Notizie — SS.mo Sacramento Monteprandone",
  description:
    "Ultime notizie e aggiornamenti dalla Confraternita del SS.mo Sacramento di Monteprandone.",
};

export default function NotizieIndex() {
  const articles = getPublishedArticles();

  return (
    <div className="min-h-screen bg-crema">
      {/* Header */}
      <div
        className="py-32 text-center text-crema"
        style={{
          background:
            "linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",
        }}
      >
        <p className="text-oro text-sm uppercase tracking-widest mb-4">
          Dalla comunità
        </p>
        <h1 className="text-5xl font-bold mb-4">Notizie</h1>
        <div className="w-12 h-0.5 bg-oro mx-auto mb-6" />
        <p className="opacity-70 max-w-md mx-auto px-6">
          Aggiornamenti, eventi e comunicazioni dalla Confraternita del SS.mo
          Sacramento di Monteprandone.
        </p>
      </div>

      {/* Articles grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20 text-marrone-medio opacity-60">
            <div className="text-5xl mb-4">📜</div>
            <p className="text-xl">Nessuna notizia pubblicata al momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
}
