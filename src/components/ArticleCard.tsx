import Link from "next/link";
import { formatDate } from "@/lib/posts";

interface Props {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export default function ArticleCard({ slug, title, date, excerpt }: Props) {
  return (
    <article className="bg-crema-scuro rounded-lg overflow-hidden border border-crema-scuro hover:border-primario-chiaro transition-colors duration-200 group">
      <div className="h-2 bg-primario group-hover:bg-oro transition-colors duration-200" />
      <div className="p-6">
        <time className="text-xs text-marrone-medio uppercase tracking-wider">
          {formatDate(date)}
        </time>
        <h3 className="mt-2 text-lg leading-snug text-marrone group-hover:text-primario transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-3 text-sm text-marrone-medio leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/notizie/${slug}`}
          className="inline-flex items-center gap-1 mt-4 text-sm text-primario font-semibold hover:text-primario-scuro transition-colors"
        >
          Leggi tutto →
        </Link>
      </div>
    </article>
  );
}
