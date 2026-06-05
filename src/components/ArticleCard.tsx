import Link from "next/link";
import { formatDate } from "@/lib/posts";

interface Props {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}

/** Placeholder grafico quando non c'è immagine di copertina */
function CoverPlaceholder() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #F0E4CF 0%, #E8936B 60%, #C4622D 100%)",
      }}
    >
      <svg viewBox="0 0 100 130" className="w-12 h-16 text-crema/50" fill="currentColor" aria-hidden="true">
        <rect x="45" y="8" width="10" height="114" rx="3" />
        <rect x="18" y="42" width="64" height="10" rx="3" />
      </svg>
    </div>
  );
}

export default function ArticleCard({
  slug,
  title,
  date,
  excerpt,
  coverImage,
}: Props) {
  return (
    <article className="hover-lift bg-crema-scuro rounded-2xl overflow-hidden border border-transparent hover:border-oro/40 transition-colors duration-300 group h-full flex flex-col">
      <Link href={`/notizie/${slug}`} className="block img-zoom-wrap aspect-[16/10] relative">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={title}
            className="img-zoom w-full h-full object-cover"
          />
        ) : (
          <div className="img-zoom w-full h-full">
            <CoverPlaceholder />
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <time className="text-xs text-marrone-medio uppercase tracking-wider">
          {formatDate(date)}
        </time>
        <h3 className="mt-2 text-lg leading-snug text-marrone group-hover:text-primario transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-3 text-sm text-marrone-medio leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>
        <Link
          href={`/notizie/${slug}`}
          className="inline-flex items-center gap-1 mt-4 text-sm text-primario font-semibold hover:gap-2 transition-all"
        >
          Leggi tutto →
        </Link>
      </div>
    </article>
  );
}
