import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

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
    <html lang="en" className={anton.variable}>
      <body>{children}</body>
    </html>
  );
}
