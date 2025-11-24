"use client";

import React from "react";
import { useRouter } from "next/router";
import { locales, type Locale } from "@/i18n/config";

interface LanguageToggleProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = "",
  variant = "desktop",
}) => {
  const router = useRouter();
  const { asPath } = router;

  // Extract locale from URL path (e.g., /fr -> fr, /en -> en)
  const pathLocale = asPath.split("/")[1];
  const currentLocale = (
    locales.includes(pathLocale as Locale)
      ? pathLocale
      : router.locale || router.defaultLocale || "en"
  ) as Locale;

  const otherLocale: Locale =
    (locales.find((locale) => locale !== currentLocale) as Locale) ?? "en";

  // Replace the locale in the current path
  // asPath will be like /en, /fr, /en/resources, etc.
  let newPath = asPath;

  // Replace current locale with other locale in the path
  if (asPath.startsWith(`/${currentLocale}/`)) {
    newPath = asPath.replace(`/${currentLocale}/`, `/${otherLocale}/`);
  } else if (asPath.startsWith(`/${currentLocale}`)) {
    newPath = asPath.replace(`/${currentLocale}`, `/${otherLocale}`);
  } else {
    // Fallback: prepend locale if not present
    newPath = `/${otherLocale}${asPath === "/" ? "" : asPath}`;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to the new path with the other locale
    router.push(newPath);
  };

  const label = currentLocale === "en" ? "FR" : "EN";

  if (variant === "mobile") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handleClick}
          className="text-white hover:opacity-80 transition-opacity text-sm md:text-base uppercase"
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`text-seth-coral hover:opacity-80 transition-opacity text-sm font-medium ${className}`}
    >
      {label}
    </button>
  );
};

export default LanguageToggle;
