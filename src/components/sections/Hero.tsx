import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Warm gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #3D1F0D 0%, #6B3A20 40%, #C4622D 80%, #C8893A 100%)",
        }}
      />

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FEFAF4' fill-rule='evenodd'%3E%3Cpath d='M30 0l2 28-2 2-2-2L30 0zm0 60l-2-28 2-2 2 2L30 60zM0 30l28-2 2 2-2 2L0 30zm60 0l-28 2-2-2 2-2L60 30z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Cross decorative */}
        <div className="text-oro text-6xl mb-6 opacity-80">✝</div>

        <p className="text-crema opacity-70 tracking-[0.3em] uppercase text-sm mb-4">
          Dal 1836
        </p>

        <h1 className="text-crema text-4xl md:text-6xl font-bold leading-tight mb-3">
          Confraternita del
        </h1>
        <h1 className="text-oro text-3xl md:text-5xl font-bold italic leading-tight mb-2">
          SS.mo Sacramento
        </h1>
        <p className="text-crema opacity-80 text-xl md:text-2xl tracking-widest uppercase mb-8">
          Monteprandone
        </p>

        <div className="w-16 h-0.5 bg-oro mx-auto mb-8 opacity-60" />

        <p className="text-crema opacity-80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-12">
          Fede, fratellanza e servizio.<br />
          <span className="opacity-70 text-base">
            Una comunità che cammina insieme da quasi due secoli.
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#chi-siamo"
            className="px-8 py-3 bg-oro text-marrone font-semibold rounded-full hover:bg-primario-chiaro transition-colors duration-200 tracking-wide"
          >
            Scopri chi siamo
          </Link>
          <Link
            href="/notizie"
            className="px-8 py-3 border border-crema text-crema font-semibold rounded-full hover:bg-crema hover:text-marrone transition-colors duration-200 tracking-wide"
          >
            Ultime notizie
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-crema text-xs tracking-widest uppercase">Scorri</span>
        <div className="w-px h-8 bg-crema animate-pulse" />
      </div>
    </section>
  );
}
