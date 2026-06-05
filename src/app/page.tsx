import Hero from "@/components/sections/Hero";
import ChiSiamo from "@/components/sections/ChiSiamo";
import Galleria from "@/components/sections/Galleria";
import Attivita from "@/components/sections/Attivita";
import NotiziePreview from "@/components/sections/NotiziePreview";
import Contatti from "@/components/sections/Contatti";

export default function Home() {
  return (
    <>
      <Hero />
      <ChiSiamo />
      <Galleria />
      <Attivita />
      <NotiziePreview />
      <Contatti />
    </>
  );
}
