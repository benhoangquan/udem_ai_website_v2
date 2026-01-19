import { GetStaticProps, GetStaticPaths } from "next";
import { locales } from "@/i18n/config";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Placeholder data - replace with real projects
const projects = [
  {
    id: 1,
    title: "AI Ethics Classifier",
    description: "A model to detect bias in job descriptions.",
    tags: ["NLP", "Ethics", "Python"],
    image: "/images/hero/hero-1.jpg", // Placeholder
    link: "https://github.com/udem-ai",
  },
  {
    id: 2,
    title: "Robotic Arm Control",
    description: "Reinforcement learning for robotic manipulation.",
    tags: ["RL", "Robotics", "MuJoCo"],
    image: "/images/hero/hero-3.jpg", // Placeholder
    link: "https://github.com/udem-ai",
  },
  {
    id: 3,
    title: "Campus Chatbot",
    description: "RAG-based chatbot for UdeM campus information.",
    tags: ["LLM", "RAG", "LangChain"],
    image: "/images/hero/hero-4.jpg", // Placeholder
    link: "https://github.com/udem-ai",
  },
  {
    id: 4,
    title: "Medical Image Segmentation",
    description: "U-Net implementation for MRI segmentation.",
    tags: ["CV", "Healthcare", "PyTorch"],
    image: "/images/hero/hero-1.jpg", // Placeholder
    link: "https://github.com/udem-ai",
  },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <>
      <Head>
        <title>Projects | UdeM AI</title>
        <meta
          name="description"
          content="Showcase of UdeM AI student projects"
        />
      </Head>
      <div className="bg-cream min-h-screen py-24 text-seth-coral">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-5xl font-bold mb-12 text-center">{t("title")}</h1>

          <div className="flex justify-center items-center py-24">
            <p className="text-3xl font-semibold italic text-gray-500">
              {t("comingSoon")}
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="text-seth-coral underline font-bold text-lg hover:opacity-80"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

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
