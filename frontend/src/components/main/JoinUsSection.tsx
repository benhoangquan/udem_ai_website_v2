"use client";

import React from "react";
import Link from "next/link";
import TypeWriter from "../common/TypeWriter";
import AnimatedText from "@/components/common/AnimatedText";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const JoinUsSection: React.FC = () => {
  const t = useTranslations("joinUs");
  const router = useRouter();
  const locale = router.locale || "en";
  return (
    <div className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedText
          text={t("title")}
          className="seth-heading mb-8 transition-colors duration-500"
        />

        <TypeWriter
          text={t("subtitle")}
          className="seth-heading-2 text-seth-coral/50 mb-16"
          tag="p"
          speed={60}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          {/* Executive Member Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">
              {t("executive.title")}
            </h3>
            <p className="text-seth-coral mb-8 flex-grow">
              {t("executive.description")}
            </p>
            <Link
              href={`/${locale}/opportunity`}
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              {t("executive.cta")}
            </Link>
          </div>

          {/* Active Member Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">
              {t("active.title")}
            </h3>
            <p className="text-seth-coral mb-8 flex-grow">
              {t("active.description")}
            </p>
            <Link
              href="https://discord.gg/2Ttnw8p2Hy"
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              {t("active.cta")}
            </Link>
          </div>

          {/* Collaborate With Us Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">
              {t("collab.title")}
            </h3>
            <p className="text-seth-coral mb-8 flex-grow">
              {t("collab.description")}
            </p>
            <Link
              href="mailto:hey@udemai.ca"
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              {t("collab.cta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsSection;
