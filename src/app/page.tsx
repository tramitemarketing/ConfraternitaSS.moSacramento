import Hero from "@/components/sections/Hero";
import ChiSiamo from "@/components/sections/ChiSiamo";
import Processione from "@/components/sections/Processione";
import Galleria from "@/components/sections/Galleria";
import Attivita from "@/components/sections/Attivita";
import NotiziePreview from "@/components/sections/NotiziePreview";
import Contatti from "@/components/sections/Contatti";

// ISR: la pagina viene servita statica (veloce, cache CDN) e rigenerata al
// massimo ogni ora. Le modifiche agli articoli appaiono subito grazie alla
// revalidazione on-demand innescata dall'admin (revalidatePath in api/notizie).
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <ChiSiamo />
      <Processione />
      <Galleria />
      <Attivita />
      <NotiziePreview />
      <Contatti />
    </>
  );
}
