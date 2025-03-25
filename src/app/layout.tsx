import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seth Rowden | Brand Writer and Strategist",
  description: "Seth Rowden is a brand writer and strategist who helps clients stand out through clear positioning, brand messaging and stories that move people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} lenis lenis-smooth`}>
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
