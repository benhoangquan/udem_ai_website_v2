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
        <div className="flex justify-center items-center py-12">
          <p className="text-2xl font-semibold italic text-gray-500">
            {t("comingSoon")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
