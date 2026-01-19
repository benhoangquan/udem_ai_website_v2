"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const AboutSection: React.FC = () => {
  const t = useTranslations("about");
  return (
    <div id="about" className="bg-cream py-16 text-seth-coral">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8">{t("title")}</h2>
        <div className="prose prose-lg text-seth-coral max-w-none">
          <p className="mb-6">{t("description1")}</p>
          <p className="mb-8">{t("description2")}</p>
          <a
            href="https://www.linkedin.com/company/udem-ai/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="text-seth-coral underline font-bold hover:text-seth-coral/80"
          >
            {t("linkedin")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
