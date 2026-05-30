import type { Metadata } from "next";
import {
  Anton,
  DM_Serif_Display,
  Space_Mono,
  Permanent_Marker,
} from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const serifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Screwup Nights — A celebration of failure",
  description:
    "A live storytelling show where real people take the mic and walk us through their most spectacular flops — and what they learned. Sept 4, 2026 · Columbia, SC · $15.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${serifDisplay.variable} ${spaceMono.variable} ${permanentMarker.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
