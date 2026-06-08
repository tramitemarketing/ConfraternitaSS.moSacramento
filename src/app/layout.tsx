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

export const metadata: Metadata = {
  title: "Confraternita della Pietà e della Morte — Monteprandone",
  description:
    "Confraternita della Pietà e della Morte di Monteprandone. La storica Processione del Cristo Morto del Venerdì Santo, con oltre 300 figuranti in costume storico. Tra le 5 processioni più belle delle Marche secondo Borghi più belli d'Italia.",
  keywords: [
    "confraternita",
    "Monteprandone",
    "Processione del Cristo Morto",
    "Venerdì Santo",
    "Marche",
    "Pietà e della Morte",
  ],
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
