import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://12oz-cafepico.com"),
  title: {
    default: "12oz | Café de Especialidad",
    template: "%s | 12oz Café"
  },
  description: "Tostamos con precisión y servimos con pasión. Descubrí nuestra carta de café de especialidad y pastelería en General Pico, La Pampa.",
  keywords: ["café", "cafetería", "General Pico", "La Pampa", "café de especialidad", "pastelería", "tostado", "12oz", "12onzas"],
  authors: [{ name: "12oz Café" }],
  creator: "12oz Café",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://12oz-cafepico.com",
    title: "12oz | Café de Especialidad",
    description: "Tostamos con precisión y servimos con pasión. Descubrí nuestra carta de café de especialidad y pastelería en General Pico, La Pampa.",
    siteName: "12oz Café",
    images: [
      {
        url: "/hero_portada.jpg",
        width: 1200,
        height: 630,
        alt: "12oz Café de Especialidad"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "12oz | Café de Especialidad",
    description: "Tostamos con precisión y servimos con pasión. Descubrí nuestra carta de café de especialidad y pastelería en General Pico, La Pampa.",
    images: ["/hero_portada.jpg"]
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`scroll-smooth ${montserrat.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-on-background font-body-lg selection:bg-primary-container selection:text-on-primary-container"
        suppressHydrationWarning
      >
        <NoiseOverlay />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
