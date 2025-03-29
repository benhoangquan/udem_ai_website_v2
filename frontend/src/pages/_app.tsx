import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from "next/font/google";
import LenisProvider from "@/components/common/LenisProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/common/Navbar";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Add smooth scrolling for internal hash links
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href.includes('#') && link.href.startsWith(window.location.origin)) {
        const hash = link.href.split('#')[1];
        const element = document.getElementById(hash);
        
        if (element) {
          event.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          
          // Update URL without full page reload
          window.history.pushState(null, '', `${window.location.pathname}#${hash}`);
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);

    // Handle initial page load with hash
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, [router.asPath]);

  return (
    <>
      {/* <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style> */}
      <div className="lenis lenis-smooth">
        <LenisProvider />
        <Navbar />
        <Component {...pageProps} />
        <SpeedInsights />

      </div>
    </>
  );
} 