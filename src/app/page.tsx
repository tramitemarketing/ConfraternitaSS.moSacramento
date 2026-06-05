import Hero from "@/components/sections/Hero";
import ChiSiamo from "@/components/sections/ChiSiamo";
import Attivita from "@/components/sections/Attivita";
import NotiziePreview from "@/components/sections/NotiziePreview";
import Contatti from "@/components/sections/Contatti";

export default function Home() {
  return (
    <>
      <Hero />
      <ChiSiamo />
      <Attivita />
      <NotiziePreview />
      <Contatti />
    </>
  );
}
