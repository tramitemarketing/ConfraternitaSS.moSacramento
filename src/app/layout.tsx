import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

// URL pubblico del sito — usato per i metadati Open Graph (anteprime social).
// Quando avrai il dominio definitivo, impostalo nella variabile d'ambiente
// NEXT_PUBLIC_SITE_URL su Vercel (es. https://www.confraternitapietaemorte.it).
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://confraternita-pieta-morte.vercel.app";

// Immagine usata per le anteprime social (logo della confraternita).
// Il favicon del browser è gestito dai file src/app/icon.png e
// src/app/apple-icon.png (convenzione automatica di Next.js App Router).
const OG_IMAGE = "/logo-confraternita.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Processione del Cristo Morto a Monteprandone | Venerdì Santo",
    template: "%s | Confraternita della Pietà e della Morte",
  },
  description:
    "La storica Processione del Cristo Morto del Venerdì Santo a Monteprandone (AP): oltre 300 figuranti in costume, percorso, orari e bus gratuito. Tra le 5 processioni più belle delle Marche secondo Borghi più belli d'Italia.",
  keywords: [
    "Processione del Cristo Morto",
    "Processione Venerdì Santo Monteprandone",
    "Confraternita della Pietà e della Morte",
    "Monteprandone",
    "Venerdì Santo Marche",
    "Bara del Cristo Morto",
    "processioni Marche",
    "Borghi più belli d'Italia Marche",
    "Settimana Santa Ascoli Piceno",
  ],
  authors: [
    { name: "Confraternita della Pietà e della Morte di Monteprandone" },
  ],
  category: "Religione e tradizioni",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "Confraternita della Pietà e della Morte di Monteprandone",
    title:
      "Processione del Cristo Morto a Monteprandone — Venerdì Santo",
    description:
      "La storica Processione del Cristo Morto del Venerdì Santo a Monteprandone: oltre 300 figuranti in costume storico. Percorso, orari e bus gratuito.",
    images: [
      {
        url: OG_IMAGE,
        width: 800,
        height: 800,
        alt: "Sigillo della Confraternita della Pietà e della Morte di Monteprandone",
      },
    ],
  },
  twitter: {
    card: "summary",
    title:
      "Processione del Cristo Morto a Monteprandone — Venerdì Santo",
    description:
      "La storica Processione del Cristo Morto del Venerdì Santo a Monteprandone: oltre 300 figuranti in costume. Percorso, orari e bus gratuito.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
