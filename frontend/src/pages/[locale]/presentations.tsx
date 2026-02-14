import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { locales } from "@/i18n/config";

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
            { title: "Week 1: Introduction", link: "/presentations/w26/lecture1.pdf" },
            {
                title: "Week 2: Advanced Topics",
                link: "/presentations/w26/lecture2.pdf",
            },
            { title: "Intro to AI (W25)", link: "/presentations/w25/intro.pdf" },
            {
                title: "Neural Networks Basics (W25)",
                link: "/presentations/w25/nn_basics.pdf",
            },
        ],
    },
];

export default function PresentationsPage() {
    const t = useTranslations("presentations");
    const [selectedPdf, setSelectedPdf] = useState<string | null>(
        presentations[0]?.items[0]?.link || null
    );

    return (
        <main className="bg-cream min-h-screen pt-24 pb-16">
            <Head>
                <title>UdeM AI Club - Presentations</title>
            </Head>
            <div className="container mx-auto px-6 max-w-7xl">
                <h1 className="text-4xl font-bold mb-8 text-seth-coral">
                    {t("title")}
                </h1>
                <p className="text-lg mb-8 text-gray-700 max-w-2xl">
                    {t("description")}
                </p>

                <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-250px)] min-h-[600px]">
                    {/* Sidebar List */}
                    <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-sm overflow-y-auto">
                        <div className="space-y-8">
                            {presentations.map((semester, idx) => (
                                <div key={idx}>
                                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                                        {semester.semester}
                                    </h3>
                                    {semester.items.length > 0 ? (
                                        <div className="space-y-2">
                                            {semester.items.map((item, itemIdx) => (
                                                <button
                                                    key={itemIdx}
                                                    onClick={() => setSelectedPdf(item.link)}
                                                    className={`w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center group ${selectedPdf === item.link
                                                        ? "bg-seth-coral text-white"
                                                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    <span className="font-medium truncate mr-2">
                                                        {item.title}
                                                    </span>
                                                    {selectedPdf === item.link && (
                                                        <span className="text-xs bg-white text-seth-coral px-2 py-0.5 rounded-full font-bold">
                                                            Viewing
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic text-sm">
                                            {t("noPresentations")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PDF Preview Pane */}
                    <div className="w-full lg:w-2/3 bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
                        {selectedPdf ? (
                            <iframe
                                src={`${selectedPdf}#toolbar=0`}
                                className="w-full h-full border-none"
                                title="PDF Preview"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                <p>Select a presentation to view</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
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
