"use client";

import React from "react";
import Link from "next/link";
import { useMenuToggle } from "@/hooks/useMenuToggle";
import MobileMenu from "./MobileMenu";
import TypeWriter from "./TypeWriter";
import LanguageToggle from "./LanguageToggle";
import { useRouter } from "next/router";
import { locales, type Locale } from "@/i18n/config";

const Navbar: React.FC = () => {
  const { isOpen, toggleMenu, closeMenu } = useMenuToggle();
  const router = useRouter();

  // Extract locale from URL path (e.g., /fr -> fr, /en -> en)
  const pathLocale = router.asPath.split("/")[1];
  const locale = (
    locales.includes(pathLocale as Locale) ? pathLocale : router.locale || "en"
  ) as Locale;

  return (
    <>
      <nav className="bg-cream w-full py-5 px-5 md:px-8 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link
          href={`/${locale}`}
          className="text-seth-coral font-medium text-2xl tracking-wide"
        >
          <TypeWriter
            text="UdeM AI"
            className="block mb-1"
            tag="span"
            speed={60}
            typingCursor={"_"}
            typingCursorPersistence={true}
          />
        </Link>

        <div className="flex items-center gap-4">
          <LanguageToggle variant="desktop" />
          <button
            onClick={toggleMenu}
            className="h-8 w-8 rounded-full bg-seth-coral flex items-center justify-center"
            aria-label="Open menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
