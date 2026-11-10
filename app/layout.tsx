import type { Metadata } from "next";
import { Anton, DM_Serif_Display, Figtree } from "next/font/google";
import "./globals.css";

// Three faces: Anton for headings, Figtree for reading, DM Serif for the
// tagline and the about lead only.
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

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = "ScrewUp Nights | Live storytelling in Columbia, SC";
const description =
  "A live storytelling night where real people tell the story of their most spectacular flops, and what they learned. Columbia, SC. Presented by Inspire Columbia.";
const image = {
  url: "/proto/n01-patio-dusk.jpg",
  width: 1600,
  height: 1066,
  alt: "The audience at a ScrewUp Nights show on a patio at dusk, under string lights.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://screwupnights.com"),
  title,
  description,
  openGraph: { title, description, type: "website", images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${serifDisplay.variable} ${figtree.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
