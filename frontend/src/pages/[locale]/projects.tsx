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

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="break-inside-avoid bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-seth-coral/10 text-seth-coral text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-seth-coral text-white py-2 px-4 rounded hover:bg-seth-coral/90 transition-colors font-semibold"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
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
