import Link from "next/link";
import { getPublishedArticles, formatDate } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato } from "@/components/ui/Ornaments";

function FeaturedCover({ coverImage, title }: { coverImage?: string; title: string }) {
  if (coverImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={coverImage} alt={title} className="img-zoom w-full h-full object-cover" />
    );
  }
  return (
    <div
      className="img-zoom w-full h-full flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #0A0A0B 0%, #15130E 42%, #6E561F 78%, #C9A24A 93%, #EBCB73 100%)",
      }}
    >
      <svg viewBox="0 0 100 130" className="w-20 h-28 text-bianco-soft/30" fill="currentColor" aria-hidden="true">
        <rect x="45" y="8" width="10" height="114" rx="3" />
        <rect x="18" y="42" width="64" height="10" rx="3" />
      </svg>
    </div>
  );
}

export default async function NotiziePreview() {
  const articles = await getPublishedArticles();
  const [primo, ...resto] = articles;
  const secondari = resto.slice(0, 2);

  return (
    <section
      id="notizie"
      className="py-28 scroll-mt-20"
      style={{ backgroundColor: "#15130E" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-oro text-sm uppercase tracking-[0.25em] mb-3">
              Dalla comunità
            </p>
            <h2 className="text-4xl md:text-6xl text-bianco">Ultime Notizie</h2>
            <DivisoreOrnato className="w-48 h-6 text-oro mt-5" />
          </div>
          <Link
            href="/notizie"
            className="btn-shimmer self-start md:self-auto px-6 py-2.5 border-2 border-oro text-oro font-semibold rounded-full hover:bg-oro hover:text-nero transition-colors duration-300 text-sm tracking-wide"
          >
            Tutte le notizie →
          </Link>
        </Reveal>

        {articles.length === 0 ? (
          <div className="text-center py-16 text-bianco-soft">
            <p className="text-xl">Nessuna notizia disponibile al momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Articolo in evidenza */}
            {primo && (
              <Reveal>
                <Link
                  href={`/notizie/${primo.slug}`}
                  className="hover-lift group block h-full bg-nero-soft rounded-3xl overflow-hidden border border-transparent hover:border-oro/40 transition-colors"
                >
                  <div className="img-zoom-wrap aspect-[16/10]">
                    <FeaturedCover coverImage={primo.coverImage} title={primo.title} />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-oro text-nero text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        Ultima notizia
                      </span>
                      <time className="text-xs text-bianco-soft uppercase tracking-wider">
                        {formatDate(primo.date)}
                      </time>
                    </div>
                    <h3 className="text-2xl md:text-3xl text-bianco mb-3 group-hover:text-oro transition-colors leading-snug">
                      {primo.title}
                    </h3>
                    <p className="text-bianco-soft leading-relaxed">
                      {primo.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-5 text-oro font-semibold group-hover:gap-2 transition-all">
                      Leggi tutto →
                    </span>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Due articoli secondari impilati */}
            <div className="grid grid-cols-1 gap-8">
              {secondari.map((a, i) => (
                <Reveal key={a.slug} delay={(i + 1) as 1 | 2}>
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
          </div>
        )}
      </div>
    </section>
  );
}
