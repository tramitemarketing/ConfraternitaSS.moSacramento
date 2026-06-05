export default function ChiSiamo() {
  return (
    <section id="chi-siamo" className="py-24 bg-crema">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primario text-sm uppercase tracking-widest mb-3">
            La nostra storia
          </p>
          <h2 className="text-4xl md:text-5xl text-marrone mb-6">
            Chi Siamo
          </h2>
          <div className="w-12 h-0.5 bg-oro mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div
              className="w-full aspect-[4/3] rounded-xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #F0E4CF 0%, #E8D5B7 50%, #D4B896 100%)",
              }}
            >
              <div className="text-center opacity-40">
                <div className="text-6xl mb-3">⛪</div>
                <p className="text-marrone-medio text-sm">
                  Foto della comunità
                </p>
              </div>
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-oro rounded-xl -z-10 opacity-30" />
          </div>

          {/* Text content */}
          <div className="space-y-6">
            <p className="text-marrone-medio leading-relaxed text-lg">
              La <strong className="text-marrone">Confraternita del Santissimo Sacramento</strong> di
              Monteprandone è una delle realtà associative più antiche del paese, fondata nel{" "}
              <strong className="text-primario">1836</strong> e mai interrotta nel corso delle generazioni.
            </p>

            <p className="text-marrone-medio leading-relaxed">
              Oggi conta <strong className="text-marrone">24 confratelli e consorelle</strong> — un
              dato che testimonia la vitalità di una comunità che, intorno al 2009, ha rinnovato il
              proprio statuto per accogliere ufficialmente anche le donne, aprendo un nuovo capitolo
              di fraternità.
            </p>

            <p className="text-marrone-medio leading-relaxed">
              La confraternita fa parte della{" "}
              <strong className="text-marrone">Diocesi di San Benedetto del Tronto –
              Ripatransone – Montalto Marche</strong> ed è guidata dal Priore{" "}
              <strong className="text-marrone">Tonino Sciarroni</strong>, che coordina le attività
              anche a livello diocesano.
            </p>

            {/* Timeline */}
            <div className="mt-8 space-y-4 border-l-2 border-crema-scuro pl-6">
              <div>
                <span className="text-primario font-bold text-lg">1836</span>
                <p className="text-marrone-medio text-sm mt-1">
                  Fondazione della Confraternita del SS.mo Sacramento
                </p>
              </div>
              <div>
                <span className="text-primario font-bold text-lg">1933</span>
                <p className="text-marrone-medio text-sm mt-1">
                  Redazione del vecchio statuto associativo
                </p>
              </div>
              <div>
                <span className="text-primario font-bold text-lg">2009</span>
                <p className="text-marrone-medio text-sm mt-1">
                  Riforma dello statuto: le consorelle entrano ufficialmente nella confraternita
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
