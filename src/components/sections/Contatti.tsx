import Reveal from "@/components/ui/Reveal";
import { DivisoreOrnato } from "@/components/ui/Ornaments";
import Teschio from "@/components/ui/Teschio";
import SocialLinks from "@/components/ui/SocialLinks";
import { contatti, luogo } from "@/lib/site";
import {
  IconLuogo,
  IconEmail,
  IconTelefono,
} from "@/components/ui/Icons";

export default function Contatti() {
  const haSocial = contatti.instagram || contatti.facebook;

  return (
    <section
      id="contatti"
      className="py-28 bg-nero text-bianco-soft scroll-mt-20 relative overflow-hidden"
    >
      <Teschio className="absolute -right-16 top-1/2 -translate-y-1/2 w-[36vh] h-[36vh] object-contain text-oro opacity-[0.04] pointer-events-none" />

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
                Chiesa San Nicolò di Bari
                <br />
                {luogo.comune}
                <br />
                <span className="text-xs opacity-75">{luogo.regione}</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="bg-nero-soft/60 rounded-2xl p-7 border border-nero-bordo h-full hover:border-oro/40 transition-colors">
              <Teschio className="w-10 h-10 object-contain text-oro mx-auto mb-3" />
              <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
                La Processione
              </h3>
              <p className="opacity-100 leading-relaxed">
                Venerdì Santo
                <br />
                ore 21:00
                <br />
                <span className="text-xs opacity-75">
                  Bus gratuito dalle 20:30
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="bg-nero-soft/60 rounded-2xl p-7 border border-nero-bordo h-full hover:border-oro/40 transition-colors">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-9 h-9 text-oro mx-auto mb-4"
                aria-hidden="true"
              >
                <path
                  d="M12 2 L4 6 L4 11 C4 16 7.5 20.5 12 22 C16.5 20.5 20 16 20 11 L20 6 Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-3">
                Rifondata nel
              </h3>
              <p className="opacity-100 leading-relaxed">
                9 giugno 2009
                <br />
                <span className="text-xs opacity-75">
                  Fondata nel XVII secolo
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Recapiti diretti: telefono ed email (con segnaposto se non compilati) */}
        <Reveal className="mt-10">
          <div className="max-w-xl mx-auto bg-nero-soft/60 rounded-2xl p-7 sm:p-8 border border-nero-bordo">
            <h3 className="text-oro font-semibold uppercase tracking-wider text-xs mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-oro/60 inline-block" />
              Recapiti diretti
              <span className="w-8 h-px bg-oro/60 inline-block" />
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Telefono */}
              <div className="flex-1">
                {contatti.telefono ? (
                  <a
                    href={`tel:${contatti.telefono.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-nero-bordo hover:border-oro/50 transition-colors text-left"
                  >
                    <IconTelefono className="w-5 h-5 text-oro shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-widest text-bianco-soft/70">
                        Telefono
                      </span>
                      <span className="text-bianco-soft font-medium">
                        {contatti.telefono}
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-nero-bordo">
                    <IconTelefono className="w-5 h-5 text-oro/50 shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-widest text-bianco-soft/70">
                        Telefono
                      </span>
                      <span className="text-bianco-soft/60 italic text-sm">
                        Presto disponibile
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="flex-1">
                {contatti.email ? (
                  <a
                    href={`mailto:${contatti.email}`}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-nero-bordo hover:border-oro/50 transition-colors text-left"
                  >
                    <IconEmail className="w-5 h-5 text-oro shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-widest text-bianco-soft/70">
                        Email
                      </span>
                      <span className="text-bianco-soft font-medium break-all">
                        {contatti.email}
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-nero-bordo">
                    <IconEmail className="w-5 h-5 text-oro/50 shrink-0" />
                    <span>
                      <span className="block text-[10px] uppercase tracking-widest text-bianco-soft/70">
                        Email
                      </span>
                      <span className="text-bianco-soft/60 italic text-sm">
                        Presto disponibile
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {haSocial && (
              <div className="flex flex-col items-center gap-3 mt-7 pt-7 border-t border-nero-bordo">
                <p className="text-bianco-soft text-xs uppercase tracking-widest">
                  Seguici
                </p>
                <SocialLinks size={22} className="text-oro" />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
