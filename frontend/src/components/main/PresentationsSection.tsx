"use client";

import React from "react";
import { useTranslations } from "next-intl";

const PresentationsSection: React.FC = () => {
  const t = useTranslations("presentations");

  interface PresentationItem {
    title: string;
    link: string;
  }

  interface SemesterPresentations {
    semester: string;
    items: PresentationItem[];
  }

  const presentations: SemesterPresentations[] = [
    {
      semester: "Winter 2026",
      items: [
        { title: "Intro to AI", link: "/presentations/w25/intro.pdf" },
        {
          title: "Neural Networks Basics",
          link: "/presentations/w25/nn_basics.pdf",
        },
      ],
    },

  ];

  return (
    <div id="presentations" className="bg-white py-16 text-seth-coral">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8">{t("title")}</h2>
        <p className="text-lg mb-8">{t("description")}</p>

        <div className="space-y-8">
          {presentations.map((semester, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-bold mb-4">{semester.semester}</h3>
              {semester.items.length > 0 ? (
                <div className="space-y-4">
                  {semester.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="bg-gray-100 p-4 rounded-lg flex justify-between items-center hover:bg-gray-200 transition-colors"
                    >
                      <span className="font-semibold">{item.title}</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-seth-coral font-bold hover:underline"
                      >
                        PDF
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">{t("noPresentations")}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresentationsSection;
