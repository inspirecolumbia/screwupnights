import type { Metadata } from "next";
import { Archivo, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Variable font; the width axis gives the extra-wide display headlines.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Kept date-free: show details live in the EVENT object in page.tsx.
export const metadata: Metadata = {
  title: "Screwup Nights — A celebration of failure",
  description:
    "A live storytelling show where real people take the mic and walk us through their most spectacular flops — and what they learned. Columbia, SC · Presented by Inspire Columbia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
