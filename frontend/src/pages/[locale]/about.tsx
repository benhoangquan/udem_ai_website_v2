import React from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { locales } from "@/i18n/config";
import { useTranslations } from "next-intl";

const AboutPage: React.FC = () => {
  const t = useTranslations("about");

  return (
    <>
      <Head>
        <title>About Us | UdeM AI</title>
        <meta
          name="description"
          content="Learn about UdeM AI, the Artificial Intelligence club at University of Montreal"
        />
      </Head>

      <main className="min-h-screen bg-cream pt-24">
        <div className="container mx-auto px-6 max-w-5xl py-16">
          <h1 className="text-5xl font-bold mb-8 text-seth-coral">
            {t("title")}
          </h1>
          <div className="prose prose-lg text-seth-coral max-w-none">
            <p className="mb-6 text-xl">{t("description1")}</p>
            <p className="mb-8 text-xl">{t("description2")}</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/company/udem-ai/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-seth-coral underline font-bold hover:text-seth-coral/80 text-xl"
              >
                {t("linkedin")}
              </a>
              <a
                href="https://www.instagram.com/udem.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-seth-coral underline font-bold hover:text-seth-coral/80 text-xl"
              >
                {t("instagram")}
              </a>
              <a
                href="https://discord.gg/2Ttnw8p2Hy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-seth-coral underline font-bold hover:text-seth-coral/80 text-xl"
              >
                {t("discord")}
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 pt-8 border-t border-seth-coral/20">
            <h2 className="text-3xl font-bold mb-4 text-seth-coral">
              {t("contactTitle")}
            </h2>
            <p className="text-lg text-seth-coral mb-4">
              {t("contactMessage")}
            </p>
            <a
              href="mailto:anas.el-ghoudane@umontreal.ca"
              className="text-seth-coral underline font-bold hover:text-seth-coral/80 text-lg"
            >
              anas.el-ghoudane@umontreal.ca
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};

export default AboutPage;
