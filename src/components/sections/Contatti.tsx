import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato, CroceOrnata } from "@/components/ui/Ornaments";
import SocialLinks from "@/components/ui/SocialLinks";
import { contatti, luogo } from "@/lib/site";
import {
  IconLuogo,
  IconEmail,
  IconTelefono,
} from "@/components/ui/Icons";

export default function Contatti() {
  const haContattiDiretti = contatti.email || contatti.telefono;
  const haSocial = contatti.instagram || contatti.facebook;

  return (
    <section id="contatti" className="py-28 bg-nero text-bianco-soft scroll-mt-20 relative overflow-hidden">
      {/* Croce decorativa di sfondo */}
      <CroceOrnata className="absolute -right-16 top-1/2 -translate-y-1/2 w-[40vh] h-[40vh] text-oro opacity-[0.04] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <p className="text-oro text-sm uppercase tracking-[0.25em] mb-4">
            Restiamo in contatto
          </p>
          <h2 className="text-4xl md:text-6xl mb-6">Contatti</h2>
          <DivisoreOrnato className="w-48 h-6 text-oro mx-auto mb-12" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <Reveal delay={1}>
            <div className="bg-nero-soft/60 rounded-2xl p-7 border border-nero-bordo h-full hover:border-oro/40 transition-colors">
              <IconLuogo className="w-9 h-9 text-oro mx-auto mb-4" />
              <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
                Dove siamo
              </h3>
              <p className="opacity-100 leading-relaxed">
                {luogo.comune}
                <br />
                {luogo.regione}
              </p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="bg-nero-soft/60 rounded-2xl p-7 border border-nero-bordo h-full hover:border-oro/40 transition-colors">
              <CroceOrnata className="w-9 h-11 text-oro mx-auto mb-3" />
              <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
                Priore
              </h3>
              <p className="opacity-100 leading-relaxed">
                Tonino Sciarroni
                <br />
                <span className="text-xs opacity-60">Coordinatore diocesano</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="bg-nero-soft/60 rounded-2xl p-7 border border-nero-bordo h-full hover:border-oro/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-oro mx-auto mb-4" aria-hidden="true">
                <path d="M12 2 L4 6 L4 11 C4 16 7.5 20.5 12 22 C16.5 20.5 20 16 20 11 L20 6 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
                Diocesi
              </h3>
              <p className="opacity-100 leading-relaxed text-xs">
                San Benedetto del Tronto
                <br />
                Ripatransone
                <br />
                Montalto Marche
              </p>
            </div>
          </Reveal>
        </div>

        {/* Contatti diretti + social */}
        <Reveal className="mt-12">
          {(haContattiDiretti || haSocial) ? (
            <div className="flex flex-col items-center gap-6">
              {haContattiDiretti && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {contatti.email && (
                    <a
                      href={`mailto:${contatti.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-oro text-nero font-semibold hover:bg-oro-chiaro transition-colors text-sm"
                    >
                      <IconEmail className="w-4 h-4" />
                      {contatti.email}
                    </a>
                  )}
                  {contatti.telefono && (
                    <a
                      href={`tel:${contatti.telefono.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-bianco-soft/50 text-bianco-soft font-semibold hover:bg-bianco-soft hover:text-nero transition-colors text-sm"
                    >
                      <IconTelefono className="w-4 h-4" />
                      {contatti.telefono}
                    </a>
                  )}
                </div>
              )}
              {haSocial && (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-bianco-soft text-xs uppercase tracking-widest">
                    Seguici
                  </p>
                  <SocialLinks size={22} className="text-oro" />
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm opacity-50">
              Per informazioni, rivolgiti alla parrocchia di Monteprandone.
              <br />
              <span className="text-xs">
                I recapiti social e diretti saranno presto disponibili.
              </span>
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
