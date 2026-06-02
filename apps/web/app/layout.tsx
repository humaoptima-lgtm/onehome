import type { Metadata } from "next";
import { playfairDisplay, inter } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "One Home | Platform PropTech Premium",
  description: "Beli, Renovasi, Furnish dan Biayai Rumah Anda di Satu Tempat. Ekosistem properti mewah terlengkap.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "One Home | Platform PropTech Premium",
    description: "Beli, Renovasi, Furnish dan Biayai Rumah Anda di Satu Tempat.",
    siteName: "One Home",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={cn(playfairDisplay.variable, inter.variable, "font-sans", geist.variable)}>
      <body>
        <a href="#main-content" className="skip-nav">
          Langsung ke konten utama
        </a>
        <Providers>
          <div className="app-container">
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
