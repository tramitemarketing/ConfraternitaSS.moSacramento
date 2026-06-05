import { getPublishedArticles } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato, CroceOrnata, patternFleur } from "@/components/ui/Ornaments";

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
        className="py-36 text-center text-crema relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #3D1F0D 0%, #6B3A20 60%, #C4622D 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: patternFleur }}
        />
        <CroceOrnata className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40vh] h-[40vh] text-oro opacity-[0.06] float-slow" />
        <div className="relative z-10">
          <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
            Dalla comunità
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-5">Notizie</h1>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto mb-6" />
          <p className="opacity-75 max-w-md mx-auto px-6">
            Aggiornamenti, eventi e comunicazioni dalla Confraternita del SS.mo
            Sacramento di Monteprandone.
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20 text-marrone-medio/60">
            <CroceOrnata className="w-16 h-20 text-oro/40 mx-auto mb-4" />
            <p className="text-xl">Nessuna notizia pubblicata al momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) as 0 | 1 | 2}>
                <ArticleCard
                  slug={a.slug}
                  title={a.title}
                  date={a.date}
                  excerpt={a.excerpt}
                  coverImage={a.coverImage}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
