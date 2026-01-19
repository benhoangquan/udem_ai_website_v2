"use client";

import React from "react";
import TypeWriter from "@/components/common/TypeWriter";
import { useTranslations } from "next-intl";

const ProjectsSection: React.FC = () => {
  const t = useTranslations("projects");
  return (
    <div id="projects" className="bg-cream py-16 text-seth-coral">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold mb-8">{t("title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Placeholder for projects */}
          <div className="border border-seth-coral p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              {t("project1.title")}
            </h3>
            <p className="mb-4">{t("project1.description")}</p>
          </div>
          <div className="border border-seth-coral p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              {t("project2.title")}
            </h3>
            <p className="mb-4">{t("project2.description")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
