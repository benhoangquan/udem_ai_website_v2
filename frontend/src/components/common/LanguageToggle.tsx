'use client';

import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { locales, type Locale } from '@/i18n/config';

interface LanguageToggleProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '', variant = 'desktop' }) => {
  const router = useRouter();
  const currentLocale = (router.locale || router.defaultLocale || 'en') as Locale;
  const pathname = router.pathname;
  const asPath = router.asPath;

  // Get the other locale
  const otherLocale = locales.find(locale => locale !== currentLocale) || 'en';
  
  // Build the path for the other locale
  // Remove current locale from path if present, then add new locale
  const getLocalizedPath = (locale: Locale) => {
    // If pathname already has [locale], replace it
    if (pathname.startsWith('/[locale]')) {
      return asPath.replace(`/${currentLocale}`, `/${locale}`);
    }
    // Otherwise, prepend the locale
    return `/${locale}${asPath === '/' ? '' : asPath}`;
  };

  const togglePath = getLocalizedPath(otherLocale);

  if (variant === 'mobile') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Link
          href={togglePath}
          className="text-white hover:opacity-80 transition-opacity text-sm md:text-base uppercase"
        >
          {currentLocale === 'en' ? 'FR' : 'EN'}
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={togglePath}
      className={`text-seth-coral hover:opacity-80 transition-opacity text-sm font-medium ${className}`}
    >
      {currentLocale === 'en' ? 'FR' : 'EN'}
    </Link>
  );
};

export default LanguageToggle;

