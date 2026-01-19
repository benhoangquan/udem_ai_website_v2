"use client";

import React from "react";
import { useTranslations } from "next-intl";

const ReadingSection: React.FC = () => {
  const t = useTranslations("resources");
  const archive = [
    {
      title: t("paper1Title"),
      authors: t("paper1Authors"),
      link: "https://arxiv.org/abs/1706.03762",
    },
  ];

  return (
    <div id="resources" className="bg-seth-coral/10 py-16 text-seth-coral">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8">{t("title")}</h2>

        {/* Current Paper */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <span className="bg-seth-coral/10 text-seth-coral px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
            2025-03-21
          </span>
          <h3 className="text-2xl font-semibold mb-2">{t("paperTitle")}</h3>
          <p className="text-lg mb-4 font-bold">{t("paperName")}</p>
          <p className="italic text-gray-600 mb-6">{t("authors")}</p>
          <a
            href="https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-seth-coral text-white py-2 px-6 rounded hover:bg-seth-coral/90 transition-colors"
          >
            {t("readMore")}
          </a>
        </div>

        {/* Archive Section */}
        <div>
          <h3 className="text-2xl font-bold mb-4">{t("archiveTitle")}</h3>
          <div className="space-y-4">
            {archive.map((paper, idx) => (
              <div
                key={idx}
                className="bg-white/50 p-4 rounded-lg flex justify-between items-center hover:bg-white transition-colors"
              >
                <div>
                  <p className="font-semibold">{paper.title}</p>
                  <p className="text-sm text-gray-600">{paper.authors}</p>
                </div>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-seth-coral font-bold hover:underline"
                >
                  PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingSection;
