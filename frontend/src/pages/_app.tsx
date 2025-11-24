import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LenisProvider from "@/components/common/LenisProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/common/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { IntlProvider } from "next-intl";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import { Locale, locales } from "@/i18n/config";
const staticMessages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  fr: frMessages,
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Extract locale from URL path (e.g., /fr -> fr, /en -> en)
  // With localePrefix: 'always', the path will always start with /en or /fr
  const pathLocale = router.asPath.split("/")[1];
  const locale = (
    locales.includes(pathLocale as Locale)
      ? pathLocale
      : router.locale || router.defaultLocale || "en"
  ) as Locale;

  const messages = pageProps.messages ?? staticMessages[locale];

  useEffect(() => {
    // Add smooth scrolling for internal hash links
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (
        link &&
        link.href.includes("#") &&
        link.href.startsWith(window.location.origin)
      ) {
        const hash = link.href.split("#")[1];
        const element = document.getElementById(hash);

        if (element) {
          event.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });

          // Update URL without full page reload
          window.history.pushState(
            null,
            "",
            `${window.location.pathname}#${hash}`,
          );
        }
      }
    };

    document.addEventListener("click", handleHashLinkClick);

    // Handle initial page load with hash
    if (router.asPath.includes("#")) {
      const hash = router.asPath.split("#")[1];
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    return () => {
      document.removeEventListener("click", handleHashLinkClick);
    };
  }, [router.asPath]);

  return (
    <IntlProvider messages={messages} locale={locale}>
      <div className="lenis lenis-smooth">
        <LenisProvider />
        <Navbar />
        <Component {...pageProps} />
        <SpeedInsights />
      </div>
    </IntlProvider>
  );
}
