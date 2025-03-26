import type { AppProps } from 'next/app';
import { Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../pages/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style> */}
      <div className="lenis lenis-smooth">
        <LenisProvider />
        <Component {...pageProps} />
        <SpeedInsights />
      </div>
    </>
  );
} 