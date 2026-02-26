import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Wedding Celebration",
  description: "A luxury East Javanese wedding invitation experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} antialiased bg-ivory text-foreground font-sans min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
