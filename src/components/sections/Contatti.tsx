export default function Contatti() {
  return (
    <section id="contatti" className="py-24 bg-marrone text-crema">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-oro text-sm uppercase tracking-widest mb-3">
          Dove siamo
        </p>
        <h2 className="text-4xl md:text-5xl mb-6">Contatti</h2>
        <div className="w-12 h-0.5 bg-oro mx-auto mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="bg-marrone-medio bg-opacity-30 rounded-xl p-6 border border-marrone-medio">
            <div className="text-oro text-3xl mb-4">📍</div>
            <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
              Dove
            </h3>
            <p className="opacity-80 leading-relaxed">
              Monteprandone (AP)<br />
              Marche, Italia
            </p>
          </div>

          <div className="bg-marrone-medio bg-opacity-30 rounded-xl p-6 border border-marrone-medio">
            <div className="text-oro text-3xl mb-4">✝</div>
            <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
              Priore
            </h3>
            <p className="opacity-80 leading-relaxed">
              Tonino Sciarroni<br />
              <span className="text-xs opacity-60">Coordinatore diocesano</span>
            </p>
          </div>

          <div className="bg-marrone-medio bg-opacity-30 rounded-xl p-6 border border-marrone-medio">
            <div className="text-oro text-3xl mb-4">🏛️</div>
            <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
              Diocesi
            </h3>
            <p className="opacity-80 leading-relaxed text-xs">
              San Benedetto del Tronto<br />
              Ripatransone<br />
              Montalto Marche
            </p>
          </div>
        </div>

        <div className="mt-12 text-sm opacity-50">
          <p>Per informazioni, rivolgiti alla parrocchia di Monteprandone.</p>
        </div>
      </div>
    </section>
  );
}
