import { getPublishedArticles } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato, patternFleur } from "@/components/ui/Ornaments";
import Teschio from "@/components/ui/Teschio";

// ISR + revalidazione on-demand dall'admin (vedi api/notizie).
export const revalidate = 3600;

export const metadata = {
  title: "Notizie ed eventi della processione",
  description:
    "Notizie, date ed eventi della Confraternita della Pietà e della Morte di Monteprandone: appuntamenti della Processione del Cristo Morto del Venerdì Santo e vita della comunità.",
  alternates: { canonical: "/notizie" },
};

export default async function NotizieIndex() {
  const articles = await getPublishedArticles();

  return (
    <div className="min-h-screen bg-nero">
      {/* Header */}
      <div
        className="py-36 text-center text-bianco-soft relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: patternFleur }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <Teschio className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40vh] h-[40vh] object-contain text-oro opacity-[0.06] float-slow pointer-events-none" />
        <div className="relative z-10">
          <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
            Dalla comunità
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-5">Notizie</h1>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto mb-6" />
          <p className="text-bianco-soft/75 max-w-md mx-auto px-6">
            Aggiornamenti, eventi e comunicazioni dalla Confraternita della
            Pietà e della Morte di Monteprandone.
          </p>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20 text-bianco-soft/50">
            <Teschio className="w-16 h-20 object-contain text-oro/40 mx-auto mb-4" />
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
