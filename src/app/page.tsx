import Hero from "@/components/sections/Hero";
import ChiSiamo from "@/components/sections/ChiSiamo";
import Processione from "@/components/sections/Processione";
import Galleria from "@/components/sections/Galleria";
import Attivita from "@/components/sections/Attivita";
import NotiziePreview from "@/components/sections/NotiziePreview";
import Contatti from "@/components/sections/Contatti";

// force server-render on every request so article changes are immediately reflected
export const dynamic = "force-dynamic";

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
